# Koko Eating Bananas: Binary Search on the Answer

## Interview Revision Card

### One-Line Classification

Find the **minimum integer speed** for which a monotonic feasibility test, `hoursNeeded(speed) <= h`, is true.

### The Recognition Cue

The prompt asks for a minimum/maximum numeric answer, and checking whether one candidate answer works is easy. Ask: as the candidate value increases, does feasibility change only one way?

### Brute Force

Try every speed from `1` through `max(piles)` and sum the hours for all piles.

- Time: $O(n \cdot \max(\text{piles}))$
- Bottleneck: recomputing total hours for every possible speed.

### Key Observation

For a speed `k`:

- If `hoursNeeded(k) <= h`, then every speed greater than `k` also works.
- If `hoursNeeded(k) > h`, then every speed smaller than `k` also fails.

That creates a false-to-true monotonic predicate over speeds, so binary search the **speed values**, not pile indices.

### Search Space and Boundaries

```text
left  = 1
right = max(piles)
```

`max(piles)` is feasible because every pile can be finished in at most one hour, so total required hours are at most `piles.size()`. The problem guarantees `h >= piles.size()`.

### Loop Invariant

At each iteration:

```text
Every speed below left is known to be infeasible.
The minimum feasible speed is either already saved as answer or lies in [left, right].
```

When `hoursNeeded(mid) <= h`, save `mid` and continue left to find a smaller feasible speed. When it fails, discard `mid` and everything slower.

### Correctness Argument

The feasibility predicate is monotonic. Binary search never discards a potentially smaller feasible speed:

- A failing `mid` and all smaller speeds are impossible, so moving `left` right is safe.
- A feasible `mid` is a valid candidate, while a smaller feasible answer may exist, so saving it and moving `right` left is safe.

The loop ends only after all values below the saved feasible candidate have been ruled out. Therefore the saved candidate is the minimum feasible speed.

### Complexity

Each feasibility check scans all `n` piles. Binary search performs $O(\log(\max(\text{piles})))$ checks.

$$
O(n \log(\max(\text{piles}))) \text{ time}, \qquad O(1) \text{ extra space}
$$

### My Passing Solution

```cpp
#define ll long long

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        auto top = max_element(piles.begin(), piles.end());
        int l = 1, r = top[0];
        int speed = 0;

        while (l <= r) {
            double m = l + (r - l) / 2;
            ll hours = 0;

            for (double x : piles) {
                hours += ceil(x / m);
            }

            if (hours > h) {
                l = m + 1;
            } else {
                speed = m;
                r = m - 1;
            }
        }

        return speed;
    }
};
```

This is correct for the problem constraints. The search logic is the important accomplishment: it searches speed values and returns the first feasible one.

### Interview-Optimal C++ Solution

Use integer values because speed and required hours are integral. Integer ceiling division avoids floating-point arithmetic:

```text
ceil(pile / speed) = (pile + speed - 1) / speed
```

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int left = 1;
        int right = *max_element(piles.begin(), piles.end());
        int answer = right;

        while (left <= right) {
            int speed = left + (right - left) / 2;
            long long hours = 0;

            for (int pile : piles) {
                hours += (pile + speed - 1) / speed;
            }

            if (hours <= h) {
                answer = speed;
                right = speed - 1;
            } else {
                left = speed + 1;
            }
        }

        return answer;
    }
};
```

### Failure Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery |
| Time before help | Not recorded |
| Highest hint reached | Structural direction: identify answer-space and minimum-feasible search |
| Outcome | Technique-assisted, then implemented correctly |
| Initial wrong search space | Indices of sorted piles |
| Initial wrong objective | Maximized a feasible speed instead of minimizing it |
| What fixed it | Define the candidate as an integer speed and use monotonic feasibility |

### What To Notice Next Time

When the prompt says “minimum/maximum value that can satisfy a condition,” do this before touching array indices:

```text
1. Define candidate answer x.
2. Write canDo(x).
3. Ask whether canDo(x) is monotonic.
4. Binary-search x if the answer is yes.
5. For a minimum feasible x: true -> save x and go left; false -> go right.
```

### One-Minute Interview Answer

> I binary-search the eating speed rather than the pile array. For a candidate speed, I compute the total required hours. This feasibility check is monotonic: if a speed works, every faster speed works; if it fails, every slower speed fails. I search for the first feasible speed, moving left after a feasible candidate and right after an infeasible one.

### Recall Prompts

Do not reread the card before answering these.

1. What is the search space: indices, values, or answers?
2. What is `canDo(speed)`?
3. Why is the predicate monotonic?
4. For a minimum feasible answer, which way does each predicate result move the boundary?
5. Why is `max(piles)` feasible?
6. How do you compute ceiling division with integers?

### Transfer and Contrast

| Type | Problem | What to prove before coding |
| --- | --- | --- |
| Transfer | Capacity To Ship Packages Within D Days | Increasing capacity cannot increase days needed |
| Transfer | Split Array Largest Sum | Increasing allowed maximum subarray sum cannot require more splits |
| Contrast | Search in Rotated Sorted Array | Search is over indices; the ordered-half invariant, not a feasibility predicate, drives elimination |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | Answer the six recall prompts aloud without the card |
| Day +1 | Re-code from blank and state the invariant first |
| Day +3 | Solve `Capacity To Ship Packages Within D Days` blind |
| Day +7 | Explain why rotated-array search is not binary search on answer |
| Pre-interview | Read only One-Line Classification, Recognition Cue, One-Minute Interview Answer, and What To Notice Next Time |