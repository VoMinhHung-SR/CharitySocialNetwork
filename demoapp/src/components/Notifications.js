import React, { useContext, useEffect } from "react";
import { Avatar, Badge, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { authApi, endpoints } from "../configs/APIs";
import { userContext } from "../App";
import { Box } from "@mui/system";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [user, dispatch] = useContext(userContext);

    // ==== FETCH API ====
    const [notifications, setNotifications] = useState([])
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(true)

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const res = await authApi().get(endpoints['notifications'](user.id))
                console.log(res.data)
                setNotifications(res.data)
                setIsLoadingNotifications(false)
            } catch (err) {
                console.error(err);
            }
        }

        loadNotifications();
    }, [])

    return (
        <>
            <Menu anchorEl={anchorEl} id="notification-menu" open={open} onClose={handleClose} onClick={handleClose}
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
                {isLoadingNotifications && notifications.length === 0 ? (
                    <Box sx={{ width: 300 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                ) : notifications.length === 0 ? (
                    <Box style={{ "padding": "10px" }}>
                        <Typography className="text-center">Hiện tại người dùng chưa có thông báo</Typography>
                    </Box>
                ) : (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {notifications.map((notification) => (
                            <Box style={{ "cursor": "pointer" }}>
                                <Link to={`/posts/${notification.post.id}`} style={{'textDecoration':'none', 'color':"#212529"}}>
                                    <ListItem alignItems="flex-start" key={notification.id}>
                                        <ListItemAvatar style={{ "margin": "auto" }}>
                                            <Avatar alt={notification.post.title}
                                                src={notification.post.image_path} variant="square"
                                                style={{ "width": "40px", "height": "40px" }} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={notification.post.title}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {notification.message} --
                                                    </Typography>
                                                    <i> <Moment fromNow>{notification.created_date}</Moment> </i>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </Link>
                                <Divider variant="inset" component="li" />
                            </Box>
                        ))}

                    </List>
                )}
                {/* Show Notification */}
                {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List> */}
                {/* End show */}
            </Menu>
            <IconButton size="small" color="inherit" onClick={handleClick}>
                <Badge badgeContent={4} color="error">
                    <NotificationsNoneIcon style={{ "color": "#333" }} />
                </Badge>
            </IconButton>
        </>

    )
}

export default Notifications




