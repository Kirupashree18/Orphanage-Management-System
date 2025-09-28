import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { DonorComponent } from './donor/donor.component';
import { DonateMoneyComponent } from './donate-money/donate-money.component';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import { DebitCardPaymentComponent } from './debit-card-payment/debit-card-payment.component';
import { UpiPaymentComponent } from './upi-payment/upi-payment.component';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { DonateFoodComponent } from './donate-food/donate-food.component';
import { DonateItemComponent } from './donate-item/donate-item.component';
import { AdopterComponent } from './adopter/adopter.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewDonorComponent } from './view-donor/view-donor.component';
import { CreateOrphanComponent } from './create-orphan/create-orphan.component';
import { OrphanService } from './orphan.service';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { FamilyTypeComponent } from './family-type/family-type.component';
import { ApplyAdoptionComponent } from './apply-adoption/apply-adoption.component';
import { RegisterAdopterComponent } from './register-adopter/register-adopter.component';
import { ViewInfoComponent } from './view-info/view-info.component';
import { OrphanDetailsComponent } from './orphan-details/orphan-details.component';
import { UpdateOrphanComponent } from './update-orphan/update-orphan.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { AdopterDetailsComponent } from './adopter-details/adopter-details.component';
import { ItemDonationDetailsComponent } from './item-donation-details/item-donation-details.component';
import { FoodDonationDetailsComponent } from './food-donation-details/food-donation-details.component';
import { MoneyDonationDetailsComponent } from './money-donation-details/money-donation-details.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff-dashboard',component: StaffDashboardComponent},
  { path: 'donor',component: DonorComponent},
  { path: 'register-donor',component:RegisterDonorComponent},
  { path: 'donate-money', component: DonateMoneyComponent },
  { path: 'credit-card-payment', component: CreditCardPaymentComponent },
  { path: 'debit-card-payment', component: DebitCardPaymentComponent },
  { path: 'bank-transfer', component: BankTransferComponent },
  { path: 'upi-payment', component: UpiPaymentComponent },
  { path: 'donate-food', component: DonateFoodComponent },
  { path: 'create-orphan', component: CreateOrphanComponent },
  { path: 'donate-item', component: DonateItemComponent },
  { path: 'adopter', component: AdopterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-dashboard',component: AdminDashboardComponent},
  { path: 'child-details',component:ChildDetailsComponent},
  { path: 'family-type',component:FamilyTypeComponent},
  { path: 'apply-adoption',component:ApplyAdoptionComponent},
  { path: 'register-adopter',component:RegisterAdopterComponent},
  { path: 'update-orphan',component:UpdateOrphanComponent},
  { path: 'update-staff',component:UpdateStaffComponent},
  {path: 'view-info',component:ViewInfoComponent},
  { path: 'view-donor',component:ViewDonorComponent},
  { path: 'orphan-details',component:OrphanDetailsComponent},
  { path: 'create-orphan',component:CreateStaffComponent},
  {path: 'staff-detail',component:StaffDetailsComponent},
  { path: 'adopter-details',component:AdopterDetailsComponent},
  { path: 'item-donation-details',component:ItemDonationDetailsComponent},
  { path: 'food-donation-details',component:FoodDonationDetailsComponent},
  { path: 'money-donation-details',component:MoneyDonationDetailsComponent},
  { path: 'donor-dashboard',component:DonorDashboardComponent},
  // { path: '**', redirectTo: '/login' } // Optional wildcard route
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffComponent, 
    StaffDashboardComponent,
    DonorComponent,
    DonateMoneyComponent,
    ViewDonorComponent,
    CreditCardPaymentComponent,
    DebitCardPaymentComponent,
    UpiPaymentComponent,
    BankTransferComponent,
    DonateFoodComponent,
    DonateItemComponent,
    FamilyTypeComponent,
    CreateStaffComponent,
    ViewInfoComponent,
    AdopterComponent,
    AdminComponent,
    AdminDashboardComponent,
    CreateOrphanComponent,
    RegisterAdopterComponent,
    ApplyAdoptionComponent,
    OrphanDetailsComponent,
    UpdateOrphanComponent,
    StaffDetailsComponent,
    UpdateStaffComponent,
    ItemDonationDetailsComponent,
    FoodDonationDetailsComponent,
    MoneyDonationDetailsComponent,
    DonorDashboardComponent,
    AdopterDetailsComponent,
    ChildDetailsComponent  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule // Ensure this doesn’t duplicate routes
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [OrphanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
