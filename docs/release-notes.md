# Release Notes

# 1.15.1 Graph Toolkit added

- Graph Toolkit support added [#275](https://github.com/pnp/generator-spfx/issues/275)
- Angular: Minifcation issue fixed [#278](https://github.com/pnp/generator-spfx/issues/278)


# 1.15.0 SPFx 1.11.0 / Angular 10 Support added

- Upgrade to SPFx 1.11.0
- Support for Angular 10 added
- Update Typescript compiler versions
- Update Addons to latest versions
- Remove Knockout Support


# 1.14.2 Solution / Component naming arguments fix

- Generator does not respect solution/component naming arguments [#268](https://github.com/pnp/generator-spfx/pull/268)


# 1.14.1 Angular 9 style support extended

- Include Angular Elements Styles in SPFx Webpart [#266](https://github.com/pnp/generator-spfx/pull/266)


# 1.14.0 Angular 9 Support added

- Addes Angular 9 support and is capable of Angular 6/7/8
- [CSS Module](https://github.com/css-modules/css-modules) support for [StyleLinter](https://stylelint.io) added
- TypeScript 3.8/3.9 added
- Minor update VueJS
- @pnp/spfx-controls-react - v1.19.0
- @pnp/pnpjs - 2.0.6
- Office 365 CLI 2.10.0 added


# 1.13.1 Webpack bundle analyzer optimisation

**Bugfix:** [#263](https://github.com/pnp/generator-spfx/issues/263) Incorrect version check during adding new web part

# 1.13.0 Webpack bundle analyzer optimisation

**Webpack bundle analyzer optimisation**

- run only on `gulp dist` and `gulp dev` for faster build times during development
- Runnig during development can accomplished with the switch `--analyze`

**Updated dependencies**

- @pnp/spfx-controls-react - 1.18.0
- @pnp/pnpjs - 2.0.5
- @pnp/spfx-controls-react - 1.18.0
- office-ui-fabric-react - 7.115.1
- JQuery - 3.5.1
- webpack-analyzer - 3.8.0
- stylelint - 13.5.0
- Handlebars - 4.7.6

# 1.12.0 Aurelia Framework added

- Aurelia Framework added

# 1.11.1 Improvmentens

- SP 2019 Projects: VueJS was removed due to SPFx 1.4.1
- Project re-run detection improvement [#232](https://github.com/pnp/generator-spfx/issues/232)

# 1.11.0 Upgrade to version 1.10.0 @microsoft/sharepoint

- Improved support for yarn, pnpm
- Microsoft Graph types added
- Update dependencies for [Handlebars](https://handlebarsjs.com), [VueJS](https://vuejs.org)
- VueJS - Bugfix [#213](https://github.com/pnp/generator-spfx/issues/213)
- Upgrade to @microsoft/generator-spfx version 1.10.0
- Bugfixes [#216](https://github.com/pnp/generator-spfx/issues/216), [#218](https://github.com/pnp/generator-spfx/issues/218), [#219](https://github.com/pnp/generator-spfx/issues/219), [#222](https://github.com/pnp/generator-spfx/issues/222), 
- Documentation update [#220](https://github.com/pnp/generator-spfx/issues/220)

# 1.10.2 Lodash & Azure DevOps Multi-stage pipeline

- Azure DevOps Multi-stage pipeline - Preview
- Minor Azure DevOps updates on mono-stage build pipeline
- Lodash integration for smaller builds

Documentation update on [continous integration](https://pnp.github.io/generator-spfx/howtos/continuousintegration/)

**Upgraded Libraries**

- JEST Presets
  - @voitanos/jest-preset-spfx - 1.2.2
  - @voitanos/jest-preset-spfx-react15 - 1.3.2
  - @voitanos/jest-preset-spfx-react16 - 1.3.2

# 1.10.1 Better unit testing reporting and pipeline caching

- better unit test and coverage reporting integration with azure devops
- updated jest-junit dependency
- added dependencies caching
- switched to ubuntu agent for better performance

**Upgraded References**

- sass-loader: 8.0.0
- handlebars: 4.5.3
- ts-loader: 6.2.1
- vue-loader: 15.7.2
- vie-property-decorator: 8.3.0
- fork-ts-checker-webpack-plugin: 3.0.1


# 1.10.0 HandlebarsJS - Webpack loader update

- Angular Bundle, link and Scaffolding fix [#206](https://github.com/pnp/generator-spfx/issues/206)
- Updated VueJS
- Update Handlebars with improved partials and helper support
[Upgrade Handlebar Projects](https://pnp.github.io/generator-spfx/howtos/handlebars-upgrade/)
- TypeScript support for 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5
- Suppor for library components is broken in @microsoft/generator-sharePoint. [#195](https://github.com/pnp/generator-spfx/issues/195), [sp-dev-docs#4554](https://github.com/SharePoint/sp-dev-docs/issues/4554)

**Includes**

- **Office UI Fabric** - 5.x, 6.x, 6.x Fluent
- **pnp/pnpjs** - 1.3.5
- **pnp/spfx-property-controls** - 1.16.0
- **pnp/spfx-controls-react** - 1.14.0
- **jQuery** - 3.4.1
- **webpack-bundle-analyzer** - 3.5.1
- **Handlebars** - 4.3.0
- **Vue** - 2.6.10
- **Office 365 CLI** - 1.23.0
- **StyleLint** - 11.0.0

 
# 1.9.1 Support for Angular 8 added
- Angular Elements option supports now Angular 6/7 and 8
- [#199 fixed](https://github.com/pnp/generator-spfx/issues/199) --skip-install not honored when pnpm gets used.
- TypeScript support for 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5
- Suppor tfor library components is broken in @microsoft/generator-sharePoint. [#195](https://github.com/pnp/generator-spfx/issues/195), [sp-dev-docs#4554](https://github.com/SharePoint/sp-dev-docs/issues/4554)

# 1.9.0 Update to SPFx 1.9.1
- Upgrade to SPFx 1.9.1
- Angular v6, v7 support added
- SPFx-uifabric-themes add-on added
- TypeScript support for 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5
- Support for library component

**Includes**

- **Office UI Fabric** - 5.x, 6.x, 6.x Fluent
- **pnp/pnpjs** - 1.3.5
- **pnp/spfx-property-controls** - 1.16.0
- **pnp/spfx-controls-react** - 1.14.0
- **jQuery** - 3.4.1
- **webpack-bundle-analyzer** - 3.4.1
- **Handlebars** - 4.1.2
- **Vue** - 2.6.10
- **Office 365 CLI** - 1.23.0
- **StyleLint** - 10.1.0

# 1.8.1 Azure DevOps update
- Azure DevOps CI integration use now NodeJS 10
- [CSSComb](https://github.com/csscomb/csscomb.js) integration

**Includes**

- **pnp/pnpjs** - 1.3.3
- **pnp/spfx-property-controls** - 1.15.0
- **pnp/spfx-controls-react** - 1.14.0
- **jQuery** - 3.4.1
- **webpack-bundle-analyzer** - 3.3.2
- **Handlebars** - 4.1.2
- **Vue** - 2.6.10
- **Office 365 CLI** - 1.19.0
- **StyleLint** - 10.1.0

# 1.8.0 Azure DevOps and Jest, Office UI Fabric support, TypeScript version selector
- Azure DevOps testing has been improved to support [Jest](https://jestjs.io) testing.
- TypeScript selection for all SharePoint Online Projects
- Office UI Fabric integration including Fluent Design

# 1.7.3 SPFx base generator 1.8.2 update
- Upgrade to @pnp/office365-cli 1.20.0

# 1.7.2 SPFx base generator 1.8.2 update
- Update to SPFx generator version 1.8.2
- Dropped support for jQUery version 2

**Includes**

- **jQuery** - 3.4.1
- **pnp/pnpjs** - 1.3.2
- **webpack-bundle-analyzer** - 3.3.2
- **Handlebars** - 4.1.2
- **Vue** - 2.6.10
- **Office 365 CLI** - 1.19.0

# 1.7.1 SPFx base generator 1.8.1 update
- Update to SPFx generator version 1.8.1

**Updated References**

- **pnp/pnpjs** - 1.3.2
- **webpack-bundle-analyzer** - 3.3.2
- **Handlebars** - 4.1.2
- **Vue** - 2.6.10
- **Office 365 CLI** - 1.17.0



# 1.7.0 SPFx base generator 1.8.0 update
- Update to SPFx generator version 1.8.0
- Bugfix command line options for environment

# 1.6.3 Azure Devops

- **Azure DevOps base integration added** by [Vincent Biret](https://twitter.com/baywet)
- **npm version** - Updates package-solution.json and Teams manifest.json with package.json version
- **gulp dev** - for package solution for development
- **Jest Testing Framework** - is now optional [#157](https://github.com/pnp/generator-spfx/issues/157)
- **[Docker Documentation](https://pnp.github.io/generator-spfx/howtos/dockerimg/)** 

**Bugfix:**

- [#158](https://github.com/pnp/generator-spfx/issues/158) - Missing gulp-sequence in package.json

**Updates:**

- @pnp/spfx-property-controls - 1.14.1
- @pnp/spfx-controls-react - 1.12.0


# 1.6.2 Update of the project creation process

- Only supported options are available now #154
- [Feature Matrix](https://pnp.github.io/generator-spfx/features/) in documentation updated
- Bugfix [#150](https://github.com/pnp/generator-spfx/issues/150)
 
**Includes:**

- [@pnp/pnpjs](https://github.com/pnp/pnpjs) - v1.2.9
- @pnp/spfx-property-controls - v1.14.0
- @pnp/@pnp/spfx-controls-react : v1.11.0
 
## 1.6.1 - 'gulp dist', Jest for no framework project

**Jest testing framework support for 'No Framework' projects**

-  New "gulp dist" task for faster-creating builds for production ('clean', 'bundle', 'package-solution')
-  Update package versions on VueJS, HandlbarsJS generator
 
**Includes:**

- pnp/pnpjs: v1.2.7
- @pnp/spfx-property-controls: v1.14.0
- @pnp/spfx-controls-react: v1.11.0
- Bugfix [#147](https://github.com/pnp/generator-spfx/issues/157)

## 1.6.0 - Support for Jest, Webpack Bundle Analyser and StyleLint

**All generator can have support:** 

- WebPack Bundle Analyser
- StyleLint
- pnp/pnpjs 1.2.8

**ReactJS supports:** 

- JEST testing support

## 1.5.0 - Upgrade to version @microsoft/generator-spfx 1.7.0

- Upgrade to @microsoft/sharepoint version 1.7 by [Pawel Hawrylak](https://github.com/phawrylak)
- Update Test definition for onprem19 - Application Customizer and Web Parts
- Updated for On-Premises Support SharePoint 2019
- Added additional SharePoint 2019 tests
- domain isolation option added
- package update checker added

## 1.4.3 - Handlebarjs Gulp updated

- Optimisation of Handlbar gulp task behaviour

## 1.4.2 - Angular Elements - Browser optimisation

- Polyfill and browser behaviour optimisation

## 1.4.1 - Angular Element - Bugfix

- Update on polyfill handling in various browsers


## 1.4.0 - Angular Generator added

-  New Framework added: Angular Elements
-  Other updates
    - Update Handlebar dependencies
    - Version dependencies update for Addons generator
    - Small fixes for Angular Elements generator
    - Update Handlebar dependencies
    - Version dependencies update for Addons generator
    - Fix Kebab Case naming convention
    - Fixed bug with project name in Angular Elements generator (#107)
    - Update Maintainer email address
    - Added guide for Angular Elements
    - Update package-lock.json
    - Update pnpsays.js

## 1.3.1 - Version 1.3.1 - Minor bugfix in VueJS generator

- Bug fixed described in issue #98

## 1.3.0 - Integration of Office CLI for Version Check and Test Bench update

- Integration of Office CLI 365 for automated version check
- Implementation of new the test engine
- New Core Test Definition, Test Runner and Test Bench implemented
- Bugfix: Improvement file handling in gulp file
- Bugfix: #95 - Cannot find @microsoft/generator-sharepoint

## 1.2 - VueJS added

- New generator for [VueJs](https://vuejs.org) - thanks to [Alex Terentiev](https://github.com/AJIXuMuK)
- Structural generator change: All components are stored in the folder `components`.
- Bugfix for folder creation during project creation [#84](https://github.com/pnp/generator-spfx/issues/84)
- Updates on utility class

## 1.1 - Reusable controls added

- Integration of [Reusable React Controls for SharePoint Solutions](https://sharepoint.github.io/sp-dev-fx-controls-react/)
- Integration of [Reusable Property Pane Controls for SharePoint Solutions](https://sharepoint.github.io/sp-dev-fx-property-controls/)

## 1.0 - Initial release

- First generator release
- Yeoman generator for [Handlebars](http://handlebarsjs.com)
