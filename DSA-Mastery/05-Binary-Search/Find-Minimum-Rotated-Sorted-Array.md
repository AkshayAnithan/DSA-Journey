# Find Minimum in Rotated Sorted Array: Rotated Binary Search

## Interview Revision Card

### One-Line Classification

Find the rotation point in a distinct, ascending array rotated once by discarding the half that is definitely sorted and cannot contain the minimum.

### The Recognition Cue

The array is not globally sorted, but it consists of two ascending runs created by one rotation. A comparison with an endpoint can reveal which half contains the rotation point.

### Brute Force

Scan every element and keep the smallest value.

$$
O(n) \text{ time}, \qquad O(1) \text{ extra space}
$$

Sorting is not an improvement: it costs $O(n \log n)$ and destroys information that the one-rotation promise gives for free.

### Key Observation

For the current interval `[left, right]`:

- If `nums[left] < nums[right]`, the interval is already sorted, so `nums[left]` is its minimum.
- Otherwise the interval crosses the rotation point.
- If `nums[mid] >= nums[left]`, `mid` lies in the left, high-valued run; the minimum is strictly right of `mid`.
- Otherwise `mid` lies in the right, low-valued run; `mid` can be the minimum, so keep it by searching left.

The comparisons work because values are distinct. Duplicates require a different treatment.

### Search State and Loop Invariant

```text
The true minimum is either already saved in result or lies within [left, right].
If nums[left] < nums[right], this remaining interval is sorted and nums[left]
is the only minimum candidate in it.
Otherwise the rotation point lies inside the interval.
```

### Boundary Updates

| Condition | What it proves | Update |
| --- | --- | --- |
| `nums[left] < nums[right]` | The interval is sorted | Save `nums[left]`, stop |
| `nums[mid] >= nums[left]` | `mid` is in the left/high run; minimum is right of it | `left = mid + 1` |
| `nums[mid] < nums[left]` | `mid` is in the right/low run and may be minimum | `right = mid - 1` after saving `nums[mid]` |

### Correctness Argument

At every iteration, the algorithm either finds a fully sorted interval and saves its first element, or removes a half that cannot contain the rotation point.

- When `nums[mid] >= nums[left]` in an unsorted interval, values from `left` through `mid` belong to the ascending high run. None can be the global minimum, so discarding that range is safe.
- When `nums[mid] < nums[left]`, `mid` belongs to the low run. It is a valid minimum candidate, while an even smaller value may exist to its left within the low run, so saving it and searching left is safe.

The invariant keeps the true minimum in `result` or the remaining interval. The final saved value is therefore the global minimum.

### Complexity

Each iteration discards roughly half of the interval.

$$
O(\log n) \text{ time}, \qquad O(1) \text{ extra space}
$$

### My Passing Solution

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        int res = nums[0];

        while (l <= r) {
            if (nums[l] < nums[r]) {
                res = min(res, nums[l]);
                break;
            }

            int m = l + (r - l) / 2;
            res = min(res, nums[m]);

            if (nums[m] >= nums[l]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return res;
    }
};
```

This is already optimal: $O(\log n)$ time and $O(1)$ space. It is a good intuitive version because it explicitly saves the best candidate before discarding a half.

### Interview-Optimal C++ Solution

This equivalent version keeps the minimum inside the current interval and returns when `left == right`. It is shorter, but not asymptotically faster.

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0;
        int right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return nums[left];
    }
};
```

Its invariant is simply: `the minimum always remains in [left, right]`.

### Failure Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery |
| Highest hint reached | Full explanation video after all four in-problem hints |
| Outcome | Solution-dependent; understood after video explanation |
| Primary failure | Could not derive the rotated-order invariant |
| Secondary failure | Pattern recognized, but binary-search half-elimination was not justified |
| Initial incorrect direction | Tried to compare against a running/current minimum instead of identifying a definitely sorted half |
| Repair | Reconstruct without notes before treating this pattern as learned |
| Same-day recall, 2026-08-24 | Completed after one boundary clarification; can identify the right-side rotation rule and why `mid` must be kept |

### What To Notice Next Time

```text
Not globally sorted does not mean binary search is impossible.
Ask whether the data is partially ordered by a promise such as one rotation.
Then find a comparison that tells which half is definitely safe to discard.
```

### One-Minute Interview Answer

> Although the array is rotated, one half around the midpoint is still ordered. I maintain an interval containing the minimum. Comparing the midpoint to the right endpoint tells me whether the midpoint lies in the high left run or the low right run. If it is in the high run, the minimum is to its right; otherwise the midpoint may be the minimum, so I keep the left half including it. This halves the search space each iteration.

### Recall Prompts

Do not reread the card before answering.

1. Why is sorting worse than a linear scan here?
2. What structural promise survives the rotation?
3. In an unsorted interval, what does `nums[mid] > nums[right]` prove?
4. Why does the `else` branch use `right = mid`, not `mid - 1`, in the compact version?
5. What assumption about duplicates does this logic use?
6. State the compact version's loop invariant exactly.

### Boundary Clarification

When `nums[mid] <= nums[right]`, the subarray from `mid` through `right` is sorted in ascending order. Therefore every element strictly to the right of `mid` is at least `nums[mid]` and cannot be a smaller answer. But `mid` itself may equal the minimum, so use `right = mid` rather than `right = mid - 1`.

### Transfer and Contrast

| Type | Problem | What to derive before code |
| --- | --- | --- |
| Transfer | Search in Rotated Sorted Array | Which ordered half can be discarded relative to the target? |
| Contrast | Koko Eating Bananas | Why does Koko search answer values rather than array indices? |
| Extension | Find Minimum in Rotated Sorted Array II | Why do duplicates make endpoint comparisons ambiguous? |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | Answer all six recall prompts without this card |
| Day +1 | Re-code the compact version from blank and state its invariant first |
| Day +3 | Solve `Search in Rotated Sorted Array` blind |
| Day +7 | Explain the difference between this problem and Koko without naming either pattern first |
| Pre-interview | Read only One-Line Classification, Recognition Cue, Boundary Updates, and One-Minute Interview Answer |