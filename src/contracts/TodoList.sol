// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TodoList {
    struct Todo{
        string Todo;
    }

    Todo[] public todos;

    function addTodo(string calldata _todo) public {
        todos.push(Todo(_todo));
    }

    function updateTodo(string calldata _todo, uint _index) public {
        todos[_index].Todo = _todo;
    }

}