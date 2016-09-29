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
    return [...this.instances];
  }

  static find(id) {
    return this.instances.find(i => i.id === id);
  }

  static attrAccessor(name) {
    this.attrGetter(name);
    this.attrSetter(name);
  }

  static attrGetter(name) {
    this.attrGetters = this.attrGetters || [];
    this.attrGetters.push(name);
  }

  static attrSetter(name) {
    this.attrSetters = this.attrSetters || [];
    this.attrSetters.push(name);
  }

  constructor(attributes = {}) {
    // Create Getters
    (this.constructor.attrGetters || []).forEach((name) => {
      Object.defineProperty(this, name, {
        get: () => this.attributes[name],
        enumerable: true,
        configurable: true,
      });
    });

    // Create Setters
    (this.constructor.attrSetters || []).forEach((name) => {
      Object.defineProperty(this, name, {
        set: (value) => {
          this.attributes[name] = value;
          return value;
        },
        enumerable: true,
        configurable: true,
      });
    });

    // Attributes
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
    this.constructor.instances = this.constructor.instances.filter(
      instance => instance !== this
    );
  }
}
