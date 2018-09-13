import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './<%= componentClassName %>.module.scss';
import * as strings from '<%= componentStrings %>Strings';

import * as Handlebars from 'handlebars';


export interface I<%= componentClassName %>Props {
  description: string;
}

export default class <%= componentClassName %> extends BaseClientSideWebPart<I<%= componentClassName %>Props> {

  public render(): void {

    // load and precompile template
    var <%= componentClassName %>Template =  <HandlebarsTemplateDelegate>require('./hbsComponent/<%= componentClassName %>.hbs');

    var data = {
      styles: styles,
      description: this.properties.description
    };

    this.domElement.innerHTML = <%= componentClassName %>Template(data);

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
