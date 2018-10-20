"use strict";

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');

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

        this.spawnCommandSync('ng new angular --style=scss --skip-git');
        this.spawnCommandSync('ng add', ['@angular/elements'], {cwd: this.destinationPath('./angular')});
        this.spawnCommandSync(`ng generate component ${manifest.componentClassName} -v Native --entry-component`, [], {cwd: this.destinationPath('./angular')});

        const ejsInject = {
            componentClassName: manifest.componentClassName,
            componentClassNameKebabCase: _.kebabCase(manifest.componentClassName)
        }

        util._writeTemplateFile(this, this.templatePath('./angular/elements-build.js'), this.destinationPath('./angular/elements-build.js'), ejsInject);
        util._writeTemplateFile(this, this.templatePath('./angular/index.html'), this.destinationPath('./angular/src/index.html'), ejsInject);
        util._writeTemplateFile(this, this.templatePath('./angular/app.module.ts'), this.destinationPath('./angular/src/app/app.module.ts'), ejsInject);

        const pkg = JSON.parse(fs.readFileSync(this.destinationPath('./angular/package.json')));
        pkg.scripts['bundle'] = 'ng build --prod --output-hashing none && node elements-build.js';
        pkg.dependencies['concat'] = '^1.0.3';
        pkg.dependencies['@webcomponents/custom-elements'] = '^1.2.0';
        pkg.dependencies['@webcomponents/webcomponentsjs'] = '^2.1.2';
        fs.writeFileSync(this.destinationPath('./angular/package.json'), JSON.stringify(pkg, null, 2));

        this.spawnCommandSync('npm install', [], {cwd: this.destinationPath('./angular')});

        fs.appendFileSync(this.destinationPath('./angular/src/polyfills.ts'), `import '@webcomponents/custom-elements/src/native-shim';\r\n`);
        fs.appendFileSync(this.destinationPath('./angular/src/polyfills.ts'), `import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce';\r\n`);

        fs.unlinkSync(this.destinationPath('./angular/src/app/app.component.html'));
        fs.unlinkSync(this.destinationPath('./angular/src/app/app.component.ts'));
        fs.unlinkSync(this.destinationPath('./angular/src/app/app.component.scss'));
        fs.unlinkSync(this.destinationPath('./angular/src/app/app.component.spec.ts'));
        fs.unlinkSync(manifest.componentMainFile.replace('.ts', '.module.scss'));

        // Update add templates
        util.deployTemplates(this);
        // finally run install
        util.runInstall(this);
    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

}
