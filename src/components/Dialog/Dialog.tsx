import React from "react";
import Modal from "react-modal";
import "./Dialog.css";

const Dialog = (props: any) => {
    return (
        <Modal
            isOpen={props.isOpen ?? false}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    border: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    maxWidth: "70%",
                },
            }}
            preventScroll={true}
        >
            <div className="dialogContainer">
                <div className="dialogTitle">
                    <h2>{props.title || "Ejemplo"}</h2>
                </div>
                <div className="dialogContent">{props.children}</div>

                <div className="btnZone">
                    {props.onSubmit && (
                        <button onClick={() => props.onSubmit()}>
                            Confirmar
                        </button>
                    )}
                    <button
                        onClick={() =>
                            props.onCancel ? props.onCancel() : null
                        }
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Dialog;
