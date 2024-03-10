// import { Component, OnInit, Inject, ViewChild, Input, ElementRef } from '@angular/core';
// import { SharedService } from 'src/app/shared.service';
// import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { sys_userPopupAddComponent } from './popupAdd.component';
// import Swal from 'sweetalert2';
// import { PageEvent } from '@angular/material/paginator';
// import * as XLSX from 'xlsx';
// import { read, utils, writeFile } from 'xlsx';
// import { query } from '@angular/animations';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import * as FileSaver from 'file-saver';

// @Component({
//   selector: 'app-sys-user',
//   templateUrl: './sys-user.component.html',
//   styleUrls: ['./sys-user.component.css']
// })
// export class SysUserComponent implements OnInit {
//   selectValue: any;
//   listOptions: any = [];
//   status: any;
//   status_del: any;
//   search: any;
//   pageEvent: any = PageEvent;
//   datasource: any = null;
//   pageIndex: any;
//   pageSize: any;
//   length: any;
//   p: any = 1;
//   itemPerPage: any = 10;
//   total: any;
//   title = 'ERP_Platform';
//   fileName = 'NguoiDung.xlsx';
//   data: any;
//   public listData: any;
//   constructor(
//     private service: SharedService,
//     public dialog: MatDialog,
//     public http:HttpClient
//   ) { }

//   ngOnInit(): void {

//     this.search = "";
//     this.listOptions = [
//       {
//         id: 1,
//         name: "Sử dụng"
//       },
//       {
//         id: 2,
//         name: "Ngưng sử dụng"
//       },
//     ];
//     this.loadListData();
//   }
//   // setPageSizeOptions(setPageSizeOptionsInput: string) {
//   //   this.paginationComponent.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
//   // }

//   applyFilter(filterValue: string) {
//     this.listData.filter = filterValue.trim().toLowerCase();
//   }
//   exportexcel(): void {
//     /* pass here the table id */
//     let element = document.getElementById('excel-table');
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

//     /* generate workbook and add the worksheet */
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     /* save to file */
//     XLSX.writeFile(wb, this.fileName);

//   }


//   exportToExcel() {
//     var controller = 'sys_user';
//     const params = new HttpParams()
//       .set('search', this.search)
//       .set('status_del  ', this.status);
//     //var uri = '/sys_duyet_dien_dan.ctr/exportExcel';
//     this.service.xuatExcel(controller, { params, responseType: 'blob', observe: 'response' })
//       .subscribe((resp:any) => {
//         if (resp) {
//           var file = new Blob([resp], { type: 'application/vnd.ms-excel' });
//           FileSaver.saveAs(file, 'file-export.xlsx');
//         }
//       })
//   }


//   getExportExcel(): Promise<any> {
//     return new Promise((resolve, reject) => {
//         this.http.get(`https://localhost:7230/api/GetExportExcel`
//         ,{responseType: 'blob'}
//         )
//             .subscribe((response: any) => {
//                 resolve(response);
//                 if (response) {
//                     var file = new Blob([response], { type: 'application/vnd.ms-excel' });
//                     FileSaver.saveAs(file, 'file-export.xlsx');
//                 }

//             }, reject);
//     }).catch(error => console.log('Error786: %O', error));

//   }

//   loadListData() {
//     var val = {
//       search: this.search,
//       status_del: this.status ?? 1,
//       controller: 'sys_user',
//     }
//     this.service.getAll(val).subscribe(data => {
//       this.listData = data as any;
//       // for(var i = 0;i<this.listData.length;i++){
//       //   if(this.listData[i].update_by == this.listData[i].id){
//       //     this.listData[i].ten_nguoi_cap_nhat = this.listData[i].fullname;
//       //   }
//       // }
//       this.total = data.length;
//     })
//   }

//   openDialogAdd(): void {
//     const dialogRef = this.dialog.open(sys_userPopupAddComponent, {
//       width: '768px',
//       height: '90%',
//       data: {
//         id: 0,
//         actionEnum: 1
//       },
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       this.loadListData();
//       // this.animal = result;
//     });
//   }

//   openDialogView(model: any): void {

//     const dialogRef = this.dialog.open(sys_userPopupAddComponent, {
//       width: '768px',
//       height: '90%',
//       data: {
//         model: model,
//         actionEnum: 3,
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       this.loadListData();
//       // this.animal = result;
//     });
//   }

//   openDialogEdit(model: any): void {

//     const dialogRef = this.dialog.open(sys_userPopupAddComponent, {
//       width: '768px',
//       height: '90%',
//       data: {
//         model: model,
//         actionEnum: 2,
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       this.loadListData();
//       // this.animal = result;
//     });
//   }

//   delete(model: any) {
//     var val = {
//       status_del: 2,
//       id: model.id,
//       controller: 'sys_user'
//     };
//     this.service.deleteUser(val).subscribe(res => {
//       Swal.fire({
//         title: 'Ngưng sử dụng thành công',
//         icon: 'success',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Đóng'
//       });
//       this.loadListData();
//     });
//   }
//   convert(model: any) {
//     var val = {
//       status_del: 1,
//       id: model.id,
//       update_by: model.id,
//       controller: 'sys_user'
//     };
//     this.service.convertUser(val).subscribe(res => {
//       Swal.fire({
//         title: 'Sử dụng lại thành công',
//         icon: 'success',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Đóng'
//       });
//       this.loadListData();
//     });
//   }
//   arrayBuffer: any;
//   public file: any;
//   incomingfile(event: any) {
//     this.file = event.target.files[0];
//   }

//   Upload() {
//     let fileReader = new FileReader();
//     fileReader.onload = (e) => {
//       this.arrayBuffer = fileReader.result;
//       var data = new Uint8Array(this.arrayBuffer);
//       var arr = new Array();
//       for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//       var bstr = arr.join("");
//       var workbook = XLSX.read(bstr, { type: "binary" });
//       var first_sheet_name = workbook.SheetNames[0];
//       var worksheet = workbook.Sheets[first_sheet_name];
//       var data_excel = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//       this.saveDataEcel(data_excel);
//       console.log("data_excel", data_excel);
//     }
//     fileReader.readAsArrayBuffer(this.file);
//   }
//   public list_user: any;
//   saveDataEcel(data_excel: any) {
//     this.list_user = {
//       data: data_excel,
//       controller: 'sys_user'
//     }
//     // this.list_user.push(data_excel);
//     this.service.saveExcel(this.list_user).subscribe(res => {
//       Swal.fire({
//         title: 'Thêm mới thành công',
//         icon: 'success',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Đóng'
//       })
//     });
//   }
// }




import { Component, Inject, ViewChild } from '@angular/core';



import { HttpClient, HttpResponse } from '@angular/common/http';


import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
//import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { BaseIndexDatatableComponent } from 'src/app/Basecomponent/BaseIndexDatatable.component';
import { SharedService } from 'src/app/shared.service';
import { sys_userPopupAddComponent } from './popupAdd.component';
import { collection,collectionData,Firestore,addDoc } from '@angular/fire/firestore';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.css']
})
export class SysUserComponent extends BaseIndexDatatableComponent
{
  public list_status_del: any;
  //tasks$ = collectionData(collection(this.firestore,'user'))
  constructor(http: HttpClient, dialog: MatDialog
    , _translocoService: TranslocoService,
    service: SharedService,
     route: ActivatedRoute,
     private firestore:Firestore
    ,// @Inject('BASE_URL') baseUrl: string
    ) {
    super(http, _translocoService,service, route, dialog, 'sys_user',
      { search: "", status_del: "1" }
    )
    this.listOptions = [
      {
        id: 1,
        name: "Sử dụng"
      },
      {
        id: 2,
        name: "Ngưng sử dụng"
      },
    ];
    //console.log("tasks$",this.tasks$)
  }

  ngOnInit(): void {
    this.baseInitData();
  }


  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_userPopupAddComponent, {
      width: '768px',
      height :'90%',
      data: {
        id: 0,
        actionEnum: 1
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadListData();
      // this.animal = result;
    });
  }

  getExportExcel(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.get(`https://localhost:7230/api/GetExportExcel`
        ,{responseType: 'blob'}
        )
            .subscribe((response: any) => {
                resolve(response);
                if (response) {
                    var file = new Blob([response], { type: 'application/vnd.ms-excel' });
                    FileSaver.saveAs(file, 'file-export.xlsx');
                }

            }, reject);
    }).catch(error => console.log('Error786: %O', error));

  }

  openDialogView(model: any): void {

    const dialogRef = this.dialog.open(sys_userPopupAddComponent, {
      width: '768px',
      height :'90%',
      data: {
        model: model,
        actionEnum: 3,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadListData();
      // this.animal = result;
    });
  }

  openDialogEdit(model: any): void {

    const dialogRef = this.dialog.open(sys_userPopupAddComponent, {
      width: '768px',
      height :'90%',
      data: {
        model: model,
        actionEnum: 2,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadListData();
      // this.animal = result;
    });
  }
}


