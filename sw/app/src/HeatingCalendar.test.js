import {getNextHeatingTriggerDate} from './HeatingCalendar';

describe("HeatingCalendar", () => {
    
    beforeEach(() => {
        Date.now = jest.fn()
    })

    it("returns the heating time of today", () => {
        Date.now.mockReturnValue(timestamp("2017-01-01 06:00:00")) // a sunday

        const cfg = config({ sunday: [{ start: "08:00", stop: "10:00" }, { start: "18:00", stop: "22:00" }] })

        expect(getNextHeatingTriggerDate(cfg)).toEqual(timestamp("2017-01-01 08:00:00"))
    })

    it("returns heating time of next week if today is monday and sunday is the only day of heating", () => {
        Date.now.mockReturnValue(timestamp("2017-01-02 00:00:00")) // a monday

        const cfg = config({ sunday: [{ start: "08:00", stop: "22:00" }] })

        expect(getNextHeatingTriggerDate(cfg)).toEqual(timestamp("2017-01-08 08:00:00"))
    })

    it("returns second heating time of today if the first one is already passed", () => {
        Date.now.mockReturnValue(timestamp("2017-01-01 09:00:00")) // a sunday

        const cfg = config({ sunday: [{ start: "08:00", stop: "10:00" }, { start: "18:00", stop: "22:00" }] })

        expect(getNextHeatingTriggerDate(cfg)).toEqual(timestamp("2017-01-01 18:00:00"))
    })

    it("returns heating time of tuesday if todays heating time is already passed and there is none for monday", () => {
        Date.now.mockReturnValue(timestamp("2017-01-01 09:00:00")) // a sunday

        const cfg = config({ sunday: [{ start: "08:00", stop: "10:00" }], tuesday: [{ start: "08:00", stop: "10:00" }] })

        expect(getNextHeatingTriggerDate(cfg)).toEqual(timestamp("2017-01-03 08:00:00"))
    })

    it("goes through the next 8 days to also find a heating time of e.g. sunday in one week", () => {
        Date.now.mockReturnValue(timestamp("2017-01-01 09:00:00")) // a sunday

        const cfg = config({ sunday: [{ start: "08:00", stop: "10:00" }] })

        expect(getNextHeatingTriggerDate(cfg)).toEqual(timestamp("2017-01-08 08:00:00"))
    })
})

function config(weekdays) {
    return { 
        weekly: {
            activeSet: 0,
            sets: [{
                weekdays: [
                    weekdays.sunday || [],
                    weekdays.monday || [],
                    weekdays.tuesday || [],
                    weekdays.wednesday || [],
                    weekdays.thursday || [],
                    weekdays.friday || [],
                    weekdays.saturday || []
                ]
            }]
        },
        specials: []
    }
}

function timestamp(dateString) {
    return new Date(dateString).getTime()
}
