import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";

import { MusicService } from './../../services/music.service';
import { Song } from './../../models/song';
import { MediaPlayerComponent } from './../media-player/media-player.component';

@Component({
  selector: 'song-component',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  private songs: Song[];
  private searchTextChanged = new Subject<string>();
  private subscription: any;
  private loading: boolean = false;
  private empty: boolean = false;
  private audio: any;
  private selected: number;
  private componentRef: any;

  constructor(private musicService: MusicService) {
    this.subscription = this.searchTextChanged
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(keyboardEvent => {
        this.getSearchResults(keyboardEvent);
      });
  }

  public ngOnInit(): void {
    this.audio = new Audio();
    this.registerPlaybackListeners();
    this.getSearchResults();
  }

  public registerPlaybackListeners(): void {
    this.audio.addEventListener('ended', () => {
      this.songs.map(item => {
        if (item.playback === true) {
          item.playback = false;
        }
      });
    });
  }

  public getSearchResults(searchTerm = 'coldplay'): void {
    this.selected = undefined;
    this.loading = true;
    this.musicService.getMusicData(searchTerm).subscribe(res => {
      this.loading = false;
      this.songs = res._body.results.map((item, i) => {
        return {
          id: i,
          song: (typeof item.trackName !== 'undefined') ? item.trackName : 'Unknown',
          artist: (typeof item.artistName !== 'undefined') ? item.artistName : 'Unknown',
          album: (typeof item.collectionName !== 'undefined') ? item.collectionName : 'Unknown',
          artwork: (typeof item.artworkUrl100 !== 'undefined') ? item.artworkUrl100 : 'https://webmarketingschool.com/wp-content/uploads/2018/03/nojobsfound.png',
          previewUrl: (typeof item.previewUrl !== 'undefined') ? item.previewUrl : '',
          playback: false
        }
      }, err => {
        this.loading = false;
        console.error(err);
      });

      this.empty = this.songs.length === 0 ? true : false;
      console.log('init songs:', this.songs);
    });
  }

  public inputChanged($event): void {
    this.searchTextChanged.next($event.target.value);
  }

  public songSelected(i: number, song: Song): void {
    this.selected = i;
    this.toggleSelect(i);
    this.audio.src = song.previewUrl;
    this.audio.play();
  }

  public toggleSelect(i: number): void {
    this.songs.map(item => {
      if (item.id === i) {
        item.playback = true;
      } else {
        item.playback = false;
      }
    });
  }

}