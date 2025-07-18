// import React from 'react';
// import CARD_2 from "../../assets/images/card2.png";
// import {LuTrendingUpDown} from "react-icons/lu";

// const AuthLayout= ({children})=>{
//   return <div className="flex">
//       <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
//         <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
//         {children}
//       </div>
//       <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
//         <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top -left-5"/>
//         <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10"/>
//         <div className="w-48 h-48 rounded-[40px] bg-violet-500 absoulte -bottom-7 -left-5"/>

//         <div className="grid grid-cols-1 z-20">
//             <StatsInfoCard 
//                 icon={<LuTrendingUpDown />}
//                 label="Track your Income & Expenses"
//                 value="430,000"
//                 color="bg-primary"
//                 />
//         </div>
//         <img 
//             src={CARD_2}
//             className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/25"
//         />
//       </div>
//     </div>
// }
// export default AuthLayout;

// const StatsInfoCard = ({icon,label,value,color}) =>{
//     return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
//         <div
//         className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
//         >
//             {icon}
//         </div>
//         <div>
//             <h6 className="text-xs terxt-gray-500 mb-1">{label}</h6>
//             <span className="text-[20px]">${value}</span>
//         </div>
//     </div>
// }

import React from 'react';
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left Section (Form) */}
      <div className="w-full md:w-[60vw] px-10 py-12 flex flex-col justify-center bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">💸 Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section (Visuals) */}
      <div className="hidden md:block w-[40vw] h-full bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-8 -left-5 opacity-70" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 opacity-70" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 opacity-70" />

        <div className="grid grid-cols-1 z-20 relative mt-16">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        <img
          src={CARD_2}
          alt="Card Visual"
          className="w-64 lg:w-[90%] absolute bottom-10 right-6 shadow-lg shadow-blue-400/25"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[24px] text-white ${color} rounded-full drop-shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-lg font-medium text-gray-800">${value}</span>
      </div>
    </div>
  );
};