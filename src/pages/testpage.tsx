import React, { useContext } from 'react'
import { myContext } from './login';
import { User } from '../types/logintypes';
import {NextApiRequest, NextApiResponse} from 'next';


export default function Homepage(req : NextApiRequest, res : NextApiResponse) {

    const userObject = useContext(myContext) as User;
    console.log(userObject);
    console.log(userObject.username);
    console.log(req.body);
    console.log(res);

    return (
        <div>
            {
                userObject ? (
                    <h1>Welcome back {userObject.username}</h1>
                ) : (
                        <h1>이제 제발 좀 되라..</h1>
                    )
            }
        </div>
    )
}