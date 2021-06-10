import React, { createContext, useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';

export default function Context(props: any) {
    const [userObject, setUserObject] = useState<any>();
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_GET_USER as string, { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data) {
                //console.log(res.data);
                setUserObject(res.data);
            }
        })
    }, [])

    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}
export const myContext = createContext({});