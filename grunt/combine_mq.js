"use strict";

module.exports = function(grunt) {
    return {
        tmp: {
            expand: true,
            src: '.tmp/**/*.css'
        }
    };
};
