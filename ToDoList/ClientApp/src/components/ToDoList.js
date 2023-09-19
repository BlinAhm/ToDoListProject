import "./ToDoList.css";

const ToDoList = () => {
    return (
        <div className="list-container">
            <div className="tabs">
                <div className="tab">tab1</div>
                <div className="tab">tab1</div>
                <div className="tab add">+</div>
            </div>

            <div className="list-items">
                <div className="date"> Due date: </div>
                <div className="list-body">
                    <li className="item">
                        <div>
                            <input type="checkbox" />
                            <p>Item 1</p>
                        </div>
                        <div>delete</div>
                    </li>
                </div>
            </div>
        </div>
    );
}
export default ToDoList;