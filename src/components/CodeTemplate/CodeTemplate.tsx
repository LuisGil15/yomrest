import React from "react";
import QRCode from "react-qr-code";
import Modal from "react-modal";

import "./CodeTemplate.css";

const CodeTemplate = (props: any) => {
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
                },
            }}
            preventScroll={props.preventScroll ?? true}
            onRequestClose={() => (props.onClose ? props.onClose() : null)}
        >
            <div className="modalContainer">
                <div className="modalHeader">
                    <h1>{props.title || "Ejemplo"}</h1>
                </div>
                <div className="modalQr">
                    <QRCode
                        value={props.value || "www.google.com"}
                        size={256}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default CodeTemplate;