export default class Root {
  static find() {
    this.root = this.root || new Root();
    return this.root;
  }

  get id() {
    return 'ROOT';
  }
}
