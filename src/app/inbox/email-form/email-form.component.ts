import { Component, Input } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailform!: FormGroup;
  @Input()
  email!: Email;



  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailform = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value:from, disabled:true }),
      subject: new FormControl(subject , [Validators.required]),
      text: new FormControl(text, [Validators.required])

    })
  }


}
