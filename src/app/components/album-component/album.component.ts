import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Song } from './../../models/song';
import { Album } from './../../models/album';
import { MusicService } from './../../services/music.service';

@Component({
    selector: 'album-component',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
  })
  export class AlbumComponent implements OnChanges {
    
    @Input() songData: Song;
    @Input() audio: any;
    
    private albumUrl: string;
    private displayedSong: Song;
    private albumSongs: Album[];
    private loading: boolean = false;

    constructor(private musicService: MusicService) {
    }

    public ngOnChanges(changes: any): void {
      if (changes.hasOwnProperty('songData')) {
        if (typeof this.songData !== 'undefined') {
          this.songData.playback = false;
          this.displayedSong = JSON.parse(JSON.stringify(this.songData));
          this.displayedSong.artwork = this.displayedSong.artwork.replace('100x100', '210x210');
          this.retrieveAlbum(this.displayedSong.album);
          this.registerPlaybackListeners();
        }
      }
    }

    public retrieveAlbum(searchTerm: string): void {
      this.loading = true;
      this.musicService.getMusicAlbum(searchTerm).subscribe(res => {
        this.loading = false;
        this.albumSongs = res._body.results.map((item, i) => {
          return {
            song: item.trackName,
            album: item.collectionName
          }
        });
      }, err => {
        this.loading = false;
        console.error(err);
      });
    }

    public playMusic(): void {
      if (this.audio.src !== this.displayedSong.previewUrl) {
        this.audio.src = this.displayedSong.previewUrl;
      }
      (this.displayedSong.playback) ? this.audio.pause() : this.audio.play();
      this.displayedSong.playback = !this.displayedSong.playback;
    }

    public registerPlaybackListeners(): void {
      if (this.audio.src === this.displayedSong.previewUrl && !this.audio.paused) {
        this.displayedSong.playback = true;
      }
      this.audio.addEventListener('ended', () => {
        if (this.displayedSong.playback) {
          this.displayedSong.playback = false;
        }
      });
    }
  }