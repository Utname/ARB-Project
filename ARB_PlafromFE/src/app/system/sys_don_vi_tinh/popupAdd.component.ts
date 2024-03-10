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
  selector: 'sys_don_vi_tinhPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css']
})
export class sys_don_vi_tinhPopupAddComponent extends BasePopUpAddComponent {

  constructor(public dialogRef: MatDialogRef<sys_don_vi_tinhPopupAddComponent>,
    http: HttpClient, _translocoService: TranslocoService,
    service: SharedService,
    //priv//_fuseNavigationService: FuseNavigationService,
    route: ActivatedRoute,
    //@Inject('BASE_URL') baseUrl: string,
    public override dialogModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    super(_translocoService, service,route, "", http, 'sys_don_vi_tinh', dialogRef, dialogModal)
    this.record = data;
    this.actionEnum = data.actionEnum;
    if (this.actionEnum == 1) {
      this.baseInitData();
    }
    else if(this.actionEnum != 1){
      this.record = data.model;
    }
  }
}