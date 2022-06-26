import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from './helper';
import { Toast, ToastBody } from "reactstrap";
// import logo from './logo.svg';
import './App.css';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navigation/Navbar';
import FooterComponent from "./Components/Footer/Footer";
import LandingPage from './Pages/LandingPage';
import YourPostsPage from './Pages/YourPosts';
import YourLikesPage from './Pages/YourLikes';
import AllPostsPage from './Pages/AllPosts';
import UploadPostPage from './Pages/UploadPost';
import PostDetailPage from './Pages/PostDetail';
import RegisterPage from './Pages/Register';
import UserProfilePage from './Pages/UserProfile';
import NotFoundPage from './Pages/404';
import VerificationUser from './Pages/VerificationPage';
import ForgotPassword from './Pages/ForgotPasswordPage';
import NewPasswordPage from './Pages/NewPasswordPage';
import { getPostsAction } from './redux/actions/postsActions';
import { loginAction } from './redux/actions/usersActions';
import { getCommentsAction } from './redux/actions/commentsActions';


function App() {

  const dispatch = useDispatch();

  const getPosts = () => {
    Axios.get(`${API_URL}/posts/get`)
      .then((response) => {
        console.log("data posts terambil smua?", response.data)
        dispatch(getPostsAction(response.data))
      }).catch((error) => {
        console.log(error)
      })
  }

  const getComments = () => {
    Axios.get(`${API_URL}/comments/get`)
      .then((res) => {
        dispatch(getCommentsAction(res.data))
      }).catch((err) => {
        console.log(err)
      })
  }

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

  useEffect(() => {
    getPosts();
    keepLogin();
    getComments();
  }, [])

  const { username, status } = useSelector((state) => {
    return {
      username: state.usersReducer.username,
      status: state.usersReducer.status
    }
  })

  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleToastBack = (toastMessages) => {
    if (toastMessages.length > 0) {
      setToastMsg(toastMessages)
    }
  }

  if (openToast) {
    setTimeout(() => setOpenToast(!openToast, setToastMsg("")), 3500)
  } // setToasMsg di reset disini pakai empty string boleh ga ya?

  console.log("status user yg login", status)

  return (
    <div
      className="App"
    // style={{position: "relative", minHeight: "100vh"}}
    >
      <Toast
        id='toastGlobal'
        isOpen={openToast}
        className="gen_font_content"
        style={{ position: "fixed", right: "10px", backgroundColor: "#f3f6f4", zIndex: "999" }}
      >
        <ToastBody>
          <span>{toastMsg}</span>
        </ToastBody>
      </Toast>

      <NavbarComponent />

      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/userprofile' element={<UserProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/allposts' element={<AllPostsPage />} />
        <Route path='/uploadpost' element={<UploadPostPage />} />
        <Route path='/yourposts' element={<YourPostsPage />} />
        <Route path='/yourlikes' element={<YourLikesPage />} />
        <Route path='/postdetail' element={<PostDetailPage />} />

        <Route path='/verification/:token' element={<VerificationUser />} />
        <Route path='/forgot' element={<ForgotPassword handleToastBack={handleToastBack} />} />
        <Route path='/newpassword/:token' element={<NewPasswordPage />} />

        {/* {
          username
            ?
            status === "unverified"
              ?
              <>
                <Route path='/userprofile' element={<UserProfilePage />} />
                <Route path='/allposts' element={<AllPostsPage />} />
                <Route path='/verification/:token' element={<VerificationUser />} />
                <Route path='/yourposts' element={<YourPostsPage />} />
                <Route path='/uploadpost' element={<UploadPostPage />} />
              </>
              :
              <>
                <Route path='/yourposts' element={<YourPostsPage />} />
                <Route path='/userprofile' element={<UserProfilePage />} />
                <Route path='/yourlikes' element={<YourLikesPage />} />
                <Route path='/allposts' element={<AllPostsPage />} />
                <Route path='/uploadpost' element={<UploadPostPage />} />
                <Route path='/postdetail' element={<PostDetailPage />} />
              </>
            :
            <>
              <Route path='/yourposts' element={<YourPostsPage />} />
              <Route path='/uploadpost' element={<UploadPostPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/forgot' element={<ForgotPassword />} />
              <Route path='/newpassword/:token' element={<NewPasswordPage />} />
            </>
        } */}

        <Route path='*' element={<NotFoundPage />} />

      </Routes>

      <FooterComponent
        // style={{position: "absolute", left: 0, right: 0, bottom: 0}}
        style={{ position: "fixed", left: 0, right: 0, bottom: 0 }}
      />

    </div>
  );
}

export default App;
