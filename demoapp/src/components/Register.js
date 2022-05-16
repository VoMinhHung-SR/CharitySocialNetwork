import { useEffect, useState } from "react"
import { Container, Form } from "react-bootstrap"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import APIs, { endpoints } from "../configs/APIs";
import dateFormat from "dateformat";




function RegisterForm(props) {
    return (
        <Form.Group className="mb-3" controlId={props.id} name={props.name} >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.change} />
        </Form.Group>
    )

}

// const validateFromSchema = yup.object().shape({
//     firstName: yup.string().required("First Name should be required please"),
//     lastName: yup.string().required(),
//     email: yup.string().email().required(),
//     age: yup.number().positive().integer().required(),
//     password: yup.string().required(),
//     confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
// });


const Login = () => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [gender, setGender] = useState(0)
    const [address, setAddress] = useState()
    const [dob, setDOB] = useState()
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    const nav = useNavigate()

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    // const [user,dispatch] = useContext(userContext)

    // const { register, handleSubmit, errors } = useForm({
    //     resolver: yupResolver(validateFromSchema),
    // });

    // const submitForm = (data) => {
    //     console.log(data);
    // };

    // console.log(errors);

    const register = (event) => {
        event.preventDefault()

        let date = dateFormat(dob, "isoDateTime")
        
        const registerUser = async () => {
            let formData = new FormData()
            console.log(username);
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("address", address)
            formData.append("phone_number", phoneNumber)
            formData.append("date_of_birth", date)
            formData.append("gender", gender)
            formData.append("avatar", selectedImage)

            let res = await APIs.post(endpoints['register'],formData,{
                headers :{
                    "Content-Type" :"multipart/form-data"
                }
            })
            console.info(res.data);
            alert("Tạo user thành công");
            nav('/login')
        }
        if (email !== null && gender !== null && username !== null && selectedImage !== null && password !== null && password === confirmPassword) {
            registerUser()
        }

    }

    return (
        <div style={{ "width": "100%", "backgroundColor": "#f3f3f3" }}>
            <Container style={{ "padding": "20px" }}>
                <h1 className="text-center text-danger">Đăng kí người dùng</h1>


                <Form onSubmit={register} style={{ "width": "40%", "margin": "auto" }}>

                    <RegisterForm id="firstName" name="firstName" label="Nhập FirstName" type="text"
                        placeholder="Enter your first name" value={firstName} change={(evt) => setFirstName(evt.target.value)} />

                    <RegisterForm id="lastName" name="lastName" label="Nhập LastName" type="text"
                        placeholder="Enter your last name" value={lastName} change={(evt) => setLastName(evt.target.value)} />



                    <RegisterForm id="userName" name="username" label="Nhập UserName" type="text"
                        placeholder="Enter your username" value={username} change={(evt) => setUserName(evt.target.value)} />

                    <RegisterForm id="password" name="password" label="Nhập password" type="password"
                        placeholder="Enter your password" value={password} change={(evt) => setPassword(evt.target.value)} />

                    <RegisterForm id="confirmPassword" name="confirmPassword" label="Nhập confirm password" type="password"
                        placeholder="Enter your password" value={confirmPassword} change={(evt) => setConfirmPassword(evt.target.value)} />

                    <RegisterForm id="email" name="email" label="Nhập Email" type="email"
                        placeholder="Enter your email" value={email} change={(evt) => setEmail(evt.target.value)} />

                    <RegisterForm id="address" name="address" label="Nhập Địa chỉ" type="text"
                        placeholder="Enter your address" value={address} change={(evt) => setAddress(evt.target.value)} />

                    <RegisterForm id="phoneNumber" name="phoneNumber" label="Nhập SĐT" type="text"
                        placeholder="Enter your phone number" value={phoneNumber} change={(evt) => setPhoneNumber(evt.target.value)} />

                    <TextField
                        id="date"
                        label="Ngày sinh"
                        type="date"
                        defaultValue="2000-07-30"
                        value={dob}
                        onChange={(evt)=>setDOB(evt.target.value)}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{"margin":"5px"}}
                    />

                    <FormControl sx={{ width: 220 }} style={{"margin":"5px"}}>
                        <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Giới tính"
                            onChange={(evt) => setGender(evt.target.value)}
                            defaultValue={0}
                        >
                            <MenuItem value={0}>Nam</MenuItem>
                            <MenuItem value={1}>Nữ</MenuItem>
                            <MenuItem value={2}>Bí Mật</MenuItem>
                        </Select>
                    </FormControl>

                    <Form.Group className="mb-3" controlId="formBasicImage" style={{"margin":"5px"}}>
                        <Form.Label style={{ "paddingRight": "20px" }}>Chọn hình ảnh*</Form.Label>
                        <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }}
                            onChange={e => setSelectedImage(e.target.files[0])}
                        />
                        <label htmlFor="select-image">
                            <Button variant="contained" color="primary" component="span">
                                Upload Avatar
                            </Button>
                        </label>
                        {imageUrl && selectedImage && (
                            <Box mt={2} textAlign="center">
                                <img src={imageUrl} alt={selectedImage.name} height="250px" />
                            </Box>
                        )}
                    </Form.Group>


                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}



                    <Button variant="contained" color="primary" type="submit" >Submit</Button>

                </Form>
            </Container>
        </div>





        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <input type="text" placeholder="First name" {...register("First name", { required: true, maxLength: 80 })} />
        //     <input type="text" placeholder="Last name" {...register("Last name", { required: true, maxLength: 100 })} />
        //     <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
        //     <input type="tel" placeholder="Mobile number" {...register("Mobile number", { required: true, minLength: 6, maxLength: 12 })} />
        //     <select {...register("Title", { required: true })}>
        //         <option value="Mr">Mr</option>
        //         <option value="Mrs">Mrs</option>
        //         <option value="Miss">Miss</option>
        //         <option value="Dr">Dr</option>
        //     </select>

        //     <input {...register("Developer", { required: true })} type="radio" value="Yes" />
        //     <input {...register("Developer", { required: true })} type="radio" value="No" />

        //     <input type="submit" />
        // </form>
    );
}




export default Login