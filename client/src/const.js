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

export const SOCIAL = {
    telegram: { name: 'telegram', icon: 'fa-telegram', placeholder: '@user' },
    facebook: { name: 'facebook', icon: 'fa-facebook', placeholder: 'Facebook.com/yourname' },
    whatsapp: { name: 'whatsapp', icon: 'fa-whatsapp-square', placeholder: '+380000000000' },
    instagram: { name: 'instagram', icon: 'fa-instagram-square', placeholder: '@user' }
}

export const MAX_IMAGES = 6

export const MAP_STYLE = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]