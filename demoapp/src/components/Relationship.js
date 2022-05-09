
import { Avatar, IconButton } from "@mui/material"
import {  Divider } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const Relationship = () => {
    return(
        <>
            <p style={{"margin":"10px 0px"}}>Những người có thể bạn biết</p>
            <Divider />
            <br/>
            <div style={{"display":"flex"}}>
                <Avatar style={{"width":"24px","height":"24px", "margin":"auto"}}>A</Avatar>
                <p style={{"margin":"10px"}}>Nguyễn Văn A</p>
                <IconButton>
                    <PersonAddIcon></PersonAddIcon>
                </IconButton>
            </div>
            <div style={{"display":"flex", "marginTop":"10px"}}>
                <Avatar style={{"width":"24px","height":"24px", "margin":"auto"}}>B</Avatar>
                <p style={{"margin":"10px"}}>Nguyễn Văn B</p>
                <IconButton>
                    <PersonAddIcon></PersonAddIcon>
                </IconButton>
            </div>
            <div style={{"display":"flex", "marginTop":"10px"}}>
                <Avatar style={{"width":"24px","height":"24px","margin":"auto"}}>C</Avatar>
                <p style={{"margin":"10px"}}>Nguyễn Văn C</p>
                <IconButton>
                    <PersonAddIcon></PersonAddIcon>
                </IconButton>
            </div>
            <div style={{"display":"flex", "marginTop":"10px"}}>
                <Avatar style={{"width":"24px","height":"24px","margin":"auto"}}>D</Avatar>
                <p style={{"margin":"10px"}}>Nguyễn Văn D</p>
                <IconButton>
                    <PersonAddIcon></PersonAddIcon>
                </IconButton>
            </div>
        </>
    )
}
 
export default Relationship