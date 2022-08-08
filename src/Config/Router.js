import {
    BrowserRouter as Router,
    Routes,
    Route
}from "react-router-dom"

import Dashboard from "../views/Dashboard"
import Register from '../views/Register/index'
import Login from '../views/Login/index'
import Profile from '../views/Profile/index'
import Create from '../views/CreateAdd';
import MyAdds from '../views/MyAdds';
import EditProfile from '../views/Edit Profile';
import Item from "../views/Item/item"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"


function App() {
const [user,setUser]= useState()    
  useEffect(()=>{
    const auth = getAuth();
  onAuthStateChanged(auth, (user)=>{
  if (user) {
    const uid=user.uid;
    setUser(user)
  }
  else{
  }
})
  },[])


return(
   <Router>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/register" element={(!user)? <Register/>:<Dashboard/>}/>
            <Route path="/login" element={!user? <Login/>:<Dashboard/>}/>
            <Route path="/profile" element={(user)?<Profile/>:<Dashboard/>}/>
            <Route path="/createAdd" element={<Create/>}/>
            <Route path="/item/:adid" element={<Item/>}/>
            <Route path="/myAds" element={(user)?<MyAdds/>:<Dashboard/>}/>
            <Route path="/editProfile" element={(user)?<EditProfile/>:<Dashboard/>}/>
            
        </Routes>
    </Router>
)}

export default App;