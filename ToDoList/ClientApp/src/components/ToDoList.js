import "./ToDoList.css";
import { useEffect, useState } from 'react';

const ToDoList = () => {
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        displayLists();
    }, [])

    return (
        <div className="list-container">
            <div style={{ display: "none" }} id="list_id"></div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
            <div className="tabs">
                {lists?.map((key) => (
                    <div key={key.id} id={"tab" + key.id} className="tab" onClick={() => {
                        changeColor(key.id);
                        document.getElementById("list_id").innerHTML = key.id;
                        document.getElementById("dueDate").innerHTML = "Due date: " + key.dueDate.split("T")[0];
                        displayItems(key.id);
                    }}>{key.title}</div>
                )) ?? ""}
                <div id="add-list" onClick={() => {
                    document.getElementById("add-modal").style.display = "block";
                }} className="tab add"><i className="bi bi-plus-lg"></i></div>
            </div>

            <div className="list-items">
                <div id="dueDate" className="date"> Due date: </div>

                <div className="list-body">
                    {items?.map((key) => (
                        <li key={key.id} className="item">
                            <div>
                                <input id={"check-" + key.id} checked={key.isComplete} style={key.isComplete ? { textDecoration: "line-through" } : { textDecoration: "none" }} type="checkbox" onClick={() => {
                                    boxChecked(key.id)
                                }} />
                                <p id={"descr-" + key.id} contentEditable={false} >{key.description}</p>
                            </div>
                            <div className="buttons">
                                <i id={"save-" + key.id} style={{ display: "none" }} onClick={() => {
                                    saveChanges(key.id);
                                }} className="bi bi-check-circle"></i>
                                <i id={"edit-" + key.id} className="bi bi-pen" onClick={() => {
                                    editItem(key.id);
                                }}></i>
                                <i id={"del-" + key.id} onClick={() => {
                                    document.getElementById("delete-modal").style.display = "block";
                                    document.getElementById("deleteItemId").innerHTML = key.id;
                                }} className="bi bi-trash"></i>
                            </div>
                        </li>
                    )) ?? ""}
                    {checkForListId()}

                </div>
            </div>

            <AddList />
            <AddItem />
            <DeleteItem />
        </div>
    );

    function checkForListId() {
        if (document.getElementById("list_id") === null) {
            return (<div></div>);
        } else {
            if (document.getElementById("list_id").innerHTML === "") {
                return (<></>);
            } else {
                return (
                    <li><i id="add-item" onClick={() => {
                        document.getElementById("addItem-modal").style.display = "block";
                    }} className="bi bi-plus-circle"></i>
                    </li>
                );
            }
        }
    }

    function boxChecked(id) {
        let box = document.getElementById("check-" + id);
        let text = document.getElementById("descr-" + id);
        let descr = text.innerHTML;
        if (box.checked == true) {
            text.style.textDecoration = "line-through";
            updateChecked(true, id, descr);
            console.log(id + text)
        } else {
            text.style.textDecoration = "none";
            updateChecked(false, id, descr);
        }
    }

    function updateChecked(complete, id, text) {

        fetch("http://localhost:5212/api/ToDoList/UpdateItem/", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                description: text,
                isComplete: complete
            })
        });
    }
    function changeColor(id) {
        let tabs = document.getElementsByClassName("tab");
        let arr = [...tabs];
        arr.forEach((e) => {
            e.style.background = "linear-gradient(to right, #d3d3d3, white)";
            e.style.borderColor = "gray";
            e.style.color = "black"
        });

        let mainTab = document.getElementById("tab" + id);
        console.log(id);
        mainTab.style.background = "linear-gradient(to right, #0751e9, #1a60ee, #266af5)";
        mainTab.style.borderColor = "#0751e9";
        mainTab.style.color = "white";
    }

    function displayLists() {
        fetch("http://localhost:5212/api/ToDoList/GetLists", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setLists(data);
        });
    }

    function displayItems(id) {
        fetch("http://localhost:5212/api/ToDoList/GetItemsByList/" + id, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setItems(data);
        });
    }

    function editItem(id) {
        let p = document.getElementById("descr-" + id);
        p.setAttribute("contentEditable", true);
        p.style.background = "white";
        p.style.border = "solid 1px gray";
        p.style.paddingInline = "10px";
        document.getElementById("save-" + id).style.display = "block";
        document.getElementById("edit-" + id).style.display = "none";
        document.getElementById("del-" + id).style.display = "none";
    }

    function saveChanges(id) {
        let p = document.getElementById("descr-" + id);
        p.setAttribute("contentEditable", false);
        p.style.background = "";
        p.style.border = "";
        p.style.paddingInline = "";

        document.getElementById("save-" + id).style.display = "none";
        document.getElementById("edit-" + id).style.display = "block";
        document.getElementById("del-" + id).style.display = "block";

        fetch("http://localhost:5212/api/ToDoList/UpdateItem/", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                description: p.innerHTML
            })
        });
    }
}

const AddList = () => {
    return (
        <div id="add-modal" style={{ display: "none" }} className="modal-background">
            <div className="list-modal">
                <i className="bi bi-x" onClick={() => {
                    document.getElementById("add-modal").style.display = "none";
                }}></i>

                <h1>Add List:</h1>
                <label>Title:</label>
                <input id="title-add" type="text" />
                <label>Due date:</label>
                <input id="date-add" type="date" />

                <input onClick={() => {
                    addList();
                }} className="submit-list" type="submit" value="Save" />
            </div>
        </div>
    );

    function addList() {
        let titleInput = document.getElementById("title-add").value;
        let dateInput = document.getElementById("date-add").value;

        fetch("http://localhost:5212/api/ToDoList/AddList/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput,
                dueDate: dateInput
            })
        }).then(function (response) {
            window.location.href = "http://localhost:44411";
        });
    }
}

const AddItem = () => {
    return (
        <div id="addItem-modal" style={{ display: "none" }} className="modal-background">
            <div className="list-modal">
                <i className="bi bi-x" onClick={() => {
                    document.getElementById("addItem-modal").style.display = "none";
                }}></i>

                <h1>Add Item:</h1>
                <label>Description:</label>
                <input id="description-add" type="text" />

                <input onClick={() => {
                    addItem();
                }} className="submit-list" type="submit" value="Save" />
            </div>
        </div>
    );
    function addItem() {
        let p = document.getElementById("description-add").value;
        let id = document.getElementById("list_id").innerHTML;

        fetch("http://localhost:5212/api/ToDoList/AddItem/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Description: p,
                todoListId: id
            })
        }).then(function (response) {
            window.location.href = "http://localhost:44411";
        });
    }
}

const DeleteItem = () => {
    return (
        <div id="delete-modal" style={{ display: "none" }} className="modal-background">
            <div className="deleteItem-modal">
                <h1>Are you sure you want to delete this item?</h1>
                <p id="deleteItemId" style={{ display: "none" }}></p>
                <div className="button-container">
                    <div className="del-btn" onClick={() => {
                        document.getElementById("delete-modal").style.display = "none";
                    }}>Cancel</div>
                    <input className="del-btn submitDel" onClick={() => {
                        deleteItem();
                    }} type="submit" value="Delete" />
                </div>
            </div>
        </div>
    );
    function deleteItem() {
        let id = document.getElementById("deleteItemId").innerHTML;
        fetch("http://localhost:5212/api/ToDoList/DeleteItem/" + id, {
            method: "DELETE"
        }).then(function (response) {
            window.location.href = "http://localhost:44411";
        })
    }
}


export default ToDoList;