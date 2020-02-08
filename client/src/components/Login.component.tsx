import React, { useState } from "react";
import { History, LocationState } from "history";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";

type LoginComponmentProps = {
    history: History<LocationState>;
};

type FormValues = {
    email: string;
    password: string;
};

const LoginComponment: React.FC<LoginComponmentProps> = ({ history }) => {
    const [loginData, setLoginData] = useState<FormValues>({
        email: "admin@admin.de",
        password: "admin"
    });

    const loginDataSchema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required(),
        password: yup.string().required()
    });

    const handleSubmit = async (e: any) => {
        console.log("submit");
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
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={loginData.email}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={loginData.password}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default LoginComponment;
