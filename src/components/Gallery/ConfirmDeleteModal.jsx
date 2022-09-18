import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className={props.open ? "backdrop active" : "backdrop"}
      onClick={props.close}
    >
      <div className="del-modal">
        <h2>Are you sure you want to delete?</h2>
        <div>
          <button id="del-confirm" onClick={props.delete || props.deleteAll}>
            Delete
          </button>
          <button id="can-confirm" onClick={props.close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = (props) => {
  const portalEl = document.getElementById("portal");
  return ReactDOM.createPortal(
    <Backdrop delete={props.delete} open={props.open} close={props.close} />,
    portalEl
  );
};

export default DeleteModal;
