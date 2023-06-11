import React from "react";
import QuestionsContainer from "./QustionsContainer";

function Teacher({ handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <QuestionsContainer />
      <button type="button" onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
}

export default Teacher;
