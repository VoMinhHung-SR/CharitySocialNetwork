import { Avatar, Container, Divider, Grid, IconButton, Paper, Stack, Tooltip } from "@mui/material"
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Link, Outlet } from "react-router-dom";
import Moment from "react-moment";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { authApi, endpoints } from "../configs/APIs";
import CircularProgress from '@mui/material/CircularProgress'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Profile = () => {
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    const [user, dispatch] = useContext(userContext)
    let gender = "";

    
    // ====== FETCH API ======
    const [postsOwner, setPostsOwner] = useState([])
    useEffect(() => {
        const loadPostOwner = async () => {
            try {
                let res;
                const userID = user.id;
                if (user !== null)
                    res = await authApi().get((endpoints['post-owner'](userID)));
                setPostsOwner(res.data);
                setIsLoadingPosts(false);
                console.info(res.data)
            } catch (err) {
                console.log(err);
            }

        }

        loadPostOwner()
    }, [])

    if (user === null){
        return(
            <>
                <h1> Bạn phải đăng nhập để xem trang cá nhân</h1>
                <Link className="nav-link text-primary" to='/login'><h2>CLICK ME</h2></Link>
            </>  
        ) 
    }else
        if (user.gender !== null) {
            if (user.gender === 0)
                gender = "Nam";
            else if (user === 1)
                gender = "Nữ";
            else
                gender = "Bí mật"
        }
        

    return (
        <>
            <div style={{ "width": "100%", "backgroundColor": "#f3f3f3" }}>
                <Container style={{ "padding": "20px" }}>
                    <Stack spacing={2}>

                        <br />
                        <Item>
                            <Grid container spacing={3}>
                                <Grid item xs="3" style={{ "margin": "auto" }}>
                                    <Avatar style={{ "margin": "auto", "width": "150px", "height": "150px" }} src={user.avatar}></Avatar>
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
                                            <Item><strong>Số điện thoại:</strong> {user.phonenumber && user.phonenumber}</Item>
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
                        <Divider style={{ "marginTop": "150px" }} />


                        <div>
                            {isLoadingPosts && postsOwner.length === 0 ? (
                                <CircularProgress/>
                            ) : postsOwner.length === 0 ? (
                                <h1 className="text-center">Hiện tại người dùng chưa có bài viết nào</h1>
                            ) : (
                                <ImageList sx={{ width: 900 }} cols={3} rowHeight={280} style={{ "margin": "0 auto" }}>
                                    {postsOwner.map((item) => (
                                        
                                        <>
                                            <Link to={`/posts/${item.id}/`}>
                                                <ImageListItem key={item.image} style={{ "margin": "10px", "border": "solid 3px black" ,"overflow":"hidden"}}>
                                                    <img
                                                        src={`${item.image}?w=200&h=200&fit=crop&auto=format`}
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
                        </div>


                    </Stack>
                </Container>
                <br />
            </div>


        </>
    )
}

export default Profile