import React, { useContext } from 'react';
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
import ReportIcon from '@mui/icons-material/Report';
import { userContext } from '../App';
import { Link } from 'react-router-dom';
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


const PostCard = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [user] = useContext(userContext)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [active, setActive] = React.useState("More Description..")


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

    let path = `posts/${props.id}/`

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

            <Stack spacing={2} style={{ "backgroundColor": "#f3f3f3" }}>
                <Card sx={8} id={props.key} style={{ "marginBottom": "20px" }}>
                    <CardHeader
                        avatar={
                            <Avatar src={props.avatar} alt={props.authorUserName}/>
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
                        subheader= {<Moment fromNow>{props.createdDate}</Moment>}
                    />
                    <Link to={path}>
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

