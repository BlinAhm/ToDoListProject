import React, { Component } from 'react';
import ToDoList from './ToDoList';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <ToDoList />
            </div>
        );
    }
}
