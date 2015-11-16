var _ = require( 'lodash' );
var config = require('../config.js');
const TYPE_REG = /%env%/g;

function getEnv(args) {
    var result = _.findLast(args, function (val)  {
        return /^-(?!-)+/.test(val);
    });
    if (result) {
        return result.replace(/^-/, '');
    }
    return config.defaultPath;
}

function buildPath(data) {
    if (typeof data === 'string') {
        return data.replace(TYPE_REG, getEnv(process.argv));
    }
    _.each(data, function (v, k) {
        var value = data[k];
        delete data[k];
        data[buildPath(k)] = buildPath(value);
    })
    return data;
}
var conf = buildPath(config);
conf.TYPE = getEnv(process.argv);
module.exports = conf;

