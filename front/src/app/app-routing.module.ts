import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetDetailComponent } from './components/tweet-detail/tweet-detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'tweets/:id', component: TweetDetailComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
