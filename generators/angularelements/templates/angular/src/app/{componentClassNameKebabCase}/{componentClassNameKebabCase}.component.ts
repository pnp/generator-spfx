import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-<%= componentClassNameKebabCase %>',
  templateUrl: './<%= componentClassNameKebabCase %>.component.html',
  styleUrls: ['./<%= componentClassNameKebabCase %>.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class <%= componentClassName %>Component implements OnInit {
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
