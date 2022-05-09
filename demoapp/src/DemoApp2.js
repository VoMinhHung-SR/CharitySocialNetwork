import {useEffect, useState} from "react"
import { Container } from "react-bootstrap"

export default function DemoApp2(){
    const [count, setCount] = useState(0)
    const [users,setUsers] = useState([])
    const [kw,setKW] = useState('')
    useEffect(()=>{
        fetch("/data.json").then(res => res.json()).then(data => {
            setUsers(data.filter(u => u.name.indexOf(kw) >= 0))
        })
    }, [kw])

    useEffect(()=>{
        let timer = setTimeout(()=> setCount(count + 1),1000)
        return () => clearTimeout(timer)
    })
    return(
        <>
            <Container style={{textAlign:"center"}}>
                <h3>Số thời gian trang hoạt động : {count}s</h3>
                <input type="text" placeholder="Nhap gia tri tim kiem..." value={kw}
                onChange={evt => setKW(evt.target.value)}/>
                <ul>
                    {users.map(u => <li key={u.id} style={{listStyleType:"none"}}>{u.name}</li>)}
                </ul>
            </Container>
    
        </>
    )
}