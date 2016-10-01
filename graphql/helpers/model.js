import _ from 'lodash';
_.mixin(require('lodash-inflection'));

function resolveMaybeThunk(thinkOrThunk) {
  const { default: Model } = require('../models');
  if (thinkOrThunk.prototype instanceof Model) {
    return thinkOrThunk;
  }
  if (thinkOrThunk instanceof Function) {
    return thinkOrThunk();
  }
  return thinkOrThunk;
}

export function buildInstanceFilterFn(options) {
  return instance => Object.keys(options).reduce((prev, key) => {
    const value = options[key];
    return prev && instance[key] === value;
  }, true);
}

export function buildGetters(instance) {
  (instance.constructor.attrGetters || []).forEach((name) => {
    Object.defineProperty(instance, name, {
      get: () => instance.attributes[name],
      enumerable: true,
      configurable: true,
    });
  });
}

export function buildSetters(instance) {
  (instance.constructor.attrSetters || []).forEach((name) => {
    Object.defineProperty(instance, name, {
      set: (value) => {
        instance.attributes[name] = value; // eslint-disable-line no-param-reassign
        return value;
      },
      enumerable: true,
      configurable: true,
    });
  });
}

function belongsTosDefaults({ model, as, foreignKey, primaryKey }) {
  /* eslint-disable no-param-reassign */
  model = resolveMaybeThunk(model);
  as = as || _.camelCase(_.snakeCase(model.name));
  primaryKey = primaryKey || 'id';
  const defaultForeignKey = _.camelCase([_.snakeCase(as), _.snakeCase(primaryKey)].join('_'));
  foreignKey = foreignKey || defaultForeignKey;
  /* eslint-enable no-param-reassign */
  return { model, as, foreignKey, primaryKey };
}

export function buildBelongsTos(instance) {
  (instance.constructor.belongsTos || []).map(
    belongsTosDefaults
  ).forEach(({ model, as, foreignKey, primaryKey }) => {
    Object.defineProperty(instance, foreignKey, {
      get: () => instance.attributes[foreignKey],
      set: (value) => {
        instance.attributes[foreignKey] = value; // eslint-disable-line no-param-reassign
        return value;
      },
    });
    Object.defineProperty(instance, as, {
      get: () => {
        const findByOpts = {};
        findByOpts[primaryKey] = instance.attributes[foreignKey];
        return model.findBy(findByOpts);
      },
      set: (foreignInstance) => {
        instance.attributes[foreignKey] = // eslint-disable-line no-param-reassign
          foreignInstance.attributes[primaryKey];
        return foreignInstance;
      },
      enumerable: true,
      configurable: true,
    });
  });
}

function buildhasManyDefaults(instance) {
  return ({ model, as, foreignKey, primaryKey }) => {
    /* eslint-disable no-param-reassign */
    model = resolveMaybeThunk(model);
    as = as || _.pluralize(_.camelCase(_.snakeCase(model.name)));
    primaryKey = primaryKey || 'id';
    const defaultForeignKey = _.camelCase([_.snakeCase(instance.constructor.name), _.snakeCase(primaryKey)].join('_'));
    foreignKey = foreignKey || defaultForeignKey;
    /* eslint-enable no-param-reassign */
    return { model, as, foreignKey, primaryKey };
  };
}

export function buildHasManys(instance) {
  (instance.constructor.hasManys || []).map(
    buildhasManyDefaults(instance)
  ).forEach(({ model, as, foreignKey, primaryKey }) => {
    Object.defineProperty(instance, as, {
      get: () => {
        const whereOpts = {};
        whereOpts[foreignKey] = instance.attributes[primaryKey];
        return Object.freeze(model.where(whereOpts));
      },
      set: (foreignInstances) => {
        foreignInstances.forEach((foreignInstance) => {
          const updateOpts = {};
          updateOpts[foreignKey] = instance.attributes[primaryKey];
          foreignInstance.update(updateOpts);
        });
        return instance[as];
      },
      enumerable: true,
      configurable: true,
    });
  });
}

function buildHasOneDefaults(instance) {
  return ({ model, as, foreignKey, primaryKey }) => {
    /* eslint-disable no-param-reassign */
    model = resolveMaybeThunk(model);
    as = as || _.camelCase(_.snakeCase(model.name));
    primaryKey = primaryKey || 'id';
    const defaultForeignKey = _.camelCase([_.snakeCase(instance.constructor.name), _.snakeCase(primaryKey)].join('_'));
    foreignKey = foreignKey || defaultForeignKey;
    /* eslint-enable no-param-reassign */
    return { model, as, foreignKey, primaryKey };
  };
}

export function buildHasOnes(instance) {
  (instance.constructor.hasOnes || []).map(
    buildHasOneDefaults(instance)
  ).forEach(({ model, as, foreignKey, primaryKey }) => {
    Object.defineProperty(this, as, {
      get: () => {
        const findByOpts = {};
        findByOpts[foreignKey] = this.attributes[primaryKey];
        return model.findBy(findByOpts);
      },
      set: (foreignInstance) => {
        const updateOpts = {};
        updateOpts[foreignKey] = instance.attributes[primaryKey];
        foreignInstance.update(updateOpts);
        return instance[as];
      },
      enumerable: true,
      configurable: true,
    });
  });
}
