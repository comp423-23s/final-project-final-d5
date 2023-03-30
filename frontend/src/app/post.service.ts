import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
        return this.http.get<Post[]>("/api/post");
    }

    makePost(id: number, content: string, user: Profile, votes: [], timestamp: Date): Observable<Post> {
        let post: Post = {id, content, user, votes, timestamp};
        return this.http.post<Post>("/api/post/", post);
    }

    deletePost(id: number) {
        return this.http.delete<Post>("/api/post/" + id)
    }

}
