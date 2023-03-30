import { Component } from '@angular/core';
import { Post, PostService } from '../post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-getforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.css']
})
export class viewforumComponent {
  // public post$: Observable<Post[]>;

  // constructor(private postService: PostService) {
  //   this.post$ = postService.getPosts()
  // }

}
