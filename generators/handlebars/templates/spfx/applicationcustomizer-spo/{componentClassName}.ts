import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from '<%= componentStrings %>Strings';

import * as Handlebars from 'handlebars';

const LOG_SOURCE: string = '<%= componentClassName %>';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface I<%= componentClassName %>Properties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class <%= componentClassName %>
  extends BaseApplicationCustomizer<I<%= componentClassName %>Properties> {

  @override
  public onInit(): Promise<void> {
    
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let <%= componentClassName %>Template =  <HandlebarsTemplateDelegate>require('./hbsComponent/<%= componentClassName %>Template.hbs');

    let message: string = this.properties.testMessage;

    if (!message) {
      message = '(No properties were provided.)';
    }

    let content = {
      title: strings.Title,
      message: message
    };

    Dialog.alert(<%= componentClassName %>Template(content));

    return Promise.resolve();
  }
}
