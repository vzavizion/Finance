import { Component, Input } from '@angular/core';

import { OnInit } from '@angular/core';

import { Region } from '../classes/region.class';

import { HelperService } from '../services/helper.service';

@Component({
    selector: 'app-details-regions',
    templateUrl: '../html/details-regions.component.html',
    styleUrls: ['../css/details-regions.component.css']
})

export class DetailsRegions implements OnInit {

    @Input() public regions: Array<Region>;

    totalRegions: number;

    private editedRowIndex: number;
    private editedColumnIndex: number;
    private editedRowItem: Region;

    constructor(
        private helperService: HelperService) {
    };

    ngOnInit(): void {

        if (this.regions) {
            this.totalRegions = this.regions.length;
        }
        else {
            this.totalRegions = 0;
        }
    }

    ////////////Grid
    public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
        if (!isEdited || this.editedRowIndex != rowIndex) {
            this.closeEditor(sender);

            this.editedRowIndex = rowIndex;
            this.editedColumnIndex = columnIndex;

            this.editedRowItem = Object.assign({}, dataItem);

            sender.editRow(rowIndex);
        }
    }

    public cellCloseHandler(args: any) {
        alert('Closed');
    }

    public addHandler({ sender }) {

        this.closeEditor(sender);

        let region = new Region();
        this.regions.push(region);

        this.editedRowIndex = this.regions.length - 1;
        this.editedColumnIndex = 0;
        this.editedRowItem = region;

        sender.editRow(this.regions.length - 1);
    }

    public removeHandler({ sender, dataItem }) {

        this.closeEditor(sender);

        var index = this.regions.indexOf(dataItem);
        if (index != -1) {
            this.regions.splice(index, 1);
        }
    }

    public saveChanges(grid: any): void {

        this.closeEditor(grid);
    }

    public cancelChanges(grid: any): void {

        this.closeEditor(grid);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
    }

    //Drag and Drop    
    public drag(event, rowIndex) {
        this.helperService.drag(event, rowIndex);
    }

    public drop(event, rowIndex) {
        this.helperService.drop(event, rowIndex, this.regions);
    }

    public dragover(event, rowIndex) {
        this.helperService.dragover(event, rowIndex);
    }
}
