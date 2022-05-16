import { BrowserRouter,Routes, Route} from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Footer from "./layout/Footer";
import Header from "./layout/Header"
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
import { ConfirmProvider } from 'material-ui-confirm';



export const userContext = createContext()

function App() {
  
  const [user, dispatch] = useReducer(myReducer)
  
  return (
    <BrowserRouter>
      <userContext.Provider value={[user,dispatch]}>
        <ConfirmProvider>
          
          <Header/>
          

          <Routes>
              <Route path="/" element={<Body/>}/>
              <Route path="/posts/:postID" element={<PostDetail/>}/>


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

        </ConfirmProvider>
      </userContext.Provider>
   
    </BrowserRouter>
  );
}

export default App;
