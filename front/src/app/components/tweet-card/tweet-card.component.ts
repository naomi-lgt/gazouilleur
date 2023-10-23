import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetResponseDto } from 'src/api';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent {
  @Input() tweet: TweetResponseDto | undefined;
  URLTweetId: string;

  constructor(public route: ActivatedRoute, public tweetService: TweetService) {
    this.URLTweetId = route.snapshot.params['id']
  }

  // ngOnInit() {
  //   this.tweetService.getTweetById(this.URLTweetId).subscribe(data => this.tweet = data)
  // }
}
