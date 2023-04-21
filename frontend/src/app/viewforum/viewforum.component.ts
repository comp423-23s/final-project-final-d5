import { Component } from '@angular/core';
import { Post, PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PermissionService } from '../permission.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-getforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.css']
})
export class viewforumComponent {
  public adminPermission$: Observable<boolean>;
  public post$: Observable<Post[]>;
  public displayPost$: Observable<Post[]>;
  public itemsPerPage: number = 5; // set the number of items to display per page
  public currentPage: number = 1;
  public numPosts: number;
  public numPages: number;

  public static Route = {
    path: 'viewforum',
    component: viewforumComponent
  };

  constructor(
    private postService: PostService,
    private permission: PermissionService,
    ) {
    this.numPosts = 0; //numPosts and numPages must be set to zero initially
    this.numPages = 0;
    this.post$ = postService.getPosts()
    this.displayPost$ = this.post$.pipe( //paginating total number of posts
      map((items) => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return items.slice(startIndex, startIndex + this.itemsPerPage);
      }))
    this.post$.subscribe((items) => { //set number of pages and number of total posts
      this.numPosts = items.length;
      this.numPages = Math.ceil(items.length / this.itemsPerPage)
    });
    
    this.adminPermission$ = this.permission.check('admin.view', 'admin/')
  }

  onDelete(id: number): void {
    if(confirm("Are you sure you want to delete this post?")) {
      this.postService
      .deletePost(id)
      .subscribe({ // stopping here when we use the /api/posts + id route)
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      })
    }
  }

  private onSuccess(): void { // get new posts after deletion
    this.post$ = this.postService.getPosts()
    this.displayPost$ = this.post$.pipe(
      map((items) => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return items.slice(startIndex, startIndex + this.itemsPerPage);
      }))
      this.post$.subscribe((items) => { //update number of pages after deletion
        this.numPosts = items.length;
        this.numPages = Math.ceil(items.length / this.itemsPerPage)
      });
  }

  private onError(err: HttpErrorResponse) {
    if (err.error.detail) { 
      window.alert(err.error.detail);
    } else {
      console.log(JSON.stringify(err)); // see what error is
    }
  }

  public getCurrentPage(pageNumber: number): Observable<any[]> {
    return this.displayPost$
  }

  updateItems() { //updating displayedPosts based on what page is currently selected
    this.displayPost$ = this.post$.pipe(
      map((items) => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return items.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );
  }

}
