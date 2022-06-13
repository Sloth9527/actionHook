import type { LoadingStateInterface } from "./state";
import { addByStep } from "@utils/math";

function loading<T extends LoadingStateInterface>(state: T): T {
  return {
    ...state,
    loading: addByStep(state.loading, 1),
  };
}

function loadingCompleted<T extends LoadingStateInterface>(state: T): T {
  return {
    ...state,
    loading: addByStep(state.loading, -1),
  };
}

const reducers = {
  loading,
  loadingCompleted,
};

export default reducers;

export type LoadingReducersTypes = typeof reducers;
