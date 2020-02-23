# Aurelia

## Getting started

All your knowledge about Aurelia development still applies here. To learn more, head over to the official site. [Aurelia.io](https://aurelia.io/)

To create new Aurelia project:

1. In your new project folder start SPFx PnP Generator using following command:

`yo @pnp/spfx`

2. Choose SharePoint Online or SharePoint 2019
3. Choose Aurelia as your framework.
3. Add libraries you need.
4. Select TypeScript version
5. Select vetting options
6. Select pipeline configuration
7. Enter the rest of the required information and wait for creation of projects and installation of dependencies.

## Development

The Aurelia generator adds code to the WebPart.ts file to bootstrap the Aurelia component. It also adds a components directory with the Aurelia-component. Read the comments in the .ts files to get more details.

In the components directory add Aurelia components as you would in any normal Aurelia project.
There is no magic with the components directory, it is just for structure and order.

The gulp file is updated to change how Webpack builds the project.

To build SPFx project, you can just use default `gulp bundle --ship` and `gulp package-solution --ship` commands in SPFx project folder.

You can test your solution in SPFx Workbench using default `gulp serve` command in SPFx project folder.

## The gulp file

The gulp file contains the Webpack configuration. Unless you have specific requirements you should not need to change it. If you want to make youe bundle mean and lean, check out the options for Aurelia Webpack plugin here:
https://github.com/aurelia/webpack-plugin/wiki
