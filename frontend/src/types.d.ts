export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface Post {
    title:string;
    _id: string;
    description: string;
    image: string ;
    datetime: string;
    user: {
        username: string;
    };
}

export interface PostData {
    title: string;
    image: string | null;
    description: string;
}