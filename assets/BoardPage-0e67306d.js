import{c as se,r as K,u as J,d as A,e as O,l as Z,a as me,b as _e,g as ee,h as te}from "./index-84b3cd60.js";import{d as Q,r as ae,a as U,s as oe,g as V,o as l,c as d,F,b as z,n as N,u as w,e as n,f as D,t as M,G as q,i as ge,j as he,k as ye,w as H,H as xe}from "./index-8d61c47e.js";const $e={key:0,class:"flex flex-column p-3"},Te={class:"flex flex-column my-3"},ke=n("label",{class:"text-primary",for:"content"},"Content",-1),be=["onClick"],we={class:"flex flex-column"},De=n("span",{class:"text-primary"},"Title",-1),Ie={class:"text-black-alpha-90"},Ce={class:"flex flex-column my-3"},Le=n("span",{class:"text-primary"},"Content",-1),Ve={class:"text-black-alpha-90"},Ee={class:"flex flex-column"},Ae=n("span",{class:"text-primary"},"Deadline",-1),Se={class:"text-black-alpha-90"},Be={class:"flex justify-content-between align-items-center"},Ue={key:0,class:"flex align-items-center p-3"},Me=["onClick"],je=["onClick"],Ne={key:1,class:"flex align-items-center p-3"},Fe=["onClick"],Pe=["onClick"],ze=["onClick"],Oe=["onClick"],qe={key:2,class:"flex align-items-center p-3"},Je=n("span",{class:"border-2 border-round-xl p-2 bg-green-800 border-green-800"},"Done",-1),Re=[Je],Ge={key:3,class:"flex align-items-center p-3"},He=n("span",{class:"border-2 border-round-xl p-2 bg-orange-800 border-orange-800"},"In progress",-1),Ke=[He],Qe={key:0,class:"flex"},We=Q({__name:"TheTodos",props:{listId:null,listsData:null,todosData:null,filtering:{type:Boolean}},emits:["deleteTodo","createTodo","isEditingTodo","updateTodo","doneTodo"],setup(f, {emit:h}){const i=f,j={collection:{$each:se.forEach({title:{required:K},deadline:{required:K}})}},L=ae({collection:i.todosData});let o=J(j,L);const P=async()=>await o.value.$validate(),c=U(i.todosData),S=(r, x)=>{h("deleteTodo",{listId:r,todoId:x})},I= r=>{h("createTodo",r)},y=(r, x)=>{const C=A(i.listsData,r),g=O(i.todosData,x);i.todosData[g].is_adding_todo?S(r,x):h("isEditingTodo",{listIndex:C,todoIndex:g,is_editing_todo:!i.todosData[g].is_editing_todo})},k=async(r, x)=>{const C=A(i.listsData,r),g=O(i.todosData,x);await P()&&h("updateTodo",{listIndex:C,listId:r,todoIndex:g,todoId:x,newTodo:c.value[g]})},$=(r, x)=>{const C=A(i.listsData,r),g=O(i.todosData,x);h("doneTodo",{listIndex:C,listId:r,todoIndex:g,todoId:x,is_done_todo:!i.todosData[g].is_done_todo})};return oe(()=>i.todosData,()=>{c.value=i.todosData,L.collection=i.todosData,o=J(j,L)}),(r, x)=>{const C=V("InputText"),g=V("TheTextarea"),v=V("TheCalendar"),u=V("TheButton");return l(),d(F,null,[(l(!0),d(F,null,z(f.todosData,(s, m)=>(l(),d("div",{key:s.id,class:N([{errorTitle:w(o).collection.$each.$response.$errors[m].title.length,errorDeadline:w(o).collection.$each.$response.$errors[m].deadline.length},"flex flex-column justify-content-between bg-gray-300 border-round-xl m-3"])},[s!=null&&s.is_editing_todo?(l(),d("div",$e,[n("label",{class:N([{"p-error":w(o).collection.$each.$response.$errors[m].title.length},"text-primary"]),for:"title"},"Title*",2),D(C,{id:"title",modelValue:c.value[m].title,"onUpdate:modelValue": a=>c.value[m].title=a,class:N({"p-invalid":w(o).collection.$each.$response.$errors[m].title.length}),placeholder:"Add title for todo",type:"text"},null,8,["modelValue","onUpdate:modelValue","class"]),(l(!0),d(F,null,z(w(o).collection.$each.$response.$errors[m].title, a=>(l(),d("div",{key:a,class:"p-error"},M(a.$message.replace("Value","Title")),1))),128)),n("div",Te,[ke,D(g,{id:"content",modelValue:c.value[m].content,"onUpdate:modelValue": a=>c.value[m].content=a,"auto-resize":!0,cols:"30",placeholder:"Add content for todo",rows:"5"},null,8,["modelValue","onUpdate:modelValue"])]),n("label",{class:N([{"p-error":w(o).collection.$each.$response.$errors[m].deadline.length},"text-primary"]),for:"deadline"},"Deadline*",2),D(v,{id:"deadline",modelValue:c.value[m].deadline,"onUpdate:modelValue":[a=>c.value[m].deadline=a, a=>w(Z)(c.value[m].deadline)],class:N({"p-invalid":w(o).collection.$each.$response.$errors[m].deadline.length}),"date-format":"dd.mm.yy",placeholder:"Add deadline for todo","show-time":""},null,8,["modelValue","onUpdate:modelValue","class"]),(l(!0),d(F,null,z(w(o).collection.$each.$response.$errors[m].deadline, a=>(l(),d("div",{key:a,class:"p-error"},M(a.$message.replace("Value","Deadline")),1))),128))])):(l(),d("div",{key:1,class:"flex flex-column p-3 cursor-pointer",onClick: a=>y(f.listId,s==null?void 0:s.id)},[n("div",we,[De,n("h3",Ie,M(s==null?void 0:s.title),1)]),n("div",Ce,[Le,n("p",Ve,M(s==null?void 0:s.content),1)]),n("div",Ee,[Ae,n("p",Se,M(w(Z)(s==null?void 0:s.deadline)),1)])],8,be)),n("div",Be,[s!=null&&s.is_editing_todo?(l(),d("div",Ue,[n("i",{class:"pi pi-check cursor-pointer text-primary",onClick: a=>k(f.listId,s==null?void 0:s.id)},null,8,Me),n("i",{class:"pi pi-times cursor-pointer mx-3 text-red-800",onClick: a=>y(f.listId,s==null?void 0:s.id)},null,8,je)])):(l(),d("div",Ne,[s!=null&&s.is_done_todo?(l(),d("i",{key:1,class:"pi pi-times cursor-pointer text-red-800",onClick: a=>$(f.listId,s==null?void 0:s.id)},null,8,Pe)):(l(),d("i",{key:0,class:"pi pi-check cursor-pointer text-primary",onClick: a=>$(f.listId,s==null?void 0:s.id)},null,8,Fe)),n("i",{class:"pi pi-pencil mx-3 cursor-pointer text-blue-800",onClick: a=>y(f.listId,s==null?void 0:s.id)},null,8,ze),n("i",{class:"pi pi-trash cursor-pointer text-red-800",onClick: a=>S(f.listId,s==null?void 0:s.id)},null,8,Oe)])),s!=null&&s.is_done_todo?(l(),d("div",qe,Re)):q("",!0),!(s!=null&&s.is_adding_todo)&&!(s!=null&&s.is_done_todo)?(l(),d("div",Ge,Ke)):q("",!0)])],2))),128)),!f.listsData[w(A)(f.listsData,f.listId)].is_adding_list&&!f.filtering?(l(),d("div",Qe,[D(u,{class:"m-3",label:"+ Add new todo",onClick:x[0]||(x[0]= s=>I(f.listId))})])):q("",!0)],64)}}}),Xe={class:"flex justify-content-between"},Ye={key:0,class:"flex flex-column p-3"},Ze={key:1,class:"flex flex-column p-3"},et=n("span",{class:"text-primary"},"Name",-1),tt=["onClick"],st={key:2,class:"flex align-items-center px-3"},at=["onClick"],ot=["onClick"],nt={key:3,class:"flex align-items-center px-3"},it=["onClick"],lt=["onClick"],dt={key:0,class:"flex flex-column"},ct=Q({__name:"TheLists",props:{listsData:null,filtering:{type:Boolean}},emits:["deleteList","createList","isEditingList","updateList","deleteTodo","createTodo","isEditingTodo","updateTodo","doneTodo"],setup(f, {emit:h}){const i=f,j={collection:{$each:se.forEach({name:{required:K}})}},L=ae({collection:i.listsData});let o=J(j,L);const P=async()=>await o.value.$validate(),c=U(i.listsData),S= v=>{h("deleteList",v)},I=()=>{h("createList")},y= v=>{const u=A(i.listsData,v);i.listsData[u].is_adding_list?S(v):h("isEditingList",{listIndex:u,is_editing_list:!i.listsData[u].is_editing_list})},k=async v=>{const u=A(i.listsData,v);await P()&&h("updateList",{listIndex:u,listId:v,newList:c.value[u]})},$= v=>{h("deleteTodo",v)},r= v=>{h("createTodo",v)},x= v=>{h("isEditingTodo",v)},C= v=>{h("updateTodo",v)},g= v=>{h("doneTodo",v)};return oe(()=>i.listsData,()=>{c.value=i.listsData,L.collection=i.listsData,o=J(j,L)}),(v, u)=>{const s=V("InputText"),m=V("TheButton");return l(),d(F,null,[(l(!0),d(F,null,z(f.listsData,(a, b)=>(l(),d("div",{key:a.id,class:N([{errorName:w(o).collection.$each.$response.$errors[b].name.length},"flex flex-column bg-gray-200 border-round-xl m-3 w-30rem"])},[n("div",Xe,[a!=null&&a.is_editing_list?(l(),d("div",Ye,[n("label",{class:N([{"p-error":w(o).collection.$each.$response.$errors[b].name.length},"text-primary"]),for:"name"},"Name*",2),D(s,{modelValue:c.value[b].name,"onUpdate:modelValue": _=>c.value[b].name=_,placeholder:"Add name for list",type:"text"},null,8,["modelValue","onUpdate:modelValue"]),(l(!0),d(F,null,z(w(o).collection.$each.$response.$errors[b].name, _=>(l(),d("div",{key:_,class:"p-error"},M(_.$message.replace("Value","Title")),1))),128))])):(l(),d("div",Ze,[et,n("h2",{class:"cursor-pointer text-black-alpha-90",onClick: _=>y(a==null?void 0:a.id)},M(a==null?void 0:a.name),9,tt)])),a!=null&&a.is_editing_list?(l(),d("div",st,[n("i",{class:"pi pi-check mx-3 cursor-pointer text-primary",onClick: _=>k(a==null?void 0:a.id)},null,8,at),n("i",{class:"pi pi-times cursor-pointer text-red-800",onClick: _=>y(a==null?void 0:a.id)},null,8,ot)])):(l(),d("div",nt,[n("i",{class:"pi pi-pencil mx-3 cursor-pointer text-blue-800",onClick: _=>y(a==null?void 0:a.id)},null,8,it),n("i",{class:"pi pi-trash cursor-pointer text-red-800",onClick: _=>S(a==null?void 0:a.id)},null,8,lt)]))]),D(We,{filtering:f.filtering,"list-id":parseInt(a==null?void 0:a.id.toString()),"lists-data":f.listsData,"todos-data":a==null?void 0:a.todos,onDeleteTodo:u[0]||(u[0]= _=>$(_)),onCreateTodo:u[1]||(u[1]= _=>r(_)),onIsEditingTodo:u[2]||(u[2]= _=>x(_)),onUpdateTodo:u[3]||(u[3]= _=>C(_)),onDoneTodo:u[4]||(u[4]= _=>g(_))},null,8,["filtering","list-id","lists-data","todos-data"])],2))),128)),f.filtering?q("",!0):(l(),d("div",dt,[D(m,{class:"m-3",label:"+ Add new list",onClick:u[5]||(u[5]= a=>I())})]))],64)}}}),rt={class:"flex flex-column"},ut={class:"flex justify-content-between align-items-center py-3 px-5 bg-cadet-blue"},pt=n("h1",{class:"text-white-alpha-50"},"todo app",-1),vt={class:"mx-3"},ft=n("div",null,null,-1),mt={class:"py-3 px-5 absolute right-0 z-1"},_t={class:"flex flex-column"},gt={class:"p-input-icon-left"},ht=n("i",{class:"pi pi-search z-1"},null,-1),yt={class:"field-checkbox my-3"},xt=n("label",{for:"done"},"Done",-1),$t={class:"field-checkbox"},Tt=n("label",{for:"inProgress"},"In progress",-1),kt={class:"flex flex-wrap p-3"},Dt=Q({__name:"BoardPage",async setup(f){let h,i;const j=me(),L=U({}),o=U([]),P=xe(),c=parseInt(P.params.id),S=ge(),I=he(),y=U(!1),k=U(""),$=U(!1),r=U(!1),x=()=>{j.setLists(c,o.value)},C=async()=>await(await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${c}/lists`)).json(),g=async()=>{try{const e=await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${c}`);L.value=await e.json(),o.value=await C(),x()}catch(e){y.value||I.add({severity:"error",summary:"Error Message",detail:e,life:3e3})}},v=async()=>{const e=await C(),t=ee(c).value,T=te(e.map(B=>B.todos)),E=te(t.map(B=>B.todos));return e.length!==t.length||T.length!==E.length},u=async()=>{await v()?await g():(L.value=_e().value.find(e=>e.id==c),o.value=ee(c).value)},s=()=>{o.value.forEach((e, t)=>{o.value[t].todos=e.todos.filter(({title:T,content:E,deadline:B})=>[T,E,new Date(B).toLocaleString("sk-SK")].some(G=>G.toLowerCase().includes(k.value.toLowerCase())))})},m=()=>{o.value.forEach((e, t)=>{o.value[t].todos=e.todos.filter(({is_done_todo:T})=>[T].some(E=>E===$.value))})},a=()=>{o.value.forEach((e, t)=>{o.value[t].todos=e.todos.filter(({is_done_todo:T})=>[T].some(E=>!E===r.value))})},b=async()=>{y.value=!0,await u(),k.value!==""&&!$.value&&!r.value?s():k.value===""&&$.value&&!r.value?m():k.value===""&&!$.value&&r.value?a():k.value===""&&$.value&&r.value?(m(),a()):k.value!==""&&$.value&&!r.value?(s(),m()):k.value!==""&&!$.value&&r.value?(s(),a()):k.value!==""&&$.value&&r.value?s():y.value=!1},_=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${c}/lists/${e}`,{method:"DELETE"}),I.add({severity:"success",summary:"Success Message",detail:"List deleted successfully",life:3e3})}catch(t){I.add({severity:"error",summary:"Error Message",detail:t,life:3e3})}},ne= e=>{S.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",accept:async()=>{const t=A(o.value,e);o.value.splice(t,1),await _(e),await g(),y.value&&await b()},reject:()=>{}})},ie=async()=>{o.value.push({id:o.value.length+1,boardId:c,name:"",is_adding_list:!0,is_editing_list:!1,todos:[]});const e=o.value.length-1;await W({listIndex:e,is_editing_list:!0})},W=async e=>{o.value[e.listIndex].is_editing_list=e.is_editing_list,e.is_editing_list||await u()},le=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${c}/lists`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:o.value[e.listIndex].name})}),I.add({severity:"success",summary:"Success Message",detail:"List created successfully",life:3e3})}catch(t){I.add({severity:"error",summary:"Error Message",detail:t,life:3e3})}},de=async e=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${c}/lists/${e.listId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o.value[e.listIndex])}),I.add({severity:"success",summary:"Success Message",detail:"List updated successfully",life:3e3})}catch(t){I.add({severity:"error",summary:"Error Message",detail:t,life:3e3})}},ce=async e=>{o.value[e.listIndex]=e.newList,o.value[e.listIndex].is_editing_list=!1,o.value[e.listIndex].is_adding_list?(o.value[e.listIndex].is_adding_list=!1,await le(e)):await de(e),await g(),y.value&&await b()},R=async(e, t)=>{try{await fetch(`https://63d3f5218d4e68c14eb69fe7.mockapi.io/api/v1/boards/${c}/lists/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o.value[t])}),I.add({severity:"success",summary:"Success Message",detail:"Todo updated successfully",life:3e3})}catch(T){I.add({severity:"error",summary:"Error Message",detail:T,life:3e3})}},re= e=>{S.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",accept:async()=>{const t=A(o.value,e.listId),T=O(o.value[t].todos,e.todoId);o.value[t].todos.splice(T,1),await R(e.listId,t),await g(),y.value&&await b()},reject:()=>{}})},ue=async e=>{const t=A(o.value,e);o.value[t].todos.push({id:o.value[t].todos.length+1,title:"",content:"",deadline:"",is_adding_todo:!0,is_editing_todo:!1,is_done_todo:!1});const T=o.value[t].todos.length-1;await X({listIndex:t,todoIndex:T,is_editing_todo:!0})},X=async e=>{o.value[e.listIndex].todos[e.todoIndex].is_editing_todo=e.is_editing_todo,e.is_editing_todo||await u()},pe=async e=>{o.value[e.listIndex].todos[e.todoIndex]=e.newTodo,o.value[e.listIndex].todos[e.todoIndex].is_adding_todo=!1,o.value[e.listIndex].todos[e.todoIndex].is_editing_todo=!1,await R(e.listId,e.listIndex),await g(),y.value&&await b()},ve=async e=>{o.value[e.listIndex].todos[e.todoIndex].is_done_todo=e.is_done_todo,await R(e.listId,e.listIndex),await g(),y.value&&await b()};return[h,i]=ye(()=>u()),await h,i(),(e, t)=>{var Y;const T=V("RouterLink"),E=V("InputText"),B=V("TheCheckbox"),G=V("AccordionTab"),fe=V("TheAccordion");return l(),d("div",rt,[n("div",ut,[D(T,{class:"no-underline",to:"/"},{default:H(()=>[pt]),_:1}),n("h1",vt,M((Y=L.value)==null?void 0:Y.title),1),ft]),n("div",mt,[D(fe,null,{default:H(()=>[D(G,{header:"Filter"},{default:H(()=>[n("div",_t,[n("span",gt,[ht,D(E,{modelValue:k.value,"onUpdate:modelValue":t[0]||(t[0]= p=>k.value=p),placeholder:"Search",type:"text",onInput:t[1]||(t[1]= p=>b())},null,8,["modelValue"])]),n("div",yt,[D(B,{modelValue:$.value,"onUpdate:modelValue":t[2]||(t[2]= p=>$.value=p),binary:!0,"input-id":"done",onInput:t[3]||(t[3]= p=>b())},null,8,["modelValue"]),xt]),n("div",$t,[D(B,{modelValue:r.value,"onUpdate:modelValue":t[4]||(t[4]= p=>r.value=p),binary:!0,"input-id":"inProgress",onInput:t[5]||(t[5]= p=>b())},null,8,["modelValue"]),Tt])])]),_:1})]),_:1})]),n("div",kt,[D(ct,{filtering:y.value,"lists-data":o.value,onDeleteList:t[6]||(t[6]= p=>ne(p)),onCreateList:t[7]||(t[7]= p=>ie()),onIsEditingList:t[8]||(t[8]= p=>W(p)),onUpdateList:t[9]||(t[9]= p=>ce(p)),onDeleteTodo:t[10]||(t[10]= p=>re(p)),onCreateTodo:t[11]||(t[11]= p=>ue(p)),onIsEditingTodo:t[12]||(t[12]= p=>X(p)),onUpdateTodo:t[13]||(t[13]= p=>pe(p)),onDoneTodo:t[14]||(t[14]= p=>ve(p))},null,8,["filtering","lists-data"])])])}}});export{Dt as default};
