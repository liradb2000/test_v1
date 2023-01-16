import { List, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import img from "./big_image.jpg";
// import { List } from "immutable";

export default function Main({ data, initData }) {
  const [_d, setD] = useState(initData);
  console.log("--------------------------------");
  console.log("te1233");
  useEffect(() => {
    data(setD);
    console.log(data);
    // console.log(List([1, 2, 3]));
    // console.log(globalThis);
    return () => {
      data(undefined);
    };
  }, []);
  return (
    <List sx={{ height: "100%" }}>
      <ListItemButton>test</ListItemButton>
      <ListItemButton>test2</ListItemButton>
      <ListItemButton>test3</ListItemButton>
      <ListItemButton>test4</ListItemButton>
      <ListItemButton>test5</ListItemButton>
    </List>
  );
}
