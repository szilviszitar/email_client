import { Component, Input , Output, EventEmitter} from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailform!: FormGroup;
  @Input()  email!: Email;
  @Output() emailSubmit= new EventEmitter();



  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailform = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+./)]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])

    });
  }

  onSubmit() {
    if (this.emailform.valid) {
      this.emailSubmit.emit(this.emailform.value);
    
    }
   
  }

}
