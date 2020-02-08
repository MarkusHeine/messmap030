import React, { useState, useEffect } from "react";

const HomeComponent: React.FC = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
            const resp = await fetch("http://localhost:3000/index", {
                credentials: "include"
            });
            const data = await resp.text();
            setMessage(data);
        })();
    }, []);

    return (
        <>
            <h1>Home</h1>
            <div>message: {message}</div>
        </>
    );
};

export default HomeComponent;
