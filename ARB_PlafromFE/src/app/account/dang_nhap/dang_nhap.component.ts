import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dang_nhap',
  templateUrl: './dang_nhap.component.html',
  styleUrls: ['./dang_nhap.component.css']
})

export class dang_nhapComponent implements OnInit {
  public regexEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public regexPassword:any = /^.{8,16}$/;
  public regexPhone: any = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  public phoneCheck:any;
  public emailCheck: any;
  public fullnameCheck: any;
  public passwordCheck: any;
  public record: any = {
  
  };
  constructor(
    private service: SharedService,
    private formBuilder: FormBuilder,
  ) {
    this.checkError();
  }

  checkError() {
      this.emailCheck =this.record.email == null ? "(Bắt buộc)": this.record.email.match(this.regexEmail) ? "" : "(Email không đúng định dạng)";
      this.passwordCheck = this.record.hasPassword == null ? this.passwordCheck = "(Bắt buộc)" : this.record.hasPassword.match(this.regexPassword) ? "" : "(Mật khẩu phẩi từ 8 đén 16 kÝ tự)";
  }

  dang_nhap() {
    if (this.record.email != null &&  this.record.hasPassword != null
      && this.record.email.match(this.regexEmail)  && this.regexPassword.test(this.record.hasPassword)) {
      var val = this.record;
      var url = './setting';
      this.service.dangNhap(val).subscribe(res => {
      var user = res[0];
       if(res.length != 0){
        Swal.fire({
          title: 'Đăng nhập thành công',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Đóng'
        }).then((result) => {
          window.open(url, "_blank");
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(user));
         
        });
       
       }
       else{
        Swal.fire({
          title: 'Tài khoản hoặc mật khẩu không chính xác',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Đóng'
        })
       }
      });
    }
  }
  ngOnInit(): void {
  }
}
