
export default class Backend {

    getConfigAndStatus() {
        return this.request('getConfigAndStatus')
            .then((response) => {
                response.config.weekly.sets.forEach((set) => {
                    // the backend stores sunday as first element, move sunday to the end so monday is first
                    set.weekdays.push(set.weekdays.shift())
                })
                return response
            })
    }

    request(command) {
        return fetch(`${this.baseUrl}/api.lua`, {
            method: 'POST',
            body: JSON.stringify({ cmd: command }),
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

    get baseUrl() {
        return process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:4000` : ''
    }

}

const backend = new Backend()
export {backend}
