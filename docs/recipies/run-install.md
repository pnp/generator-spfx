# Run install npm packages from generator
After all required modifications have been applied to a new project by the Yeoman generator, the npm packages need to be installed. To provide a consistent method for all generators, a utility class was implemented that provides a single method to run the installer.

## Default behaviour of the installer
Like the SPFx Default Yeoman generator installer, it supports the following three package managers:

* [npm](https://www.npmjs.com)
* [pnpm](https://pnpm.js.org)
* [yarn](https://yarnpkg.com/en/)

Be default, the npm package manager will be used. If the yarn package manager is installed on the client, this package manager will instead be used by default.

The pnpm package manager is available via a command line switch when the yeoman generator gets launched.

To install dependencies with a specific package manager, the following options exist:

**To explicitly use npm:**
```sh
yo @pnp/spfx --pm npm
```

or

```sh
yo @pnp/spfx --package-manager npm
```

**To explicitly use pnpm:**
```sh
yo @pnp/spfx --pm pnpm
```

or

```sh
yo @pnp/spfx --package-manager pnpm
```

**To explicitly use pnpm:**
```sh
yo @pnp/spfx --pm yarn
```

or

```sh
yo @pnp/spfx --package-manager yarn
```

## Reference to the Util
Your generators `index.js` should include the following line of code somewhere at the start:

```js
// importing utilities
const util = require('../../lib/util.js');
```

## Call npm package installation

Add the following line of code in the install method of your generator:

```js
install(){

    /* Custom configuration code should be placed before the installer */
    util.runInstall(this);

}
```
