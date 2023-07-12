import axios from 'axios'
import { getUserData } from './Storage';

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1';

const API_KEY = 'AIzaSyBB-tSIwZXPct7YqwCxS8Fn3Bkh1sP50IM';

export function RegisterUser(inputs) {
    let data = {displayName: inputs.name, email: inputs.email, password: inputs.password};
    return axios.post(`/accounts:signUp?key=${API_KEY}`, data);
}

export function authCheck(inputs){
    let data = {email: inputs.email, password: inputs.password};
    return axios.post(`/accounts:signInWithPassword?key=${API_KEY}`, data)
}

export function userDetailsApi(){
    let data = {idToken: getUserData()};
    return axios.post(`/accounts:lookup?key=${API_KEY}`, data)
}
