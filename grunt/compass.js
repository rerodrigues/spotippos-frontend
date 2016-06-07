"use strict";

module.exports = function(grunt) {
    return {
        options: {
            sassDir: '<%= paths.src.css %>',
            cssDir: '<%= paths.dest.css %>',
            sourcemap: false
        },
        dist: {
            options: {
                environment: 'production'
            }
        },
        dev: {
            options: {
                environment: 'development',
            }
        }
    };
};