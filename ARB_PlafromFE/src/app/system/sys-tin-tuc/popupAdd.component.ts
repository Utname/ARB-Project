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
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'sys_tin_tucPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css']
})
export class sys_tin_tucPopupAddComponent extends BasePopUpAddComponent {

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
  constructor(public dialogRef: MatDialogRef<sys_tin_tucPopupAddComponent>,
    http: HttpClient, _translocoService: TranslocoService,
    service: SharedService,
    private services: SharedService,

    //priv//_fuseNavigationService: FuseNavigationService,
    route: ActivatedRoute,
    //@Inject('BASE_URL') baseUrl: string,
    public override dialogModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    super(_translocoService, service,route, "", http, 'sys_tin_tuc', dialogRef, dialogModal)
    this.record = data;
    this.actionEnum = data.actionEnum;
    if (this.actionEnum == 1) {
      this.baseInitData();
    }
    else if(this.actionEnum != 1){
      this.record = data.model;
    }
    this.getListLoaiTinTuc();
    this.getListNhomTinTuc();
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  list_nhom_tin_tuc:any;
  getListNhomTinTuc() {
    var val = {
      controller: 'sys_nhom_tin_tuc',
    }
    this.services.getListUse(val).subscribe(data => {
      this.list_nhom_tin_tuc = data as any;
    })
  }
  list_loai_tin_tuc:any;
  getListLoaiTinTuc() {
    var val = {
      controller: 'sys_loai_tin_tuc',
    }
    this.services.getListUse(val).subscribe(data => {
      this.list_loai_tin_tuc = data as any;
    })
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    this.services.taiAnh(formData).subscribe((data: any) => {
      this.record.image = data.toString();
      this.record.image = this.services.PhotoUrl + "/" + this.record.image;
    })
  }
}