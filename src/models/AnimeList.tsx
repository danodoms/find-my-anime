import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase.js"; // Adjust the import path according to your project structure

/////////////////////////////////////ADD FUNCTIONS

const colRef = collection(db, "animeList");
export const addToLibrary = async (animeId: number, userId: string) => {
  const userDocId = await getUserDocumentId(userId);

  if (userDocId) {
    await addAnimeToExistingDocument(userDocId, animeId);
  } else {
    try {
      await addDoc(colRef, {
        anime_ids: [animeId],
        user_id: userId,
      });
      console.log("Anime added to your library");
    } catch (error) {
      console.error("Error adding anime to library: ", error);
    }
  }
};

const getUserDocumentId = async (userId: string): Promise<any> => {
  const colRef = collection(db, "animeList");
  const q = query(colRef, where("user_id", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    const documentIds = querySnapshot.docs.map((doc) => doc.id); // Extracting document IDs
    console.log("Document IDs found: ", documentIds);
    return documentIds[0]; // Returns an array of document IDs
  } catch (error) {
    console.error("Error fetching user document: ", error);
    return false; // Returns an empty array in case of an error
  }
};

const addAnimeToExistingDocument = async (
  documentId: string,
  newAnimeId: number
) => {
  try {
    const docRef = doc(db, "animeList", documentId); // Get a reference to the document

    await updateDoc(docRef, {
      anime_ids: arrayUnion(newAnimeId), // Add the new anime ID to the anime_ids array
    });
    console.log("New anime added to the document");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

///////////////////////////////READDD FUNCTIONSS

export const getAnimeListByUserId = async (userId: string) => {
  try {
    const colRef = collection(db, "animeList");
    // Create a query against the collection, filtering by user_id
    const q = query(colRef, where("user_id", "==", userId));

    const querySnapshot = await getDocs(q);
    const animes = [];

    querySnapshot.forEach((doc) => {
      animes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Assuming each user has only one document, return the anime_ids of the first document
    if (animes.length > 0) {
      return animes[0].anime_ids;
    } else {
      console.log("No document found for the given userId.");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch user animes:", error);
    return [];
  }
};
