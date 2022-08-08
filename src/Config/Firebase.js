// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, query ,where,setDoc,doc ,getDocs,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAMiFZnZ_Zr73-vAGg2QYacdOYZrRvZOBw",
  authDomain: "olx-clone-ef4f8.firebaseapp.com",
  projectId: "olx-clone-ef4f8",
  storageBucket: "olx-clone-ef4f8.appspot.com",
  messagingSenderId: "65345475228",
  appId: "1:65345475228:web:9d8850b1b0e5a7a7b95359"


};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

async function register(form) {

  const { email, password, name } = form
  
  const result = await createUserWithEmailAndPassword(auth, email, password)
  const uid =result.user.uid

  await setDoc(doc(db, "users", uid), {
    email, name, uid
})

}

async function listAdd(add,url) {

  const uid = auth.currentUser.uid
  const { Title, Description , Price } = add
  const Image = url
  await addDoc(collection(db, "Add"),{Title, Description , Price, uid, Image} )
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    
}

async function getUserInfo() {

  const uid = auth.currentUser.uid
  const q = query(collection(db, "users"), where("uid", "==", uid)) 
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
  data = [...data, doc.data()]
  });

  return data
}

async function getUserAdInfo(uid) {

  const q = query(collection(db, "users"), where("uid", "==", uid)) 
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
  data = [...data, doc.data()]
  });

  return data
}

async function getUserAdd() 
{
  const uid = auth.currentUser.uid
  const q = query(collection(db, "Add"), where("uid", "==", auth.currentUser.uid)) 
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
    const ad = {...doc.data(), id: doc.id}
    data.push(ad) 
    
  
});
return data
  
}

async function getAdds() 
{
  const q = query(collection(db, "Add")) 
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
  const ad = {...doc.data(), id: doc.id}
data.push(ad) 

});
  return data
}

async function getAdById(id) {
  const docRef = doc(db, "Add", id) 
  const docSnap = await getDoc( docRef)
  return docSnap.data()
  }

async function uploadImage(file) {

  const imageRef = ref(storage, 'profileImages/' + file.name)
  const uploadedImage = await uploadBytes(imageRef, file)
  const url = await getDownloadURL(uploadedImage.ref)
  return url
}

async function uploadAddImage(file) {
  
  const imageRef = ref(storage, 'addImages/' + file.name)
  const uploadedImage = await uploadBytes(imageRef, file)
  const url = await getDownloadURL(uploadedImage.ref)
  return url
}

async function updateProfile(data) {
  const uid = auth.currentUser.uid
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

async function getSearchAdd(title) 
{

  const q = query(collection(db, "Add"), where("Title", "==", title)) 
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
    const ad = {...doc.data(), id: doc.id}
    data.push(ad) 
    
});
return data
  
}


export {
  register,
  login,
  listAdd,
  getUserInfo,
  getUserAdd,
  getAdds,
  updateProfile,
  uploadImage,
  uploadAddImage,
getSearchAdd,
getAdById,
getUserAdInfo
}
