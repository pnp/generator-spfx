# Inject custom gulp task

To inject a custom gulp task into a SharePoint Framework generated `gulpfile.js` use the following method.
Add a file named `gulpfile.js` in the templates folder of the custom generator. The following code sample shows the content take from the Handlebars generator and register the web pack loader along with a custom gulp watch.

```js
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
```

This file should only contain the required code that needs added to the SPFx owned `gulpfile.js`.

Add the following code `index.js` after the `end()` method.

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

To execute this the injection your custom task in the `gulpfil.js` call this method from install method.

```js
install() {

    this._injectToGulpFile();

}
```

To verify execute the yeoman generator and look up the changes the changes in the `gulpfile.js` in the project directory.