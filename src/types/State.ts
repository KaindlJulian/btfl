import { Stream } from './Stream';

export enum HostState {
  Live,
  Rerunning,
  Offline,
}

export interface Live {
  stream: Stream;
  state: HostState.Live;
}

export interface Rerun extends Omit<Live, 'state'> {
  state: HostState.Rerunning;
}

export interface Offline {
  videos: string;
  state: HostState.Offline;
}
