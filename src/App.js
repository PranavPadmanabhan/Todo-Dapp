import React, { useEffect,useState } from 'react';
import './App.css';
import Todo from './Todo';
import { ethers } from 'ethers'

const App = () =>  {

  const [todo, settodo] = useState('')
  const [todos, settodos] = useState([])

  const connectWallet = () => {
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then((accounts) => {
      })
    }
    else {
      alert('Add Metamask')
    }
  }

  const address = '0x797097b59BFf9b51564bB97A3Ce1536EbDF8C32e';
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_todo",
          "type": "string"
        }
      ],
      "name": "addTodo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_todo",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "updateTodo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "todos",
      "outputs": [
        {
          "internalType": "string",
          "name": "Todo",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const addTodo = (todo) => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(address,abi,signer);
     console.log(contract)
     contract.functions.addTodo(todo).then(() => {
      getTodos()
      settodos([...todos,todo])
      settodo('')
     });
    
  }

  const updateTodo = (todo,index) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address,abi,signer);
    contract.functions.updateTodo(todo,index)
 }

  const getTodos = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(address,abi,provider);
     const todolist = await contract.todos;
     console.log(todolist[0]);
     
  }

  useEffect(() => {
    connectWallet();
    getTodos()
  }, [])
  

    return (
      <div className="App">
        <button onClick={connectWallet} className="connect">connect wallet</button>
       <div className="container">
         <div className="input_container">
           <input placeholder='Enter Todo..' type="text" className="input" onChange={(e)=> settodo(e.target.value)} />
           <button onClick={() => addTodo(todo)} className="Add">Add</button>
         </div>
         <div className="content">
           <span className="heading">TODOS</span>
           <div className="Todos">
             {
               todos.map((item,index) => (
                <Todo index={index} todo={item} key={index}/>
               ) )
             }
           </div>
         </div>
       </div>
      </div>
    );
  
}

export default App;
