# Action Hook Documentation

![npm](https://img.shields.io/npm/v/action-hook)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FSloth9527%2FactionHook%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/Sloth9527/actionHook/goto?ref=master)
![npm bundle size](https://img.shields.io/bundlephobia/min/action-hook)
![NPM](https://img.shields.io/npm/l/action-hook)

Use useReducer more efficiently.

## Install

```shell
$ npm install action-hook
```

## Usage

### 1. useActions

The hook accept reducers of type `{ reducerName: (state:T, payload:type) => newState }`, And return state and actions.

Action is function that wraps dispatch like `(payload:type) => { dispatch( type: 'reducerName', payload ); }`;

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

## Extend Your Own Action Hooks

You can extend Action Hooks like [useLoading](https://github.com/Sloth9527/actionHook/tree/master/src/useLoading) hook.

1. Define initstate and reducers.
  ```typescript
      // state.ts
      export interface LoadingStateInterface {
        loading: number;
      }
      export const initialLoadingState: LoadingStateInterface = {
        loading: 0,
      };
  ```
  ```typescript
      // reducers.ts
      import type { LoadingStateInterface } from "./state";

      function loading<T extends LoadingStateInterface>(state: T): T {
        return {
          ...state,
          loading: state.loading + 1,
        };
      }

      function loadingCompleted<T extends LoadingStateInterface>(state: T): T {
        return {
          ...state,
          loading: state.loading - 1,
        };
      }

      const reducers = {
        loading,
        loadingCompleted,
      };

      export default reducers;
      export type LoadingReducersTypes = typeof reducers;
  ```
2. Extend useActions hook.
  ```typescript
      // useLoading.ts
      import useActions, {
        ReducersInterface,
        StateAndActionsInterface,
        merge
      } from "action-hook";
      import { initialLoadingState, LoadingStateInterface } from "./state";
      import loadingReducers, { LoadingReducersTypes } from "./reducers";
      export { loadingSelector } from "./selector";

      type MergeReducers<R> = LoadingReducersTypes & R;
      type MergeState<S> = LoadingStateInterface & S;

      type StateActions<S, R> = StateAndActionsInterface<
        MergeState<S>,
        MergeReducers<R>
      >;

      export default function useLoadingActions<S, R extends ReducersInterface>(
        reducers?: R,
        initialState?: S
      ): StateActions<S, R> {
        return useActions(
          merge(loadingReducers, reducers as R),
          merge(initialLoadingState, initialState as S)
        );
      }
  ```
3. Create `selector.ts` file to reading complex state.
  ```typescript
      // selector.ts
      import type { LoadingStateInterface } from "./state";

      export const loadingSelector = (state: LoadingStateInterface) =>
        state.loading > 0;
  ```
