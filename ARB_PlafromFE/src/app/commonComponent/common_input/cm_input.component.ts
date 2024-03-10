import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { TranslocoService } from '@ngneat/transloco';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
    selector: 'cm_input',
    templateUrl: './cm_input.component.html',
    styleUrls: ['./cm_input.component.scss']
})
export class cm_inputComponent implements OnInit {


    @Input() maxlength: any;
    @Input() errorModel: any;
    @Input() enterAction: any = Function;
    @Input() keyError: any;
    @Input() type: any;
    @Input() attribute: any;
    @Input() label: any;
    @Input() labelAddString: any;
    @Input() suffixstring: any;
    @Input() placeholder: any;
    @Input() decimalPlaces: any = 2;
    @Input() model: any;
    @Input() actionEnum: any = 1;
    @Input() callbackChange: any = Function;
    @Input() callbackChangeWithParam: any = Function;
    @Input() callbackChangeWithParamPos: any = Function;
    @Input() rows: any = [];
    @Input() pos: any = 0;
    public id: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    myOptions: any;
    myOptions_int: any;
    public range = new FormGroup({
        start: new FormControl(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
        end: new FormControl(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString())
    });
    //public pos=0;
    public date: any;
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public minDate: any;
    public maxDate: any;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
       
      };

    public color: ThemePalette = 'accent';
    timemask = [/\d/, /\d/, ':', /\d/, /\d/];;
    public hide = true;
    constructor(
        private dataAdapter: DateAdapter<Date>,
        private _translocoService: TranslocoService
    ) {


        if (this.maxlength == '' || this.maxlength == null || this.maxlength == undefined) this.maxlength = 200;
        if (this.model == '' || this.model == null || this.model == undefined) this.model = "";
        if (this.label == 'so_phieu') this.model = this.model.trim();
        if (this.type == '' || this.type == null) this.type = 'text';
    }


    ngOnInit() {
        this.dataAdapter.setLocale('vi-VN');
        if (this.myOptions == '' || this.myOptions == null || this.myOptions == undefined) this.myOptions = {
            allowDecimalPadding: 'floats',
            minimumValue: '0',
            decimalPlaces: this.decimalPlaces
        }
        if ((this.placeholder == '' || this.placeholder == null || this.placeholder == undefined) && this.actionEnum != 3)
            //this.placeholder = "Bấm vào đây để nhập";
            this.placeholder = this._translocoService.translate("input_palcehoder");
        else
            if (this.type == 'number' || this.type == 'readonly_number') {
                if ((this.model == '' || this.model == null || this.model == undefined) && this.model != 0) this.model = null;
            }
            else {
                if ((this.model == '' || this.model == null || this.model == undefined) && this.model != 0) this.model = "";
            }
        if (this.maxlength == '' || this.maxlength == null || this.maxlength == undefined) {
            this.maxlength = 200;
            if (this.type == "number") {
                this.maxlength = 18;
            }
        }
        if (this.rows == '' || this.rows == null || this.rows == undefined) this.rows = 3;
        if (this.type == '' || this.type == null) this.type = 'text';


    }


    setChose(): void {

        if (this.callbackChange != undefined && this.callbackChange != null)
            this.callbackChange();
        if (this.callbackChangeWithParam != undefined && this.callbackChangeWithParam != null)
            this.callbackChangeWithParam(this.label, this.model);
        if (this.callbackChangeWithParamPos != undefined && this.callbackChangeWithParamPos != null)
            this.callbackChangeWithParamPos(this.pos);

    }
}