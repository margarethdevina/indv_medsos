import React, { useState, useEffect } from "react";
import '../index.scss';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from "../helper";
import { loginAction } from "../redux/actions/usersActions";
import { Card, CardImg, CardBody, Button, Input } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import adminPic from "../Assets/SampleProfilePic/Admin.png";
import { ReactComponent as VerifIcon } from '../Assets/IconRef/verified.svg';
import { toast } from "react-toastify";

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
        keepLogin()
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

    const [selectedEdit, setSelectedEdit] = useState(0);
    const [inputPicture, setInputPicture] = useState(profilePic);
    const [inputFullName, setInputFullName] = useState(fullname);
    const [inputUserName, setInputUserName] = useState(username);
    const [inputBio, setInputBio] = useState(bio);
    const [buttonStatus, setButtonStatus] = useState(false);

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
                        className="d-md-flex justify-content-between px-md-4 pt-3 text-md-start"
                    >
                        <div>
                            <h5>Full Name</h5>
                            <Input
                                type="text"
                                placeholder={fullname}
                                onChange={(e) => handleFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h5>User Name</h5>
                            <Input
                                type="text"
                                placeholder={username}
                                onChange={(e) => handleUserName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="col-12 ps-md-4 text-md-start"
                    >
                        <h5>Bio</h5>
                        <Input
                            type="text"
                            placeholder={bio}
                            onChange={(e) => handleBio(e.target.value)}
                        />
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
        // console.log(inputUserName)
    }

    const handleBio = (value) => {
        setInputBio(value)
        // console.log(inputBio)
    }

    const handlePicture = (value) => {
        setInputPicture(value)
        console.log("inputPicture", inputPicture)
    }

    const handleSave = () => {
        setSelectedEdit(0);
        console.log("yang ingin disave", inputFullName, inputUserName, inputBio, inputPicture)

        let token = localStorage.getItem("tokenIdUser");
        if (token) {
            let formData = new FormData();
            let data = {
                fullname: inputFullName,
                username: inputUserName,
                bio: inputBio
            };
            console.log("data", data);
            formData.append('data', JSON.stringify(data));
            formData.append('profilePicture', inputPicture);
            Axios.patch(`${API_URL}/users/edit`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log("isi res.data pas klik save", res.data)
                keepLogin()
            }).catch((err) => {
                console.log(err)
            })

        }

    }

    const handleCancel = () => {
        setSelectedEdit(0);
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

        </div>
    )

}

export default UserProfilePage;