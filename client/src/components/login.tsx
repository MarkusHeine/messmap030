import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

const LoginComponents: React.FC<RouteComponentProps> = props => {
    const [loginData, setLoginData] = useState({
        email: "admin@admin.de",
        password: "admin"
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const loginDataJSON = JSON.stringify(loginData);
        try {
            await fetch("/userApi/auth", {
                method: "POST",
                body: loginDataJSON,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            props.history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={loginData.email}
                        onChange={onChange}
                        name="email"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        value={loginData.password}
                        name="password"
                        onChange={onChange}
                    />
                </label>
                <button type="submit" value="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default LoginComponents;
