import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import * as yup from "yup";
import { History, LocationState } from "history";

type RegisterProps = {
    history: History<LocationState>;
};

type FormValues = {
    name: string;
    email: string;
    repeatEmail: string;
    password: string;
    repeatPassword: string;
    city?: string;
    company?: string;
};
const RegisterComponent: React.FC<RegisterProps> = ({}) => {
    const [registerData, setRegisterData] = useState<FormValues>({
        name: "admin",
        email: "admin@admin.de",
        repeatEmail: "admin@admin.de",
        password: "admin123",
        repeatPassword: "admin123",
        city: "Berlin",
        company: "admin messengers"
    });

    const registerDataSchema = yup.object().shape({
        name: yup.string().min(3),
        email: yup
            .string()
            .email()
            .required(),
        repeatEmail: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .min(8)
            .required(),
        repeatPassword: yup
            .string()
            .min(8)
            .required(),
        city: yup.string(),
        company: yup.string()
    });

    const handleSubmit = (e: any) => {
        console.log("register submit");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="your name"
                    name="name"
                    onChange={handleChange}
                    value={registerData.name}
                />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={registerData.email}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail2">
                    <Form.Label>repeat Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="repeatEmail"
                        onChange={handleChange}
                        value={registerData.repeatEmail}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={registerData.password}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>repeat Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password1"
                        name="repeatPassword"
                        onChange={handleChange}
                        value={registerData.repeatPassword}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                    placeholder="Berlin"
                    name="city"
                    onChange={handleChange}
                    value={registerData.city}
                />
            </Form.Group>
            <Form.Group controlId="formGridCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                    placeholder="Company"
                    name="company"
                    onChange={handleChange}
                    value={registerData.company}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default RegisterComponent;