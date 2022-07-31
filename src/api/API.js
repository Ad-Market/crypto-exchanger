import React from "react";
import { baseURL } from "../global/globalValues";

export default class API extends React.Component {

    static async getAll() {
        const responce = await fetch( baseURL + '/coins', {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        const tokens = await responce.json();
        console.log(tokens);
        return tokens;
    }

    static async getToken ( of, to, amount ) {
        const responce = await fetch ( baseURL + `/?from=${of}&to=${to}&amount=${amount}`, {
            method: 'GET',
        });
        const tokens = await responce.json();
        console.log(tokens);
        return tokens;
    }

}