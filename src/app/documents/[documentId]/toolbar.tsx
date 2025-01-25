'use client'
import {
    LucideIcon, 
    Undo2Icon, 
    Redo2Icon,
    PrinterIcon,
    SpellCheckIcon,BoldIcon, 
    ItalicIcon,
    UnderlineIcon,
    MessageSquareIcon,
    ListTodoIcon,
    RemoveFormattingIcon
  } from "lucide-react";
import {ToolbarButton} from "@/components/toolBarButton";
import {useEditorStore} from "@/store/use-editor-store";
import { Separator } from "@radix-ui/react-separator";
export const Toolbar = () => {
  const {editor} = useEditorStore();
  const sections:{
    label:string;
    icon:LucideIcon;
    onClick:()=>void;
    isActive?:boolean;
    title:string;
  }[][] = [
    [
      {//撤销
        label:"Undo",
        icon:Undo2Icon,
        onClick:()=>editor?.chain().focus().undo().run(),//执行撤销操作
        isActive:false,
        title:"Undo",
      },
      {//撤销回退
        label:"Redo",
        icon:Redo2Icon,
        onClick:()=>editor?.chain().focus().redo().run(),//执行重做操作
        isActive:false,
        title:"Redo",
      },
      {//打印
        label:"Print",
        icon:PrinterIcon,
        onClick:()=>{
          window.print();
        },
        title:"Print",
      },
      {//拼写检查
        label:"Spell Check",
        icon:SpellCheckIcon,
        onClick:()=>{
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck",current === "true" ? "false" : "true");
        },
        title:"Spell Check",
      }
    ],
    [
      {
        label:"Bold",
        icon:BoldIcon,
        isActive:editor?.isActive("bold"),
        onClick:()=>editor?.chain().focus().toggleBold().run(),
        title:"Bold",
      },
      {
        label:"Italic",//斜体
        icon:ItalicIcon,
        isActive:editor?.isActive("italic"),
        onClick:()=>editor?.chain().focus().toggleItalic().run(),
        title:"Bold",
      },
      {
        label:"Underline",//下划线
        icon:UnderlineIcon,
        isActive:editor?.isActive("underline"),
        onClick:()=>editor?.chain().focus().toggleUnderline().run(),
        title:"Underline",
      },
    ],
    [
      {
        label:"Comment",
        icon:MessageSquareIcon,
        onClick:()=>{console.log("Comment")},
        isActive:false,
        title:"Comment",
      },
      {
        label:"List Todo",
        icon:ListTodoIcon,
        onClick:()=>{editor?.chain().focus().toggleTaskList().run()},
        isActive:editor?.isActive("taskList"),
        title:"List Todo",
      },
      {
        label:"Remove Formatting",
        icon:RemoveFormattingIcon,
        onClick:()=>{editor?.chain().focus().unsetAllMarks().run()},
        title:"Remove Formatting",
      }
    ]
  ]
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex item-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item)=>(
        <ToolbarButton key={item.label}{...item}/>
      ))}
      {/* 分隔符组件 */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO:Font size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item)=>(
        <ToolbarButton key={item.label}{...item}/>
      ))}
      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Align */}
      {sections[2].map((item)=>(
        <ToolbarButton key={item.label}{...item}/>
      ))}
    </div>
  )
}