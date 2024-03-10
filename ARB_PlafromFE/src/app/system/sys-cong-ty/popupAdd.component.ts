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
  selector: 'sys_cong_tyPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css']
})
export class sys_cong_tyPopupAddComponent extends BasePopUpAddComponent {

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
  constructor(public dialogRef: MatDialogRef<sys_cong_tyPopupAddComponent>,
    http: HttpClient, _translocoService: TranslocoService,
    service: SharedService,
    private services: SharedService,

    //priv//_fuseNavigationService: FuseNavigationService,
    route: ActivatedRoute,
    //@Inject('BASE_URL') baseUrl: string,
    public override dialogModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    super(_translocoService, service,route, "", http, 'sys_cong_ty', dialogRef, dialogModal)
    this.record = data;
    this.actionEnum = data.actionEnum;
    
    if (this.actionEnum == 1) {
      this.baseInitData();
      this.record.avatar = "/assets/images/arb_logo_system.png",
      this.record.cover_image= "/assets/images/arb_logo_system.png"
    }
    else if(this.actionEnum != 1){
      this.record = data.model;
    }
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);
    this.services.taiAnh(formData).subscribe((data:any) =>{
      this.record.logo = data.toString();
      this.record.logo = this.services.PhotoUrl + "/" + this.record.logo;
    })
  }
  uploadCoverImage(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);
    this.services.TaiCoverImage(formData).subscribe((data:any) =>{
      this.record.cover_image = data.toString();
      this.record.cover_image = this.services.PhotoUrl + "/" + this.record.cover_image;
    })
  }
}