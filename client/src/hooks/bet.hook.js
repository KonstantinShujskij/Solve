import useValidationInput from "./input.hook"

export default function useBet(initialPrice = '', initialDesc = '') {
    const price = useValidationInput(initialPrice)
    const description = useValidationInput(initialDesc)
    
    return { 
        price: price.value, 
        description: description.value, 
        bind: { price, description } 
    }
}