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
    },
    
    clean: ["dist", '.tmp'],
    
    copy: {
      main: {
        expand: true,
        cwd: '',
        src: [
          'app/**',
          '!app/lib/**',
          '!app/assets/{js,scss}/**',
          '!app/modules/**/*.{js,css,scss}'
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
    },

    useminPrepare: {
      html: 'app/index.html'
    },

    usemin: {
      html: 'dist/app/index.html'
    },

    uglify: {
      options: {
        report: 'min',
        mangle: {
          screw_ie8: true
        },
        sourceMap: true,
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */'
      }
    },

    cleanempty: {
      src: ['dist/app/**/*'],
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'app/**/*.js',
        'test/unit/*.js',
        '!app/lib/**/*'
      ],
      options : {
        reporter: require('jshint-stylish'),
        jshintrc : true
      }
    },

    compass: {
      options: {
        sassDir: '<%= paths.src.css %>',
        cssDir: '<%= paths.dest.css %>',
        sourcemap : false
      },
      dist: {
        options: {
          environment: 'production'
        }
      },
      dev: { // Another target
        options: {
          environment: 'development'
        }
      }
    },
    
    imagemin: { //TODO
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['app/**/*.{png,jpg,gif}'],
          dest: 'assets/img/'
        }]
      }
    },
    
    svgstore: { //TODO
      default: {
        options: {},
        svg: {
          style: 'display: none;',
        },
        files: {
          'assets/images/sprite.svg': ['assets/images/svg/*.svg'],
        }
      },
      cleanup: {
        options: {
          cleanup: ['fill'],
        },
        svg: {
          style: 'display: none;',
        },
        files: {
          'assets/images/icons.svg': ['assets/images/svg/icons/*.svg'],
        }
      },
    },
    
    watch: {
      index : {
        files : 'index.html',
        tasks : ['build']
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      compass: {
        files: 'app/**/*.scss',
        tasks: ['compass:dev']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-cleanempty');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  
  grunt.registerTask('compile', [
    'jshint', 'compass:dist'
  ]);
  
  grunt.registerTask('build', [
    'clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'usemin', 'cleanempty'
  ]);
  
  grunt.registerTask('default', [
    'compile', 'build'
  ]);

};