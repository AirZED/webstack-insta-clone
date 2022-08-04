import Dexie from "dexie";

export const db = new Dexie("My-Instagram-DataBase");

db.version(1).stores({
  bio: ",name,about",
  //the plus plus auto increament the id primary key every time a new one is added
  gallery: "++id,url",
});