import { Container,Button,Box } from "@mui/material"
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";


const AddPost = () => {

    const [title, setTitle] = useState('')
    const [desciption, setDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    return (
        <>

            <div style={{ "width": "100%", "backgroundColor": "#f3f3f3" }}>

                <Container style={{ "padding": "20px" }}>

                    <h1 className="text-center" style={{ "padding": "10px", "color": "rgb(237, 83, 56)" }}>Thêm bài viết mới</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Nhập tiêu đề</Form.Label>
                            <Form.Control type="text" placeholder="Enter your title..."
                                value={title} onChange={(evt) => setTitle(evt.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Nhập vào mô tả</Form.Label>
                            <Form.Control type="text" placeholder="Enter your description..."
                                value={desciption} onChange={(evt) => setDescription(evt.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label style={{"paddingRight":"20px"}}>Chọn hình ảnh*</Form.Label>
                            <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }}
                                onChange={e => setSelectedImage(e.target.files[0])}
                            />
                            <label htmlFor="select-image">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            {imageUrl && selectedImage && (
                                <Box mt={2} textAlign="center">
                                    <img src={imageUrl} alt={selectedImage.name} height="250px" />
                                </Box>
                            )}
                        </Form.Group>
                    </Form>
                    <Button variant="contained" color="success" component="span">Xác nhận</Button>

                </Container>
            </div>
        </>

    )
}
export default AddPost