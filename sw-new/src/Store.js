import {extendObservable, reaction, toJS} from 'mobx';
import {hashHistory} from 'react-router';
import {backend} from './Backend';

class Store {

    autoSave = false
    savedConfig = {}

    constructor() {
        extendObservable(this, {
            loaded: false,
            loading: true,
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

        this.load()
    }

    load() {
        this.loading = true

        return backend.getConfigAndStatus()
            .then((response) => {
                this.loading = false
                
                this.applyFromServer(response)

                this.loaded = true

                this.pollStatus()
            })
            .catch(this.handleError.bind(this))
    }

    pollStatus() {
        setInterval(() => {
            backend.getStatus().then((response) => {
                this.status.enabled = response.enabled
            })
        }, 10 * 1000)
    }

    addWeeklySet() {
        this.config.weekly.sets.push({
            name: '',
            weekdays: [
                [], [], [], [], [], [], []
            ]
        })

        return this.config.weekly.sets.length - 1
    }

    deleteWeeklySet(set) {
        const i = this.config.weekly.sets.indexOf(set)
        
        if (this.config.weekly.sets.length === 1) {
            this.config.weekly.activeSet = null
        }
        else if (i === this.config.weekly.activeSet) {
            this.config.weekly.activeSet = 0
        }

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

        backend.setConfig(config)
            .then((response) => {
                this.loading = false
                this.savedConfig = response.config
            })
            .catch(this.handleError.bind(this))
    }

    hasUnsavedChanges() {
        return JSON.stringify(this.savedConfig) !== JSON.stringify(toJS(this.config))
    }

    applyFromServer(response) {
        const lastAutoSave = this.autoSave
        this.autoSave = false
        this.savedConfig = JSON.parse(JSON.stringify(response.config))
        this.config = response.config
        this.status = response.status
        this.autoSave = lastAutoSave
    }

    handleError(error) {
        this.loading = false

        if (error.status && error.status === 401) {
            hashHistory.push('/login')
        } else {
            alert(`Bitte lade die Seite neu. Details: ${error.message}`)
        }

        throw error
    }
}

let store = new Store()
export {store}
