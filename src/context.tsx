import React, { createContext, useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';

export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        axios.get("https://criel-db-test.herokuapp.com/user/getuser", { withCredentials: true }).then((res: AxiosResponse) => {
            console.log(res);
            if (res.data) {
                setUserObject(res.data);
            }
        })
    }, [])

    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}
export const myContext = createContext({});