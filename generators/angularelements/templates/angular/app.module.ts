import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { <%= componentClassName %>Component } from './<%= componentClassNameKebabCase %>/<%= componentClassNameKebabCase %>.component';

@NgModule({
  declarations: [
    <%= componentClassName %>Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [<%= componentClassName %>Component]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(<%= componentClassName %>Component, { injector: this.injector });
    customElements.define('<%= componentClassNameKebabCase %>', el);
  }
}
