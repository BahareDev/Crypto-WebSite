import React, { useState } from "react";
import { Link } from "react-router";

function TicketList() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center m-4 justify-between">
        <h1>Ticket List</h1>
        <div>
          <button
            className="bg-purple-500 p-2"
            type="button"
            onClick={openModal}
          >
            create new Ticket
          </button>
        </div>
      </div>

      <div className="m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-4 rounded-2xl m-4">
          <thead className="text-xs text-white bg-gray-700 ">
            {/* HEADER table */}
            <tr>
              <th scope="col" className="p-4 ">
                <div className="flex items-center">number</div>
              </th>
              <th scope="col" className="p-4">
                title
              </th>
              <th scope="col" className="p-4">
                Category
              </th>
              <th scope="col" className="p-4">
                <div className="flex items-center ">state</div>
              </th>
              <th scope="col" className="p-4">
                date
              </th>

              <th scope="col" className="p-4">
                actions
              </th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
      </div>
      <Modal isopen={open} closeModal={closeModal} />
    </>
  );
}
export default TicketList;

function Modal({ isopen, closeModal }) {
  if (!isopen) return null;

  return (
    <div className="bg-white border p-4 space-y-4 m-4 fixed">
      <h2>Modal</h2>
      <button onClick={closeModal}>x</button>

      <div className="flex flex-col space-y-4">
        <input type="text" placeholder="title" />
        <select name="" id="">
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
        </select>
      </div>

      <button className="bg-violet-500 p-2">
        <Link to="/tickets/sockets">Submit</Link>
      </button>
    </div>
  );
}
