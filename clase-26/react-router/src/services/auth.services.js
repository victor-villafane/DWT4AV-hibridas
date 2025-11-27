import { call } from "./api.services";

export function authLogin(credenciales){
    return call({uri: 'usuarios/login', method: "POST", body: credenciales})
}

export function authRegister(credenciales){
    return call({uri: 'usuarios', method: "POST",body: credenciales})
}

export function recuperarCuenta(email){
    return call({uri: 'usuarios/recuperar-cuenta', method: "POST", body: {email: email}})
}

export function restablecerContrasenia(email, pass){
    return call({ uri: 'usuarios/restablecer-contrasenia', method: "POST", body: {
        email: email,
        password: pass
    } })
}