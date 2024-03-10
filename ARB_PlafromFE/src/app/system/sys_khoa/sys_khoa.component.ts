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
import { sys_khoaPopupAddComponent } from './popupAdd.component';
import { collection,collectionData,Firestore,addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app_sys_khoa',
  templateUrl: './sys_khoa.component.html',
  styleUrls: ['./sys_khoa.component.css']
})

export class sys_khoaComponent extends BaseIndexDatatableComponent
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
    super(http, _translocoService,service, route, dialog, 'sys_khoa',
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
    const dialogRef = this.dialog.open(sys_khoaPopupAddComponent, {
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

    const dialogRef = this.dialog.open(sys_khoaPopupAddComponent, {
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

    const dialogRef = this.dialog.open(sys_khoaPopupAddComponent, {
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


