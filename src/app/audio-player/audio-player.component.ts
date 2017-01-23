import {Component, Input, ViewChild, OnChanges} from '@angular/core';
import {AudioPlayerService} from './audio-player.service';
import {MdSlider} from '@angular/material';
import {RssFeedItem} from '../rss-service'

import {Subscription} from 'rxjs/Rx';

/*
  <audio #player (timeupdate)="currentTime = player.currentTime">
      <source [src]="nightvale.enclosure.url" type="audio/mpeg">
    </audio>
    <button (click)="player.play()">Play</button>
    <button (click)="player.pause()">Pause</button>
    <md-slider [(ngModel)]="currentTime" min="0" [max]="player.duration"></md-slider>
*/

@Component({
    selector: "audio-player",
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnChanges{
    @Input() src : RssFeedItem;
    @ViewChild('slider') slider: MdSlider;

    constructor(private audio : AudioPlayerService){
    }

    ngOnChanges(changes){
        if(!!changes.src && !!changes.src.url){
            this.audio.load(changes.url);
        }
    }

    get playing(){
        return this.audio.playing;
    }

    private _currentTime;
    get currentTime(){
        return this._currentTime;
    }
    set currentTime(value){
        this._currentTime = value;
        this.audio.advanceTo(this._currentTime);
    }
    private playSubscription : Subscription;

    play(){
        if(this.playSubscription && !this.playSubscription.closed){
            this.playSubscription.unsubscribe();
        }
        console.log("Source?", this.src);
        this.audio.play(this.src.media.url);        
        this.playSubscription = this.audio.timeEvents$.subscribe((val) => {
            this.slider.min = 0;
            this.slider.max = this.audio.duration; //Kinda a hack, but also the safest bet.
            this._currentTime = val; //The private backing store here, not the accessor
        });
    }

}