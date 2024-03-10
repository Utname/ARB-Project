// import { Component, OnInit, Inject, ViewChild, Input, ElementRef } from '@angular/core';
// import { SharedService } from 'src/app/shared.service';
// import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { sys_quan_triPopupAddComponent } from './popupAdd.component';
// import Swal from 'sweetalert2';
// import { PageEvent } from '@angular/material/paginator';
// import * as XLSX from 'xlsx';
// import { read, utils, writeFile } from 'xlsx';
// import { query } from '@angular/animations';
// @Component({
//   selector: 'app_sys_quan_tri',
//   templateUrl: './sys_quan_tri.component.html',
//   styleUrls: ['./sys_quan_tri.component.css']
// })
// export class sys_quan_triComponent implements OnInit {
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
//   fileName = 'PhongBan.xlsx';
//   data: any;
//   public listData: any = [];
//   constructor(
//     private service: SharedService,
//     public dialog: MatDialog,
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
 
  

//   loadListData() {
//     var val = {
//       search: this.search,
//       status_del: this.status ?? 1,
//       controller: 'sys_quan_tri',
//     }
//     this.service.getAll(val).subscribe(data => {
//       this.listData = data as any;
//       for(var i = 0;i<this.listData.length;i++){
      
//         var item = this.listData[i];
//         item.id_user = item.id_user.split(",");
//         item.id_quyen = item.id_quyen.split(",");
//       }
//       this.total = data.length;
//     }) 
//   }

//   openDialogAdd(): void {
//     const dialogRef = this.dialog.open(sys_quan_triPopupAddComponent, {
//       width: '768px',
//       height:'90%',
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

//     const dialogRef = this.dialog.open(sys_quan_triPopupAddComponent, {
//       width: '768px',
//       height:'90%',
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

//     const dialogRef = this.dialog.open(sys_quan_triPopupAddComponent, {
//       width: '768px',
//       height:'90%',
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

//   Delete(model: any) {
//     var val = {
//       status_del: 2,
//       id: model.id,
//       controller: 'sys_quan_tri'
//     };
//     this.service.delete(val).subscribe(res => {
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
//       controller: 'sys_quan_tri'
//     };
//     this.service.convert(val).subscribe(res => {
//       Swal.fire({
//         title: 'Sử dụng lại thành công',
//         icon: 'success',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Đóng'
//       });
//       this.loadListData();
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
import { sys_quan_triPopupAddComponent } from './popupAdd.component';
import { collection,collectionData,Firestore,addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app_sys_quan_tri',
  templateUrl: './sys_quan_tri.component.html',
  styleUrls: ['./sys_quan_tri.component.css']
})
export class sys_quan_triComponent extends BaseIndexDatatableComponent
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
    super(http, _translocoService,service, route, dialog, 'sys_quan_tri',
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
    for(var i = 0;i<this.listData.length;i++){
      
      var item = this.listData[i];
      item.id_user = item.id_user.split(",");
      item.id_quyen = item.id_quyen.split(",");
    }
  }


  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_quan_triPopupAddComponent, {
      width: '768px',
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

  openDialogView(model: any): void {

    const dialogRef = this.dialog.open(sys_quan_triPopupAddComponent, {
      width: '768px',
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

    const dialogRef = this.dialog.open(sys_quan_triPopupAddComponent, {
      width: '768px',
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



