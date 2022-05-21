import { Container, Button, TextField, Typography} from "@mui/material"
import { useState } from "react";
import { authApi, endpoints } from "../../configs/APIs";


const AddTags = (props) => {

    const [hashtags, setHashTags] = useState("")
    const [isUploading, setIsUploading] = useState(true)
    // ==== FETCH API ====

    const dict = {
        "tags": hashtags !== "" ? hashtags.split(",") : [],
    }
    
    const onClickAddTagsPost =  (event) => {
        event.preventDefault()
        
        const addTags = async()=>{
            try{
                const res = await authApi().post(endpoints['add-tags'](props.postID),dict)
                if(res.status === 201)
                    props.afterAddTags();
                setIsUploading(false);
            }catch(err){
                console.error(err);
            }
        }
        addTags()
        console.info(dict)
    }
    let lable = ""
    if (isUploading === false)
        lable =  <Typography className="text-center">Thêm thành công vui lòng click 
        <span style={{"color":"red"}}> CANCEL </span> để thoát!!!</Typography>
    return (
        <div style={{ "width": "100%", "backgroundColor": "#f3f3f3" }}>

            <Container style={{ "margin": "auto" }}>

                <form style={{ "width": "60%", "display": "flex", "margin": "auto", "flexDirection": "column" }}
                    onSubmit={(e)=>onClickAddTagsPost(e)}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Nhập hastags"
                        placeholder="hashtag1,hashtag2"
                        value={hashtags}
                        onChange={(evt) => setHashTags(evt.target.value)}
                        style={{ "margin": "10px", "backgroundColor": "rgb(255, 255, 255, 0.7)" }}
                    />

                    <Typography className="text-center"><span style={{"color":"red"}}>Lưu ý:</span> các tags sẽ cách nhau bằng dấu phẩy "a,b,.."</Typography>
                    {lable}
                    <span style={{ "width": "300px", "margin": "10px" }}>
                        <Button variant="contained" color="success" type="submit">Xác nhận</Button>
                    </span>

                </form>
                
            </Container>
        </div >
    )
}
export default AddTags