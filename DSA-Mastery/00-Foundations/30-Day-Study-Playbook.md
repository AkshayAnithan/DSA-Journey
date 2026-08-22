# 30-Day Study Playbook

## Primary Outcome

Prepare for FAANG SDE-2 interviews by learning to independently derive solutions, explain them, and implement them in C++. NeetCode 150 is the problem bank; submitted-count progress is secondary to retrieval and transfer evidence.

## Daily Non-Negotiables

- [ ] Do active recall before viewing notes, old code, hints, or solutions.
- [ ] Spend 25 minutes on first-principles reasoning before viewing a solution.
- [ ] Write the brute force and derive its complexity before naming a pattern.
- [ ] Identify the exact bottleneck before requesting a hint.
- [ ] Re-implement any viewed solution from a blank editor.
- [ ] State one invariant or correctness argument before coding the optimized approach.
- [ ] Test normal, boundary, duplicate, empty, negative, and adversarial cases when applicable.
- [ ] Report only: time spent, highest hint used, and exact roadblock. Coaching records the rest.

## Daily Session Template

| Phase | Standard duration | Minimum-duration version | Required output |
| --- | ---: | ---: | --- |
| Recall | 15 min | 10 min | Reconstruct one previous problem without notes |
| Main discovery problem | 45-60 min | 40 min | Full reasoning attempt and code |
| Blind or transfer problem | 30-45 min | 25 min | New surface, no pattern label |
| Reflection | 10 min | 5 min | Cue, bottleneck, invariant, and failure lesson |

If you have 90 minutes, complete recall, one main problem, and reflection. Do not replace deep reasoning with several solution-assisted problems.

## The Solve Protocol

Use this in writing or aloud for every problem.

```text
1. I need to return ___ from input ___.
2. The constraints imply I can afford roughly ___.
3. Brute force is ___ because I would enumerate ___.
4. Its bottleneck is ___, repeated ___ times.
5. I need to preserve/query ___ more efficiently.
6. My candidate approaches are ___.
7. I reject ___ because ___.
8. My invariant is ___.
9. This works because ___.
10. I will test ___ before trusting the code.
```

## 25-Minute Discovery Clock

| Time | Required action |
| ---: | --- |
| 0-5 min | Restate, trace examples, identify input/output and constraints |
| 5-10 min | Produce brute force; derive time and space from operations |
| 10-15 min | Name the expensive repeated operation or bottleneck |
| 15-20 min | Generate at least two possible directions; reject weak ones with constraints or counterexamples |
| 20-25 min | Test an observation on an example; state your exact roadblock if blocked |

At minute 25, do not open a solution. Send the coach a structured hint request.

## Structured Hint Request

```text
Problem:
My restatement:
Constraints:
Brute force:
Complexity:
Bottleneck:
What I tried:
Exact roadblock:
```

The coach uses the hint ladder one level at a time. A full solution is reserved for an explicit request after an attempt or after the ladder is exhausted.

## What Counts As A Solve

| Result | Record it as | What happens next |
| --- | --- | --- |
| Derived and coded without help | Independent | Schedule recall and transfer |
| Solved after Hint 1-4 | Hint-assisted | Retest the same problem tomorrow |
| Solved after Hint 5-8 | Technique-assisted | Reconstruct from blank later today or tomorrow |
| Read full solution | Solution-dependent | Re-implement immediately; schedule reconstruction tomorrow |
| Recognized an old answer but could not derive it | Retrieval failure | Mark for recall, not mastered |

Understanding an explanation is useful, but it is not a mastery result.

## Review Schedule

| When | Activity | Pass condition |
| --- | --- | --- |
| Same day | Verbal recall | Explain brute force, insight, invariant, and complexity without notes |
| Day +1 | Reconstruction | Derive and code the same problem from blank |
| Day +3 | Transfer | Solve a different-looking problem using the same structure |
| Day +7 | Contrast | Explain why a similar-looking problem needs another technique |
| Day +14 | Blind recall | Classify and derive with no pattern prompt |

A failed review is valuable data. Return it to the nearest prior stage; do not count it as mastered.

## 30-Day Execution Calendar

| Days | Focus | Evidence to earn |
| --- | --- | --- |
| 1-2 | Audit Arrays/Hashing, Two Pointers, Stack, and Trees | Separate submitted code from independently recallable skills |
| 3-4 | Sliding Window | Derive a window invariant from contiguous brute force |
| 5 | Monotonic Stack | Identify when unresolved elements need ordered storage |
| 6 | Binary Search | State the search invariant or monotonic predicate |
| 7 | Mixed Week 1 assessment | Classify mixed questions without topic labels |
| 8-9 | Tree reconstruction | Build correct recursive contracts and post-order aggregation |
| 10 | Linked Lists | Safely manipulate pointers using dummy nodes and fixed gaps |
| 11-12 | Graph traversal | Model nodes, edges, visited state, and BFS versus DFS choice |
| 13 | Heaps | Choose a heap from repeated access/update requirements |
| 14 | Mock interview | Explain and implement an unfamiliar medium problem |
| 15 | Backtracking | Define choices, state, base cases, undo, and pruning |
| 16-17 | 1D DP | Derive recursion, state, transition, base case, then optimize |
| 18-19 | 2D DP | Invent dimensions that fully identify the subproblem |
| 20 | Knapsack/Subsequence DP | Distinguish choice order from state dimensions |
| 21 | Greedy and Intervals | Justify a greedy choice with exchange or staying-ahead reasoning |
| 22 | DP versus Greedy | Find counterexamples to seductive but invalid greedy rules |
| 23 | Mock interview | Deliver a medium solution under interview conditions |
| 24 | Tries and Bits | Cover high-frequency interview fundamentals |
| 25 | Combined-pattern problems | Decompose a hard problem into familiar subproblems |
| 26 | Blind mixed set | Classify first, solve second, without labels |
| 27 | Timed contest-style set | Triage problems and manage time deliberately |
| 28 | Full FAANG mock | Communicate, derive, code, test, and defend choices |
| 29 | Weak-area repair | Drill only the highest-frequency failure category |
| 30 | Final assessment | Measure retrieval, transfer, derivation, and interview communication |

## Existing Submission Audit Order

Start with prior submissions that test different kinds of reasoning. Do not view your stored code before each attempt.

1. `Diameter of Binary Tree`: recursive return value versus global candidate.
2. `Product of Array Except Self`: eliminate repeated work with prefix/suffix information.
3. `Trapping Rain Water`: prove why pointer movement is safe.
4. `Largest Rectangle in Histogram`: derive first-smaller boundaries and stack invariant.
5. `Search a 2D Matrix`: state a binary-search interval invariant.

## Day 1

### Main Task: Blind Reconstruction

Solve `Diameter of Binary Tree` in C++ without opening your prior solution.

Before code, answer:

1. What does the problem ask for in your own words?
2. What should one recursive call return to its parent?
3. Where is a candidate for the best diameter evaluated?
4. Why is that candidate sufficient to consider at every node?
5. Derive the time and space complexity from the recursion.
6. What test tree could expose a mistake in your implementation?

### Same-Day Recall

After the implementation, close the editor and explain in one minute:

```text
The recursive function returns ___.
At each node I update ___ using ___.
The invariant is ___.
The traversal costs ___ because ___.
```

## Coaching Check-In Format

At the end of a problem, send:

```text
Problem:
Attempt type: Discovery | Recall | Reconstruction | Transfer | Contrast
Time before help:
Highest hint used:
Outcome: Independent | Hint-assisted | Technique-assisted | Solution-dependent
Exact roadblock:
One thing I should notice next time:
```

The GitHub repository tracks submissions. This check-in is the only human input needed to track reasoning growth.

## Weekly Decision Rule

At the end of Days 7, 14, 21, and 28:

1. Count independent, hint-assisted, and solution-dependent outcomes.
2. Find the most frequent primary failure category.
3. Allocate the next two sessions to that failure type before adding new material.
4. Raise a pattern confidence score only after a recall and a transfer pass.

> Mental model: each problem is not a solution to remember; it is evidence for a reusable way of reasoning.