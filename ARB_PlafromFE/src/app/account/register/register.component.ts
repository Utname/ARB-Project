import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
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
      this.fullnameCheck = this.record.fullname == null ?"(Bắt buộc)" : "";
      this.emailCheck =this.record.email == null ? "(Bắt buộc)": this.record.email.match(this.regexEmail) ? "" : "(Email không đúng định dạng)";
      this.record.hasPassword == null ? this.passwordCheck = "(Bắt buộc)" : this.record.hasPassword.match(this.regexPassword) ? "" : "(Mật khẩu phẩi từ 8 đén 16 kÝ tự)";
      this.record.phone == null ?this.phoneCheck = "(Bắt buộc)" : this.regexPhone.test(this.record.phone) ? "" : "(Số điện thoại chưa đúng)";
  }

  create() {
    if (this.record.email != null && this.record.fullname != null && this.record.phone != null && this.record.hasPassword != null
      && this.record.email.match(this.regexEmail) && this.regexPhone.test(this.record.phone) && this.regexPassword.test(this.record.hasPassword)) {
      var val = this.record;
      this.service.createUser(val).subscribe(res => {
        Swal.fire({
          title: 'Đăng ký thành công',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Đóng'
        })
      });
    }
  }
  ngOnInit(): void {
  }
}
