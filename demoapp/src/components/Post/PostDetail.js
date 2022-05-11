import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {
    CardHeader, CardMedia, CardContent, CardActions, Collapse,
    Divider, FormControl, Grid, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput
} from '@mui/material'

import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import CloseIcon from '@mui/icons-material/Close';
import { userContext } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comments from '../Comments';
import APIs, { endpoints } from '../../configs/APIs'
import Moment from 'react-moment';

const ExpandMore = styled((props) => {

    const { expand, ...other } = props;

    return <IconButton {...other} />;
})
    (({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));


const PostDetail = () => {

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const [active, setActive] = useState("More Description..");
    const [user] = useContext(userContext);

    const nav = useNavigate();
    const go = () => nav("/");
    // ====== Fetch API ======
    const [post, setPost] = useState(null)
    const { postID } = useParams()

    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await APIs.get(endpoints['postDetail'](postID));
                setPost(res.data);
            } catch (err) {
                console.error(err)
            }
        }
        loadPost();
    }, [postID])

    let act = <>
        <div style={{ "display": "flex", "textAlign": "center", "width": "100%" }}>
            <p style={{ "margin": "auto" }}>Bạn phải đăng nhập để tương tác bài viết</p>
            <Link to="/login" className="nav-link text-primary">Click here!</Link>
        </div>
    </>


    if (user != null)
        act = <>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>

            <IconButton aria-label="add comment"
                onClick={() => { setActive("Comment"); handleExpandClick() }}>
                <CommentIcon />
            </IconButton>

            <IconButton aria-label="aution"
                onClick={() => {
                    setActive("Auction");
                    handleExpandClick();
                }}>
                <MonetizationOnIcon />
            </IconButton>


            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>

            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon></ExpandMoreIcon>
            </ExpandMore>
        </>
    if (post == null){
        return <h1>Loading</h1>
    }
            
    return (
        <>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} >
                    <EditIcon style={{ "paddingRight": "5px" }} /> Chỉnh sửa bài viết
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteIcon style={{ "paddingRight": "5px" }} /> Xóa bài viết
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ReportIcon style={{ "paddingRight": "5px" }} /> Báo cáo bài viết
                </MenuItem>
            </Menu>


            {/* Main */}
            <div style={{ "backgroundColor": "rgba(0,0,0,.65)", "width": "100%" }}>
                <Grid container spacing={2} style={{ "margin": "auto", "width": "75%" }} key={post.id}>
                    <Stack spacing={2} style={{ "margin": "50px 0px", "display": "flex", "flexDirection": "row" }}>

                        <Grid item xs={6} sm={12} md={8} style={{ "padding": "0px 50px" }}>
                            <CardMedia
                                component="img"
                                height="auto"

                                image={post.image}
                                alt={post.title}
                            />
                        </Grid>
                        
                        <Grid item xs={6} sm={12} md={4} style={{ "padding": "10px", "margin": "0px", "backgroundColor": "white" }}>
                            <CardHeader className='text-center'
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} src={post.author.avatar}>
                                       
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={post.title}
                                subheader={<Moment fromNow>{post.created_date}</Moment>}
                            />
                            <CloseIcon onClick={go}
                                style={{
                                    "position": "absolute", "top": "100px",
                                    "right": "30px", "color": "#f3f3f3", "cursor": "pointer"
                                }} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary"
                                 dangerouslySetInnerHTML={{ __html: post.description }}
                                >  
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hashtags: {post.tags && post.tags.map((t)=><span>#{t.name} </span>)}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {act}
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <div className='text-center'>{active}</div>
                                    <Divider style={{ "margin": "5px 0px 20px 0px" }} />
                                    {active === "Comment" && <Comments />}
                                    {active === "Auction" && addAution()}
                                </CardContent>
                            </Collapse>
                        </Grid>

                        {/* </Card> */}
                    </Stack>
                </Grid>

            </div>
        </>
    )
}
function addAution() {
    return (
        <>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Nhập vào giá tiền</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    // value={}
                    startAdornment={<InputAdornment position="start">VNĐ</InputAdornment>}
                    label="Nhập vào giá tiền"
                    endAdornment={
                        <IconButton position="start">
                            <SendIcon />
                        </IconButton>
                    }
                />
            </FormControl>
        </>
    )
}

export default PostDetail