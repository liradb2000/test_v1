define(["three"],(t=>(globalThis.webpackChunkNEXIVIL_neostack=globalThis.webpackChunkNEXIVIL_neostack||[]).push([[485],{993:(t,a,e)=>{e.d(a,{he:()=>h,po:()=>d});var s=e(295),n=e(669),p=e.n(n);const h=(()=>{class t{constructor(){this.addInput("url",0),this.addInput("method",0),this.addInput("header",0),this.addInput("body",0),this.addOutput("data",0)}async onExecute(){const t=this.getInputData(0),a=this.getInputData(1),e=this.getInputData(2),s=this.getInputData(3);let n=await p()(t,{method:a,headers:e,data:s});this.setOutputData(0,n.data)}}return t.title="fetch",t.path="neostack",t})(),d=(()=>{class t{constructor(){this.addInput("blob",0),this.addOutput("Img",0)}onExecute(){const t=this.getInputData(0);let a=window.URL.createObjectURL(t),e=(new s.TextureLoader).load(a);e.wrapS=s.RepeatWrapping,e.wrapT=s.RepeatWrapping;let n=new s.Sprite(new s.SpriteMaterial({map:e}));n.scale.set(2814e3,2429e3,0),n.translateX(1407),n.translateY(1214.5),this.setOutputData(0,n)}}return t.title="loadImage",t.path="neostack",t})()},655:(t,a,e)=>{e.r(a),e.d(a,{fetch:()=>s.he});var s=e(993)},295:a=>{a.exports=t}},t=>(t.O(0,[669],(()=>t(t.s=655))),t.O())])));