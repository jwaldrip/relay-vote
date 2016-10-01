import * as h from '../helpers/model';

const STORE = {};

export default class Model {

  static get instances() {
    if (!STORE[this.name]) {
      this.instances = [];
    }
    return [...STORE[this.name]];
  }

  static set instances(instances) {
    STORE[this.name] = instances;
    return this.instances;
  }

  static all() {
    return [...this.instances];
  }

  static new(attrs = {}) {
    return new this(attrs);
  }

  static create(attrs = {}) {
    const instance = this.new(attrs);
    instance.save();
    return instance;
  }

  static find(id) {
    return this.instances.find(i => i.id === id);
  }

  static attrAccessor(name) {
    this.attrGetter(name);
    this.attrSetter(name);
  }

  static belongsTo(model, { as, foreignKey, primaryKey } = {}) {
    this.belongsTos = this.belongsTos || [];
    this.belongsTos.push({ model, as, foreignKey, primaryKey });
  }

  static hasMany(model, { as, foreignKey, primaryKey } = {}) {
    this.hasManys = this.hasManys || [];
    this.hasManys.push({ model, as, foreignKey, primaryKey });
  }

  static hasOne(model, { as, foreignKey, primaryKey } = {}) {
    this.hasOnes = this.hasOnes || [];
    this.hasOnes.push({ model, as, foreignKey, primaryKey });
  }

  static attrGetter(name) {
    this.attrGetters = this.attrGetters || [];
    this.attrGetters.push(name);
  }

  static attrSetter(name) {
    this.attrSetters = this.attrSetters || [];
    this.attrSetters.push(name);
  }

  static where(options = {}) {
    return this.all().filter(h.buildInstanceFilterFn(options));
  }

  static findBy(options = {}) {
    return this.all().find(h.buildInstanceFilterFn(options));
  }

  constructor(attributes = {}) {
    this.attributes = { ...attributes };
    Object.defineProperty(this.attributes, 'id', { get: () => this.id });
    this.id = undefined;
    h.buildHasOnes(this);
    h.buildHasManys(this);
    h.buildBelongsTos(this);
    h.buildSetters(this);
    h.buildGetters(this);
    Object.seal(this);
  }

  update(attributes = {}) {
    this.attributes = { ...this.attributes, ...attributes };
    this.save();
  }

  save() {
    const { instances } = this.constructor;
    const lastId = (instances[instances.length - 1] || { id: 0 }).id;
    this.id = lastId + 1;
    this.constructor.instances = [...instances, this];
  }

  delete() {
    this.constructor.instances = this.constructor.instances.filter(
      instance => instance !== this
    );
  }
}
