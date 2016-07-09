"use strict";

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        paths: {
            src: {
                css: 'app/assets/scss',
                fonts: 'app/**/fonts',
                img: 'app/**/img',
                js: 'app/**/js/'
            },
            dest: {
                css: 'app/assets/css',
                fonts: 'dist/assets/fonts',
                img: 'dist/assets/img',
                js: 'dist/assets/js'
            }
        }
    });

    require('load-grunt-config')(grunt, {
        loadGruntTasks: {
            scope: 'devDependencies'
        },
        data: {
            paths: grunt.config('paths')
        }
    });

    grunt.registerTask('compile', ['lintspaces', 'jshint', 'compass:dist', 'postcss:dist', 'svgstore', 'notify:compile']);
    grunt.registerTask('build', ['compile', 'clean', 'copy', 'useminPrepare', 'replace:html', 'concat', 'replace:js', 'uglify', 'usemin', 'cleanempty', 'clean:tmp', 'notify:build']);
    grunt.registerTask('default', 'build');
};
