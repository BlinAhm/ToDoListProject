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
                    <div key={key.id} id={"tab"+key.id} className="tab" onClick={() => {
                        changeColor(key.id);
                        document.getElementById("list_id").innerHTML = key.id;
                        
                        displayItems(key.id);
                    }}>{key.title}</div>
                )) ?? ""}
                <div id="add-list" onClick={() => {
                    document.getElementById("add-modal").style.display = "block";
                }} className="tab add"><i className="bi bi-plus-lg"></i></div>
            </div>

            <div className="list-items">
                <div className="date"> Due date: </div>

                <div className="list-body">
                    {items?.map((key) => (
                        <li key={key.id} className="item">
                            <div>
                                <input type="checkbox" />
                                <p>{key.description}</p>
                            </div>
                            <div className="buttons">
                                <i className="bi bi-pen"></i>
                                <i className="bi bi-trash"></i>
                            </div>
                        </li>
                    )) ?? ""}
                </div>
            </div>

            <AddList />
        </div>
    );

    function changeColor(id) {



        let tabs = document.getElementsByClassName("tab");
        let arr = [...tabs];
        arr.forEach((e) => {
            e.style.background = "linear-gradient(to right, #d3d3d3, white)";
            e.style.color = "black"
        });

        var mainTab = document.getElementById("tab" + id);
        console.log(id);
        mainTab.style.background = "linear-gradient(to right, #0751e9, #1a60ee, #266af5)";
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
                <input type="text" />
                <label>Due date:</label>
                <input type="date" />

                <input className="submit-list" type="submit" value="Save" />
            </div>
        </div>
    );
}

export default ToDoList;