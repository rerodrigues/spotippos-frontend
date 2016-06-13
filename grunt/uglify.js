"use strict";

module.exports = function(grunt) {
    return {
        options: {
            report: 'min',
            mangle: {
                screw_ie8: true
            },
            sourceMap: false,
            banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */'
        }
    };
};
