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
			one: ['<%= paths.public %>', '<%= paths.temp %>'],
			two: ['<%= paths.temp %>']
		},
		copy: {
			main: {
				files: [{
					expand: true,
					flatten: true,
					src: files.css,
					dest: '<%= paths.public %>css'
				}, {
					expand: true,
					flatten: true,
					src: 'index.html',
					dest: '<%= paths.public %>'
				}]
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
				files: [{
					src: files.deps.concat(files.js),
					dest: '<%= paths.public %>js/application.js'
				}, ]
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
					'<%= paths.public %>/js/application.js',
					'<%= paths.test %>/unit/*.js'
				],
				browsers: ['PhantomJS']
			},
			unit: {
				singleRun: true,
				browsers: ['PhantomJS']
			}
		},
		watch: {
			js: {
				files: files.js,
				tasks: ['ngtemplates', 'concat', 'karma:unit']
			},
			css: {
				files: files.css,
				tasks: ['copy']
			},
			unitTests: {
				files: [
					'<%= paths.test %>/unit/*.js'
				],
				tasks: ['karma:unit']
			},
			grunt: {
				files: [
					'Gruntfile.js'
				],
				tasks: ['gfChange']
			},
			e2eTests: {
				files: [
					'<%= paths.test %>/e2e/*.js'
				],
				tasks: ['protractor']
			}
		},
		protractor: {
			e2e: {
				options: {
					configFile: '<%= paths.test %>/e2e/conf.js',
					keepAlive: true,
					noColor: false,
					args: {
						browser: 'chrome'
					}
				}
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
	grunt.loadNpmTasks('grunt-protractor-runner');

	grunt.registerTask('default', ['clean:one', 'ngtemplates', 'concat', 'clean:two', 'copy', 'connect', 'watch']);
	grunt.registerTask('gfChange', ['clean:one', 'ngtemplates', 'concat', 'clean:two', 'copy', 'watch']);
	grunt.registerTask('unit', ['clean:one', 'ngtemplates', 'concat', 'clean:two', 'copy', 'connect', 'karma:unit', 'watch']);
	grunt.registerTask('e2e', ['clean:one', 'ngtemplates', 'concat', 'clean:two', 'copy', 'connect', 'protractor:e2e', 'watch']);
};