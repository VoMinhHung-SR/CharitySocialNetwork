// import { useEffect, useState } from "react"
// import { NavDropdown } from "react-bootstrap"
// import { Link } from "react-router-dom"
// import { endpoints } from "../API"
// import API from "../API"

// const Category = () => {
//     const [cates, setCates] = useState([])
//     useEffect(() => {
//         const loadCates = async () => {
//             let res = await API.get(endpoints["categories"])
//             setCates(res.data)
//             console.log(res.data)
//         }
//         loadCates()
//     }, [])
//     return <NavDropdown title="Categories" id="collasible-nav-dropdown" >
//         {cates.map(c => <Link to="">{c.name}</Link>)}
//     </NavDropdown>


// }
// export default Category