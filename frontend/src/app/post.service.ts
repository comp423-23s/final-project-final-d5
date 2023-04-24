import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Profile } from './profile/profile.service';
import { Role } from './role';


//  these attributes will most likely change
export interface User{
    id: number;
    pid: number;
    onyen: string;
    first_name: string;
    last_name: string;
    email:string;
    pronouns:string;
    permissions: Permission[];
  }

  export interface Permission {
    id?: number;
    action: string;
    resource: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
    votes: User[];
    timestamp: string;
}
@Injectable ({
    providedIn: 'root'
})

export class PostService {

    
    constructor(private http: HttpClient) {}
    
    posts: Post[] = [];

    getPost() {
        return this.posts;
    }

    
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>('/api/post').pipe(
            map((posts: Post[]) => {
                // Sort the posts in descending order based on timestamp
                posts.sort((a: Post, b: Post) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                return posts;
            })
        );
    }

    makePost(id: number, title: string, content: string, user: Profile, votes: [], timestamp: string): Observable<Post> {

        if ((title.length == 0) && (content.length == 0)) {
            return throwError(() => new Error("Unable to post empty title and empty content, please check your input!"));
        } else if (title.length == 0) {
            return throwError(() => new Error("Unable to post empty title, please check your input!"));
        } else if (content.length == 0) {
            return throwError(() => new Error("Unable to Post empty content, please check your input!"));
        }

        // title is restricted to String(64) in the backend
        if (title.length > 64) {
            return throwError(() => new Error("Unable to post title longer than 64 characters, please check your input!"));
        }

        if (user.first_name == '' || user.last_name == '' || user.email == '' || user.pronouns == '') {
            return throwError(() => new Error("Unable to post from user with incomplete profile, please check your input!"));
        }

        if(user.id && user.first_name && user.last_name && user.email && user.pronouns){
            let u: User = {id: user.id, pid:user.pid, onyen: user.onyen, first_name:user.first_name, last_name:user.last_name, email:user.email, pronouns:user.pronouns, permissions: user.permissions};
            let post: Post = {id: id, title: title, content: content, user: u, votes: votes, timestamp:timestamp};

            try{
                return this.http.post<Post>("/api/post", post);
            }catch (err){
                return throwError(() => new Error("Unable to Post from unregistered user"));
            }
        }
        return throwError(() => new Error("Unable to Post from user"));
    }

    deletePost(id: number) {
        return this.http.delete<Post>("/api/post/" + id)
        // return this.http.delete<Post>("/api/post/" + id) // what we had before (from the backend routes)
    }

}
