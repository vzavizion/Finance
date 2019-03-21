import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { By } from '@angular/platform-browser';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';

import { Observable } from "rxjs/Observable";

import { HttpService } from '../services/http.service';
import { HelperService } from '../services/helper.service';

import { Search } from '../components/search.component';
import { Details } from '../components/details.component';
import { List } from '../components/list.component';
import { Groups } from '../components/groups.component';
import { SearchBox } from '../components/search-box.component';
import { DetailsInfo } from '../components/details-info.component';
import { DetailsList } from '../components/details-list.component';
import { GroupsList } from '../components/groups-list.component';
import { DetailsRegions } from '../components/details-regions.component';
import { DetailsSeasons } from '../components/details-seasons.component';
import { DetailsPlaces } from '../components/details-places.component';

import { Country } from '../classes/country.class'

// Kendo controls
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

describe('DetailsInfoComponent', () => {

    let httpServiceStub = {
        getCountryByName: function () {

            return Observable.of(
                { "status": "Success", "statuscode": "200", "message": "OK", "result": [{ "_id": "5b495d8a6873b27f4097e99f", "name": "Bolivia", "__v": 0, "continent": "South America", "regions": [{ "seasons": [{ "_id": "5b5046546e8bd5541874acd2", "seasonFrom": { "_id": "5b5046546e8bd5541874acd3", "month": { "_id": "5b5046546e8bd5541874acd4", "name": "September", "sequenceNumber": 8 } }, "seasonTo": { "_id": "5b5046546e8bd5541874acd5", "month": { "_id": "5b5046546e8bd5541874acd6", "name": "November", "sequenceNumber": 10 } }, "description": "best time to visit everything" }, { "_id": "5b5046546e8bd5541874accd", "seasonFrom": { "_id": "5b5046546e8bd5541874acce", "month": { "_id": "5b5046546e8bd5541874accf", "name": "March", "sequenceNumber": 2 } }, "seasonTo": { "_id": "5b5046546e8bd5541874acd0", "month": { "_id": "5b5046546e8bd5541874acd1", "name": "April", "sequenceNumber": 3 } }, "description": "mirror effect only, not able to reach many destinations due to the flooding" }], "regions": [], "_id": "5b5046546e8bd5541874accc", "places": [{ "name": "test1\n\ttest2\n\ttest3\n\ttest4" }], "isNestedRegions": false, "name": "Salar de Uyuni", "priority": { "name": "!!!", "sequenceNumber": 0 } }, { "seasons": [{ "_id": "5b5047676e8bd5541874ae55", "seasonFrom": { "_id": "5b5047676e8bd5541874ae56", "month": { "_id": "5b5047676e8bd5541874ae57", "name": "July", "sequenceNumber": 6 } }, "seasonTo": { "_id": "5b5047676e8bd5541874ae58", "month": { "_id": "5b5047676e8bd5541874ae59", "name": "September", "sequenceNumber": 8 } } }], "regions": [], "_id": "5b5047676e8bd5541874ae54", "places": [{ "name": "Rurrenabaque" }, { "name": "Madidi National Park" }, { "name": "Santa Cruz" }], "isNestedRegions": false, "name": "Amazon", "priority": { "name": "!", "sequenceNumber": 1 } }], "isVisited": false, "priority": { "_id": "5b4ff2936e8bd5541874a6da", "name": "Prority 0 - Must Visit Right Now", "sequenceNumber": 0, "description": "!!! First choice (have to go here right now!!!)" }, "seasons": [{ "_id": "5b4ff2936e8bd5541874a6e0", "seasonFrom": { "_id": "5b4ff2936e8bd5541874a6e1", "month": { "_id": "5b4ff2936e8bd5541874a6e2", "name": "September", "sequenceNumber": 8 } }, "seasonTo": { "_id": "5b4ff2936e8bd5541874a6e3", "month": { "_id": "5b4ff2936e8bd5541874a6e4", "name": "November", "sequenceNumber": 10 } } }, { "_id": "5b4ff2936e8bd5541874a6db", "seasonFrom": { "_id": "5b4ff2936e8bd5541874a6dc", "month": { "_id": "5b4ff2936e8bd5541874a6dd", "name": "April", "sequenceNumber": 3 }, "range": "late" }, "seasonTo": { "_id": "5b4ff2936e8bd5541874a6de", "month": { "_id": "5b4ff2936e8bd5541874a6df", "name": "June", "sequenceNumber": 5 }, "range": "early" } }, , { "_id": "5b4ff7196e8bd5541874ac77", "seasonFrom": { "_id": "5b4ff7196e8bd5541874ac78", "month": { "_id": "5b4ff7196e8bd5541874ac79", "name": "June", "sequenceNumber": 5 }, "range": "late" }, "seasonTo": { "_id": "5b4ff7196e8bd5541874ac7a", "month": { "_id": "5b4ff7196e8bd5541874ac7b", "name": "August", "sequenceNumber": 7 } }, "description": "cold fronts from Patagonia", "isNoVisit": true }] }] });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            ],
            providers: [
                HelperService,
                { provide: HttpService, useValue: httpServiceStub },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {


    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(DetailsInfo);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));



    //   it(`should have srcSysId as 'testSrcSysIdStub'`, async(() => {
    //     const fixture = TestBed.createComponent(CamComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     app.searchDuplicateContacts();
    //     fixture.detectChanges();
    //     expect(app.contact.srcSysId).toEqual('testSrcSysIdStub');
    //   }));

    //   it("should render 'testSrcSysIdStub' in a div result tag", async(() => {
    //     const fixture = TestBed.createComponent(CamComponent);

    //     const app = fixture.debugElement.componentInstance;
    //     app.searchDuplicateContacts();    

    //     fixture.detectChanges();    
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector("div[class~='result']").textContent).toContain('testSrcSysIdStub');
    //   }));

    //   it("after click should render 'testSrcSysIdStub' in a div result tag", async(() => {
    //     const fixture = TestBed.createComponent(CamComponent);

    //     const button = fixture.debugElement.query(By.css("[id='srcSysIdButton']"));
    //     button.triggerEventHandler('click', null);

    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector("div[class~='result']").textContent).toContain('testSrcSysIdStub');
    //   }));

});





// describe('HelperService tests', () => {
//     let helperService: HelperService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({ providers: [HelperService] });
//     });

//     it('should use HelperService', () => {
//         service = TestBed.get(HelperService);
//         expect(service.getValue()).toBe('real value');
//     });

    //   it('#getValue should return real value from the real service', () => {
    //     masterService = new MasterService(new ValueService());
    //     expect(masterService.getValue()).toBe('real value');
    //   });

    //   it('#getValue should return faked value from a fakeService', () => {
    //     masterService = new MasterService(new FakeValueService());
    //     expect(masterService.getValue()).toBe('faked service value');
    //   });

    //   it('#getValue should return faked value from a fake object', () => {
    //     const fake =  { getValue: () => 'fake value' };
    //     masterService = new MasterService(fake as ValueService);
    //     expect(masterService.getValue()).toBe('fake value');
    //   });

    //   it('#getValue should return stubbed value from a spy', () => {
    //     // create `getValue` spy on an object representing the ValueService
    //     const valueServiceSpy =
    //       jasmine.createSpyObj('ValueService', ['getValue']);

    //     // set the value to return when the `getValue` spy is called.
    //     const stubValue = 'stub value';
    //     valueServiceSpy.getValue.and.returnValue(stubValue);

    //     masterService = new MasterService(valueServiceSpy);

    //     expect(masterService.getValue())
    //       .toBe(stubValue, 'service returned stub value');
    //     expect(valueServiceSpy.getValue.calls.count())
    //       .toBe(1, 'spy method was called once');
    //     expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
    //       .toBe(stubValue);
    //   });
// });