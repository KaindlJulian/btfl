import { Host } from '../Host';
import { Folder } from './Folder';

export class FollowList {
  private folders: Folder[];
  private rootHosts: Host[];

  constructor(...rootHosts: Host[]) {
    this.folders = [];
    this.rootHosts = rootHosts;
  }

  insertRootHost(...hosts: Host[]) {
    this.rootHosts = [...this.rootHosts, ...hosts];
  }
}
