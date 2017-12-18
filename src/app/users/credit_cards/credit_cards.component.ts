import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

import { Popup } from 'ng2-opd-popup';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ConfirmationService } from 'primeng/primeng';
declare var google: any;

@Component({
  selector: 'credit_cards',
  templateUrl: "./credit_cards.html",
})

export class CreditCardsComponent implements OnInit{

  model: any = {};
  result: any;
  pageLinks: any;
  recordsPerPage:number=10;
  rowsPerPageOptions: number[] = [];

  @ViewChild('editCreditCardForm') editCreditCardForm: Popup;

	constructor(
    private popup:Popup,
    private router: Router,
    private solarService: SolarService,
    private confirmationService: ConfirmationService,
    private toasterService: ToasterService)
  {}

	ngOnInit(){

    this.popup.options = {
      header: "Pay with new card",
    };
    $('#loader').show();
    this.solarService.getCreditCards().subscribe( result => {
      this.result = result.data;
      console.log(this.result.data);
      $('#loader').hide();
    });
  }

  edit(id) {
    this.editCreditCardForm.show(this.popup.options);
  }

  update(obj) {
    this.solarService.updateCreditCard(obj._attributes.uniqueNumberIdentifier, obj).subscribe( result => {
      this.result = result.data;
    })
  }

  delete(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this inspection?',
        accept: () => {
          $('#mydiv').show();

          this.solarService.removeCreditCard(id).subscribe( result => {
            this.result = result;
            if (result.success == true) {
              this.toasterService.pop('success', 'Successfully deleted', '');
              $('#mydiv').hide();
              this.ngOnInit();
            } else {
              $('#mydiv').hide();
              this.toasterService.pop('error', 'Error in deletion', '');
            }
          })
        }
    });
  }

}
