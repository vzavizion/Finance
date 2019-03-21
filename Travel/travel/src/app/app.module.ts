import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Search } from './components/search.component';
import { Details } from './components/details.component';
import { List } from './components/list.component';
import { Groups } from './components/groups.component';
import { SearchBox } from './components/search-box.component';
import { DetailsInfo } from './components/details-info.component';
import { DetailsList } from './components/details-list.component';
import { GroupsList } from './components/groups-list.component';
import { DetailsRegions } from './components/details-regions.component';
import { DetailsSeasons } from './components/details-seasons.component';
import { DetailsPlaces } from './components/details-places.component';


//import { NotFoundComponent } from './components/not-found.component';
//import { UnauthorizedComponent } from './components/unauthorized.component';

//import { DataService } from './services/data.service';
//import { StorageService } from './services/storage.service';
//import { DialogHelperService } from './services/dialog-helper.service';
import { HelperService } from './services/helper.service';
import { HttpService } from './services/http.service';


// Kendo controls
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

//import { PanelBarModule } from '@progress/kendo-angular-layout';

//import { OneCrmServicesInterceptor } from './http-interceptor/one-crm-services-interceptor';
//import { HttpInterceptorProviders } from './http-interceptor/interceptors';


@NgModule({
  declarations: [
    AppComponent,
    Search,
    Details,
    Groups,
    List,
    SearchBox,
    DetailsInfo,
    GroupsList,
    DetailsList,
    DetailsRegions,
    DetailsSeasons,
    DetailsPlaces
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    DropDownsModule,
    InputsModule,
    ButtonsModule,
    DialogsModule,
    GridModule
    //PanelBarModule
  ],
  providers: [
    //DataService,
    //StorageService,
    //DialogHelperService,
    HelperService,
    HttpService
    //HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
