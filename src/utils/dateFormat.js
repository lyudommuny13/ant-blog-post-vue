import moment from "moment-timezone";

export function formatDate(date) {
    return moment(date)
        .tz('Asia/Phnom_Penh')
        .format('DD MMM YYYY')
}