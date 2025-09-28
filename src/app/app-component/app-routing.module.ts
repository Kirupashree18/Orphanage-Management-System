// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { StaffComponent } from './staff/staff.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { DonorComponent } from './donor/donor.component'; 
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import { DebitCardPaymentComponent } from './debit-card-payment/debit-card-payment.component';
import { UpiPaymentComponent } from './upi-payment/upi-payment.component';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { AdopterComponent } from './adopter/adopter.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DonateMoneyComponent } from './donate-money/donate-money.component';
import { DonateItemComponent } from './donate-item/donate-item.component';
import { DonateFoodComponent } from './donate-food/donate-food.component';
import { staffComponent } from './staff/staff.module';
import { CreateOrphanComponent } from './create-orphan/create-orphan.component';
import { FamilyTypeComponent } from './family-type/family-type.component';
import { ApplyAdoptionComponent } from './apply-adoption/apply-adoption.component';
import { RegisterAdopterComponent } from './register-adopter/register-adopter.component';
import { ViewInfoComponent } from './view-info/view-info.component';
import { OrphanDetailsComponent } from './orphan-details/orphan-details.component';
import { UpdateOrphanComponent } from './update-orphan/update-orphan.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { AdopterDetailsComponent } from './adopter-details/adopter-details.component';
import { ViewDonorComponent } from './view-donor/view-donor.component';
import { ItemDonationDetailsComponent } from './item-donation-details/item-donation-details.component';
import { FoodDonationDetailsComponent } from './food-donation-details/food-donation-details.component';
import { MoneyDonationDetailsComponent } from './money-donation-details/money-donation-details.component';
const routes: Routes = [
  { path: '', component: AppComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'donor',component:DonorComponent},
  { path: 'adopter-login', component: AdopterComponent },
  { path: 'staff', component:staffComponent},
  { path: 'staff-dashboard',component: StaffDashboardComponent},
  { path: 'admin', component: AdminComponent }, 
  { path: 'admin-dashboard',component: AdminDashboardComponent},// Ensure this exists
  { path: 'donate-money', component: DonateMoneyComponent },
  { path: 'donate-money', redirectTo: 'donate-money',pathMatch: 'full' },
  { path: 'donate-item', component: DonateItemComponent },
  { path: 'register-donor',component: RegisterDonorComponent},
  { path: 'donate-food', component: DonateFoodComponent },
  { path: 'create-orphan',component:CreateOrphanComponent},
  { path: 'create-staff',component:CreateStaffComponent},
  { path: 'update-staff',component:UpdateStaffComponent},
   { path: 'credit-card-payment', component: CreditCardPaymentComponent },
   { path: 'debit-card-payment',component:DebitCardPaymentComponent},
   { path: 'upi-payment',component:UpiPaymentComponent},
   { path: 'bank-transfer',component:BankTransferComponent},
   { path: 'child-details',component: ChildDetailsComponent} ,
   { path: 'family-type',component: FamilyTypeComponent},
   {path: 'apply-adoption',component: ApplyAdoptionComponent},
   { path: 'register-adopter',component:RegisterAdopterComponent},
   { path: 'orphan-details',component:OrphanDetailsComponent},
   { path: 'update-orphan',component:UpdateOrphanComponent},
   {path: 'view-info',component:ViewInfoComponent},
   { path: 'staff-detail',component:StaffDetailsComponent},
   { path: 'view-donor',component:ViewDonorComponent},
   { path: 'item-donation-details',component:ItemDonationDetailsComponent},
   { path: 'food-donation-details',component:FoodDonationDetailsComponent},
   { path: 'money-donation-details',component:MoneyDonationDetailsComponent},
   { path: 'adopter-details',component:AdopterDetailsComponent},
   { path: 'donor-dashboard',component: DonorDashboardComponent},
    { path: '**', redirectTo: '' } // Wildcard redirects to AppComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
