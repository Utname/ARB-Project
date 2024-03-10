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
import { sys_tien_tePopupAddComponent } from './popupAdd.component';
import { collection,collectionData,Firestore,addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app_sys_tien_te',
  templateUrl: './sys_tien_te.component.html',
  styleUrls: ['./sys_tien_te.component.css']
})

export class sys_tien_teComponent extends BaseIndexDatatableComponent
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
    super(http, _translocoService,service, route, dialog, 'sys_tien_te',
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
    const dialogRef = this.dialog.open(sys_tien_tePopupAddComponent, {
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

    const dialogRef = this.dialog.open(sys_tien_tePopupAddComponent, {
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



  addData(f:any){
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance,f.value).then(() => {
      console.log('Data saved Successfully');
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  openDialogEdit(model: any): void {

    const dialogRef = this.dialog.open(sys_tien_tePopupAddComponent, {
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


