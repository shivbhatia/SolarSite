import { Component, Input, ElementRef } from '@angular/core';
import $ from 'jquery';
import 'owl-carousel';

@Component({
  selector: 'owl-carousel',
  template: `<ng-content></ng-content>`
})
export class OwlCarousel {
  @Input() options: object;

  $owlElement: any;

  defaultOptions: object = {};

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    for (var key in this.options) {
      this.defaultOptions[key] = this.options[key];
    }
    this.$owlElement = $(this.el.nativeElement).owlCarousel(this.defaultOptions);
  }

  ngOnDestroy() {
    this.$owlElement.data('owlCarousel').destroy();
    this.$owlElement = null;
  }
}
