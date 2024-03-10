import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { sys_cong_tyComponent } from './sys-cong-ty/sys_cong_ty.component';

import { SysUserComponent } from './sys-user/sys-user.component';
import { sys_tuyen_dungComponent } from './sys-tuyen-dung/sys_tuyen_dung.component';
import { sys_quan_triComponent } from './sys-quan-tri/sys_quan_tri.component';
import { sys_loai_tin_tucComponent } from './sys-loai-tin-tuc/sys_loai_tin_tuc.component';
import { sys_tin_tucPopupAddComponent } from './sys-tin-tuc/popupAdd.component';
import { sys_tien_teComponent } from './sys_tien_te/sys_tien_te.component';
import { sys_chuc_danhComponent } from './sys_chuc_danh/sys_chuc_danh.component';
import { sys_don_vi_tinhComponent } from './sys_don_vi_tinh/sys_don_vi_tinh.component';
import { sys_phong_banComponent } from './sys_phong_ban/sys_phong_ban.component';
import { sys_phuc_loiComponent } from './sys_phuc_loi/sys_phuc_loicomponent';
import { sys_khoaComponent } from './sys_khoa/sys_khoa.component';
import { sys_nhom_tin_tucComponent } from './sys_nhom_tin_tuc/sys_nhom_tin_tuc.component';
const routes: Routes = [
  {path:'tintuc',component:sys_tin_tucPopupAddComponent},
  {path:'loaitintuc',component:sys_loai_tin_tucComponent},
  {path:'nhomtintuc',component:sys_nhom_tin_tucComponent},
  {path:'chucdanh',component:sys_chuc_danhComponent},
  {path:'congty',component:sys_cong_tyComponent},
  {path:'phucloi',component:sys_phuc_loiComponent},
  {path:'phongban',component:sys_phong_banComponent},
  {path:'user',component:SysUserComponent},
  {path:'donvitinh',component:sys_don_vi_tinhComponent},
  {path:'setting',component:SettingComponent},
  {path:'tuyendung',component:sys_tuyen_dungComponent},
  {path:'khoa',component:sys_khoaComponent},
  {path:'quantri',component:sys_quan_triComponent},
  {path:'tiente',component:sys_tien_teComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
