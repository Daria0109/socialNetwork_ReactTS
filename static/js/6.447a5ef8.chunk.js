(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[6],{294:function(e,t,n){e.exports={users:"Users_users__3bE0l",user_block:"Users_user_block__1raL4",user_left:"Users_user_left__3Jnh0",avatar:"Users_avatar__3zP4a",btn:"Users_btn__1sVoZ",user_right:"Users_user_right__1aXim",info:"Users_info__12AM_"}},299:function(e,t,n){e.exports={active_page:"Paginator_active_page__2tvbv"}},311:function(e,t,n){"use strict";n.r(t);var a=n(12),r=n(0),c=n.n(r),l=n(4),u=n(97),i=n(294),s=n.n(i),o=n(293),f=n(299),m=n.n(f),b=function(e){for(var t=e.totalUsersCount,n=e.pageSize,a=e.currentPage,l=e.setCurrentPage,u=e.portionSize,i=void 0===u?10:u,s=Math.ceil(t/n),f=[],b=1;b<=s;b++)f.push(b);var d=Math.ceil(s/i),g=Object(r.useState)(1),p=Object(o.a)(g,2),v=p[0],E=p[1],_=(v-1)*i+1,j=v*i;return c.a.createElement(c.a.Fragment,null,v>1&&c.a.createElement("button",{onClick:function(){return E(v-1)}},"PREV"),f.filter((function(e){return e>=_&&e<=j})).map((function(e,t){var n=e===a?m.a.active_page:"";return c.a.createElement("span",{key:t,className:n,onClick:function(){return l(e)}}," ",e," ")})),d>v&&c.a.createElement("button",{onClick:function(){return E(v+1)}},"NEXT"))},d=n(15),g=n(14),p=n.n(g),v=function(e){var t=e.user,n=e.followingInProgress,a=e.unfollow,r=e.follow;return c.a.createElement("div",{key:t.id,className:s.a.user_block},c.a.createElement("div",{className:s.a.user_left},c.a.createElement(d.b,{to:"/profile/"+t.id},c.a.createElement("img",{src:t.photos.small?t.photos.small:p.a,className:s.a.avatar})),t.followed?c.a.createElement("button",{className:s.a.btn,disabled:n.some((function(e){return e===t.id})),onClick:function(){return a(t.id)}},"Unfollow"):c.a.createElement("button",{className:s.a.btn,disabled:n.some((function(e){return e===t.id})),onClick:function(){return r(t.id)}},"Follow")),c.a.createElement("div",{className:s.a.user_right},c.a.createElement("div",{className:s.a.info},c.a.createElement("div",null,t.name),c.a.createElement("div",null,t.status)),c.a.createElement("div",{className:s.a.place},c.a.createElement("div",null,"user.location.country"),c.a.createElement("div",null,"user.location.city"))))},E=n(130),_=n(308),j=function(e){return{}},O=c.a.memo((function(e){var t=e.onFilterChanged,n=Object(a.d)((function(e){return e.usersPage.filter}));return c.a.createElement("div",null,c.a.createElement(_.c,{enableReinitialize:!0,initialValues:{term:n.term,friend:String(n.friend)},validate:j,onSubmit:function(e,n){var a=n.setSubmitting,r={term:e.term,friend:"true"===e.friend||"false"!==e.friend&&null};t(r),a(!1)}},(function(e){var t=e.isSubmitting;return c.a.createElement(_.b,null,c.a.createElement(_.a,{type:"text",name:"term"}),c.a.createElement(_.a,{name:"friend",as:"select"},c.a.createElement("option",{value:"null"},"All"),c.a.createElement("option",{value:"true"},"Followed"),c.a.createElement("option",{value:"false"},"Unfollowed")),c.a.createElement("button",{type:"submit",disabled:t},"Search"))})))})),h=n(10),P=n(303),k=function(e){Object(u.a)(e);var t=Object(a.d)((function(e){return e.usersPage.totalUsersCount})),n=Object(a.d)((function(e){return e.usersPage.portionSize})),i=Object(a.d)((function(e){return e.usersPage.pageSize})),o=Object(a.d)((function(e){return e.usersPage.currentPage})),f=Object(a.d)((function(e){return e.usersPage.users})),m=Object(a.d)((function(e){return e.usersPage.followingInProgress})),d=Object(a.d)((function(e){return e.usersPage.filter})),g=Object(a.c)(),p=Object(h.g)();Object(r.useEffect)((function(){var e=P.parse(p.location.search.substr(1)),t=o;e.page&&(t=Number(e.page));var n=d;switch(e.term&&(n=Object(l.a)(Object(l.a)({},n),{},{term:e.term})),e.friend){case"null":n=Object(l.a)(Object(l.a)({},n),{},{friend:null});break;case"true":n=Object(l.a)(Object(l.a)({},n),{},{friend:!0});break;case"false":n=Object(l.a)(Object(l.a)({},n),{},{friend:!1})}g(Object(E.c)(t,i,n))}),[]),Object(r.useEffect)((function(){var e={};1!==o&&(e.page=String(o)),d.term&&(e.term=d.term),null!==d.friend&&(e.friend=String(d.friend)),p.push({pathname:"/users",search:P.stringify(e)})}),[d,o]);var _=function(e){g(Object(E.b)(e))},j=function(e){g(Object(E.d)(e))};return c.a.createElement("div",{className:s.a.users},c.a.createElement(O,{onFilterChanged:function(e){g(Object(E.c)(1,i,e))}}),c.a.createElement(b,{totalUsersCount:t,pageSize:i,currentPage:o,setCurrentPage:function(e){g(E.e.setCurrentPage(e)),g(Object(E.c)(e,i,d))},portionSize:n}),f.map((function(e){return c.a.createElement(v,{key:e.id,user:e,unfollow:j,follow:_,followingInProgress:m})})))},w=n(59);t.default=function(){var e=Object(a.d)((function(e){return e.usersPage.isFetching}));return c.a.createElement(c.a.Fragment,null,e?c.a.createElement(w.a,null):null,c.a.createElement(k,null))}}}]);
//# sourceMappingURL=6.447a5ef8.chunk.js.map