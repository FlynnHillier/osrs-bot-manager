import {isInstanceState,bootInstance} from "../../logic/instance.logic"

export const useInstanceLogic = () => {
    return {
        isInstanceState,
        bootInstance,
    }
}