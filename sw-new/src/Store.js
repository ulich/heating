import {extendObservable} from 'mobx';
import {backend} from './Backend';

class Store {
    constructor() {
        extendObservable(this, {
            loading: true,
            error: null,
            config: {
                mode: 'timed',
                weekly: {
                    sets: [],
                    activeSet: null
                },
                specials: []
            },
            status: {
                enabled: false
            }
        })
    }

    load() {
        this.loading = true

        backend.getConfigAndStatus()
            .then((response) => {
                this.loading = false
                this.error = null

                this.config = response.config
                this.status = response.status
            })
            .catch((error) => {
                this.loading = false
                this.error = error
                console.error(error)
            })
    }
}

let store = new Store()
export {store}
