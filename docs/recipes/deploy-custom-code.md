# Update provisioned artifacts for web parts, extensions and customizer with generator

It is possible to inject code such as references directly web parts and extensions. Right now this is only supported for SharePoint Online projects and not for on-premises focused.

The tools folder provide you templates to inject code directly in the web part, application customizer, command set, field customizer.

```bash
tools/spfx
├── applicationcustomizer-spo
│   └── {componentClassName}.ts
├── commandset-spo
│   └── {componentClassName}.ts
├── fieldcustomizer-spo
│   ├── {componentClassName}.module.scss
│   └── {componentClassName}.ts
└── webparts-spo
    ├── {componentClassName}.module.scss
    └── {componentClassName}.ts
```

These files will be maintained and updated with every new mayor release of the SharePoint Framework main generator.

## Copy these template files to your generator

Copy the files located in the template folder to your custom generator in the template path. The overall setup of the generator should match the following pattern.

```bash
generators/your-generator/
├── index.js
└── templates
    ├── addonConfig.json
    ├── config
    │   └── copy-static-assets.json
    ├── gulpfile.js
    └── spfx
        ├── applicationcustomizer-spo
        │   └── {componentClassName}.ts
        ├── fieldcustomizer-spo
        │   ├── {componentClassName}.module.scss
        │   └── {componentClassName}.ts
        ├── listviewcommandset-spo
        │   └── {componentClassName}.ts
        └── webpart-spo
            ├── {componentClassName}.module.scss
            └── {componentClassName}.ts
```

Now modify the files to match your requirements. In case of the HandlebarsJS generator the following line of code were added at the import statements of for example an web part.


```js
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './<%= componentClassName %>.module.scss';
import * as strings from '<%= componentStrings %>';

import * as Handlebars from 'handlebars';

export interface I<%= componentClassName %>Props {
  description: string;
}

export default class <%= componentClassName %> extends BaseClientSideWebPart<I<%= componentClassName %>Props> {
...

```

The only line of code in this example that were added is the following line:

```js
import * as Handlebars from 'handlebars';
```

This make sure that after the provisioning of a web part coding can start immediatly.

## Deploy custom code in generator

The files located in the SPFx folder serve as templats for all customisable assets. The names are not allowed to be changed because otherwise the whole deployment breaks. To make sure the template gets deployed a small utility need to called directly in the installation method of the Yeoman generator.

Make sure you reference the utility class in your Yeoman generator code.

```js
// importing utilities
const util = require('../../lib/util.js');
```

In the install method call the following utility method.

```js
install() {
    // # BUG currently only appears just in test
    util.deployTemplates(this);
}
```

This utility will detect which component got added during the regular SPFx runtime and adds the code directly to the file.

