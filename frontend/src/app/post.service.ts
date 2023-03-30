import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Profile } from './profile/profile.service';
import { Role } from './role';

export interface Post {
    id: number;
    content: string;
    user: Profile;
    votes: [];
    timestamp: Date;
}
//  these attributes will most likely change

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
        return this.http.get<Post[]>("/api/forum"); 
    }

    makePost(id: number, content: string, user: Profile, votes: [], timestamp: Date): Observable<Post> {
        let post: Post = {id, content, user, votes, timestamp};
        return this.http.post<Post>("/api/forum/", post);
    }

    // deletePost(id: number) {
    //     return this.http.delete<Post>("/api/forum/" + id)
    // }

}
