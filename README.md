🚩ABOUT🚩
Insta-Clone as I choose to call it is a PWA (Progressice web app) built with REACT JS, DEXIE JS, SASS, AND INDEXED DB that works a photogallery or profile showoff where you can show you profle information or Bio Data and also update Photos of you. 

It is a frontend application that saves uploaded information until even after reload using indexed BD. 

IndexedDB is a database provided by the browser that is more effecient that sesssion storage and localStorage as it takes it storage capacity from the storage available in your local Machine.

Since indexedDB is a little cranky to manipulated using its core Js API, I made use of dexie Js (A minimalistic Indexed DB wrapper) to manipulated database, hence I used useLiveQuery, a hook of indexed DB to query the IndexedDB and React Js hooks for other reactive functionalities. 

The made use of Service Worker to make it a PWA.

🚩LOGIC INFORMATION🚩
This APP core logic is written in React Js 

The APP is Made up of a Single Screen which is APP.JS and Four Components, which includes;

Nav.jsx, Gallery.jsx, Bio.jsx and ConfirmDelete.jsx. 

Each of these components are completely reuseable and contains its specific logic that is, The Nav components controls the Navigation Bar, The Bio Components controls the Bio Data Area, the Gallery Component controls the Gallery Area.

🚩KEYWORDS🚩
useState, useEffect, useLiveQuery, database.

