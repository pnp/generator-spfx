import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from '<%= componentStrings %>';

/** Include Angular Elements JS and Style */
import '<%= angularSolutionNameKebabCase %>/dist/<%= angularSolutionName %>/main';
import '<%= angularSolutionNameKebabCase %>/dist/<%= angularSolutionName %>/polyfills';
require('<%= angularSolutionNameKebabCase %>/dist/<%= angularSolutionName %>/styles.css');

export interface I<%= componentClassName %>Props {
  description: string;
}

export default class <%= componentClassName %> extends BaseClientSideWebPart<I<%= componentClassName %>Props> {

  public render(): void {
    this.domElement.innerHTML = `<app-<%= componentClassNameKebabCase %> description="${ this.properties.description }"></app-<%= componentClassNameKebabCase %>>`;
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
