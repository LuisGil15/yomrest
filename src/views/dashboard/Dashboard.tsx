import React, { useEffect, useState } from "react";
import { Content, CodeInfo, AlertContent } from "../../interfaces/Content";
import Alert from "react-bootstrap/Alert";
import { setUser } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

//Icons
import { BsSearch, BsPencilSquare, BsTrash } from "react-icons/bs";
import { ImQrcode } from "react-icons/im";
import { IoLogOutOutline } from "react-icons/io5";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

//Components
import Code from "../../components/CodeTemplate/CodeTemplate";
import Dialog from "../../components/Dialog/Dialog";
import Form from "../../components/Form/Form";
import Pagination from "react-js-pagination";

//Services 
import { getLocals, deleteLocal } from "../../services/localServices";

//Style
import "./Dashboard.css";

const ItemsCountPerPage = 6;

const Dashboard = () => {
    const [content, setContent] = useState<Array<Content>>([]);
    const [contentFilter, setContentFilter] = useState<Array<Content>>([]);
    const [search, setSearch] = useState("");
    const [codeInfo, setCodeInfo] = useState<CodeInfo>({});
    const [activePage, setActivePage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [alertContent, setAlertContent] = useState<AlertContent>({});
    const {user} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        refreshContent();
    }, []);

    useEffect(() => {
        setContentFilter(
            content.filter((e) =>
                e.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    function delLocal() {
        let id = codeInfo.id;

        setIsLoading(true);
        setCodeInfo({});

        Promise.all([
            deleteLocal(id, user.token)
        ])
            .then((res: any) => {
                res = res[0];

                if (res.success) {
                    setIsLoading(false);
                    refreshContent();
                    setAlertContent({
                        title: "Eliminado",
                        message: "El local se eliminó correctamente",
                        type: "success"
                    });
                } else {
                    throw { error: "Ah ocurrido un error" };
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setAlertContent({
                    title: "Error",
                    message: "No se pudo eliminar el local.",
                })
            });
    }

    function refreshContent() {
        setIsLoading(true);

        Promise.all([getLocals(user.token)])
            .then((res: any) => {
                res = res[0];

                if (res.success) {
                    setTimeout(() => {
                        setContent(res.items);
                        setContentFilter(res.items);
                        setIsLoading(false);
                    }, 1000);
                } else {
                    throw { error: "Ah ocurrido un error" };
                }
            })
            .catch((error) => {
                setAlertContent({
                    title: "Error",
                    message: "No se pudieron cargar los locales.",
                    type: "danger"
                });
            });
    }

    function logOut() {
        localStorage.removeItem("loggedInUser");
        dispatch(setUser({userName: "", password: ""}));
    }

    const AlertDismissible = (props: any) => {
        const [show, setShow] = useState(props.active ? true : false);
        const [type, setType] = useState(props.type);

        useEffect(() => {
            if (show === false && props.active) {
                setAlertContent({})
            }
        }, [show]);

        useEffect(() => {
            if (props.active) {
                const timeOut = setTimeout(() => {
                    show === true &&
                        setShow(false);
                }, 3000);

                return () => clearTimeout(timeOut);
            }
        }, []);

        if (show) {
            return (
                <Alert
                    variant={type}
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>{alertContent.title}</Alert.Heading>
                    <p>
                        {alertContent.message}
                    </p>
                </Alert>
            );
        }

        return null;
    }

    const Row = (props: any) => {
        return (
            <tr key={props.item.id}>
                <td>{props.item.id}</td>
                <td>{props.item.name}</td>
                <td>{props.item.contact}</td>
                <td>{props.item.address}</td>
                <td>
                    <button
                        className="btnIcon"
                        onClick={() =>
                            setCodeInfo({
                                name: props.item.name,
                                address: props.item.address,
                                action: "qr",
                            })
                        }
                    >
                        <ImQrcode />
                    </button>
                </td>
                <td>
                    <button
                        className="btnIcon"
                        onClick={() =>
                            setCodeInfo({
                                id: props.item.id,
                                name: props.item.name,
                                contact: props.item.contact,
                                address: props.item.address,
                                action: "edit",
                            })
                        }
                    >
                        <BsPencilSquare className="editIcon" />
                    </button>
                    <button
                        className="btnIcon"
                        onClick={() =>
                            setCodeInfo({
                                id: props.item.id,
                                name: props.item.name,
                                action: "delete",
                            })
                        }
                    >
                        <BsTrash className="deleteIcon" />
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div>
            <div className="navbar">
                <h3 className="navbarTitle">Dashboard</h3>
                <button className="btnIcon btnLogout" onClick={() => logOut()}>
                    <IoLogOutOutline className="logoutIcon" />
                </button>
            </div>
            <div className="dashboard">
                <div className="dashboardContent">
                    <div className="filter">
                        <div className="filterSearch">
                            <BsSearch className="filterIcon" />
                            <input
                                type="text"
                                className="formControl formControlDash"
                                id="inputFilter"
                                placeholder="Buscar por nombre"
                                onChange={(e) => setSearch(e.target.value)}
                                disabled={isLoading || content.length === 0}
                            />
                        </div>
                        <button
                            className={
                                "btn btnAdd" + (isLoading ? " disabled" : "")
                            }
                            onClick={() =>
                                setCodeInfo({
                                    action: "add",
                                })
                            }
                            disabled={isLoading}
                        >
                            Agregar
                        </button>
                    </div>
                    {!isLoading && content.length > 0 ? (
                        <div className="tableContainer">
                            <table className="tableContent">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Contacto</th>
                                        <th>URL</th>
                                        <th>QR</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contentFilter
                                        .slice(
                                            activePage * 6 - ItemsCountPerPage,
                                            activePage * ItemsCountPerPage
                                        )
                                        .map((item, index) => (
                                            <Row key={index} item={item} />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        (content.length > 0 || isLoading) && (
                            <AiOutlineLoading3Quarters className="loading" />
                        )
                    )}

                    {content.length === 0 && !isLoading ? (
                        <div className="noContent">
                            <h3>No hay locales</h3>
                            <p>Agrega un local para comenzar</p>
                        </div>
                    ) : (
                        contentFilter.length === 0 && !isLoading && (
                            <div className="noContent">
                                <h3>No hay locales</h3>
                                <p>
                                    No hay locales que coincidan con la busqueda
                                </p>
                            </div>
                        )
                    )}

                    {contentFilter.length > 6 && !isLoading && (
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={ItemsCountPerPage}
                            totalItemsCount={contentFilter.length}
                            pageRangeDisplayed={4}
                            onChange={(e) => setActivePage(e)}
                            prevPageText={"Anterior"}
                            nextPageText={"Siguiente"}
                            itemClassPrev={"indexNext"}
                            itemClassNext={"indexNext"}
                            hideFirstLastPages
                        />
                    )}
                </div>
                <div className="dashboardModals">
                    <Code
                        value={codeInfo.address}
                        title={codeInfo.name}
                        isOpen={codeInfo.action?.includes("qr")}
                        preventScroll={true}
                        onClose={() => setCodeInfo({})}
                    />
                    <Dialog
                        onSubmit={() => delLocal()}
                        onCancel={() => setCodeInfo({})}
                        isOpen={codeInfo.action?.includes("delete")}
                    >
                        <div className="dialogText">
                            Seguro que quieres eliminar el registro
                            {" " + codeInfo.id || ""} con nombre{" "}
                            {codeInfo.name || ""}
                        </div>
                    </Dialog>
                    {(codeInfo.action?.includes("edit") ||
                        codeInfo.action?.includes("add")) && (
                        <Form
                            isOpen={
                                codeInfo.action?.includes("edit") ||
                                codeInfo.action?.includes("add")
                            }
                            user={user}
                            action={codeInfo.action}
                            item={codeInfo}
                            onClose={() => setCodeInfo({})}
                            onSubmit={() => {
                                codeInfo.action?.includes("edit") ?
                                    setAlertContent({
                                        title: "Actualizado",
                                        message: "El local se ha editado con exito.",
                                        type: "success"
                                    }) :
                                    setAlertContent({
                                        title: "Creado",
                                        message: "El local se ha editado con exito.",
                                        type: "success"
                                    });
                                refreshContent()
                            }}
                        />
                    )}
                </div>
            </div>
            <AlertDismissible active={alertContent.title} type={alertContent.type} />
        </div>
    );
};

export default Dashboard;
