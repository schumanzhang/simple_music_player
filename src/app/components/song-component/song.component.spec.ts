import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './../../app.component';
import { SongComponent } from './song.component';
import { AlbumComponent } from './../album-component/album.component';
import { MediaPlayerComponent } from './../media-player/media-player.component';
import { MusicService } from './../../services/music.service';
import { JsonpModule } from '@angular/http';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

describe('SongComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SongComponent, AlbumComponent, MediaPlayerComponent],
      providers: [MusicService, { provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [JsonpModule]
    }).compileComponents();
  }));

  it('should create the SongComponent', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    expect(song).toBeDefined();
  }));

  it('should have called getSearchResults and tried to retrieve data from iTunes', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    spyOn(song, 'getSearchResults');
    song.ngOnInit();
    expect(song.getSearchResults).toHaveBeenCalled();
  }));

  it('should have called addEventListener when registerPlaybackListeners is called', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    song.audio = new Audio();
    spyOn(song.audio, 'addEventListener');
    song.registerPlaybackListeners();
    expect(song.audio.addEventListener).toHaveBeenCalled();
  }));

  it('should have retrieved song data and parsed the result correctly', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    song.audio = new Audio();
    spyOn(song.musicService, 'getMusicData').and.returnValue(of({
      _body: {
        results: [
          {
            trackName: 'Hello',
            artistName: 'Adele',
            collectionName: 'Adele',
            artworkUrl100: '100',
            previewUrl: 'preview'
          }
        ]
      }
    }));
    spyOn(song, 'emitSongData');
    song.getSearchResults();
    expect(song.songs).toEqual([
      {
        id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: false
      }
    ]);
    expect(song.emitSongData).toHaveBeenCalled();
  }));

  it('should have emitted song data correctly after retrieving data from iTunes', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    song.songs = [
      {
        id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: false
      }
    ];
    spyOn(song.songData, 'emit');
    song.emitSongData();
    expect(song.empty).toBe(false);
    expect(song.songData.emit).toHaveBeenCalledWith({
      id: 0,
      song: 'Hello',
      artist: 'Adele',
      album: 'Adele',
      artwork: '100',
      previewUrl: 'preview',
      playback: false
    });
  }));

  it('should launch a new search when the inputfield has been changed', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    spyOn(song.searchTextChanged, 'next');
    song.inputChanged({
      target: {
        value: 'maroon 5'
      }
    });
    expect(song.searchTextChanged.next).toHaveBeenCalledWith('maroon 5');
  }));

  it('should handle song selection from the user correctly', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    spyOn(song, 'toggleSelect');
    spyOn(song.songData, 'emit');

    song.songSelected(0, {
      id: 0,
      song: 'Hello',
      artist: 'Adele',
      album: 'Adele',
      artwork: '100',
      previewUrl: 'preview',
      playback: false
    });

    expect(song.toggleSelect).toHaveBeenCalledWith(null);
    expect(song.songData.emit).toHaveBeenCalledWith({
      id: 0,
      song: 'Hello',
      artist: 'Adele',
      album: 'Adele',
      artwork: '100',
      previewUrl: 'preview',
      playback: false
    });    
  }));

  it('should handle toggle selection correctly', async(() => {
    const fixture = TestBed.createComponent(SongComponent);
    const song = fixture.debugElement.componentInstance;
    song.songs = [
      {
        id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: false
      }
    ];
    song.toggleSelect(0);
    expect(song.songs).toEqual([
      {
        id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: true
      }
    ]);
  }));
});