import {useState} from "react"
const DemoApp1 = () => {
    const [user, setUser] = useState({
      "firstName" : "Vo",
      "lastName" : "Hung"  
    })

    const changeFn = () =>{
        setUser({
            ...user,
            "firstName" : "Your"
        })
    } 
    const changeLn = () =>{
        setUser({
            ...user,
            "lastName" : "Style"
        })
    } 

    return(
        <>
            <h1>Content: {user.firstName} {user.lastName}</h1>
            <div style={{marginBottom:10}}>
                <input type='button' value="Change your FirstName" onClick={changeFn} />
            </div>
            <div>
                <input type='button' value="Change your LastName" onClick={changeLn}/>
            </div>

        </>
    )
}
export default DemoApp1