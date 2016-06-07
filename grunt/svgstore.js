"use strict";

module.exports = function(grunt) {
    return {
        default : {
            options: {},
            svg: {
                style: 'display: none;',
            },
            files: {
                'app/assets/img/sprites.svg': ['app/assets/img/svg/*.svg'],
            }
        },
        icons : {
            options: {
                cleanup: ['fill'],
            },
            svg: {
                style: 'display: none;',
            },
            files: {
                'app/assets/img/icons.svg': ['app/assets/img/svg/*.svg'],
            }
        }
    };
};
              