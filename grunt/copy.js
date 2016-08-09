"use strict";

module.exports = function(grunt) {
    return {
        main: {
            expand: true,
            cwd: '',
            src: [
                'app/**',
                '!app/libs/**',
                '!app/assets/{js,css,scss}/**',
                '!app/modules/**/*.{js,css,scss}',
                '!app/assets/img/{png,jpg,gif}/**'
            ],
            dest: 'dist/',
        },

        fonts: {
            expand: true,
            cwd: '',
            flatten: true,
            files: {
                'dist/app/fonts/': '<%= paths.src.fonts %>'
            }
        }
    };
};
