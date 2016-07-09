"use strict";

module.exports = function(grunt) {
    return {
        'default': {
            options: {
                message: 'Tasks finished running'
            }
        },
        jshint: {
            options: {
                message: 'JShint finished running'
            }
        },
        compass: {
            options: {
                message: 'Compass finished running'
            }
        },
        svgstore: {
            options: {
                message: 'SVGStore finished running'
            }
        },
        compile: {
            options: {
                message: 'Finished compiling'
            }
        },
        build: {
            options: {
                message: 'Finished building'
            }
        }

    };

};
