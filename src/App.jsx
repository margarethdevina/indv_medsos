import logo from './logo.svg';
import './App.css';
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
import Axios from 'axios';
import { API_URL } from './helper';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from './redux/actions/postsActions';
import { loginAction } from './redux/actions/usersActions';
import { getCommentsAction } from './redux/actions/commentsActions';


function App() {

  const dispatch = useDispatch();

  const getPosts = () => {
    Axios.get(`${API_URL}/posts`)
      .then((response) => {
        console.log("data posts terambil smua?", response.data)
        dispatch(getPostsAction(response.data))
      }).catch((error) => {
        console.log(error)
      })
  }

  const getComments = () => {
    Axios.get(`${API_URL}/comments`)
      .then((res) => {
        dispatch(getCommentsAction(res.data))
      }).catch((err) => {
        console.log(err)
      })
  }

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

  console.log("status user yg login", status)

  return (
    <div className="App">

      <NavbarComponent 
      
      />

      <Routes>

        <Route path='/' element={<LandingPage />} />
        {
          username
            ?
            status === "unverified"
              ?
              <>
                <Route path='/userprofile' element={<UserProfilePage />} />
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
            <Route path='/register' element={<RegisterPage />} />
        }
        <Route path='*' element={<NotFoundPage />} />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;
