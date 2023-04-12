import { Component } from '@angular/core';
import { Post, PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PermissionService } from '../permission.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-getforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.css']
})
export class viewforumComponent {
  public adminPermission$: Observable<boolean>;
  public post$: Observable<Post[]>;
  
  public static Route = {
    path: 'viewforum',
    component: viewforumComponent
  };

  constructor(
    private postService: PostService,
    private permission: PermissionService,
    ) {
    this.post$ = postService.getPosts()
    this.adminPermission$ = this.permission.check('admin.view', 'admin/')
  }

  onDelete(id: number): void {
    this.postService
    .deletePost(id)
    .subscribe({ // stopping here when we use the /api/posts + id route)
      next: () => this.onSuccess(),
      error: (err) => this.onError(err)
    })
  }

  private onSuccess(): void { // get new posts after deletion
    this.post$ = this.postService.getPosts()
    console.log("going to onSuccess") // test
  }

  private onError(err: HttpErrorResponse) {
    if (err.error.detail) { 
      window.alert(err.error.detail);
    } else {
      console.log("onDelete going to error"); // test (going here when we use the /viewforum/post + id route)
      console.log("random error: " + JSON.stringify(err)); // see what error is
    }
  }

}
