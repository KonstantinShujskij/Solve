export const AUTH_REG_SCREEN = 'AUTH:REG_SCREEN'
export const AUTH_LOG_SCREEN = 'AUTH:LOG_SCREEN'

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

export const SOCIAL = {
    telegram: { name: 'telegram', icon: 'fa-telegram', placeholder: '@user' },
    facebook: { name: 'facebook', icon: 'fa-facebook', placeholder: 'Facebook.com/yourname' },
    whatsapp: { name: 'whatsapp', icon: 'fa-whatsapp-square', placeholder: '+380000000000' },
    instagram: { name: 'instagram', icon: 'fa-instagram-square', placeholder: '@user' }
}

export const BASE_URL = 'http://localhost:5000'

export const MAX_IMAGES = 6

export const MAP_STYLE = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#202c3e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#29446b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#193a55"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
]
