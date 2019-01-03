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

    // copy empty index.ts onto itself to launch build procees
    gulp.src('./src/index.ts')
      .pipe(gulp.dest('./src/'));

});
