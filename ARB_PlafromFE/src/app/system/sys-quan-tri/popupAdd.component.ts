import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

 import { listQuyen } from 'src/data/data';

import { HttpClient, HttpEventType } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
//import { FuseNavigationService } from '@fuse/components/navigation';
import { ActivatedRoute } from '@angular/router';
//import { DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse} from 'ngx-image-compress';
//import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { BasePopUpAddComponent } from 'src/app/Basecomponent/BasePoppupAdd.component';
import { SharedService } from 'src/app/shared.service';
import { ThemePalette } from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'sys_quan_triPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css']
})
export class sys_quan_triPopupAddComponent extends BasePopUpAddComponent {
  public listGender: any = [];
  public gender: any;
  public regexEmail: any =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public regexPhone: any = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  public regexPassword:any = /^.{8,16}$/;
  public listData:any;
  task: Task = {
    name: 'Tất cả',
    completed: false,
    color: 'primary',
  };
  allComplete: boolean = false;
  allQuyen: boolean = false;
  public listQuyen:any = [];
  
  constructor(public dialogRef: MatDialogRef<sys_quan_triPopupAddComponent>,
    http: HttpClient, _translocoService: TranslocoService,
    service: SharedService,
    private services: SharedService,
    //priv//_fuseNavigationService: FuseNavigationService,
    route: ActivatedRoute,
    //@Inject('BASE_URL') baseUrl: string,
    public override dialogModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    super(_translocoService, service,route, "", http, 'sys_quan_tri', dialogRef, dialogModal)
    this.record = data;
    this.actionEnum = data.actionEnum;
    if (this.actionEnum == 1) {
      this.baseInitData();
    }
    else if(this.actionEnum != 1){
      this.record = data.model;
    }
    this.getListUse();
    this.loadQuyen();
  }

  getListUse() {
    var val = {
      controller: 'sys_user',
    }
    this.services.getListUse(val).subscribe(data => {
      this.listData = data as any;
      if(this.record.actionEnum != 1){
        for(var i = 0;i<this.record.id_user.length;i++){
          var item = this.record.id_user[i];
          for(var j = 0;j<this.listData.length;j++){
            var item2 = this.listData[j];
            if(item == item2.id){
              item2.completed = true;
            }
          }
        }
      }
    })
  }

  updateAllComplete() {
    this.allComplete = this.listData != null && this.listData.every((t:any) => t.completed);
    this.record.id_user = this.listData.filter((q:any)=>q.completed == true).map((q:any)=>q.id);
    // this.record.id_user = id_user.join();
  }

  someComplete(): boolean {
    if (this.listData == null) {
      return false;
    }
    return this.listData.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listData == null) {
      return;
    }
    this.listData.forEach((t:any) => (t.completed = completed));
    this.record.id_user = this.listData.filter((q:any)=>q.completed == true).map((q:any)=>q.id);;
    // this.record.id_user = id_user.join();
  }


  updateAllQuyen() {
    this.allQuyen = this.listQuyen != null && this.listQuyen.every((t:any) => t.completed);
    this.record.id_quyen = this.listQuyen.filter((q:any)=>q.completed == true).map((q:any)=>q.id);
    
    // this.record.id_quyen = id_quyen.join();
  }

  someQuyen(): boolean {
    if (this.listQuyen == null) {
      return false;
    }
    return this.listQuyen.filter((t:any) => t.completed).length > 0 && !this.allQuyen;
  }

  setAllQuyen(completed: boolean) {
    this.allQuyen = completed;
    if (this.listQuyen == null) {
      return;
    }
    this.listQuyen.forEach((t:any) => (t.completed = completed));
    this.record.id_quyen = this.listQuyen.filter((q:any)=>q.completed == true).map((q:any)=>q.id);
    // this.record.id_quyen = id_quyen.join();
  }
  loadQuyen() {
    this.listQuyen = listQuyen;
    if(this.actionEnum != 1){
      for(var i = 0;i<this.record.id_quyen.length;i++){
        var item = this.record.id_quyen[i];
        for(var j = 0;j<this.listQuyen.length;j++){
          var item2 = this.listQuyen[j];
          if(item == item2.id){
            item2.completed = true;
          }
        }
      }
    }
  }

  create_new(){
    this.record.id_quyen = this.record.id_quyen.join();
    this.record.id_user = this.record.id_user.join();
    this.save();
  }
  edit_new(){
    this.record.id_quyen = this.record.id_quyen.join();
    this.record.id_user = this.record.id_user.join();
    this.save();
  }
}