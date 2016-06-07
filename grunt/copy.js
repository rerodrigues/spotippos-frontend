"use strict";

module.exports = function(grunt) {
	return {
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
	};
};