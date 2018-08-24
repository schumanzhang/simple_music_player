import { Component } from '@angular/core';
import { Song } from './models/song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private songs: Song[];

  public handleSongData($event): void {
    console.log('handleSongData:', $event);
    this.songs = $event;
  }
  
}
