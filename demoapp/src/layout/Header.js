import { Link, useNavigate } from "react-router-dom";
import { Container, FormControl, Navbar, Form, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from "react";
import { userContext } from '../App';
import {
    Avatar, Badge, IconButton, Menu,
    MenuItem, Divider, ListItemIcon, Tooltip
} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PersonAdd from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Notifications from "../components/Notifications";

const Header = () => {



    const [user, dispatch] = useContext(userContext)


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // ==== QuerySet ====
    const nav = useNavigate()
    const [q, setQ] = useState("")
    const search = (event) => {
        event.preventDefault()

        nav(`/?q=${q}`)

    }

    const logout = (evt) => {
        evt.preventDefault()
        if (user != null)
            dispatch({
                "type": "logout",
                "payload": null
            })
    }

    let btn = <>
        <MenuItem>
            <Link to="/login" className="nav-link text-danger">
                <LoginIcon style={{ "marginRight": "5px" }} />Đăng nhập
            </Link>
        </MenuItem>
        <MenuItem>
            <Link to="/register" className="nav-link text-danger">
                <HowToRegIcon style={{ "marginRight": "5px" }} />Đăng Ký
            </Link>
        </MenuItem>

    </>

    if (user!== undefined && user !== null)
        btn = <>
            <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 12,
                            width: 15,
                            height: 15,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <Link to="/profile" className="nav-link" style={{ "padding": "0px" }}>
                    <MenuItem style={{ "color": "#333" }}>
                        <Avatar src={user.avatar_path} /> Trang cá nhân
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            {/* Show nav menu */}
            <MenuItem style={{ "padding": "0px" }}>
                <Tooltip title="Home">
                    <IconButton size="small" color="inherit" style={{ "marginRight": "5px" }}>
                        <Link to="/">
                            <HomeIcon style={{ "color": "#333" }} />
                        </Link>
                    </IconButton>
                </Tooltip>
            </MenuItem>
            <MenuItem style={{ "padding": "0px" }}>
                <Tooltip title="AddPost">
                    <IconButton size="small" color="inherit" style={{ "marginRight": "5px" }} >
                        <Link to="/add-post"  >
                            <AddBoxOutlinedIcon style={{ "color": "#333" }} />
                        </Link>
                    </IconButton>
                </Tooltip>
            </MenuItem>
            <MenuItem style={{ "padding": "0px" }}>
                <Tooltip title="Massage">
                    <IconButton size="small" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <Link to="/inbox">
                                <MailOutlineIcon style={{ "color": "#333" }} />
                            </Link>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </MenuItem>
            <MenuItem style={{ "padding": "0px" }}>
                <Tooltip title="Notification">
                    <Notifications />
                </Tooltip>
            </MenuItem>



            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}>
                <Avatar sx={{ width: 32, height: 32 }} src={user.avatar_path}></Avatar>
            </IconButton>
            {/* End nav menu */}
        </>


    return (
        <>
            <Navbar collapseOnSelect expand="lg" >
                <Container style={{ "width": "70%" }}>
                    <Link className=" navbar-brand nav-link" to="/">
                        <Avatar alt="Shi-Logo" style={{ "width": "50px" }}
                            src="https://res.cloudinary.com/dl6artkyb/image/upload/v1650559462/Demo/logo_mobile_mte4e1.png" />
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form className="d-flex" onSubmit={search} style={{ "marginRight": "auto" }}>
                            <FormControl
                                type="search"
                                placeholder="Nhập tiêu đề..."
                                className="me-2"
                                aria-label="Search"
                                value={q}
                                onChange={event => setQ(event.target.value)}
                            />
                            <Button type="submit" variant="outline-success">Tim</Button>
                        </Form>
                        {btn}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
export default Header

