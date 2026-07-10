---
name: bead-cleaner
description: Audit open bd beads against the project's current direction and safely re-scope, defer, deduplicate, supersede, close, or delete them. Use when the user asks to clean up, prune, triage, archive, close, or delete stale, obsolete, duplicate, abandoned, or nonsensical beads.
---

# Bead Cleaner

Reduce backlog noise without erasing useful history or breaking dependency context. Default to a read-only audit and an approval-ready action plan.

## Ownership And Routing

- Luna xhigh may inventory, compare, and format bounded bead data.
- Terra High owns classification, dependency judgment, mutation, verification, and final synthesis.
- Sol Medium receives a decision packet only when the product direction itself requires reconciliation.

Treat these as preferred roles and record the verified runtime separately. Ground product direction in explicit user guidance or authoritative plans, parent beads, PRDs, ADRs, roadmaps, or branch goals. Age or inactivity alone does not prove misalignment.

## Audit

1. Run `bd where` and `bd status`. If no database exists, stop without initializing one.
2. Pin the authoritative outcome, non-goals, sources, and cutoff assumptions.
3. Read open beads with `bd list --status open --limit 0 --json`; expand to other statuses only when requested.
4. Inspect details, children, references, dependency links, and relevant repository evidence.
5. Assign one primary action and cite evidence. Use `review` when direction or evidence conflicts.
6. Return the stable action plan below, then apply only the approved mutation set.

## Classification

- `keep`: aligned and actionable.
- `rewrite`: aligned intent with misleading scope, acceptance, priority, or parentage.
- `defer`: valuable later but intentionally outside the active direction.
- `duplicate`: same outcome as a canonical bead; use `bd duplicate <id> --of <canonical>`.
- `supersede`: replaced by a newer bead; use `bd supersede <old> --with <new>`.
- `close`: no longer planned, already satisfied, or invalid, but history remains useful.
- `delete`: accidental, test, empty, corrupt, sensitive, or irreparably misleading noise with no unique decision or dependency value.
- `review`: evidence is insufficient.

Prefer rewrite, duplicate, supersede, or close over delete. Defer only work intended to re-enter later.

## Mutation Gate

No mutation may run until the user approves an action plan containing exact IDs, reasons, commands, and dependency impact.

Deletion additionally requires:

1. An explicit final ID list; never derive it from a broad filter.
2. `bd delete <ids> --dry-run` with no unexpected dependent or extra ID.
3. User approval of that exact dry-run result.
4. `bd delete <ids> --force --reason "..."`, preserving tombstones.
5. Re-read of affected beads and dependents after mutation.

Never use `--hard` or `--cascade`. Stop if the database changes between preview and apply, dependents would be orphaned, or the command affects anything outside the approved set.

## Action Plan

```text
direction:
sources:
scope_and_counts:
actions:
  - id:
    action:
    confidence:
    evidence:
    dependency_impact:
    command:
delete_dry_run:
approval_required:
residual_review_queue:
```

After mutation, replace `approval_required` with `applied` and include verification evidence. Keep commands copyable and audit reasons durable.
