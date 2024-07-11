import React from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import Form from "../Form/form";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ onSubmit, onCloseModal }) => {
	const handleBackdropClick = (e) => {
		e.target === e.currentTarget && onCloseModal()
	}

  return createPortal(
    <div className={style.modal} onClick={handleBackdropClick} >
			<h1>Create New Note</h1>
      <Form onSubmit={onSubmit} onCloseModal={onCloseModal}/>
    </div>,
    modalRoot
  );
};
export default Modal;
