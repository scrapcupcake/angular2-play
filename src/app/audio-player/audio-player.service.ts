import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class AudioPlayerService{
    _audioPlayer : HTMLAudioElement;
    _timeEventSource = new ReplaySubject<number>(1);
    timeEvents$ = this._timeEventSource.asObservable();
    loaded : boolean;
    _playing : boolean;
    public get playing(){
        return this._playing;
    }
    //mediaChangeEventSource = new ReplaySubject;

    constructor(){
        this._audioPlayer = new Audio();
        this._audioPlayer.preload = "metadata";
    }

    handleLoad(){
        if(!this.loaded){
            console.log("I've loaded", this._audioPlayer.src);
            this.loaded = true;
            this.play(this._audioPlayer.src);
            this._audioPlayer.removeEventListener("canplay");
        }else{
            console.log("Wait hangon, I'm loaded and I got the event again");
        }
    }

    load(sourceUrl){
        this.loaded = false;
        this.pause();
        this._audioPlayer.src = sourceUrl;
        this._audioPlayer.load();
        this._audioPlayer.addEventListener('timeupdate', () =>{ 
            this._timeEventSource.next(this._audioPlayer.currentTime);}
            );

        this._audioPlayer.addEventListener("canplay", (e$) => console.log("CanPlay?", e$));
        this._audioPlayer.addEventListener("canplay", this.handleLoad.bind(this));

        this._audioPlayer.addEventListener("pause", (e$) => this._playing=false);
        this._audioPlayer.addEventListener("play", (e$) => this._playing = true);
        this._audioPlayer.addEventListener('seeking', (e$) => this._playing = false);
    }

    play(sourceUrl = ""){
        if(sourceUrl && sourceUrl.length > 0 
            && this._audioPlayer && sourceUrl != this._audioPlayer.src){
            this.load(sourceUrl);
        }else if(this.canPlay()){
            this._playing = true;
            this._audioPlayer.play();
        }else{
            this._audioPlayer.addEventListener("canplay", this.handleLoad.bind(this));
        }
    }

    pause(){
            this._playing = false;
            this._audioPlayer.pause();
    }

    advanceBy(seconds){
        if(this.canPlay())
        {
            this.resumePlay(() => 
            this._audioPlayer.currentTime = seconds + this._audioPlayer.currentTime);
        }
    }

    advanceTo(seconds){
        if(this.canPlay()){
            this.resumePlay(() => this._audioPlayer.currentTime = seconds);
        }
    }

    resumePlay(behavior){
        let wasPlaying = this._playing;
        if(wasPlaying){this.pause()};
        behavior();
        if(wasPlaying){this.play();}
    }

    get duration(){
        return this._audioPlayer.duration;
    }

    canPlay() : boolean {
        return this.loaded
    }

}