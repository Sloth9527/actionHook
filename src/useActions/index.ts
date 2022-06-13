import React, { useReducer, useMemo, useCallback } from 'react';

type ReducerFunc<S=any> = (state:S, payload?: any) => S;

export interface ReducersInterface<S=any> {
    [key: string]: ReducerFunc<S>
}

type PayloadType<R extends ReducerFunc > = Parameters<R>[1];

type ActionsInterface<R extends ReducersInterface> = {
    [K in keyof R]? : PayloadType<R[K]> extends undefined ? () => void : (arg0: PayloadType<R[K]>) => void
};

type MergeTypes<S, A> = [S, A];

export type StateAndActionsInterface<S, R extends ReducersInterface> = MergeTypes<S, ActionsInterface<R>>;

export default function useActions<S, R extends ReducersInterface = ReducersInterface<S>>(reducers:R, initialState:S): StateAndActionsInterface<S, R> {
    const reducer = useCallback((state, action:{ type:string, payload:any }) => {
        const fn = reducers[action.type];
        if(fn) {
            return fn(state, action.payload);
        }
        return state;
    }, [reducers]);

    const [state, dispatch] = useReducer<React.Reducer<typeof initialState, any>>(reducer, initialState);

    const initActions:ActionsInterface<any> = {};

    const actions = useMemo(() => Object.keys(reducers).reduce((acs, k) => {
        return {
            ...acs,
            [k]: (payload) => {dispatch({ type: k, payload })},
        };
    }, initActions), [dispatch, reducers]);

    return [state, actions];
};
