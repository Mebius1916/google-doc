'use client'
import {LucideIcon, Undo2Icon} from "lucide-react";
import {ToolbarButton} from "@/components/toolBarButton";
export const Toolbar = () => {
  const sections:{
    label:string;
    icon:LucideIcon;
    onClick:()=>void;
    isActive?:boolean;
    title:string;
  }[][] = [
    [
      {
        label:"Undo",
        icon:Undo2Icon,
        onClick:()=>console.log("Undo clicked"),
        isActive:false,
        title:"Undo",
      },
    ],
  ]
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex item-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item)=>(
        <ToolbarButton key={item.label}{...item}/>
      ))}
    </div>
  )
}