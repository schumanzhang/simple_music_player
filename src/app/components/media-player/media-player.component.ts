import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  @Input() audio: any;

  public ngOnInit() {
  }

}
