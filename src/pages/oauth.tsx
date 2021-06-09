import React, { useEffect } from "react";

export function OauthPage(){
    useEffect(() => {
        const prev : string = localStorage.getItem("prev") || '/';
        window.location.href = prev;
        localStorage.removeItem("prev");
    }, [])

    return(
        <>
        </>
    )
}
export default OauthPage;