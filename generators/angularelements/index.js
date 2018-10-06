"use strict";

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const _ = require('lodash');

// importing utilities
const util = require('../../lib/util.js');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    // Initialisation geenerator
    initializing() {

    }

    // Prompt for user input for Custom Generator
    prompting() {

    }

    // adds additonal editor support in this case CSS Comb
    configuring() {

    }


    writing() {}

    install() {
        const manifest = util.getComponentManifest(this);

        if (!manifest) {
            return;
        }

        const angularSolutionName = this.options['solutionName'];
        const angularCliOptions = this.options['angularCliOptions'];
        const angularSolutionPath = this.destinationPath(`../${angularSolutionName}`);

        this.spawnCommandSync(`ng new ${angularSolutionName} ${angularCliOptions}`, [], {cwd: path.dirname(angularSolutionPath)});
        this.spawnCommandSync(`ng generate component ${manifest.componentClassName} -v Native --entry-component`, [], {cwd: angularSolutionPath});

        const pkg = JSON.parse(fs.readFileSync(path.join(angularSolutionPath, 'package.json')));
        pkg.scripts['bundle'] = 'ng build --prod --output-hashing none && node elements-build.js';
        pkg.dependencies['concat'] = '^1.0.3';
        pkg.dependencies['@webcomponents/custom-elements'] = '^1.2.0';
        pkg.dependencies['@webcomponents/webcomponentsjs'] = '^2.1.2';
        fs.writeFileSync(path.join(angularSolutionPath, 'package.json'), JSON.stringify(pkg, null, 2));

        const ejsInject = {
            angularSolutionName: angularSolutionName,
            componentClassName: manifest.componentClassName,
            componentClassNameKebabCase: _.kebabCase(manifest.componentClassName)
        };

        util.deployTemplatesToPath(this, ejsInject, this.templatePath('./angular'), angularSolutionPath);

        fs.appendFileSync(path.join(angularSolutionPath, 'src/polyfills.ts'), `import '@webcomponents/custom-elements/src/native-shim';\r\n`);
        fs.appendFileSync(path.join(angularSolutionPath, 'src/polyfills.ts'), `import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce';\r\n`);

        const files = glob.sync(path.join(angularSolutionPath, 'src/app/app.component.*'));
        for (let file of files) {
            fs.unlinkSync(file);
        }

        fs.unlinkSync(manifest.componentMainFile.replace('.ts', '.module.scss'));

        // Update add templates
        util.deployTemplates(this, ejsInject);
        // finally run install
        if (!this.options.SpfxOptions['testrun']) {
            this.spawnCommandSync('npm install', [], {cwd: angularSolutionPath});
            this.spawnCommandSync('ng add', ['@angular/elements'], {cwd: angularSolutionPath});
        }
        util.runInstall(this);
    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

}
