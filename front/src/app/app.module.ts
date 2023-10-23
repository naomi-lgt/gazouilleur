import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './ui/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
import { TweetDetailComponent } from './components/tweet-detail/tweet-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, TweetCardComponent, TweetDetailComponent, LoginComponent, AuthComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
