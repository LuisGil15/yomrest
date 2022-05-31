import React, { useEffect, useState } from "react";

//Icons
import { BsSearch, BsPencilSquare, BsTrash } from "react-icons/bs";
import { ImQrcode } from "react-icons/im";
import {IoLogOutOutline} from "react-icons/io5";
import { Content, CodeInfo } from "../../interfaces/Content";

//Components
import Code from "../../components/CodeTemplate/CodeTemplate";
import Dialog from "../../components/Dialog/Dialog";
import Form from "../../components/Form/Form";
import Pagination from "react-js-pagination";

//Style
import "./Dashboard.css"

const Dashboard = () => {
    const [content, setContent] = useState<Array<Content>>([
        {
            id: 1,
            name: "Nombre 1",
            contact: "Contacto 1",
            address: "Direccion 1",
        },
        {
            id: 2,
            name: "Nombre 2",
            contact: "Contacto 2",
            address: "Direccion 2",
        },
        {
            id: 3,
            name: "Nombre 3",
            contact: "Contacto 3",
            address: "Direccion 3",
        },
        {
            id: 4,
            name: "Nombre 4",
            contact: "Contacto 4",
            address: "Direccion 4",
        },
        {
            id: 5,
            name: "Nombre 5",
            contact: "Contacto 5",
            address: "Direccion 5",
        },
        {
            id: 6,
            name: "Nombre 6",
            contact: "Contacto 6",
            address: "Direccion 6",
        },
        {
            id: 7,
            name: "Nombre 7",
            contact: "Contacto 7",
            address: "Direccion 7",
        },
        {
            id: 8,
            name: "Nombre 8",
            contact: "Contacto 8",
            address: "Direccion 8",
        },
        {
            id: 9,
            name: "Nombre 9",
            contact: "Contacto 9",
            address: "Direccion 9",
        },
        {
            id: 10,
            name: "Nombre 10",
            contact: "Contacto 10",
            address: "Direccion 10",
        },
        {
            id: 11,
            name: "Nombre 11",
            contact: "Contacto 11",
            address: "Direccion 11",
        }
    ]);
    const [contentFilter, setContentFilter] = useState<Array<Content>>(content);
    const [search, setSearch] = useState("");
    const [codeInfo, setCodeInfo] = useState<CodeInfo>({});
    const [activePage, setActivePage] = useState(1);

    let itemsCountPerPage = 6;

    useEffect(() => { 
        setContentFilter(
            content.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search]);

    const Row = (props: any) => {
        return (
            <tr key={props.item.id}>
                <td>{props.item.id}</td>
                <td>{props.item.name}</td>
                <td>{props.item.contact}</td>
                <td>{props.item.address}</td>
                <td>
                    <button className="btnIcon" onClick={() => setCodeInfo({
                        name: props.item.name,
                        address: props.item.address,
                        action: "qr"
                    })}>
                        <ImQrcode />
                    </button>
                </td>
                <td>
                    <button
                        className="btnIcon"
                        onClick={() => setCodeInfo({
                            id: props.item.id,
                            name: props.item.name,
                            contact: props.item.contact,
                            address: props.item.address,
                            action: "edit"
                        })}
                    >
                        <BsPencilSquare className="editIcon" />
                    </button>
                    <button
                        className="btnIcon"
                        onClick={() => setCodeInfo({
                            id: props.item.id,
                            name: props.item.name,
                            action: "delete"
                        })}
                    >
                        <BsTrash className="deleteIcon" />
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div>
            <div className="navbar">
                <h3 className="navbarTitle">Dashboard</h3>
                <button className="btnIcon btnLogout">
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
                            />
                        </div>
                        <button
                            className="btn btnAdd"
                            onClick={() =>
                                setCodeInfo({
                                    action: "add",
                                })
                            }
                        >
                            Agregar
                        </button>
                    </div>
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
                                        (activePage * 6) - itemsCountPerPage,
                                        activePage * itemsCountPerPage
                                    )
                                    .map((item, index) => (
                                        <Row key={index} item={item} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    {contentFilter.length > 10 && (
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
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
                        onSubmit={() => console.log("Eliminar")}
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
                            action={codeInfo.action}
                            item={codeInfo}
                            onClose={() => setCodeInfo({})}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;