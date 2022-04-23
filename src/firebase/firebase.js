import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// importaciones necesarias para firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

// importaciones para storage
// import { getStorage } from "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    // inicialización de firestore
    this.db = getFirestore();

    // inicialización de storage
    this.storage = app.storage();

    // añadir un nuevo documento
    this.insertDocument = async function insertDocument(
      coleccion = "",
      cuerpo = {}
    ) {
      const resultado = await addDoc(collection(this.db, coleccion), {
        ...cuerpo,
      });
      return resultado;
    };

    // obtener documentos en tiempo real
    this.getDocumentsRealtime = function getDocumentsRealtime(
      coleccion,
      callback
    ) {
      const documentos = collection(this.db, coleccion);
      onSnapshot(documentos, (querySnapshot) => {
        const realtime = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        callback(realtime);
      });
    };

    // obtener documentos con query
    this.getDocumentsQueryRealtime = function getDocumentsQueryRealtime(
      coleccion,
      callback,
      param,
      compare
    ) {
      const q = query(
        collection(this.db, coleccion),
        where(param, "==", compare)
      );
      onSnapshot(q, (querySnapshot) => {
        const realtime = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        callback(realtime);
      });
    };

    // obtener documentos sin tiempo real
    this.getDocuments = async function getDocuments(coleccion) {
      const documentos = collection(this.db, coleccion);

      const querySnapshot = await getDocs(documentos);
      let array = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return array;
    };

    // actualizar documento
    this.updateDocument = async function updateDocument(coleccion, id, cuerpo) {
      const resultado = await setDoc(doc(this.db, coleccion, id), {
        ...cuerpo,
      });
      return resultado;
    };

    // subida de imagen
    this.uploadFile = async function uploadFile(archivo) {
      return await this.storage.ref(`${archivo}`).put(archivo);
    };
  }
}

const firebase = new Firebase();
export default firebase;
