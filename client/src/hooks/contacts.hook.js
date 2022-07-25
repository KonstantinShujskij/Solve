import useValidationInput from "./input.hook"

const initialValue = {
    telegram: '',
    instagram: '',
    facebook: '', 
    whatsapp: ''
}

export default function useContacts(contacts=initialValue) {
    const telegram = useValidationInput(contacts.telegram)
    const instagram = useValidationInput(contacts.instagram)
    const facebook = useValidationInput(contacts.facebook)
    const whatsapp = useValidationInput(contacts.whatsapp)

    return { 
        values: {
            telegram: telegram.value,
            instagram: instagram.value,
            facebook: facebook.value,
            whatsapp: whatsapp.value,
        },
        bind: { contacts: { telegram, instagram, facebook, whatsapp } }
    }
}