import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostService} from '../post.service';
import { Role } from "../role";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
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
    // private postService: postService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    let form = this.form.value;
    if (this.form.value.content?.length == 0) {
      window.alert("Please check your input!")
    }
    
  } 

}
