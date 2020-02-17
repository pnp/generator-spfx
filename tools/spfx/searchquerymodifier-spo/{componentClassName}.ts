import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseSearchQueryModifier, IQuery, SearchQueryScenario } from '@microsoft/sp-search-extensibility';

import * as strings from '<%= componentStrings %>';

/**
 * If your search query modifier uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface I<%= componentClassName %>Properties {
  // This is an example; replace with your own property
  testMessage: string;
}

const LOG_SOURCE: string = '<%= componentClassName %>';

export default class <%= componentClassName %> extends BaseSearchQueryModifier<I<%= componentClassName %>Properties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized <%= componentClassName %>');
    return Promise.resolve();
  }

  @override
  public modifySearchQuery(query: IQuery, scenario: SearchQueryScenario): Promise<IQuery> {
    Log.info(LOG_SOURCE, `Modifying query ${query.queryText} with ${strings.Title}`);
    return Promise.resolve(query);
  }
}
