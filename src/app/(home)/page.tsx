"use client";

import { Navbar } from "./navbar";
import { TemplateGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
const Home = () => {
  const documents = useQuery(api.documents.get);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
      <TemplateGallery/>
      {documents?.map((document:any)=>(
        <span key={document._id}>{document.title}</span>
      ))}
      </div>
    </div>
  );
};

export default Home;
