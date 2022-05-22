import React, { useState } from "react";
import backgroundNavbar from "../../Assets/NavbarRef/background_greenlime.jpg";
import loginIcon from "../../Assets/IconRef/login.png";
import regisIcon from "../../Assets/IconRef/register.png";
import addPostIcon from "../../Assets/IconRef/add_post.png";
import './_Navbar.scss';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button, NavbarText, Tooltip, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from "../../redux/actions/usersActions";
import ModalLogin from "../ModalLogin/ModalLogin";

const NavbarComponent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openCollapse, setOpenCollapse] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [dropOpen, setDropOpen] = React.useState(false);

    const { username } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
        }
    })

    const handleLogout = () => {
        dispatch(logoutAction())
        navigate("/")
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundNavbar})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                // position: "sticky",
                // top: 0
            }}
        >
            <ModalLogin
                modalOpen={openLogin}
                toggleOpen={() => setOpenLogin(!openLogin)}
            />

            <Navbar
                expand="md"
                className="container"
                color="transparent"
                light
            >
                <NavbarBrand
                    onClick={() => navigate("/")}
                >
                    <h4
                        className="app_navbar_brand"
                    >
                        Leiden
                    </h4>
                </NavbarBrand>

                <span>
                    <img
                        id="tooltipAddPost"
                        cursor="pointer"
                        src={addPostIcon}
                        width="60%"
                        alt=""
                        onClick={() => navigate("/uploadpost")}
                    />
                    <Tooltip
                        isOpen={tooltipOpen}
                        placement="bottom"
                        target="tooltipAddPost"
                        toggle={() => setTooltipOpen(!tooltipOpen)}
                    >
                        Add Post
                    </Tooltip>
                </span>

                <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />

                <Collapse navbar isOpen={openCollapse}>

                    <Nav
                        navbar
                        className="me-auto"
                    >
                        <NavItem
                            onClick={() => navigate("/yourposts")}
                        >
                            <span
                                className="app_navbar_list_item_link"
                            >
                                Your Posts
                            </span>
                        </NavItem>
                        <NavItem
                            onClick={() => navigate("/allposts")}
                        >
                            <span className="app_navbar_list_item_link" >
                                All Posts
                            </span>
                        </NavItem>
                    </Nav>

                    <NavbarText className="d-md-flex align-items-center justify-content-between">

                        {
                            username ?
                                <>
                                    <div className="d-none d-md-flex">
                                        <Dropdown isOpen={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
                                            <DropdownToggle
                                                className="app_navbar_btn_user"
                                                onClick={() => setDropOpen(!dropOpen)}>
                                                {username}
                                            </DropdownToggle>
                                            <DropdownMenu end>
                                                <DropdownItem onClick={() => navigate("/userprofile")}>
                                                    Your Profile
                                                </DropdownItem>
                                                <DropdownItem onClick={handleLogout}>
                                                    Logout
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>


                                    <div className="mx-md-3">
                                        <div
                                            className="d-md-none col-12 my-1">

                                            <span
                                                className="app_navbar_list_item_link"
                                                onClick={() => navigate("/userprofile")}
                                            >
                                                Your Profile
                                            </span>

                                            <br />

                                            <span className="app_navbar_list_item_link"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </span>

                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <div className="mx-md-3">
                                        <div
                                            className="d-none d-md-flex flex-column align-items-center"
                                            onClick={() => setOpenLogin(!openLogin)}
                                        >
                                            <img
                                                className="app_navbar_btn"
                                                cursor="pointer"
                                                width="60%"
                                                src={loginIcon}
                                                alt=""
                                            />
                                            <span
                                                className="app_navbar_btn"
                                            >
                                                Sign In
                                            </span>
                                        </div>

                                        <Button
                                            className="d-md-none col-12 my-1 app_navbar_btn"
                                            type="button"
                                            size="sm"
                                            outline
                                            color="warning"
                                            onClick={() => setOpenLogin(!openLogin)}
                                        >
                                            Sign In
                                        </Button>

                                    </div>

                                    <div className="mx-md-3">

                                        <div className="d-none d-md-flex flex-column align-items-center" onClick={() => navigate("/register")}>
                                            <img
                                                className="app_navbar_btn"
                                                cursor="pointer"
                                                width="50%"
                                                src={regisIcon}
                                                alt=""
                                            />
                                            <span
                                                className="app_navbar_btn"
                                            >
                                                Sign Up
                                            </span>
                                        </div>

                                        <Button
                                            className="d-md-none col-12 my-1 app_navbar_btn"
                                            type="button"
                                            size="sm"
                                            outline
                                            color="secondary"
                                            onClick={() => navigate("/register")}
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                </>

                        }

                    </NavbarText>

                </Collapse>

            </Navbar>

        </div >
    )

}

export default NavbarComponent;