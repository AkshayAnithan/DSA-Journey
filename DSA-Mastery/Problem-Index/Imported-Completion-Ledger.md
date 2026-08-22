# Imported Completion Ledger

Imported from [AkshayAnithan/DSA_CP](https://github.com/AkshayAnithan/DSA_CP), branch `main`, on 2026-08-22. A row means a solution directory exists; it does **not** mean independent recall or mastery.

## Baseline Summary

| Topic | Submitted | NeetCode 150 total | Mastery evidence |
| --- | ---: | ---: | --- |
| Arrays and Hashing | 9 | 9 | Unassessed |
| Two Pointers | 5 | 5 | Unassessed |
| Sliding Window | 0 | 6 | Unassessed |
| Stack | 6 | 7 | Unassessed |
| Binary Search | 2 | 7 | Unassessed |
| Linked List | 0 | 11 | Unassessed |
| Trees | 15 | 15 | Unassessed |
| Heap through Bit Manipulation | 0 | 97 | Unassessed |
| **Total** | **37** | **150** | **Unassessed** |

## Imported Problems

| Topic | Canonical problem | Repository directory | Primary cue | Pattern |
| --- | --- | --- | --- | --- |
| Arrays and Hashing | Contains Duplicate | `duplicate-integer` | Need to spot repeated identity | Set membership |
| Arrays and Hashing | Valid Anagram | `is-anagram` | Equality of counts, not order | Frequency count |
| Arrays and Hashing | Two Sum | `two-integer-sum` | Need a complement while scanning | One-pass hash map |
| Arrays and Hashing | Group Anagrams | `anagram-groups` | Equivalent strings need a shared key | Canonical signature |
| Arrays and Hashing | Top K Frequent Elements | `top-k-elements-in-list` | Count first, then select by rank | Frequency plus bucket/heap |
| Arrays and Hashing | Encode and Decode Strings | `string-encode-and-decode` | Variable-length strings need boundaries | Length-prefixed encoding |
| Arrays and Hashing | Product of Array Except Self | `products-of-array-discluding-self` | Exclude self without division | Prefix/suffix products |
| Arrays and Hashing | Valid Sudoku | `valid-sudoku` | Repeated row/column/box constraints | Constraint sets |
| Arrays and Hashing | Longest Consecutive Sequence | `longest-consecutive-sequence` | Neighbor relations without sorting | Set expansion |
| Two Pointers | Valid Palindrome | `is-palindrome` | Compare cleaned symmetric positions | Opposite pointers |
| Two Pointers | Two Sum II | `two-integer-sum-ii` | Sorted pair sum moves predictably | Opposite pointers |
| Two Pointers | 3Sum | `three-integer-sum` | Fix one; sorted remainder is monotonic | Sort plus two pointers |
| Two Pointers | Container With Most Water | `max-water-container` | Width shrinks; one boundary is dominated | Greedy pointers |
| Two Pointers | Trapping Rain Water | `trapping-rain-water` | Water depends on smaller boundary maximum | Two pointers with maxima |
| Stack | Valid Parentheses | `validate-parentheses` | Latest unmatched opener controls validity | Matching stack |
| Stack | Min Stack | `minimum-stack` | Minimum must survive push/pop | Augmented stack |
| Stack | Evaluate Reverse Polish Notation | `evaluate-reverse-polish-notation` | Operators consume prior operands | Value stack |
| Stack | Daily Temperatures | `daily-temperatures` | Need next warmer value | Monotonic decreasing stack |
| Stack | Car Fleet | `car-fleet` | Ordered arrivals merge when time cannot increase | Sort plus monotonic stack |
| Stack | Largest Rectangle in Histogram | `largest-rectangle-in-histogram` | First smaller boundaries determine span | Monotonic stack |
| Binary Search | Binary Search | `binary-search` | Ordering allows half elimination | Search invariant |
| Binary Search | Search a 2D Matrix | `search-2d-matrix` | Matrix has global order | Flattened binary search |
| Trees | Invert Binary Tree | `invert-a-binary-tree` | Same local operation at each node | DFS recursion |
| Trees | Maximum Depth of Binary Tree | `depth-of-binary-tree` | Parent answer aggregates child answers | DFS height contract |
| Trees | Diameter of Binary Tree | `binary-tree-diameter` | Best path may pass through a node | Post-order aggregation |
| Trees | Balanced Binary Tree | `balanced-binary-tree` | Need height and invalidity from children | Post-order sentinel |
| Trees | Same Tree | `same-binary-tree` | Corresponding nodes must match | Paired DFS |
| Trees | Subtree of Another Tree | `subtree-of-a-binary-tree` | Search candidate roots, then compare | DFS plus equality |
| Trees | LCA of a BST | `lowest-common-ancestor-in-binary-search-tree` | BST ordering directs both targets | BST navigation |
| Trees | Binary Tree Level Order Traversal | `level-order-traversal-of-binary-tree` | Output groups by distance from root | BFS queue |
| Trees | Binary Tree Right Side View | `binary-tree-right-side-view` | Need last visible node per level | BFS / depth-aware DFS |
| Trees | Count Good Nodes in Binary Tree | `count-good-nodes-in-binary-tree` | Path carries a running maximum | DFS with path state |
| Trees | Validate Binary Search Tree | `valid-binary-search-tree` | Each subtree has strict bounds | DFS bounds invariant |
| Trees | Kth Smallest Element in a BST | `kth-smallest-integer-in-bst` | In-order traversal is sorted | In-order traversal |
| Trees | Construct Tree from Preorder and Inorder | `binary-tree-from-preorder-and-inorder-traversal` | Traversal orders identify root and partitions | Recursive construction plus index map |
| Trees | Binary Tree Maximum Path Sum | `binary-tree-maximum-path-sum` | Returned path and global path differ | Post-order DP |
| Trees | Serialize and Deserialize Binary Tree | `serialize-and-deserialize-binary-tree` | Structure needs null markers and reversible format | DFS encoding |

## First Revision Priority

The completed tree section is a rich diagnostic pool, not proof that trees are mastered. Begin with blind reconstruction of `Diameter of Binary Tree`, `Validate Binary Search Tree`, and `Binary Tree Maximum Path Sum`; they test distinct recursive contracts and reveal whether the existing tree work is retrieval or recognition.