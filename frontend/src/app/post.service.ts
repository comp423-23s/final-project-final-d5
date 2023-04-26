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
    approved_by_admin: boolean;
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
        // let table: Observable<Post[]> = this.http.get<Post[]>("/api/forum"); // copied from the getCheckIns
    
        // let new_table = table
        //                     .pipe(
        //                     map((x: Post[])=> {
        //                     x.forEach(new_post => {
        //                         new_post.timestamp = new Date(new_post.timestamp)
        //                     });
        //                     return x;
        //                     })
        //                 )
        // return new_table
        return this.http.get<Post[]>("/api/post"); 
    }

    makePost(id: number, title: string, content: string, user: Profile, votes: [], timestamp: string): Observable<Post> {

        if ((title.length == 0) && (content.length == 0)) {
            return throwError(() => new Error("Unable to post empty title and empty content, please check your input!"));
        } else if (title.length == 0) {
            return throwError(() => new Error("Unable to post empty title, please check your input!"));
        } else if (content.length == 0) {
            return throwError(() => new Error("Unable to Post empty content, please check your input!"));
        }

        if(user.id && user.first_name && user.last_name && user.email && user.pronouns){
            let u: User = {id: user.id, pid:user.pid, onyen: user.onyen, first_name:user.first_name, last_name:user.last_name, email:user.email, pronouns:user.pronouns, permissions: user.permissions};
            let post: Post = {id: id, title: title, content: content, user: u, votes: votes, timestamp:timestamp, approved_by_admin: false};

            try{
                return this.http.post<Post>("/api/post", post);
            } catch (err){
                return throwError(() => new Error("Unable to Post from unregistered user"));
            }
        }
        return throwError(() => new Error("Unable to Post from user"));      
    }

    deletePost(id: number) {
        return this.http.delete<Post>("/api/post/" + id)
        // return this.http.delete<Post>("/api/post/" + id) // what we had before (from the backend routes)
    }

    approvePost(post: Post) {
        console.log("Made it to approvePost()")
        post.approved_by_admin = !post.approved_by_admin;
        try {
            return this.http.put<Post>("/api/post", post)
        } catch (err) {
            return throwError(() => new Error("Unable to approve post"));
        }
    }

}
