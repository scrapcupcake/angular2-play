import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/bindNodeCallback'

interface ParserInterface {
  parseString(value:string, callback: {(err:any,result:any)});
}

let parser : ParserInterface = require('rss-parser');

export interface RssFeed {
  title: string,
  description: string,
  link: string,
  feedUrl: string,
  iconUrl: string,
  entries: Array<RssFeedItem>
}

export interface RssFeedItem {
  title : string,
  text: string,
  guid: string,
  url: string,
  media: {url: string, length: number, type: string},
  pubDate: string //Todo, not string?
}

@Injectable()
export class RssService {
  private currentFeedUrl:string;
  public content = undefined;
  currentFeedObserver : Observable<RssFeed>;

  constructor(private http: Http){
  }

   getFeed(url) : Observable<RssFeed>{
    if(!!this.currentFeedObserver){
      return this.currentFeedObserver;
    }else{
     this.currentFeedObserver = this.http.get(url)
    .flatMap((res:Response) => {return this.readFeed(res.text())})
    .publishReplay(1)
    .refCount()
    .catch((error:any) => Observable.throw(error || 'Server error'));
    }
    return this.currentFeedObserver;
  }

  private readFeed(text) : Observable<RssFeed> {
      let parseStringFactory = Observable.bindNodeCallback(parser.parseString);
      let newObs : Observable<RssFeed> = parseStringFactory(text).map((result) =>{
        let feed : RssFeed = {title: result.feed.title,
          description: result.feed.description,
          link: result.feed.link,
          feedUrl: result.feed.feedUrl,
          iconUrl: result.feed.itunes.image, 
          entries: undefined};
        let entries : Array<any> = Array.from(result.feed.entries).reverse(); //This is fragile as fuck?
        feed.entries = entries.map<RssFeedItem>((item) => {return {
          title: item.title,
          text: item.contentSnippet,
          guid: item.guid,
          url: item.link,
          media: item.enclosure,
          pubDate: item.pubDate
        }});
        console.log(feed);
        return feed;
      });
      return newObs;
  }

  getItem(guid) : Observable<RssFeedItem>
  {
    return this.currentFeedObserver.flatMap((feed) => feed.entries.filter((item) => item.guid === guid));
  }
}