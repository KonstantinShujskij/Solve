export const INFO_PHONE_SCREEN = 'INFO:PHONE_SCREN'
export const INFO_CODE_SCREEN = 'INFO:CODE_SCREEN'
export const INFO_TYPE_SCREEN = 'INFO:TYPE_SCREEN'
export const INFO_CONTACT_SCREEN = 'INFO:CONTACT_SCREEN'
export const INFO_NAME_SCREEN = 'INFO:NAME_SCREEN'
export const INFO_TITLE_SCREEN = 'INFO:TITLE_SCREEN'
export const INFO_CAT_SCREEN = 'INFO:CAT_SCREEN'
export const INFO_MAP_SCREEN = 'INFO:MAP_SCREEN'
export const INFO_PHOTO_SCREEN = 'INFO:PHOTO_SCREEN'

export const CLIENT_LIST_SCREEN = 'CLIENT:LIST_SCREEN'
export const CLIENT_AUCTION_SCREEN = 'CLIENT:AUCTION_SCREEN'

export const SETTINGS_MENU_SCREEN = 'SETTINGS:MENU_SCREEN'
export const SETTINGS_PHONE_SCREEN = 'SETTINGS:PHONE_SCREEN'
export const SETTINGS_CONTACTS_SCREEN = 'SETTINGS:CONTACTS_SCREEN'

export const ICONS = {
    phone: "\ue80e",
    telegram: "\ue801",
    instagram: "\ue818",
    whatsapp: "\ue817",
    viber: "\ue819",
    back: "\ue806",
    close: "\ue808",
    plus: "\ue809",
    mobile: "\ue802",
    mail: "\ue80f",
    lock: "\ue80d",
    facebook: "\ue812",
    twiter: "\ue811",
    google: "\ue810",
    model: "\ue80c",
    circle: "\ue80b",
    place: "\ue80a",
    ok: "\ue800", 
    rightShevron: "\ue803",
    leftShevron: "\ue804",
    search: "\ue805",
    filter: "\ue807",
    info: "\ue813",
    label: "\ue814",
    edit: "\ue815",
    bet: "\ue816",
    coment: "\ue81a"
}

export const SOCIAL = {
    instagram: { name: 'Instagram', icon: ICONS.instagram, placeholder: '@user' },
    telegram: { name: 'Telegram', icon: ICONS.telegram, placeholder: '@user' },
    whatsapp: { name: 'Whatsapp', icon: ICONS.whatsapp, placeholder: '+380000000000' },
    viber: { name: 'Viber', icon: ICONS.viber, placeholder: '+380000000000' }
}

export const FRONT_URL = 'http://localhost:3000'
export const BASE_URL = 'http://localhost:5000'

// export const FRONT_URL = 'http://whatyoydoing.site'
// export const BASE_URL = 'http://whatyoydoing.site'

export const MASTER = 'MASTER'
export const CLIENT = 'CLIENT'

export const MAP_STYLE = [
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    }
]
