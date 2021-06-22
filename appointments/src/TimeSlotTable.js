import React from 'react'

export const TimeSlotTable = ({
    salonOpensAt,
    salonClosesAt,
    today
}) => {

    const timeIncrements = (numTimes, startTime, increment) =>
        Array(numTimes)
            .fill([startTime])
            .reduce((acc, _, i) =>
                acc.concat([startTime + (i + increment)]))

    const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
        const totalSlots = (salonClosesAt - salonOpensAt) * 2

        const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
        const increment = 30 * 60 * 1000

        return Array(totalSlots)
            .fill([startTime])
            .reduce((acc, _, i) =>
                acc.concat([startTime + (i * increment)]))
    }

    const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5)

    const timeSlots = dailyTimeSlots(
        salonOpensAt,
        salonClosesAt,
        today
    )

    const weeklyDateValues = (startDate) => {
        const midnight = new Date(startDate).setHours(0, 0, 0, 0)
        const increment = 24 * 60 * 60 * 1000

        return Array(7)
            .fill([midnight])
            .reduce((acc, _, i) =>
                acc.concat([midnight + (i * increment)])
            )
    }

    const dates = weeklyDateValues(today)

    const toShortDate = timestamp => {
        const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ')

        return `${day} ${dayOfMonth}`
    }

    return <table id="time-slots">
        <thead>
            <tr>
                <th />
                {dates.map(d => (
                    <th key={d}>{toShortDate(d)}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                    <th>{toTimeValue(timeSlot)}</th>
                </tr>
            ))}
        </tbody>
    </table>
}