import React, { useEffect } from "react";
import { useRouter } from 'next/router';

export default function OauthPage(){
    const router = useRouter();
    useEffect(() => {
        // const referrer = document.referrer; // 이전 경로 저장
        // console.log(referrer);     
        router.push('/');
    }, [])

    return(
        <>
        </>
    )
}
