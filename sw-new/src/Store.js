import {extendObservable, reaction, toJS} from 'mobx';
import {backend} from './Backend';

class Store {

    autoSave = false

    constructor() {
        extendObservable(this, {
            loaded: false,
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

        reaction(() => toJS(this.config), (config) => {
            if (this.autoSave) {
                this.saveConfig(config)
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

                this.loaded = true
                this.autoSave = true
            })
            .catch((error) => {
                this.loading = false
                this.error = error
                console.error(error)
            })
    }

    saveConfig(config) {
        console.log('Saving', config)

        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 1000)
    }
}

let store = new Store()
export {store}
