import { useCallback } from "react"
import useHttp from "./http.hook"
import { useDispatch, useSelector  } from "react-redux"
import * as selectors from '../selectors'
import { BAD_AUTH } from "../errors"
import { toLogout } from "../redux/actions"


export default function useApi() {
    const token = useSelector(selectors.token)
    const { request } = useHttp()
    const dispath = useDispatch()

    const publicRequest = useCallback(async (queris, data, type) => {
        try {
            return await request(queris, 'POST', data, {}, type)
        } catch(error) { throw error } 
    }, [request])

    const protectedRequest = useCallback(async (queris, data, type) => {
        try {
            return await request(queris, 'POST', data, {Authorization: `Bearer ${token}`}, type)
        } catch(error) { if(error.message === BAD_AUTH) { dispath(toLogout()) } } 
    }, [request, dispath, token])

    const loginUser = async (data) => {
        try { return await publicRequest('api/auth/login', data) }
        catch(error) { console.log(error); return null; } 
    }

    const initialClient = async (data) => {
        try { return await protectedRequest('api/user/set-info-client', data, 'form') }
        catch(error) { console.log(error); return null; } 
    }

    const initialMaster = async (data) => {
        try { return await protectedRequest('api/user/set-info-master', data, 'form') }
        catch(error) { console.log(error); return null; } 
    }

    const loadUser = async () => {
        try { return await protectedRequest('api/user/get') }
        catch(error) { throw error } 
    }

    const infoUser = async (data) => {
        try { return await publicRequest('api/user/info', data) }
        catch(error) { console.log(error); return null } 
    }

    const changeContactUser = async (data) => {
        try { return await protectedRequest('api/user/set-contacts', {...data}) }
        catch(error) { throw error } 
    }

    const getCategories = async () => {
        try { return await publicRequest('/api/info/get-categories') }
        catch(error) { console.log(error); return { categories: [] } }
    }

    const createDevice = async (data) => {
        try { return await protectedRequest('api/device/create', data, 'form') }
        catch(error) { console.log(error); return null } 
    }

    const loadDevices = async () => {
        try { return await protectedRequest('api/device/list') }
        catch(error) { console.log(error); return [] }
    }

    const loadDevice = async (data) => {
        try { return await protectedRequest('api/device/load', data) }
        catch(error) { console.log(error); return null }
    }

    const loadLots = async () => {
        try { return await protectedRequest('api/device/lots') }
        catch(error) { console.log(error); return [] }
    }

    const placeBet = async (data) => {
        try { return await protectedRequest('api/device/set-bet', data) }
        catch(error) { console.log(error); return [] }
    }

    const getBet = async (data) => {
        try { return await protectedRequest('api/device/get-bet', data) }
        catch(error) { console.log(error); return {} }
    }

    const getBets = async (data) => {
        try { return await protectedRequest('api/device/get-bets', data) }
        catch(error) { console.log(error); return [] }
    }

    const acceptBet = async (data) => {
        try { return await protectedRequest('api/device/accept-bet', data) }
        catch(error) { console.log(error); return [] }
    }

    const cancelBet = async (data) => {
        try { return await protectedRequest('api/device/cancel-bet', data) }
        catch(error) { console.log(error); return [] }
    }

    const getContract = async (data) => {
        try { return await protectedRequest('api/device/get-contract', data) }
        catch(error) { console.log(error); return [] }
    }

    const acceptContract = async (data) => {
        try { return await protectedRequest('api/device/accept-contract', data) }
        catch(error) { console.log(error); return {} }
    }

    const loadOrders = async (data) => {
        try { return await protectedRequest('api/device/orders', data) }
        catch(error) { console.log(error); return [] }
    }

    const acceptDevice = async (id) => {
        try { return await protectedRequest('api/device/accept', { id }) }
        catch(error) { console.log(error); return [] }
    }

    return { 
        loginUser,
        loadUser,
        initialClient,
        initialMaster,
        changeContactUser,
        getCategories,
        createDevice,
        loadDevices,
        loadLots,
        placeBet,
        getBets,
        getBet,
        acceptBet,
        cancelBet,
        getContract,
        acceptContract,
        loadOrders,
        loadDevice,
        infoUser,
        acceptDevice,
    }
}