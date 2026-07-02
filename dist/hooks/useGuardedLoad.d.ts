import { GuardedState } from '../data';
/**
 * The screen-side binding of the data-access layer's loading/error contract
 * (#28): run `load` on mount (and on `reload`), with loading guaranteed to
 * clear and any throw — from the fetches OR the post-fetch view-model
 * transform — surfacing as the given error message instead of a hang.
 *
 * `deps` re-creates the loader like useCallback deps would; pass the values
 * the loader closes over (usually none).
 */
export declare function useGuardedLoad<T>(load: () => Promise<T>, errorMessage: string, deps?: unknown[]): GuardedState<T> & {
    reload: () => void;
};
