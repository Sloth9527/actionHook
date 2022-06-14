import useActions, {
  ReducersInterface,
  StateAndActionsInterface,
} from "../useActions";
import { initialLoadingState, LoadingStateInterface } from "./state";
import loadingReducers, { LoadingReducersTypes } from "./reducers";
import { merge } from "@utils/obj";
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
