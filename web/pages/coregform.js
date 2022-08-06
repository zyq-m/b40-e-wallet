import React from "react";

const coregform = () => {
  return (
    <div className="login min-h-screen grid place-items-center grid-rows-[max-content_1fr] bg-[#FFF7D9]">
      <div className="justify-self-start">
      </div>
      <div>
        <div className="p-9 rounded-2xl shadow-md bg-white w-[35rem]">
          <h1 className="mb-8 font-bold text-3xl text-center">Cafe Owner Form Registration</h1>
          <form>
            <div className="items-center">
              <Input type="fullname" placeholder="Full Name" />
              <div className="mb-2" />
              <Input type="username" placeholder="Username" />
              <div className="mb-2" />
              <Input type="cafename" placeholder="Cafe Name" />
              <div className="mb-2" />
              <Input type="password" placeholder="Password" />
            </div>
            <button
              type="submit"
              className="mt-6 py-2 w-full font-medium bg-[#FFD400] rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Input = ({ type, placeholder }) => {
  return (
    <>
      <input
        className="border w-full px-2 py-2 border-gray-300 rounded-md"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default coregform;
