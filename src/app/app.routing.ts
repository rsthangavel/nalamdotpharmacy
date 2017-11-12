import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { MatTabsModule, 
         MatCardModule, 
         MatExpansionModule, 
         MatFormFieldModule, 
         MatInputModule, 
         //MatListModule, 
         MatStepperModule, 
         MatButtonModule, 
         MatAutocompleteModule,
         MatButtonToggleModule,
         MatCheckboxModule,
         MatChipsModule,
         MatDatepickerModule,
         MatDialogModule,
       //  MatGridListModule,
        // MatMenuModule,
         MatNativeDateModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatProgressSpinnerModule,
         MatRadioModule,
         MatRippleModule,
         MatSelectModule,
         MatSidenavModule,
         MatSliderModule,
         MatSlideToggleModule,
         MatSnackBarModule,
       //  MatSortModule,
         MatTableModule,
         MatToolbarModule,
         MatTooltipModule,
          } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//pages
import { ProfilePage } from './page/profile/profile.page';
import { DashboardPage } from './page/dashboard/dashboard.page';
import { DeliveryPersonPage } from './page/delivery-person/delivery-person.page';

//component
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { OrdersReviewComponent } from './component/orders-review/orders-review.component';
import { OutForDeliveryComponent } from './component/out-for-delivery/out-for-delivery.component';
import { OrdersComponent } from './component/orders/orders.component';


//services
import { ScriptService } from './services/script.service';
import { DeliveryPersonService} from './services/deliveryperson.service';
import { OrderService } from './services/order.service';
//pipe
import { TimePipe } from './pipe/time.pipe';
import { DigitsToWordsPipe } from './pipe/digitsToWords.pipe'; 


//Routes
let appRoutes: Routes = [
    {path: '', component:DashboardPage },
    {path: 'orders', component:DashboardPage },
    {path: 'deliveryperson', component:DeliveryPersonPage},
    {path: 'patients', component: DeliveryPersonPage},
    {path: 'doctor', component: DeliveryPersonPage},
    {path: 'profile', component: ProfilePage}
]

@NgModule({
    declarations : [
        DashboardPage,
        DeliveryPersonPage,
        ProfilePage,
        HeaderComponent,
        SidebarComponent,
        OrdersComponent,
        OutForDeliveryComponent,
        OrdersReviewComponent,
        TimePipe,
        DigitsToWordsPipe
    ],
    imports : [
        HttpClientModule,
       // CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
      //  MatDialogModule,
        MatExpansionModule,
       // MatGridListModule,
        MatInputModule,
     //   MatListModule,
      //  MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
      //  MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule,
        CommonModule,
        HeaderComponent,
        SidebarComponent,    
    ],
    providers : [ScriptService, DeliveryPersonService,OrderService],
   // entryComponents : [DialogOverviewExampleDialog]
})
export class AppRoutingModule{}