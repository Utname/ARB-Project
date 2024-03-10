import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';



import { HttpClient, HttpEventType } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
//import { FuseNavigationService } from '@fuse/components/navigation';
import { ActivatedRoute } from '@angular/router';
//import { DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse} from 'ngx-image-compress';
//import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { BasePopUpAddComponent } from 'src/app/Basecomponent/BasePoppupAdd.component';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'sys_loai_tin_tucPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css']
})
export class sys_loai_tin_tucPopupAddComponent extends BasePopUpAddComponent {

  constructor(public dialogRef: MatDialogRef<sys_loai_tin_tucPopupAddComponent>,
    http: HttpClient, _translocoService: TranslocoService,
    service: SharedService,
    public services: SharedService,
    
    //priv//_fuseNavigationService: FuseNavigationService,
    route: ActivatedRoute,
    //@Inject('BASE_URL') baseUrl: string,
    public override dialogModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    super(_translocoService, service,route, "", http, 'sys_loai_tin_tuc', dialogRef, dialogModal)
    this.record = data;
    this.actionEnum = data.actionEnum;
    if (this.actionEnum == 1) {
      this.baseInitData();
    }
    else if(this.actionEnum != 1){
      this.record = data.model;
    }
    this.getListNhomTinTuc();
  }
  list_nhom_tin_tuc:any;
  getListNhomTinTuc() {
    var val = {
      controller: 'sys_nhom_tin_tuc',
    }
    this.services.getListUse(val).subscribe(data => {
      this.list_nhom_tin_tuc = data as any;
    })
  }

}