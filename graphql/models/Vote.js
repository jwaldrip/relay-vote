import Model from './';

export default class Vote extends Model {}
Vote.belongsTo(() => require('./Person').default, { as: 'voter' });
Vote.belongsTo(() => require('./Person').default, { as: 'candidate' });
