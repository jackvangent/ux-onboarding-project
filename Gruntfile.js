module.exports = function(grunt) {
	var paths = {
		public: 'dist/',
		private: 'assets/',
		npm: 'node_modules/',
		temp: 'temp/'
	};

	var files = {
		js: [
			'<%= paths.private %>js/*.js',
			'<%= paths.private %>js/**/*.js',
			'<%= paths.temp %>js/templates.js'
		],
		css: [
			'css/*.css'
		],
		deps: [
			'<%= paths.npm %>angular/angular.min.js',
			'<%= paths.npm %>angular-animate/angular-animate.min.js',
			'<%= paths.npm %>angular-resource/angular-resource.min.js',
			'<%= paths.npm %>angular-ui-router/release/angular-ui-router.min.js'
		]
	};

	grunt.initConfig({
		paths: paths,
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			first: ['<%= paths.public %>', '<%= paths.temp %>'],
			last: ['<%= paths.temp %>']
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: files.css,
						dest: '<%= paths.public %>css'
					}, {
						expand: true,
						flatten: true,
						src: 'index.html',
						dest: '<%= paths.public %>'
					}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: paths.public
				}
			}
		},
		ngtemplates: {
			main: {
				options: {
					bootstrap: function(module, script) {
						return 'myApp.run([\'$templateCache\', function($templateCache) {\n' + script + '}]);\n';
					}
				},
				files: [{
					cwd: '<%= paths.private %>',
					src: 'templates/*.html',
					dest: '<%= paths.temp %>js/templates.js'
				}]
			}
		},
		concat: {
			main: {
				files: [
					{
						src: files.deps.concat(files.js),
						dest: '<%= paths.public %>js/application.js'
					},
				]
			}
		},
		watch: {
			js: {
				files: files.js,
				tasks: ['concat']
			},
			others: {
				files: files.css,
				tasks: ['copy']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean:first', 'ngtemplates','concat', 'clean:last', 'copy', 'connect', 'watch']);
};