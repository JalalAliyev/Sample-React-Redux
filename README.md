# Redux Main Topics, Principles and Usage Patterns

# 🔴Async Logic and Data Fetching
# 🔺You can write reusable "selector" functions to encapsulate reading values from the Redux state
Selectors are functions that get the Redux state as an argument, and return some data
# 🔺Redux uses plugins called "middleware" to enable async logic
The standard async middleware is called redux-thunk, which is included in Redux Toolkit
Thunk functions receive dispatch and getState as arguments, and can use those as part of async logic
# 🔺You can dispatch additional actions to help track the loading status of an API call
The typical pattern is dispatching a "pending" action before the call, then either a "success" containing the data or a "failure" action containing the error
Loading state should usually be stored as an enum, like 'idle' | 'loading' | 'succeeded' | 'failed'
# 🔺Redux Toolkit has a createAsyncThunk API that dispatches these actions for you
createAsyncThunk accepts a "payload creator" callback that should return a Promise, and generates pending/fulfilled/rejected action types automatically
Generated action creators like fetchPosts dispatch those actions based on the Promise you return
You can listen for these action types in createSlice using the extraReducers field, and update the state in reducers based on those actions.
Action creators can be used to automatically fill in the keys of the extraReducers object so the slice knows what actions to listen for.

# 🔴Performance and Normalizing Data

# 🔺Memoized selector functions can be used to optimize performance
Redux Toolkit re-exports the createSelector function from Reselect, which generates memoized selectors
Memoized selectors will only recalculate the results if the input selectors return new values
Memoization can skip expensive calculations, and ensure the same result references are returned
# 🔺There are multiple patterns you can use to optimize React component rendering with Redux
Avoid creating new object/array references inside of useSelector - those will cause unnecessary re-renders
Memoized selector functions can be passed to useSelector to optimize rendering
useSelector can accept an alternate comparison function like shallowEqual instead of reference equality
Components can be wrapped in React.memo() to only re-render if their props change
List rendering can be optimized by having list parent components read just an array of item IDs, passing the IDs to list item children, and retrieving items by ID in the children
# 🔺Normalized state structure is a recommended approach for storing items
"Normalization" means no duplication of data, and keeping items stored in a lookup table by item ID
Normalized state shape usually looks like {ids: [], entities: {}}
# 🔺Redux Toolkit's createEntityAdapter API helps manage normalized data in a slice
Item IDs can be kept in sorted order by passing in a sortComparer option
The adapter object includes:
adapter.getInitialState, which can accept additional state fields like loading state
Prebuilt reducers for common cases, like setAll, addMany, upsertOne, and removeMany
adapter.getSelectors, which generates selectors like selectAll and selectById
