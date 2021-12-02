import React, { useEffect, useState } from 'react';

function Remove(props) {
  return (
    <button type="button"
      style={{ marginBottom: '10px' }}
      onClick={() =>
        props.removeComplete()}>remove complete</button>
  )
}

function TodoList(props) {
  const list = props.todoList;
  const listItems = list.map((item, index) =>
    <li key={index}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={(e) => {
          list[index].checked = !list[index].checked;
          props.updateList(list)
        }}
      />
      <span>{item.name}</span>
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState('');
  const [complete, setComplete] = useState(1);
  const updateList = (data) => {
    const tempList = JSON.parse(JSON.stringify(data))
    setTodoList(tempList)
  }
  const removeComplete = () => {
    setTodoList(todoList.filter(item => item.checked === false))
  }

  useEffect(() => {
    setComplete(todoList.filter(item => item.checked === false).length)
  }, [todoList]);

  return (
    <div style={{ margin: '100px' }}>
      <div>
        <span style={{ marginRight: '10px' }}>{complete} of {todoList.length} todo</span>
        <Remove removeComplete={removeComplete} />
      </div>

      <TodoList todoList={todoList} updateList={updateList} />
      <div>
        <input
          type="text"
          value={todoItem}
          onChange={(e) => { setTodoItem(e.target.value) }}
        />
        <input
          type="submit"
          value="add"
          onClick={() => {
            const item = { name: todoItem, checked: false };
            const tempList = JSON.parse(JSON.stringify(todoList))
            tempList.push(item);
            setTodoList(tempList);
            setTodoItem('')
          }}
        />
      </div>

    </div>
  )
}
export default App;