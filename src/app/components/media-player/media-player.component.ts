import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Song } from './../../models/song';

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnChanges {

  @Input() audio: any;
  @Input() song: string;

  private title: string

  public ngOnInit(): void {
    this.title = this.song;
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('song')) {
      if (typeof this.song !== 'undefined') { 
        this.title = this.song;
      }
    }
  }

  public playMusic(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

}
