import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [extend, setExtend] = useState(false);


  const onSent = async (prompt) => console.log("Sent:", prompt);
  const prevPrompts = []; // Provide a default value
  const setRecentPrompt = (prompt) => console.log("Recent prompt:", prompt);
  const newChat = () => console.log("New chat started");

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtend((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
        ></img>

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} />
          {extend ? <p>New Note</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="recent-title">Recent Notes</p>

            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
