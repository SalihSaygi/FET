import moment from "moment"

export function formattingMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}
