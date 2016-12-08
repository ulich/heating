
export default class Backend {

    username = 'root'

    getConfigAndStatus() {
        return this.request('getConfigAndStatus')
    }

    setConfig(config) {
        return this.request('setConfig', config)
    }

    getStatus() {
        return this.request('getStatus')
    }

    request(cmd, params) {
        return fetch('/api.lua', {
            method: 'POST',
            body: JSON.stringify({ cmd, params }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.getCredentials()
            })
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw response
                } 
                throw new Error(`HTTP ${response.status} received`)
            }
            return response.json()
        }).then((response) => {
            if (!response.success) {
                throw new Error(`Backend error: ${JSON.stringify(response)}`)
            }
            return response.response
        })
    }

    setPassword(newValue) {
        this.credentials = btoa(`${this.username}:${newValue}`)
        localStorage.credentials = this.credentials
    }

    getCredentials() {
        return this.credentials || localStorage.credentials || btoa(`${this.username}:unknown`)
    }
}

const backend = new Backend()
export {backend}
