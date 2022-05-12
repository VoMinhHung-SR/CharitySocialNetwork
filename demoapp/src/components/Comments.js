import * as React from 'react';
import { Avatar , Divider, List, ListItem, ListItemText, ListItemAvatar, 
        Typography } from '@mui/material';
import Moment from 'react-moment';




export default function Comments(props) {
    return (
        <>
            <Divider style={{"width":"95%","margin":"auto"}}/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={props.image}/>
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
                                    {props.content}
                                </Typography>
                                <span style={{"paddingLeft":"10px"}}> <Moment fromNow>{props.created_date}</Moment></span>
                                
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            
        </>

    );
}