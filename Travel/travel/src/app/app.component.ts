import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router, ActivatedRoute, ParamMap, NavigationError } from '@angular/router';

import { HelperService } from './services/helper.service';

import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'APP';

  isBlock: boolean = false;

  private soeId: string;

  constructor(
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    //private dataService: DataService,    
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef) {

    helperService.loadingMessage.subscribe(
    	isLoading => {
    		this.isBlock = isLoading;
    		this.cdr.detectChanges();
    	});          

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // this.router.events
    //   .filter(e => e instanceof NavigationError)
    //   .pairwise()
    //   .subscribe((e) => {
    //     alert('NavigationError');
    //     console.log('NavigationError');
    //     console.log(e);
    //     //if (e && e.length == 2) {
    //     //  this.helperService.changePreviousUrl((<NavigationEnd>e[0]).url);
    //     //}
    //   });
  };

  ngOnInit(): void {

  }
}
