import { useEffect, useState } from "react";
import { getUserInfo } from "../../Config/Firebase";
import "./index.css"
function Info() {
    
    const [prof, setProf] = useState("")

    const receiveUserData = async () => {
        const result = await getUserInfo()
        setProf(result)


    }

    useEffect(() => {
       const r= receiveUserData()

    },[])

    return (
        <div>
            {prof ?
                <>
                    {/* Map */}
                    {prof.map(item => {
                        return <div className="card1">
                        <div className="card-header">
                            <img src={item.profilePic} alt="" className="profile-img" />
                        </div>
                    
                        <div className="card-body">
                            <p className="name">{item.name}</p>
                            <p className="mail">{item.email}<br /></p>

                        </div>
                        <div className="card-footer">

                        </div>
                    </div>

                    })}

                </>
                :
                <>
                </>
            }
        </div>

    )
}

export default Info;