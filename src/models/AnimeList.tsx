import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase"; // Adjust the import path according to your project structure

/////////////////////////////////////ADD FUNCTIONS

const colRef = collection(db, "animeList");

export const addToLibrary = async (animeId: number, userId: string) => {
  try {
    const userDocRef = doc(db, "animeList", userId);
    const animesSubcollectionRef = collection(userDocRef, "animes");

    // Add or update the user document in the animeList collection
    await setDoc(userDocRef, { user_id: userId }, { merge: true });

    // Check if the anime already exists in the user's library
    const animeQuery = query(
      animesSubcollectionRef,
      where("anime_id", "==", animeId)
    );
    const animeSnapshot = await getDocs(animeQuery);

    if (!animeSnapshot.empty) {
      console.log("Anime is already in your library");
      return;
    }

    // If the anime does not exist in the user's library, add it
    await addDoc(animesSubcollectionRef, {
      anime_id: animeId,
      watching: false,
    });

    console.log("Anime added to your library");
  } catch (error) {
    console.error("Error adding anime to library: ", error);
  }
};

///////////////////////////////READDD FUNCTIONSS

export const getAnimeListByUserId = async (userId: string) => {
  try {
    // Get a reference to the user document in the animeList collection
    const userDocRef = doc(db, "animeList", userId);
    // Get a reference to the animes subcollection under the user document
    const animesSubcollectionRef = collection(userDocRef, "animes");

    // Fetch all documents in the animes subcollection
    const animeSnapshot = await getDocs(animesSubcollectionRef);

    // Map each document to its data
    const animeList = animeSnapshot.docs.map((doc) => doc.data());

    console.log("Anime list fetched: ", animeList);
    return animeList;
  } catch (error) {
    console.error("Error fetching anime list: ", error);
    return [];
  }
};
