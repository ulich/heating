import {extendObservable, reaction, toJS} from 'mobx';
import {backend} from './Backend';

class Store {

    autoSave = false
    savedConfig = {}

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
                this.saveConfigIfChanged(config)
            }
        })
    }

    load() {
        this.loading = true

        backend.getConfigAndStatus()
            .then((response) => {
                this.loading = false
                this.error = null

                this.applyFromServer(response)

                this.loaded = true
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

    deleteWeeklySet(set) {
        const i = this.config.weekly.sets.indexOf(set)
        this.config.weekly.sets.splice(i, 1)
    }

    saveConfigIfChanged(config) {
        if (this.hasUnsavedChanges()) {
            config = config || toJS(this.config) 
            this.saveConfig(toJS(config))
        }
    }

    saveConfig(config) {
        console.log('Saving', config)

        this.loading = true

        // TODO: show errors in a popup or so, or they are only displayed on main view
        backend.setConfig(config)
            .then((response) => {
                this.loading = false
                this.savedConfig = response.config
            })
    }

    hasUnsavedChanges() {
        return JSON.stringify(this.savedConfig) !== JSON.stringify(toJS(this.config))
    }

    applyFromServer(response) {
        this.autoSave = false
        this.savedConfig = JSON.parse(JSON.stringify(response.config))
        this.config = response.config
        this.status = response.status
        this.autoSave = true
    }
}

let store = new Store()
export {store}
