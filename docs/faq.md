## Frequently asked questions

### Why can't I use TypeScript?
TypeScript requires compilation to JavaScript. The result is in more complexity and less support from the Yeoman community. To keep it plain and simple only NodeJS JavaScript will be used. Most concepts such as classes can be used in NodeJS anyway.

### Do I need to install @microsoft/generator-sharepoint?
No - The PnP SPFx generator has a dependency on a specific version on @microsoft/generator-sharepoint. This version will be automatically installed in the generator source.

### Can I have a different versions of @microsoft/generator-sharepoint installed?
Yes you can for example have version 1.4.1 installed manually on your machine. When you run `yo @microsoft/sharepoint` this version will be used. However in case you like to run `yo @pnp/spfx` the version the community generator was built on will be used. For example version 1.6 instead.