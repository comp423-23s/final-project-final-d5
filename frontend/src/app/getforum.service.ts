
import { Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http'; //just added this

@Injectable({
  providedIn: 'root'
})
export class GetforumService {

  constructor() { }
}
