import React, { useState } from "react";
import { History, LocationState } from "history";
import * as yup from "yup";
import { Button, Form, Container } from "react-bootstrap";
import { ValidationError } from "../models/ValidationError.model";
import ValidationErrorMessage from "../utils/validationError";

type LoginComponmentProps = {
    history: History<LocationState>;
};

type FormValues = {
    email: string;
    password: string;
};

const LoginComponment: React.FC<LoginComponmentProps> = ({ history }) => {
    const [loginData, setLoginData] = useState<FormValues>({
        email: "admin@admin.des",
        password: "admin123"
    });
    const [validationError, setValidationError] = useState<ValidationError>({
        error: false
    });

    const loginDataSchema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .min(8)
            .required()
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        e.preventDefault();
        const loginDataJSON = JSON.stringify(loginData);
        try {
            await loginDataSchema.validate(loginData, { abortEarly: false });
            const data = await fetch("/userApi/auth", {
                method: "POST",
                body: loginDataJSON,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const resp = await data.json();

            if (data.status === 401) {
                throw new Error(resp.message);
            }
            if (data.status === 200) {
                // Put resp in context
                history.push("/");
            } else {
                throw new Error(resp);
            }
        } catch (error) {
            let message: string[];
            if (error && error.name && error.name === "ValidationError") {
                message = error.errors;
                setValidationError({ error: true, errorMessage: message });
            } else if (error && error.message) {
                message = [error.message];
                setValidationError({ error: true, errorMessage: message });
            } else {
                setValidationError({
                    error: true,
                    errorMessage: ["Oops something went wrong"]
                });
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <Container>
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
                <ValidationErrorMessage
                    error={validationError}
                ></ValidationErrorMessage>
                <Button variant="primary" type="submit" className="float-right">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default LoginComponment;
