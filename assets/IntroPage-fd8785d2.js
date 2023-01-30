import{c as A,r as j,u as N,f as D,a as V}from"./index-453543cd.js";import{d as b,r as O,a as M,o as l,c as d,F as _,b as T,e as o,f as E,g as $,n as I,u as C,t as S,h as P,w as R,i as U,j as L,k as Y,l as F}from"./index-97bc10d5.js";const J={key:0,class:"flex flex-column p-3"},W={class:"flex flex-column justify-content-center p-3"},q=o("span",{class:"text-primary"},"Title",-1),H={class:"text-black-alpha-90"},z=o("hr",{class:"mx-1"},null,-1),G={key:2,class:"flex align-items-center py-3"},K=["onClick"],Q=["onClick"],X={key:3,class:"flex align-items-center py-3"},Z=["onClick"],ee=["onClick"],te={class:"flex flex-column"},se=b({__name:"TheBoards",props:{boardsData:null},emits:["deleteBoard","createBoard","isEditingBoard","updateBoard"],setup(h,{emit:u}){const c=h,s={collection:{$each:A.forEach({title:{required:j}})}},f=O({collection:c.boardsData}),p=N(s,f),v=async()=>await p.value.$validate(),i=r=>{u("deleteBoard",r)},g=()=>{u("createBoard")},m=r=>{const n=D(c.boardsData,r);c.boardsData[n].is_adding_board?i(r):u("isEditingBoard",{boardIndex:n,is_editing_board:!c.boardsData[n].is_editing_board})},y=M(c.boardsData),x=async r=>{const n=D(c.boardsData,r);await v()&&u("updateBoard",{boardIndex:n,boardId:r,newBoard:y.value[n]})};return(r,n)=>{const B=$("InputText"),k=$("RouterLink"),w=$("TheButton");return l(),d(_,null,[(l(!0),d(_,null,T(h.boardsData,(e,t)=>(l(),d("div",{key:t,class:I([{errorName:C(p).collection.$each.$response.$errors[t].title.length},"flex flex-column justify-content-center bg-gray-200 border-round-xl m-3 w-20rem"])},[e!=null&&e.is_editing_board?(l(),d("div",J,[o("label",{class:I([{"p-error":C(p).collection.$each.$response.$errors[t].title.length},"text-primary"]),for:"name"},"Title*",2),E(B,{modelValue:y.value[t].title,"onUpdate:modelValue":a=>y.value[t].title=a,placeholder:"Add title for board",type:"text"},null,8,["modelValue","onUpdate:modelValue"]),(l(!0),d(_,null,T(C(p).collection.$each.$response.$errors[t].title,a=>(l(),d("div",{key:a,class:"p-error"},S(a.$message.replace("Value","Title")),1))),128))])):(l(),P(k,{key:1,to:`/${e==null?void 0:e.id}`,class:"no-underline"},{default:R(()=>[o("div",W,[q,o("h2",H,S(e==null?void 0:e.title),1)])]),_:2},1032,["to"])),z,e!=null&&e.is_editing_board?(l(),d("div",G,[o("i",{class:"pi pi-check mx-3 cursor-pointer text-primary",onClick:a=>x(e==null?void 0:e.id)},null,8,K),o("i",{class:"pi pi-times cursor-pointer text-red-800",onClick:a=>m(e==null?void 0:e.id)},null,8,Q)])):(l(),d("div",X,[o("i",{class:"pi pi-pencil mx-3 cursor-pointer text-blue-800",onClick:a=>m(e==null?void 0:e.id)},null,8,Z),o("i",{class:"pi pi-trash cursor-pointer text-red-800",onClick:a=>i(e==null?void 0:e.id)},null,8,ee)]))],2))),128)),o("div",te,[E(w,{class:"m-3",label:"+ Add new board",onClick:n[0]||(n[0]=e=>g())})])],64)}}}),ae=F('<div class="flex flex-column align-items-center p-3 bg-cadet-blue"><div class="flex flex-column align-items-end"><h1 class="text-7xl">todo app</h1><p class="-mt-3">BY PETER MURIN</p></div><div class="flex flex-column"><h2>Hey What&#39;s up! What do you want to do today?</h2><h2>Start adding items to your to-do list</h2></div></div>',1),oe={class:"flex flex-wrap justify-content-center p-3 bg-flora-white"},ie=o("div",{class:"flex justify-content-center p-3"},[o("h1",{class:"text-black-alpha-90"},"KEEP YOUR DAYS ORGANISED WITH TODO APP")],-1),le=b({__name:"IntroPage",async setup(h){let u,c;const s=M([]),f=V(),p=()=>{f.setBoards(s.value)},v=U(),i=L(),g=async()=>{try{const e=await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards");s.value=await e.json(),f.setBoards(s.value),i.add({severity:"success",summary:"Success Message",detail:"Data fetched successfully",life:3e3})}catch(e){i.add({severity:"error",summary:"Error Message",detail:e,life:3e3})}},m=async()=>{f.getBoards?s.value=JSON.parse(f.getBoards):await g()};[u,c]=Y(()=>m()),await u,c();const y=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e}`,{method:"DELETE"}),i.add({severity:"success",summary:"Success Message",detail:"Board deleted successfully",life:3e3})}catch(t){i.add({severity:"error",summary:"Error Message",detail:t,life:3e3})}},x=async e=>{await v.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",accept:async()=>{const t=D(s.value,e);s.value.splice(t,1),await y(e),p()},reject:()=>{i.add({severity:"error",summary:"Rejected",detail:"You have rejected",life:3e3})}})},r=async()=>{s.value.push({id:s.value.length+1,title:"",is_adding_board:!0,is_editing_board:!1});const e=s.value.length-1;await n({boardIndex:e,is_editing_board:!0})},n=async e=>{s.value[e.boardIndex].is_editing_board=e.is_editing_board,e.is_editing_board||await m()},B=async e=>{try{await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:s.value[e.boardIndex].title})}),i.add({severity:"success",summary:"Success Message",detail:"Board created successfully",life:3e3})}catch(t){i.add({severity:"error",summary:"Error Message",detail:t,life:3e3})}},k=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e.boardId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s.value[e.boardIndex])}),i.add({severity:"success",summary:"Success Message",detail:"Board updated successfully",life:3e3})}catch(t){i.add({severity:"error",summary:"Error Message",detail:t,life:3e3})}},w=async e=>{s.value[e.boardIndex]=e.newBoard,s.value[e.boardIndex].is_editing_board=!1,s.value[e.boardIndex].is_adding_board?(s.value[e.boardIndex].is_adding_board=!1,await B(e)):await k(e),p()};return(e,t)=>(l(),d(_,null,[ae,o("div",oe,[E(se,{"boards-data":s.value,onDeleteBoard:t[0]||(t[0]=a=>x(a)),onCreateBoard:t[1]||(t[1]=a=>r()),onIsEditingBoard:t[2]||(t[2]=a=>n(a)),onUpdateBoard:t[3]||(t[3]=a=>w(a))},null,8,["boards-data"])]),ie],64))}});export{le as default};
