interface SongInit {
  songTitle: string;
  artistName: string;
  albumArt: string;
}

export default class Song {
  songTitle: string;
  artistName: string;
  albumArt: string;

  constructor(init: SongInit) {
    if (!init.songTitle) { throw Error(`songTitle is invalid! ${init.songTitle}`); }
    if (!init.artistName) { throw Error(`artistName is invalid! ${init.artistName}`); }
    if (!init.albumArt) { throw Error(`albumArt is invalid! ${init.albumArt}`); }

    Object.assign(this, init);
  }
}
