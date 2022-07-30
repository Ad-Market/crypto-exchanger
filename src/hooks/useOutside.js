import { useEffect } from "react";

export const useOutside = (ref, callback) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback("none");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
            return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}