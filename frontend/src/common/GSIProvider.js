import React, { useEffect, useState } from "react";
import { loadGoogleScript } from "../lib/GSIScript";

function GSIProvider({ children }) {
    const [isGSILoad, setIsGSILoad] = useState(false);

    useEffect(() => {
        loadGoogleScript().then(() => {
            setIsGSILoad(true);
        });
    }, [isGSILoad]);

    return (
        <div>
            {isGSILoad && children}
        </div>
    );
}

export default GSIProvider;