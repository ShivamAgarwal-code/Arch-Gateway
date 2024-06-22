import ComponentLayout from "@/pages/layout/ComponentLayout";
import React from "react";
import ProjectCard from "./common/ProjectCard";

const Main = () => {
  return (
    <ComponentLayout>
      <div className="bg-orange-300 py-8 px-5 md:px-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center pb-6">
          Projects List
        </h1>
        <ProjectCard />
      </div>
    </ComponentLayout>
  );
};

export default Main;
