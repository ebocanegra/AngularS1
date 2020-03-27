import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { GitUsers } from './git-users';

@Injectable({
  providedIn: 'root'
})
export class GitUsersService {

  cachedValues: Array<{
    [query: string]: GitUsers
  }>=[];

  constructor(private http: HttpClient) {
      
  }

  gitUsers = (query: string) =>{
    let promise = new Promise<GitUsers>((resolve, reject) =>{
      if(this.cachedValues[query]){
        resolve(this.cachedValues[query])
      }else{
        this.http.get('https://api.github.com/search/users?q=' + query)
        .toPromise()
        .then( (response) => {
            resolve(response as GitUsers)
        }, (error) => {
            reject(error);
        })
      }

    })
    return promise;
  }
}
