# Upgrade Handlebar Projects > pnp/spfx 1.9.1

The pnp/spfx generator comes in version 1.20.0 with a new webpack HandlebarsJS loader. The following steps are required to upgrade older projects before 1.10.0.

## Upgrade **package.json**

The **package.json** before 1.10.0 has the following handlebars related content.

```json
...
  "dependencies": {
      ...
      "handlebars": "^4.1.2"
      ...
  },
  "devDependencies": {
      ...
      "handlebars-template-loader": "^1.0.0",
      "@types/handlebars": "^4.1.0",
      ...
  }
...
```

To upgrade the dependencies execute this npm command:

```bash
npm uninstall handlebars-template-loader @types/handlebars
```

Install the following dependencies.

```bash
npm install handlebars-loader --save-dev
```

## Upgrade **gulpfile.js**

In the **gulpfile.js** the configuration of the `handlebars-template-loader` is configured like this:


```javascript
/**
 * Custom Framework Specific gulp tasks
 */
// definition of Handlebars loader
const loaderConfig = {
  test: /\.hbs/,
  loader: 'handlebars-template-loader'
};
```

Update the configuration to:

```javascript
/**
 * Custom Framework Specific gulp tasks
 */
// definition of Handlebars loader
const loaderConfig = {
  test: /\.hbs/,
  loader: 'handlebars-loader' // <-- update to handlebars-loader
};
```

This new loader automatically supports partials and helpers automatically.

