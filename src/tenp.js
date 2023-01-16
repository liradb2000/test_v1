// import { open } from "#extension:rc_dock";
// import MainC from "./test";
import { testHotModule } from "./testfunc";

export class mainC {
  constructor() {
    this.addInput("test", 0);
    this.addOutput("test", 0);
    this.widget = this.addWidget("button", "open", undefined, () => {
      // let a = window.document.createElement("div");
      // a.style =
      //   "position: fixed; top: 0; width: 300px; height: 300px; z-index: 1000;";
      // window.document.body.appendChild(a);
      // ReactDOM.render(<MainC />, a);
      // let MainC = await import("./test");
      // open(undefined, {
      //   title: "test3",
      //   id: "::tmp::testsetsd2",
      //   content: (
      //     <MainC
      //       data={(cb) => {
      //         this.update = cb;
      //       }}
      //       initData=""
      //     />
      //   ),
      // });
    });
  }

  static title = "mainC";
  static path = "neostack";

  onExecute() {
    // const a = this.getInputData(0);
    console.log("h1");
    testHotModule();
    // this.setOutputData(
    //   0,
    //   <MainC
    //     data={(cb) => {
    //       this.update = cb;
    //     }}
    //     initData=""
    //   />
    // );
  }
}
