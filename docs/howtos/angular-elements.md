# Angular Elements

## Prerequisites
Before you can create new Angular Elements project you need to have @pnp/generator-spfx and @angular/cli packages installed globally. If you use npm, you can install them using following command in command prompt:

`npm install -g @pnp/generator-spfx @angular/cli`

## Getting started

To create new Angular Elements project:

1. In your new project folder start SPFx PnP Generator using following command:

`yo @pnp/spfx`

2. Choose Angular Elements as framework in interactive prompt.
3. Provide options for generator e.g. you can provide your own parameters to Angular CLI `ng new` command that is used to create new Angular project.
4. Wait for creation of projects and installation of dependencies.

## Development

Angular Elements generator creates separate SPFx and Angular projects. This allows you to use Angular CLI in development. SPFx project folder is created with `-spfx` suffix. Output generated from Angular is bundled and imported in SPFx Web Part.

To build Angular project and bundle it in single file you should use `npm run bundle` command in Angular project folder.

To build SPFx project, you can just use default `gulp bundle --ship` and `gulp package-solution --ship` commands in SPFx project folder.

You can test your solution in SPFx Workbench using default `gulp serve` command in SPFx project folder or in Angular Dev Server using `npm run start` command in Angular project folder.