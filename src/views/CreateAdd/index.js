import './index.css'
import { useState } from 'react'
import { listAdd, uploadAddImage } from '../../Config/Firebase';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import { useNavigate } from 'react-router-dom';


function Create() {
  const [add, setAdd] = useState({})
  const [loading, setLoading] = useState(false)  
  const [image, setImage] = useState()
const navigate=useNavigate();

  const postAdd = async () => {
    //async await === Promise === Asynchorous Function 
    setLoading(true)
    try {
      const url = await uploadAddImage(image)
      var result = await listAdd(add,url)
      navigate('/')
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)

    }
  }


  const updateAdd = (e, key) => {
    setAdd({ ...add, [key]: e.target.value })
  }
  return (
    <div>
      <Header        />
      <div className="parent">


        <div className="centerDiv">
          <br />
          <input
            className="input"
            type="text"
            placeholder="Title"
            onChange={(e) => updateAdd(e, 'Title')}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            placeholder="Description"
            onChange={(e) => updateAdd(e, 'Description')}

          />
          <br />
          <br />
          <input
            className="input"
            type="number"
            placeholder="Price"
            onChange={(e) => updateAdd(e, 'Price')}

          />
          <br />
      <br />
          <input
      type="file"
      onChange={(e) => {
        setImage(e.target.files[0]);
      }}
    />
          <br />
          {!loading ?
            <>
              <button className="uploadBtn" onClick={postAdd}>Submit</button>
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

  )
}

export default Create;