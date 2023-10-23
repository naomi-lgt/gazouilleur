import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentDto, CreateTweetDto, Tweet, TweetResponseDto } from 'src/api';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  headers: Record<string, string> = {};
  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Object.values(this.authService.access_token)[0],
    });
  }

  createTweet(tweet: CreateTweetDto): Observable<Tweet> {
    return this.http.post<Tweet>('http://localhost:8888/tweets', tweet, {
      headers: this.getHeaders()
    });
  }

  // getUserInfo() {
  //   return this.http.get<any>('http://localhost:8888/tweets/blabla', {
  //     headers: this.getHeaders()
  //   })
  // }

  getAllTweets(): Observable<TweetResponseDto[]> {
    return this.http.get<TweetResponseDto[]>('http://localhost:8888/tweets');
  }

  getCommentsInfo(id: string): Observable<TweetResponseDto[]> {
    return this.http.get<TweetResponseDto[]>(`http://localhost:8888/tweets/${id}/comments/`);
  }

  getTweetById(id: string): Observable<TweetResponseDto> {
    return this.http.get<TweetResponseDto>(`http://localhost:8888/tweets/${id}`);
  }

  createComment(id: string, comment: CreateCommentDto): Observable<Tweet> {
    return this.http.post<Tweet>(`http://localhost:8888/tweets/${id}/comments/`, comment, {
      headers: this.getHeaders()
    })
  }
}
