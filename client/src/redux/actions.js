import { LOGIN, LOGOUT, REMOVE_DEVICES, REMOVE_USER, SET_CAT, SET_CURRENT_DEVICE, SET_DEVICES, SET_USER } from "./types";

export function toLogin(token, userId) {
    return {
        type: LOGIN,
        payload: { token, userId }
    }
}

export function toLogout() {
    return {
        type: LOGOUT
    }
}

export function setCategories(categories) {
    return {
        type: SET_CAT,
        payload: categories
    }
}

export function removeCategories() {
    return {
        type: SET_CAT,
        payload: []
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: { ...user }
    }
}

export function removeUser() {
    return {
        type: REMOVE_USER
    }
}

export function setDevices(devices) {
    return {
        type: SET_DEVICES,
        payload: devices
    }
}

export function removeDevices(devices) {
    return {
        type: REMOVE_DEVICES,
        payload: devices
    }
}

export function setCurrentDevice(device) {
    return {
        type: SET_CURRENT_DEVICE,
        payload: device
    }
}

export function removeCurrentDevice() {
    return {
        type: SET_CURRENT_DEVICE,
        payload: []
    }
}