## Frequently asked questions

### Why can't I use TypeScript?
<<<<<<< HEAD

TypeScript requires compilation to JavaScript. The result is in more complexity and less support from the Yeoman community. 

To keep it plain and simple - only NodeJS will be used at the moment.

### What is the difference between NodeJS and JavaScript?

According to [Node.JS](https://nodejs.org/) it is a is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

It is created to run JavaScript outside of the browser to develop backend services, shell scripts, development tools and many things more.

NodeJS supports most of the features of the [ECMA Script / JavaScript](https://nodejs.org/en/docs/es6/) specification.

All browser run JavaScript too but do not support the latest features of the [ECMA Script Specification](https://en.wikipedia.org/wiki/ECMAScript#Conformance)

### Do I need to install @microsoft/generator-sharepoint?

No - The PnP SPFx generator has a dependency on a specific version of @microsoft/generator-sharepoint. This version will be automatically installed with the npm package of this generator.
=======
TypeScript requires compilation to JavaScript. This results in more complexity and less support from the Yeoman community. To keep it plain and simple, only NodeJS JavaScript will be used. Most concepts such as classes can be used in NodeJS anyway.

### Do I need to install @microsoft/generator-sharepoint?
No - The PnP SPFx generator has a dependency on a specific version of @microsoft/generator-sharepoint. This version will be automatically installed in the generator source.
>>>>>>> ea23628b30b9bbdc1393e2e8b425143abb27ab72

### Can I have different versions of @microsoft/generator-sharepoint installed?
Yes, you can, for example, have version 1.4.1 installed manually on your machine. When you run `yo @microsoft/sharepoint` this version will be used. However, when you run `yo @pnp/spfx` the version the community generator was built on will be used. For example, version 1.6 instead.
