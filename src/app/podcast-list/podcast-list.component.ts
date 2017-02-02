import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RssService, RssFeed, RssFeedItem} from '../rss-service';

@Component({
    selector: 'podcast-list',
    templateUrl: './podcast-list.component.html',
    styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent {
    nightvaleFeed;
    nightvaleFeedEntries;
    //Todo @Import the podcast RSS url, update RSS service to cache based on url
    constructor(private rss: RssService, private title : Title){
        let feed = rss.getFeed("https://nightvale.libsyn.com/rss");        
        this.nightvaleFeed = feed;
        this.nightvaleFeed.subscribe((f) => title.setTitle(f.title));
        this.nightvaleFeedEntries = feed.map((feed) => {return feed.entries});
    }
}