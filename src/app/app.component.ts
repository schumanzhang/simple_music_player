import { Component, OnInit } from '@angular/core';
import { Song } from './models/song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private songs: Song[];
  private audio: any;
  private innerWidth: boolean;  

  public ngOnInit() {
    this.audio = new Audio();
    this.innerWidth = (window.innerWidth > 576) ? true: false;
  }

  public handleSongData($event): void {
    this.songs = $event;
    this.innerWidth = (window.innerWidth > 576) ? true: false;
  }
  
}
