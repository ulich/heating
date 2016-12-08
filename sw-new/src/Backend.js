
export default class Backend {

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
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`Error: HTTP ${response.status} received`)
            }
            return response.json()
        }).then((response) => {
            if (!response.success) {
                throw new Error(`Backend error: ${JSON.stringify(response)}`)
            }
            return response.response
        })
    }
}

const backend = new Backend()
export {backend}
