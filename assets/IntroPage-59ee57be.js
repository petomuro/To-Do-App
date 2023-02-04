import{c as P,r as L,u as T,f as C,g as j,a as R,b as A}from "./index-3a8cae4c.js";import{d as V,r as U,a as O,w as F,o as l,c as d,F as B,b as S,e as i,f as I,g as E,n as M,u as b,t as N,h as W,i as Y,j as q,k as H,l as J,m as z}from "./index-db654080.js";const G={key:0,class:"flex flex-column p-3"},K={class:"flex flex-column justify-content-center p-3"},Q=i("span",{class:"text-primary"},"Title",-1),X={class:"text-black-alpha-90"},Z=i("hr",{class:"mx-1"},null,-1),ee={key:2,class:"flex align-items-center py-3"},te=["onClick"],ae=["onClick"],se={key:3,class:"flex align-items-center py-3"},oe=["onClick"],ie=["onClick"],ne={class:"flex flex-column"},re=V({__name:"TheBoards",props:{boardsData:null},emits:["deleteBoard","createBoard","closeEditingNewBoard","isEditingBoard","updateBoard"],setup(k, {emit:u}){const o=k,y={collection:{$each:P.forEach({title:{required:L}})}},s=U({collection:o.boardsData});let p=T(y,s);const c=async()=>await p.value.$validate(),m=O(o.boardsData),h= r=>{u("deleteBoard",r)},_=()=>{u("createBoard")},v=()=>{u("closeEditingNewBoard")},g= r=>{const n=C(o.boardsData,r);o.boardsData[j(o.boardsData)].is_adding_board?v():u("isEditingBoard",{boardIndex:n,is_editing_board:!o.boardsData[n].is_editing_board})},w=async r=>{let n=C(o.boardsData,r);o.boardsData[n].is_editing_board||(n=r-1),await c()&&u("updateBoard",{boardIndex:n,boardId:r,newBoard:m.value[n]})};return F(()=>o.boardsData,()=>{m.value=o.boardsData,s.collection=o.boardsData,p=T(y,s)}),(r, n)=>{const x=E("InputText"),$=E("RouterLink"),D=E("TheButton");return l(),d(B,null,[(l(!0),d(B,null,S(k.boardsData,(t, e)=>(l(),d("div",{key:t.id,class:M([{errorName:b(p).collection.$each.$response.$errors[e].title.length},"flex flex-column justify-content-center bg-gray-200 border-round-xl m-3 w-20rem"])},[t!=null&&t.is_editing_board?(l(),d("div",G,[i("label",{class:M([{"p-error":b(p).collection.$each.$response.$errors[e].title.length},"text-primary"]),for:"name"},"Title*",2),I(x,{modelValue:m.value[e].title,"onUpdate:modelValue": a=>m.value[e].title=a,placeholder:"Add title for board",type:"text"},null,8,["modelValue","onUpdate:modelValue"]),(l(!0),d(B,null,S(b(p).collection.$each.$response.$errors[e].title, a=>(l(),d("div",{key:a,class:"p-error"},N(a.$message.replace("Value","Title")),1))),128))])):(l(),W($,{key:1,to:`/${t==null?void 0:t.id}`,class:"no-underline"},{default:Y(()=>[i("div",K,[Q,i("h2",X,N(t==null?void 0:t.title),1)])]),_:2},1032,["to"])),Z,t!=null&&t.is_editing_board?(l(),d("div",ee,[i("i",{class:"pi pi-check mx-3 cursor-pointer text-primary",onClick: a=>w(t==null?void 0:t.id)},null,8,te),i("i",{class:"pi pi-times cursor-pointer text-red-800",onClick: a=>g(t==null?void 0:t.id)},null,8,ae)])):(l(),d("div",se,[i("i",{class:"pi pi-pencil mx-3 cursor-pointer text-blue-800",onClick: a=>g(t==null?void 0:t.id)},null,8,oe),i("i",{class:"pi pi-trash cursor-pointer text-red-800",onClick: a=>h(t==null?void 0:t.id)},null,8,ie)]))],2))),128)),i("div",ne,[I(D,{class:"m-3",label:"+ Add new board",onClick:n[0]||(n[0]= t=>_())})])],64)}}}),le=z('<div class="flex flex-column align-items-center p-3 bg-cadet-blue"><div class="flex flex-column align-items-end"><h1 class="text-7xl">todo app</h1><p class="-mt-3">BY PETER MURIN</p></div><div class="flex flex-column"><h2>Hey, What&#39;s up! What do you want to do today?</h2><h2>Start adding items to your to-do list</h2></div></div>',1),ce={class:"flex flex-wrap justify-content-center p-3 bg-flora-white"},de=i("div",{class:"flex justify-content-center p-3"},[i("h1",{class:"text-black-alpha-90"},"KEEP YOUR DAYS ORGANISED WITH TODO APP")],-1),fe=V({__name:"IntroPage",async setup(k){let u,o;const y=R(),s=O([]),p=q(),c=H(),m=()=>{y.setBoards(s.value)},h=async()=>await(await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards")).json(),_=async()=>{try{s.value=await h(),m()}catch(e){c.add({severity:"error",summary:"Error Message",detail:e,life:3e3})}},v=async()=>{(await h()).length!==A().value.length?await _():s.value=A().value},g=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e}`,{method:"DELETE"}),c.add({severity:"success",summary:"Success Message",detail:"Board deleted successfully",life:3e3})}catch(a){c.add({severity:"error",summary:"Error Message",detail:a,life:3e3})}},w= e=>{p.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",accept:async()=>{const a=C(s.value,e);s.value.splice(a,1),await g(e),await _()},reject:()=>{}})},r=async()=>{s.value.push({id:s.value.length+1,title:"",is_adding_board:!0,is_editing_board:!1});const e=j(s.value);await x({boardIndex:e,is_editing_board:!0})},n=()=>{s.value.pop()},x=async e=>{s.value[e.boardIndex].is_editing_board=e.is_editing_board,e.is_editing_board||await v()},$=async e=>{try{await fetch("https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:s.value[e.boardIndex].title})}),c.add({severity:"success",summary:"Success Message",detail:"Board created successfully",life:3e3})}catch(a){c.add({severity:"error",summary:"Error Message",detail:a,life:3e3})}},D=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${e.boardId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s.value[e.boardIndex])}),c.add({severity:"success",summary:"Success Message",detail:"Board updated successfully",life:3e3})}catch(a){c.add({severity:"error",summary:"Error Message",detail:a,life:3e3})}},t=async e=>{s.value[e.boardIndex]=e.newBoard,s.value[e.boardIndex].is_editing_board=!1,s.value[e.boardIndex].is_adding_board?(s.value[e.boardIndex].is_adding_board=!1,await $(e)):await D(e),await _()};return[u,o]=J(()=>v()),await u,o(),(e, a)=>(l(),d(B,null,[le,i("div",ce,[I(re,{"boards-data":s.value,onDeleteBoard:a[0]||(a[0]= f=>w(f)),onCreateBoard:a[1]||(a[1]= f=>r()),onCloseEditingNewBoard:a[2]||(a[2]= f=>n()),onIsEditingBoard:a[3]||(a[3]= f=>x(f)),onUpdateBoard:a[4]||(a[4]= f=>t(f))},null,8,["boards-data"])]),de],64))}});export{fe as default};
