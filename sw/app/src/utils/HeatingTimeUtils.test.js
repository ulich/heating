import {getNextPlannedHeatingChange} from './HeatingTimeUtils'

describe("HeatingTimeUtils", () => {

    describe("getNextPlannedHeatingChange", () => {

        it("returns the next change from now", () => {
            const now = new Date(0)  // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
            const cfg = config([], [], [], [], ["01:00"], [], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(0)
        })

        it("returns the next change from today", () => {
            const now = new Date(0)  // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
            const cfg = config([], [], [], [], ["02:00"], [], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(hours(1))
        })

        it("returns the next change from tomorrow", () => {
            const now = new Date(0)  // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
            const cfg = config([], [], [], [], [], ["02:00"], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(hours(1) + hours(24))
        })

        it("returns the next change in 6 days", () => {
            const now = new Date(0)  // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
            const cfg = config([], [], [], ["02:00"], [], [], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(hours(1) + hours(6 * 24))
        })

        it("returns the next change in 6 days, 23h, 59m", () => {
            const now = new Date(0)  // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
            const cfg = config([], [], [], [], ["00:59"], [], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(hours(7 * 24) - minutes(1))
        })

        it("returns the next change in from today even if there is another one today but already passed", () => {
            const now = new Date(0)  // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
            const cfg = config([], [], [], [], ["00:59", "02:00"], [], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(hours(1))
        })

        it("returns null if there is no planned change", () => {
            const now = new Date(0)
            const cfg = config([], [], [], [], [], [], [])

            expect(getNextPlannedHeatingChange(cfg, now)).toBe(null)
        })

        function config() {
            return {
                weekly: {
                    sets: [{
                        weekdays: arguments
                    }],
                    activeSet: 0
                }
            }
        }

        function minutes(num) {
            return num * 60 * 1000
        }

        function hours(num) {
            return minutes(num) * 60
        }

    })

})
