import { useState, useEffect } from "react";

import { getUserAdd } from "../../Config/Firebase";
import Header from "../../Component/Header/Header";
import Banner from "../../Component/Banner/Banner";
import Footer from "../../Component/Footer/Footer";
import Heart from "../../assets/Heart";
import { useNavigate } from "react-router-dom";

function MyAdds() {

  useEffect(() => {
    const r = receiveUserAdd()
  }, [])
const navigate=useNavigate()

  const [myAdds, setMyAdds] = useState()

  const receiveUserAdd = async () => {
    const result = await getUserAdd()
    
    setMyAdds(result)
  }


  return (
    <div>
      <Header />
      <Banner />
      {myAdds ?
        <div className="postParentDiv">
          <div className="recommendations">
            <div className="heading">
              <span>My Adds</span>
            </div>
            <div className="cards">
              {/* Map */}
              {myAdds.map(item => {
                return <div className="card" onClick={()=>navigate(`/item/${item.id}`)}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={item.Image} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#8360; {item.Price}</p>
                    <span className="kilometer">{item.Description}</span>
                    <p className="name"> {item.Title}</p>
                  </div>
                </div>
              })}

            </div>
          </div>
        </div>
        :
        <>

        </>
      }

      <Footer />
    </div>

  )
}
export default MyAdds;