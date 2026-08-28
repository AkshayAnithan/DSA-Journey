# Buy and Sell Crypto: Running Minimum

## Interview Revision Card

### One-Line Classification

Scan prices once, maintaining the cheapest earlier buy price and the best valid buy-before-sell profit so far.

### The Recognition Cue

For each current position, the answer depends on the best or worst value in its past prefix. Ask whether all prior elements can be replaced by one running summary.

This problem sits beside sliding-window questions in NeetCode, but it does not need a movable left boundary. The reusable idea is a **one-pass prefix invariant**.

### Brute Force

Try every buy day and every later sell day.

$$
O(n^2) \text{ time}, \qquad O(1) \text{ extra space}
$$

### Bottleneck

For every potential sell day, brute force rescans all earlier days to find the cheapest valid buy price.

### Key Observation

When selling at today's price, only the smallest price seen on an earlier day can produce the best profit today. Every larger earlier price is dominated as a buy choice.

### Loop Invariant

After processing `prices[0...i]`:

```text
minPrice is the minimum price in prices[0...i].

maxProfit is the maximum profit from a valid buy-before-sell transaction
whose buy and sell days both lie in prices[0...i].
```

### Core Algorithm

For each `price` scanned left to right:

```text
1. Treat today as the sell day and compute price - minPrice.
2. Update maxProfit if that sale is better.
3. Let today become a possible buy day by updating minPrice.
```

Updating profit before `minPrice` makes the chronology explicit: sell today using an earlier buy, then consider today as a buy for future days. The reverse order also works here because a new minimum produces zero profit, but it is less clear in an interview.

### Correctness Argument

At every day, `minPrice` summarizes the best possible earlier buy price. Therefore `price - minPrice` is the maximum profit for a transaction that sells today. Taking the maximum across every sell day considers every possible optimal sell day exactly once. The invariant preserves both summaries, so the final `maxProfit` is optimal.

### Complexity

$$
O(n) \text{ time}, \qquad O(1) \text{ extra space}
$$

### My Passing Solution

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = prices[0];
        int maxProfits = 0;

        for (int& price : prices) {
            maxProfits = max(maxProfits, price - minPrice);
            minPrice = min(price, minPrice);
        }

        return maxProfits;
    }
};
```

### Interview-Optimal C++ Solution

This is the same algorithm with conventional singular naming and immutable iteration.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = prices[0];
        int maxProfit = 0;

        for (int price : prices) {
            maxProfit = max(maxProfit, price - minPrice);
            minPrice = min(minPrice, price);
        }

        return maxProfit;
    }
};
```

### Failure Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery |
| Highest hint reached | Bottleneck and invariant guidance |
| Outcome | Hint-assisted derivation, then independently implemented |
| Initial roadblock | Could not identify the repeated work in the $O(n^2)$ approach or formulate an invariant |
| What fixed it | For each sell day, remember only the minimum prior price |

### What To Notice Next Time

```text
When every current element pairs with something earlier,
ask whether one best/worst prefix summary replaces scanning the full past.
```

### One-Minute Interview Answer

> For every day as a possible selling day, the only earlier buy price that matters is the minimum price seen so far. I maintain that running minimum and compute today's candidate profit against it. The maximum candidate across the scan is the answer, giving linear time and constant extra space.

### Recall Prompts

1. What repeated work makes brute force quadratic?
2. State `minPrice` and `maxProfit` after processing index `i`.
3. Why does one minimum replace every earlier buy day?
4. Why is candidate profit evaluated before today updates `minPrice`?
5. What does the algorithm return for a strictly decreasing price sequence, and why?

### Transfer and Contrast

| Type | Problem / concept | What to derive before code |
| --- | --- | --- |
| Transfer | Maximum difference with earlier smaller element | What prefix summary is needed for each current value? |
| Transfer | Best Time to Buy and Sell Stock II | Why does allowing multiple transactions change the invariant? |
| Contrast | Longest Substring Without Repeating Characters | Why must a left boundary move there, unlike this prefix-summary problem? |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | State the bottleneck and both invariant variables without notes |
| Day +1 | Re-code from blank and explain the scan order |
| Day +3 | Solve a maximum-difference transfer question without pattern labels |
| Day +7 | Contrast a running-prefix summary with a variable sliding window |
| Pre-interview | Read only One-Line Classification, Loop Invariant, and One-Minute Interview Answer |