export const code = (value) => {
    const patern = /^\d*$/

    let res = true
    res = res && patern.test(value)
    res = res && (value.length <= 6)
    
    return res
}
