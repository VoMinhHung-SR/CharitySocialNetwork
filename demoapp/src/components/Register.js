import { useRef, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import React from "react"
// import { userContext } from "../App"

function RegisterForm(props){
    return(
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.placeholder}  value={props.value} onChange={props.onChange}/>
        </Form.Group>
    )
    
}



const Login = () => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()
    // const [user,dispatch] = useContext(userContext)


    const register = (event) =>{
        event.preventDefault()
    }

    return(
        <Container style={{"padding":"20px"}}>
            <h1 className="text-center text-danger">Đăng kí người dùng</h1>
            <Form onSubmit={register}>
                <RegisterForm id="firstName" label="Nhập FirstName" type="text" 
                            placeholder="Enter your first name" value={firstName} onChange={(evt) => setFirstName(evt.target.value)}/>
                <RegisterForm id="lastName" label="Nhập LastName" type="text" 
                            placeholder="Enter your last name" value={lastName} onChange={(evt) => setLastName(evt.target.value)}/>
                <RegisterForm id="email" label="Nhập Email" type="email" 
                            placeholder="Enter your email" value={email} onChange={(evt) => setEmail(evt.target.value)}/>
                <RegisterForm id="userName" label="Nhập UserName" type="text" 
                            placeholder="Enter your username" value={username} onChange={(evt) => setUserName(evt.target.value)}/>
                <RegisterForm id="password" label="Nhập password" type="password" 
                            placeholder="Enter your password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                <RegisterForm id="confirmPassword" label="Nhập confirm password" type="password" 
                            placeholder="Enter your password" value={confirmPassword} onChange={(evt) => setConfirmPassword(evt.target.value)}/>
                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" ref={avatar} className="form-control"/>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit" >Submit</Button>
                
            </Form>
        </Container>
    )
}




export default Login