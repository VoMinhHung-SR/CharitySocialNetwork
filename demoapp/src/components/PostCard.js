import React, { useContext, useState } from 'react';
import {
    Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
    Menu, MenuItem
} from '@mui/material'
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import { userContext } from '../App';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { authApi, endpoints } from '../configs/APIs';
import { useConfirm } from 'material-ui-confirm';
import { Box } from '@mui/system';


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


const PostCard = (props) => {

    const [user] = useContext(userContext)
    const confirm = useConfirm();



    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // handleAction
    const [active, setActive] = React.useState("More Description..")

    let act = <>
        <div style={{ "display": "flex", "textAlign": "center", "width": "100%" }}>
            <p style={{ "margin": "auto" }}>B???n ph???i ????ng nh???p ????? t????ng t??c b??i vi???t</p>
            <Link to="/login" className="nav-link text-primary">Click here!</Link>
        </div>
    </>


    // set LikeStatus
    const [liked, setLiked] = useState(props.like)
    let likeStatus = "default";

    const addLike = async () => {
        const res = await authApi().post(endpoints['like-post'](props.id))
        console.info(res)
        if (res.status === 200)
            setLiked(res.data.like)
    }

    if (liked === true) {
        likeStatus = "error"
    }

    const onClickDeletePost = () => {
        const deletePost = async () => {
            try {
                const res = await authApi().delete(
                    endpoints["delete-post"](props.id)
                );
                console.log(res.data)
                if (res.status === 204) {
                    props.clickDeletePost();
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

    const onClickSharing = () =>{
        const sharingPost = async () =>{
            try{
                const res = await authApi().post(endpoints['sharing'](props.id))
                console.log(res.data)
                if(res.status === 200){
                    alert("chia s??? th??nh c??ng");
                }
            }catch(err){
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

    const postDetail = `/posts/${props.id}/`
    const author = props.authorID;

    if (user !== null && user !== undefined) {

        act = <>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon color={likeStatus} onClick={addLike} />
            </IconButton>

            <Link to={postDetail}>
                <IconButton aria-label="add comment">
                    <CommentIcon />
                </IconButton>
            </Link>

            <Link to={postDetail}>
                <IconButton aria-label="aution">
                    <MonetizationOnIcon />
                </IconButton>
            </Link>



            <IconButton aria-label="share" onClick={onClickSharing}>
                <ShareIcon />
            </IconButton>

            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon></ExpandMoreIcon>
            </ExpandMore>
        </>

    }
    


    let menuItem = <Box>
        <Link to={postDetail} style={{"textDecoration":"none", "color":"black"}}>
            <MenuItem onClick={handleClose} >
                <InfoIcon style={{ "paddingRight": "5px" }} /> ??i t???i b??i vi???t
            </MenuItem>
        </Link>
        <MenuItem onClick={handleClose} >
            <CancelIcon style={{ "paddingRight": "5px" }} /> H???y
        </MenuItem>
    </Box>
    if (user && user.id === author)
        menuItem =
            <Box>
                <MenuItem onClick={handleClose} >
                    <EditIcon style={{ "paddingRight": "5px" }} /> Ch???nh s???a b??i vi???t
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



    return (
        <>

            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button'}}>
                {menuItem}
            </Menu>

            <Stack spacing={2} style={{ "backgroundColor": "#f3f3f3" }}>
                <Card sx={8} id={props.key} style={{ "marginBottom": "20px" }}>
                    <CardHeader
                        avatar={
                            <Avatar src={props.avatar} alt={props.authorUserName} />
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
                        title={props.title}
                        subheader={<Moment fromNow>{props.createdDate}</Moment>}
                    />

                    <Link to={postDetail}>
                        <CardMedia
                            component="img"
                            height="600"
                            image={props.image}
                            alt={props.title}
                        />
                    </Link>

                    <CardContent>
                        <Typography variant="body2" color="text.secondary"
                            dangerouslySetInnerHTML={{ __html: props.description }}>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Hashtags: {props.tags}
                        </Typography>
                        <Typography className='text-center' sx={{ fontSize: 14 }} color="text.secondary">
                            written by: <strong>{props.authorUserName}</strong>
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {act}
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {active}
                        </CardContent>

                    </Collapse>
                </Card>
            </Stack>
        </>
    )
}

export default PostCard

