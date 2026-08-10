# ISR Website Development

This repository is the development workspace for the Islamic Society of RMIT website.

## Development repository

GitHub owner: **AIMHM**

Repository: **isr-website**

Primary development branch: **ideas**

The ideas branch contains unfinished development and redesign work. Its presence on GitHub does not mean the code is approved for production.

## Repository independence

Development is currently carried out entirely within AIMHM/isr-website.

The development workflow does not push to, modify, merge into, or otherwise change another GitHub repository.

If the completed redesign is later transferred to another repository, that must be done as a separate deliberate handover step.

## Production boundary

Development work must not automatically:

- merge into main
- deploy the website
- modify production hosting
- modify DNS
- modify the production database
- modify Supabase production data
- modify production API configuration

Production changes require an explicit review and approval step.

## Normal workflow

1. Work on the ideas branch.
2. Run the local Next.js development server.
3. Review changes at http://localhost:3000.
4. Run the ISR health check.
5. Complete visual QA.
6. Commit a coherent development checkpoint.
7. Push ideas to AIMHM GitHub.
8. Allow team members to review the branch.

## Useful commands

From the frontend directory:

    npm run isr:health

From the repository root:

    node frontend/scripts/isr-dev/verify-github.mjs
    node frontend/scripts/isr-dev/publish.mjs

## Development data

Never commit:

- .env files
- local admin data
- passwords
- access tokens
- production credentials
- database credentials

## Content rules

Public ISR information should use confirmed source-of-truth content.

Do not invent:

- prayer-room locations
- Jumuah arrangements
- access hours
- membership prices
- institutional affiliations
- legal status
- charity or DGR status
- historical founding dates

Internal content-owner and review metadata belongs in administration workflows, not the public website.

## History

The substantive ISR history page should not be expanded from assumptions. Historical claims should be added through the dedicated ISR history research process.
