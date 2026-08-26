# Median of Two Sorted Arrays: Binary Search on a Partition

## Interview Revision Card

### One-Line Classification

Binary-search how many elements the shorter array contributes to the left half of a virtual merged order, until every left value is at most every right value.

### The Recognition Cue

Two individually sorted arrays must be combined conceptually, but the required complexity prohibits merging them. Look for a valid partition whose left side contains half the total elements.

### Brute Force

Merge both already-sorted arrays with two pointers, then read the middle value(s). Sorting after concatenation is unnecessary.

$$
O(m+n) \text{ time}, \qquad O(m+n) \text{ space if the merged array is stored}
$$

The merge can be stopped around the median position for $O(1)$ extra space, but it remains $O(m+n)$ time.

### Key Observation

Do not search for a median value. Search for a partition:

```text
A: [ leftA | rightA ]
B: [ leftB | rightB ]
```

The partition is valid when it has the right count on the left and no cross-array ordering violation:

```text
leftA <= rightB
leftB <= rightA
```

### Search Space

Let `A` be the shorter array and `B` the longer one.

```text
leftHalfSize = (A.size() + B.size() + 1) / 2

cutA = number of A elements placed on the left, from 0 to A.size()
cutB = leftHalfSize - cutA
```

Binary-search `cutA`; `cutB` follows automatically so the combined left side always has the correct size.

### Four Boundary Values

| Boundary | Meaning | Value when boundary does not exist |
| --- | --- | --- |
| `leftA` | Last A value on left | `INT_MIN` when `cutA == 0` |
| `rightA` | First A value on right | `INT_MAX` when `cutA == A.size()` |
| `leftB` | Last B value on left | `INT_MIN` when `cutB == 0` |
| `rightB` | First B value on right | `INT_MAX` when `cutB == B.size()` |

```cpp
leftA  = cutA == 0 ? INT_MIN : A[cutA - 1];
rightA = cutA == A.size() ? INT_MAX : A[cutA];
leftB  = cutB == 0 ? INT_MIN : B[cutB - 1];
rightB = cutB == B.size() ? INT_MAX : B[cutB];
```

### Boundary Updates

| Condition | Meaning | Update |
| --- | --- | --- |
| `leftA <= rightB && leftB <= rightA` | Valid partition | Return median |
| `leftA > rightB` | Too many A values placed on the left | Move `cutA` left |
| Otherwise | Too few A values placed on the left | Move `cutA` right |

### Loop Invariant

```text
The valid partition's cut position in A remains in [low, high].
For every tested cut, cutB keeps the total left partition size fixed.
```

### Median Calculation

The left side contains the extra element when the total length is odd.

```cpp
if (totalSize % 2 == 1) {
    return max(leftA, leftB);
}

return (max(leftA, leftB) + min(rightA, rightB)) / 2.0;
```

### Correctness Argument

Each array is internally sorted, so the only possible ordering violations across the virtual partition are `leftA > rightB` and `leftB > rightA`. A valid partition eliminates both violations while placing exactly half the elements on the left.

- If `leftA > rightB`, the A contribution is too large; reducing `cutA` is the only way to remove that oversized A boundary.
- Otherwise, if the partition is not valid, `leftB > rightA`, so A contributes too few left values and `cutA` must increase.

Binary search preserves the range containing the valid cut. At the valid partition, the median is the largest left boundary for odd total length, or the average of the two central boundaries for even length.

### Complexity

Only the shorter array is searched.

$$
O(\log(\min(m, n))) \text{ time}, \qquad O(1) \text{ extra space}
$$

### My Passing Solution

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int>* first = &nums1;
        vector<int>* second = &nums2;

        if (first->size() > second->size()) {
            swap(first, second);
        }

        const vector<int>& A = *first;
        const vector<int>& B = *second;
        int totalSize = A.size() + B.size();
        int leftHalfSize = (totalSize + 1) / 2;
        int l = 0;
        int r = A.size();

        while (l <= r) {
            int cutA = l + (r - l) / 2;
            int cutB = leftHalfSize - cutA;

            int leftA = cutA == 0 ? INT_MIN : A[cutA - 1];
            int rightA = cutA == A.size() ? INT_MAX : A[cutA];
            int leftB = cutB == 0 ? INT_MIN : B[cutB - 1];
            int rightB = cutB == B.size() ? INT_MAX : B[cutB];

            if (leftA <= rightB && leftB <= rightA) {
                if (totalSize % 2 == 1) {
                    return max(leftA, leftB);
                }

                return (max(leftA, leftB) + min(rightA, rightB)) / 2.0;
            }

            if (leftA > rightB) {
                r = cutA - 1;
            } else {
                l = cutA + 1;
            }
        }

        return 0.0;
    }
};
```

### Interview-Optimal C++ Solution

The same algorithm with descriptive names and no mutable input swapping:

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        const vector<int>* shorter = &nums1;
        const vector<int>* longer = &nums2;

        if (shorter->size() > longer->size()) {
            swap(shorter, longer);
        }

        int shorterSize = shorter->size();
        int longerSize = longer->size();
        int leftSize = (shorterSize + longerSize + 1) / 2;
        int low = 0;
        int high = shorterSize;

        while (low <= high) {
            int shorterCut = low + (high - low) / 2;
            int longerCut = leftSize - shorterCut;

            int shorterLeft = shorterCut == 0 ? INT_MIN : (*shorter)[shorterCut - 1];
            int shorterRight = shorterCut == shorterSize ? INT_MAX : (*shorter)[shorterCut];
            int longerLeft = longerCut == 0 ? INT_MIN : (*longer)[longerCut - 1];
            int longerRight = longerCut == longerSize ? INT_MAX : (*longer)[longerCut];

            if (shorterLeft <= longerRight && longerLeft <= shorterRight) {
                if ((shorterSize + longerSize) % 2 == 1) {
                    return max(shorterLeft, longerLeft);
                }

                return (max(shorterLeft, longerLeft) + min(shorterRight, longerRight)) / 2.0;
            }

            if (shorterLeft > longerRight) {
                high = shorterCut - 1;
            } else {
                low = shorterCut + 1;
            }
        }

        return 0.0;
    }
};
```

### Failure Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery over multiple sessions |
| Outcome | Solution-dependent derivation, then targeted implementation repair |
| Primary failure | Could not invent the virtual partition / valid-cut model independently |
| Secondary failure | Off-by-one boundary semantics: mixed element indices with counts placed on the left |
| Final bug | Used `cutA + 1 == A.size()` instead of `cutA == A.size()` for `rightA` sentinel |
| What fixed it | Treat every cut as a count, then define boundaries relative to that count |
| Mastery status | Not mastered; requires blank reconstruction and a transfer explanation |

### What To Notice Next Time

```text
When two sorted collections must behave like one sorted collection,
but merging is too slow, search for a valid partition instead of a value.

Define each cut as a count of left-side elements.
Then four adjacent boundary values are enough to validate the entire split.
```

### One-Minute Interview Answer

> I binary-search the partition point in the smaller array. The other partition point is determined by forcing the virtual left half to contain half the total elements. For each pair of cuts, I inspect only four boundary values. When both cross-boundary comparisons hold, every left value is at most every right value, so the median is determined by the maximum left boundary and minimum right boundary. Searching only the shorter array takes $O(\log(\min(m,n)))$ time.

### Recall Prompts

Do not reread this card before answering.

1. What exactly does `cutA` represent?
2. Why can `cutA` range from `0` through `A.size()` inclusive?
3. Write `cutB` in terms of `leftHalfSize` and `cutA`.
4. State both valid-partition comparisons.
5. Why does `leftA > rightB` mean that `cutA` is too large?
6. Why is the odd-length median `max(leftA, leftB)`?
7. What must `rightA` be when `cutA == A.size()`?

### Transfer and Contrast

| Type | Problem / concept | What to derive before code |
| --- | --- | --- |
| Reconstruction | Median of Two Sorted Arrays | Recreate cuts and four boundaries from blank |
| Contrast | Koko Eating Bananas | Partition-position search versus monotonic answer search |
| Contrast | Time Based Key-Value Store | Rightmost-valid index search versus valid partition search |
| Extension | Kth Smallest Element in Two Sorted Arrays | How does target rank alter required left partition size? |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | Explain `cutA`, `cutB`, and all four sentinels without code |
| Day +1 | Write only the four-boundary setup from a blank editor |
| Day +3 | Reconstruct the full solution in C++ without notes |
| Day +7 | Explain why `cutA + 1 == A.size()` is wrong using a cut-after-last-element example |
| Day +14 | Derive the approach again from a fresh example before looking at this card |
| Pre-interview | Read only One-Line Classification, Search Space, Boundary Updates, and One-Minute Interview Answer |