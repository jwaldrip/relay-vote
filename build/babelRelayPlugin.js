const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../tmp/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
