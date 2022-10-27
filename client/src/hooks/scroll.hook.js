import {useEffect, useRef} from "react"

export default function useScroll(parentRef, childrenRef, callback) {
    const observer = useRef()

    useEffect(() => {
        const target = childrenRef.current
        const options = { root: parentRef.current, rootMargin: '0px', threshold: 0 }

        observer.current = new IntersectionObserver(([target]) => {
            if(target.isIntersecting) { callback() }
        }, options)

        observer.current.observe(childrenRef.current)

        return function () { observer.current.unobserve(target) }        

    }, [parentRef, childrenRef, callback])
}