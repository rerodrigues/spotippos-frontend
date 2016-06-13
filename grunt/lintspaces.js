"use strict";

module.exports = function(grunt) {
    return {
        options : {
            newline: true,
            indentation: 'spaces',
            spaces: 4,
            showTypes: true
        },
        html: {
            src: [
                'app/**/*.{html,xml}'
            ],
            options: {
                ignores: ['html-comments']
            }
        },
        js: {
            src: [
                'app/**/*.js',
                'app/**/*.json',
                '!app/lib/**/*',
                'grunt/*.js',
                'test/*.js'
            ],
            options: {
                ignores: ['js-comments']
            }
        },
        css: {
            src: [
                'app/**/*.{scss,sass}'
            ]
        },
        package : {
            src: [
                'Package.json',
            ],
            options: {
                spaces: 2
            }
        },
        others: {
            src: [
                '.gitignore',
                '.jshint',
                'config.rb',
                'Gruntfile.js',
                'LICENSE',
                'README.md'
            ]
        }
    };
};
