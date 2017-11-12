import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule} from './app.routing';

//import { DialogOverviewExampleDialog } from './component/orders-review/orders-review.component';


@NgModule({
  declarations: [
    AppComponent,
   // DialogOverviewExampleDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  //entryComponents : [DialogOverviewExampleDialog]
})
export class AppModule { }
