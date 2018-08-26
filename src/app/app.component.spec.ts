import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SongComponent } from './components/song-component/song.component';
import { AlbumComponent } from './components/album-component/album.component';
import { MediaPlayerComponent } from './components/media-player//media-player.component';
import { MusicService } from './services/music.service';
import { JsonpModule } from '@angular/http';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SongComponent, AlbumComponent, MediaPlayerComponent],
      providers: [MusicService, { provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [JsonpModule]
    }).compileComponents();
  }));

  it('should create the AppComponent', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  }));

  it('should have created the global audio object', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.audio).toBeDefined();
  }));

});
