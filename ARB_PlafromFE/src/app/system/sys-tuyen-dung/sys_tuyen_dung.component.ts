import { Component, OnInit, Inject, ViewChild, Input, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { sys_tuyen_dungPopupAddComponent } from './popupAdd.component';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { read, utils, writeFile } from 'xlsx';
import { query } from '@angular/animations';
@Component({
  selector: 'app_sys_tuyen_dung',
  templateUrl: './sys_tuyen_dung.component.html',
  styleUrls: ['./sys_tuyen_dung.component.css']
})
export class sys_tuyen_dungComponent implements OnInit {
  selectValue: any;
  listOptions: any = [];
  status: any;
  status_del: any;
  search: any;
  pageEvent: any = PageEvent;
  datasource: any = null;
  pageIndex: any;
  pageSize: any;
  length: any;
  p: any = 1;
  itemPerPage: any = 10;
  total: any;
  title = 'ERP_Platform';
  fileName = 'PhongBan.xlsx';
  data: any;
  public listData: any;
  public don_vi_tinh_OL: any;
  public phuc_loi_OL: any;
  public vi_tri_OL: any;
  public user_OL:any;
  constructor(
    private service: SharedService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPhucLoiOfList();
    this.getViTriOfList();
    this.search = "";
    this.don_vi_tinh_OL = [];
    this.vi_tri_OL = [];
    this.phuc_loi_OL = [];
    this.user_OL = [];
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
    this.loadListData();
  }
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.paginationComponent.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }
  getViTriOfList() {
    var val = {
      controller: 'sys_chuc_danh',
    }
    this.service.getOfList(val).subscribe(data => {
      this.vi_tri_OL = data as any;
    })
  }
  getPhucLoiOfList() {
    var val = {
      controller: 'sys_phuc_loi',
    }
    this.service.getOfList(val).subscribe(data => {
      this.phuc_loi_OL = data as any;
    })
  }
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  loadListData() {
    var val = {
      search: this.search,
      status_del: this.status ?? 1,
      controller: 'sys_tuyen_dung',
    }
    this.service.getAll(val).subscribe(data => {
      this.listData = data as any;

      for (var i = 0; i < this.listData.length; i++) {
        var item = this.listData[i];
        item.ten_phuc_loi = [];
        item.ten_chuc_danh = [];
        item.id_phuc_loi = item.id_phuc_loi.split(",");
        item.id_chuc_danh = item.id_chuc_danh.split(",");
        item.id_hinh_thuc_lam_viec = item.id_hinh_thuc_lam_viec.split(",");
        item.id_bang_cap = item.id_bang_cap.split(",");
        item.id_gioi_tinh = item.id_gioi_tinh.split(",");
        for (var j = 0; j < item.id_phuc_loi.length; j++) {
          var ten_phuc_loi = ""
          ten_phuc_loi = this.phuc_loi_OL.filter((q: any) => q.id == item.id_phuc_loi[j]).map((q: any) => q.ten);
          if(ten_phuc_loi != null && ten_phuc_loi != "")
           {
             item.ten_phuc_loi.push(ten_phuc_loi);
           }
        }
        for (var j = 0; j < item.id_chuc_danh.length; j++) {
          var ten_chuc_danh = "";
          ten_chuc_danh = this.vi_tri_OL.filter((q: any) => q.id == item.id_chuc_danh[j]).map((q: any) => q.ten);
          if(ten_chuc_danh != null && ten_chuc_danh != ""){
            item.ten_chuc_danh.push(ten_chuc_danh);
          }
        }
      }
      this.total = data.length;
    })
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(sys_tuyen_dungPopupAddComponent, {
      width: '768px',
      height: "80%",
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

    const dialogRef = this.dialog.open(sys_tuyen_dungPopupAddComponent, {
      width: '768px',
      height: "80%",
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

    const dialogRef = this.dialog.open(sys_tuyen_dungPopupAddComponent, {
      width: '768px',
      height: "80%",
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

  Delete(model: any) {
    var val = {
      status_del: 2,
      id: model.id,
      controller: 'sys_tuyen_dung'
    };
    this.service.delete(val).subscribe(res => {
      Swal.fire({
        title: 'Ngưng sử dụng thành công',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Đóng'
      });
      this.loadListData();
    });
  }
  convert(model: any) {
    var val = {
      status_del: 1,
      id: model.id,
      update_by: model.id,
      controller: 'sys_tuyen_dung'
    };
    this.service.convert(val).subscribe(res => {
      Swal.fire({
        title: 'Sử dụng lại thành công',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Đóng'
      });
      this.loadListData();
    });
  }
  arrayBuffer: any;
  public file: any;
  incomingfile(event: any) {
    this.file = event.target.files[0];
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var data_excel = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.saveDataEcel(data_excel);
      console.log("data_excel", data_excel);
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  public list_chuc_danh: any;
  saveDataEcel(data_excel: any) {
    this.list_chuc_danh = {
      data: data_excel
    }
    // this.list_chuc_danh.push(data_excel);
    this.service.saveExcel(this.list_chuc_danh).subscribe(res => {
      Swal.fire({
        title: 'Thêm mới thành công',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Đóng'
      })
    });
  }
}
