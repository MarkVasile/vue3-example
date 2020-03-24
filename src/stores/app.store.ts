import { PersistentStore } from "./abstract.store"

interface Voronet extends Object {
  cancelNextNavigation: boolean,
}

class AppStore extends PersistentStore<Voronet> {
  protected data(): Voronet {
    return {
      cancelNextNavigation: false,
    }
  }
}

export const appStore: AppStore = new AppStore('appStore')
