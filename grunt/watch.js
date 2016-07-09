"use strict";

module.exports = function(grunt) {
    return {
        index: {
            files: 'app/index.html',
            tasks: ['lintspaces:html', 'compile', 'notify:compile']
        },
        jshint: {
            files: ['<%= jshint.files %>'],
            tasks: ['lintspaces:js', 'jshint', 'notify:jshint']
        },
        compass: {
            files: ['app/assets/scss/*.scss', 'app/modules/**/scss/*.scss'],
            tasks: ['lintspaces:css', 'compass:dev', 'postcss:dev', 'notify:compass']
        },
        svgstore: {
            files: 'app/assets/img/svg/*.svg',
            tasks: ['svgstore', 'notify:svgstore']
        }
    };
};
