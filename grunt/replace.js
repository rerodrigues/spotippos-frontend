"use strict";

module.exports = function(grunt) {
    return {
        options: {
            expand: true
        },

        // Replace BUILD VERSIONS to DEV, PROD or ALL - html
        html: {
            src: ['<%= copy.main.dest %>/**/*.html'],
            overwrite: true,
            replacements: [{
                from: /<!-- BUILD:DEV (.*)-->(.*)/g,
                to: function(matchedWord, index, fullText, regexMatches) {
                    return "";
                }
            }, {
                from: /<!-- BUILD:PROD (.*)-->/g,
                to: function(matchedWord, index, fullText, regexMatches) {
                    return regexMatches;
                }
            }, {
                from: /<!-- BUILD:ALL (.*)-->/g,
                to: "$1"
            }, {
                from: /<!-- BUILD:LOCAL (.*)-->(.*)/g,
                to: ""
            }]
        },

        // Replace BUILD VERSIONS to DEV, PROD or ALL - js
        js: {
            src: ['.tmp/**/*.js'],
            overwrite: true,
            replacements: [{
                from: /\/\* BUILD:DEV (.*)\*\/(.*)/g,
                to: function(matchedWord, index, fullText, regexMatches) {
                    return "";
                }
            }, {
                from: /\/\* BUILD:PROD (.*)\*\/(.*)/g,
                to: function(matchedWord, index, fullText, regexMatches) {
                    return regexMatches.join('');
                }
            }, {
                from: /\/\* BUILD:ALL (.*)\*\//g,
                to: "$1"
            }, {
                from: /\/\* BUILD:LOCAL (.*)\*\/(.*)/g,
                to: ""
            }]
        }
    };
};
