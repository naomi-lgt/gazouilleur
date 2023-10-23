import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tweet, TweetResponseDto } from 'src/api';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss']
})
export class TweetDetailComponent {
  @Input() tweet: TweetResponseDto | undefined;
  URLTweetId: string;
  createCommentForm: FormGroup;

  constructor(public route: ActivatedRoute, public tweetService: TweetService, private fb: FormBuilder, private readonly _snackbar: SnackbarService) {
    this.createCommentForm = this.fb.group({
      comment: ['', Validators.required]
    });
    this.URLTweetId = route.snapshot.params['id']
  }

  createCommentBtn() {
    const form = this.createCommentForm;
    if (form.valid) {
      console.log(form.value);
      let commentObj = {
        author: 'test-author',
        content: form.value.comment
      }
       return this.tweetService.createComment(this.tweet!._id, commentObj).subscribe()
    }
    else return this._snackbar.openSnackBar("Le commentaire n'est pas valide ❌", 'OK')
  }

  ngOnInit() {
    this.tweetService.getTweetById(this.URLTweetId).subscribe(data => this.tweet = data)
  }
}
