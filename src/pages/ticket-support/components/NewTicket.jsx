import React from "react";

function NewTicket() {
  return (
    <div>
      <h2>NewTicket</h2>

      <div className="bg-white flex flex-col h-screen">
        <div>message</div>
        <div className="flex">
          <button className="bg-violet-300">Send</button>
          <input type="text" className="border" />
        </div>
      </div>
    </div>
  );
}

export default NewTicket;
