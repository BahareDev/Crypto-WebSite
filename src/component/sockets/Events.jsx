import React from "react";

function Events({ events }) {
  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{JSON.stringify(event)}</li>
      ))}
    </ul>
  );
}

export default Events;
