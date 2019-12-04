# Continuous Integration

The generator is able to provide build definitions for continuous integration.

List of the pipeline technologies currently supported:
- Azure DevOps (integrated with KarmaJS for test coverage)

## Azure DevOps

The build definition included with your project configures the equivalent of the "Continuous Integration" of the [official documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/implement-ci-cd-with-azure-devops).
Once your yaml definition file is committed and pushed, you will see a "name of your repository - CI" build definition appear under the same team project.  

If you want to set up automated deployments of your solution, you can then follow the "Continuous Deployment" section of the [official documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/implement-ci-cd-with-azure-devops#continuous-deployment).  

Simply select the new build definition and update the paths to match the artifact name.

## Upgrading from the single stage to the multi-stage pipeline infrastructure

Multi-stage pipelines are a preview feature on Azure DevOps that allow you to describe other stages in addition to the build stage directly in your YAML pipeline definition.  
A good practice to ease maintenance and reusability of stages is to leverage templates instead of defining the stage right in the main pipeline file.

### Pre-reqs:

Make sure you enable the preview feature called _Multi-stage pipelines_

### Steps

1. Update the generator.
1. Scaffold a new project:
    - Select the multi-stage pipeline option on the CI question
1. Copy the following files to your existing repository:
    - `azure-pipelines.yml`
    - `azure-pipelines-deploy-template.yml`
    - `azure-pipelines-build-template.yml`
1. Create a _Variable group_ named `qa_configuration` containing the values described in the deploy template for the deployment stage.
1. Commit and push the changed files
1. Run the pipeline to update the configuration.

## Upgrading from the KarmaJS infrastructure

### Pre-reqs:

You have previously upgraded your project to SPFx 1.8.0, if this is not done already, checkout the dedicated [Office 365 CLI command](https://pnp.github.io/office365-cli/cmd/spfx/project/project-upgrade/
)

### Steps

1. Run the following commands in your shell.
    ```Shell
    npm un @types/chai-as-promised chai-as-promised karma-junit-reporter -D
    npm i jest-junit jest @voitanos/jest-preset-spfx-react16 -D
    rm ./config/karma.conf.js
    ```
1. in `package.json` add/update the following scripts.
    ```JSON
    "test": "./node_modules/.bin/jest --config ./config/jest.config.json",
    "test:watch": "./node_modules/.bin/jest --config ./config/jest.config.json --watchAll"
    ```
1. Add a `config/jest.config.json` file with the following content.
    ```JSON
    {
      "preset": "@voitanos/jest-preset-spfx-react16",
      "rootDir": "../src",
      "coverageReporters": [
        "text",
        "json",
        "lcov",
        "text-summary",
        "cobertura"
      ],
      "reporters": [
       "default",
       ["jest-junit", {
        "suiteName": "jest tests",
        "outputDirectory": "temp/test/junit",
        "outputName": "junit.xml"
        }]
      ]
    }
    ```
1. In `gulpfile.js` remove the following lines
     ```JS
     var buildConfig = build.getConfig();
     var karmaTaskCandidates = buildConfig.uniqueTasks.filter((t) => t.name === 'karma');
     if(karmaTaskCandidates && karmaTaskCandidates.length > 0) {
      var karmaTask = karmaTaskCandidates[0];
      karmaTask.taskConfig.configPath = './config/karma.config.js';
     }
     ```
1. Rename your `.test.ts` files in `.spec.ts` and migrate the code like the [following example](https://github.com/SharePoint/sp-dev-build-extensions/samples/azure-devops-ci-cd-spfx/src/webparts/devOps/tests/DevOpsWebPart.spec.ts). 
1. Update your `azure-pipelines.yml` to match the [following sample](https://github.com/SharePoint/sp-dev-build-extensions/samples/azure-devops-ci-cd-spfx/azure-pipelines.yml).
