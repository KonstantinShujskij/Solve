export const token = (state) => state.app.token
export const userId = (state) => state.user._id

export const categories = (state) => state.app.static.categories

export const userConfirm = (state) => !!state.user.phone
export const userCompletely = (state) => state.user.info
export const userType = (state) => state.user.type
export const user = (state) => state.user

export const devices = (state) => state.devices
export const device = (id) => ((state) => state.devices[id])
export const currentDevice = (state) => state.app.selectDevice 

export const mess = (state) => state.alert.mess
export const error = (state) => state.alert.error

export const auctionFilter = (state) => state.filter.auctionFilter
export const ordersFilter = (state) => state.filter.ordersFilter