connect_middleware = require './middleware.connect.coffee'

module.exports = (grunt) ->

	##############
	### CONFIG ###
	##############

	grunt.initConfig
		shell:
			options:
				stdout: true
				stderr: true
			mocha: 
				command: 'mocha-phantomjs -R dot http://localhost:1234/.test/index.html'
			groc:
				command: 'groc "src/*.coffee" --out=docs'
			emptycompiled:
				command: 'rm -rf compiled/*'
			bowerinstall:
				command: 'bower install'

		connect:
			keepalive:
				options:
					port: 1234
					base: ''
					middleware: connect_middleware
					keepalive: true
			test:
				options:
					port: 1234
					base: ''
					middleware: connect_middleware

		touch:
			js: 'touch/js'
			html: 'touch/html'
			css: 'touch/css'

		jade:
			compile:
				files: 'compiled/templates.js': 'src/**/*.jade'
				# files: [
				# 	expand: true
				# 	cwd: 'src'
				# 	src: '**/*.jade'
				# 	dest: 'compiled'
				# 	rename: (dest, src) -> 
				# 		dest + '/' + src + '.js' # Use rename to preserve multiple dots in filenames (nav.user.coffee => nav.user.js)
				# ]
				options:
					compileDebug: false
					client: true
					amd: true
					processName: (filename) ->
						parts = filename.split('/')
						parts[0] = 'hilib'
						parts[parts.length-1] = parts[parts.length-1].replace('.jade', '')
						parts.join('/')

		stylus:
			compile:
				files: [
					expand: true
					cwd: 'src'
					src: '**/*.styl'
					dest: 'compiled'
					rename: (dest, src) -> 
						dest + '/' + src.replace(/.styl/, '.css') # Use rename to preserve multiple dots in filenames (nav.user.coffee => nav.user.js)
				]

		coffee:
			compile:
				files: [
					expand: true
					cwd: 'src'
					src: '**/*.coffee'
					dest: 'compiled'
					rename: (dest, src) -> 
						dest + '/' + src.replace(/.coffee/, '.js') # Use rename to preserve multiple dots in filenames (nav.user.coffee => nav.user.js)
				]
			test:
				options:
					bare: true
					join: true
				files: 
					'.test/tests.js': ['.test/head.coffee', 'test/**/*.coffee']

		watch:
			coffeetest:
				files: 'test/**/*.coffee'
				tasks: ['coffee:test', 'shell:mocha']
			coffee:
				files: 'src/**/*.coffee'
				tasks: ['coffee:compile', 'touch:js']
			stylus:
				files: 'src/**/*.styl'
				tasks: ['stylus:compile', 'touch:css']
			jade:
				files: 'src/**/*.jade'
				tasks: ['jade:compile', 'touch:html']

	#############
	### TASKS ###
	#############

	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.loadNpmTasks 'grunt-contrib-stylus'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-connect'
	grunt.loadNpmTasks 'grunt-shell'
	grunt.loadNpmTasks 'grunt-touch'

	grunt.registerTask 'sw', [
		'connect:test'
		'watch'
	]

	grunt.registerTask 'w', 'watch'

	grunt.registerTask 'init', ['coffee:compile', 'stylus:compile', 'jade:compile']
	grunt.registerTask 'i', 'init'

	grunt.registerTask 'd', 'shell:groc'
	grunt.registerTask 'docs', 'shell:groc'

	grunt.registerTask 'c', 'compile'
	grunt.registerTask 'compile', [
		'shell:emptycompiled' # rm -rf compiled/
		'init'
	]