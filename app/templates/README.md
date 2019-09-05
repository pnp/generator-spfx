# <%= libraryName %>

<%= techStack %>

> This is where you include your project's documentation.

## Building the code

Download & install all dependencies, build, bundle & package the project

```shell
# download & install dependencies
npm install

# transpile all TypeScript & SCSS => JavaScript & CSS
gulp build

# create component bundle & manifest
gulp bundle

# create SharePoint package
gulp package-solution
```

These commands produces the following:

- **./lib**: intermediate-stage commonjs build artifacts
- **./dist**: bundled script, along with other resources
- **./temp/deploy**: all resources required by component to be deployed to a CDN (when `--ship` argument present)

## Build options

- `gulp clean`: Deletes all build output (**/dist**, **/lib**, **/temp**, etc.).
- `gulp build`: Transpiles all TypeScript & SCSS to JavaScript & CSS, generates source map files & TypeScript type declaration files
- `gulp bundle [--ship|-p]`: Runs gulp task **build**, then uses webpack to create the JavaScript bundle(s) and component manifest(s) as defined in **./config/config.json**. The `--ship` or `-p` argument specifies a production build that will generate minified bundles.
- `gulp serve [--ship|-p]`: Runs gulp tasks **build**, **bundle** & starts the local web server. Depending on the project type, it opens the browser and navigates to the local workbench or specified URL (in the case of extension components). The `--ship` or `-p` argument specifies a production build that modifies the resulting pacakge for production hosting rather than local hosting of assets.
- `gulp package-solution`: Creates the SharePoint Package (**.sppkg**) file.
- `gulp dist`: Creates a production ready SharePoint Package (**.sppkg**) file. The following gulp task will executed in this specific order `gulp clean`, `gulp bundle`, `gulp package-solution`
- `gulp dist`: Creates a development ready SharePoint Package (**.sppkg**) file. The following gulp task will executed in this specific order `gulp clean`, `gulp bundle`, `gulp package-solution`

> View all available gulp tasks by running `gulp --tasks`

Generatored with [pnp/spfx](https://github.com/pnp/generator-spfx/).
