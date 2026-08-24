# Time Based Key-Value Store: Rightmost Valid Timestamp

## Interview Revision Card

### One-Line Classification

Store each key's timestamped history in chronological order, then binary-search for the rightmost timestamp that is at most the requested time.

### The Recognition Cue

The prompt asks for the latest historical record satisfying a threshold:

```text
largest stored timestamp <= requested timestamp
```

When records arrive in sorted order, append them and binary-search for the rightmost valid record.

### Data Model

```text
key -> [(timestamp, value), (timestamp, value), ...]
```

An `unordered_map` locates one key's history. The problem guarantees timestamps for the same key arrive in strictly increasing order, so `set` can append to a `vector`.

### Brute Force

For `get`, linearly scan the key's history and retain the latest timestamp no greater than the query.

$$
O(n) \text{ per get}, \qquad O(1) \text{ extra space beyond stored history}
$$

### Key Observation

Within one key's sorted timestamp vector, a timestamp is either:

- valid: `storedTimestamp <= queryTimestamp`, or
- too late: `storedTimestamp > queryTimestamp`.

All valid timestamps form a prefix. Find the **rightmost** element of that prefix.

### Search State and Loop Invariant

```text
idx is the rightmost valid timestamp index found so far.
idx == -1 means no timestamp <= queryTimestamp has been found.

All indices below left have been considered.
If a valid answer exists, it is either idx or remains in [left, right].
```

### Boundary Updates

| Condition | Meaning | Update |
| --- | --- | --- |
| `history[mid].timestamp <= queryTimestamp` | Valid candidate; a later valid timestamp may exist | Save `mid`; `left = mid + 1` |
| `history[mid].timestamp > queryTimestamp` | Too late, as are all later timestamps | `right = mid - 1` |

If `idx` remains `-1`, return `""`.

### Correctness Argument

Timestamp order makes all records at or before the query a contiguous prefix.

- A valid midpoint is a candidate answer, but a later record may also be valid, so preserve it and search right.
- A too-late midpoint and every later timestamp are invalid, so search left.

When the interval is exhausted, `idx` is exactly the rightmost valid index, or `-1` if no valid timestamp exists.

### Complexity

Let $n$ be the number of stored versions for one key.

| Operation | Time | Reason |
| --- | --- | --- |
| `set` | $O(1)$ amortized | Append to a per-key vector |
| `get` | $O(\log n)$ | Rightmost-valid binary search |
| Storage | $O(T)$ | $T$ total timestamp/value entries across all keys |

### My Passing Solution

```cpp
class TimeMap {
public:
    unordered_map<string, vector<pair<int, string>>> hashmap;

    TimeMap() {}

    void set(string key, string value, int timestamp) {
        hashmap[key].push_back({timestamp, value});
    }

    string get(string key, int timestamp) {
        const vector<pair<int, string>>& search = hashmap[key];
        int l = 0;
        int r = search.size() - 1;
        int idx = -1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            int currentTimestamp = search[m].first;

            if (currentTimestamp <= timestamp) {
                idx = m;
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return idx == -1 ? "" : search[idx].second;
    }
};
```

### Interview-Optimal C++ Solution

Your final implementation is already the interview-optimal core solution. This defensive variant avoids inserting an empty history when `get` is called for a missing key.

```cpp
class TimeMap {
public:
    unordered_map<string, vector<pair<int, string>>> historyByKey;

    void set(string key, string value, int timestamp) {
        historyByKey[key].push_back({timestamp, value});
    }

    string get(string key, int timestamp) {
        auto keyHistory = historyByKey.find(key);
        if (keyHistory == historyByKey.end()) {
            return "";
        }

        const auto& history = keyHistory->second;
        int left = 0;
        int right = static_cast<int>(history.size()) - 1;
        int answerIndex = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (history[mid].first <= timestamp) {
                answerIndex = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return answerIndex == -1 ? "" : history[answerIndex].second;
    }
};
```

### Failure Record

| Field | Record |
| --- | --- |
| Attempt type | Discovery |
| Highest hint reached | Implementation help for the no-valid-timestamp sentinel |
| Outcome | Hint-assisted implementation; core data model and algorithm derived independently |
| Primary roadblock | Edge case: query timestamp precedes the first stored timestamp |
| Initial bug | `idx = 0` incorrectly treated the first record as valid |
| Repair | Use `idx = -1` as “no predecessor found” and return `""` if unchanged |

### What To Notice Next Time

When a query asks for the latest item satisfying `value <= threshold`:

```text
1. Sort or exploit existing order.
2. Search for the rightmost valid item, not exact equality.
3. Use a sentinel for “no valid candidate exists.”
4. On a valid midpoint, save it and search right.
```

### One-Minute Interview Answer

> I store each key's values in a vector of timestamp/value pairs. Since writes for a key arrive in increasing timestamp order, appending is constant amortized time. For a get request, I binary-search the key's vector for the rightmost timestamp at most the requested time. A valid midpoint becomes a candidate and I continue right; a too-late midpoint sends me left. The result is $O(\log n)$ per lookup.

### Recall Prompts

Do not reread this card before answering.

1. Why can `set` append rather than insert into a sorted structure?
2. What is the exact binary-search predicate?
3. Why does a valid midpoint move `left` right rather than return immediately?
4. What does `idx = -1` represent?
5. What should `get("a", 3)` return after `set("a", "x", 5)`?
6. Why is a hash map alone insufficient for `get`?

### Transfer and Contrast

| Type | Problem / concept | What to derive before code |
| --- | --- | --- |
| Transfer | Floor / predecessor query in a sorted array | Find rightmost value `<= target` |
| Transfer | Versioned configuration lookup | Retrieve latest configuration before a release time |
| Contrast | Exact binary search | Why equality alone is insufficient when the query time may not exist |

### Review Schedule

| Review | Task |
| --- | --- |
| Same day | Explain the predicate, `idx = -1`, and both boundary updates without notes |
| Day +1 | Re-code `get` from blank, including the “before first timestamp” test |
| Day +3 | Implement a standalone rightmost-`<= target` helper for a sorted integer vector |
| Day +7 | Contrast predecessor search with exact binary search |
| Pre-interview | Read only One-Line Classification, Data Model, Boundary Updates, and One-Minute Interview Answer |