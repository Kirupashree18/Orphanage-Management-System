import { Component } from '@angular/core';

@Component({
  selector: 'app-upi-payment',
  templateUrl: './upi-payment.component.html',
  styleUrls: ['./upi-payment.component.css']
})
export class UpiPaymentComponent {
  showSuccessMessage: boolean = false;

  onSubmit() {
    // Get form values
    const upiId = (document.getElementById('upi-id') as HTMLInputElement).value;
    const amount = (document.getElementById('amount') as HTMLInputElement).value;

    // Here you would typically handle the payment processing logic
    // For example, sending the data to your server for processing

    // Show success message
    this.showSuccessMessage = true;

    // Optionally, you can clear the form after submission
    (document.getElementById('upiForm') as HTMLFormElement).reset();
  }
}
