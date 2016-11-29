import {extendObservable, reaction, toJS} from 'mobx';
import {backend} from './Backend';

class Store {

    autoSave = false
    unsavedChanges = false

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
            } else {
                this.unsavedChanges = true
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

    addWeeklySet() {
        this.config.weekly.sets.push({
            name: '',
            weekdays: [
                [], [], [], [], [], [], []
            ]
        })

        return this.config.weekly.sets[this.config.weekly.sets.length - 1]
    }

    saveConfigIfChanged() {
        if (this.unsavedChanges) {
            this.saveConfig(toJS(this.config))
        }
    }

    saveConfig(config) {
        console.log('Saving', config)

        this.loading = true

        // TODO: implement real save
        // TODO: show errors in a popup or so, or they are only displayed on main view
        setTimeout(() => {
            this.loading = false
            this.unsavedChanges = false
        }, 1000)
    }
}

let store = new Store()
export {store}
