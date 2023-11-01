import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { IClient } from '../shared/utils/interfaces/client.interface';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private firestore: Firestore) {}

  clientCollection = collection(this.firestore, 'clients');

  getClients(): Observable<any> {
    return collectionData(this.clientCollection, { idField: 'id' });
  }

  addClient(client: IClient) {
    return addDoc(this.clientCollection, client);
  }

  verifyExistingClient(id: string) {
    const docRef = doc(this.clientCollection, id);
    return getDoc(docRef);
  }

  deleteClient(id: string) {
    const docRef = doc(this.clientCollection, id);
    deleteDoc(docRef);
  }

  updateClient(id: string, newClient: Partial<IClient>) {
    const docRef = doc(this.clientCollection, id);
    const res = updateDoc(docRef, newClient);
  }
}
