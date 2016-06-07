"use strict";

module.exports = function(grunt) {
    return {
        index: {
            files: 'index.html',
            tasks: ['build']
        },
        jshint: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        compass: {
            files: 'app/**/*.scss',
            tasks: ['compass:dev']
        }
    };
};