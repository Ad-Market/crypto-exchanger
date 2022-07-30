import React from "react";
import { baseURL } from "../global/globalValues";

export default class API extends React.Component {

    static async getAll() {
        const responce = await fetch( baseURL + '/apitest', {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        const tokens = await responce.json();
        console.log(tokens);
        return tokens;
    }

    static async getMovieById(id) {
        const responce = await fetch( baseURL + '/' + id, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        const movieById = await responce.json();
        console.log(movieById);
        return movieById;
    }
    
    static async postCurrcy ( data ) {
        const response = await fetch(baseURL + '/postcurrcy', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: data
        });
        console.log('postStatus>>>' + response);
        return await response.json();
    }

    // static async getCurrcy() {
    //     const responce = await fetch( baseURL + '/getcurrcy', {
    //       method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     });
    //     const token = await responce.json();
    //     console.log(token);
    //     return token;
    // }
}