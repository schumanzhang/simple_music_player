import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './../../app.component';
import { SongComponent } from './../song-component/song.component';
import { AlbumComponent } from './../album-component/album.component';
import { MediaPlayerComponent } from './media-player.component';
import { MusicService } from './../../services/music.service';
import { JsonpModule } from '@angular/http';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('MediaPlayerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SongComponent, AlbumComponent, MediaPlayerComponent],
      providers: [MusicService],
      imports: [JsonpModule]
    }).compileComponents();
  }));

  it('should create the MediaPlayerComponent', async(() => {
    const fixture = TestBed.createComponent(MediaPlayerComponent);
    const media = fixture.debugElement.componentInstance;
    expect(media).toBeDefined();
  }));

  it('should toggle the play music button correctly', async(() => {
    const fixture = TestBed.createComponent(MediaPlayerComponent);
    const media = fixture.debugElement.componentInstance;
    media.audio = new Audio();
    spyOn(media.audio, 'play');

    media.playMusic();
    expect(media.audio.play).toHaveBeenCalled();
  }));

});