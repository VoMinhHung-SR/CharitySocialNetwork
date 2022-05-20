import { useContext, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import React from "react"
import { userContext } from "../App"
import APIs, { authApi, endpoints } from "../configs/APIs"
import cookies from "react-cookies"
import { Navigate } from "react-router-dom"

const Login = () => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(userContext)

    const login = async (evt) => {
        evt.preventDefault() 
        
        const res = await APIs.post(endpoints['login'], {
            'username': username,
            'password': password,
            'client_id': '185N8tH5Zp8pHxW5mrK9dWFyKbIEnL7W6H1jk3rH',
            'client_secret': 'bvwCwSkC9HBnqCVwLZoBWIJKEvyLz89Rh7AaCorF3iPVHcHyKErxEHj6AzmJWJ9jGL3vjfwuSydGYuy9YFpBFqF2QfQlZil4MoirVeHe8ot6B6wzvX7DYcBFFxOTH8WA',
            'grant_type': 'password'
        })


        // luu trong cookies
        console.info(res.data)
        cookies.save('token', res.data.access_token)

        // info current user
        const user = await authApi().get(endpoints['current-user'])
        cookies.save('user', user.data)
        
        console.info(user.data)
        dispatch({
            'type': 'login',
            'payload': user.data
        })
    }


    // const login = (evt) =>{
    //     evt.preventDefault()
    //     if(username === 'admin' && password === '123')
    //     dispatch({
    //         "type" : "login",
    //         "payload":{
    //             "username": "admin"
    //         }
    //     })
    // }
    
    if (user != null) {
        return <Navigate to="/" />
    }


    return (
        <Container style={{ "padding": "20px" }}>
            <h1 className="text-center text-danger">Đăng Nhập</h1>
            <Form onSubmit={login} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nhập Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        value={username} onChange={(evt) => setUserName(evt.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password} onChange={(evt) => setPassword(evt.target.value)} />
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