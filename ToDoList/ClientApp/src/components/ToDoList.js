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
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
                <div className="date"> Due date: </div>
                <div className="list-body">
                    <li className="item">
                        <div>
                            <input type="checkbox" />
                            <p>Item 1</p>
                        </div>
                        <div className="buttons">
                            <i class="bi bi-pen"></i>
                            <i class="bi bi-trash"></i>
                        </div>
                    </li>
                    <li className="item">
                        <div>
                            <input type="checkbox" />
                            <p>Item 2</p>
                        </div>
                        <div className="buttons">
                            <i class="bi bi-pen"></i>
                            <i class="bi bi-trash"></i>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    );
}
export default ToDoList;