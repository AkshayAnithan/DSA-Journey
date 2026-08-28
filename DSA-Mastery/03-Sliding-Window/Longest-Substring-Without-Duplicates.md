# Longest Substring Without Duplicates: Variable Window

## Interview Revision Card

### One-Line Classification

Maintain the largest contiguous window whose characters are all distinct; when the incoming character duplicates one inside the window, move the left boundary until validity returns.

### Recognition Cue

The question asks for a longest or shortest **contiguous** range subject to a condition that can become valid again by removing elements from the left.

### Brute Force

Enumerate every substring and check whether it contains a duplicate.

$$
O(n^3) \text{ time with a repeated scan}, \qquad O(n) \text{ auxiliary space}
$$

Even improving each uniqueness check with a set still repeatedly reconstructs overlapping substring state.

### Bottleneck

Adjacent substrings share nearly all of their characters. Restarting a duplicate check for each possible range discards reusable state.

### Key Observation

When adding `str[right]` creates a duplicate, extending `right` cannot repair the window. Removing characters from the left is the only operation that can restore uniqueness. Once `str[right]` is no longer in the set, the window is valid again.

### Loop Invariant

At the end of each iteration:

```text
str[left...right] contains no duplicate characters.

The set contains exactly the characters in str[left...right].

maxLength is the length of the largest valid window encountered so far.
```

### Core Algorithm

```text
left = 0
for each right from 0 to n - 1:
    while str[right] is already in the window:
        remove str[left] from the set
        left++

    add str[right] to the set
    update maxLength with right - left + 1
```

`while`, rather than `if`, is required because the existing duplicate may be several positions away from `left`. For `"abba"`, a second `b` requires removing `a` and then the first `b` before the new `b` can enter the window.

### Correctness Argument

Before an incoming character is added, the repair loop removes exactly the minimum prefix necessary to make that character absent from the current window. The resulting window is valid and is the longest valid substring ending at `right`: any earlier left boundary would still include the duplicate. Checking this maximal valid ending window at every `right` covers the global optimum, so `maxLength` is correct.

### Complexity

With `unordered_set`, each character enters the set once and leaves at most once:

$$
O(n) \text{ average time}, \qquad O(\min(n, \lvert\Sigma\rvert)) \text{ space}
$$

The passing `set<char>` implementation has $O(n \log n)$ time because `contains`, `insert`, and `erase` are tree operations. It is still correct.

### My Passing Solution

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string str) {
        set<char> s;
        int maxLength = 0;
        int left = 0, n = str.size();

        for (int right = 0; right < n; right++) {
            while (s.contains(str[right]) && left <= right) {
                s.erase(str[left]);
                left++;
            }
            s.insert(str[right]);
            maxLength = max(maxLength, right - left + 1);
        }
        return maxLength;
    }
};
```

### Interview-Optimal C++ Solution

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(const string& str) {
        unordered_set<char> characters;
        int maxLength = 0;
        int left = 0;

        for (int right = 0; right < static_cast<int>(str.size()); ++right) {
            while (characters.contains(str[right])) {
                characters.erase(str[left]);
                ++left;
            }

            characters.insert(str[right]);
            maxLength = max(maxLength, right - left + 1);
        }

        return maxLength;
    }
};
```

### Outcome Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery |
| Highest hint reached | Structural guidance: repair the window by advancing `left` while the incoming character is duplicated |
| Outcome | Independently implemented and passed after guidance |
| Strong evidence | Correctly chose `left`, set maintenance, a `while` repair loop, and post-repair length update |
| Improvement | Use `unordered_set<char>` when average $O(n)$ lookup is expected |

### One-Minute Interview Answer

> I use a variable sliding window with a set representing its current characters. The invariant is that the window never contains a duplicate. When the next character is already present, I remove characters from the left until it is absent; then I add it and update the longest length. Each character enters and leaves the set at most once, so with an unordered set the algorithm is $O(n)$ average time and $O(n)$ space.

### Recall Prompts

1. Why does a duplicate force `left`, rather than `right`, to move?
2. Why must the repair operation use `while`?
3. State the set/window invariant after every outer-loop iteration.
4. Why is the current valid window the longest valid substring ending at `right`?
5. What time-complexity difference does `set` versus `unordered_set` create?

### Transfer and Contrast

| Type | Problem / concept | What to derive before code |
| --- | --- | --- |
| Transfer | Longest Repeating Character Replacement | Which window statistic determines whether the window remains valid? |
| Transfer | Permutation in String | What fixed-size condition must remain true? |
| Contrast | Buy and Sell Crypto | Why does a prefix minimum summarize the past without a left boundary? |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | Trace `"abba"`; explain why an `if` repair fails |
| Day +1 | Re-code with `unordered_set` from a blank editor and state the invariant first |
| Day +3 | Derive the window-repair condition for Longest Repeating Character Replacement |
| Day +7 | Contrast fixed, variable, and prefix-summary scans without notes |