import "./Gallery.scss";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { useEffect, useState } from "react";
import ConfimDeleteModal from "./ConfirmDeleteModal";
import LoadingScreen from "../LoadingScreen";

let deleteIndex, deleteValue;

const Gallery = (props) => {
  const [amtOfImgs, setAmtOfImgs] = useState(0);
  const [modal, setModal] = useState(false);
  //Checks for possibility of removal of image
  const [canRemove, setCanRemove] = useState(true);

  const galleryImages = useLiveQuery(
    async () => await db.gallery.toArray(),
    []
  );

  //Function that checks if images are available or not
  const galleryQty = async () => {
    await galleryImages;
    if (galleryImages && galleryImages.length > 0) {
      setAmtOfImgs(galleryImages.length);
      setCanRemove(true);
    } else {
      setAmtOfImgs(0);
      setCanRemove(false);
    }
  };

  //Use effect for checking length of array on initiliazation
  useEffect(() => {
    galleryQty();
  });

  //Function for Delete Confirmation
  const confirmDeleteHandler = (id, value) => {
    setModal(true);
    deleteIndex = id;
    deleteValue = value;
  };

  const cancelDeleteHandler = () => {
    setModal(false);
  };

  //Function to add to Gallery
  const updateGalleryImageHandler = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };

  const deleteHandler = async (classes, id) => {
    //First Function triggers when the classname = fas fa bla blabla
    if (classes === "fa fa-trash") {
      await galleryImages.map((each) => {
        db.gallery.delete(each.id);
        galleryQty();
        return 0;
      });

      //Function to remove individual Images
    } else if (classes === "delete-in") {
      await db.gallery.delete(id);
      setModal(false);
      galleryQty();
    }

    cancelDeleteHandler();
  };

  //Component That shows when modal is empty
  const EmptyGallery = () => {
    return (
      <div className="emptydiv">
        <h2>
          CLICK ON <span className=" fas fa-plus-square"></span> TO ADD IMAGES
        </h2>
      </div>
    );
  };

  return (
    <>
      {galleryImages ? (
        <>
          {" "}
          <ConfimDeleteModal
            open={modal}
            close={cancelDeleteHandler}
            delete={deleteHandler.bind(null, deleteIndex, deleteValue)}
          />
          <div className="discard-img ">
            <input
              id="addPhotoInput"
              type="file"
              accept="image/*"
              name="photo"
            />
            <label
              htmlFor="addPhotoInput"
              className="add-photo-button"
              onClick={updateGalleryImageHandler}
            >
              <i className="fas fa-plus-square" title="Add New Photo"></i>
            </label>
            <i
              className={canRemove ? "fa fa-trash" : "fa fa-trash inactive"}
              aria-hidden="true"
              title={
                canRemove
                  ? "Delete All Photos"
                  : "There is zero image in the gallery"
              }
              onClick={
                canRemove
                  ? confirmDeleteHandler.bind(null, "fa fa-trash")
                  : () => false
              }
            ></i>
          </div>
          <section className={canRemove ? "gallery" : "gallery inactive"}>
            {!amtOfImgs ? (
              <EmptyGallery />
            ) : (
              galleryImages
                ?.map((each, id) => (
                  <div className="item" key={each.id} id={id}>
                    <img src={each.url} alt="item 1" className="item-image" />
                    <button
                      className="delete-button"
                      onClick={confirmDeleteHandler.bind(
                        null,
                        "delete-in",
                        each.id
                      )}
                    >
                      Delete
                    </button>
                  </div>
                ))
                .reverse()
            )}
          </section>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Gallery;
