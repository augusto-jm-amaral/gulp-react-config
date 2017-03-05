import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

var $ = plugins({ pattern: '*' });

function handleError (error) {
	console.log(error,toString());
	this.emit('end');
};

var cfg = {
	from: './_src',
	to: './public'
};

gulp.task('html', () => {
	gulp.src([cfg.from + '/**/*.html'])
			   // .pipe($.changed(cfg.to, {extension: '.html'}))	
			   .pipe($.filesize())
			   .pipe($.htmlmin({collapseWhitespace: true}))
			   .pipe(gulp.dest(cfg.to));
});

gulp.task('css', () => {
	gulp.src([
				'./bower_components/bootstrap/dist/css/bootstrap.min.css',
				cfg.from + '/assets/sass/**/*.scss'
			])
		  	   // .pipe($.changed(cfg.to + '/assets/css', {extension: '.css'}))
			   .pipe($.sass())
		       .on('error', handleError)
			   .pipe($.cssnano())
		       .on('error', handleError)
			   .pipe($.minifyCss())
			   .pipe($.concat('styles.min.css'))
			   .pipe($.filesize())
		       .pipe(gulp.dest(cfg.to + '/assets/css/'));
});

gulp.task('js', () => {
	gulp.src([
					'./bower_components/react/react.min.js', 
					'./bower_components/react/react-dom.min.js',
					'./bower_components/jquery/dist/jquery.min.js',
					'./bower_components/tether/dist/js/tether.min.js', 
					'./bower_components/bootstrap/dist/js/bootstrap.min.js',
					cfg.from + '/assets/js/**/*.js'
		        ])
			   .pipe($.react())
		       .on('error', handleError)
		       .pipe($.uglify())
		       .on('error', handleError)
		       .pipe($.concat('script.min.js'))
		       .pipe($.filesize())
		       .pipe(gulp.dest(cfg.to + '/assets/js'));
});

gulp.task('watch', () => {
	let html = gulp.watch([cfg.from + '/**/*.html'], ['html']);
	let css = gulp.watch([cfg.from + '/assets/sass/**/*.scss'], ['css']);
	let js = gulp.watch([cfg.from + '/assets/js/**/*.js'], ['js']);
});

gulp.task('browser-sync', () => {
	$.browserSync.init([cfg.to], {
		proxy: 'http://localhost:3000',
		port: 3001,
		notify: false
	});
});

gulp.task('default', ['html', 'js', 'css', 'watch', 'browser-sync', ]);


