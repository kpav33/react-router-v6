// Firebase setup and use code added only as an example
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   doc,
//   getDocs,
//   getDoc,
//   query,
//   where
// } from "firebase/firestore/lite"

// const firebaseConfig = {
//   apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
//   authDomain: "vanlife-a1af5.firebaseapp.com",
//   projectId: "vanlife-a1af5",
//   storageBucket: "vanlife-a1af5.appspot.com",
//   messagingSenderId: "803007000356",
//   appId: "1:803007000356:web:446cd3a1ca406839258db1"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// const vansCollectionRef = collection(db, "vans")

// export async function getVans() {
//   const querySnapshot = await getDocs(vansCollectionRef)
//   const dataArr = querySnapshot.docs.map(doc => ({
//       ...doc.data(),
//       id: doc.id
//   }))
//   console.log(dataArr)
//   return dataArr
// }

// export async function getVan(id) {
//   const docRef = doc(db, "vans", id)
//   const vanSnapshot = getDoc(docRef)
//   return {
//       ...vanSnapshot.data(),
//       id: vanSnapshot.id
//   }
// }

// export async function getHostVans() {
//   const q = query(vansCollectionRef, where("hostId", "==", "123"))
//   const querySnapshot = await getDocs(q)
//   const dataArr = querySnapshot.docs.map(doc => ({
//       ...doc.data(),
//       id: doc.id
//   }))
//   return dataArr
// }

// Create a function to fetch the van data that has error handing added, so that in case of some sort of issues with the api, the page will have proper error handling and properly inform the user of the issues

export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const res = await fetch(url);
  // res.ok is built into the fetch function so you can use it any time
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
