'use strict';

var through = require('through2'),
    PluginError = require('gulp-util').PluginError,
    amdWrap = require('amd-wrap');

module.exports = function(opts) {
    opts = opts || { };

    function AmdWrap(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-amd-wrap', 'Streaming not supported'));
            return cb();
        }

        if (file.isBuffer()) {
            if (opts.prependReturn) {
                var retBuffer = new Buffer('return ');
                file.contents = Buffer.concat([ retBuffer, file.contents ]);
            }
            file.contents = new Buffer(amdWrap(file.contents));
        }

        this.push(file);
        cb();
    }

    return through.obj(AmdWrap);
};
