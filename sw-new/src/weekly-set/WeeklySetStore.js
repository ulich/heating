import {extendObservable} from 'mobx';

class WeeklySetStore {
    constructor() {
        const sets = [{
            name: "Immer an",
            weekdays: [
                // first is monday, last is sunday. server returns first stunday, last saturday!
                [{start: "00:00", end: "24:00"}, {start: "00:00", end: "24:00"}],
                [{start: "00:00", end: "24:00"}],
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}]
            ]
        }, {
            name: "Immer aus",
            weekdays: [
                // first is monday, last is sunday. server returns first stunday, last saturday!
                [], [], [], [], [], [], []
            ]
        }]

        extendObservable(this, {
            sets,
            activeSetIndex: 1
        })
    }
}

let weeklySetStore = new WeeklySetStore()
export {weeklySetStore}
