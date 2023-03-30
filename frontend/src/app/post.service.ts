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
    permissions: [];
  }
  export interface Post {
    id: number;
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

    makePost(id: number, content: string, user: Profile, votes: [], timestamp: string): Observable<Post> {
        let u: User = {id:2, pid:100000000, onyen:'sol', first_name:"Sol", last_name:"Student", email:"sol@unc.edu", pronouns:"they / them",permissions:[]};
        
        let post: Post = {id:id, content: content, user: u, votes: votes, timestamp:timestamp};
        console.log("Made it to api call")
        console.log(JSON.stringify(post))
        try{
            return this.http.post<Post>("/api/post", post);
        }catch (err){
            return throwError(() => new Error("Unable to Post from unregistered user"));
        }
            
    }

    // deletePost(id: number) {
    //     return this.http.delete<Post>("/api/forum/" + id)
    // }

}
