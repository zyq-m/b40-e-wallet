import React from "react";
import images from "../assets/icons/index";

const coregform = () => {
  return (
    <div className="min-h-screen grid place-items-center grid-rows-[max-content_1fr] bg-[#FFF7D9]">
      <div className="justify-self-start">
      <button
        className="ml-6 mt-6 w-15 opacity-70"
      >
        <img
                className="justify-self-center w-[3.0rem]"
                src={images.listbarIcon.src}
                alt=""
              />
      </button>
      </div>
      <div className="w-2/3 items-center">
          <form>
              <Input type="search" placeholder="Search by Name/ Matric Number/ IC Number..." />        
          </form>
          <br />
          <br />
          <br />
          <table className="centertable">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>E-Wallet Balance</th>
                    <th>Matric Number</th>
                    <th>IC Number</th>
                    <th>Select</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                </tr>
            </tbody>
          </table>
          <br />
          <button
              type="submit"
              className="float-right mb-8 py-2 w-60 font-medium bg-[#FFD400] rounded-full"
            >
              Add E-Wallet Point
            </button>
      </div>
    </div>
  );
};

const Input = ({ type, placeholder }) => {
  return (
    <>
      <input
        className="float-right border w-full px-2 py-2 border-gray-300 rounded-md"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default coregform;
