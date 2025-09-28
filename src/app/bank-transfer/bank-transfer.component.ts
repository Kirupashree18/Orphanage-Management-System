import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css']
})
export class BankTransferComponent {
  showSuccessMessage: boolean = false;

  onSubmit() {

    const accountNumber = (document.getElementById('account-number') as HTMLInputElement).value;
    const ifscCode = (document.getElementById('ifsc-code') as HTMLInputElement).value;
    const amount = (document.getElementById('amount') as HTMLInputElement).value;


    this.showSuccessMessage = true;

  
    (document.getElementById('bankTransferForm') as HTMLFormElement).reset();
  }
}
