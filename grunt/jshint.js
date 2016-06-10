"use strict";

module.exports = function(grunt) {
	return {
		files: [
			'Gruntfile.js',
			'grunt/*.js',
			'app/**/*.js',
			'test/*.js',
			'!app/lib/**/*'
		],
		options: {
			reporter: require('jshint-stylish'),
			jshintrc: true
		}
	};
};