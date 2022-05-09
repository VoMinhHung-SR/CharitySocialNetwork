import { useContext, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import React from "react"
import { userContext } from "../App"

const Login = () => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [user,dispatch] = useContext(userContext)

    const login = (evt) => {
        evt.preventDefault()
        if(username === 'admin' && password === '123')
            dispatch({
                "type" : "login",
                "payload":{
                    "username": "admin"
                }
            })
    }


    return(
        <Container style={{"padding":"20px"}}>
            <h1 className="text-center text-danger">Đăng Nhập</h1>
            <Form onSubmit={login} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nhập Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"  value={username} onChange={(evt) => setUserName(evt.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" >Submit</Button>
                
            </Form>
        </Container>
    )
}

export default Login