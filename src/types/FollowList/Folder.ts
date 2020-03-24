import { Host } from '../Host';

export class Folder {
  private hostList: Host[];
  readonly name: string;

  constructor(name: string, ...hosts: Host[]) {
    this.name = name;
    this.hostList = hosts;
  }
}
