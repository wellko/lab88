import ObjectId = module

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface PostData {
   title: string;
   description: string;
   image: string | null;
   user: ObjectId;
   datetime: number;
}

export interface CommentData {
    user: ObjectId;
    post: string;
    description: string;
    datetime: number;
}