import React from "react";
import { useSelector } from "react-redux";
import AddPostComponent from "../Components/AddPost/AddPost";
import { API_URL } from "../helper";
import MetaDecorator from "../Components/MetaDecorator";

const UploadPostPage = (props) => {

    const { userId, username, posts, status } = useSelector((state) => {
        return {
            userId: state.usersReducer.id,
            username: state.usersReducer.username,
            posts: state.postsReducer.posts,
            status: state.usersReducer.status
        }
    })

    // console.log("isi state di uploadPost page", username, posts)

    return (
        <div
            className="pb-md-5 mb-md-5"
            style={{ minHeight: "100vh" }}
        >

            {/* title Leiden | Upload Post */}
            <MetaDecorator
                title="Leiden | Upload Post"
                description="How is your day? Do you want to share it to us?"
                contentImg={`${API_URL}/imgUtilities/IMGUTILITIES_UPLOADPOST.jpg`}
                // contentWebUrl="http://localhost:3001/uploadpost"
            />

            {
                username
                    ?
                    status === "verified"
                        ?
                        <>
                            <AddPostComponent
                                userId={userId}
                                username={username}
                                posts={posts}
                            />
                        </>
                        :
                        <>
                            <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                                <span className="material-symbols-outlined">
                                    gpp_maybe
                                </span>
                            </span>
                            <h5>401 - Please verify your email first to access this page</h5>
                            <h5>To resend the verification link, please go to <i>Your Profile</i> page</h5>
                        </>
                    :
                    <>
                        <span className="material-icons d-flex justify-content-center" style={{ color: "#351c75", fontSize: "150px" }}>
                            <span className="material-symbols-outlined">
                                login
                            </span>
                        </span>
                        <h5>401 - Please sign in first to access this page</h5>
                    </>
            }

        </div>
    )

}

export default UploadPostPage;