var moment = require('moment');
function formattingMessage(username, text) {
    return {
        username: username,
        text: text,
        time: moment().format('h:mm a')
    };
}
module.exports = formatMessage;
