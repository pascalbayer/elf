import {
  createState,
  selectAll,
  selectRequestsStatus,
  setEntities,
  Store,
  updateRequestsCache,
  withEntities,
  withRequests,
} from '@ngneat/elf';
import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const USERS_STORE_NAME = 'users';

const { state, config } = createState(withEntities<User>(), withRequests());
const store = new Store({ name: USERS_STORE_NAME, state, config });

@Injectable({ providedIn: 'root' })
export class UsersRepository {
  users$ = store.pipe(selectAll());
  status$ = store.pipe(selectRequestsStatus(USERS_STORE_NAME));

  get store() {
    return store;
  }

  setUsers(users: User[]) {
    store.reduce(setEntities(users), updateRequestsCache(USERS_STORE_NAME));
  }
}
