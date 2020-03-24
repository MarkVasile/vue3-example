import { Store } from "./abstract.store"

interface User extends Object {
  userData: Object,
}

class UserStore extends Store<User> {
  protected data(): User {
    return {
      userData: {},
    }
  }
}

export const userStore: UserStore = new UserStore('userStore')
