import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from 'src/app/shared.service';
import { listModule } from 'src/data/data';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  showFiller = true;
  user: any;
  quan_tri_OL: any;
  listModule: any = [];
  Module: any = [];
  listModuleNew: any = [];
  item: any = [];
  idModuleCurrent: any;
  listQuanTri: any;
  public siteLanguage: any = 'English';
  public isActiveLang : any = 'en';
  languageList = [
    { code: 'en', label : 'English' },
    { code: 'vi', label: 'VietNam' },
  ];
  
  constructor(private service: SharedService,private translocoService: TranslocoService) {
    
    var x = localStorage.getItem("user");
    this.user = JSON.parse(x as any);
    this.listModule = listModule;
    this.getQuyenQuanTri();
  }

  ngOnInit(): void {

  }
  public data_new: any = [];
  getQuyenQuanTri() {
    var val = {
      controller: 'sys_quan_tri',
      id_user: this.user.id
    }
    this.service.getQuyenQuanTri(val).subscribe(data => {
      this.listQuanTri = data as any;
      if(this.user.fullname != "administrator"){
        for (var i = 0; i < this.listModule.length; i++) {
          var item = this.listModule[i].listModuleDetails;
          for (var j = 0; j < item.length; j++) {
            var item2 = item[j].id;
            var id_quyen = this.listQuanTri[0].id_quyen;
            id_quyen = id_quyen.split(",");
            var check_controller = id_quyen.filter((q: any) => q == item2);
            if (check_controller.length != 0) {
              this.listModule[i].listModuleDetails[j].is_controller = true;
              this.listModule[i].is_controller = true;
            }

          }
        }
      }
    })
  }
  changeSiteLanguage(language: string): void {
    this.translocoService.setActiveLang(language);
    this.siteLanguage = this.languageList.filter(f => f.code == language)[0].label;
    this.isActiveLang = this.languageList.filter(f => f.code == language)[0].code;
  }
  goToModuleCurrent(id: any, controller: any): void {
    // var hostname = window.location.hostname;
    this.idModuleCurrent = id;
    // var url = hostname + "/" + controller;
    // window.open(url, "_blank");
  }
  ShowFiller(value:any,id:any){
    this.listModule.forEach((q:any) => {
      if(q.id == id){
        q.showFiller = value;
      }
    });
  }
  HiddenFiller(value:any,id:any){
    this.listModule.forEach((q:any) => {
      if(q.id == id){
        q.showFiller = value;
      }
    });
  }
}

