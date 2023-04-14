import { Component } from '@angular/core';
import { Post, PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PermissionService } from '../permission.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationComponent } from './pagination.component'

@Component({
  selector: 'app-getforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.css']
})
export class viewforumComponent {
  public adminPermission$: Observable<boolean>;
  public post$: Observable<Post[]>;

  public current: number = 1;
  // public total: number = 18;

  public items = [...Array(180).keys()].map(x => `item ${++x}`) // items represents EVERYTHING (all the posts)
  public itemsToDisplay: string[] = [] // this represents what we want to display on that page (i.e. posts 1-7)
  public perPage = 10
  public total = Math.ceil(this.items.length / this.perPage)
  
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

  private onSuccess(): void {
    // this.post$ = this.postService.getPosts() // what we had before --calling all the posts 
    this.itemsToDisplay = this.paginate(this.current, this.perPage); // calling paginate aka a select amount of posts insteall of all of them
  }

  private onError(err: HttpErrorResponse) {
    if (err.error.detail) { 
      window.alert(err.error.detail);
    } else {
      console.log(JSON.stringify(err)); // see what error is
    }
  }

  public onGoTo(page: number): void {
    this.current = page
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public onNext(page: number): void {
    this.current = page + 1
  }

  public onPrevious(page: number): void {
    this.current = page - 1
  }

  public paginate(current: number, perPage: number): string[] {
    this.items = this.postService.getPosts() // setting items to get posts but doesn't work bc getposts is an observable NOT a list
    return [...this.items.slice((current - 1) * perPage).slice(0, perPage)]
  }

}
