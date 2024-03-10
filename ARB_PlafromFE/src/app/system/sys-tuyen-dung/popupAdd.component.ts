import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'sys_tuyen_dungPopupAdd',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.css'],
  
})
export class sys_tuyen_dungPopupAddComponent implements OnInit {
  public listGender: any = [];
  public gender: any;
  public regexEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public regexPhone: any = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  public regexPassword: any = /^.{8,16}$/;
  public list_cong_ty: any;
  public list_chuc_danh: any;
  public list_phong_ban: any;
  public list_phuc_loi: any;
  public list_don_vi_tinh: any;
  public list_gioi_tinh: any;
  public list_loai_luong: any;
  public list_hinh_thuc_lam_viec: any;
  public list_bang_cap: any;
  public congtyCheck: any;
  public chucdanhCheck: any;
  public loailuongCheck: any;
  public soluongCheck: any;
  public user:any;
  public record: any = {
  
  };
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
  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    this.service.taiAnh(formData).subscribe((data: any) => {
      this.record.image = data.toString();
      this.record.image = this.service.PhotoUrl + "/" + this.record.image;
    })
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  myFilter1 = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(
    public dialogRef: MatDialogRef<sys_tuyen_dungPopupAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: SharedService,
  ) {
    
    if (data.actionEnum == 1) {
      this.record = {
        id: this.data.id,
        status_del: 1,
        list_chuc_danh: [],
        ngay_het_han: new Date(),
        ngay_bat_dau: new Date(),
      }
       this.checkError();
    }
    else if (data.actionEnum != 1) {
      this.record = data.model;
    }
    var x = localStorage.getItem("user");
    this.user = JSON.parse(x as any);
    this.checkError();
    this.getListCongTy();
    this.getListChucDanh();
    this.getListPhongBan();
    this.getListPhucLoi();
    this.getListDonViTinh();
    this.getGioiTinh();
    this.getLoaiLuong();
    this.getHinhThucLamViec();
    this.getBangCap();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }
  maCheck: any;
  tenCheck: any;
  loaiLuongCheck:any;
  congTyCheck:any;
  chucDanhCheck:any;
  ngayBatDauCheck:any;
  ngayHetHanCheck:any;
  phongBanCheck:any;
  checkError() {
    if (this.record.ma == null) {
      this.maCheck = "(Bắt buộc)";
    }
    if (this.record.id_loai_luong == null) {
      this.loaiLuongCheck = "(Bắt buộc)";
    }
    if (this.record.id_cong_ty == null) {
      this.congTyCheck = "(Bắt buộc)";
    }
    if(this.data.actionEnum == 1){
      if (this.record.id_chuc_danh == null )  {
        this.chucDanhCheck = "(Bắt buộc)";
      }
    
    }
   
    if (this.record.id_phong_ban ==  null) {
      this.phongBanCheck = "(Bắt buộc)";
    }
    if (this.record.ngay_bat_dau == null) {
      this.ngayBatDauCheck = "(Ngày bắt đầu không đúng định dạng)";
    }
    if (this.record.ngay_het_han == null) {
      this.ngayHetHanCheck = "(Ngày hết hạn không đúng định dạng)";
    }
    if (this.record.ten == null) {
      this.tenCheck = "(Bắt buộc)";
    }
  }

  getListCongTy() {
    var val = {
      controller: 'sys_cong_ty',
    }
    this.service.getListUse(val).subscribe(data => {
      this.list_cong_ty = data as any;
    })
  }

  getListChucDanh() {
    var val = {
      controller: 'sys_chuc_danh',
    }
    this.service.getListUse(val).subscribe(data => {
      this.list_chuc_danh = data as any;
    })
  }
  getListPhongBan() {
    var val = {
      controller: 'sys_phong_ban',
    }
    this.service.getListUse(val).subscribe(data => {
      this.list_phong_ban = data as any;
    })
  }

  getListPhucLoi() {
    var val = {
      controller: 'sys_phuc_loi',
    }
    this.service.getListUse(val).subscribe(data => {
      this.list_phuc_loi = data as any;
    })
  }

  getListDonViTinh() {
    var val = {
      controller: 'sys_don_vi_tinh',
    }
    this.service.getListUse(val).subscribe(data => {
      this.list_don_vi_tinh = data as any;
    })
  }

  getGioiTinh() {
    this.list_gioi_tinh = [
      {
        id: "1",
        name: "Nam"
      },
      {
        id: "2",
        name: "Nữ",
      },
      {
        id: "3",
        name: "Khác"
      }
    ]
  }

  getLoaiLuong() {
    this.list_loai_luong = [
      {
        id: 1,
        name: "Thương lượng"
      },
      {
        id: 2,
        name: "Cố định",
      },
      {
        id: 3,
        name: "Định mức"
      }
    ]
  }

  getHinhThucLamViec() {
    this.list_hinh_thuc_lam_viec = [
      {
        id: "1",
        name: "Full-time"
      },
      {
        id: "2",
        name: "Part-time",
      },
      {
        id: "3",
        name: "Remote"
      },
    ]
  }
  getBangCap() {
    this.list_bang_cap = [
      {
        id: "1",
        name: "Đại học"
      },
      {
        id: "2",
        name: "Cao đẳng",
      },
      {
        id: "3",
        name: "Trung cấp"
      },
    ]
  }

  create() {
    var check = this.record.ten != null && this.record.ma != null && this.record.id_cong_ty != null && this.record.id_loai_luong != null
    && this.record.ngay_bat_dau != null && this.record.ngay_het_han != null && this.record.id_chuc_danh != null
    && this.record.id_phong_ban != null;
    if (check) {
      this.record.controller = 'sys_tuyen_dung',
      this.record.update_by = this.user.id,
      this.record.id_chuc_danh = this.record.id_chuc_danh.join();
      this.record.id_gioi_tinh = this.record.id_gioi_tinh.join();
      this.record.id_phuc_loi = this.record.id_phuc_loi.join();
      this.record.id_hinh_thuc_lam_viec = this.record.id_hinh_thuc_lam_viec.join();
      this.record.id_bang_cap = this.record.id_bang_cap.join();
      if(this.record.luong_from == null){
        this.record.luong_from = 0;
      }
      if(this.record.luong_to == null){
        this.record.luong_to = 0;
      }
      var val = this.record;
      this.service.create(val).subscribe(res => {
        Swal.fire({
          title: 'Thêm mới thành công',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Đóng'
        })
        this.dialogRef.close();
      });
    }
  }

  edit() {
    var check = this.record.ten != null && this.record.ma != null && this.record.id_cong_ty != null && this.record.id_loai_luong != null
    && this.record.ngay_bat_dau != null && this.record.ngay_het_han != null && this.record.id_chuc_danh != null
    && this.record.id_phong_ban != null;
    if (check) {
      this.record.controller = 'sys_tuyen_dung';
      this.record.update_by = this.user.id,
      this.record.id_chuc_danh = this.record.id_chuc_danh.join();
      this.record.id_gioi_tinh = this.record.id_gioi_tinh.join();
      this.record.id_phuc_loi = this.record.id_phuc_loi.join();
      this.record.id_hinh_thuc_lam_viec = this.record.id_hinh_thuc_lam_viec.join();
      this.record.id_bang_cap = this.record.id_bang_cap.join();
      var val = this.record;
      this.service.edit(val).subscribe(res => {
        Swal.fire({
          title: 'Cập nhật thành công',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Đóng'
        })
        this.dialogRef.close();
      });
    }
  }
}
