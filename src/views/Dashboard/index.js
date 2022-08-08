import { getSearchAdd } from "../../Config/Firebase";
import { useState, useEffect } from "react";
import { getAdds } from "../../Config/Firebase";
import Footer from '../../Component/Footer/Footer'
import Header from "../../Component/Header/Header";
import Banner from '../../Component/Banner/Banner'
import Heart from "../../assets/Heart";
import './index.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [allAdds, setAllAdds] = useState()
  const [search, setSearch] = useState()
  const [showSearchAdd, setShowSearchAdd] = useState()
  const navigate=useNavigate()
  
  let a = "";
  useEffect(() => {
    const Add = Adds();

  }, [a])


  const Adds = async () => {
    const result = await getAdds()
    
    setAllAdds(result)
  }

  const searchAdd = async () => {
    const result = await getSearchAdd(search)
    setShowSearchAdd(result)
  }

  useEffect(() => {
    if (search) {
      searchAdd();
    }

  }, [search])

  return (
    <div >
      <Header
        search={search} setSearch={setSearch}
      />
      <Banner />

      {search ?
        <>
          <div className="postParentDiv">
            <div className="recommendations">
              <div className="heading">
                <span>Showing Result for {search}<br /><br /></span>
              </div>
              {(showSearchAdd) ?
                <>
                  {/* Map */}
                  {showSearchAdd.map(item => {
                    return <div className="cards">
                      <div className="card" onClick={()=>navigate(`/item/${item.id}`)}>
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
                    </div>
                  })}
                </>
                :
                <>

                </>
              }

            </div>
          </div>

        </>
        :
        <>
        
        </>
      }

      {allAdds ?
        <>
          <div className="postParentDiv">
            <div className="recommendations">
              <div className="heading">
                <span>Fresh recommendations<br /><br /></span>
              </div>
              <div className="cards">
                {/* Map */}
                {allAdds.map(item => {
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
        </>
        :
        <>
        <div>Loading...</div>
        </>
      }
      <Footer />
    </div>
  )
}

export default Dashboard;