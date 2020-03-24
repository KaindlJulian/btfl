import { Rerun, Offline, Live, HostState } from './State';
import { Stream } from './Stream';

export abstract class Host {
  readonly name: string;
  readonly imgUrl: string;
  abstract readonly state: HostState;

  constructor(name: string, imgUrl: string) {
    this.name = name;
    this.imgUrl = imgUrl;
  }

  get directLink() {
    return `https://www.twitch.tv/${this.name.toLocaleLowerCase()}`;
  }
}

export class LiveHost extends Host implements Live {
  readonly stream: Stream;
  state: HostState.Live = HostState.Live;

  constructor(name: string, stream: Stream, imgUrl: string) {
    super(name, imgUrl);
    this.stream = stream;
  }
}

export class RerunningHost extends Host implements Rerun {
  stream: Stream;
  state: HostState.Rerunning = HostState.Rerunning;

  constructor(name: string, stream: Stream, imgUrl: string) {
    super(name, imgUrl);
    this.stream = stream;
  }
}

export class OfflineHost extends Host implements Offline {
  videos: string;
  state: HostState.Offline = HostState.Offline;

  constructor(name: string, videos: string, imgUrl: string) {
    super(name, imgUrl);
    this.videos = videos;
  }
}
