# DSA Journey

<div align="center">

**FAANG SDE-2 Interview Preparation | NeetCode 150 | C++ Primary**

`41 / 150 submitted` · `Evidence-based mastery tracking` · `Active recall + transfer practice`

[Mastery System](DSA-Mastery/README.md) · [30-Day Playbook](DSA-Mastery/00-Foundations/30-Day-Study-Playbook.md) · [Revision Queue](DSA-Mastery/20-Revision/README.md) · [Revision Dashboard](revision-dashboard/index.html) · [Problem Ledger](DSA-Mastery/Problem-Index/Imported-Completion-Ledger.md)

</div>

---

## Purpose

This repository tracks more than accepted solutions. The goal is to turn each problem into a reusable way of reasoning: identify constraints, form a brute force, isolate its bottleneck, derive an efficient approach, prove it, and transfer it to unfamiliar questions.

An accepted submission proves completion. It does **not** automatically prove retrieval, derivation, or interview readiness.

## Current Snapshot

| Metric | Current state |
| --- | --- |
| Primary target | FAANG / top-product SDE-2 interviews |
| Primary language | C++ |
| Secondary languages | C#, Python |
| Core problem bank | NeetCode 150 |
| Imported submissions | 41 / 150 |
| Study mode | 30-day pattern-mastery sprint |
| Latest coached evidence | Buy and Sell Crypto: running-minimum derivation completed with bottleneck guidance |

## Coverage vs Mastery

Coverage tells us where code has been submitted. Mastery is deliberately stricter: it requires blind recall, a new variation, and a clear explanation.

| Topic | Submitted | Coverage | Current mastery evidence | Next highest-value move |
| --- | ---: | --- | --- | --- |
| Arrays & Hashing | 9 / 9 | Complete | Unassessed | Blind reconstruction of prefix/suffix and hashing problems |
| Two Pointers | 5 / 5 | Complete | Unassessed | Justify pointer moves, especially water/rain problems |
| Sliding Window | 0 / 6 submitted + 1 coached pending commit | Started | Running-minimum prefix invariant introduced | Derive a variable-window invariant for no-repeated-character substring |
| Stack | 6 / 7 | Strong coverage | Unassessed | Reconstruct monotonic-stack boundaries |
| Binary Search | 6 / 7 submitted + 1 coached pending commit | Full problem coverage | Answer-space developing; rotated pivot recalled; predecessor search derived; median partition solution-dependent | Reconstruct median partition before treating binary search as strong |
| Linked List | 0 / 11 | Not started | Not assessed | Start after binary-search consolidation |
| Trees | 15 / 15 | Complete | Unassessed | Audit recursive contracts blind |
| Heap / Priority Queue | 0 / 7 | Not started | Not assessed | Learn after graph traversal basics |
| Backtracking | 0 / 9 | Not started | Not assessed | Define choice/state/undo/pruning |
| Graphs | 0 / 19 | Not started | Not assessed | Model nodes, edges, and traversal state |
| Dynamic Programming | 0 / 23 | Not started | Not assessed | Derive recursion before memoization |
| Greedy / Intervals | 0 / 14 | Not started | Not assessed | Prove local choices before coding |
| Math / Bit Manipulation | 0 / 15 | Not started | Not assessed | Add after core interview patterns |

### What “Strong” Means Here

No topic is marked mastered merely because its section is complete. A topic becomes strong only after demonstrated evidence:

1. Solve a canonical problem independently.
2. Reconstruct it after a delay without notes.
3. Solve a different-looking transfer problem.
4. Explain the invariant, correctness, and complexity under interview pressure.

## Pattern Quick Walkthrough

| Pattern family | Recognition cue | Practiced examples | Status |
| --- | --- | --- | --- |
| Hashing | Need fast membership, counts, or complements while scanning | Contains Duplicate, Two Sum, Group Anagrams | Practiced |
| Prefix / suffix reuse | Answer excludes the current index but shares work with neighbors | Product of Array Except Self | Practiced |
| Opposite pointers | Sorted/symmetric data lets one pointer movement eliminate cases | Valid Palindrome, Two Sum II, 3Sum | Practiced |
| Pointer-dominance proof | One boundary cannot improve the answer | Container With Most Water, Trapping Rain Water | Practiced |
| Monotonic stack | Need a next/previous greater/smaller boundary | Daily Temperatures, Largest Rectangle in Histogram | Practiced |
| Binary search on indices | Ordering lets a half be discarded | Binary Search, Search a 2D Matrix | Practiced |
| Binary search on answer | Minimum/maximum answer with monotonic feasibility | [Koko Eating Bananas](DSA-Mastery/05-Binary-Search/Koko-Eating-Bananas.md) | Developing |
| Rotated binary search | One rotation leaves one half ordered; discard the half without the pivot/target | [Find Minimum in Rotated Sorted Array](DSA-Mastery/05-Binary-Search/Find-Minimum-Rotated-Sorted-Array.md) | Needs reconstruction |
| Ordered-half target search | Identify a sorted half, then test whether target lies in its value range | [Search in Rotated Sorted Array](DSA-Mastery/05-Binary-Search/Search-Rotated-Sorted-Array.md) | Needs reconstruction |
| Rightmost-valid search | Find the latest sorted record satisfying `value <= threshold` | [Time Based Key-Value Store](DSA-Mastery/05-Binary-Search/Time-Based-Key-Value-Store.md) | Developing |
| Partition search | Find a valid split across two sorted collections using four boundaries | [Median of Two Sorted Arrays](DSA-Mastery/05-Binary-Search/Median-of-Two-Sorted-Arrays.md) | Needs reconstruction |
| Running prefix minimum | Best current result pairs with one best/worst earlier value | [Buy and Sell Crypto](DSA-Mastery/03-Sliding-Window/Buy-and-Sell-Crypto.md) | Developing |
| Tree DFS contracts | A child returns exactly the information its parent needs | Diameter, Balance, Max Path Sum | Practiced |
| Tree BFS | Output depends on levels or nearest distance | Level Order, Right Side View | Practiced |
| BST invariants | Ordering has meaning across an entire subtree | Validate BST, Kth Smallest, LCA | Practiced |

## Solved Problem Baseline: 41

<details>
<summary><strong>Arrays & Hashing · 9 / 9</strong></summary>

- Contains Duplicate
- Valid Anagram
- Two Sum
- Group Anagrams
- Top K Frequent Elements
- Encode and Decode Strings
- Product of Array Except Self
- Valid Sudoku
- Longest Consecutive Sequence

</details>

<details>
<summary><strong>Two Pointers · 5 / 5</strong></summary>

- Valid Palindrome
- Two Sum II - Input Array Is Sorted
- 3Sum
- Container With Most Water
- Trapping Rain Water

</details>

<details>
<summary><strong>Stack · 6 / 7</strong></summary>

- Valid Parentheses
- Min Stack
- Evaluate Reverse Polish Notation
- Daily Temperatures
- Car Fleet
- Largest Rectangle in Histogram

</details>

<details>
<summary><strong>Sliding Window · 0 / 6 submitted + 1 coached pending commit</strong></summary>

- [Buy and Sell Crypto](DSA-Mastery/03-Sliding-Window/Buy-and-Sell-Crypto.md) - running minimum / one-pass prefix invariant

</details>

<details>
<summary><strong>Binary Search · 6 / 7 submitted</strong></summary>

- Binary Search
- Search a 2D Matrix
- Koko Eating Bananas
- Find Minimum in Rotated Sorted Array
- Search in Rotated Sorted Array
- Time Based Key-Value Store

`Median of Two Sorted Arrays` is completed in coaching and pending a source-repository submission. Once committed, the binary-search section will have seven verified entries.

</details>

<details>
<summary><strong>Trees · 15 / 15</strong></summary>

- Invert Binary Tree
- Maximum Depth of Binary Tree
- Diameter of Binary Tree
- Balanced Binary Tree
- Same Tree
- Subtree of Another Tree
- Lowest Common Ancestor of a BST
- Binary Tree Level Order Traversal
- Binary Tree Right Side View
- Count Good Nodes in Binary Tree
- Validate Binary Search Tree
- Kth Smallest Element in a BST
- Construct Binary Tree from Preorder and Inorder Traversal
- Binary Tree Maximum Path Sum
- Serialize and Deserialize Binary Tree

</details>

The full source-to-pattern mapping is maintained in the [Imported Completion Ledger](DSA-Mastery/Problem-Index/Imported-Completion-Ledger.md).

## How I Study Each Problem

```text
Understand -> constraints -> brute force -> bottleneck -> observation
-> candidate approaches -> invariant / proof -> code -> edge cases
-> recall -> reconstruction -> transfer
```

### Hint Policy

I do not open solutions immediately. After a first-principles attempt, hints progress from constraints and brute force to structural observations, technique direction, pseudocode, and implementation support. See the [Hint Ladder](DSA-Mastery/README.md#hint-ladder).

### Retention Schedule

| When | Exercise |
| --- | --- |
| Same day | Explain the key observation and invariant aloud |
| Day +1 | Reconstruct code from a blank editor |
| Day +3 | Solve an unseen transfer problem |
| Day +7 | Contrast with a deceptive, similar-looking problem |
| Day +14 | Blindly classify and derive again |

## Current Focus

### Sliding Window: Start With the Invariant

The active lesson is [Buy and Sell Crypto](DSA-Mastery/03-Sliding-Window/Buy-and-Sell-Crypto.md). It uses a prefix summary, not a movable window: the current sale needs only the cheapest earlier price.

Key retrieval rule:

> When a problem compares every current value with prior values, first ask whether one running summary replaces the entire prior prefix. A movable left boundary is needed only when validity can be restored by removing old elements.

Next progression:

1. Attempt `Longest Substring Without Repeating Characters` without naming its pattern first.
2. Contrast its movable left boundary with Buy and Sell Crypto's running minimum.
3. Complete the Buy and Sell Crypto same-day recall from the revision dashboard.

## Repository Guide

| Area | Purpose |
| --- | --- |
| [DSA-Mastery](DSA-Mastery/README.md) | Mastery framework, dashboard, and coaching rules |
| [30-Day Study Playbook](DSA-Mastery/00-Foundations/30-Day-Study-Playbook.md) | Daily execution routine and 30-day calendar |
| [Pattern Map](DSA-Mastery/Problem-Index/NeetCode-150-Pattern-Map.md) | Recognition cues for NeetCode 150 patterns |
| [Revision Queue](DSA-Mastery/20-Revision/README.md) | Scheduled recall, reconstruction, transfer, and contrast tasks |
| [Failure Log](DSA-Mastery/Failure-Log/README.md) | Recurring roadblocks and targeted drills |
| [Binary Search Notes](DSA-Mastery/05-Binary-Search/README.md) | Interview revision cards for the active section |

## 30-Day Goal

The target is not simply a larger accepted-problem count. By the end of the sprint, the evidence should show stronger blind classification, brute-force-to-optimization derivation, spaced retrieval, transfer to unfamiliar variants, and clear SDE-2 interview communication.

> **The goal is not to remember 150 answers. It is to derive the next answer from first principles.**