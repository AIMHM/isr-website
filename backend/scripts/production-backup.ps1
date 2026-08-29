$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "ISR PRODUCTION DATABASE BACKUP"

if ($env:CONFIRM_ISR_PRODUCTION_BACKUP -ne "YES") {
    throw "REFUSED: Set CONFIRM_ISR_PRODUCTION_BACKUP=YES only after production backup approval."
}

if ([string]::IsNullOrWhiteSpace($env:PRODUCTION_DATABASE_URL)) {
    throw "STOP: PRODUCTION_DATABASE_URL is missing."
}

if ($env:PRODUCTION_DATABASE_URL -notmatch '^postgres(?:ql)?://') {
    throw "STOP: PRODUCTION_DATABASE_URL is not PostgreSQL."
}

$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo

$head = (git rev-parse HEAD).Trim()

if ($env:CONFIRM_ISR_RELEASE_SHA -ne $head) {
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
    throw "STOP: Working tree must be clean before production backup."
}

if (-not (Get-Command pg_dump -ErrorAction SilentlyContinue)) {
    throw "STOP: pg_dump is not installed or not available on PATH."
}

if (-not (Get-Command pg_restore -ErrorAction SilentlyContinue)) {
    throw "STOP: pg_restore is not installed or not available on PATH."
}

$backupDirectory = Join-Path $repo ".production-backups"
[System.IO.Directory]::CreateDirectory($backupDirectory) | Out-Null

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$shortSha = $head.Substring(0, 8)
$backupFile = Join-Path $backupDirectory "isr-production-$timestamp-$shortSha.dump"

Write-Host "Release SHA : $head"
Write-Host "Backup file : $backupFile"
Write-Host "Database URL will not be printed."

& pg_dump --format=custom --no-owner --no-acl --file="$backupFile" "$env:PRODUCTION_DATABASE_URL"

if ($LASTEXITCODE -ne 0) {
    throw "STOP: pg_dump failed."
}

if (-not (Test-Path $backupFile)) {
    throw "STOP: Backup file was not created."
}

$backupInfo = Get-Item $backupFile

if ($backupInfo.Length -le 0) {
    throw "STOP: Backup file is empty."
}

& pg_restore --list "$backupFile" *> $null

if ($LASTEXITCODE -ne 0) {
    throw "STOP: Backup archive validation failed."
}

$hash = Get-FileHash -Algorithm SHA256 $backupFile

Write-Host ""
Write-Host "PRODUCTION BACKUP COMPLETE"
Write-Host "File   : $backupFile"
Write-Host "Bytes  : $($backupInfo.Length)"
Write-Host "SHA256 : $($hash.Hash)"
Write-Host "NO MIGRATION WAS RUN."

Write-Output $backupFile
