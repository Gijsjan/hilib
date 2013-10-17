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
				command: 'mocha-phantomjs -R dot http://localhost:8000/.test/index.html'
			groc:
				command: 'groc "src/*.coffee" --out=docs'
			emptycompiled:
				command: 'rm -rf compiled/*'

		touch:
			js: 'touch/js'
			html: 'touch/html'
			css: 'touch/css'

		jade:
			compile:
				files: [
					expand: true
					cwd: 'src'
					src: '**/*.jade'
					dest: 'compiled'
					rename: (dest, src) -> 
						dest + '/' + src.replace(/.jade/, '.html') # Use rename to preserve multiple dots in filenames (nav.user.coffee => nav.user.js)
				]

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

		watch:
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
	grunt.loadNpmTasks 'grunt-shell'
	grunt.loadNpmTasks 'grunt-touch'

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