import type { LoadingStateInterface } from './state';

export const loadingSelector = (state: LoadingStateInterface) => state.loading > 0;
