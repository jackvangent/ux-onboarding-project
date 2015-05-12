module.exports = function(grunt) {
	var paths = {
		public: 'dist/',
		private: 'assets/',
		npm: 'node_modules/',
		temp: 'temp/',
		test: 'assets/test'
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
			'<%= paths.npm %>angular-ui-router/release/angular-ui-router.min.js',
			'<%= paths.npm %>angular-mocks/angular-mocks.js'
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
		karma: {
			options: {
				plugins: [
					'karma-jasmine',
					'karma-phantomjs-launcher'
				],
				frameworks: ['jasmine'],
				files: [
					// '<%= paths.npm %>angular/angular.min.js',
					// '<%= paths.npm %>angular-animate/angular-animate.min.js',
					// '<%= paths.npm %>angular-resource/angular-resource.min.js',
					// '<%= paths.npm %>angular-ui-router/release/angular-ui-router.min.js'
					'<%= paths.public %>/js/application.js',
					//TEST FILE GOES HERE FOR SURE
					'<%= paths.test %>/unit/*.js'
				],
				browsers: ['PhantomJS'],
				autoWatch: false,
				singleRun: false
			},
			unit: {
				singleRun: true,
				browsers: ['PhantomJS']
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
			},
			karma: {
				files: [
					files.js,
					'<%= paths.test %>/unit/*.js',
					'Gruntfile.js'
				],
				tasks: ['karma:unit']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['clean:first', 'ngtemplates','concat', 'clean:last', 'copy', 'connect', 'watch']);
	//grunt.registerTask('dev', ['clean:first', 'ngtemplates','concat', 'clean:last', 'copy', 'connect', 'karma:unit', 'watch']);
};