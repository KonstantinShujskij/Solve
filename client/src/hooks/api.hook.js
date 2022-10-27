import { useCallback } from "react"
import useHttp from "./http.hook"
import { useDispatch, useSelector  } from "react-redux"
import * as selectors from '../selectors'
import { BAD_AUTH } from "../errors"
import { toLogout } from "../redux/actions"
import useAlert from "./alert.hook"
import { LOAD_COUNT } from "../const"


export default function useApi() {
    const token = useSelector(selectors.token)
    const dispath = useDispatch()

    const { request } = useHttp()
    const { pushError } = useAlert()   
    
    const auctionFilter = useSelector(selectors.auctionFilter) 
    const ordersFilter = useSelector(selectors.ordersFilter)
    

    const publicRequest = useCallback(async (queris, data, type) => {
        try { return await request(queris, 'POST', data, {}, type) } 
        catch(error) { 
            pushError(error.message)
            throw error 
        } 
    }, [request, pushError])

    const protectedRequest = useCallback(async (queris, data, type) => {
        try { return await request(queris, 'POST', data, {Authorization: `Bearer ${token}`}, type) }
        catch(error) { 
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

    const placeBet = async (deviceId, price, description) => {
        try { return await protectedRequest('api/device/set-bet', {deviceId, price, description}) }
        catch(error) { return null }
    }

    const sendDevice = async (id, master) => {
        try { return await protectedRequest('api/device/send', {id, master}) }
        catch(error) { return null }
    }

    //-------------------------Complited and coment

    //Запрос меняет аватар пользователя, необходимо передать файл 
    const changeAvatar = async (avatar) => {
        const form = new FormData()
        form.append('avatar', avatar)

        try { return await protectedRequest('api/user/set-avatar', form, 'form') }
        catch(error) { return false }
    }

    //Запрос получает новый телефон, и если он изменен отправляет sms для подтврерждения 
    //Возвращает token если телефон новый и exist если телефон остался прежднем
    //Необходимо передать номер телефона в международном формате
    const changePhone = async (phone) => {
        try { return await protectedRequest('api/user/set-phone', {phone}) }
        catch(error) { return false }
    }

    //Запрос подтверждает изменение телефона пользователя, необходимо передать токен и код
    const confirmPhone = async (codeToken, code) => {
        try { return await protectedRequest('api/user/confirm-phone', {token: codeToken, code}) }
        catch(error) { return false }
    }

    //Запрос меняет контакты социальных сетей, необходимо передать словарь, 
    //где ключ - название соц. сети, а значение - контакт 
    const changeContact = async (contacts) => {
        try { return await protectedRequest('api/user/set-contacts', {...contacts}) }
        catch(error) { return false } 
    }


    //Запрос меняет рабочий статус устройста, необходимо передать индентификатор и новый статус
    const changeDeviceStatus = async (id, status) => {
        try { return await protectedRequest('api/device/change-status', {id, status}) }
        catch(error) { return false } 
    }

    //Запрос меняет рабочий заметку устройста, необходимо передать индентификатор и новую заметку 
    const changeDeviceNotes = async (id, notes) => {
        try { return await protectedRequest('api/device/change-notes', {id, notes}) }
        catch(error) { return false } 
    }

    
    // Загрузка списков устройств

    const getDevices = async (skip=0, limit=LOAD_COUNT) => {
        try { return await protectedRequest('api/devices/devices', {limit, skip}) }
        catch(error) { return [] }
    }

    const getAuctions = async (skip=0, limit=LOAD_COUNT) => {
        try { return await protectedRequest('api/devices/auctions', {limit, skip}) }
        catch(error) { return [] }
    } 

    const getLots = useCallback(async (skip=0, limit=LOAD_COUNT) => {
        try { return await protectedRequest('api/devices/lots', {filter: auctionFilter, limit, skip}) }
        catch(error) { return [] }
    }, [protectedRequest, auctionFilter])

    const getOrders = useCallback(async (skip=0, limit=LOAD_COUNT) => {
        try { return await protectedRequest('api/devices/orders', {filter: ordersFilter, limit, skip}) }
        catch(error) { return [] }
    }, [protectedRequest, ordersFilter])

    const getClaims = async (skip=0, limit=LOAD_COUNT) => {
        try { return await protectedRequest('api/devices/claims', {limit, skip}) }
        catch(error) { return [] }
    }


    //Запрос возвращает контракт, необходимо передать индентификатор 
    const loadContract = async (id) => {
        try { return await protectedRequest('api/device/get-contract', {id}) }
        catch(error) { return null }
    }


    //Запрос подтверждает контракт, необходимо передать id контракта, установленую цену и описание
    const acceptContract = async (id, price, data) => {
        try { return await protectedRequest('api/device/accept-contract', {id, price, data}) }
        catch(error) { return false }
    }

    //Запрос подтверждает заявку, необходимо передать индинтефикатор устройства
    const acceptClaim = async (id) => {
        try { return await protectedRequest('api/device/accept-claim', {id}) }
        catch(error) { return false }
    }

    //Запрос отклоняет заявку, необходимо передать индинтефикатор устройства
    const cancelClaim = async (id) => {
        try { return await protectedRequest('api/device/cancel-claim', {id}) }
        catch(error) { return false }
    }

    //Запрос отправляет девайс на аукцион, необходимо передать индетификатор
    const pushAuction = async (id) => {
        try { return await protectedRequest('api/device/push-auction', {id}) }
        catch(error) { return false }
    }   

    
    return { loginUser, loadUser, initialClient, initialMaster, getCategories, createDevice, loadLots, 
        acceptBet, findMasters, loadOrders,
        loadBets, placeBet, loadDevice, loadBet, infoUser,      
        cancelBet, acceptDevice, sendDevice, cancelClaim,
        acceptClaim, 

        //coplited and coment 
        changeAvatar,
        changePhone,
        changeContact,

        confirmPhone,

        changeDeviceStatus,
        changeDeviceNotes,
        
        getDevices,
        getAuctions,
        getOrders,
        getClaims,
        getLots, 

        loadContract,
        acceptContract,

        pushAuction,
    }
}