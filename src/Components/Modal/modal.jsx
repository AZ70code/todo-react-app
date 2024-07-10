import React from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import Form from "../Form/form";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ onSubmit, onCloseModal }) => {
  return createPortal(
    <div className={style.modal}>
			<h1>Create New Note</h1>
      <Form onSubmit={onSubmit} onCloseModal={onCloseModal} />
    </div>,
    modalRoot
  );
};
export default Modal;
