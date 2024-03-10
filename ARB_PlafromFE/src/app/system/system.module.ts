
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SettingComponent } from './setting/setting.component';
import { SysUserComponent } from './sys-user/sys-user.component';
import { sys_userPopupAddComponent } from './sys-user/popupAdd.component';
import { HeaderComponent } from '../layout/header/header.component';
import { sys_cong_tyPopupAddComponent } from './sys-cong-ty/popupAdd.component';
import { sys_cong_tyComponent } from './sys-cong-ty/sys_cong_ty.component';
import { sys_tuyen_dungComponent } from './sys-tuyen-dung/sys_tuyen_dung.component';
import { sys_tuyen_dungPopupAddComponent } from './sys-tuyen-dung/popupAdd.component';
import { sys_quan_triComponent } from './sys-quan-tri/sys_quan_tri.component';
import { sys_quan_triPopupAddComponent } from './sys-quan-tri/popupAdd.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { sys_loai_tin_tucComponent } from './sys-loai-tin-tuc/sys_loai_tin_tuc.component';
import { sys_loai_tin_tucPopupAddComponent } from './sys-loai-tin-tuc/popupAdd.component';
import { sys_tin_tucPopupAddComponent } from './sys-tin-tuc/popupAdd.component';
import { sys_tin_tucComponent } from './sys-tin-tuc/sys_tin_tuc.component';
import { cm_inputComponent } from '../commonComponent/common_input/cm_input.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { TranslocoModule } from '@ngneat/transloco';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { cm_selectComponent } from '../commonComponent/common_select/cm_select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ViewEncapsulation } from '@angular/core';
import { sys_tien_teComponent } from './sys_tien_te/sys_tien_te.component';
import { sys_tien_tePopupAddComponent } from './sys_tien_te/popupAdd.component';
import { sys_chuc_danhPopupAddComponent } from './sys_chuc_danh/popupAdd.component';
import { sys_chuc_danhComponent } from './sys_chuc_danh/sys_chuc_danh.component';
import { sys_don_vi_tinhPopupAddComponent } from './sys_don_vi_tinh/popupAdd.component';
import { sys_don_vi_tinhComponent } from './sys_don_vi_tinh/sys_don_vi_tinh.component';
import { sys_phong_banComponent } from './sys_phong_ban/sys_phong_ban.component';
import { sys_phong_banPopupAddComponent } from './sys_phong_ban/popupAdd.component';
import { sys_phuc_loiPopupAddComponent } from './sys_phuc_loi/popupAdd.component';
import { sys_phuc_loiComponent } from './sys_phuc_loi/sys_phuc_loicomponent';
import { sys_khoaComponent } from './sys_khoa/sys_khoa.component';
import { sys_khoaPopupAddComponent } from './sys_khoa/popupAdd.component';
import { sys_nhom_tin_tucComponent } from './sys_nhom_tin_tuc/sys_nhom_tin_tuc.component';
import { sys_nhom_tin_tucPopupAddComponent } from './sys_nhom_tin_tuc/popupAdd.component';
@NgModule({
  declarations: [
    sys_tien_tePopupAddComponent,
    sys_tien_teComponent,
    cm_inputComponent,
    cm_selectComponent,
    sys_tin_tucComponent,
    sys_tin_tucPopupAddComponent,
    sys_loai_tin_tucPopupAddComponent,
    sys_loai_tin_tucComponent,
    sys_nhom_tin_tucComponent,
    sys_nhom_tin_tucPopupAddComponent,
    SystemComponent,
    SettingComponent,
    HeaderComponent,
    SysUserComponent,
    sys_phong_banComponent,
    sys_userPopupAddComponent,
    sys_phong_banPopupAddComponent,
    sys_chuc_danhPopupAddComponent,
    sys_chuc_danhComponent,
    sys_cong_tyPopupAddComponent,
    sys_cong_tyComponent,
    sys_phuc_loiComponent,
    sys_phuc_loiPopupAddComponent,
    sys_don_vi_tinhComponent,
    sys_don_vi_tinhPopupAddComponent,
    sys_tuyen_dungComponent,
    sys_tuyen_dungPopupAddComponent,
    sys_khoaComponent,
    sys_khoaPopupAddComponent,
    sys_quan_triComponent,
    sys_quan_triPopupAddComponent,
    FilterPipe,

  ],

  imports: [
    AngularEditorModule,
    MatTreeModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatStepperModule,
    MatSnackBarModule,
    // MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule,
    BrowserModule,
    SystemRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgxPaginationModule,
    MatNativeDateModule,
    CommonModule,
    SelectDropDownModule,
    TranslocoModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxMatSelectSearchModule,
    
  ],

  providers: [MatFormFieldModule, MatDatepickerModule],
  bootstrap: [SystemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule { }
