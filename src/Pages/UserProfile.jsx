import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from "../helper";
import { loginAction } from "../redux/actions/usersActions";
import { Card, CardImg, CardBody, Button, Input } from "reactstrap";
import adminPic from "../Assets/SampleProfilePic/Admin.png";
import { ReactComponent as VerifIcon } from '../Assets/IconRef/verified.svg';

const UserProfilePage = (props) => {

    const dispatch = useDispatch();

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
            Axios.get(`${API_URL}/users?id=${token}`)
                .then((res) => {
                    localStorage.setItem("tokenIdUser", res.data[0].id)
                    dispatch(loginAction(res.data[0]));
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

    const printCard = () => {
        if (selectedEdit == 0) {
            return (
                <Card
                    className="px-1 py-3 border-2 shadow-lg"
                >
                    <div className="container">
                        {
                            profilePic != ""
                                ?
                                <>
                                    <CardImg
                                        src={profilePic}
                                        alt={`${fullname}'s profile picture`}
                                        top
                                        style={{
                                            width: "35%",
                                            height: "35%",
                                        }}
                                        className="mx-auto"
                                    />
                                </>
                                :
                                <>
                                    <CardImg
                                        src={adminPic}
                                        alt={`${fullname}'s profile picture`}
                                        top
                                        style={{
                                            width: "35%",
                                            height: "35%",
                                        }}
                                        className="mx-auto"
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
                    className="px-1 py-3 border-2 shadow-lg"
                >
                    <div className="container">
                        <Input
                            type="text"
                            placeholder={`Insert new image: ${profilePic}`}
                            onChange={(e) => handlePicture(e.target.value)}
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
        // console.log(inputPicture)
    }

    const handleSave = () => {
        setSelectedEdit(0);
        console.log("yang ingin disave", inputFullName, inputUserName, inputBio, inputPicture)

        Axios.patch(`${API_URL}/users/${id}`, {
            fullname: inputFullName,
            username: inputUserName,
            bio: inputBio,
            profilePicture: inputPicture
        }).then((res) => {
            console.log("isi res.data pas klik save", res.data)
            keepLogin()
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleCancel = () => {
        setSelectedEdit(0);
    }

    return (
        <div
            className="row container mx-auto py-3"
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
                                    className="col-12"
                                    >
                                    Verify your Account
                                </Button>
                            </>
                            :
                                selectedEdit == 0
                                    ?
                                    <>
                                        <Button
                                            className="col-12 mb-2"
                                            onClick={handleEdit}
                                            color="warning"
                                        >
                                            Edit Profile
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button
                                            className="col-12 mb-2"
                                            onClick={handleSave}
                                            color="success"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="col-12 mb-2"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                        }
                    </CardBody>
                </Card>
                <Card
                    className="d-none d-md-flex border-2 shadow-lg"
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