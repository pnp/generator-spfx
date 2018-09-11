// definition of Handlebars loader
const loaderConfig = {
  test: /\.hbs/,
  loader: 'handlebars-template-loader'
};

// Merge custom loader to web pack configuration
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    generatedConfiguration.module.rules.push(loaderConfig);

    return generatedConfiguration;

  }

});

// marker to check if custom watch is already registered
// used to prevent watch bubbling
let customWatchRegistered = false;

// Register watches sub task to move hbs files over to libs directory
let hbsWatch = build.subTask('hbsWatch', (gulp, buildOptions, done) => {

  // register watch only on first launch
  if (!customWatchRegistered) {

    // on change of +.hbs files
    gulp.watch('./src/**/*.hbs', event => {


      // copy hbs from src to lib
      gulp.src('./src/**/*.hbs')
        .pipe(gulp.dest('./lib/'));

      // copy empty index.ts to itself to launch build procees
      gulp.src('./src/index.ts')
        .pipe(gulp.dest('./src/'));

    });

    // after watch is registered don't register again
    // to avoid event bubbling
    customWatchRegistered = true;

  } else {

    // make sure preBuild file will be copied once again
    gulp.src('./src/**/*.hbs')
      .pipe(gulp.dest('./lib/'));

  }

  done();

});

build.rig.addPreBuildTask(hbsWatch);