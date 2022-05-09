import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { FormControl, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput } from '@mui/material'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import CommentIcon from '@mui/icons-material/Comment';
import { green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import { useContext } from "react";
import { userContext } from '../App';
import { Link } from 'react-router-dom';
import Comments from './Comments';
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


const Item = styled(Paper)(
    ({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    })
);


const PostCard = () => {
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
                <Card sx={8} >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <Link className='nav-link' to='/posts/postID'>
                        <CardMedia
                            component="img"
                            height="600"
                            image="https://res.cloudinary.com/dl6artkyb/image/upload/v1650272813/Demo/photo-1-15374123555431047291517_echqmt.jpg"
                            alt="Paella dish"
                        />
                    </Link>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                            #hagstag here.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {act}
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {active}
                            {active === "Comment" && <Comments />}
                            {active === "Auction" && addAution()}
                        </CardContent>
                    </Collapse>
                </Card>

                <Card sx={8}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: green[200] }} aria-label="recipe">
                                H
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
                        title="Hùng"
                        subheader="Oct 16, 2001"
                    />
                    <CardMedia
                        component="img"
                        height="600"
                        image="https://res.cloudinary.com/dl6artkyb/image/upload/v1650272800/Demo/tumblr_5429fdf8dd7cd9be820c24d15437f147_0ba84d75_2048_xsmra9.jpg"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {act}
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {active}
                            {active === "Comment" && <Comments />}
                            {active === "Auction" && addAution()}
                        </CardContent>
                    </Collapse>
                </Card>
                <Item>
                    <Stack>
                        <Pagination count={10} variant="outlined" sx={{ margin: "0 auto" }} />
                    </Stack>
                </Item>
            </Stack>
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


export default PostCard

