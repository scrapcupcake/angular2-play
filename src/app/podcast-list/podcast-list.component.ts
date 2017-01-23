import {Component} from '@angular/core';
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
    constructor(private rss: RssService){
        let feed = rss.getFeed("https://nightvale.libsyn.com/rss");        
        this.nightvaleFeed = feed;
        this.nightvaleFeedEntries = feed.map((feed) => {return feed.entries});
    }
}