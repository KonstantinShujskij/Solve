import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import Loader from '../components/Loader'


function TokenPage() {
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const token = searchParams.get('token')
        const id = searchParams.get('id')
        const isCompletely = searchParams.get('isCompletely') === 'true'? true : false
        window.opener.authenticateCallback(token, id, isCompletely);
        window.close();
    }, [searchParams])

    return (
        <div className="token">
            <Loader></Loader>
        </div>
    );
}

export default TokenPage;
