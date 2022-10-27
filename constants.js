const CREATE = 'CREATE'
const CHECK = 'CHECK'
const CANCLE = 'CANCEL'
const SEARCH = 'SEARCH'
const RESERVE = 'RESERVE'
const PACT = 'PACT'
const CONFIRM = 'CONFIRM'

const MASTER = 'MASTER'
const CLIENT = 'CLIENT'

module.exports = {
    MASTER, 
    CLIENT,

    status: {CREATE, CHECK, CANCLE, SEARCH, RESERVE, PACT, CONFIRM},
    deviceStatusList: [RESERVE, PACT, CONFIRM, CHECK, CANCLE],
    orderStatusList: [RESERVE, PACT, CONFIRM],
}
