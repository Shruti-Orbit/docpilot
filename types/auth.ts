export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}