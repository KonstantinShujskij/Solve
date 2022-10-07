import { useCallback } from "react"
import useHttp from "./http.hook"
import { useDispatch, useSelector  } from "react-redux"
import * as selectors from '../selectors'
import { BAD_AUTH } from "../errors"
import { toLogout } from "../redux/actions"
import useAlert from "./alert.hook"


export default function useApi() {
    const token = useSelector(selectors.token)
    const { request } = useHttp()
    const dispath = useDispatch()
    const { pushError } = useAlert()

    const publicRequest = useCallback(async (queris, data, type) => {
        
        try {
            return await request(queris, 'POST', data, {}, type)
        } catch(error) { 
            pushError(error.message)
            throw error 
        } 
    }, [request, pushError])

    const protectedRequest = useCallback(async (queris, data, type) => {
        try {
            return await request(queris, 'POST', data, {Authorization: `Bearer ${token}`}, type)
        } catch(error) { 
            if(error.message === BAD_AUTH) { dispath(toLogout()) } 
            pushError(error.message)
            throw error
        } 
    }, [request, dispath, pushError, token])

    const loginUser = async (email, password) => {
        try { return await publicRequest('api/auth/login', {email, password}) }
        catch(error) { return null; } 
    }

    const initialClient = async (data) => {
        try { return await protectedRequest('api/user/set-info-client', data, 'form') }
        catch(error) { return null; } 
    }

    const initialMaster = async (data) => {
        try { return await protectedRequest('api/user/set-info-master', data, 'form') }
        catch(error) { return null; } 
    }

    const loadUser = async () => {
        try { return await protectedRequest('api/user/get') }
        catch(error) { throw error } 
    }

    const getCategories = async () => {
        try { return await publicRequest('/api/info/get-categories') }
        catch(error) { return { categories: [] } }
    }

    const createDevice = async (data) => {
        try { return await protectedRequest('api/device/create', data, 'form') }
        catch(error) { return null } 
    }

    const getContract = async (id) => {
        try { return await protectedRequest('api/device/get-contract', {id}) }
        catch(error) { return [] }
    }

    const acceptContract = async (data) => {
        try { return await protectedRequest('api/device/accept-contract', data) }
        catch(error) { return {} }
    }

    const loadOrders = async (data) => {
        try { return await protectedRequest('api/device/orders', data) }
        catch(error) { return [] }
    }

    const findMasters = async () => {
        try { return await protectedRequest('api/user/get-masters', { }) }
        catch(error) { return [] }
    }

    const loadLots = async () => {
        try { return await protectedRequest('api/device/lots') }
        catch(error) { return [] }
    }

    // ---------------------------------------

    const loadBets = async (ids) => {
        try { return await protectedRequest('api/device/load-bets', {ids}) }
        catch(error) { return [] }
    }

    const changeContact = async (data) => {
        try { return await protectedRequest('api/user/set-contacts', {...data}) }
        catch(error) { throw error } 
    }

    const changeAvatar = async (avatar) => {
        const form = new FormData()
        form.append('avatar', avatar)

        try { return await protectedRequest('api/user/set-avatar', form, 'form') }
        catch(error) { return null }
    }

    const changePhone = async (phone) => {
        try { return await protectedRequest('api/user/set-phone', {phone}) }
        catch(error) { return false }
    }

    const getDevices = async () => {
        try { return await protectedRequest('api/device/devices') }
        catch(error) { return [] }
    }

    const getAuctions = async () => {
        try { return await protectedRequest('api/device/auctions') }
        catch(error) { return [] }
    }

    const getLots = async () => {
        try { return await protectedRequest('api/device/lots') }
        catch(error) { return [] }
    }

    const getOrders = async () => {
        try { return await protectedRequest('api/device/orders') }
        catch(error) { return [] }
    }

    const getClaims = async () => {
        try { return await protectedRequest('api/device/claims') }
        catch(error) { return [] }
    }

    const loadDevice = async (id) => {
        try { return await protectedRequest('api/device/load', { id }) }
        catch(error) { return null }
    }

    const loadBet = async (id) => {
        try { return await protectedRequest('api/device/get-bet', { id }) }
        catch(error) { return null }
    }

    const infoUser = async (id) => {
        try { return await publicRequest('api/user/info', { id }) }
        catch(error) { return null } 
    }

    const acceptBet = async (id) => {
        try { return await protectedRequest('api/device/accept-bet', { id }) }
        catch(error) { return [] }
    }

    const cancelBet = async (id) => {
        try { return await protectedRequest('api/device/cancel-bet', { id }) }
        catch(error) { return [] }
    }

    const acceptDevice = async (id, review) => {
        try { return await protectedRequest('api/device/accept', { id, review }) }
        catch(error) { return null }
    }

    const placeBet = async (id, price, description) => {
        try { return await protectedRequest('api/device/set-bet', {id, price, description}) }
        catch(error) { return null }
    }

    const sendDevice = async (id, master) => {
        try { return await protectedRequest('api/device/send', {id, master}) }
        catch(error) { return null }
    }

    // experemetns

    const loadDevices = async () => {
        try { return await protectedRequest('api/device/list') }
        catch(error) { return [] }
    }

    return { 
        loginUser,
        loadUser,
        initialClient,
        initialMaster,
        
        getCategories,
        createDevice,
        loadLots,
        acceptBet,
        getContract,
        acceptContract,
        findMasters,
        loadOrders,
   

        //experements
        loadDevices,


        // complited
        loadBets,
        placeBet,
        changeContact,
        changeAvatar,
        changePhone,
        loadDevice,  
        loadBet,
        infoUser,      
        cancelBet,
        acceptDevice,
        sendDevice,

        getDevices,
        getAuctions,
        getOrders,
        getClaims,
        getLots,
    }
}