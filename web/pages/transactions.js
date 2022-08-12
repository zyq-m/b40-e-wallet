import React from "react";

import Layout from "../components/Layout";

const transactions = () => {
  return (
    <Layout>
      <div className="w-4/5 items-center">
        <h1 className="mb-6 font-bold text-3xl">Transaction Details</h1>
        <table className="centertable">
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Transaction Time</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>E-Wallet Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default transactions;
