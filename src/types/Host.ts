import { Rerun, Offline, Online, HostState } from './State';
import { Stream } from 'stream';

export abstract class Host {
  name: string;
  imgUrl?: string;

  constructor(name: string, imgUrl?: string) {
    this.name = name;
    this.imgUrl = imgUrl;
  }

  get directLink() {
    return `https://www.twitch.tv/${this.name.toLocaleLowerCase()}`;
  }
}

export class OnlineHost extends Host implements Online {
  stream: Stream;
  state: HostState.Online = HostState.Online;

  constructor(name: string, stream: Stream, imgUrl?: string) {
    super(name, imgUrl);
    this.stream = stream;
  }
}

export class RerunningHost extends Host implements Rerun {
  stream: Stream;
  state: HostState.Rerunning = HostState.Rerunning;

  constructor(name: string, stream: Stream, imgUrl?: string) {
    super(name, imgUrl);
    this.stream = stream;
  }
}

export class OfflineHost extends Host implements Offline {
  videos: number;
  state: HostState.Offline = HostState.Offline;

  constructor(name: string, videos: number, imgUrl?: string) {
    super(name, imgUrl);
    this.videos = videos;
  }
}