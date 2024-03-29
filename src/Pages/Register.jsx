import React, { useState, useEffect } from "react";
import '../index.scss';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../helper";
import { loginAction } from "../redux/actions/usersActions";
import { Form, FormGroup, Label, Input, InputGroup, InputGroupText, Button, Col } from "reactstrap";
import registPic from "../Assets/SampleMediaPosts/violet-register.jpg";
import { toast } from "react-toastify";
import MetaDecorator from "../Components/MetaDecorator";

const RegisterPage = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { usernameSignedIn } = useSelector((state) => {
        return {
            usernameSignedIn: state.usersReducer.username,
        }
    })

    const [dbUsers, setDbUsers] = useState([]);

    const [username, setUsername] = useState("");
    const [usedUsername, setUsedUsername] = useState("");

    const [email, setEmail] = useState("");
    const [emailValidity, setEmailValidity] = useState("");

    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [passStrength, setPassStrength] = useState("");

    const [buttonStatus, setButtonStatus] = useState(false);

    const strongRegexPassword = new RegExp("^(((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])))(?=.{8,})")
    const wrongRegexPassword = new RegExp("^((?=.*[a-z])|(?=.*[0-9])|(?=.*[A-Z])|(?=.*[!@#\$%\^&\*])|((?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])))(?=.{8,})")

    const validRegexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = () => {
        Axios.get(`${API_URL}/users/get`)
            .then((response) => {
                // console.log("isi dbUsers", response.data)
                setDbUsers(response.data)
            }).catch((error) => { console.log(error) })
    };

    /////// REGISTRATION FUNCTIONS AND ITS SUPPORTING FUNCTIONS ///////
    const handlePassword = (value) => {
        // console.log(value)
        setPassword(value)

        if (strongRegexPassword.test(value)) {
            setPassStrength("✅ Strong Password")
        }
        else if (wrongRegexPassword.test(value)) {
            setPassStrength("❌ Password needs to contain at least 1 UPPERCASE, 1 number, and a symbol")
        }
        // console.log(passStrength)
    }

    const handleUsername = (value) => {
        // console.log(value)
        setUsername(value)
    }

    const handleEmail = (value) => {
        // console.log(value)
        setEmail(value)

        if (validRegexEmail.test(email)) {
            setEmailValidity("✅ Valid Email")
        } else {
            setEmailValidity("❌ Invalid Email")
        }
    }

    const handleReset = () => {
        setPassStrength("");
        setUsedUsername("");

        if (emailValidity != "✅ Valid Email") {
            setEmailValidity("");
        }
    }

    const handleRegister = async () => {

        try {
            if (username == "" || email == "" || password == "" || confPassword == "") {
                // console.log("Fill in all form")
                toast.warn("Fill in all form")
                setButtonStatus(false);
            } else {
                if (password.length < 8) {
                    // console.log("Password should contain at least 8 characters")
                    toast.warn("Password should contain at least 8 characters");
                    handleReset();

                    setButtonStatus(false);
                } else if (passStrength == "❌ Password needs to contain at least 1 UPPERCASE, 1 number, and a symbol") {
                    // console.log("Password cannot contain lowercase letter")
                    toast.warn("Password needs to contain at least 1 UPPERCASE, 1 number, and a symbol");
                    handleReset();

                    setButtonStatus(false);
                } else if (password != confPassword) {
                    // console.log("Password not match")
                    toast.warn("Password not match");
                    handleReset();

                    setButtonStatus(false);
                } else if (dbUsers.find(val => val.username == username)) {
                    // console.log("Username already used")
                    toast.warn("Username already used");
                    setUsedUsername("❌ Used Username");
                    handleReset();

                    setButtonStatus(false);
                } else if (dbUsers.find(val => val.email == email)) {
                    // console.log("Email already used")
                    toast.warn("Email already used");
                    setEmailValidity("❌ Used Email");
                    handleReset();

                    setButtonStatus(false);
                } else if (emailValidity == "✅ Valid Email") {

                    setButtonStatus(true)

                    let res = await Axios.post(`${API_URL}/users/regis`, {
                        email,
                        username,
                        password,
                        status: "unverified",
                        role: "user",
                        fullname: "",
                        bio: "",
                        profilePicture: ""
                    })

                    if (res.data.success) {
                        toast.success("Registration successful, account verification link has been sent to your email");

                        // console.log("data yg teregister", res.data);

                        localStorage.setItem("tokenIdUser", res.data.token);
                        dispatch(loginAction(res.data));
                        navigate("/", { replace: true });
                        handleReset();

                        setButtonStatus(false);
                    }

                } else {
                    // console.log("❌ Invalid Email")
                    toast.warn("❌ Invalid Email");
                    handleReset();

                    setButtonStatus(false);
                }
            }

        } catch (error) {
            console.log(error);
            setButtonStatus(false);
        }
    }

    const [visibleForm, setVisibleForm] = useState({
        type: "password",
        text: "Show"
    })

    const handleVisible = () => {
        if (visibleForm.type === "password") {
            setVisibleForm({
                type: "text",
                text: "Hide"
            })
        } else {
            setVisibleForm({
                type: "password",
                text: "Show"
            })
        }
    }

    return (
        <div
            className="row container mx-auto py-3"
            style={{ minHeight: "100vh" }}
        >

            {/* title Leiden | Register */}
            <MetaDecorator
                title="Leiden | Register"
                description="Leiden - Welcome to Leiden Family"
                contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_HOME.jpg`}
            />

            {usernameSignedIn
                ?
                <>
                    <div className="col-12">
                        <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                            search_off
                        </span>
                        <h4>403 - Your account already registered and signed in</h4>
                    </div>
                </>
                :
                <>
                    <div
                        className="d-none d-md-flex col-md-6 order-md-1"
                    >
                        <img
                            src={registPic}
                            alt=""
                            width="60%"
                            className="mx-auto"
                        />
                    </div>
                    <div
                        className="col-12 col-md-6 order-md-2"
                    >
                        <Form
                            className="text-start"
                        >
                            <FormGroup
                                row
                                className="gen_font_content"
                            >
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
                                        onChange={(e) => handleEmail(e.target.value)}
                                    />
                                    <p
                                        className="mb-0"
                                        style={{ fontWeight: "bold", fontSize: "12px" }}
                                    >
                                        {emailValidity}
                                    </p>
                                    <p
                                        className="mb-0"
                                        style={{ fontWeight: "lighter", fontSize: "12px" }}
                                    >
                                        Account verification link will be sent to this email once the registration is completed.
                                    </p>
                                </Col>
                            </FormGroup>
                            <FormGroup
                                row
                                className="gen_font_content"
                            >
                                <Label
                                    sm={2}
                                    for="inputUsername"
                                >
                                    Username
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="inputUsername"
                                        placeholder="Insert your username"
                                        type="text"
                                        onChange={(e) => handleUsername(e.target.value)}
                                    />
                                    <p
                                        className="mb-0"
                                        style={{ fontWeight: "bold", fontSize: "12px" }}
                                    >
                                        {usedUsername}
                                    </p>
                                </Col>
                            </FormGroup>
                            <FormGroup
                                row
                                className="gen_font_content"
                            >
                                <Label
                                    sm={2}
                                    for="inputPassword"
                                >
                                    Password
                                </Label>
                                <Col sm={10}>
                                    <InputGroup>
                                        <Input
                                            id="inputPassword"
                                            placeholder="Insert your password"
                                            type={visibleForm.type}
                                            onChange={(e) => handlePassword(e.target.value)}
                                        />
                                        <InputGroupText
                                            className="btn btn-secondary"
                                            onClick={handleVisible}
                                        >
                                            {visibleForm.text}
                                        </InputGroupText>
                                    </InputGroup>
                                    <p
                                        className="mb-0"
                                        style={{ fontWeight: "lighter", fontSize: "12px" }}
                                    >
                                        Password should contain at least 8 characters including an uppercase letter, a symbol (!@#$%^*), and a number.
                                    </p>
                                    <p
                                        className="mb-0"
                                        style={{ fontWeight: "bold", fontSize: "12px" }}
                                    >
                                        {passStrength}
                                    </p>
                                </Col>
                            </FormGroup>
                            <FormGroup
                                row
                                className="align-items-center gen_font_content"
                            >
                                <Label
                                    sm={2}
                                    for="inputConfirmPassword"
                                >
                                    Confirm password
                                </Label>
                                <Col sm={10}>
                                    <InputGroup>
                                        <Input
                                            id="inputConfirmPassword"
                                            placeholder="Confirm your password"
                                            type={visibleForm.type}
                                            onChange={(e) => setConfPassword(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <Button
                                className="col-12 mb-3 gen_btn_success"
                                color="success"
                                onClick={handleRegister}
                                disabled={buttonStatus}
                            >
                                Register
                            </Button>
                        </Form>
                    </div>
                </>
            }


        </div >
    )

}

export default RegisterPage;