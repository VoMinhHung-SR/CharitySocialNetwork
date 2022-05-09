import { Container } from "@mui/material"
import Home from "../components/Home"

const Body = () =>{
    return(
        <>
            <div style={{"width":"100%","backgroundColor":"#f3f3f3" }}>
                <Container >
                    <Home/>
                </Container>
            </div>
        </>
    )
}
export default Body