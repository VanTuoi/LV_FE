import { useState, useEffect } from "react";


const useSessionStorage = () => {

    const SetItemSessionStorage = (name, value) => {
        useEffect(() => {
            sessionStorage.setItem(name, value)
        }, [])
    }

    const GetItemSessionStorage = (name) => {
        const [value, setValue] = useState('')

        useEffect(() => {
            setValue(sessionStorage.getItem(name))
        }, [])

        return value
    }

    const RemoveAllItemSessionStorage = () => {
        sessionStorage.clear();
    }

    return { SetItemSessionStorage, GetItemSessionStorage, RemoveAllItemSessionStorage }
}

export default useSessionStorage