$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "ISR PRODUCTION DATABASE MIGRATION"

if ($env:CONFIRM_ISR_PRODUCTION_MIGRATION -ne "YES") {
    throw "REFUSED: Production migration has not been explicitly authorised."
}

if ([string]::IsNullOrWhiteSpace($env:PRODUCTION_DATABASE_URL)) {
    throw "STOP: PRODUCTION_DATABASE_URL is missing."
}

if ($env:PRODUCTION_DATABASE_URL -notmatch '^postgres(?:ql)?://') {
    throw "STOP: PRODUCTION_DATABASE_URL is not PostgreSQL."
}

if ([string]::IsNullOrWhiteSpace($env:ISR_BACKUP_FILE)) {
    throw "STOP: ISR_BACKUP_FILE is missing."
}

if (-not (Test-Path -Path $env:ISR_BACKUP_FILE -PathType Leaf)) {
    throw "STOP: Confirmed production backup file does not exist."
}

$backup = Get-Item $env:ISR_BACKUP_FILE

if ($backup.Length -le 0) {
    throw "STOP: Confirmed backup file is empty."
}

$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$backend = Join-Path $repo "backend"

Set-Location $repo

$branch = (git branch --show-current).Trim()
$head = (git rev-parse HEAD).Trim()

if ([string]::IsNullOrWhiteSpace($head)) {
    throw "STOP: Could not determine release Git SHA."
}

if ($env:CONFIRM_ISR_RELEASE_SHA -ne $head) {
    Write-Host "Current SHA   : $head"
    Write-Host "Confirmed SHA : $env:CONFIRM_ISR_RELEASE_SHA"
    throw "STOP: CONFIRM_ISR_RELEASE_SHA does not match this checkout."
}

$dirty = @(
    git status --porcelain |
    Where-Object {
        $_ -notmatch "ISR-WEBSITE-D12-REVIEW"
    }
)

if ($dirty.Count -gt 0) {
    Write-Host "Unexpected working-tree changes:"
    $dirty
    throw "STOP: Working tree must be clean before production migration."
}

$backupHash = Get-FileHash -Algorithm SHA256 $backup.FullName

Write-Host ""
Write-Host "Release branch : $branch"
Write-Host "Release SHA    : $head"
Write-Host "Backup file    : $($backup.FullName)"
Write-Host "Backup bytes   : $($backup.Length)"
Write-Host "Backup SHA256  : $($backupHash.Hash)"
Write-Host "Database URL will not be printed."

Set-Location $backend

Write-Host ""
Write-Host "Running backend tests before database contact..."

npm.cmd test -- --runInBand

if ($LASTEXITCODE -ne 0) {
    throw "STOP: Backend tests failed. Production database untouched."
}

Write-Host ""
Write-Host "Running static predeployment audit..."

npm.cmd run audit:predeploy

if ($LASTEXITCODE -ne 0) {
    throw "STOP: Predeployment audit failed. Production database untouched."
}

Write-Host ""
Write-Host "Building backend..."

npm.cmd run build

if ($LASTEXITCODE -ne 0) {
    throw "STOP: Backend build failed. Production database untouched."
}

$oldDatabaseUrl = $env:DATABASE_URL

try {
    $env:DATABASE_URL = $env:PRODUCTION_DATABASE_URL

    Write-Host ""
    Write-Host "APPLYING APPROVED PRISMA MIGRATIONS"

    npx.cmd prisma migrate deploy

    if ($LASTEXITCODE -ne 0) {
        throw "STOP: prisma migrate deploy failed. Do not retry blindly."
    }

    Write-Host ""
    Write-Host "Checking migration status..."

    npx.cmd prisma migrate status

    if ($LASTEXITCODE -ne 0) {
        throw "STOP: Migration status is not clean. Stop deployment and investigate."
    }
}
finally {
    if ($null -eq $oldDatabaseUrl) {
        Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
    }
    else {
        $env:DATABASE_URL = $oldDatabaseUrl
    }
}

Write-Host ""
Write-Host "PRODUCTION DATABASE MIGRATION COMPLETE"
Write-Host "Release SHA: $head"
Write-Host "Prisma migration status: CHECKED"
Write-Host "No Prisma seed command was run."
Write-Host "NEXT: perform post-migration API and website smoke tests."
