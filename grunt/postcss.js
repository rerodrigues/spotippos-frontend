"use strict";

module.exports = function(grunt) {
    return {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({ browsers: 'last 2 versions' })
            ]
        },
        dist: {
            src: '<%= paths.dest.css %>/*.css'
        },
        dev: {
            src: 'app/assets/css/*.css'
        }
    };
};
