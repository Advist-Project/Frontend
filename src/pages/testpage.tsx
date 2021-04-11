import React, { useContext } from 'react'
import { myContext } from './login';
import { User } from '../types/logintypes';

export default function Homepage() {

    const userObject = useContext(myContext) as User;

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
