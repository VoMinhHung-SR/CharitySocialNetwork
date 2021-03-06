import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {
    CardHeader, CardMedia, CardContent, CardActions, Collapse,
    Divider, FormControl, Grid, InputAdornment, InputLabel, Menu, MenuItem, 
    OutlinedInput, ListItem, ListItemAvatar, List, ListItemText, CircularProgress, Container
} from '@mui/material'
import { useConfirm } from 'material-ui-confirm';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';

import { userContext } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comments from '../Comments';
import PopupDialog from '../controls/PopUpDialog';
import UpdateForm from './UpdateForm';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import Moment from 'react-moment';
import { Form } from 'react-bootstrap';
import { Box } from '@mui/system';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import AddTags from './AddTagsPost';


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

const validationSchema = Yup.object().shape({
    price: Yup.number().positive("Gi?? tr??? ph???i d????ng").typeError("Gi?? tr??? ph???i l?? s???")
        .integer("Gi?? tr??? ph???i l?? s??? nguy??n").required("Gi?? tr??? kh??ng ???????c ph??p tr???ng")
})


const PostDetail = () => {
    //  === Popup Dialog ===
    const [openPopup, setOpenPopup] = useState(false)

    const [menuItemOnClick, setMenuItemOnClick] = useState(0)
    const [menuItemTitle, setMenuItemTitle] = useState('')
    // === Validation ===
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const onSubmitAddAuction = (data) => {
        const addAuction = async () => {
            try {
                const res = await authApi().post(endpoints["add-auction"](postID), {
                    "price": data.price
                })
                if (res.status === 200) {
                    alert("Th??m ?????u gi?? th??nh c??ng")
                    setFlag(!flag);
                }
            } catch (err) {
                console.error(err);
            }
        }

        addAuction();
    }


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
    const [user, dispatch] = useContext(userContext);
    const [flag, setFlag] = useState(false)
    const { postID } = useParams();
    const confirm = useConfirm();
    const nav = useNavigate();
    const go = () => nav("/");
    // ====== Fetch API ======
    const handleChangeFlag = () => {
        setFlag(!flag)
    }


    const [post, setPost] = useState(null);

    
    const [authorId, setAuthorId] = useState("")


    const [content, setContent] = useState();
    const [comments, setComments] = useState([]);


    const [auctioneers, setAuctioneers] = useState([])
    const [isLoadingAuctioneers, setIsLoadingAuctioneers] = useState(true)

    const [liked, setLiked] = useState(false)
    let likeStatus = "default";

    if (liked === true) {
        likeStatus = "error";
    }
    const addLike = async () => {
        const res = await authApi().post(endpoints['like-post'](postID));
        // console.log("????y l?? update like");
        // console.info(res);
        if (res.status === 200)
            setLiked(res.data.like);
    }



    useEffect(() => {
        const loadPost = async () => {
            try {
                let res;
                if (user !== null && user !== undefined)
                    res = await authApi().get(endpoints['postDetail'](postID));
                else
                    res = await APIs.get(endpoints['postDetail'](postID));

                console.info(res.data);
                setPost(res.data);
                setAuthorId(res.data.author.id)
                setLiked(res.data.like);
            } catch (err) {
                console.error(err)
            }
        }
        const loadComments = async () => {
            try {
                const res = await APIs.get(endpoints['comments'](postID));
                setComments(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        const loadAuctioneers = async () => {
            try {
                const res = await APIs.get(endpoints['auctions'](postID));
                setAuctioneers(res.data);
                console.log(res.data);
                setIsLoadingAuctioneers(false);
            } catch (err) {
                console.log(err);
            }
        }
        loadPost();
        loadComments();
        loadAuctioneers();
    }, [flag])



    // === COMMENT ===
    const addComment = async (event) => {
        event.preventDefault();

        const res = await authApi().post(endpoints['add-comment'](postID), {
            'content': content,
            'post': postID,
            'user': user
        });
        console.info(res.data);
        // comments.push(res.data);
        // setComments(comments)
        setComments([...comments, res.data])
        setFlag(!flag)
    }


    //  sumbmit Form add comment - auction
    function addCommentForm() {
        return (
            <>
                {/* render addComment form */}
                <Form onSubmit={addComment}>
                    <FormControl fullWidth >
                        <InputLabel htmlFor="outlined-adornment-amount">Nh???p v??o b??nh lu???n</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            label="Nh???p v??o b??nh lu???n"
                            multiline
                            rows={3}
                            endAdornment={
                                <IconButton position="start" type='submit'>
                                    <SendIcon />
                                </IconButton>
                            }
                        />
                    </FormControl>
                </Form>
            </>
        )
    }

    function addAuctionForm() {
        return (
            <Form onSubmit={handleSubmit(onSubmitAddAuction)}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">Nh???p v??o gi?? ti???n</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        // value={}
                        {...register("price")}
                        name="price"
                        startAdornment={<InputAdornment position="start">VN??</InputAdornment>}
                        label="Nh???p v??o gi?? ti???n"
                        endAdornment={
                            <IconButton position="start" type='submit'>
                                <SendIcon />
                            </IconButton>
                        }
                    />
                    <p>{errors.price ? errors.price.message : ""}</p>
                </FormControl>
            </Form>
        )
    }
    // === SHARING ===
    const onClickSharing = () => {
        const sharingPost = async () => {
            try {
                const res = await authApi().post(endpoints['sharing'](postID))
                console.log(res.data)
                if (res.status === 200) {
                    alert("chia s??? th??nh c??ng");
                }
            } catch (err) {
                console.error(err)
            }
        };
        confirm({
            title: "B???n c?? mu???n chia s??? b??i vi???t n??y kh??ng?",
            description: "B??i vi???t s??? ???????c chia s??? v??o trang c?? nh??n c???a b???n",
            confirmationText: "C??",
            cancellationText: "Kh??ng",
        })
            .then(() => sharingPost())
            .catch((err) => console.error(err));
    }

    // === DELET POST ===
    const onClickDeletePost = () => {
        const deletePost = async () => {
            try {
                const res = await authApi().delete(
                    endpoints["delete-post"](postID)
                );
                console.log(res.data)
                if (res.status === 204) {
                    alert("x??a th??nh c??ng");
                    go();
                }

            } catch (err) {
                console.error(err);
            }
        };
        confirm({
            title: "B???n c?? ch???c ch???n mu???n x??a b??i vi???t n??y kh??ng?",
            description: "B??nh vi???t n??y s??? ???????c x??a v??nh vi???n",
            confirmationText: "C??",
            cancellationText: "Kh??ng",
        })
            .then(() => deletePost())
            .catch((err) => console.error(err));
    }


    let act = <>
        <div style={{ "display": "flex", "textAlign": "center", "width": "100%" }}>
            <p style={{ "margin": "auto" }}>B???n ph???i ????ng nh???p ????? t????ng t??c b??i vi???t</p>
            <Link to="/login" className="nav-link text-primary">Click here!</Link>
        </div>
    </>



    let menuItem = <Box>
        <MenuItem onClick={handleClose} >
            <LoginIcon style={{ "paddingRight": "5px" }} /> ????ng nh???p
        </MenuItem>
    </Box>
    if (user) {
        menuItem =
            <Box>
                <MenuItem onClick={() => { handleClose(); onClickSharing() }} >
                    <ShareIcon style={{ "paddingRight": "5px" }} /> Chia s???
                </MenuItem>
                <MenuItem onClick={handleClose} >
                    <CancelIcon style={{ "paddingRight": "5px" }} /> H???y
                </MenuItem>
            </Box>
        if (user.id === authorId) {
            menuItem =
                <Box>
                    <MenuItem onClick={()=>{
                        handleClose();
                        setOpenPopup(true);
                        setMenuItemOnClick(1);
                        setMenuItemTitle("Ch???nh s???a b??i vi???t")
                    }}>
                        <EditIcon style={{ "paddingRight": "5px" }} /> Ch???nh s???a b??i vi???t
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleClose();
                        setOpenPopup(true);
                        setMenuItemOnClick(2);
                        setMenuItemTitle(" Th??m Hashtags")
                    }}>
                        <EditIcon style={{ "paddingRight": "5px" }} /> Th??m hashtags
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        onClickDeletePost();
                    }}>
                        <DeleteIcon style={{ "paddingRight": "5px" }} /> X??a b??i vi???t
                    </MenuItem>
                    <MenuItem onClick={handleClose} >
                        <CancelIcon style={{ "paddingRight": "5px" }} /> H???y
                    </MenuItem>
                </Box>
        }

    }


    if (user !== null && user !== undefined)
        act = <>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon color={likeStatus} onClick={addLike} />
            </IconButton>

            <IconButton aria-label="add comment"
                onClick={() => {
                    setActive("Comment");
                    handleExpandClick();
                }}>
                <CommentIcon />
            </IconButton>

            <IconButton aria-label="aution"
                onClick={() => {
                    setActive("Auction");
                    handleExpandClick();
                }}>
                <MonetizationOnIcon />
            </IconButton>


            <IconButton aria-label="share" onClick={onClickSharing}>
                <ShareIcon />
            </IconButton>

            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon></ExpandMoreIcon>
            </ExpandMore>
        </>


    // Is author or auctioneers
    let auctionButton = addAuctionForm();
    if (user && user.id === authorId) {
        auctionButton = <Box>
            {isLoadingAuctioneers && auctioneers.length === 0 ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : auctioneers.length === 0 ? (
                <p className='text-center'>S???n ph???m ch??a c?? ng?????i d??ng ?????u gi??</p>
            ) : (
                auctioneers.map((item) => {
                    return (
                        <Box key={item.id}>
                            <Divider style={{ "width": "95%", "margin": "auto" }} />
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="" src={item.user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.user.username}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    price : {item.price.toLocaleString('it-IT', { styled: 'currency', currency: 'VND' })} VN??
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    )
                })
            )}

        </Box>
    }


    if (post === null) {
        return (
            <Box>
                <Container>
                    <CircularProgress />
                </Container>
            </Box>
            
        )
    }

    return (
        <>
            {/* Backgound Render */}
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItem}
            </Menu>
            <PopupDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={menuItemTitle}>
                {menuItemOnClick && menuItemOnClick === 1 ? (
                    <UpdateForm title={post.title} description={post.description} 
                    image={post.image_path} hashtags={post.tags}/>
                ): menuItemOnClick && menuItemOnClick === 2?(
                    <AddTags postID={postID} afterAddTags={handleChangeFlag}/>
                ) : ""} 
                
            </PopupDialog>

            {/* Main */}
            <div style={{ "backgroundColor": "rgba(0,0,0,.65)", "width": "100%" }}>
                <Grid container spacing={2} style={{ "margin": "auto", "width": "75%" }} key={post.id}>
                    <Stack spacing={2} style={{ "margin": "50px 0px", "display": "flex", "flexDirection": "row" }}>

                        <Grid item xs={6} sm={12} md={8} style={{ "padding": "0px 50px" }}>
                            <CardMedia
                                component="img"
                                height="auto"

                                image={post.image_path}
                                alt={post.title}
                            />
                        </Grid>

                        <Grid item xs={6} sm={12} md={4} style={{ "padding": "10px", "margin": "0px", "backgroundColor": "white" }}>
                            <CardHeader className='text-center'
                                avatar={
                                    <Avatar src={post.author.avatar}></Avatar>
                                }
                                action={<IconButton
                                    aria-label="settings"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>}
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
                                    Hashtags: {post.tags && post.tags.map((t) => <span>#{t.name} </span>)}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    <strong>written by: {post.author.username}</strong>
                                </Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                {act}
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <div className='text-center'>{active}</div>
                                    <Divider style={{ "margin": "5px 0px 20px 0px" }} />
                                    {active === "Comment" && addCommentForm()}
                                    {active === "Auction" && auctionButton}
                                </CardContent>
                            </Collapse>


                            {comments.map((comment) => {
                                return (
                                    <Comments
                                        id={comment.id}
                                        authorID={comment.user.id}
                                        image={comment.user.avatar}
                                        username={comment.user.username}
                                        content={comment.content}
                                        created_date={comment.created_date}
                                        clickCommentAction={handleChangeFlag}
                                    />

                                )
                            }
                            )}

                        </Grid>

                    </Stack>
                </Grid>

            </div>
        </>
    )
}



export default PostDetail