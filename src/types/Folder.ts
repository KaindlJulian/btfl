import { Host } from './Host';

export class Folder {
  private _name: string;
  readonly hosts: Host[];

  constructor(name: string) {
    this._name = name;
    this.hosts = [];
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  addHost(...hosts: Host[]) {
    this.hosts.push(...hosts);
  }
}
