import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ContactModel } from '../contact-dashboard/contact-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css'],
})
export class AddContactFormComponent implements OnInit {
  contactFormValue!: FormGroup;
  contactModelObj: ContactModel = new ContactModel();
  actionBtn: string = 'Add';
  formTitle: string = 'Add Contact';

  constructor(
    public dialogRef: MatDialogRef<AddContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private formbuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.contactFormValue = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    if (this.editdata) {
      this.actionBtn = 'Update';
      this.formTitle = 'Update Contact';
      this.contactFormValue.controls['name'].setValue(this.editdata.name);
      this.contactFormValue.controls['email'].setValue(this.editdata.email);
      this.contactFormValue.controls['phone'].setValue(this.editdata.phone);
      this.contactFormValue.controls['address'].setValue(this.editdata.address);
    }
  }

  btnAction() {
    if (!this.editdata) {
      this.addContact();
    } else {
      this.updateContact();
    }
  }

  addContact() {
    if (this.contactFormValue.valid) {
      this.contactModelObj.id = Date.now();
      this.contactModelObj.name = this.contactFormValue.value.name;
      this.contactModelObj.email = this.contactFormValue.value.email;
      this.contactModelObj.phone = this.contactFormValue.value.phone;
      this.contactModelObj.address = this.contactFormValue.value.address;
      var today = new Date();

      this.contactModelObj.date = today;

      this.api.addContact(this.contactModelObj).subscribe(
        (res) => {
          alert('Contact Added Successfully');
          this.contactFormValue.reset();
          this.dialogRef.close('add');
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
  }

  updateContact() {
    if (this.contactFormValue.valid) {
      this.contactModelObj.id = Date.now();
      this.contactModelObj.name = this.contactFormValue.value.name;
      this.contactModelObj.email = this.contactFormValue.value.email;
      this.contactModelObj.phone = this.contactFormValue.value.phone;
      this.contactModelObj.address = this.contactFormValue.value.address;
      var today = new Date();

      this.contactModelObj.date = today;

      this.api.updateContact(this.contactModelObj, this.editdata.id).subscribe(
        (res) => {
          alert('Contact Updated Successfully');
          this.contactFormValue.reset();
          this.dialogRef.close('update');
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
  }
}
