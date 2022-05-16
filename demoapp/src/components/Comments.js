import * as React from 'react';
import {
    Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar,
    Typography, Button
} from '@mui/material';
import Moment from 'react-moment';
import { userContext } from '../App';
import { useConfirm } from 'material-ui-confirm';
import { authApi, endpoints } from '../configs/APIs';


export default function Comments(props) {
    const [user] = React.useContext(userContext);
    const confirm = useConfirm();
    const author = props.authorID;
    let editOwnerComment = ""

    const onClickDeleteComment = () => {
        const deleteCommnet = async () => {
            try {
                const res = await authApi().delete(
                    endpoints["comment"](props.id)
                );
                console.log(res.data)
                if (res.status === 204){
                    props.clickDeleteComment();
                }             
                    // update list
                    // handleUpdate();
                    // thong bao xoa thanh cong thong tin kinh nghiem
                    // dispatch(
                    //   alertOpen("success", Xóa thành thông tin kinh nghiệm ${index + 1})
                    // );
            } catch (err) {
                // thong bao xoa that bai thong tin kinh nghiem

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
    if (user && user.id === author)
        editOwnerComment =
            <>
                <Button variant="text" size='small'> Chỉnh sửa </Button>
                <Button variant="text" size='small' onClick={()=>onClickDeleteComment()}
                    color="error"> Xóa </Button>
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