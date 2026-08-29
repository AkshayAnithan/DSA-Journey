# Revision Queue

The live revision state is in [revision-state.json](revision-state.json). Run `npm start` at the repository root and open [http://localhost:4173](http://localhost:4173) to attempt today's queue, record an outcome, and automatically schedule its next review.

The legacy table below is the initial imported queue. New outcomes are recorded in `revision-state.json` by the dashboard.

## Mobile Reminder Setup

1. Install the [ntfy](https://ntfy.sh) mobile app and subscribe to a private, long random topic.
2. In this repository on GitHub, add an Actions secret named `NTFY_TOPIC` with that exact topic name.
3. Optional: create an ntfy access token and add it as `NTFY_TOKEN` if you later use authenticated topic access.
4. Push this repository. The [daily workflow](../../.github/workflows/send-daily-revision-reminder.yml) runs at 7:30 AM IST (`02:00 UTC`) and sends up to three due reviews.

The workflow reads the committed revision state. After recording outcomes locally, commit and push `revision-state.json` before the next mobile reminder so it uses the latest schedule. Without `NTFY_TOKEN`, the topic name is the only protection, so use a long random name and do not send sensitive content.

## Windows Reminder Setup

The dashboard works without any extra packages. For a Windows toast when the laptop is on:

1. Run `Install-Module BurntToast -Scope CurrentUser` once in PowerShell.
2. Create a daily Windows Task Scheduler task that runs:

	```powershell
	powershell.exe -ExecutionPolicy Bypass -File "C:\Akshay\DSA Prep\scripts\show-windows-reminder.ps1"
	```

The script reads the same `revision-state.json` as the dashboard and mobile workflow.

Use this folder for active-recall prompts and review queues. Do not read a pattern note before attempting its prompt.

| Due date | Item | Type | Target evidence | Result |
| --- | --- | --- | --- | --- |
| 2026-08-29 | Koko Eating Bananas | Same-day recall | Explain answer-space, monotonicity, invariant, and boundaries without notes | Passed after one boundary-direction terminology correction |
| 2026-08-30 | Koko Eating Bananas | Reconstruction | Re-code in C++ from blank; state invariant before coding | Partial; repeat after correcting legal lower bound and answer initialization |
| 2026-08-25 | Capacity To Ship Packages Within D Days | Transfer | Independently derive minimum-feasible binary search | Pending |
| 2026-08-29 | Rotated-array search contrast | Contrast | Explain index search versus answer-space search | Pending |
| 2026-08-24 | Find Minimum in Rotated Sorted Array | Same-day recall | State the endpoint comparison and the compact loop invariant without notes | Completed with one boundary clarification |
| 2026-08-25 | Find Minimum in Rotated Sorted Array | Reconstruction | Re-code the compact C++ version from blank; explain why `right = mid` | Pending |
| 2026-08-27 | Search in Rotated Sorted Array | Transfer | Independently derive which ordered half can be discarded for a target | Pending |
| 2026-08-31 | Rotated minimum vs Koko | Contrast | Classify index-order search versus monotonic-feasibility search before coding | Pending |
| 2026-08-24 | Search in Rotated Sorted Array | Same-day recall | State both ordered-half target-range checks without code | Passed |
| 2026-08-25 | Search in Rotated Sorted Array | Reconstruction | Re-code with positive target-range checks and state invariant first | Pending |
| 2026-08-27 | Rotated target search examples | Retrieval | Explain one example where target remains in each sorted half | Pending |
| 2026-08-31 | Three binary-search structures | Contrast | Distinguish Koko, rotated minimum, and rotated target search | Pending |
| 2026-08-24 | Time Based Key-Value Store | Same-day recall | State the rightmost-valid predicate, sentinel, and boundary updates without code | Pending |
| 2026-08-25 | Time Based Key-Value Store | Reconstruction | Re-code `get` from blank, including query-before-first-timestamp case | Pending |
| 2026-08-27 | Rightmost predecessor helper | Transfer | Write and explain rightmost `value <= target` binary search for integers | Pending |
| 2026-08-31 | Predecessor versus exact search | Contrast | Explain why equality-only binary search fails for historical lookup | Pending |
| 2026-08-26 | Median of Two Sorted Arrays | Same-day recall | Define cuts as counts and state all four sentinel boundaries without notes | Pending |
| 2026-08-27 | Median of Two Sorted Arrays | Boundary reconstruction | Write `cutA`, `cutB`, and the four boundaries from a blank editor | Pending |
| 2026-08-29 | Median of Two Sorted Arrays | Full reconstruction | Implement the partition search in C++ without notes | Pending |
| 2026-09-02 | Median partition off-by-one | Contrast | Explain why a cut after A's last element needs `rightA = INT_MAX` | Pending |
| 2026-09-09 | Median of Two Sorted Arrays | Blind derivation | Re-derive a valid partition from a new example before viewing notes | Pending |