import { useMemo } from "react";
import { validChar } from "../global/globalValues";

// export const useAmount = (token, amount, callback) => {
//     const res = useMemo (() => {
//         if (!token.value  )  callback ({ ...token, value: amount.minAmount })
//             else callback({ ...token, value: token.value }) 
//     }, [amount.minAmount])
//     return res
// }

export const useAmount = (token, amount) => {
    let res
    useMemo (() => {
        if (!token.value  )  res = amount.minAmount
            else res = token.vaule 
        return res
    }, [amount.minAmount])
    return res
}