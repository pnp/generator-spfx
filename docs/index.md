# Pnp SPFx Yeoman generator
The composeability model of Yeoman generator is on of its core features allow you to build your own or consume and reuse already built generator. The Microsofts SharePoint Framework Yeoman generator supports this model too.
The PnP SPFx Yeoman generator uses 100% of the SPFx Yeoman generator and adds functionalities on top of this framework.

![PnP SPFx Generator][logo]

The extension support ranges from client-side libraries such as pnpjs and jQuery to extend the capabilities to more complex extension such as the integration of HandlebarsJS, VueJS and many more.


The PnP SPFx Yeoman generator uses 100% of the Microsoft SPFx Yeoman generator but then adds functionalities on top of this framework. This extension supports additional client-side libraries such as PnPjs or jQuery to extend SPFx capabilities as well as even more complex extensions such as the integration of HandlebarsJS, VueJS, and many more.

> **Limitation:** Right now the PnP SPFx yeoman generator supports only the initial setup of new projects. To add additional web parts and extensions, please continue to use the Microsoft SPFx generator. In the future, this generator will be used to add elements to existing projects.

### Client-side extensions and Add-ons

| Library | Version | Documentation |
|:--|:--|:--|
| [jQuery](http://jquery.com) | 2.x, 3.x | |
| [@pnp/pnpjs](https://github.com/pnp/pnpjs) | > 1.4. | |

### Framework Extensions

| Framework | Version | Documentation |
|:--|:--|:--|
| [Handlebars](http://handlebarsjs.com) | > 4.0.0 | Get started |
| [VueJS](https://vuejs.org) | TBD | Get started |
| [Angular Elements](https://angular.io/guide/elements) | planned |  Get started |

## Installation

The generator needs to be installed globally depending on the package manager you use.

**Using NPM:**
```sh
npm install -g @pnp/generator-spfx
```

**Using Yarn:**
```sh
yarn install global @pnp/generator-spfx
```

**Using pnpm:**
```sh
pnpm install global-pnpmfile @pnp/generator-spfx
```


## Start a new project

To start a new project execute the following command:

```sh
yo @pnp/spfx
```

This will start the PnP SPFx Yeoman generator for a new project that gives you all the options to choose from.


[![asciicast](https://asciinema.org/a/196170.png)](https://asciinema.org/a/196170)

## Command line options

The following options provide a complete list of available switches.

```bash
Usage:
  yo @pnp/spfx [options]

Options:
  -h,    --help                     # Print the generator's options and usage
         --skip-cache               # Do not remember prompt answers - Default: false
         --skip-install             # Do not automatically install dependencies - Default: false
         --force-install            # Fail on install dependencies error - Default: false
         --component-description    # Web part description
         --component-name           # Web part name
         --component-type           # The type of component:
                                        - "webpart"
                                        - "extension"
         --enviroment               # The target environment for the solution:
                                        - "onprem" or "spo".
         --extension-type           # The type of extension:
                                        - "ApplicationCustomizer",
                                        - "FieldCustomizer"
                                        - "ListViewCommandSet"
  -pm,   --package-manager          # Let you choose the package manager:
                                        - "npm"
                                        - "yarn"
                                        - "pnpm"
         --plusbeta                 # Use the beta packages
         --skip-feature-deployment  # If specified, allow the tenant admin the choice of being able
                                      to deploy the components to all sites immediately without running any
                                      feature deployment or adding apps in sites
         --solution-name            # Solution name, as well as folder name
```


## Further information

* [General project setup and folders](./compose/add-generator.md)
* [Known Issues](./known-issues.md)


[logo]: ./assets/pnpspfx-title.png
