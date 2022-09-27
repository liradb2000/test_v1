import { useEffect } from "react";
import img from "./big_image.jpg";
// import { List } from "immutable";

export default function Main() {
  console.log("--------------------------------");
  console.log("te123");
  useEffect(() => {
    // console.log(List([1, 2, 3]));
    // console.log(globalThis);
  }, []);
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
        }}
      />
      <div>
        test2<p>1</p>
      </div>
    </>
  );
}
