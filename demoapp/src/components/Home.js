import * as React from 'react';
import Container from '@mui/material/Container';
import { Avatar, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Relationship from './Relationship';
import { userContext } from '../App';
import { useContext } from "react";
import LoadPostCard from './Post/LoadPostCard';
const Item = styled(Paper)(
    ({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    })
);


const Home = () =>{
    const [user] = useContext(userContext)
    let sideBar = []
    let temp = 8
    if (user != null ){
        sideBar = <>
        <Grid item xs={4}>
            <Item style={{"margin":"10px", "display":"flex","justifyContent":"center"}}>
                <Avatar src={user.avatar}></Avatar>
                <p style={{"padding":"10px", "justifyContent":"center", "margin":"0"}}>{user.username}</p>
            </Item>
            <Item style={{"margin":"10px"}}>
                <Relationship/>
            </Item>
        </Grid>
    </>
    }

        
    return(
        <>
            <Container maxWidth="md" style={{"padding":"25px 0px 25px 0px"}} >
                <Grid container spacing={12}>
                    <Grid item xs={temp} style={{"margin":"auto"}}>
                        <Item>
                            <LoadPostCard/>
                        </Item>
                    </Grid>
                    {sideBar}
                </Grid>
            </Container>
            
        </>
    )
}

export default Home 