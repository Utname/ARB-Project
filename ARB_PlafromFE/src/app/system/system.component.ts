import { Component,ViewEncapsulation  } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'system-root',
  templateUrl: './system.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SystemComponent {
  title = 'ARB_PlafromFE';
  siteLanguage = 'English';
  
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
  
}
