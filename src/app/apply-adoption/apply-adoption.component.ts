import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

interface AdoptionApplication {
  fullName: string;
  age: number;
  email: string;
  phone: string;
  income: number;
  occupation: string;
  maritalStatus: string;
  familyType: string;
  householdMembers: number;
  address: string;
  preferredAge: string;
  preferredGender: string;
}

@Component({
  selector: 'app-apply-adoption',
  templateUrl: './apply-adoption.component.html',
  styleUrls: ['./apply-adoption.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ApplyAdoptionComponent implements AfterViewInit {
  @ViewChild('fullName') fullNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('age') ageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('phone') phoneInput!: ElementRef<HTMLInputElement>;
  @ViewChild('income') incomeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('occupation') occupationInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maritalStatus') maritalStatusSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('familyType') familyTypeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('householdMembers') householdMembersInput!: ElementRef<HTMLInputElement>;
  @ViewChild('address') addressTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('preferredAge') preferredAgeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('preferredGender') preferredGenderSelect!: ElementRef<HTMLSelectElement>;

  isSubmitting: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  errors: { [key: string]: string } = {};

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Ensure ViewChild elements are accessible
    console.log('ViewChild elements initialized:', {
      fullName: this.fullNameInput?.nativeElement,
      age: this.ageInput?.nativeElement,
      email: this.emailInput?.nativeElement,
      phone: this.phoneInput?.nativeElement,
      income: this.incomeInput?.nativeElement,
      occupation: this.occupationInput?.nativeElement,
      maritalStatus: this.maritalStatusSelect?.nativeElement,
      familyType: this.familyTypeSelect?.nativeElement,
      householdMembers: this.householdMembersInput?.nativeElement,
      address: this.addressTextarea?.nativeElement,
      preferredAge: this.preferredAgeSelect?.nativeElement,
      preferredGender: this.preferredGenderSelect?.nativeElement,
    });
  }

  submitApplication(): void {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.errors = {};

    // Manually trigger change detection to update ViewChild references
    this.cdr.detectChanges();

    // Log raw input values for debugging
    console.log('Raw input values:', {
      fullName: this.fullNameInput?.nativeElement?.value,
      age: this.ageInput?.nativeElement?.value,
      email: this.emailInput?.nativeElement?.value,
      phone: this.phoneInput?.nativeElement?.value,
      income: this.incomeInput?.nativeElement?.value,
      occupation: this.occupationInput?.nativeElement?.value,
      maritalStatus: this.maritalStatusSelect?.nativeElement?.value,
      familyType: this.familyTypeSelect?.nativeElement?.value,
      householdMembers: this.householdMembersInput?.nativeElement?.value,
      address: this.addressTextarea?.nativeElement?.value,
      preferredAge: this.preferredAgeSelect?.nativeElement?.value,
      preferredGender: this.preferredGenderSelect?.nativeElement?.value,
    });

    // Retrieve input values with fallback to handle undefined
    const fullName = this.fullNameInput?.nativeElement?.value?.trim() || '';
    const age = parseInt(this.ageInput?.nativeElement?.value || '0', 10);
    const email = this.emailInput?.nativeElement?.value?.trim() || '';
    const phone = this.phoneInput?.nativeElement?.value?.trim() || '';
    const income = parseInt(this.incomeInput?.nativeElement?.value || '0', 10);
    const occupation = this.occupationInput?.nativeElement?.value?.trim() || '';
    const maritalStatus = this.maritalStatusSelect?.nativeElement?.value || '';
    const familyType = this.familyTypeSelect?.nativeElement?.value || '';
    const householdMembers = parseInt(this.householdMembersInput?.nativeElement?.value || '0', 10);
    const address = this.addressTextarea?.nativeElement?.value?.trim() || '';
    const preferredAge = this.preferredAgeSelect?.nativeElement?.value || '';
    const preferredGender = this.preferredGenderSelect?.nativeElement?.value || '';

    // Validate inputs
    let isValid = true;

    if (!fullName) {
      this.errors['fullName'] = 'Full name is required';
      isValid = false;
    }
    if (isNaN(age) || age < 18) {
      this.errors['age'] = 'Age must be 18 or older';
      isValid = false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      this.errors['email'] = 'Valid email is required';
      isValid = false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      this.errors['phone'] = 'Valid 10-digit phone number is required';
      isValid = false;
    }
    if (isNaN(income) || income < 0) {
      this.errors['income'] = 'Valid income is required';
      isValid = false;
    }
    if (!occupation) {
      this.errors['occupation'] = 'Occupation is required';
      isValid = false;
    }
    if (!maritalStatus || maritalStatus === '') {
      this.errors['maritalStatus'] = 'Marital status is required';
      isValid = false;
    }
    if (!familyType || familyType === '') {
      this.errors['familyType'] = 'Family type is required';
      isValid = false;
    }
    if (isNaN(householdMembers) || householdMembers < 1) {
      this.errors['householdMembers'] = 'Household members must be at least 1';
      isValid = false;
    }
    if (!address) {
      this.errors['address'] = 'Address is required';
      isValid = false;
    }
    if (!preferredAge || preferredAge === '') {
      this.errors['preferredAge'] = 'Preferred age is required';
      isValid = false;
    }
    if (!preferredGender || preferredGender === '') {
      this.errors['preferredGender'] = 'Preferred gender is required';
      isValid = false;
    }

    if (!isValid) {
      this.isSubmitting = false;
      console.log('Validation errors:', this.errors);
      return;
    }

    // Prepare application data
    const application: AdoptionApplication = {
      fullName,
      age,
      email,
      phone,
      income,
      occupation,
      maritalStatus,
      familyType,
      householdMembers,
      address,
      preferredAge,
      preferredGender,
    };

    console.log('Sending application:', application);

    // Submit to backend
    this.http
      .post<any>('http://localhost:3000/adoption-application', application)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.successMessage = 'Application submitted successfully!';
            this.resetForm();
          } else {
            this.errorMessage = response.message || 'Failed to submit application.';
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.errorMessage = `Error ${err.status}: ${err.error?.message || 'Invalid request. Please check your inputs.'}`;
          console.error('❌ Submission error:', err);
          console.error('Server response:', err.error);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/adopter']);
  }

  private resetForm(): void {
    if (this.fullNameInput?.nativeElement) this.fullNameInput.nativeElement.value = '';
    if (this.ageInput?.nativeElement) this.ageInput.nativeElement.value = '';
    if (this.emailInput?.nativeElement) this.emailInput.nativeElement.value = '';
    if (this.phoneInput?.nativeElement) this.phoneInput.nativeElement.value = '';
    if (this.incomeInput?.nativeElement) this.incomeInput.nativeElement.value = '';
    if (this.occupationInput?.nativeElement) this.occupationInput.nativeElement.value = '';
    if (this.maritalStatusSelect?.nativeElement) this.maritalStatusSelect.nativeElement.value = '';
    if (this.familyTypeSelect?.nativeElement) this.familyTypeSelect.nativeElement.value = '';
    if (this.householdMembersInput?.nativeElement) this.householdMembersInput.nativeElement.value = '';
    if (this.addressTextarea?.nativeElement) this.addressTextarea.nativeElement.value = '';
    if (this.preferredAgeSelect?.nativeElement) this.preferredAgeSelect.nativeElement.value = '';
    if (this.preferredGenderSelect?.nativeElement) this.preferredGenderSelect.nativeElement.value = '';
    this.errors = {};
  }
}
