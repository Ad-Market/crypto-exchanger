import React from "react";
import { baseURL } from "../global/globalValues";

export default class API extends React.Component {

    static async getToken ( of, to, amount, bool ) {
        const responce = await fetch ( baseURL + `/send?from=${of}&to=${to}&amount=${amount}&isForward=${bool}`, {
            method: 'GET',
        });
        const tokens = await responce.json();
        console.log(tokens);
        return tokens;
    }

    static async getTokenBeck ( of, to, amount, bool ) {
        const responce = await fetch ( baseURL + `/get?from=${of}&to=${to}&amount=${amount}&isBeck=${bool}`, {
            method: 'GET',
        });
        const tokens = await responce.json();
        console.log(tokens);
        return tokens;
    }
}