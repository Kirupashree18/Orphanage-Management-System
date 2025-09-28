import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { DonorComponent } from './donor/donor.component';
import { AdopterComponent } from './adopter/adopter.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DonateMoneyComponent } from './donate-money/donate-money.component';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { DonateFoodComponent } from './donate-food/donate-food.component';
import { DonateItemComponent } from './donate-item/donate-item.component';
import { CreateOrphanComponent } from './create-orphan/create-orphan.component';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import { DebitCardPaymentComponent } from './debit-card-payment/debit-card-payment.component';
import { UpiPaymentComponent } from './upi-payment/upi-payment.component';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { FamilyTypeComponent } from './family-type/family-type.component';
import { ApplyAdoptionComponent } from './apply-adoption/apply-adoption.component';
import { ViewInfoComponent } from './view-info/view-info.component';
import { RegisterAdopterComponent } from './register-adopter/register-adopter.component';
import { OrphanDetailsComponent } from './orphan-details/orphan-details.component';
import { UpdateOrphanComponent } from './update-orphan/update-orphan.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { ViewDonorComponent } from './view-donor/view-donor.component';
import { ItemDonationDetailsComponent } from './item-donation-details/item-donation-details.component';
import { FoodDonationDetailsComponent } from './food-donation-details/food-donation-details.component';
import { MoneyDonationDetailsComponent } from './money-donation-details/money-donation-details.component';
import { AdopterDetailsComponent } from './adopter-details/adopter-details.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
export const routes: Routes = [
  {
      path:'app',
      redirectTo:"app",
      pathMatch:'full'
  },
  {
       path:'login',
       redirectTo:"login",
       pathMatch:'full'
  },     
  {  path:'login', component: LoginComponent },
  {  path:'staff',component:StaffComponent },
  
  { path:'donate-money',component:DonateMoneyComponent},
  { path:'credit-card-payment',component:CreditCardPaymentComponent},
  { path:'debit-card-payment',component:DebitCardPaymentComponent},
  { path:'upi-payment',component:UpiPaymentComponent},
  { path:'bank-transfer',component:BankTransferComponent},
  { path:'donate-food',component:DonateFoodComponent},
  { path:'donate-item',component:DonateItemComponent},
  {  path:'adopter',component:AdopterComponent },
  { path:'create-orphan',component:CreateOrphanComponent},
  { path: 'register-donor',component:RegisterDonorComponent},
  {  path:'admin',component:AdminComponent },
  { path:'family-type',component:FamilyTypeComponent},
  {path: 'apply-adoption',component:ApplyAdoptionComponent},
  { path: 'view-info',component:ViewInfoComponent},
  { path: 'register-adopter',component:RegisterAdopterComponent  },
  { path:'child-details',component:ChildDetailsComponent},
  { path: 'orphan-details',component:OrphanDetailsComponent},
  { path:'update-orphan',component:UpdateOrphanComponent},
  { path: 'update-staff',component:UpdateStaffComponent},
  { path: 'create-staff',component:CreateStaffComponent},
  {path: 'staff-detail',component:StaffDetailsComponent},
  { path: 'adopter-details',component:AdopterDetailsComponent},
  { path: 'view-donor',component:ViewDonorComponent},
  { path: 'item-donation-details',component:ItemDonationDetailsComponent},
  { path: 'food-donation-details',component:FoodDonationDetailsComponent},
  { path: 'money-donation-details',component:MoneyDonationDetailsComponent},
  { path: 'admin-dashboard',component:AdminDashboardComponent},
  { path: 'donor',component:DonorComponent},
  { path: 'staff-dashboard',component:StaffDashboardComponent},
  { path: 'donor-dashboard',component:DonorDashboardComponent},
  {  path: '', redirectTo: 'app',pathMatch: 'full'}
    
];
