import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Container } from "react-bootstrap";

const Message = (props) => {
    return (
        <>
            <div style={{"width":"100%", "backgroundColor":"#f3f3f3"}}>
                <Container style={{"padding":"30px 0px"}} >
                    <Box sx={{ bgcolor: "background.paper", width: "100%", boxShadow: 3, }}>
                        <Grid container>
                            <Grid item xs={12} md={4} sm={12}>
                                <Typography variant="subtitle1" gutterBottom component="div" sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold' }}>Chats
                                </Typography>
                                <Divider />
                                <List sx={{ width: "100%" }}>
                                    <ListItem button key={""}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt="Profile Picture"
                                                src={"https://mui.com/static/images/avatar/1.jpg"}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={"Nguyen Van A"}
                                            secondary={"Xin chao ban"}
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem button key={""} style={{ width: "100%" }}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt="Profile Picture"
                                                src={"https://mui.com/static/images/avatar/1.jpg"}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={"Nguyen Van B"}
                                            secondary={"Xin chao ban"}
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem button key={""}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt="Profile Picture"
                                                src={"https://mui.com/static/images/avatar/1.jpg"}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={"Nguyen Van C"}
                                            secondary={"Xin chao ban"}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} md={8} sm={12} sx={{ backgroundColor: "lightGray" }}>
                                <Box square style={{"backgroundColor":"#333"}}>
                                    <ListItem button key={""}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt="Profile Picture"
                                                src={"https://mui.com/static/images/avatar/1.jpg"}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={"Nguyen Van A"} style={{"color":"white"}}/>
                                    </ListItem>
                                </Box>
                                <Box sx={{ p: 1 }}>Tin nhan</Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
            
        </>
    );
}

Message.propTypes = {
    window: PropTypes.func,
};

export default Message;
