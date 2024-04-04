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
  deleteDoc,
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

// export const listenToAnimeUpdatesByUserId = (
//   userId: string,
//   callback: (animeList: Anime[]) => void
// ) => {
//   const q = query(collection(db, "animeList"), where("user_id", "==", userId));

//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const animes: Anime[] = [];
//     querySnapshot.forEach((doc) => {
//       animes.push(doc.data() as Anime);
//     });
//     callback(animes);
//   });
//   d;

//   return unsubscribe;
// };

// export const listenToAnimeUpdatesByUserId = (
//   userId: string,
//   updateUI: Function
// ) => {
//   // Get a reference to the user document in the animeList collection
//   const userDocRef = doc(db, "animeList", userId);
//   // Get a reference to the animes subcollection under the user document
//   const animesSubcollectionRef = collection(userDocRef, "animes");

//   // Listen for changes in the animes subcollection
//   const unsubscribe = onSnapshot(animesSubcollectionRef, (snapshot) => {
//     // Map each document to its data
//     const animeList = snapshot.docs.map((doc) => doc.data());

//     // Update the UI with the new anime list
//     updateUI(animeList);
//   });

//   // Return the unsubscribe function to allow stopping the listener
//   return unsubscribe;
// };

/////////////////////////////////////DELETE FUNCTIONSSSSS///////////////////////////////////
export const deleteFromLibrary = async (animeId: number, userId: string) => {
  try {
    // Reference to the user's document
    const userDocRef = doc(db, "animeList", userId);
    // Reference to the animes subcollection under the user document
    const animesSubcollectionRef = collection(userDocRef, "animes");

    // Query to find the specific anime document by animeId
    const animeQuery = query(
      animesSubcollectionRef,
      where("anime_id", "==", animeId)
    );
    const querySnapshot = await getDocs(animeQuery);

    // If the anime exists, delete it
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(animesSubcollectionRef, document.id));
      });
      console.log("Anime removed from your library");
    } else {
      console.log("Anime not found in your library");
    }
  } catch (error) {
    console.error("Error removing anime from library: ", error);
  }
};

//////////////////////UPDATE FUNCTIONS/////////////////////

export const toggleWatchingStatus = async (userId: string, animeId: number) => {
  try {
    // Reference to the user's document
    const userDocRef = doc(db, "animeList", userId);
    // Reference to the animes subcollection under the user document
    const animesSubcollectionRef = collection(userDocRef, "animes");

    // Query to find the specific anime document by animeId
    const animeQuery = query(
      animesSubcollectionRef,
      where("anime_id", "==", animeId)
    );
    const querySnapshot = await getDocs(animeQuery);

    if (!querySnapshot.empty) {
      // Assuming there's only one document for each animeId
      const animeDocRef = doc(animesSubcollectionRef, querySnapshot.docs[0].id);
      const currentWatchingStatus = querySnapshot.docs[0].data().watching;

      // Invert the 'watching' status
      await updateDoc(animeDocRef, {
        watching: !currentWatchingStatus,
      });

      console.log("Watching status toggled successfully.");
    } else {
      console.log("Anime not found in your library.");
    }
  } catch (error) {
    console.error("Error toggling watching status: ", error);
  }
};
