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

// register custom watch for hbbs.JS files
// copy of '.hba' files will be handled by 'copy-static-assets.json'
gulp.watch('./src/**/*.hbs', event => {

<<<<<<< HEAD
// Register watches sub task to move hbs files over to libs directory
let hbsWatch = build.subTask('hbsWatch', (gulp, buildOptions, done) => {

  // register watch only on first run
  if (!customWatchRegistered) {

    // on change of *.hbs files
    gulp.watch('./src/**/*.hbs', event => {

      // copy empty index.ts onto itself to launch build procees
      gulp.src('./src/index.ts')
        .pipe(gulp.dest('./src/'));

    });

    // after watch is registered don't register again
    customWatchRegistered = true;

  } else {

    // make sure preBuild file will be copied once again
    gulp.src('./src/**/*.hbs')
      .pipe(gulp.dest('./lib/'));

  }

  // tell build.rig the work is done.
  done();
=======
    // copy empty index.ts onto itself to launch build procees
    gulp.src('./src/index.ts')
      .pipe(gulp.dest('./src/'));
>>>>>>> o365-cli-check

});

// register task to prebuild
build.rig.addPreBuildTask(hbsWatch);
