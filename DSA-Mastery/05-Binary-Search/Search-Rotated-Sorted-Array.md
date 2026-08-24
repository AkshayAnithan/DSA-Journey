# Search in Rotated Sorted Array: Ordered-Half Elimination

## Interview Revision Card

### One-Line Classification

Search a target in an ascending, distinct array rotated once by identifying one definitely sorted half and discarding either the target-free sorted half or the other half.

### The Recognition Cue

The array is not globally sorted, but one of the two halves split by `mid` is always normally sorted. A target-range check tells whether that sorted half can contain the target.

### Brute Force

Scan every value until the target is found.

$$
O(n) \text{ time}, \qquad O(1) \text{ extra space}
$$

Sorting is not a direct improvement because the problem requires the original index. Sorting values loses that index unless indices are carried alongside values, which is $O(n \log n)$ and ignores the rotation structure.

### Derivation: The Missing Step

“There are two sorted sections” is necessary but not enough. At every midpoint, answer two questions in order:

```text
1. Which half is definitely sorted?
2. Does target lie inside that half's inclusive value range?
```

Then discard the half that is provably unable to contain the target.

### Decision Table

| First check | What it proves | Target-range check | Boundary update |
| --- | --- | --- | --- |
| `nums[left] <= nums[mid]` | Left half `[left, mid]` is sorted | `nums[left] <= target < nums[mid]` | True: `right = mid - 1`; false: `left = mid + 1` |
| `nums[left] > nums[mid]` | Right half `[mid, right]` is sorted | `nums[mid] < target <= nums[right]` | True: `left = mid + 1`; false: `right = mid - 1` |

Check `nums[mid] == target` before this table. The half ranges exclude `mid` because equality has already returned.

### Loop Invariant

```text
If target exists, its original index remains inside [left, right].
At every iteration, at least one side of mid is normally sorted.
The algorithm discards only a range whose value interval cannot contain target.
```

### Correctness Argument

The one-rotation promise guarantees at least one midpoint half is sorted.

- If the left half is sorted, every value it contains lies in `[nums[left], nums[mid]]`. If the target lies in that range, it must be searched there; otherwise it cannot be in the left half and can be discarded.
- If the right half is sorted, the symmetric range test applies to `[nums[mid], nums[right]]`.

The target index is never discarded when it exists. Each update removes about half the remaining interval, so the loop finds the target or correctly exhausts the search space.

### Complexity

$$
O(\log n) \text{ time}, \qquad O(1) \text{ extra space}
$$

### My Passing Solution

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1, m;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if (target == nums[m]) return m;

            // Left sorted portion.
            if (nums[l] <= nums[m]) {
                if (target > nums[m] || target < nums[l]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            // Right sorted portion.
            else {
                if (target < nums[m] || target > nums[r]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }

        return -1;
    }
};
```

This is already interview-optimal. It is a direct implementation of the decision table above.

### Readable Interview Variant

The same logic can be written using positive “target belongs here” checks. This often makes whiteboard explanation easier.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
};
```

### Failure Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery |
| Highest hint reached | Full explanation video after all four in-problem hints |
| Outcome | Solution-dependent; understands the explanation but cannot derive it independently yet |
| Primary failure | Could not derive a target-range rule for choosing a half |
| Secondary failure | Pattern recognized, but lacked a discard proof |
| What to avoid | Treating the nested conditions as a formula to memorize |
| Repair | Rebuild the decision table from “which half is sorted?” plus “is target in its value range?” |
| Same-day recall, 2026-08-24 | Passed: identified sorted-half test, exact left-range test, and safe discard rule |

### What To Notice Next Time

```text
Binary search does not need total ordering.
It needs a trustworthy reason to discard one half.

For rotated target search:
1. Identify the sorted half.
2. Check whether target fits in that half's value interval.
3. Keep that half if it fits; otherwise keep the other half.
```

### One-Minute Interview Answer

> A rotation breaks global ordering but leaves one midpoint half sorted. I first identify the sorted half. Then I check whether the target is inside that half's inclusive endpoint range. If it is, I search that half; otherwise I discard it and search the other one. This preserves a search interval that contains the target whenever it exists, while halving the interval each iteration.

### Recall Prompts

Do not reread this card before answering.

1. What fact guarantees that at least one half is sorted?
2. How do you detect the left half is sorted?
3. If the left half is sorted, write the exact target range that keeps it.
4. Why is the range strict at `mid`?
5. State the loop invariant.
6. Why is sorting not a direct valid answer when the output is an original index?

### Transfer and Contrast

| Type | Problem | What to derive before coding |
| --- | --- | --- |
| Reconstruction | Find Minimum in Rotated Sorted Array | Why can a pivot be located without a target range check? |
| Contrast | Koko Eating Bananas | Why are Koko's boundaries candidate speeds instead of array indices? |
| Extension | Search in Rotated Sorted Array II | How do duplicates make the ordered-half check ambiguous? |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | State the two decision-table rows aloud without code |
| Day +1 | Re-code from blank, using positive target-range checks |
| Day +3 | Explain the table with one example where target is in each half |
| Day +7 | Contrast index-order search, pivot finding, and binary search on answer |
| Pre-interview | Read only One-Line Classification, Decision Table, Loop Invariant, and One-Minute Interview Answer |