 import React from "react";
import { FaUserTie } from "react-icons/fa";

// Importing local images (each one for each designation)
import directorImg from "../assets/Team/director.jpeg";
import managerImg from "../assets/Team/manager.jpg";
import supervisorImg from "../assets/Team/supervisor.jpg";
import hrImg from "../assets/Team/hr.jpg";

export default function TeamSection() {
  const team = [
    {
      name: "Michael Anderson",
      role: "Director",
      img: directorImg,
    },
    {
      name: "Peter Ruhiri ",
      role: "Manager",
      img: managerImg,
    },
    {
      name: "Miya Slouck",
      role: "Supervisor",
      img: supervisorImg,
    },
    {
      name: "Judy Kemunto",
      role: "Human Resource",
      img: hrImg,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#23B14D] to-green-800 py-28 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="text-center px-6 mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Our Dedicated Team
          </h2>

          <div className="h-2 w-24 mx-auto bg-white rounded-full mt-4"></div>

          <p className="text-white/90 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
            Meet the passionate professionals who work every day to deliver support,
            care, and guidance to individuals and families with dedication and compassion.
          </p>
        </div>

        {/* TEAM CARDS */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
          {team.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm">

              {/* IMAGE */}
              <div className="h-64 w-full">
                <img
                  src={member.img}
                  className="w-full h-full object-cover"
                  alt={member.name}
                />
              </div>

              {/* ICON + NAME + ROLE */}
              <div className="relative -mt-10 px-4 pb-6">

                {/* Floating Icon */}
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-[#16A34A] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <FaUserTie className="text-lg" />
                  </div>
                </div>

                <div className="text-center bg-white rounded-2xl px-4 py-3 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    {member.role}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
