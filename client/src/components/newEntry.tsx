import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

const NewEntryComponents: React.FC<RouteComponentProps> = props => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
            const isAuth = await fetch(
                "http://localhost:3000/userApi/checkToken"
            );
            if (isAuth.status === 401) {
                props.history.push("/");
            }
            const resp = await fetch("http://localhost:3000/index/newEntry", {
                credentials: "include"
            });
            const data = await resp.text();
            setMessage(data);
        })();
    }, [props.history]);

    return (
        <>
            <h1>Secret</h1>
            <div>message: {message}</div>
        </>
    );
};

export default NewEntryComponents;
