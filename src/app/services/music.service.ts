import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Song } from './../models/song';

@Injectable()
export class MusicService {

  private baseUrl = 'https://itunes.apple.com/search?';

  constructor(private jsonp: Jsonp) { 
  }

  public getMusicData(searchTerm: string): any {
    let search = searchTerm.split(' ').join('+');
    let apiURL = `${this.baseUrl}term=${search}&media=music&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL);
  }

  public getMusicAlbum(searchTerm: string): any {
    let search = searchTerm.split(' ').join('+');
    let apiURL = `${this.baseUrl}term=${search}&media=music&attribute=albumTerm&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL);
  }

}