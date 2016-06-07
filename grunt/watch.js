"use strict";

module.exports = function(grunt) {
    return {
        index: {
            files: 'app/index.html',
            tasks: ['compile']
        },
        jshint: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        compass: {
            files: ['app/assets/scss/*.scss', 'app/modules/**/scss/*.scss'],
            tasks: ['compass:dev']
        },
        svgstore: {
            files: 'app/assets/img/svg/*.svg',
            tasks: ['svgstore']
        }
    };
};