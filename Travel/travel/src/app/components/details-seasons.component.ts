import { Component, Input } from '@angular/core';

import { OnInit } from '@angular/core';

import { Season, SeasonInfo } from '../classes/season.class';
import { Month } from '../classes/month.class';

import { HelperService } from '../services/helper.service';

@Component({
    selector: 'app-details-seasons',
    templateUrl: '../html/details-seasons.component.html',
    styleUrls: ['../css/details-seasons.component.css']
})

export class DetailsSeasons implements OnInit {

    @Input() public seasons: Array<SeasonInfo>;
    @Input() public isShowDescription: boolean;
    @Input() public gridMaxHeight: number;
    @Input() public gridSeasonWidth: number;
    @Input() public gridDescriptionWidth: number;

    seasonsSource: Array<Month>;

    seasonsRangeSource: Array<string>;

    private editedRowIndex: number;
    private editedColumnIndex: number;
    private editedRowItem: SeasonInfo;

    constructor(
        private helperService: HelperService) {

        this.seasonsSource = this.helperService.getSeasons();

        this.seasonsRangeSource = helperService.getRange();

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

        let seasonInfo = new SeasonInfo();
        this.seasons.push(seasonInfo);

        this.editedRowIndex = this.seasons.length - 1;
        this.editedColumnIndex = 0;
        this.editedRowItem = seasonInfo;

        sender.editRow(this.seasons.length - 1);
    }

    public removeHandler({ sender, dataItem }) {

        this.closeEditor(sender);

        var index = this.seasons.indexOf(dataItem);
        if (index != -1) {
            this.seasons.splice(index, 1);
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

        this.helperService.drop(event, rowIndex, this.seasons);
    }

    public dragover(event, rowIndex) {
        this.helperService.dragover(event, rowIndex);
    }
}
