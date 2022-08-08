import Banner from "../../Component/Banner/Banner";
import Header from "../../Component/Header/Header";
import { useState } from "react";
import { uploadImage } from "../../Config/Firebase";
import { updateProfile } from "../../Config/Firebase";
import Footer from "../../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";


function EditProfile() {
    const [imageURI, setImageURI] = useState()
    const [loading, setLoading] = useState(false)
const navigate=useNavigate()

    const UpdateProfile = async () => {
        //async await === Promise === Asynchorous Function 
        setLoading(true)
        try {
            const url = await uploadImage(imageURI)
            await updateProfile({ profilePic: url })
            
            navigate('/profile')
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)

        }
    }


    return (
        <div>
            <Header
        
            />
            <Banner />
            <div>
            <div className="signupParentDiv">
                <label>Upload New Profile</label><br /><br />
                
                <input
                    type="file"
                    onChange={(e) => setImageURI(e.target.files[0])}

                />
                <br /><br />
                <br />
                <br />
                
                {!loading ?
                    <>
                        <button onClick={UpdateProfile}>Submit</button>
                    </>
                    :
                    <>
                        <img width="30" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
                    </>
                }
            </div>
        </div>
<Footer/>
        </div>
    );
}
export default EditProfile;