import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './../../app.component';
import { SongComponent } from './../song-component/song.component';
import { AlbumComponent } from './album.component';
import { MediaPlayerComponent } from './../media-player/media-player.component';
import { MusicService } from './../../services/music.service';
import { JsonpModule } from '@angular/http';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

describe('AlbumComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SongComponent, AlbumComponent, MediaPlayerComponent],
      providers: [MusicService, { provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [JsonpModule]
    }).compileComponents();
  }));

  it('should create the AlbumComponent', async(() => {
    const fixture = TestBed.createComponent(AlbumComponent);
    const album = fixture.debugElement.componentInstance;
    expect(album).toBeDefined();
  }));

  it('should handle song data from search correctly', async(() => {
    const fixture = TestBed.createComponent(AlbumComponent);
    const album = fixture.debugElement.componentInstance;
    spyOn(album, 'retrieveAlbum');
    spyOn(album, 'registerPlaybackListeners');
    album.songData = {
      id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: false
    }

    let changes = {
      songData: {
        newValue: true
      }
    };

    album.ngOnChanges(changes);
    expect(album.retrieveAlbum).toHaveBeenCalledWith('Adele');
    expect(album.registerPlaybackListeners).toHaveBeenCalled();
  }));

  it('should retrieve album data correctly', async(() => {
    const fixture = TestBed.createComponent(AlbumComponent);
    const album = fixture.debugElement.componentInstance;
    album.audio = new Audio();
    spyOn(album.musicService, 'getMusicAlbum').and.returnValue(of({
      _body: {
        results: [
          {
            trackName: 'Hello',
            collectionName: 'Adele'
          }
        ]
      }
    }));

    album.retrieveAlbum('hello');
    expect(album.albumSongs).toEqual([
      {
        song: 'Hello',
        album: 'Adele'
      }
    ]);
  }));

  it('should handle the playMusic music correctly', async(() => {
    const fixture = TestBed.createComponent(AlbumComponent);
    const album = fixture.debugElement.componentInstance;
    album.audio = new Audio();
    album.displayedSong = {
      id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: false
    }
    spyOn(album.audio, 'play');

    album.playMusic();
    expect(album.audio.src).toEqual('http://localhost:9876/preview');
    expect(album.audio.play).toHaveBeenCalled();
  }));

  it('should register registerPlaybackListeners correctly', async(() => {
    const fixture = TestBed.createComponent(AlbumComponent);
    const album = fixture.debugElement.componentInstance;
    album.displayedSong = {
      id: 0,
        song: 'Hello',
        artist: 'Adele',
        album: 'Adele',
        artwork: '100',
        previewUrl: 'preview',
        playback: false
    }
    album.audio = new Audio();
    spyOn(album.audio, 'addEventListener');

    album.registerPlaybackListeners();
    expect(album.audio.addEventListener).toHaveBeenCalled();
  }));

});