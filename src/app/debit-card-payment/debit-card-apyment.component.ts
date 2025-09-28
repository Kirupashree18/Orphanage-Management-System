import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';


interface DonationData {
  donorName: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
  paymentMethod: string;
  donationDate: Date;
}

@Component({
  selector: 'app-debit-card-payment',
  templateUrl: './debit-card-payment.component.html',
  styleUrls: ['./debit-card-payment.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DebitCardPaymentComponent implements OnInit {
  donationData: DonationData | null = null;
  cardNumber: string = '';
  cardHolder: string = '';
  expiryDate: string = '';
  cvv: string = '';
  isProcessing: boolean = false;
  showSuccessMessage: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
  
    const navigation = this.router.getCurrentNavigation();
    this.donationData = navigation?.extras.state ? navigation.extras.state['donationData'] as DonationData : null;

    if (!this.donationData) {
      this.donationData = history.state['donationData'] as DonationData;
      if (!this.donationData) {
        this.errorMessage = 'No donation data found. Please start over.';
        this.router.navigate(['/donate-money']);
      }
    }

  
    if (this.donationData && !this.donationData.paymentMethod) {
      this.donationData.paymentMethod = 'debit';
    }
  }

  generateReceipt() {
    if (!this.donationData) {
      console.error('Donation data is missing, cannot generate receipt');
      return;
    }

   
    const receiptContent = `
      Donation Receipt
      ----------------
      Donor Information:
      Name: ${this.donationData.donorName}
      Email: ${this.donationData.email}
      Phone: ${this.donationData.phone}
      Address: ${this.donationData.address}
      
      Donation Details:
      Amount: ${this.donationData.amount}
      Payment Method: ${this.donationData.paymentMethod}
      Donation Date: ${new Date(this.donationData.donationDate).toLocaleString()}
      ----------------
      Thank you for your generous donation!
    `;
    const fileNameBase = `Donation_Receipt_${this.donationData.donorName}_${new Date().toISOString().split('T')[0]}`;

  
    try {
      const textBlob = new Blob([receiptContent], { type: 'text/plain' });
      const textUrl = window.URL.createObjectURL(textBlob);
      const textLink = document.createElement('a');
      textLink.href = textUrl;
      textLink.download = `${fileNameBase}.txt`;
      document.body.appendChild(textLink);
      textLink.click();
      document.body.removeChild(textLink);
      window.URL.revokeObjectURL(textUrl);
      console.log('Text receipt generated successfully');
    } catch (error) {
      console.error('Error generating text receipt:', error);
    }

  
    try {
      console.log('Attempting to generate PDF receipt...');
      const doc = new jsPDF();
      doc.setFontSize(12);

  
      doc.text('Donation Receipt', 10, 10);
      doc.text('----------------', 10, 15);

      doc.text('Donor Information:', 10, 25);
      doc.text(`Name: ${this.donationData.donorName}`, 10, 35);
      doc.text(`Email: ${this.donationData.email}`, 10, 45);
      doc.text(`Phone: ${this.donationData.phone}`, 10, 55);
      doc.text(`Address: ${this.donationData.address}`, 10, 65);

      doc.text('Donation Details:', 10, 85);
      doc.text(`Amount: ${this.donationData.amount}`, 10, 95);
      doc.text(`Payment Method: ${this.donationData.paymentMethod}`, 10, 105);
      doc.text(`Donation Date: ${new Date(this.donationData.donationDate).toLocaleString()}`, 10, 115);

      doc.text('----------------', 10, 125);
      doc.text('Thank you for your generous donation!', 10, 135);

      // Trigger PDF download
      doc.save(`${fileNameBase}.pdf`);
      console.log('PDF receipt generated successfully');
    } catch (error) {
      console.error('Error generating PDF receipt:', error);
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.isProcessing = true;
      this.errorMessage = '';

    
      setTimeout(() => {
       
        if (this.donationData) {
          this.donationData.paymentMethod = 'debit';
          // Save donation data to database
          this.http.post<any>('http://localhost:3000/donate/money', this.donationData).subscribe({
            next: (response) => {
              if (response.success) {
                this.showSuccessMessage = true;
                this.isProcessing = false;

               
                this.generateReceipt();

                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 3000);
              } else {
                this.errorMessage = response.message || 'Failed to save donation';
                this.isProcessing = false;
              }
            },
            error: (err) => {
              console.error('Error saving donation:', err);
              this.errorMessage = 'Failed to connect to the server. Please try again.';
              this.isProcessing = false;
            }
          });
        } else {
          this.errorMessage = 'Donation data is missing.';
          this.isProcessing = false;
        }
      }, 2000); 
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
      this.isProcessing = false;
    }
  }
}
