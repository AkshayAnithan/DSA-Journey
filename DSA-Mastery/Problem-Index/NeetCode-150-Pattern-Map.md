# NeetCode 150 Pattern Map

This is the recognition map for the 30-day FAANG-focused phase. A problem can belong to more than one pattern; the first label is the main reasoning skill it is intended to train.

## Arrays and Hashing

| Problem | Primary recognition cue | Core pattern |
| --- | --- | --- |
| Contains Duplicate | Need to detect repeated identity | Set membership |
| Valid Anagram | Equality of multiplicities, not ordering | Frequency count |
| Two Sum | Need a complement while scanning | Hash map lookup |
| Group Anagrams | Need a canonical representation for equivalent strings | Hashing a signature |
| Top K Frequent Elements | Frequency first, then rank | Counting plus bucket/heap |
| Product of Array Except Self | Product excludes current position | Prefix/suffix accumulation |
| Valid Sudoku | Repeated constraints across rows, columns, boxes | Constraint sets |
| Encode and Decode Strings | Variable-size pieces need unambiguous boundaries | Length-prefixed encoding |
| Longest Consecutive Sequence | Neighbor relation without ordered traversal | Set expansion |

## Two Pointers and Sliding Window

| Problem | Primary recognition cue | Core pattern |
| --- | --- | --- |
| Valid Palindrome | Compare symmetric positions after filtering | Opposite pointers |
| 3Sum | Sorted input lets a pair sum be adjusted monotonically | Sort plus two pointers |
| Container With Most Water | Width shrinks; only one height choice can improve | Greedy opposite pointers |
| Trapping Rain Water | Water level determined by boundaries | Two pointers with maxima |
| Best Time to Buy and Sell Stock | Best earlier value while scanning | Running optimum |
| Longest Substring Without Repeating Characters | Contiguous range with a validity rule | Variable window |
| Longest Repeating Character Replacement | Window is repairable within a budget | Frequency window |
| Permutation in String | Fixed-length range must match a frequency target | Fixed window frequency |
| Minimum Window Substring | Smallest valid range that covers requirements | Expand/shrink window |
| Sliding Window Maximum | Need range maximum as endpoints move | Monotonic deque |

## Stack and Binary Search

| Problem | Primary recognition cue | Core pattern |
| --- | --- | --- |
| Valid Parentheses | Most recent unmatched opener matters | Stack matching |
| Min Stack | Need current minimum after reversible operations | Augmented stack |
| Evaluate Reverse Polish Notation | Operators consume previous values | Operand stack |
| Generate Parentheses | Build valid sequence subject to counts | Backtracking with invariant |
| Daily Temperatures | Next greater item to the right | Monotonic stack |
| Car Fleet | Ordered positions merge by non-increasing arrival time | Sort plus monotonic stack |
| Largest Rectangle in Histogram | First smaller boundary determines span | Monotonic stack |
| Binary Search | Ordered values permit half elimination | Search invariant |
| Search a 2D Matrix | Globally ordered flattened space | Binary search transformation |
| Koko Eating Bananas | Feasibility changes monotonically with answer | Binary search on answer |
| Find Minimum in Rotated Sorted Array | One half remains ordered | Rotated binary search |
| Time Based Key-Value Store | Query latest timestamp at or before target | Upper-bound binary search |

## Linked Lists

| Problem | Primary recognition cue | Core pattern |
| --- | --- | --- |
| Reverse Linked List | Redirect links while retaining the next node | Iterative reversal |
| Merge Two Sorted Lists | Repeatedly select smaller front item | Dummy head merge |
| Reorder List | Need middle, reverse tail, then weave | Fast/slow plus reversal |
| Remove Nth Node From End | Fixed gap identifies predecessor in one pass | Two pointers with dummy |
| Copy List with Random Pointer | New nodes require correspondence to old nodes | Hash map / interleaving |
| Linked List Cycle | Two speeds reveal repeated traversal | Fast/slow pointers |
| Find Duplicate Number | Values behave like next pointers | Cycle detection transformation |
| LRU Cache | Need O(1) lookup and O(1) recency updates | Hash map plus doubly linked list |
| Merge K Sorted Lists | Repeatedly choose globally smallest list head | Heap merge |
| Reverse Nodes in K-Group | Reverse only complete fixed-size groups | Group boundary control |

## Trees, Tries, and Heap

| Problem family | Recognition cue | Core pattern |
| --- | --- | --- |
| Tree DFS | Answer depends on descendants or paths | Recursive return contract |
| Tree BFS | Answer depends on nearest/level grouping | Queue by level |
| BST validation / kth smallest | In-order traversal has sorted meaning | BST invariant |
| LCA | Subtrees report whether they contain targets | Post-order aggregation |
| Trie problems | Prefixes are repeatedly queried/shared | Character trie |
| Kth Largest / Top K | Keep only the most relevant ranked items | Heap |
| Median Finder | Stream split around a moving median | Two heaps |
| Task Scheduler | Choose most frequent available work with cooldown | Heap plus queue |

## Graphs

| Problem family | Recognition cue | Core pattern |
| --- | --- | --- |
| Islands / components | Reaching all connected cells/nodes | DFS or BFS |
| Clone Graph | Rebuilding with cycles needs old-to-new identity | DFS/BFS plus map |
| Course Schedule | Directed dependencies must have no cycle | DFS states / topological sort |
| Pacific Atlantic | Multiple sources can reach shared state | Reverse multi-source traversal |
| Number of Islands II / redundant connection | Connectivity changes across edge additions | Union find |
| Network Delay Time | Weighted shortest distance from a source | Dijkstra |
| Cheapest Flights Within K Stops | Edge-count limit affects the state | Bellman-Ford-style relaxation |
| Min Cost to Connect Points | Connect all vertices at minimum total edge cost | MST |

## Backtracking, DP, Greedy, and Intervals

| Problem family | Recognition cue | Core pattern |
| --- | --- | --- |
| Subsets / permutations / combinations | Enumerate choices, undo state, prune invalid branches | Backtracking |
| 1D DP | Future answer depends on small prior prefix state | State recurrence |
| Grid / 2D DP | Position plus another dimension captures subproblem | 2D state |
| LCS / edit distance | Align prefixes with take/skip transitions | Subsequence DP |
| Coin change / partition | Reusable choices and target capacity | Knapsack-style DP |
| Jump Game / Gas Station | A local summary proves future reachability | Greedy invariant |
| Merge / insert intervals | Endpoints determine overlap | Sort and scan |
| Meeting Rooms | Concurrent intervals determine resource need | Sweep / min-heap |

## Recall Rule

For every row, do not memorize the label. On a fresh problem, state the cue in your own words, propose brute force, and explain why the cue permits the pattern.