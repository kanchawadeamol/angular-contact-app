import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContactFormComponent } from '../add-contact-form/add-contact-form.component';
import { ContactModel } from '../contact-dashboard/contact-dashboard.model';
import { ApiService } from '../shared/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.css'],
})
export class ContactDashboardComponent implements OnInit {
  contactModelObj: ContactModel = new ContactModel();
  contactData!: any;

  displayedColumns: string[] = [
    'sr.no',
    'id',
    'name',
    'email',
    'phone',
    'address',
    'date',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {}

  openAddDialog() {
    this.dialog
      .open(AddContactFormComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '450px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'add') {
          this.getAllContacts();
        }
      });
  }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.api.getAllContacts().subscribe((res) => {
      this.contactData = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialog(rowData: any) {
    this.dialog
      .open(AddContactFormComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '450px',
        data: rowData,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllContacts();
        }
      });
  }

  deletContact(id: number) {
    this.api.deleteContact(id).subscribe(
      (res) => {
        this.snackbar.open('Contact Deleted Successfully', '', {
          duration: 5000,
        });
        this.getAllContacts();
      },
      (error) => {
        this.snackbar.open('Something went wrong', '', {
          duration: 5000,
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
