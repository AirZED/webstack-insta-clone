const DeleteModal = (props) => {
  return (
    <div className={props.open ? "backdrop active" : "backdrop"}>
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

export default DeleteModal;
