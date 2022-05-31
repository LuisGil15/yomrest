import React, {useEffect, useState} from "react";
import Modal from "react-modal";

import "./Form.css"

const Form = (props: any) => {
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState(props.item.name ?? "");
    const [contact, setContact] = useState(props.item.contact ?? "");
    const [address, setAddress] = useState(props.item.address ?? "");

    useEffect(() => {
        if (props.action === "edit") {
            if (name !== props.item.name ||
                contact !== props.item.contact ||
                address !== props.item.address
            ) {
                setDisabled(false);
            }
        } else if (name != "" && contact != "" && address != "") {
            setDisabled(false);
        }
    }, [name, contact, address]);

    return (
        <Modal
            isOpen={props.isOpen ?? false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }
            }}
            preventScroll={true}
            contentElement={() => (
                <div className="form">
                    <div className="formHeaderElement">
                        <h2>
                            {props.action == "edit"
                                ? "Editar elemento"
                                : "Agregar nuevo elemento"}
                        </h2>
                    </div>
                    <div className="controlForms">
                        <div className="formGroup formControlElement">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="formControl"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="formGroup formControlElement">
                            <label htmlFor="contacto">Contacto</label>
                            <input
                                type="text"
                                id="contacto"
                                name="contacto"
                                className="formControl"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        <div className="formGroup formControlElement">
                            <label htmlFor="address">URL</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="formControl"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="formBtns">
                        <button
                            onClick={() =>
                                props.onClose ? props.onClose() : null
                            }
                            className="secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            className={"primary" + (disabled ? " disabled" : "")}
                            disabled={disabled}
                        >
                            {props.action == "edit" ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </div>
            )}
        />
    );
}

export default Form;