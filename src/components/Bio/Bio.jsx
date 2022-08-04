import "./Bio.scss";
import profileIcon from "../../assets/profileIcon.svg";
import getPhotoUrl from "get-photo-url";
import { useEffect, useState } from "react";
import { db } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";

function Bio(props) {
  const [profileImage, setProfileImage] = useState(profileIcon);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  const userDetails = useLiveQuery(() => db.bio.get("info"));
  const userPhoto = useLiveQuery(() => db.bio.get("profilePhoto"));
  // console.log(userDetails);
  const [userNameValue, setUserNameValue] = useState("");
  const [userAboutValue, setUserAboutValue] = useState("");

  //Use Effect Hook for calling from Image from dataBase
  useEffect(() => {
    const setDataFromDb = async () => {
      userPhoto && setProfileImage(userPhoto);
    };

    //Calling the above async function
    setDataFromDb();
  });

  //Update the value of the input sections onclick
  const updateUserInputName = (e) => {
    setUserNameValue(e.target.value);
  };
  const updateAboutValue = (e) => {
    setUserAboutValue(e.target.value);
  };

  //uppdate the values of name and the input sections too
  const updateUserDetailsHandler = async (event) => {
    event.preventDefault();

    //Inputed objectBody
    const bioObjects = {
      name: userNameValue,
      about: userAboutValue,
    };
    // setUserDetails(bioObjects);

    await db.bio.put(bioObjects, "info");

    //CLOSING THE MODAL ON SUBMISSION
    setEditFormIsOpen(false);

    //UPDATING STATE OF INPUT SECTION
    setUserNameValue("");
    setUserAboutValue("");
  };

  const changeProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    setProfileImage(newProfilePhoto);

    await db.bio.put(newProfilePhoto, "profilePhoto");
  };

  //Open Edit Name Modal at certain conditions
  const openEditModal = () => {
    !editFormIsOpen ? setEditFormIsOpen(true) : setEditFormIsOpen(false);
  };

  const editFormBlock = (
    <form className="edit-bio-form" onSubmit={updateUserDetailsHandler}>
      <input
        type="text"
        name="name"
        onChange={updateUserInputName}
        value={userNameValue}
        placeholder="Your name"
      />
      <input
        type="text"
        placeholder="About you"
        name="name"
        onChange={updateAboutValue}
        value={userAboutValue}
      />
      <div className="btns">
        <button className="cancel-button" type="button" onClick={openEditModal}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );

  return (
    <section className="bio">
      <input
        accept="image/*"
        type="file"
        name="profilePhotoInput"
        id="profilePhotoInput"
        onClick={changeProfilePhoto}
      />
      <label
        className="profile-photo"
        role="button"
        title="Click to Edit Photo"
        htmlFor="profilePhotoInput"
      >
        <img src={profileImage} alt="Profile Icon" />
      </label>
      <div className="profile-info">
        <p className="name">{userDetails && userDetails.name }</p>
        <p className="about">
          {userDetails && userDetails.about}
        </p>
        {!editFormIsOpen && <button onClick={openEditModal}>Edit</button>}
        {editFormIsOpen && editFormBlock}
      </div>
    </section>
  );
}

export default Bio;
