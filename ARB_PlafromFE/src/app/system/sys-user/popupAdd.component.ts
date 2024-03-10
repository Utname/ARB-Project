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
  selector: 'sys_userPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css']
})
export class sys_userPopupAddComponent extends BasePopUpAddComponent {

  public listGender: any = [];
  public gender: any;
  public regexEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public regexPhone: any = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  public regexPassword: any = /^.{8,16}$/;
  public currentDate:any = new Date;

  constructor(public dialogRef: MatDialogRef<sys_userPopupAddComponent>,
    http: HttpClient, _translocoService: TranslocoService,
    service: SharedService,
    private services: SharedService,

    //priv//_fuseNavigationService: FuseNavigationService,
    route: ActivatedRoute,
    //@Inject('BASE_URL') baseUrl: string,
    public override dialogModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    super(_translocoService, service,route, "", http, 'sys_user', dialogRef, dialogModal)
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

    this.listGender = [
      {
        id: 1,
        name: "Nam"
      },
      {
        id: 2,
        name: "Nữ",
      },
      {
        id: 3,
        name: "Khác"
      }
    ]
  }

    uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    this.services.taiAnh(formData).subscribe((data: any) => {
      this.record.avatar = data.toString();
      this.record.avatar = this.services.PhotoUrl + "/" + this.record.avatar;
    })
  }
  uploadCoverImage(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    this.services.TaiCoverImage(formData).subscribe((data: any) => {
      this.record.cover_image = data.toString();
      this.record.cover_image = this.services.PhotoUrl + "/" + this.record.cover_image;
    })
  }
}


// import { Component, Inject, OnInit } from '@angular/core';
// import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { SharedService } from 'src/app/shared.service';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import Swal from 'sweetalert2'
// @Component({
//   selector: 'sys_userPopupAdd',
//   templateUrl: './popupAdd.component.html',
//   styleUrls: ['./popupAdd.component.css']
// })
// export class sys_userPopupAddComponent implements OnInit {
//   public listGender: any = [];
//   public gender: any;
//   public regexEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   public regexPhone: any = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
//   public regexPassword: any = /^.{8,16}$/;
//   public errorModel:any;
//   public currentDate:any = new Date;
//   public actionEnum:any;
//   public record: any = {

//   };
//   constructor(
//     public dialogRef: MatDialogRef<sys_userPopupAddComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private formBuilder: FormBuilder,
//     private service: SharedService,
//   ) {
//     this.actionEnum = data.actionEnum;
//     if (data.actionEnum == 1) {
//       this.record = {
//         id: this.data.id,
//         status_del: 1,
//         avatar: "/assets/images/arb_logo_system.png",
//         cover_image: "/assets/images/arb_logo_system.png"
//       }
//       this.create();
//     }
//     else if (data.actionEnum != 1) {
//       this.record = data.model;
//     }
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }


//   ngOnInit(): void {
//     this.listGender = [
//       {
//         id: 1,
//         name: "Nam"
//       },
//       {
//         id: 2,
//         name: "Nữ",
//       },
//       {
//         id: 3,
//         name: "Khác"
//       }
//     ]
//   }
  
//   create() { 
//       this.record.controller = 'sys_user'
//       var val = this.record;
//       this.service.create(val).subscribe(res => {
//         this.service.create_success();
//         this.dialogRef.close();
//       },
//       error=>{
//           if(error.status == 400){
//             this.errorModel = error.error;
//           }
//       }
//       );
//   }

//   uploadPhoto(event: any) {
//     var file = event.target.files[0];
//     const formData: FormData = new FormData();
//     formData.append('uploadedFile', file, file.name);
//     this.service.taiAnh(formData).subscribe((data: any) => {
//       this.record.avatar = data.toString();
//       this.record.avatar = this.service.PhotoUrl + "/" + this.record.avatar;
//     })
//   }
//   uploadCoverImage(event: any) {
//     var file = event.target.files[0];
//     const formData: FormData = new FormData();
//     formData.append('uploadedFile', file, file.name);
//     this.service.TaiCoverImage(formData).subscribe((data: any) => {
//       this.record.cover_image = data.toString();
//       this.record.cover_image = this.service.PhotoUrl + "/" + this.record.cover_image;
//     })
//   }

//   edit() {
//     this.record.controller = 'sys_user'
//       var val = this.record;
//       this.service.edit(val).subscribe(res => {
//         this.service.edit_success();
//         this.dialogRef.close();
//       },
//       error=>{
//         if(error.status == 400){
//           this.errorModel = error.error;
//         }
//     });
//   }
// }

