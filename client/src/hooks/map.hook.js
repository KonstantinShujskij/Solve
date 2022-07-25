import { useCallback, useRef } from 'react';
import { Loader } from 'google-maps'
import { MAP_STYLE } from '../const';

export default function useMap() {
    const loader = useRef(new Loader('AIzaSyAzpRgH2LRFTDYcpQIi6BFy-PSQ76mbU5k'))
    const map = useRef(null)
    const marker = useRef(null)

    const elem = useCallback((elem) => {
        if(elem === null) { return }

        loader.current.load().then(function (google) {
            map.current = new google.maps.Map(elem, {
                center: {lat: 47.82545, lng:  35.16247},
                zoom: 17,
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
                styles: MAP_STYLE
            })

            map.current.addListener("click", (event) => {
                if(marker.current) { marker.current.setMap(null) }

                marker.current = new google.maps.Marker({
                    position: event.latLng,
                    draggable: true,
                    map: map.current,
                })
            })            
        })
    }, [])


    return { elem, marker }
}