import { BrowserRouter,Routes, Route} from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Footer from "./layout/Footer";
import Header from "./layout/Header"
import Category from "./components/Category";
import { createContext, useReducer } from "react";
import myReducer from "./reducers/myreducer";
import Login from "./components/Login";
import Register from "./components/Register";
import Message from "./components/Message";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Body from "./layout/Body";
import AddPost from "./components/Post/AddPost";
import PostDetail from "./components/Post/PostDetail";




export const userContext = createContext()

function App() {
  
  const [user, dispatch] = useReducer(myReducer)
  
  return (
    <BrowserRouter>
      <userContext.Provider value={[user,dispatch]}>
      
        <Header/>
        
        <Routes>
            <Route path="/" element={<Body/>}/>
            <Route path="/posts/:postID" element={<PostDetail/>}/>
            <Route path="/categories" element={<Category/>}/>


            <Route path="/login"  element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/profile" element={<Profile/>}>
              <Route path='edit-profile' element={<EditProfile/>}/>
            </Route>

            <Route path="/add-post" element={<AddPost/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/inbox" element={<Message/>}/>

        </Routes>
        <Footer/>

      </userContext.Provider>
   
    </BrowserRouter>
  );
}

export default App;
