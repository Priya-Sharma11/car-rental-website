import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center h-screen p-12 mt-12">
      <div className="h-[800px] w-[500px] flex flex-col bg-gray-200 p-15">
        {/* Chat header */}
        <div className="flex items-center px-4 py-2 bg-emerald-700 shadow-md border-b border-gray-200">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
  viewBox="0 0 24 24"
  fill="none"
>
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
</svg>
          <div className="text-left ml-4">
            <p className="font-bold ">Chat Name</p>
            <p className="text-gray-700">Online</p>
          </div>
        </div>

        {/* Chat messages container */}
        <div className="flex-grow overflow-auto p-4">
        <label htmlFor="name" className="block text-gray-700 text-l font-bold mb-2">Name</label>
        <input
  type="text"
  name="name"
  id="name"
  autoComplete="off"
  required
  class="shadow appearance-none border rounded-l-lg rounded-tr-md rounded-br-md rounded-bl-md rounded-tl-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  relative box-shadow-inset overflow-x-hidden mb-5"
/>

        </div>

        {/* Chat input field */}
        <div className="flex items-center p-4 bg-white shadow-md border-t border-gray-200">
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 h-[calc(100% - 68px)] relative box-shadow-inset overflow-x-hidden px-16 mb-5"
            placeholder="Type your message..."
            rows="2"
          />
          <button className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
