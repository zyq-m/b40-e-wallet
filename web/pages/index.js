import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);

  return (
    <div className="grid place-items-center min-h-screen bg-gray-50">
      <div>
        <h1 className="text-3xl font-bold">
          {active ? "AUGHHHHHHHH🤯🥴😩" : "SHESHHHHHHHHH🔥🔥"}
        </h1>
        <div className="w-fit mx-auto">
          <button
            className="mt-4 px-5 py-3 font-semibold rounded-xl bg-slate-500 text-white "
            onClick={() => setActive(!active)}
          >
            Press for AUGHH
          </button>
        </div>
      </div>
    </div>
  );
}
