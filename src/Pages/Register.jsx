import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../helper";
import { loginAction } from "../redux/actions/usersActions";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";

const RegisterPage = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const handleRegister = async () => {
        try {
            if (username == "" || email == "" || password == "" || confPassword == "") {
                alert("Fill in all form")
            } else {
                if (password != confPassword) {
                    alert("Password not match")
                } else if (email.includes("@")) {
                    let res = await Axios.post(`${API_URL}/users`, {
                        email,
                        username,
                        password,
                        status: "unverified",
                        role: "user",
                        fullname: "",
                        bio: "",
                        profilePicture: "",
                        likes: []
                    })

                    // auto login ketika register berhasil
                    console.log("data yg teregister", res.data)
                    // dispatch(loginAction(res.data))
                    navigate("/")

                } else {
                    alert("Email wrong")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            className="row container mx-auto pt-3"
        >
            <div
                className="d-none d-md-flex col-md-6 order-md-1 border-1"
            >
                <h1>Carousel gambar?</h1>
            </div>
            <div
                className="col-12 col-md-6 order-md-2"
            >
                <Form
                    className="text-start"
                >
                    <FormGroup row>
                        <Label
                            sm={2}
                            for="inputEmail"
                        >
                            Email
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="inputEmail"
                                placeholder="Insert your email"
                                type="text"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            sm={2}
                            for="inputUserName"
                        >
                            Username
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="inputUserName"
                                placeholder="Insert your username"
                                type="text"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            sm={2}
                            for="inputPassword"
                        >
                            Password
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="inputPassword"
                                placeholder="Insert your password"
                                type="password"
                            />
                            <p
                                className="mb-0"
                                style={{ fontWeight: "lighter", fontSize: "12px" }}
                            >
                                Password should contain at least 8 characters including an uppercase letter, a symbol, and a number
                            </p>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        row
                        className="align-items-center"
                    >
                        <Label
                            sm={2}
                            for="inputConfirmPassword"
                        >
                            Confirm password
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="inputConfirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                            />
                        </Col>
                    </FormGroup>
                    <Button
                        className="col-12 mb-3"
                        color="success"
                    >
                        Register
                    </Button>
                </Form>
            </div>
        </div >
    )

}

export default RegisterPage;