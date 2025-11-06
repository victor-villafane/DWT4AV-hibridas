import { call } from "./api.services";

export function authLogin(credenciales){
    return call({uri: 'usuarios/login', method: "POST", body: credenciales})
}

export function authRegister(credenciales){
    return call({uri: 'usuarios', method: "POST",body: credenciales})
}