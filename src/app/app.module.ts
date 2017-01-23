import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';


import { AppComponent } from './app.component';
import {MyRouter} from './app.routes';
import {PodcastListComponent} from './podcast-list';
import { RssService } from './rss-service';
import { AudioPlayerService , AudioPlayerComponent, PlayerOutletComponent } from './audio-player';

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    PlayerOutletComponent,
    PodcastListComponent 
  ],
  imports: [
    MyRouter,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RssService, AudioPlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
