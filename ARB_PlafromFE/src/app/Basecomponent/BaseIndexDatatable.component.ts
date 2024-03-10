import { HttpClient } from '@angular/common/http';


import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild, Inject, Directive, OnDestroy, QueryList, ViewChildren } from '@angular/core';
//import { DataTableDirective } from 'angular-datatables';
//import { Subject } from 'rxjs';
import Swal from 'sweetalert2';



import { ActivatedRoute } from '@angular/router';
//import { FuseNavigationService } from '@fuse/components/navigation';
import { TranslocoService } from '@ngneat/transloco';



//import { doc_tailieu_view_file_onlineComponent } from 'app/modules/system/sys_user/viewfileonline.component';
//import { clear } from 'console';
//import { DataTablesResponse } from './datatable';
//import { translateDataTable } from '../commonComponent/VietNameseDataTable';
import { SharedService } from '../shared.service';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';



@Directive()
export abstract class BaseIndexDatatableComponent implements OnDestroy {


    public action: any;
    public controller: String;
    public filter: any;
    public table: any;
    public pageLoading: Boolean = false;
    public dtOptions: any = {};
    public currentIndex: any;
    listData: any = [];
    //public baseurl: String;
     total: any;
    selectValue: any;
    public listOptions: any = [];
    public status: any;
    public status_del: any;
    public search: any;
    pageEvent: any = PageEvent;
    datasource: any = null;
    pageIndex: any;
    pageSize: any;
    length: any;
    p: any = 1;
    public itemPerPage: any = 10;

    constructor(public http: HttpClient,
        //_baseUrl: string,
        public _translocoService: TranslocoService,
        //public _fuseNavigationService: FuseNavigationService,
        private service: SharedService,
        public route: ActivatedRoute,
        public dialog: MatDialog, _controller: String, _filter: any) {
        this.controller = _controller;
       // this.baseurl = _baseUrl;
        this.filter = _filter;
        this.pageLoading = false;
    }
    ngOnDestroy(): void {
    }

 
    public close(id1: any): void {
        Swal.fire({
            title: this._translocoService.translate('areYouSure'),
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this._translocoService.translate('yes'),
            cancelButtonText: this._translocoService.translate('no')
        }).then((result) => {
            if (result.value) {
                this.http
                    .post(this.controller + '.ctr/close/',
                        {
                            id: id1,
                        }
                    ).subscribe(resp => {
                        //this.rerender();
                    });
            }
        })


    }

    loadListData() {
        this.filter.controller = this.controller;
        this.service.getAll(this.filter).subscribe(data => {
            this.listData = data as any;
            this.total = data.total;
        })
    }
    public baseInitData(): void {
        //this.pageLoading = true;
        this.loadListData();
    }


    public handleDataBefore(): void {



    }
    arrayBuffer: any;
    public file: any;
    incomingfile(event: any) {
        this.file = event.target.files[0];
    }

    Upload() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            var data_excel = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            this.saveDataEcel(data_excel);
            console.log("data_excel", data_excel);
        }
        fileReader.readAsArrayBuffer(this.file);
    }
    public list_excel: any;
    saveDataEcel(data_excel: any) {
        this.list_excel = {
            data: data_excel
        }
        // this.list_chuc_danh.push(data_excel);
        this.service.saveExcel(this.list_excel).subscribe(res => {
            Swal.fire({
                title: 'Thêm mới thành công',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Đóng'
            })
        });
    }

    applyFilter(filterValue: string) {
        this.listData.filter = filterValue.trim().toLowerCase();
    }
    exportexcel(): void {
        /* pass here the table id */
        let element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.controller + "." + "xlsx");
    }

    Delete(model: any) {
        Swal.fire({
            title: this._translocoService.translate('areYouSure'),
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this._translocoService.translate('yes'),
            cancelButtonText: this._translocoService.translate('no')
        }).then((result) => {
            if (result.value) {
                var val = {
                    status_del: 2,
                    id: model.id,
                    controller: this.controller
                  };
                  this.service.delete(val).subscribe(res => {
                    Swal.fire({
                      title: 'Ngưng sử dụng thành công',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Đóng'
                    });
                    this.loadListData();
                  });
            }
        })
       
      }
      convert(model: any) {
        Swal.fire({
            title: this._translocoService.translate('areYouSure'),
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this._translocoService.translate('yes'),
            cancelButtonText: this._translocoService.translate('no')
        }).then((result) => {
            if (result.value) {
                var val = {
                    status_del: 1,
                    id: model.id,
                    update_by: model.id,
                    controller:  this.controller
                  };
                  this.service.convert(val).subscribe(res => {
                    Swal.fire({
                      title: 'Sử dụng lại thành công',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Đóng'
                    });
                    this.loadListData();
                  });
            }
        })
        
      }
}