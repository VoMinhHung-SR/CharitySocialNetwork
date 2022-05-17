import * as React from 'react';
import {
    Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar,
    Typography, Button, Collapse, FormControl, InputLabel,OutlinedInput
} from '@mui/material';
import Moment from 'react-moment';
import { userContext } from '../App';
import { useConfirm } from 'material-ui-confirm';
import { authApi, endpoints } from '../configs/APIs';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Form } from 'react-bootstrap';

export default function Comments(props) {
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        setOpen(!open);
    };

    const [user] = React.useContext(userContext);
    const confirm = useConfirm();
    const author = props.authorID;

    const [editContent, setEditContent] = React.useState("")
    let editOwnerComment = ""

    // Delete Comment
    const onClickDeleteComment = () => {
        const deleteCommnet = async () => {
            try {
                const res = await authApi().delete(endpoints["comment"](props.id));
                console.log(res.data)
                if (res.status === 204) {
                    props.clickCommentAction();
                }
                // update list
                // handleUpdate();
                // thong bao xoa thanh cong
            } catch (err) {
                // thong bao xoa that bai
                console.error(err);
            }
        };
    
        confirm({
            title: "Bạn có chắc chắn muốn xóa bình luận này không?",
            description: "Bình luận này sẽ được xóa vĩnh viễn",
            confirmationText: "Có",
            cancellationText: "Không",
        })
            .then(() => deleteCommnet())
            .catch((err) => console.error(err));
    }


    // Edit Comment
    const editComment = async (event) => {
        event.preventDefault();
        try{
            const res = await authApi().patch(endpoints['comment'](props.id), {
                'content': editContent
            });
            console.info(res.data);
            if (res.status === 200) {
                handleClick();
                setEditContent("")
                props.clickCommentAction();
            }
        }catch(err){
            console.error(err);
        }
    }

    if (user && user.id === author)
        editOwnerComment =
            <>
                <Button variant="text" size='small' onClick={handleClick}> Chỉnh sửa </Button>

                <Button variant="text" size='small' onClick={() => onClickDeleteComment()}
                    color="error"> Xóa </Button>
                <Collapse in={open} timeout="auto" unmountOnExit style={{"marginTop":"10px"}}>
                    <List component="div" disablePadding>
                        <Form onSubmit={editComment}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="outlined-adornment-amount">Nhập vào bình luận</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={editContent}
                                    onChange={(event) => setEditContent(event.target.value)}
                                    label='Nhập vào bình luận'
                                    placeholder={props.content}
                                    multiline
                                    rows={2}
                                    endAdornment={
                                        <IconButton position="start" type='submit'>
                                            <SendIcon />
                                        </IconButton>
                                    }
                                />
                            </FormControl>
                        </Form>
                    </List>
                </Collapse>
            </>

    return (
        <>
            <Divider style={{ "width": "95%", "margin": "auto" }} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={props.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.username}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {props.content} --
                                    <em>
                                        <span> <Moment fromNow>{props.created_date}</Moment></span>
                                    </em>
                                </Typography>

                                <Typography>

                                    {editOwnerComment}

                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>

        </>

    );
}