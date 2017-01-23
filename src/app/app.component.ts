import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { RssService } from './rss-service/rss.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  slider = 5;
  nightvaleFeed;

  constructor(private rss:RssService, private titleSvc: Title, private route : ActivatedRoute, router: Router){
    
  }

  ngOnInit(){
        this.nightvaleFeed = this.rss.getFeed("https://nightvale.libsyn.com/rss");
  }
  
}
