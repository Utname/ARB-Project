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
import { sys_loai_tin_tucPopupAddComponent } from './popupAdd.component';
import { collection,collectionData,Firestore,addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app_sys_loai_tin_tuc',
  templateUrl: './sys_loai_tin_tuc.component.html',
  styleUrls: ['./sys_loai_tin_tuc.component.css']
})
export class sys_loai_tin_tucComponent extends BaseIndexDatatableComponent
{
  public list_status_del: any;
  //tasks$ = collectionData(collection(this.firestore,'user'))
  constructor(http: HttpClient, dialog: MatDialog
    , _translocoService: TranslocoService,
    service: SharedService,
    public services:SharedService,
     route: ActivatedRoute,
     private firestore:Firestore
    ,// @Inject('BASE_URL') baseUrl: string
    ) {
    super(http, _translocoService,service, route, dialog, 'sys_loai_tin_tuc',
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
    this.getNhomTinTucOfList();
    //console.log("tasks$",this.tasks$)
  }

  ngOnInit(): void {
    this.baseInitData();
  }
  nhom_tin_tuc_OL:any;
  getNhomTinTucOfList() {
    var val = {
      controller: 'sys_loai_tin_tuc',
    }
    this.services.getOfList(val).subscribe(data => {
      this.nhom_tin_tuc_OL = data as any;
    })
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_loai_tin_tucPopupAddComponent, {
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

    const dialogRef = this.dialog.open(sys_loai_tin_tucPopupAddComponent, {
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

    const dialogRef = this.dialog.open(sys_loai_tin_tucPopupAddComponent, {
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

