import useValidationInput from "./input.hook"

const initialValue = {
    telegram: '',
    instagram: '',
    viber: '', 
    whatsapp: ''
}

export default function useContacts(contacts=initialValue) {
    const telegram = useValidationInput(contacts.telegram)
    const instagram = useValidationInput(contacts.instagram)
    const viber = useValidationInput(contacts.viber)
    const whatsapp = useValidationInput(contacts.whatsapp)

    return { 
        values: {
            telegram: telegram.value,
            instagram: instagram.value,
            viber: viber.value,
            whatsapp: whatsapp.value,
        },
        bind: { contacts: { telegram, instagram, viber, whatsapp } }
    }
}