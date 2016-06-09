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
				'!app/assets/img/{png,jpg,gif}/**',
				'!app/modules/**/*.{js,css,scss}',
                'app/assets/img/png/spotippos-map.png'
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