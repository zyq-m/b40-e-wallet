// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  collectionGroup,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR-0We8n4WjJ_MOAXzLsIZIvdMqiYnR10",
  authDomain: "b40-e-wallet.firebaseapp.com",
  projectId: "b40-e-wallet",
  storageBucket: "b40-e-wallet.appspot.com",
  messagingSenderId: "914237063196",
  appId: "1:914237063196:web:a57fe3de053320bbb51fd9",
  measurementId: "G-B1JJYY99LN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const add = async () => {
  const docRef = await addDoc(collection(db, "cities"), {
    name: "Tokyo",
    country: "Japan",
  });
  console.log("Document written with ID: ", docRef.id);
};

export const getUser = async ({ matricNo, cafeId }) => {
  let ref;
  let q;

  try {
    if (matricNo) {
      ref = collection(db, "students");
      q = query(ref, where("matricNo", "==", matricNo));
    } else {
      ref = collection(db, "cafeOwners");
      q = query(ref, where("cafeId", "==", cafeId));
    }

    const qs = await getDocs(q);
    let docs;

    qs.forEach(doc => {
      docs = { exist: doc.exists(), id: doc.id, data: doc.data() };
    });

    return docs;
  } catch (error) {
    return false;
  }
};

export const getUserCollection = async ({ matricNo }) => {
  try {
    const dataCollection = query(
      collectionGroup(db, "students"),
      where("matricNo", "==", matricNo)
    );
    const qs = await getDocs(dataCollection);

    qs.forEach(doc => {
      console.log(doc.id, "==>", doc.data());
    });
  } catch (error) {
    console.error(error);
  }
};

// export const addTransactionHistory = async ()=> {
//   const studentsRef = collection(db, 'students')
//   await Promise.all([
//     addDoc(collection(studentsRef, 'mm', 'transactionHistory'), {

//     })
//   ])
// }

export const updateBalance = async ({ uid, value }) => {
  const studentsRef = doc(db, "students", uid);
  await updateDoc(studentsRef, { balance: value });
};

export const updatCafeBalance = async ({ uid, value }) => {
  const cafeOwnersRef = doc(db, "cafeOwners", uid);
  await updateDoc(cafeOwnersRef, { balance: value });
};

export const getCafeBalance = async ({ uid }) => {
  const docRef = doc(db, "cafeOwners", uid);
  return await getDoc(docRef);
  // console.log(docSnap.exists(), docSnap.data());
};
