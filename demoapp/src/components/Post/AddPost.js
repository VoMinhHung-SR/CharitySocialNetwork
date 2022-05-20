import { Container, Button, Box, TextField, Input } from "@mui/material"
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { authApi, authMediaApi, endpoints } from "../../configs/APIs";
import { useNavigate } from "react-router-dom"


const AddPost = () => {


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hashtags, setHashTags] = useState("")
    const nav = useNavigate()

    // ==== FETCH API ====
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const dict = {
        "title": title,
        "description": description,
        "tags": hashtags !== "" ? hashtags.split(",") : [],
        "image": selectedImage,
    }

    const onClickAddPost = (event) => {
        event.preventDefault()

        const addPost = async () => {
            try {

                console.info(dict.image)
                let formData = new FormData();
     
                formData.append("title", title);
                formData.append("description", description);
                for (const tag in hashtags){
                    formData.append("tags", tag);
                }
                formData.getAll("tags")

                formData.append("image", selectedImage);
                const res = await authMediaApi().post(endpoints['add-post'], formData);
                alert("Tạo bài viết thành công");
                nav(`/posts/${res.data.id}/`);
            } catch (err) {
                console.error(err)
            }
        }
        if(selectedImage)
            addPost()
        console.info(dict)

    }




    return (
        <div style={{ "width": "100%", "backgroundColor": "#f3f3f3" }}>

            <Container style={{ "margin": "auto" }}>

                <h1 className="text-center" style={{ "padding": "10px", "color": "rgb(237, 83, 56)" }}>Thêm bài viết mới</h1>
                <form style={{ "width": "50%", "display": "flex", "margin": "auto", "flexDirection": "column" }}
                    onSubmit={(e) => onClickAddPost(e)}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Nhập tiêu đề"
                        value={title} onChange={(evt) => setTitle(evt.target.value)}
                        style={{ "margin": "10px", "backgroundColor": "rgb(255, 255, 255, 0.7)" }}

                    />
                    <TextField
                        label="Nhập mô tả"
                        required
                        multiline
                        value={description} onChange={(evt) => setDescription(evt.target.value)}
                        style={{ "margin": "10px", "backgroundColor": "rgb(255, 255, 255, 0.7)" }}
                    />
                    <TextField
                        id="outlined-required"
                        label="Nhập hastags"
                        placeholder="hashtag1,hashtag2"
                        value={hashtags}
                        onChange={(evt) => setHashTags(evt.target.value)}
                        style={{ "margin": "10px", "backgroundColor": "rgb(255, 255, 255, 0.7)" }}
                    />

                    <Form.Group className="mb-3" controlId="formBasicImage" style={{ "margin": "10px" }}>
                        {/* <Form.Label style={{ "paddingRight": "20px" }}>Chọn hình ảnh*</Form.Label> */}
                        <Input accept="image/*" type="file" id="select-image" style={{ display: 'none' }}
                            onChange={(evt) => setSelectedImage(evt.target.files[0])}
                        />
                        <label htmlFor="select-image">
                            <Button variant="contained" color="primary" component="span">
                                Upload Image*
                            </Button>
                        </label>
                        {imageUrl && selectedImage && (
                            <Box mt={2} textAlign="center" >
                                <img src={imageUrl} alt={selectedImage.name} height="250px" />
                            </Box>
                        )}
                    </Form.Group>

                    <span style={{ "width": "300px", "margin": "10px" }}>
                        <Button variant="contained" color="success" type="submit">Xác nhận</Button>
                    </span>

                </form>

            </Container>
        </div >
    )
}
export default AddPost