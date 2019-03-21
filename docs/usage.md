# Standard gulp task

* build - Builds the client-side solution project.
* bundle - Bundles the client-side solution project entry point and all its dependencies into a single JavaScript file.
* serve - Serves the client-side solution project and assets from the local machine.
* clean - Cleans the client-side solution project's build artifacts from the previous build and from the build target directories (lib and dist).
* test - Runs unit tests, if available, for the client-side solution project.
* package-solution - Packages the client-side solution into a SharePoint package.
* deploy-azure-storage - Deploys client-side solution project assets to Azure Storage.

## Additional gulp tasks

* dist - combines clean, bundle and package-solution to package solution for production
* dev - combines clean, bundle and package-solution to package solution for development

## npm version

'[npm version](https://docs.npmjs.com/cli/version.html)' is a command that increase the version number in the package.json file. When npm version wass used this also updated the version in the following files:

'config/package-solution.json' gets set to the same version number followed by an additional '0'.

'teams/manifest.json' (if applicable) the version will be updated there too.

!!! note
    * package.json: 1.2.3
    * `config/package-solution.json` : 1.2.3.0
    * `teams/mainfest.json`: 1.2.3

Besides the current commit will [tagged](https://git-scm.com/book/en/v2/Git-Basics-Tagging) on the git repository.

![Target framework seletion](./assets/git-version-tags.png)

!!! info 
    Addtional information:

    * [npm-version](https://docs.npmjs.com/cli/version.html) - npm documentation
    * [git-tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) - git documentation
    * [Use `npm version` to upgrade the version of your SPFx solution](https://n8d.at/blog/use-npm-version-to-upgrade-version-of-your-spfx-solution/)
