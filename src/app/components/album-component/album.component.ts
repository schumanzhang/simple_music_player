import { Component } from '@angular/core';

@Component({
    selector: 'album-component',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
  })
  export class AlbumComponent {
    public title: string = 'album';
  }