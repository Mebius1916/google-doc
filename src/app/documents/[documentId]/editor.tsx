'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-none print:border-0 bg-white shadow-lg flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
        style:"padding-left: 56px; padding-right:56px;",
      },
    },
    extensions: [
      StarterKit,
      Table,
      Image,
      ImageResize,
      TableRow,
      TableCell,
      TableHeader,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
    immediatelyRender: false,
  })
  return(
   <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
    <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
      <EditorContent editor={editor}/>
    </div>
   </div>
  );
}