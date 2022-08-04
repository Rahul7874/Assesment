import React, {useState, useEffect} from "react";
import './App.css';
import {  Input, Button, ChakraProvider } from '@chakra-ui/react'



function App() {
  const [name, setName] =useState("");
  const [userName, setUsername] =useState("");
  const [avatar, setAvatar] =useState("");
  const [repos ,setRepos] =useState("");
  const [gists, setGists] =useState("");
  const [date, setDate] =useState(""); 
  const [userInput, setUserInput] =useState("")
 
  useEffect(()=>{
 fetch(`https://api.github.com/users/example`)
 .then(res=>res.json())
 .then(data=>{
  setData(data)
 })
  },[]);

  const setData =({
    name, 
    login, 
    avatar_url, 
    public_repos, 
    public_gists, 
    created_at 
  })=>
  {
   setName(name);
   setUsername(login);
   setAvatar(avatar_url);
   setRepos(public_repos);
   setGists(public_gists);
   setDate(created_at);
  };

  const handleSearch =(e) =>{
    setUserInput(e.target.value)
  }

  const handleSubmit =()=>{
    fetch(`https://api.github.com/users/${userInput}`)
 .then(res=>res.json())
 .then(data=>{
  setData(data)
  setUserInput("")
 })
  }
  return (
    <ChakraProvider>
    <div className="App">
      <div 
      className="navbar">Github Search</div>
      
      <div className="inputbox">
        <form>
        <Input type="text" width="200px" value={userInput} onChange={handleSearch} placeholder="Username"/>
        <Button onClick={handleSubmit}>Search</Button>
        </form>
      </div>

      <div className="cards">
     <img src={avatar}/>
     <div className="details">
     <h2>Name :- {name}</h2>
     <h2>Username :- {userName}</h2>
     <p>Public-Repos :- {repos}</p>
     <p>Public-Gists :- {gists}</p>
     <p>Created-ON :- {date}</p>
     </div>
      </div>
    </div>
    </ChakraProvider>
    
  );
}

export default App;