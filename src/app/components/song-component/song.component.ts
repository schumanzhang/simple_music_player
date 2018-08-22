import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";


import { MusicService } from './../../services/music.service';
import { Song } from './../../models/song';

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
      this.getSearchResults();
    }

    public getSearchResults(searchTerm='coldplay'): void {
      this.loading = true;
      this.musicService.getMusicData(searchTerm).subscribe(res => {
        this.loading = false;
        this.songs = res._body.results.map(item => {
          return {
            song: item.trackName,
            artist: item.artistName,
            album: item.collectionName,
            artwork: item.artworkUrl100,
            previewUrl: item.previewUrl,
            playback: false,
            selected: false
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

    public songSelected(song: Song): void {
      console.log('songSelected:', song);
      this.toggleSelect(song.song);
      this.audio.src = song.previewUrl;
      this.audio.play();
    }

    public toggleSelect(name: string): void {
      this.songs.map(item => {
        if (item.song === name) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      })
    }

  }