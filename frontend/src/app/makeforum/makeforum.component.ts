import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostService, Post } from '../post.service';
import { Role } from "../role";
import { HttpErrorResponse } from '@angular/common/http';
import { Profile, ProfileService } from '../profile/profile.service';

// things we need to do - change the name of forum component and you have to call one: makeforum and one should be seeforum
//also we need to figure out how to create an actual user and not just a dummy one
// also we need to fix onerror
@Component({
  selector: 'app-forum',
  templateUrl: './makeforum.component.html',
  styleUrls: ['./makeforum.component.css']
})
export class ForumComponent {

  public static Route = {
    path: 'forum',
    component: ForumComponent
  };

  form = this.formBuilder.group({
    content: ''
  });

  constructor (
    private postService: PostService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  onSubmit(): void {
    let form = this.form.value;

    this.profileService.profile$
      .subscribe({
        next: (profile) => this.onSuccess(profile), 
        error: (err) => this.onError(err)
      });

    if (this.form.value.content?.length == 0) {
      window.alert("Please check your input!")

    }
    // we need to define onerror
  } 

  private onSuccess(profile: Profile | undefined): void {
    // this is where we have something in scope of type profile
    
    if (profile == undefined) {
      // handle this case better?
      return;
    }

    this.postService
        .makePost(1, "blah", profile, [], new Date("2022-03-25"))
        .subscribe({
          next: (post) => this.onSuccess(profile), 
          error: (err) => this.onError(err)
        });

    window.alert('Thank you for posting')

    this.form.reset()
  }

  private onError(error: Error): void {

  }
}
