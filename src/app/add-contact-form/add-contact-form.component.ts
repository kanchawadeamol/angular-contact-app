import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  phonePattern: string = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    public dialogRef: MatDialogRef<AddContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: ContactModel,
    private formbuilder: FormBuilder,
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactFormValue = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      address: ['', [Validators.required]],
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
          this.snackbar.open('Contact Added Successfully', '', {
            duration: 5000,
          });
          this.contactFormValue.reset();
          this.dialogRef.close('add');
        },
        (error) => {
          this.snackbar.open('Something went wrong', '', {
            duration: 5000,
          });
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
          // alert('Contact Updated Successfully');
          this.snackbar.open('Contact Updated Successfully', '', {
            duration: 5000,
          });
          this.contactFormValue.reset();
          this.dialogRef.close('update');
        },
        (error) => {
          // alert('Something went wrong');
          this.snackbar.open('Something went wrong', '', {
            duration: 5000,
          });
        }
      );
    }
  }
}
