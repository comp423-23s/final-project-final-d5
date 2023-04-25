import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from '../profile/profile.service';
import { Post, PostService } from '../post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public profile$: Observable<Profile | undefined>;
  public deletedPost$: Observable<Post []>;


  public links = [
    { label: 'Users', path: '/admin/users' },
    { label: 'Roles', path: '/admin/roles' },
  ];

  constructor(
    public profileService: ProfileService,
    private postService: PostService,
    ) {
    this.profile$ = profileService.profile$;
    this.deletedPost$ = postService.getDeletedPosts();
  }

  ngOnInit(): void {}

  showDeletedPosts() {
    return this.deletedPost$
  }

}