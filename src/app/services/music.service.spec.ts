import { MusicService } from './music.service';
let Jsonp: { request: jasmine.Spy };

describe('MusicService', () => {
    let musicService: MusicService;

    beforeEach(() => {
        Jsonp = jasmine.createSpyObj('Jsonp', ['request']);
        musicService = new MusicService(<any> Jsonp);
      });

    it('#Get music data from iTunes affiliates API', () => {
        Jsonp.request.and.returnValue(({song: 'hello'}));
        expect(musicService.getMusicData('coldplay')).toEqual({song: 'hello'})
    });

    it('#Get music album data from iTunes affiliates API', () => {
        Jsonp.request.and.returnValue(({album: 'hello'}));
        expect(musicService.getMusicAlbum('coldplay')).toEqual({album: 'hello'})
    });


});