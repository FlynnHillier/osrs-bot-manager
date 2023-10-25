import { useContext } from "react";
import { InstancesContext } from "../../contexts/instances.context";

export const useInstances = () => {
    return useContext(InstancesContext)
}