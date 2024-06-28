import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ParkNotesComponent {
  parkForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.parkForm = this.fb.group({
      note: ['', Validators.required],
    });
  }

  saveNotes() {
    
    const noteValue = this.parkForm.value.note;
    
  }
}
