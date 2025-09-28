import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donate-item',
  templateUrl: './donate-item.component.html',
  styleUrls: ['./donate-item.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule]
})
export class DonateItemComponent {
  donorName: string = '';
  address: string = '';
  itemName: string = '';
  quantity: number | null = null;
  category: string = '';
  donationDate: string = '';
  showSuccess: boolean = false;
  donationDetails: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initialization logic if needed
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    // Construct the donation details for display
    this.donationDetails = `${this.quantity} ${this.itemName} (${this.category})`;

    // Prepare data for backend
    const donationData = {
      donorName: this.donorName,
      address: this.address,
      itemName: this.itemName,
      quantity: this.quantity,
      category: this.category,
      donationDate: this.donationDate || new Date().toISOString().split('T')[0] // Use current date if not provided
    };

    // Send data to backend
    this.http.post('http://localhost:3000/donate/item', donationData).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.showSuccess = true; // Show the success message
          this.resetForm();
        } else {
          console.error('Error submitting donation:', response.message);
          alert('Failed to submit donation: ' + response.message);
        }
      },
      error: (error) => {
        console.error('HTTP error:', error);
        alert('An error occurred while submitting the donation. Please try again.');
      }
    });
  }

  resetForm() {
    this.donorName = '';
    this.address = '';
    this.itemName = '';
    this.quantity = null;
    this.category = '';
    this.donationDate = '';
  }
}
