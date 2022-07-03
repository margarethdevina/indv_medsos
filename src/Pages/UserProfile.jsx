import React, { useState, useEffect } from "react";
import '../index.scss';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from "../helper";
import { loginAction } from "../redux/actions/usersActions";
import { Card, CardImg, CardBody, Button, Input, InputGroup, InputGroupText, Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import CardsInYourPosts from "../Components/CardsInYourPosts/CardsInYourPosts";
import adminPic from "../Assets/SampleProfilePic/Admin.png";
import { ReactComponent as VerifIcon } from '../Assets/IconRef/verified.svg';
import { toast } from "react-toastify";
import MetaDecorator from "../Components/MetaDecorator";

const UserProfilePage = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, fullname, bio, username, email, profilePic, status, likes, posts } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            fullname: state.usersReducer.fullname,
            bio: state.usersReducer.bio,
            username: state.usersReducer.username,
            email: state.usersReducer.email,
            profilePic: state.usersReducer.profilePicture,
            status: state.usersReducer.status,
            likes: state.usersReducer.likes,
            posts: state.postsReducer.posts
        }
    })

    console.log("data state yg masuk page userProfile", id, fullname, bio, username, email, profilePic, status, likes, posts)

    useEffect(() => {
        keepLogin();
        getUsers();
    }, []);

    const keepLogin = () => {
        let token = localStorage.getItem("tokenIdUser")
        if (token) {
            Axios.get(`${API_URL}/users/keep`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    localStorage.setItem("tokenIdUser", res.data.token)
                    dispatch(loginAction(res.data));
                }).catch((error) => {
                    console.log(error);
                })
        }
    }

    // state management
    const [dbUsers, setDbUsers] = useState([]);
    const [selectedEdit, setSelectedEdit] = useState(0);
    const [inputPicture, setInputPicture] = useState(profilePic);
    const [inputFullName, setInputFullName] = useState(fullname);
    const [inputUserName, setInputUserName] = useState(username);
    const [inputBio, setInputBio] = useState(bio);
    const [inputPrevPass, setInputPrevPass] = useState("");
    const [inputNewPass, setInputNewPass] = useState("");
    const [passStrength, setPassStrength] = useState("");
    const [buttonStatus, setButtonStatus] = useState(false);

    const getUsers = () => {
        Axios.get(`${API_URL}/users/get`)
            .then((response) => {
                // console.log("isi dbUsers", response.data)
                setDbUsers(response.data)
            }).catch((error) => { console.log(error) })
    };

    /////// VISIBILITY FUNCTIONS ///////
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

    /////// REGEX FUNCTIONS ///////
    const strongRegexPassword = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    const weakRegexPassword = new RegExp("^(((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})")
    const wrongRegexPassword = new RegExp("^(?=.*[a-z])(?=.{8,})")

    const validRegexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    const printCard = () => {
        if (selectedEdit == 0) {
            return (
                <Card
                    className="px-1 py-3 border-0 shadow-sm gen_font"
                >
                    <div className="container">
                        {
                            profilePic != ""
                                ?
                                <>
                                    <CardImg
                                        // ❗❗❗
                                        src={
                                            profilePic
                                                &&
                                                profilePic.includes("http")
                                                ?
                                                profilePic
                                                :
                                                `${API_URL}${profilePic}`
                                        }
                                        alt={`${fullname}'s profile picture`}
                                        top
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            backgroundColor: "black"
                                        }}
                                        className="mx-auto border-0 rounded-circle"
                                    />
                                </>
                                :
                                <>
                                    <CardImg
                                        src={adminPic}
                                        alt={`${fullname}'s profile picture`}
                                        top
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            backgroundColor: "black"
                                        }}
                                        className="mx-auto border-0 rounded-circle"
                                    />
                                </>
                        }
                    </div>
                    <div
                        className="d-md-flex justify-content-between px-md-4 pt-3 text-md-start"
                    >
                        <div>
                            <h5>Full Name</h5>
                            <h6>{fullname}</h6>
                        </div>
                        <div>
                            <h5>User Name</h5>
                            <h6>{username}</h6>
                        </div>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start"
                    >
                        <h5>Bio</h5>
                        <h6>{bio}</h6>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start"
                    >
                        <h5>Email</h5>
                        <h6>{email}</h6>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start"
                    >
                        {
                            status == "verified"
                                ?
                                <>
                                    <span>
                                        <VerifIcon
                                            fill="green"
                                            style={{ width: "25px", height: "25px" }}
                                        />
                                    </span>
                                    <span
                                        style={{ fontWeight: "normal" }}
                                    >
                                        Verified
                                    </span>
                                </>
                                :
                                <>
                                    <span>
                                        <VerifIcon
                                            fill="red"
                                            style={{ width: "25px", height: "25px" }}
                                        />
                                    </span>
                                    <span
                                        style={{ fontWeight: "normal" }}
                                    >
                                        Unverified
                                    </span>
                                </>
                        }
                    </div>
                </Card>
            )
        } else {
            return (
                <Card
                    className="px-1 py-3 border-0 shadow-sm gen_font"
                >
                    <div className="container">
                        <Input
                            // ❗❗❗
                            // type="text"
                            type="file"
                            // placeholder={`Insert new image: ${profilePic}`}
                            // onChange={(e) => handlePicture(e.target.value)}
                            onChange={(e) => handlePicture(e.target.files[0])}
                        />
                    </div>
                    <div
                        className="d-md-flex justify-content-between px-md-4 pt-3 text-md-start pb-3"
                    >
                        <div>
                            <h5>Full Name</h5>
                            <Input
                                type="text"
                                bsSize="sm"
                                placeholder={fullname}
                                defaultValue={fullname}
                                onChange={(e) => handleFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h5>Username</h5>
                            <Input
                                type="text"
                                bsSize="sm"
                                placeholder={username}
                                defaultValue={username}
                                onChange={(e) => handleUserName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start pb-3"
                    >
                        <h5>Bio</h5>
                        <Input
                            type="text"
                            bsSize="sm"
                            placeholder={bio}
                            defaultValue={bio}
                            onChange={(e) => handleBio(e.target.value)}
                        />
                    </div>
                    <div
                        className="d-md-flex justify-content-between px-md-4 text-md-start pb-3 row"
                    >
                        <div
                            className="col-12 col-md-6"
                        >
                            <h5>Current Password</h5>
                            <InputGroup>
                                <Input
                                    bsSize="sm"
                                    placeholder="Current password that you want to change"
                                    type={visibleForm.type}
                                    defaultValue={inputPrevPass}
                                    onChange={(e) => handlePrevPass(e.target.value)}
                                />
                                <InputGroupText
                                    className="btn btn-secondary"
                                    onClick={handleVisible}
                                >
                                    {visibleForm.text}
                                </InputGroupText>
                            </InputGroup>
                        </div>
                        <div
                            className="col-12 col-md-6"
                        >
                            <h5>New Password</h5>
                            <Input
                                type="text"
                                bsSize="sm"
                                defaultValue={inputNewPass}
                                onChange={(e) => handleNewPass(e.target.value)}
                            />
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
                        </div>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start pb-3"
                    >
                        <h5>Email</h5>
                        <h6>{email}</h6>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start"
                    >
                        {
                            status == "verified"
                                ?
                                <>
                                    <span>
                                        <VerifIcon
                                            fill="green"
                                            style={{ width: "25px", height: "25px" }}
                                        />
                                    </span>
                                    <span
                                        style={{ fontWeight: "normal" }}
                                    >
                                        Verified
                                    </span>
                                </>
                                :
                                <>
                                    <span>
                                        <VerifIcon
                                            fill="red"
                                            style={{ width: "25px", height: "25px" }}
                                        />
                                    </span>
                                    <span
                                        style={{ fontWeight: "normal" }}
                                    >
                                        Unverified
                                    </span>
                                </>
                        }
                    </div>
                </Card>
            )
        }
    }

    const handleEdit = () => {
        setSelectedEdit(1);
    }

    const handleFullName = (value) => {
        setInputFullName(value)
        // console.log(inputFullName)
    }

    const handleUserName = (value) => {
        setInputUserName(value)
        // console.log("inputUserName", inputUserName);
    }

    const handleBio = (value) => {
        setInputBio(value)
        // console.log(inputBio)
    }

    const handlePrevPass = (value) => {
        setInputPrevPass(value)
        console.log(inputPrevPass)
    }

    const handleNewPass = (value) => {
        setInputNewPass(value)
        console.log(inputNewPass)

        if (strongRegexPassword.test(value)) {
            setPassStrength("✅ Strong Password")
        } else if (weakRegexPassword.test(value)) {
            setPassStrength("❗ Weak Password")
        } else if (wrongRegexPassword.test(value)) {
            setPassStrength("❌ Contain lowercase letter")
        }
        // console.log(passStrength)
    }

    const handlePicture = (value) => {
        setInputPicture(value)
        console.log("inputPicture", inputPicture)
    }

    const handleSave = () => {
        setSelectedEdit(0);
        console.log("yang ingin disave", inputFullName, inputUserName, inputBio, inputPicture, inputPrevPass, inputNewPass)

        let token = localStorage.getItem("tokenIdUser");
        if (token) {
            if (inputPrevPass === "" && inputNewPass === "" || inputPrevPass != "" && inputNewPass != "") {

                if (inputPrevPass != "" && inputNewPass.length < 8) {
                    toast.warn("Password should contain at least 8 characters");
                } else if (passStrength == "❌ Contain lowercase letter") {
                    // console.log("Password cannot contain lowercase letter")
                    toast.warn("Password cannot contain lowercase letter");
                } else if (
                    (dbUsers.find(val => val.username == inputUserName))
                    // &&
                    // ((dbUsers[dbUsers.findIndex(valfind => valfind.id === id)].id) != id)
                ) {
                    toast.warn("Username already used");
                } else {
                    let formData = new FormData();
                    let data = {
                        fullname: inputFullName,
                        username: inputUserName,
                        bio: inputBio,
                        previousPassword: inputPrevPass,
                        newPassword: inputNewPass
                    };
                    console.log("data", data);
                    formData.append('data', JSON.stringify(data));
                    formData.append('profilePicture', inputPicture);
                    Axios.patch(`${API_URL}/users/edit`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((res) => {
                        console.log("isi res.data pas klik save", res.data);
                        keepLogin();
                        setInputPrevPass("");
                        setInputNewPass("");
                        setPassStrength("");
                    }).catch((err) => {
                        console.log(err)
                    })
                }

            } else {
                toast.warn("Please fill in the New Password to change your password");
            }
        }

    }

    const handleCancel = () => {
        setSelectedEdit(0);
        setInputPrevPass("");
        setInputNewPass("");
        setPassStrength("");
    }

    const resendVerif = () => {

        setButtonStatus(true)

        let token = localStorage.getItem("tokenIdUser");

        if (token) {
            Axios.get(`${API_URL}/users/resendVerif`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if (res.data.success) {
                    localStorage.setItem("tokenIdUser", res.data.token);
                    dispatch(loginAction(res.data));
                    toast.info("Your request for Account Verification Link has been sent. Please check your email inbox");
                    navigate('/');
                    setButtonStatus(false);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div
            className="row container mx-auto py-3 gen_font"
            style={{ minHeight: "100vh" }}
        >

            {/* title Leiden | User Profile */}
            <MetaDecorator
                title="Leiden | User Profile"
                description="We want to know more about you :D"
                contentImg={
                    profilePic != ""
                        ?
                        profilePic
                            &&
                            profilePic.includes("http")
                            ?
                            profilePic
                            :
                            `${API_URL}${profilePic}`
                        :
                        `${API_URL}/imgUtilities/IMGUTILITIES_ADMINPROFILE.png`
                }
            // contentWebUrl="http://localhost:3001/userprofile"
            />

            <div
                className="col-12 col-md-6 order-md-1"
            >
                {printCard()}

            </div>
            <div
                className="col-12 col-md-6 order-md-2"
            >
                <Card
                    className="border-0"
                >
                    <CardBody>
                        {
                            status == "unverified"
                                ?
                                <>
                                    <Button
                                        className="col-12 gen_btn_warning_secondary"
                                        color="warning"
                                        outline
                                        onClick={resendVerif}
                                        disabled={buttonStatus}
                                    >
                                        Verify your Account
                                    </Button>
                                </>
                                :
                                selectedEdit == 0
                                    ?
                                    <>
                                        <Button
                                            className="col-12 mb-2 gen_btn_warning_secondary"
                                            onClick={handleEdit}
                                            color="warning"
                                            outline
                                        >
                                            Edit Profile
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button
                                            className="col-12 mb-2 gen_btn_warning_secondary"
                                            onClick={handleSave}
                                            color="warning"
                                            outline
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="col-12 mb-2 gen_btn_warning_secondary"
                                            onClick={handleCancel}
                                            color="secondary"
                                            outline
                                        >
                                            Cancel
                                        </Button>
                                    </>
                        }
                    </CardBody>
                </Card>
                <Card
                    className="d-none d-md-flex border-0 shadow-sm"
                >
                    <CardBody>
                        <div
                            className="d-md-flex justify-content-between px-md-4 pt-3 text-md-start"
                        >
                            <h5>Likes</h5>
                            <h6>{likes.length}</h6>
                        </div>
                        <div
                            className="d-md-flex justify-content-between px-md-4 pt-3 text-md-start"
                        >
                            <h5>Posts</h5>
                            <h6>{posts.filter(val => val.username == username).length}</h6>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* {
                username
                &&
                status === "verified"
                &&
                <>
                    <Nav
                        tabs
                        className="border-0"
                    >
                        <NavItem>
                            <NavLink
                                className="active"
                                onClick={() => navigate("/yourposts")}
                            >
                                Your Posts
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => navigate("/yourlikes")}
                            >
                                Your Likes
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <CardsInYourPosts
                        data={posts.filter(val => val.username === username)}
                    />
                </>
            } */}

        </div>
    )

}

export default UserProfilePage;