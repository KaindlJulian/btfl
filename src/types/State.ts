import { Stream } from 'stream';

export enum HostState {
  Online,
  Rerunning,
  Offline
}

export interface Online {
  stream: Stream;
  state: HostState.Online;
}

export interface Rerun extends Omit<Online, 'state'> {
  state: HostState.Rerunning;
}

export interface Offline {
  videos: number;
  state: HostState.Offline;
}