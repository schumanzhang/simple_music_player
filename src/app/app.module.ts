import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SongComponent } from './components/song-component/song.component';
import { AlbumComponent } from './components/album-component/album.component';

import { MusicService } from './services/music.service';


@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule
  ],
  providers: [MusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
