import { useEffect, useState } from "react";
import { socket } from "../../socket";
import ConnectionState from "../../component/sockets/ConnectionState";
import Events from "../../component/sockets/Events";
import ConnectionManager from "../../component/sockets/ConnectionManager";
import MyForm from "../../component/sockets/MyForm";

export default function TicketSupportIndex() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]); //keeps a list of all msg rec from server

  //runs once when component loads
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((prev) => [...prev, value]);
    }

    // Register event listeners
    socket.on("connect", onConnect);
    socket.on("dissconect", onDisconnect);
    socket.on("foo", onFooEvent);

    // Clean up (when the component unmounts)
    // Removes all event listeners to prevent memory leaks or duplicate listeners
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
