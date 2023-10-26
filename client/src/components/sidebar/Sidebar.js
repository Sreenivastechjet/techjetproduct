import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import profile from "../images/profile.png";
import Logo from "../images/Logo.png";
import "./sidebar.css";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons/lib";
import axios from "axios";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

const Nav = styled.div`
  background: #ffffff;
  height: 60px;
  margin-left: 256px;
`;

const Navdiv = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

const NavIcon = styled(Link)`
  margin-right: 1rem;
  font-size: 2rem;
  height: 40px;
  display: flex;
  // justify-content: flex-end;
  align-items: center;
  // background:#15171c;
  text-decoration: none;
`;
const NavIcon2 = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
`;
const NavIndiv = styled.div`
  font-size: 2rem;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #3d5a80;
  // margin-top: 80px;
  width: 256px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (!sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 5px 10px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #ffffff;
    // border-left: 4px solid #632ce4;
    cursor: pointer;
    color: #3d5a80;
    margin: 5px 10px;
    border-radius: 10px;
  }
  &.active {
    background: #ffffff;
    color: #3d5a80;
    padding-left: 40px;
    margin: 5px 10px;
    border-radius: 10px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const settings = ["Profile", "Dashboard", "Logout"];

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [icon, setIcon] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    switch (setting) {
      case "Profile":
        navigate(`/profile`)
        break;
      case "Dashboard":
        navigate(`/dashboard`)
        break;
      case "Logout":
        logoutUser();
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  const logoutUser = async () => {
    if (window.confirm(`Are u sure to logout`)) {
      await axios.get("http://localhost:7000/api/v1/auth/logout");
      localStorage.clear();
      navigate("/login");
      // window.location.reload();
      window.location = "/login";
    } else {
      Swal.fire({
        position: "top-end",
        // icon: "success",
        title: "logout terminated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Nav className="sticky-top">
        <Navdiv>
          <NavIcon2 to="/dashboard">Dashboard</NavIcon2>

          <NavIndiv>
            <div className="d-flex pe-5">
              <div class="input-group-text me-4">
                <FiSearch color="black" />
                <input
                  type="search"
                  placeholder="Search.."
                  className="search ps-2"
                />
              </div>

              <div className="line"></div>

              <div className="me-3 notification">
                <BsBell color="black"/> <span class="badge badge-light">9</span>
              </div>

              <NavLink to="/addleads">
                <button className="btn btn-primary me-3">+ Add Leads</button>
              </NavLink>
              <div>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="R" src={profile} className="border border-primary"/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleMenuItemClick(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </div>
            </div>
          </NavIndiv>
        </Navdiv>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavLogo to="/dashboard">
            {/* TECHJET.AI  */}
            <img src={Logo} className="img-fluid ps-4" />
          </NavLogo>
          {SidebarData.map((item, index) => {
            const isActive = item.path === location.pathname;
            const iconColor = isActive ? "#3D5A80" : "fff";
            return (
              <SidebarLink to={item.path} className={isActive ? "active" : ""}>
                <div>
                  <IconContext.Provider
                    key={item.path}
                    value={{ color: iconColor }}
                  >
                    {item.icon}
                  </IconContext.Provider>

                  <SidebarLabel>{item.title}</SidebarLabel>
                </div>
              </SidebarLink>
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
