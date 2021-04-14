import React, { useContext } from 'react'
import { myContext } from 'Context';
import { User } from '../types/logintypes';
import { useRouter } from 'next/router';
import { Layout } from 'components/layout';

export default function Homepage() {
    const userObject = useContext(myContext) as User;
    const router = useRouter();

    setTimeout(function(){
        router.push('/');
    }, 3000);

    return (
        <Layout>
        <div>
            {
                userObject ? (
                    <>
                    <h1>Hello {userObject.username}</h1>
                    <br/>
                    <h1>3초뒤 메인화면으로 이동합니다.</h1>
                    </>
                ) : (
                        <h1>비로그인 상태입니다. 3초뒤 메인화면으로 이동합니다.</h1>
                    )
            }
        </div>
        </Layout>
    )
}
