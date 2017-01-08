
export function getNextPlannedHeatingChange(cfg, now = new Date()) {
    // 0: sunday, 1: monday, ...
    const currentDayOfWeek = now.getDay()

    // weekdays[0]: sunday, weekdays[1]: monday, ...
    const weekdays = cfg.weekly.sets[cfg.weekly.activeSet].weekdays

    const timestamps = []

    for (let i = 0; i < 7; i++) {
        let dayOfWeek = (currentDayOfWeek + i) % 7

        const heatingTimes = weekdays[dayOfWeek]
        heatingTimes.forEach((heatingTime) => {
            const [hourString, minuteString] = heatingTime.split(":")
            const hour = parseInt(hourString, 10)
            const minute = parseInt(minuteString, 10)

            let timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0).getTime()

            let daysMultiplier = i
            if (i === 0) {
                const minutes = hour * 60 + minute
                const currentMinutes = now.getHours() * 60 + now.getMinutes()
                if (currentMinutes > minutes) {
                    daysMultiplier = 7
                }
            }

            timestamp += daysMultiplier * 24 * 60 * 60 * 1000
            timestamps.push(timestamp)
        })
    }

    return timestamps.length > 0 ? timestamps[0] : null
}
