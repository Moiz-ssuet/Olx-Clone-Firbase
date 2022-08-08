import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../Component/Footer/Footer'
import Header from '../../Component/Header/Header'
import { getAdById, getUserAdInfo } from '../../Config/Firebase'
import './item.css'

function Item() {
    const [ad, setAd] = useState()
    const [user, setUser] = useState([{}])
    const params = useParams()
    const { adid } = params

    useEffect(() => {
        getAdDetail()
    }, [])

    const getAdDetail = async () => {
        const result = await getAdById(adid)
        setAd(result)
        const usr = await getUserAdInfo(result.uid)
        setUser(usr)
    }
    if (!ad) {
        return <div>Loading...</div>
    }

    const { Title, Image, Price, Description } = ad
    
    return (
        <div>
            <Header />

            <div className="viewParentDiv">
                <div className="imageShowDiv">
                    <img src={Image} alt="" />
                </div>{" "}
                <div className="rightSection">
                    <div className="productDetails">
                        <p>&#8360; {Price}</p>
                        <span>{Title}</span>

                    </div>
                    <div className="productDescription">
                        <p className="p-bold">Product Description</p>
                        <br/>
                        <p>{Description}</p>

                    </div>
                    {user &&
                    <div className="contactDetails">
                        <p className="p-bold">Seller details</p>
                        <br/>
                        <p>Name : {user[0].name}</p>
                        <p>Email : {user[0].email}</p>
                    </div>
                    }

                </div>
            </div>
            <Footer />
        </div>
    )

}
export default Item;