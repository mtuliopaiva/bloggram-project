//useLocation - returns the exacly local of the application: pathname

//useMemo - usado para memoizar valores computados, melhorando o desempenho, 
//garantindo que esses valores só sejam recalculados quando necessário.

import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
    const {search} = useLocation()

    //Só vai eser executada quando o search for alterado
    return useMemo(() => new URLSearchParams(search), [search]);
}