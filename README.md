# PostAblate

PostAblate is a polished MVP scaffold for a patient-facing recovery support app after atrial fibrillation ablation.

## Scope

The active MVP supports AF ablation recovery only. It does not build active pathways for pacemaker/device implant recovery, ICD/S-ICD shock management beyond safety escalation notes, SVT ablation, atrial flutter ablation as a separate pathway, PVC ablation, VT ablation, or general EP recovery.

## Safety Philosophy

PostAblate is educational, protocol-driven, deterministic, conservative, and safety-first. It is not a diagnostic tool, does not replace emergency care, and does not replace the electrophysiology team. Red flags override routine recovery education, urgent findings override routine review, and uncertain concerning symptoms escalate rather than reassure.

AI is not implemented in this scaffold.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Prisma
- PostgreSQL
- Clerk-ready authentication placeholders
- OpenAI environment placeholders without active AI

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Prisma Setup

Set `DATABASE_URL` in `.env` using `.env.example`, then run:

```bash
npx prisma generate
npx prisma db push
```

## Current Limitations

- Forms run client-side for the demo and do not persist submissions yet.
- Authentication is not active.
- Clinician dashboard uses mock data.
- Triage is deterministic and conservative, but must be reviewed with clinical stakeholders before real deployment.
- No open-ended medical advice or AI chat is implemented.

## Future Roadmap

- Persist patient sessions and submissions through Prisma-backed API routes.
- Add Clerk clinician authentication and role-based access.
- Add clinician review workflow and submission status changes.
- Add clinically reviewed protocol versioning and audit events.
- Add exportable clinician summaries.
- Consider future expansion to other EP procedures only after AF ablation MVP validation.
