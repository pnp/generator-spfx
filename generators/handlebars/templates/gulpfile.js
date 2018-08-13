const loaderConfig = {
  test: /\.hbs/,
  loader: "handlebars-template-loader"
};

// Merge custom loader to web pack configuration
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    generatedConfiguration.module.rules.push(loaderConfig);

    return generatedConfiguration;

  }
});

// Register watches sub task to move hbs files over to libs directory
let hbsWatch = build.subTask('hbsWatch', (gulp, buildOptions, done) => {

  gulp.watch('./**/*.hbs', () => {

    gulp.src('./src/**/*.hbs')
      .pipe(gulp.dest('./lib/'));

  });

  done();

});

build.rig.addPreBuildTask(hbsWatch);

build.initialize(gulp);
