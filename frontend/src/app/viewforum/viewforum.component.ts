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
    .subscribe({
      next: () => this.onSuccess(),
      error: (err) => this.onError(err)
    })
  }

  private onSuccess(): void { // get new posts after deletion
    this.post$ = this.postService.getPosts()
  }

  private onError(err: HttpErrorResponse) {
    console.log(err)
    if (err.error.detail) { 
      window.alert(err.error.detail);
    } else {
      window.alert("random error: " + JSON.stringify(err));
    }
  }

}
