# Failure Log

Add a dated entry whenever an attempt needs a hint or fails. Weekly, tally categories and create a drill for the most frequent root failure before adding unrelated problems.

| Date | Problem | Attempt type | Primary failure | Trigger | Repair drill | Retest date | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-08-24 | Find Minimum in Rotated Sorted Array | Discovery | Optimization not derived | Recognized binary search but could not identify a discardable half in partially ordered data | Blindly state the rotated-array invariant, then reconstruct and transfer to target search | 2026-08-25 | Pending |
| 2026-08-24 | Search in Rotated Sorted Array | Discovery | Optimization not derived | Identified two sorted runs but could not derive which run contained target | Rebuild decision table: identify sorted half, then target-range test | 2026-08-25 | Pending |
| 2026-08-24 | Time Based Key-Value Store | Discovery | Edge case failure | Correct predecessor binary search but initialized the best index as a valid record | Use an explicit no-candidate sentinel; test query before first timestamp | 2026-08-25 | Pending |
| 2026-08-26 | Median of Two Sorted Arrays | Discovery | Optimization not derived | Could not invent virtual partition and valid-cut model after extended attempt | Reconstruct cuts as counts; state four boundaries and two cross comparisons | 2026-08-27 | Pending |
| 2026-08-26 | Median of Two Sorted Arrays | Implementation | Edge case failure | Mixed cut count with index semantics; incorrect right boundary sentinel | Test cut at 0 and cut at array length before execution | 2026-08-27 | Pending |