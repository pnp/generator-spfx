# Util - Overview

The util module can be found in the './lib/' directory and contains the following methods.

## mergeAddons(addonConfig, requestedLibraries, config)

This method merges add-ons in `package.json`.

**addonConfig**   
Configuration of add-ons available in the generator.

**requestedLibraries**  
Array of requested library identifiers.

**config**  
Given configuration to merge add-ons in the currently used `package.json`, for example.

## composeGulpFile(coreTemplate, customTemplate)

This method allows you to inject custom gulp tasks in the gulp file.

**coreTemplate**  
Path to any gulp file you would like to use as a template.

**customTemplate**  
Contains all your custom gulp tasks you would like to inject.

The core template in the generator provided by SPFx is located in the folder `/app/templates/gulpfile.js` and contains the following [EJS](http://ejs.co) code:

```js
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

<%= customTasks %>

build.initialize(gulp);
```

The custom generator can point to this file using the following code:

```js
let coreGulpTemplate = this.templatePath('../../../app/templates/gulpfile.js');
```

The following example shows a simple custom code snippet that should be included in the gulp file:

```js
// code to inject in gulp file
console.log('Hello PnP SPFx generator');
```

The resulting `gulpfile.js` after the merge in this case will be:

```js
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// code to inject in gulp file
console.log('Hello PnP SPFx generator');

build.initialize(gulp);
```
