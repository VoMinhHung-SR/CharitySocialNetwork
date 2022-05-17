import {
    Avatar, Container, Grid, IconButton, Paper, Stack,
    Tooltip, ImageListItem, ImageList, Typography, Box, Tabs, Tab, ImageListItemBar, Menu, MenuItem
} from "@mui/material"
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Link, Outlet } from "react-router-dom";
import Moment from "react-moment";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { authApi, endpoints } from "../configs/APIs";
import CircularProgress from '@mui/material/CircularProgress'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Cancel from "@mui/icons-material/Cancel";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className="text-center"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Profile = () => {


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const [user, dispatch] = useContext(userContext)
    let gender = "";

    // Post owner && Post shared
    const [postsOwner, setPostsOwner] = useState([])
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    const [postsShared, setPostsShared] = useState([])
    const [isLoadingPostsShared, setIsLoadingPostsShared] = useState(true)

    // ====== FETCH API ======
    useEffect(() => {
        const loadPostOwner = async () => {
            try {
                let res;
                const userID = user.id;
                if (user)
                    res = await authApi().get((endpoints['post-owner'](userID)));
                setPostsOwner(res.data);
                setIsLoadingPosts(false);
                console.info(res.data)
            } catch (err) {
                console.log(err);
            }

        }
        const loadPostShared = async () => {
            try {
                let res;
                const userID = user.id;
                if (user)
                    res = await authApi().get((endpoints['post-shared'](userID)));
                setPostsShared(res.data);
                setIsLoadingPostsShared(false);
                console.info(res.data)
            } catch (err) {
                console.log(err);
            }

        }
        loadPostOwner();
        loadPostShared();
    }, [])


    if (user === null) {
        return (
            <>
                <Container className="text-center">
                    <h4> Bạn phải đăng nhập để xem trang cá nhân</h4>
                    <Link className="nav-link text-primary" to='/login'><h4>CLICK ME</h4></Link>
                </Container>

            </>
        )
    } else
        if (user.gender !== null) {
            if (user.gender === 0)
                gender = "Nam";
            else if (user === 1)
                gender = "Nữ";
            else
                gender = "Bí mật"
        }

    let menuItem = <Box>
        <MenuItem onClick={handleClose} >
            <DeleteForeverIcon style={{ "paddingRight": "5px" }} /> Xóa bài chia sẻ
        </MenuItem>


        <MenuItem  >
            <InfoIcon style={{ "paddingRight": "5px" }} /> Đi tới bài viết
        </MenuItem>


        <MenuItem onClick={handleClose} >
            <Cancel style={{ "paddingRight": "5px" }} /> Hủy
        </MenuItem>
    </Box>

    return (
        <>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItem}
            </Menu>
            <div style={{ "width": "100%", "backgroundColor": "#f3f3f3" }}>
                <Container style={{ "padding": "20px" }}>
                    <Stack spacing={2}>

                        <br />
                        <Item>
                            <Grid container spacing={3}>
                                <Grid item xs="3" style={{ "margin": "auto" }}>
                                    <Avatar style={{ "margin": "auto", "width": "150px", "height": "150px" }} src={user.avatar_path}></Avatar>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={12}>
                                            <Item style={{ "fontSize": "20px" }}>{user.username}</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Họ:</strong> {user.first_name && user.first_name}</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Tên:</strong> {user.last_name && user.last_name}</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Email:</strong> {user.email && user.email}</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Số điện thoại:</strong> {user.phone_number && user.phone_number}</Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item><strong>Địa chỉ:</strong> {user.address && user.address}</Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item><strong>Ngày sinh:</strong> <Moment format="DD/MM/YYYY">{user.date_of_birth && user.date_of_birth}</Moment></Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item><strong>Giới tính:</strong> {gender && gender}</Item>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs>

                                    <IconButton aria-label="Edit">
                                        <Tooltip title="Chỉnh sửa trang cá nhân">
                                            <EditIcon>

                                            </EditIcon>
                                        </Tooltip>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Item>

                        <Outlet />



                        <div style={{ "marginTop": "50px" }}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                                        <Tab style={{ "margin": "auto" }} label="Bài viết" {...a11yProps(0)} />
                                        <Tab style={{ "margin": "auto" }} label="Chia sẻ" {...a11yProps(1)} />
                                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    {isLoadingPosts && postsOwner.length === 0 ? (
                                        <CircularProgress />
                                    ) : postsOwner.length === 0 ? (
                                        <h1 className="text-center">Hiện tại người dùng chưa có bài viết nào</h1>
                                    ) : (
                                        <ImageList sx={{ width: 900 }} cols={3} rowHeight={280} style={{ "margin": "0 auto" }}>
                                            {postsOwner.map((item) => (

                                                <>
                                                    <Link to={`/posts/${item.id}/`}>
                                                        <ImageListItem key={item.image} style={{ "margin": "10px", "border": "solid 3px black", "overflow": "hidden" }}>
                                                            <img
                                                                src={`${item.image_path}?w=200&h=200&fit=crop&auto=format`}
                                                                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    </Link>
                                                </>
                                            ))}
                                        </ImageList>

                                    )}
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {isLoadingPostsShared && postsShared.length === 0 ? (
                                        <CircularProgress />
                                    ) : postsShared.length === 0 ? (
                                        <h1 className="text-center">Hiện tại người dùng chưa có chia sẻ bài viết nào</h1>
                                    ) : (
                                        <ImageList sx={{ width: 900 }} cols={3} rowHeight={280} style={{ "margin": "0 auto" }}>
                                            {postsShared.map((item) => (
                                                <>
                                                    <ImageListItem key={item.post.image} style={{ "margin": "10px", "border": "solid 3px black", "overflow": "hidden" }}>
                                                        <img
                                                            src={`${item.post.image_path}?w=200&h=200&fit=crop&auto=format`}
                                                            srcSet={`${item.post.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                            alt={item.post.title}
                                                        />

                                                        <ImageListItemBar
                                                            title={item.post.title}
                                                            subtitle={`writen by: ${item.post.author.username}`}
                                                            actionIcon={
                                                                <IconButton
                                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                                    aria-label={`info about ${item.post.title}`}
                                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={open ? 'true' : undefined}
                                                                    onClick={handleClick}
                                                                >
                                                                    <InfoIcon />
                                                                </IconButton>
                                                            }
                                                        />


                                                    </ImageListItem>

                                                </>
                                            ))}
                                        </ImageList>
                                    )}
                                </TabPanel>
                                {/* <TabPanel value={value} index={2}>
                                    Item Three
                                </TabPanel> */}
                            </Box>
                        </div>


                    </Stack>
                </Container>
                <br />
            </div>


        </>
    )
}

export default Profile