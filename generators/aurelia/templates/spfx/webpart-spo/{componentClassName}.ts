import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';
import styles from './<%= componentClassName %>.module.scss';
import * as strings from '<%= componentStrings %>';

import {bootstrap} from 'aurelia-bootstrapper';
import { Aurelia,TemplatingEngine } from 'aurelia-framework';
import { PLATFORM } from "aurelia-pal";

export interface I<%= componentClassName %>Props {
  description: string;
}

export default class <%= componentClassName %> extends BaseClientSideWebPart<I<%= componentClassName %>Props> {

  public render(): void {
    // Elements within the <div> element will be enhanced as an Aurelia component
    // You can add as many components as you like here or put the components as
    // child components in the <%= componentNameKebabCase %>
    this.domElement.innerHTML = `<div id="${this.instanceId}" class="${this.instanceId}"  >
    <<%= componentNameKebabCase %> class="${styles.<%= componentNameCamelCase %>}">Loading...</<%= componentNameKebabCase %>></div>`;

    // Bootstrap Aurelia with standard configuration and development logging
    // https://aurelia.io/docs/fundamentals/app-configuration-and-startup#bootstrapping-aurelia

    bootstrap(async (aurelia:Aurelia) =>  {
          aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
              [
                // It is required to register the first component <%= componentNameKebabCase %> 
                // since it can not be referenced with <require>
                PLATFORM.moduleName('webparts/<%= componentNameCamelCase %>/components/<%= componentName %>')
                // If you add more components to the initial <div>-tag above,
                // you need to add the call to Platform.moduleName() here.
                
                // If you don't register the component as a globalResource you must use 
                // a <require from=""></require> in your view <template>-tag
                // https://aurelia.io/docs/fundamentals/cheat-sheet#templating-basics

                // If you want to use Office UI with Aurelia go to https://au-office-ui.azurewebsites.net/
                // PLATFORM.moduleName('@dunite/au-office-ui/resources/elements/BasicInputs/DuDefaultButton')
                
            ]);

          var el = document.getElementById(this.instanceId);
          await aurelia.start();

          // We are registering the WebPartContext so it can be injected into your component
          // If you need the this.context in your component, just @inject("WebPartContext") in your component
          aurelia.container.registerInstance("WebPartContext", this.context);

          let templatingEngine = aurelia.container.get(TemplatingEngine);

          // Let's enhance all Aurelia components within the div
          templatingEngine.enhance({
            container: aurelia.container,
            element: el,
            resources: aurelia.resources
          });
        }
      );
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
