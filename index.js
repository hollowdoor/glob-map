const globby = require('globby');
const pMap = require('p-map');
const os = require('os');
const concurrent = os.cpus().length || 1;

module.exports = (globs, options, cb)=>{
    if(cb === void 0){
        cb = options;
        options = {};
    }

    let concurrency = options.concurrency || concurrent;
    delete options.concurrency;

    return globby(globs, options)
    .then(files=>{
        return pMap(files, cb, {concurrency});
    });
};
