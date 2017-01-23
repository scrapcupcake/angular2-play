import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RssService,RssFeedItem} from '../rss-service';
import {AudioPlayerService} from './audio-player.service';

@Component({
    selector: 'player-outlet',    
    template: `
    <h1><a routerLink='/'>Back</a></h1>
    <audio-player [src]="src|async"></audio-player>
    `
})
export class PlayerOutletComponent {
    src;

    constructor(private route: ActivatedRoute, 
    private rss : RssService,
    private audioPlayer : AudioPlayerService){
        this.src = route.params.flatMap((p:any) => {
            return rss.getItem(p.guid);
        });
        
        
    }
}