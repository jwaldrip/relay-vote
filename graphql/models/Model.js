export default class Model {
  static store = {};

  static get instances() {
    if (!this.store[this.name]) {
      this.instances = [];
    }
    return this.store[this.name];
  }

  static set instances(instances) {
    this.store[this.name] = instances;
  }

  static all() {
    return [ ...this.instances ];
  }

  static find(id) {
    return this.instances.find(i => i.id === id);
  }

  static field(name) {
    this.fields = this.fields || [];
    this.fields.push(name);
  }

  constructor(attributes = {}) {
    (this.constructor.fields || []).forEach(name => {
      Object.defineProperty(this, name, {
        get: () => this.attributes[name],
        set: value => {
          this.attributes[name] = value;
          return value;
        },
        enumerable: true,
        configurable: true
      });
    });
    this.attributes = attributes;
    this.id = this.constructor.instances.length + 1;
    Object.freeze(this);
  }

  update(attributes = {}) {
    this.attributes = { ...this.attributes, ...attributes };
    this.save();
  }

  save() {
    this.constructor.instances.push(this);
  }

  delete() {
    this.constructor._instances = this.constructor.instances.filter(
      instance => instance !== this
    );
  }
}
