import "./Gallery.scss";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { useEffect, useState } from "react";
import ConfimDeleteModal from "./ConfirmDeleteModal";

let deleteIndex;

function Gallery(props) {
  const [amtOfImgs, setAmtOfImgs] = useState(0);
  const [modal, setModal] = useState(false);

  const galleryImages = useLiveQuery(
    async () => await db.gallery.toArray(),
    []
  );

  //Function that checks if images are available or not
  const galleryQty = async () => {
    await galleryImages;
    if (galleryImages && galleryImages.length > 0) {
      setAmtOfImgs(galleryImages.length);
    } else {
      setAmtOfImgs(0);
    }
  };

  //Use effect for checking length of array on initiliazation
  useEffect(() => {
    galleryQty();
  });

  //Function for Delete Confirmation
  const confirmDeleteHandler = (id, amountOfEl) => {
    setModal(true);
    deleteIndex = id;
  };

  const cancelDeleteHandler = () => {
    setModal(false);
  };
  //Function to delete Individual Images
  const updateGalleryImageHandler = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };

  const deleteImage = async (id) =>
  {
    
    await db.gallery.delete(id);
    setModal(false)
    galleryQty();
  };

  //Function to delete All Items
  const deleteAllImages = async () => {
    console.log(galleryImages.length);
    await galleryImages.map((each) => {
      db.gallery.delete(each.id);
      galleryQty();
    });
  };

  //To be used eventually
  // deleteImage.bind(null, each.id)

  //Component That shows when modal is empty
  const EmptyGallery = () => {
    return (
      <div className="emptydis">
        <h2>
          CLICK ON <span className=" fas fa-plus-square"></span> TO ADD IMAGES
        </h2>
      </div>
    );
  };

  return (
    <>
      <ConfimDeleteModal
        open={modal}
        close={cancelDeleteHandler}
        delete={deleteImage.bind(null, deleteIndex)}
        deleteAll = {deleteAllImages}
      />
      <div className="discard-img ">
        <input id="addPhotoInput" type="file" accept="image/*" name="photo" />
        <label
          htmlFor="addPhotoInput"
          className="add-photo-button"
          onClick={updateGalleryImageHandler}
        >
          <i className=" fas fa-plus-square" title="Add New Photo"></i>
        </label>
        <i
          className="fa fa-trash"
          aria-hidden="true"
          title="Delete All Photos"
          onClick={confirmDeleteHandler}
        ></i>
      </div>

      <section className="gallery">
        {/*!galleryImages && <h2> Loading...</h2>*/}
        {!amtOfImgs ? (
          <EmptyGallery />
        ) : (
          galleryImages
            ?.map((each, id) => (
              <div className="item" key={each.id} id={id}>
                <img src={each.url} alt="item 1" className="item-image" />
                <button
                  className="delete-button"
                  onClick={confirmDeleteHandler.bind(null, each.id)}
                >
                  Delete
                </button>
              </div>
            ))
            .reverse()
        )}
      </section>
    </>
  );
}

export default Gallery;
