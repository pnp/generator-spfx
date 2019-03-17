## Frequently asked questions


### Why can't I use TypeScript?
All project created with this generator use regular TypeScript like all SPFx projects. The code for the generator is not written in TypeScript.
TypeScript requires compilation to JavaScript. This results would be more complexity and less support from the Yeoman community. 

To keep it plain and simple - only Node.js is be used for this generator.

### What is the difference between NodeJS and JavaScript?

[Node.js](https://nodejs.org/) is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

It is used to develop backend services, shell scripts, development tools, and many more things.

Node.js supports most of the features of the [ECMA Script / JavaScript](https://nodejs.org/en/docs/es6/) specification.

All browsers run JavaScript, but do not always support the latest features of the [ECMA Script Specification](https://en.wikipedia.org/wiki/ECMAScript#Conformance)

### Do I need to install @microsoft/generator-sharepoint?

No - The PnP SPFx generator has a dependency on a specific version of @microsoft/generator-sharepoint. This version will be automatically installed with the npm package of this generator.

### Can I have different versions of @microsoft/generator-sharepoint installed?
Yes, you can, for example, have version 1.4.1 installed manually on your machine. When you run `yo @microsoft/sharepoint` this version will be used. However, when you run `yo @pnp/spfx` the version the community generator was built on will be used. For example, version 1.7 instead.
