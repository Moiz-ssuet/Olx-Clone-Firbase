import React from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Header.css';
import { getUserInfo } from '../../Config/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faComment, faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Header(props) {

  const [user,setUser]=useState("")
  const [option, setOption] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const navigate=useNavigate()  


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


  function createAdd() {
    if (user) {
      navigate('/createAdd')
    } else {
      alert("You need to Login First")
    }
  }

  function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")  
      setUser("")
    }).catch((error) => {
      // An error happened.
    });

  }
  function signin() {
    navigate("/login")

  }

  const [prof, setProf] = useState({})

  const receiveUserData = async () => {
    if (user) {
      const result = await getUserInfo()
      setProf(result)
      
    }
  }

  useEffect(() => {
 
    if (user) {
      receiveUserData() 

}
    
  }, [user])



  return (
    <div className="header">
      <div className="navbar">
        <img src="https://pixlok.com/wp-content/uploads/2021/04/OLX-Logo-PNG-300x300.jpg" alt="" onClick={()=>navigate('/')}/>
        <div className="contry_select" id='contry'>
          <div className="select" onClick={() => setOption(!option)}>
            <FontAwesomeIcon icon={faSearch} />
            <p id='text'>Pakistan</p>
            <FontAwesomeIcon icon={faLocationDot} />
          </div>

        </div>
        <div className="search_box">
          <input 
          type="text" 
          className='searchclass' 
          id='searchid' 
          placeholder='Find Cars, Mobile Phones and more...' 
          onChange={(e)=> props.setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        {(!user) ?
          <>
            <div className="login">
              <p id='login_tag' onClick={signin} >Login</p>
            </div>
          </>
          :
          <>
            <div className="message">
              <FontAwesomeIcon icon={faComment} />
            </div>

            <div className="message">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="my_logo">
                    <div className="my_img" id='my_img_id' onClick={() => setDropDown(!dropDown)}>
                      <FontAwesomeIcon icon={faUser}/>
                    </div>
              {dropDown ?
                <>
                  <div className="dropdown" id='dropdownid'>
                        <div className="nameandimg">
                          <img src={prof[0].profilePic} alt="" />
                          <p>{prof[0].name}<br />
                          <h6 onClick={()=>navigate("/editProfile")}>Edit Profile</h6>
                          </p>
                        </div>
                    <ul>
                      <li>

                        <p onClick={() =>navigate('/profile')}>My Account</p>
                      </li>
                      <li>

                        <p onClick={() => navigate('/myAds')}>My Ads</p>
                      </li>
                      <hr />
                      <li>

                        <p onClick={logout}>Logout</p>
                      </li>
                      <hr />
                    </ul>
                  </div>
                </>

                :
                <>
                </>
              }
            </div>


          </>
        }

        <div className="selling_page" onClick={createAdd}>
          <button><FontAwesomeIcon icon={faPlus} />
            <p >SELL</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
