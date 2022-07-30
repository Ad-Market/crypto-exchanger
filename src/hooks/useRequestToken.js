import API from "../api/API"

export const useRequestToken = async (id, state, callback) => {
    await API.getToken( id ).then( data => {
        callback({ ...state, ...data })
    })
}