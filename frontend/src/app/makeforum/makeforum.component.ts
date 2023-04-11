import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostService, Post } from '../post.service';
import { Role } from "../role";
import { HttpErrorResponse } from '@angular/common/http';
import { Profile, ProfileService } from '../profile/profile.service';
import { viewforumComponent } from '../viewforum/viewforum.component';

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
    title: '',
    content: ''
  });

  constructor (
    private postService: PostService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  onSubmit(): void {
    let form = this.form.value;
    let formTitle = this.form.value.title ?? "";
    let formContent = this.form.value.content ?? "";
    console.log(form)
    this.profileService.profile$
      .subscribe({
        next: (profile) => this.onSuccess(profile, formContent, formTitle), 
        error: (err) => this.onError(err)
      });


    if (this.form.value.content?.length == 0) {
      window.alert("Please check your input!")
    }
  } 

  private onSuccess(profile: Profile | undefined, formContent: string, formTitle: string): void {
    // this is where we have something in scope of type profile
    // let current: new Date
    let unique = Math.floor(Number(Math.random()*1000)) // generates date of successful form
    
    let new_Date: Date = new Date();
    // Converting date to string
    let result: string = new_Date.toLocaleString();
    // Convert the date object to US specific date string
    let date = new_Date.toLocaleString("en-US");
    
    if (profile == undefined) {
      // handle this case better?
      return;
    }

    this.postService.makePost(unique, formContent, profile, [], date)
    .subscribe({
      next: (post) => this.onSuccessMP(),
      error: (err) => this.onError(err)
    });
    console.log(profile.pid) 
  }

  private onError(error: Error): void {
    if (error.message) {
      window.alert(error.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(error));
    }
  }

  private onSuccessMP(){
    
    window.alert('Thank you for posting')
    this.form.reset()
  }
}

