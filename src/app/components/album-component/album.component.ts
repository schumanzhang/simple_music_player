import { Component, Input, OnChanges } from '@angular/core';
import { Song } from './../../models/song';

@Component({
    selector: 'album-component',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
  })
  export class AlbumComponent implements OnChanges {
    
    @Input() songData: Song[];
    
    private albumUrl: string;
    private displayedSong: Song;

    public ngOnChanges(changes: any): void {
      if (changes.hasOwnProperty('songData')) {
        console.log('ngOnChanges songData:', this.songData);
        if (typeof this.songData !== undefined) {
          this.displayedSong = this.songData[0];
          this.displayedSong.artwork = this.displayedSong.artwork.replace('100x100', '250x250');
        }
      }
    }



  }