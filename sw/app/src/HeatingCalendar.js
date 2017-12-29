
export function getNextHeatingTriggerDate(config) {
    const nextWeeklyTrigger = getNextWeeklyHeatingTriggerDate(config)
    const nextSpecialStartTime = getNextSpecialHeatingTriggerDate(config)
    
    if (nextSpecialStartTime) {
        return Math.min(nextSpecialStartTime, nextWeeklyTrigger)
    } else {
        return nextWeeklyTrigger
    }
}

function getNextWeeklyHeatingTriggerDate(config) {
    const {weekdays} = config.weekly.sets[config.weekly.activeSet]
    
    const now = new Date(Date.now())
    const startOfToday = startOfDay(now)

    for (let i = 0; i < 8; i++) {
        const weekday = (startOfToday.getDay() + i) % 7
        const heatingTimes = weekdays[weekday]

        for (const heatingTime of heatingTimes) {
            const [hour, minute] = heatingTime.start.split(":")

            const heatingDate = new Date(startOfToday.getTime() + 1000*60*60*24*i)
            heatingDate.setHours(Number(hour))
            heatingDate.setMinutes(Number(minute))

            if (heatingDate.getTime() > now.getTime()) {
                return heatingDate.getTime()
            }
        }
    }
}

function getNextSpecialHeatingTriggerDate(config) {
    const nextSpecialStartTimes = config.specials
        .map(s => s.start)
        .filter(time => time > Date.now())
        .sort((a,b) => a - b)

    return nextSpecialStartTimes[0]
}

function startOfDay(date) {
    const startOfToday = new Date(date)
    startOfToday.setHours(0)
    startOfToday.setMinutes(0)
    startOfToday.setSeconds(0)
    startOfToday.setMilliseconds(0)
    return startOfToday
}
