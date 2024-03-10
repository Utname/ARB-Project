
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import { SettingComponent } from './system/setting/setting.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './layout/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { SysUserComponent } from './system/sys-user/sys-user.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { sys_userPopupAddComponent } from './system/sys-user/popupAdd.component';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NgxPaginationModule} from 'ngx-pagination';
import { AccountModule } from './account/account.module';
import { SystemComponent } from './system/system.component';
import { AccountComponent } from './account/account.component';
import { SystemModule } from './system/system.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SystemRoutingModule } from './system/system-routing.module';
import { initializeApp,provideFirebaseApp,getApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { TranslocoRootModule } from './transloco-root.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { PortalRoutingModule } from './portal/portal-routing.module';
import { PortalModule } from './portal/portal.module';
const firebaseConfig = {
  apiKey: "AIzaSyD0IqfJZUpbQ8E1VovbFPbvxKnl64GiDXQ",
  authDomain: "arb-platform-2603c.firebaseapp.com",
  projectId: "arb-platform-2603c",
  storageBucket: "arb-platform-2603c.appspot.com",
  messagingSenderId: "949808104199",
  appId: "1:949808104199:web:fc50db1a872117ab71bba2"
};
@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgxPaginationModule,
    AccountModule,
    MatNativeDateModule,
    SystemRoutingModule,
    PortalRoutingModule,
    PortalModule,
    //AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    TranslocoRootModule,
    provideStorage(() => getStorage()),
    
  ],
  providers: [MatFormFieldModule,MatDatepickerModule,SharedService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
