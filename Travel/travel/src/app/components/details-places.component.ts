import { Component, Input } from '@angular/core';

import { OnInit } from '@angular/core';

import { HelperService } from '../services/helper.service';

import { Place } from '../classes/place.class';

@Component({
    selector: 'app-details-places',
    templateUrl: '../html/details-places.component.html',
    styleUrls: ['../css/details-places.component.css']
})

export class DetailsPlaces implements OnInit {

    @Input() public places: Array<Place>;

    private editedRowIndex: number;
    private editedColumnIndex: number;
    private editedRowItem: Place;

    constructor(
        private helperService: HelperService) {
    };

    ngOnInit(): void {
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

        let place = new Place();
        this.places.push(place);

        this.editedRowIndex = this.places.length - 1;
        this.editedColumnIndex = 0;
        this.editedRowItem = place;

        sender.editRow(this.places.length - 1);
    }

    public removeHandler({ sender, dataItem }) {

        this.closeEditor(sender);

        var index = this.places.indexOf(dataItem);
        if (index != -1) {
            this.places.splice(index, 1);
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
        this.helperService.drop(event, rowIndex, this.places);
    }

    public dragover(event, rowIndex) {
        this.helperService.dragover(event, rowIndex);
    }
}
