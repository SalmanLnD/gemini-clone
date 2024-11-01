import React from 'react'
import { useState } from'react'
import './Main.css'
import { GoogleGenerativeAI } from '@google/generative-ai';
import {assets} from '../../assets/assets'
const Main = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAPfw_79Mzt7FYU_UUSOXDbga_l3TA7RIU"
  );
  const [promptResponses, setpromptResponses] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getResponseForGivenPrompt= async () => {

    try{
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      const response = await result.response;
      const text = await response.text();
      setpromptResponses([
        ...promptResponses,
        text
      ]);
    }
    catch(error){
      console.log("Something Went Wrong");
    }
  }
  return (
    <div className="main">
        <div className="nav">
            <p> Gemini</p>
            <img src={assets.user_icon} />
        </div>
        <div className="main-container">
          <div className="greet">
            <p><span>Hello, Dev</span></p>
            <p>How can I help you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful to places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt=""/>
            </div><div className="card">
              <p>Briefly summarize the concept: urban planning</p>
              <img src={assets.bulb_icon} alt=""/>
            </div><div className="card">
              <p>Brainstrom team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt=""/>
            </div>
            <div className="card">
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt=""/>
            </div>
          </div>
          
          {promptResponses}
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Enter a prompt here" />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img onClick={getResponseForGivenPrompt} src={assets.send_icon} alt="" />
              </div>
            </div>
            <p className="bottom-info">
              Gemini might display inaccurate info, including about pople, sp double-check its responses. Your privacy and Gemini Apps.
            </p>
          </div>
        </div>
    </div>
  )
}


export default Main;