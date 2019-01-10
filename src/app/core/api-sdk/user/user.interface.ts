export interface UserRequest {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    id?: number;
}


export interface User extends UserRequest {
    full_name: string;
    token: string;
}


export interface ChangePasswordRequest {
    old_password: string,
    new_password: string
}

export interface Demo {
    title: string,
    body: string
}