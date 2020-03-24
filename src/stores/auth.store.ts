import { Store } from "./abstract.store"

interface Auth extends Object {
  token: String,
}

class AuthStore extends Store<Auth> {
  protected data(): Auth {
    return {
      token: '',
    }
  }
}

export const authStore: AuthStore = new AuthStore('authStore')
