import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import { addLocal, updateLocal } from "../../services/localServices"

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "./Form.css"

const Form = (props: any) => {
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState(props.item.name ?? "");
    const [contact, setContact] = useState(props.item.contact ?? "");
    const [address, setAddress] = useState(props.item.address ?? "");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        if (props.action === "edit") {
            if (name !== props.item.name ||
                contact !== props.item.contact ||
                address !== props.item.address
            ) {
                setDisabled(false);
            }
        } else if (name !== "" && contact !== "" && address !== "") {
            setDisabled(false);
        }
    }, [name, contact, address]);

    function add() {
        setIsLoading(true);

        Promise.all([
            addLocal({
                name,
                contact,
                address
            }, user.token)
        ]).then((res: any) => {
            res = res[0];

            if (res.success) {
                setIsLoading(false);
                props.onClose();
                props.onSubmit();
            } else {
                throw {error: "Ah ocurrido un error"};
            }
        }).catch((error) => {
            setIsLoading(false);
        });
    }

    function update() {
        setIsLoading(true);

        Promise.all([
            updateLocal({
                id: props.item.id,
                name,
                contact,
                address
            }, user.token)
        ]).then((res: any) => {
                res = res[0];
                if (res.success) {
                    setIsLoading(false);
                    props.onClose();
                    props.onSubmit();
                } else {
                    throw { error: "Ah ocurrido un error" };
                }
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    return (
        <Modal
            isOpen={props.isOpen ?? false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            ariaHideApp={false}
            preventScroll={true}
            contentElement={() =>
                !isLoading ? (
                    <div className="form">
                        <div className="formHeaderElement">
                            <h2>
                                {props.action === "edit"
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
                                className={
                                    "primary" + (disabled ? " disabled" : "")
                                }
                                onClick={() =>
                                    props.action === "edit" ? update() : add()
                                }
                                disabled={disabled}
                            >
                                {props.action === "edit"
                                    ? "Actualizar"
                                    : "Crear"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="formLoading">
                        <AiOutlineLoading3Quarters className="loading" />
                    </div>
                )
            }
        />
    );
}

export default Form;