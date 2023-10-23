import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tweet, TweetResponseDto } from 'src/api';
import { AuthService } from 'src/app/services/auth-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  createTweetForm: FormGroup;
  tweetsArray: any[] = [];
  URLTweetId: string;
  tweet: TweetResponseDto | null = null;
  headers: Record<string, string> = {};
  userLoggedIn: boolean = false;

  constructor(public tweetService: TweetService, public authService: AuthService, private fb: FormBuilder, public route: ActivatedRoute, private readonly _snackbar: SnackbarService) {
    this.createTweetForm = this.fb.group({
      tweet: ['', Validators.required]
    });
    this.URLTweetId = route.snapshot.params['id']
  }

  createTweetBtn() {
    if (!this.userLoggedIn) return this._snackbar.openSnackBar("Veuillez vous connecter ❌", 'OK');
    const form = this.createTweetForm;
    if (form.valid) {
      console.log(form.value);
      let tweetObj = {
        author: 'test-author',
        content: form.value.tweet
      }
       return this.tweetService.createTweet(tweetObj).subscribe()
    }
    else return this._snackbar.openSnackBar("Le gazouilli n'est pas valide ❌", 'OK')
  }

  ngOnInit() {
    this.tweetService
      .getAllTweets()
      .subscribe((tweets) => (this.tweetsArray = tweets));
    // this.authService.access_token ? this.userLoggedIn === true : false;
    this.userLoggedIn = this.authService.access_token ? true : false;
    // this.tweetService.getUserInfo().subscribe((data) => console.log(data))
    // console.log()
  }
}
