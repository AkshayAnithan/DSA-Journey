# Tracking System

## Problem Outcome Labels

| Outcome | Meaning |
| --- | --- |
| Independent | Derived and implemented without hints |
| H1-H4 | Solved after a diagnostic or structural hint |
| H5-H8 | Solved after technique, algorithm, skeleton, or implementation help |
| Full solution | Could not generate the solution independently yet |
| Recall pass | Reconstructed the original later without prior notes |
| Transfer pass | Solved a new surface using the same underlying structure |

## Confidence Calculation

Each pattern is scored from evidence across five dimensions: recognition, derivation, implementation, variations, and timed/hard performance. Each dimension uses 0-5. The dashboard confidence is the lowest important demonstrated capability, not an average that hides a weakness.

## Failure Taxonomy

- Problem comprehension
- Constraint missed
- Brute force unavailable
- Bottleneck unidentified
- Pattern not recognized
- Wrong pattern selected
- Optimization not derived
- State or recurrence incorrect
- Proof/invariant absent
- Implementation error
- Edge case failure
- Complexity analysis error
- Retrieval failure
- Panic/time pressure
- Communication failure

Record one primary failure and optional secondary failures. Weekly review uses frequency, not emotion, to choose drills.

## Problem Record Template

Use [Problem Template](../Problem-Index/Problem-Template.md) for every important attempt. Use [Pattern Template](Pattern-Template.md) after enough examples support a reusable pattern note.