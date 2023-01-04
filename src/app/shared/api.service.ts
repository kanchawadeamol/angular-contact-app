import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/contacts/';
  // url = 'https://kanchawadeamol.github.io/angular-contact-app/';

  addContact(contactData: any) {
    return this.http.post<any>(this.url, contactData).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllContacts() {
    return this.http.get<any>(this.url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateContact(contactData: any, id: number) {
    return this.http.put<any>(this.url + id, contactData).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteContact(id: number) {
    return this.http.delete<any>(this.url + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
