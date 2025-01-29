"use client";
import { ToolbarButton } from "@/components/toolBarButton";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { FontFamilyButton } from "@/components/fontFamilyButton";
import { getToolbarSections } from "@/lib/useSections";
import { HeadingLevelButton } from "@/components/headingButton";
import { TextColorbutton } from "@/components/textColorButton";
import { HighlightButton } from "@/components/highLightButton";
import { LinkButton } from "@/components/linkButton";
import { ImageButton } from "@/components/imageButton";
import { AlignButton } from "@/components/alignButton";

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections = getToolbarSections(editor || undefined);

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex item-center gap-x-0.5 overflow-x-auto ">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* 分隔符组件 */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO:Font size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <TextColorbutton />
      <HighlightButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
