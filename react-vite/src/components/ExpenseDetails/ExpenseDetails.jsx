import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function ExpenseDetails() {
    const dispatch = useDispatch()

        useEffect(()=> {
            dispatch()
        })
    return (
        <h1>Hello</h1>
    )
}
