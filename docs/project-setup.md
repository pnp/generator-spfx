# PnP SPFx Generator - Development

Before you start the development of custom yeoman generators please make sure you read the [how to author Yeoman generators](http://yeoman.io/authoring/).

The following chapters explain the over setup and considerations.

## Project Setup
The following directory listing give you an overview of the main directories in the generator.

```sh
├── app             <-- Main Generator
├── docs            <-- Documentation
├── generators      <-- custom generators
│   ├── addons      <-- Addon Generator reserved for client libraries only
│   ├── handlebars. <-- PnP Handlebars generator
│   ├── lib.        <-- General purpose libraries
├── test            <-- Mocha Unit Test
├── template        <-- Template yeoman generator
```

## Get started to write a new generator