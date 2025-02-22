const DB_NAME = "QuizAppDB";
const DB_VERSION = 1;
const LEADERBOARD_STORE = "leaderboard";

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create leaderboard store with auto-incrementing id
      if (!db.objectStoreNames.contains(LEADERBOARD_STORE)) {
        const store = db.createObjectStore(LEADERBOARD_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });

        // Create indexes for querying
        store.createIndex("name", "name", { unique: false });
        store.createIndex("score", "score", { unique: false });
        store.createIndex("date", "date", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${event.target.errorCode}`);
    };
  });
};

export const getLeaderboard = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(LEADERBOARD_STORE, "readonly");
      const store = transaction.objectStore(LEADERBOARD_STORE);
      const scoreIndex = store.index("score");

      // Get top scores in descending order
      const request = scoreIndex.openCursor(null, "prev");
      const results = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && results.length < 10) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = (event) => {
        reject(`Error getting leaderboard: ${event.target.errorCode}`);
      };
    });
  } catch (error) {
    console.error("Failed to get leaderboard:", error);
    return [];
  }
};

export const addToLeaderboard = async (playerData) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(LEADERBOARD_STORE, "readwrite");
      const store = transaction.objectStore(LEADERBOARD_STORE);

      const data = {
        ...playerData,
        date: new Date().toISOString(),
      };

      const request = store.add(data);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(`Error adding to leaderboard: ${event.target.errorCode}`);
      };
    });
  } catch (error) {
    console.error("Failed to add to leaderboard:", error);
    return null;
  }
};
