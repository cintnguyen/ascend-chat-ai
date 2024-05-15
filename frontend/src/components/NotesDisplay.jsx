import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";

export default function NotesDisplay({display}) {
  // const items = [
  //   {
  //     key: "new",
  //     label: "New file",
  //   },
  //   {
  //     key: "copy",
  //     label: "Copy link",
  //   },
  // ];

  // return (
  //   <ListboxWrapper>
  //     <Listbox
  //       items={display}
  //       aria-label="Dynamic Actions"
  //       onAction={(key) => alert(key)}
  //     >
  //       {(item) => (
  //         <ListboxItem
  //           key={item._id}
  //           // color={item.key === "delete" ? "danger" : "default"}
  //           // className={item.key === "delete" ? "text-danger" : ""}
  //         >
  //           {item.question}
  //         </ListboxItem>
  //       )}
  //     </Listbox>
  //   </ListboxWrapper>
  // );
}
