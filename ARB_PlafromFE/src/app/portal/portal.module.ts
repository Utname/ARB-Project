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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { cm_inputComponent } from '../commonComponent/common_input/cm_input.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { TranslocoModule } from '@ngneat/transloco';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { cm_selectComponent } from '../commonComponent/common_select/cm_select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ViewEncapsulation } from '@angular/core';
import { SystemRoutingModule } from '../system/system-routing.module';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { SystemComponent } from '../system/system.component';
import { ChatboxComponent } from './chat_box/index.component';

@NgModule({
  declarations: [
    ChatboxComponent

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
    PortalRoutingModule
  ],

  providers: [MatFormFieldModule, MatDatepickerModule],
  bootstrap: [SystemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class PortalModule { }
