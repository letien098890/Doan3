import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA49VmTMBr8w3BARosxXTtwzgF61qeZjcU",
    authDomain: "cafe-doan3.firebaseapp.com",
    projectId: "cafe-doan3",
    storageBucket: "cafe-doan3.appspot.com",
    messagingSenderId: "902466562684",
    appId: "1:902466562684:web:9a4d34a4f9c5fce088f7f9",
    measurementId: "G-N59HR463P3"
  };
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const dbStorage = getStorage(app);
  
  
  const uploadFile = async (file, nameFile, parentFolder = "products") => {
    const fullPath = `${parentFolder}/${nameFile}`;
    const storageRef = ref(dbStorage, fullPath);
    const data = await uploadBytes(storageRef, file);

    return {
        data,
        fullPath,
    };
};

const deleteFile = async (path) => {
    if (!path) return;
    const desertRef = ref(dbStorage, path);
    return deleteObject(desertRef);
};

const getUrl = async (path) => {
    const refPath = ref(dbStorage, path);
    return getDownloadURL(refPath);
};

const uploadAndGetUrl = async (file, nameFile, parentFolder = "products") => {
    const { fullPath } = await uploadFile(file, nameFile, parentFolder);
    return {
        url: await getUrl(fullPath),
        fullPath,
    };
};

export const storage = { uploadFile, getUrl, uploadAndGetUrl, deleteFile };