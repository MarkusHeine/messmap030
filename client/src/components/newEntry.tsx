import React, { useEffect, useState } from "react";

const NewEntryComponents: React.FC = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
            const resp = await fetch("http://localhost:3000/index/newEntry");
            const data = await resp.text();
            setMessage(data);
        })();
    }, []);

    return (
        <>
            <h1>Secret</h1>
            <div>message: {message}</div>
        </>
    );
};

export default NewEntryComponents;
