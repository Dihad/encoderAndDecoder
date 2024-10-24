const dbName = 'clickDB';
const dbVersion = 1;
const storeName = 'clicks';

let db;
let combinedClickCount = 0;

// Open the database
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve();
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Add a click to the database
function addClick() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add({});
        request.onsuccess = () => {
            resolve();
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Get the combined click count
function getCombinedClickCount() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.count();
        request.onsuccess = (event) => {
            const count = event.target.result;
            resolve(count);
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Update the combined click count display
function updateCombinedClickCount(count) {
    const combinedClickCountElement = document.getElementById('combined-click-count');
    combinedClickCountElement.textContent = `আমরা এই পর্যন্ত ${count} মেসেজ encode decode করেছি। টার্গেট ১০০০০`;
}

// Handle button clicks
document.getElementById('encode-button').addEventListener('click', async () => {
    await addClick();
    const count = await getCombinedClickCount();
    updateCombinedClickCount(count);
});

document.getElementById('decode-button').addEventListener('click', async () => {
    await addClick();
    const count = await getCombinedClickCount();
    updateCombinedClickCount(count);
});

// Open the database and initialize the combined click count display
openDB().then(() => {
    getCombinedClickCount().then((count) => {
        updateCombinedClickCount(count);
    });
});