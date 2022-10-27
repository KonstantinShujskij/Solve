import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../hooks/api.hook'
import '../styles/device.css'
import useUnmount from '../hooks/unmount.hook'
import useValidationInput from '../hooks/input.hook'
import BackSection from '../sections/BackSection'
import Logo from '../components/Logo'
import useAlert from '../hooks/alert.hook'
import MenuSection from '../sections/MenuSections'
import Contract from '../components/Contract'

function ContractPage() {
    const { loadContract, acceptContract } = useApi()
    const { pushMess } = useAlert()
    const params = useParams()

    const [contract, setContract] = useState()
    
    const price = useValidationInput('')
    const terms = useValidationInput('')

    const load = () => { loadContract(params.id).then((contract) => setContract(contract)) }

    useUnmount(load)

    const acceptHandler = () => {
        acceptContract(contract.device, price.value, terms.value).then((res) => {
            if(!res) { return }

            pushMess('Вы согласились с условиями контракта')
            load()
        })
    }

    return (
        <div className='container contract-page'>
            <BackSection>
                <Logo />
            </BackSection>
            <div className='title contract-title'>Контракт</div>

            <div className='list'>
                {(contract && <Contract contract={contract} price={price} terms={terms} />)}
                
                <div className='content mb-auto'>
                    {(contract && (!contract.clientAccept || !contract.masterAccept) && 
                        <button className='w-100 button' onClick={acceptHandler}>Подписать</button>
                    )}                
                </div>
            </div>

            <MenuSection className='mt-auto' />
        </div>
    )
}

export default ContractPage
