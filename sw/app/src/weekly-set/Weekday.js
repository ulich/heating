
export function mondayFirst(weekdays) {
    const weekdaysShallowCopy = weekdays.slice()
    weekdaysShallowCopy.push(weekdaysShallowCopy.shift())
    return weekdaysShallowCopy
}

const weekdayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
export {weekdayNames}
