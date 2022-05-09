import { Avatar, Container, Divider, Grid, IconButton, Paper, Stack, Tooltip } from "@mui/material"
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Outlet } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    return (
        <>
            <div style={{"width":"100%","backgroundColor":"#f3f3f3"}}>
                <Container style={{ "padding": "20px" }}>
                    <Stack spacing={2}>

                        <br />
                        <Item>
                            <Grid container spacing={3}>
                                <Grid item xs="3" style={{ "margin": "auto" }}>
                                    <Avatar style={{ "margin": "auto", "width": "150px", "height": "150px" }}>Ad</Avatar>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <Item><strong>Họ:</strong> admin</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Tên:</strong> admin</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Email:</strong> admin123@gmail.com</Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item><strong>Số điện thoại:</strong>0123456789</Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item><strong>Địa chỉ:</strong>Tây Ninh</Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item><strong>Ngày sinh:</strong> 16/10/2001</Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item><strong>Giới tính:</strong> Male</Item>
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

                        <Item>
                            <h1>Hiện tại người dùng chưa có bài viết nào</h1>
                            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                                <Item>Bài viết 1 (Nếu có)</Item>
                                <Item>Bài viết 1 (Nếu có)</Item>
                                <Item>Bài viết 1 (Nếu có)</Item>

                            </Stack>

                        </Item>

                    </Stack>
                </Container>
                <br/>
            </div>
            
            
        </>
    )
}

export default Profile