# Inject custom gulp task

To inject a custom gulp task into a SharePoint Framework generated `gulpfile.js`, use the following method.

Add a file named `gulpfile.js` in the templates folder of the custom generator. The following code sample shows the content taken from the Handlebars generator and registers the web pack loader along with a custom gulp watch:

```js
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

  // register watch only on first run
  if (!customWatchRegistered) {

    // on change of *.hbs files
    gulp.watch('./src/**/*.hbs', event => {

      // copy hbs from src to lib
      gulp.src('./src/**/*.hbs')
        .pipe(gulp.dest('./lib/'));

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

});

build.rig.addPreBuildTask(hbsWatch);
```

This file should only contain the required code that needs added to the SPFx owned `gulpfile.js`.

Add the following code `index.js` after the `end()` method:

```js
_injectToGulpFile() {

    if (fs.existsSync(this.destinationPath('gulpfile.js'))) {

        let coreGulpTemplate = this.templatePath('../../../app/templates/gulpfile.js');
        let customGulpTemplate = this.templatePath('./gulpfile.js')

        let mergedGulpFile = util.composeGulpFile(coreGulpTemplate, customGulpTemplate);

        fs.writeFileSync(this.destinationPath('./gulpfile.js'), mergedGulpFile, 'utf-8');

    }

}
```

To execute the injection of your custom task in `gulpfile.js`, call this method from the `install()` method:

```js
install() {

    this._injectToGulpFile();

}
```

To verify, execute the yeoman generator and look up the changes within `gulpfile.js` in the project directory.
