import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './<%= componentClassName %>.module.scss';
import * as strings from '<%= componentStrings %>';

//import * as Bluebird from 'bluebird'; // IE11 ?
import {bootstrap} from 'aurelia-bootstrapper';
import { Aurelia,TemplatingEngine } from 'aurelia-framework';
import { PLATFORM } from "aurelia-pal";

export interface I<%= componentClassName %>Props {
  description: string;
}

export default class <%= componentClassName %> extends BaseClientSideWebPart<I<%= componentClassName %>Props> {

  // Do we need this for IE11
  // constructor() {
  //   super();
  //   Bluebird.config({ warnings: { wForgottenReturn: false } });
  // }

  public render(): void {
    this.domElement.innerHTML = `<div id="${this.instanceId}" class="${this.instanceId}"  >
    <<%= componentNameKebabCase %> class="${styles.<%= componentNameCamelCase %>}">Loading...</<%= componentNameKebabCase %>></div>`;

    bootstrap(async (aurelia:Aurelia) =>  {
          aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
              [ // Register components or use a <require from=""></require> in your view
                PLATFORM.moduleName('webparts/<%= componentNameCamelCase %>/components/<%= componentName %>')
                // If you want to use Office UI with Aurelia go to https://au-office-ui.azurewebsites.net/
                // PLATFORM.moduleName('@dunite/au-office-ui/resources/elements/BasicInputs/DuDefaultButton')
                
            ]);

          var el = document.getElementById(this.instanceId);
          await aurelia.start();
          // We are registering the WebPartContext so it can be injected into your component
          aurelia.container.registerInstance("WebPartContext", this.context);

          let templatingEngine = aurelia.container.get(TemplatingEngine);

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
