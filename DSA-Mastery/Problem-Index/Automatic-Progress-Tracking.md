# Automatic Progress Tracking

## Goal

You should not manually maintain completion status, problem records, or dashboards. Your solution repository should be the source of truth; this repository should generate the study evidence around it.

## Connected Repository

| Field | Value |
| --- | --- |
| Repository | [AkshayAnithan/DSA_CP](https://github.com/AkshayAnithan/DSA_CP) |
| Branch | `main` |
| Solution root | `Data Structures & Algorithms/` |
| Completion convention | A problem directory containing one or more `submission-*` files |
| Primary language | C++ |
| Secondary languages | C#, Python |

The solution repository already runs `.github/workflows/update-stats.yml` after pushes to `main` or `master`. It executes `Update-Stats.ps1 -RepoRoot . -UseGit` and commits an updated README. That workflow is the automatic source of truth for submitted-problem counts.

## Required Input

Connection details have been received. The initial imported state is in [Imported Completion Ledger](Imported-Completion-Ledger.md).

| Needed detail | Example |
| --- | --- |
| Repository URL | `https://github.com/account/neetcode-solutions` |
| Default branch | `main` |
| One solution path | `arrays-hashing/two-sum.py` |
| Naming convention | `001-two-sum.py`, `two_sum.java`, or similar |
| Language(s) | Java, Python, C++, etc. |

## Automation Contract

The tracking model will:

1. Scan existing solution paths and filenames to infer completed NeetCode problems.
2. Match each completion to the canonical problem map and its primary/secondary patterns.
3. Update an auto-generated completion ledger and the README dashboard.
4. Mark an initial completion as `solution submitted`, not `mastered`.
5. Create the next recall/reconstruction/transfer prompts from completion dates.
6. Preserve coaching evidence separately: hint level, roadblock, recall result, transfer result, and failure category.

## Operating Model

No manual Markdown updates are expected from you.

| Event | Automatic record | Coaching record |
| --- | --- | --- |
| You commit a solution | Your existing GitHub workflow updates solved counts and category progress | None needed |
| You start a coached attempt | None | I log attempt type and hint ceiling from the chat |
| You solve a recall/transfer task | None | I update evidence-based pattern confidence |
| We review progress | Read latest repository stats | I identify the next highest-value revision/drill |

The local ledger is an imported snapshot. It will be refreshed whenever we begin a coaching session or you ask for a progress update; the GitHub repository remains authoritative for new submissions.

## What Automation Cannot Infer

Git history proves that a solution was committed; it cannot prove independent derivation. During coaching, I will record only the few items that code cannot reveal: highest hint used, the reasoning roadblock, and recall/transfer result. This takes a short reply after each session rather than maintaining documents yourself.