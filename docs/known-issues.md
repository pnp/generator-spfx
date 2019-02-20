# Known Issues

## Version 1.6.2

* When no library and no vetting option get selected 'gulp-sequence' is missing and has to be installed manually using ```npm install gulp-sequence --save-dev```. [#158](https://github.com/pnp/generator-spfx/issues/158)

## Version 1.4.0

### Problem with 'ng serve' in application created by Angular Elements generator
Currently there is an issue with web components polyfill in Angular Elements generator that causes errors when running application using `ng serve` command. Details on current state and workaround [#113](https://github.com/pnp/generator-spfx/issues/113)

### Problem with Handlebars and create folder is selected during SPFx generator
Currently there is an issue when the 'create folder for solution' option is selected in the questions of the `@microsoft/sharepoint` generator. Details on current state [#84](https://github.com/pnp/generator-spfx/issues/84)

If you find one please submit the issue to our [GitHub Repository](https://github.com/pnp/generator-spfx/issues/new).
