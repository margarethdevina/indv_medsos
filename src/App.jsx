import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navigation/Navbar';
import FooterComponent from "./Components/Footer/Footer";
import LandingPage from './Pages/LandingPage';
import YourPostsPage from './Pages/YourPosts';
import AllPostsPage from './Pages/AllPosts';
import UploadPostPage from './Pages/UploadPost';
import PostDetailPage from './Pages/PostDetail';
import RegisterPage from './Pages/Register';
import UserProfilePage from './Pages/UserProfile';
import NotFoundPage from './Pages/404';

function App() {
  return (
    <div className="App">

      <NavbarComponent />

      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/yourposts' element={<YourPostsPage />} />
        <Route path='/allposts' element={<AllPostsPage />} />
        <Route path='/uploadpost' element={<UploadPostPage />} />
        <Route path='/postdetail' element={<PostDetailPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/userprofile' element={<UserProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;
