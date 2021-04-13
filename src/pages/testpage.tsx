import React, { useContext } from 'react'
import { myContext } from '../context';
import { User } from '../types/logintypes';

export default function Homepage() {

    const userObject = useContext(myContext) as User;

    return (
        <div>
            {
                userObject ? (
                    <h1>Hello {userObject.username}</h1>
                ) : (
                        <h1>비로그인 상태입니다.</h1>
                    )
            }
        </div>
    )
}
