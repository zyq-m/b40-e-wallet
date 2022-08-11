import React from "react";
import Layout from "../components/Layout";

const dashboard = () => {
  return (
    <Layout>
      <h1>This is dashboard</h1>
    </Layout>
  );
};

const Menu = ({ img, title }) => {
  return (
    <button className="flex flex-col items-center justify-center px-[3rem] rounded-[130px] bg-[#FFD400]">
      <img src={img} />
      <p className="font-bold text-[3rem] text-center">{title}</p>
    </button>
  );
};

export default dashboard;
