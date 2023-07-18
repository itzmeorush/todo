import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () =>{
  const list = localStorage.getItem('mytodolist');

  if(list){
    return JSON.parse(list);
  }else{
    return [];
  }
}

const Todo = () => {

  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [edit,setEdit] = useState('');
  const [toggle, setToggle] = useState(false);
 
  // addItem
  function addItem(){
    if(!inputData){
      alert("plz fill the data")
    }else if(inputData && toggle){
        setItems(items.map((curElm)=>{
          if(curElm.id===edit){
            return {...curElm, name:inputData}
          }
          return curElm;
        }))
        setEdit(null);
        setInputData([]);
        setToggle(false);
    }
    else{

      const myNewInputData ={
        id: new Date().getTime().toString(),
        name:inputData
      }
      setItems([...items,myNewInputData]);
      setInputData('');
    }
  }
    // removeItem
  function deleteItem(index){
        const updatedItem = items.filter((curElm)=>{
            return curElm.id !== index;
        })
        setItems(updatedItem);
  }

  // remove all

  function removeAll(){
    setItems([]);
  }

  // localStorage

  useEffect(()=>{
    localStorage.setItem('mytodolist', JSON.stringify(items));
  },[items])

  function editItem(index) {
    const item_todo_edit = items.find((curElm)=>{
        return curElm.id === index;
    });
      setEdit(index);
      setInputData(item_todo_edit.name);
      setToggle(true);
  }
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(e)=>{setInputData(e.target.value)}}
            />
              {
                toggle? <i className="far fa-edit add-btn" onClick={addItem}></i>:
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
              }
          </div>
          {/* show our items  */}
          <div className="showItems">
            {
              items.map((curElm)=>{
                return(
                  <div className="eachItem" key={curElm.id}>
                  <h3>{curElm.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>editItem(curElm.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElm.id)}></i>
                  </div>
                </div>
                )
              })
            }
          
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button className="btn effect04" onClick={removeAll} data-sm-link-text="Remove All">
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
