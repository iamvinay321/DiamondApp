export interface LoginRequest {
    username: string
    password: string
}


export interface User {
    token?: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    full_name: string,
    id: string
}


export interface SignupRequest {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string
}
