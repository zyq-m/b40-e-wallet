import React from "react";
import register from "../assets/register.png";
import transaction from "../assets/transaction.png";
import wallet from "../assets/wallet.png";

const dashboard = () => {
  return (
    <div className="min-h-screen p-8 flex gap-[2rem] justify-center">
      <Menu img={register.src} title="Registration Form" />
      <Menu img={transaction.src} title="Add E-Wallet Point" />
      <Menu img={wallet.src} title="Transaction Details" />
    </div>
  );
};

const Menu = ({ img, title }) => {
  return (
    <div className="flex flex-col items-center justify-center px-[3rem] rounded-full bg-[#FFD400]">
      <img src={img} />
      <p className="font-bold text-[3rem] text-center">{title}</p>
    </div>
  );
};

export default dashboard;
