"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGuardedLoad = useGuardedLoad;
const react_1 = require("react");
const data_1 = require("../data");
/**
 * The screen-side binding of the data-access layer's loading/error contract
 * (#28): run `load` on mount (and on `reload`), with loading guaranteed to
 * clear and any throw — from the fetches OR the post-fetch view-model
 * transform — surfacing as the given error message instead of a hang.
 *
 * `deps` re-creates the loader like useCallback deps would; pass the values
 * the loader closes over (usually none).
 */
function useGuardedLoad(load, errorMessage, deps = []) {
    const [state, setState] = (0, react_1.useState)({ data: null, isLoading: true, error: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const run = (0, react_1.useCallback)(() => void (0, data_1.runGuarded)(load, setState, errorMessage), deps);
    (0, react_1.useEffect)(() => {
        run();
    }, [run]);
    return { ...state, reload: run };
}
