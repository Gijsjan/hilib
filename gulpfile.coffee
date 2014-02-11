gulp = require 'gulp'
gutil = require 'gulp-util'
connect = require 'gulp-connect'
concat = require 'gulp-concat'
clean = require 'gulp-clean'
stylus = require 'gulp-stylus'
browserify = require 'gulp-browserify'
rename = require 'gulp-rename'
changed = require 'gulp-changed'

bsify = (path) ->
	gutil.log(path)
	gulp.src(path, read: false)
		.pipe(browserify(
			transform: ['coffeeify', 'jadeify']
			extensions: ['.coffee', '.jade']
			external: ['jquery', 'backbone', 'underscore']
			standalone: 'lib'
		))
		.pipe(rename(extname: '.js'))
		.pipe(gulp.dest('./lib'))

paths =
	coffee: './src/**/*.coffee'
	jade: './src/jade/**/*.jade'
	stylus: ['./src/**/*.styl', '!./src/stylus/import/*.styl']

# gulp.task 'coffee', ->
# 	gulp.src('./src/utils/utils.coffee', read: false)
# 		.pipe(browserify(
# 			transform: ['coffeeify', 'jadeify']
# 			extensions: ['.coffee', '.jade']
# 			external: ['jquery', 'backbone']
# 		))
# 		.pipe(rename('utils.js'))
# 		.pipe(gulp.dest('./lib'))
		
gulp.task 'stylus', ->
	gulp.src(paths.stylus)
		.pipe(stylus(
			use: ['nib']
			import: ['./import/*.styl']
		))
		.pipe(concat('faceted-search.css'))
		.pipe(gulp.dest(__dirname))

gulp.task 'b', ['coffee', 'stylus']
	

gulp.task 'watch', ->
	# gulp.watch [paths.jade], ['jade']
	gulp.watch [paths.coffee], (event) -> bsify event.path
	gulp.watch [paths.stylus], ['stylus']

gulp.task 'default', ['watch']