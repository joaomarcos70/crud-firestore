import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { IClient } from 'src/app/shared/utils/interfaces/client.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent {
  clients: IClient[] = [];
  isEditing = false;
  editIdClient = '';
  form = new FormGroup({
    name: new FormControl('John2', [Validators.required]),
    email: new FormControl('john2@teste.com', [Validators.required]),
  });

  constructor(private clientService: ClientService) {
    this.getClients();
  }

  updateInfoClient(client: IClient) {
    this.editIdClient = client.id!;
    this.form.patchValue({
      name: client.name,
      email: client.email,
    });
    this.isEditing = true;
  }

  updateClient(event: any) {
    const client: IClient = event as IClient;
    this.clientService.updateClient(this.editIdClient, {
      name: client.name,
      email: client.email,
    });
    this.editIdClient = '';
    this.isEditing = false;
  }

  deleteUser(client: IClient) {
    this.clientService.deleteClient(client.id!);
  }

  create(event: any) {
    const client: IClient = event as IClient;
    this.clientService
      .addClient({
        name: client.name,
        email: client.email,
      })
      .finally(() => {
        this.form.patchValue({
          name: '',
          email: '',
        });
        this.isEditing = false;
      });
  }

  getClients() {
    this.clientService
      .getClients()
      .pipe()
      .subscribe({
        next: (clients) => {
          this.clients = clients;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
