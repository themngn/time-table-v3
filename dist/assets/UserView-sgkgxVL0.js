import{_,c as n,a as i,N as p,S as I,F as a,r as d,z as D,A as v,U as G,o as l,t as f,R as C}from"./index-DfyLvnsv.js";const w={name:"UserView",data(){return{userID:"",choices:[],chose:[],userGroups:[],groups:{},url:"/"}},methods:{async fetchChoices(s){if(!/^[0-9a-f]{24}$/.test(s)){alert("Invalid user ID");return}const o=await fetch(`/api/users/${s}/choices`,{methods:"GET"});this.choices=await o.json(),this.chose={};for(let e=0;e<this.choices.length;e++)for(let u=0;u<this.userGroups.length;u++){console.log(this.choices[e].subgroups);for(let t=0;t<this.choices[e].subgroups.length;t++)console.log(this.choices[e].subgroups[t]._id),console.log(this.userGroups[u]),this.choices[e].subgroups[t]._id===this.userGroups[u]&&(this.chose[this.choices[e]._id]=this.userGroups[u]);this.chose[this.choices[e]._id]===void 0&&(this.chose[this.choices[e]._id]=this.choices[e].subgroups[0]._id)}},async fetchGroups(s){if(!/^[0-9a-f]{24}$/.test(s)){alert("Invalid user ID");return}const o=await fetch(`/api/users/${s}`,{methods:"GET"});this.userGroups=await o.json(),this.userGroups=this.userGroups.groups},async groupList(){let o=await(await fetch("/api/groups",{methods:"GET"})).json();for(let e=0;e<o.length;e++)this.groups[o[e]._id]=o[e].name},async saveUserID(s){localStorage.setItem("userID",s)}},mounted(){const s=localStorage.getItem("userID");s&&(this.userID=s,this.fetchGroups(s),this.fetchChoices(s),this.groupList())}},y={class:"course"},U=i("h1",null,"This is an user page",-1),b=["onUpdate:modelValue","value","id"],V=["for"];function k(s,o,e,u,t,c){const g=G("AddClassModal");return l(),n(a,null,[i("div",y,[U,p(i("input",{"onUpdate:modelValue":o[0]||(o[0]=r=>t.userID=r),type:"text",placeholder:"Enter your user ID",onChange:o[1]||(o[1]=r=>{c.fetchGroups(t.userID),c.fetchChoices(t.userID),c.saveUserID(t.userID)})},null,544),[[I,t.userID]]),i("ul",null,[(l(!0),n(a,null,d(t.choices,r=>(l(),n("li",null,[i("div",null,f(r.name),1),i("ul",null,[(l(!0),n(a,null,d(r.subgroups,h=>(l(),n("li",null,[p(i("input",{type:"radio","onUpdate:modelValue":m=>t.chose[r._id]=m,value:h._id,id:h._id},null,8,b),[[C,t.chose[r._id]]]),i("label",{for:h._id},f(t.groups[h._id]),9,V)]))),256))])]))),256))])]),s.modalOpen?(l(),D(g,{key:0,courseID:s.activeCourse,onClose:o[2]||(o[2]=r=>s.modalOpen=!1),onRefresh:s.fetchCourses},null,8,["courseID","onRefresh"])):v("",!0)],64)}const S=_(w,[["render",k]]);export{S as default};
