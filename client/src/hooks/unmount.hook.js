import { useEffect, useRef } from "react"

export default function useUnmount(fun) {
    const unmount = useRef(fun)

    useEffect(() => unmount.current(), [])
}