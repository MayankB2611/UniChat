import React,{useRef,useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import {auth} from "../firebase";

import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Chats=() =>{
    const history = useHistory();
    const {user} =useAuth();
    const[loading,setLoading]=useState(true);

    const handleLogout=async()=>{
       await auth.signOut();
    history.push('/');
    }
    
    const getFile = async (url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{type:'image/jpeg'});
    }

    useEffect(()=>{
      if(!user){
        history.push('/');
        return;
      }
      axios.get('https://api.chatengine.io/users/me',{
        headers:{
            "project-id":"7dc149f-b4b4-4408-b439-5adef0813c10",
            "user-name":user.email,
            "user-secret":user.uid,
        }

      })
      .then(()=>{
        setLoading(false);
      })
      .catch(()=>{
        let formdata = new FormData();
        formdata.append('email',user.email);
        formdata.append('username',user.displayName);
        formdata.append('secret',user.uid);

        getFile(user.photoURL)
        .then((avatar)=>{
            formdata.append('avatar',avatar,avatar.name);

            axios.post('https://api.chatengine.io/users',formdata,{header:{"private-key":"c2fe2da7-aa35-4a4a-b6b6-6a7b8a3cc33f" }}
            )
            .then(()=>setLoading(false))
            .catch((error) => console.log(error))
            
        })
      })
    },[user,history])

   if(!user || loading) return "Loading ...";
    return(
     <div className = "chats-page">
        <div className = "nav-bar">
            <div className="logo-tab">
            Unichat
             </div>
            <div onClick={handleLogout} className="logout-tab">
                Logout
            </div>   
        </div>
          
          <ChatEngine
             height ="clac(100vh - 66px)"
             projectID="d7dc149f-b4b4-4408-b439-5adef0813c10"
             userName={user.email}
             userSecret={user.uid}
          />
     </div>
    )

}
export default Chats;