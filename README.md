# Action Hook Documentation

Use useReducer more efficiently.

## Install

```shell
$ npm install action-hook
```

## Usage

### 1. useActions

```typescript
import { useActions } from 'action-hook';

const initState  = { count: 0 };

const reducers = {
  add: (state, payload: number) => ({
    ...state,
    count: state.count + payload,
  }),
  increment: (state) => ({
    ...state,
    count: state.count + 1,
  }),
};

const [state, actions] = useActions(reducers, initState);


actions.increment() // state.count: 0 => 1
actions.add(10) // state.count: 1 => 11

```

### 2. useLoading

```typescript
import { useLoading, loadingSelector } from 'action-hook';

const initState  = { count: 0 };

const reducers = {
  increment: (state) => ({
    ...state,
    count: state.count + 1,
  }),
};

const [state, actions] = useLoading(reducers, initState);

actions.loading() // state.loading: 0 => 1
loadingSelector(state) // true

actions.increment() // state.count: 0 => 1

actions.loadingCompleted() // state.loading: 0 => 1
loadingSelector(state) // false

```
