(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const pi=i=>i.map(t=>[...t]);function Pr(i,t,{from:e,to:n}){const r=i[e],o=i[n];return e!==n&&!!r?.length&&!!o&&o.length<t&&(!o.length||o[o.length-1]===r[r.length-1])}function yl(i,t){const e=pi(i),n=e[t.from].pop();return n!==void 0&&e[t.to].push(n),e}function as(i,t){return i.every(e=>!e.length||e.length===t&&e.every(n=>n===e[0]))}class Ua{constructor(t,e){this.initial=t,this.capacity=e,this.board=pi(t)}initial;capacity;board;history=[];extra=!1;move(t){return Pr(this.board,this.capacity,t)?(this.history.push(pi(this.board)),this.board=yl(this.board,t),!0):!1}undo(){const t=this.history.pop();if(!t)return!1;for(;t.length<this.board.length;)t.push([]);return this.board=t,!0}addCone(){return this.extra?!1:(this.extra=!0,this.board.push([]),!0)}restart(){this.board=pi(this.initial),this.history=[],this.extra=!1}}const El=JSON.parse('[{"id":1,"seed":144928,"capacity":3,"board":[[1,1,0],[],[0,0,1]],"shortest":3,"solution":[{"from":2,"to":1},{"from":0,"to":2},{"from":1,"to":0}],"reverse":[{"from":1,"to":2},{"from":1,"to":2},{"from":0,"to":2},{"from":1,"to":0}],"order":[2,1,0]},{"id":2,"seed":152847,"capacity":3,"board":[[],[1,0,0],[1,1,0]],"shortest":4,"solution":[{"from":2,"to":0},{"from":1,"to":0},{"from":1,"to":0},{"from":1,"to":2}],"reverse":[{"from":1,"to":2},{"from":0,"to":1},{"from":0,"to":2},{"from":0,"to":2}],"order":[0,2,1]},{"id":3,"seed":160766,"capacity":4,"board":[[0,0,0,1],[],[1,1,1,0]],"shortest":3,"solution":[{"from":0,"to":1},{"from":2,"to":0},{"from":1,"to":2}],"reverse":[{"from":0,"to":2},{"from":1,"to":0},{"from":2,"to":1}],"order":[0,2,1]},{"id":4,"seed":168685,"capacity":4,"board":[[2,2,0,0],[],[1,1,1,2],[1,2,0,0]],"shortest":7,"solution":[{"from":0,"to":1},{"from":0,"to":1},{"from":2,"to":0},{"from":3,"to":1},{"from":3,"to":1},{"from":3,"to":0},{"from":3,"to":2}],"reverse":[{"from":1,"to":3},{"from":2,"to":1},{"from":2,"to":3},{"from":0,"to":2},{"from":0,"to":3},{"from":0,"to":3},{"from":0,"to":2}],"order":[2,0,1,3]},{"id":5,"seed":176604,"capacity":4,"board":[[1,0,0,0],[2,1,0,1],[],[2,2,2,1]],"shortest":8,"solution":[{"from":0,"to":2},{"from":0,"to":2},{"from":0,"to":2},{"from":3,"to":0},{"from":1,"to":0},{"from":1,"to":2},{"from":1,"to":0},{"from":1,"to":3}],"reverse":[{"from":2,"to":3},{"from":1,"to":2},{"from":1,"to":3},{"from":0,"to":3},{"from":1,"to":3},{"from":0,"to":1},{"from":0,"to":1},{"from":0,"to":1}],"order":[1,3,0,2]},{"id":6,"seed":184523,"capacity":4,"board":[[1,2,0,1],[],[2,2,2,0],[1,0,1,0],[]],"shortest":9,"solution":[{"from":2,"to":1},{"from":3,"to":1},{"from":0,"to":3},{"from":0,"to":1},{"from":0,"to":2},{"from":3,"to":0},{"from":3,"to":0},{"from":3,"to":1},{"from":3,"to":0}],"reverse":[{"from":1,"to":3},{"from":2,"to":3},{"from":0,"to":3},{"from":0,"to":2},{"from":1,"to":4},{"from":0,"to":3},{"from":0,"to":4},{"from":1,"to":4},{"from":3,"to":4},{"from":1,"to":3}],"order":[3,0,2,4,1]},{"id":7,"seed":192442,"capacity":4,"board":[[1,2,0,0],[2,2,1,0],[],[],[1,1,2,0]],"shortest":9,"solution":[{"from":4,"to":3},{"from":1,"to":3},{"from":0,"to":3},{"from":0,"to":3},{"from":4,"to":0},{"from":1,"to":4},{"from":0,"to":1},{"from":0,"to":1},{"from":0,"to":4}],"reverse":[{"from":1,"to":3},{"from":2,"to":3},{"from":2,"to":4},{"from":1,"to":2},{"from":4,"to":1},{"from":0,"to":3},{"from":0,"to":2},{"from":0,"to":1},{"from":0,"to":3}],"order":[3,2,4,0,1]},{"id":8,"seed":200361,"capacity":4,"board":[[2,2,2,0],[],[1,1,2,1],[0,0,0,1],[]],"shortest":6,"solution":[{"from":3,"to":4},{"from":0,"to":3},{"from":2,"to":4},{"from":2,"to":0},{"from":4,"to":2},{"from":4,"to":2}],"reverse":[{"from":1,"to":3},{"from":1,"to":3},{"from":2,"to":3},{"from":0,"to":2},{"from":1,"to":0},{"from":1,"to":4},{"from":4,"to":3}],"order":[2,4,3,0,1]},{"id":9,"seed":208280,"capacity":4,"board":[[],[0,1,1,3],[],[1,3,0,3],[2,1,0,3],[2,2,2,0]],"shortest":12,"solution":[{"from":1,"to":2},{"from":3,"to":2},{"from":4,"to":2},{"from":3,"to":4},{"from":3,"to":2},{"from":1,"to":3},{"from":1,"to":3},{"from":5,"to":1},{"from":4,"to":1},{"from":4,"to":1},{"from":4,"to":3},{"from":4,"to":5}],"reverse":[{"from":2,"to":4},{"from":1,"to":4},{"from":0,"to":4},{"from":0,"to":2},{"from":0,"to":4},{"from":1,"to":5},{"from":1,"to":0},{"from":3,"to":1},{"from":5,"to":0},{"from":4,"to":1},{"from":3,"to":0},{"from":3,"to":4},{"from":3,"to":1}],"order":[5,0,3,1,4,2]},{"id":10,"seed":216199,"capacity":4,"board":[[2,2,0,3],[],[0,2,2,1],[3,3,3,1],[1,1,0,0],[]],"shortest":9,"solution":[{"from":4,"to":5},{"from":4,"to":5},{"from":3,"to":4},{"from":0,"to":3},{"from":2,"to":4},{"from":0,"to":5},{"from":2,"to":0},{"from":2,"to":0},{"from":2,"to":5}],"reverse":[{"from":0,"to":4},{"from":2,"to":4},{"from":2,"to":4},{"from":0,"to":2},{"from":3,"to":2},{"from":1,"to":4},{"from":1,"to":3},{"from":0,"to":1},{"from":0,"to":5},{"from":5,"to":1}],"order":[2,5,4,3,1,0]},{"id":11,"seed":224118,"capacity":4,"board":[[],[0,0,2,2],[0,1,0,3],[2,3,2,3],[1,1,1,3],[]],"shortest":11,"solution":[{"from":4,"to":5},{"from":2,"to":5},{"from":3,"to":5},{"from":3,"to":0},{"from":3,"to":5},{"from":0,"to":3},{"from":1,"to":3},{"from":1,"to":3},{"from":2,"to":1},{"from":2,"to":4},{"from":2,"to":1}],"reverse":[{"from":0,"to":4},{"from":1,"to":4},{"from":0,"to":4},{"from":3,"to":4},{"from":2,"to":5},{"from":3,"to":5},{"from":2,"to":5},{"from":3,"to":5},{"from":3,"to":1},{"from":2,"to":0},{"from":2,"to":0}],"order":[3,0,4,5,1,2]},{"id":12,"seed":232037,"capacity":4,"board":[[0,0,0,1],[],[2,0,1,3],[2,2,2,1],[],[1,3,3,3]],"shortest":9,"solution":[{"from":2,"to":4},{"from":5,"to":4},{"from":5,"to":4},{"from":5,"to":4},{"from":0,"to":5},{"from":3,"to":5},{"from":2,"to":5},{"from":2,"to":0},{"from":2,"to":3}],"reverse":[{"from":0,"to":4},{"from":2,"to":5},{"from":4,"to":5},{"from":1,"to":0},{"from":1,"to":2},{"from":1,"to":5},{"from":3,"to":5},{"from":3,"to":4},{"from":3,"to":4},{"from":4,"to":1},{"from":3,"to":1},{"from":4,"to":3},{"from":1,"to":3},{"from":3,"to":4},{"from":4,"to":1},{"from":1,"to":3},{"from":3,"to":4},{"from":3,"to":1},{"from":1,"to":4},{"from":4,"to":3},{"from":4,"to":1},{"from":3,"to":1}],"order":[0,4,5,2,3,1]},{"id":13,"seed":239956,"capacity":4,"board":[[],[],[0,0,0,4],[1,1,1,4],[2,2,2,3],[3,1,4,4],[2,3,0,3]],"shortest":10,"solution":[{"from":2,"to":0},{"from":3,"to":0},{"from":5,"to":0},{"from":5,"to":0},{"from":5,"to":3},{"from":4,"to":5},{"from":6,"to":5},{"from":6,"to":2},{"from":6,"to":5},{"from":6,"to":4}],"reverse":[{"from":3,"to":5},{"from":3,"to":5},{"from":2,"to":6},{"from":5,"to":6},{"from":5,"to":2},{"from":4,"to":5},{"from":0,"to":6},{"from":5,"to":0},{"from":4,"to":5},{"from":3,"to":6},{"from":1,"to":3},{"from":5,"to":4},{"from":4,"to":1},{"from":4,"to":5},{"from":4,"to":5},{"from":5,"to":3},{"from":5,"to":4},{"from":4,"to":3}],"order":[4,5,0,1,2,3,6]},{"id":14,"seed":247875,"capacity":4,"board":[[2,2,0,4],[],[],[3,3,0,2],[1,3,0,3],[1,4,4,4],[1,1,2,0]],"shortest":14,"solution":[{"from":6,"to":1},{"from":0,"to":2},{"from":0,"to":1},{"from":6,"to":0},{"from":3,"to":0},{"from":3,"to":1},{"from":4,"to":3},{"from":4,"to":1},{"from":4,"to":3},{"from":4,"to":6},{"from":5,"to":2},{"from":5,"to":2},{"from":5,"to":2},{"from":5,"to":6}],"reverse":[{"from":1,"to":6},{"from":3,"to":6},{"from":0,"to":6},{"from":1,"to":5},{"from":3,"to":6},{"from":2,"to":1},{"from":0,"to":3},{"from":2,"to":3},{"from":4,"to":5},{"from":0,"to":2},{"from":4,"to":2},{"from":4,"to":5},{"from":4,"to":5},{"from":0,"to":1}],"order":[2,0,4,3,6,5,1]},{"id":15,"seed":255794,"capacity":4,"board":[[0,2,1,2],[4,4,4,3],[3,3,3,1],[0,0,0,4],[],[],[1,2,1,2]],"shortest":11,"solution":[{"from":2,"to":4},{"from":1,"to":2},{"from":3,"to":1},{"from":0,"to":5},{"from":0,"to":4},{"from":0,"to":5},{"from":0,"to":3},{"from":6,"to":5},{"from":6,"to":4},{"from":6,"to":5},{"from":6,"to":4}],"reverse":[{"from":0,"to":6},{"from":6,"to":5},{"from":4,"to":0},{"from":3,"to":4},{"from":1,"to":6},{"from":1,"to":3},{"from":2,"to":6},{"from":2,"to":5},{"from":1,"to":6},{"from":1,"to":5},{"from":2,"to":6},{"from":2,"to":1},{"from":1,"to":5}],"order":[5,4,3,0,1,2,6]},{"id":16,"seed":263713,"capacity":4,"board":[[],[],[0,0,0,3],[3,3,3,4],[0,1,2,4],[1,2,1,2],[1,4,2,4]],"shortest":13,"solution":[{"from":6,"to":0},{"from":3,"to":0},{"from":2,"to":3},{"from":4,"to":0},{"from":6,"to":1},{"from":6,"to":0},{"from":5,"to":1},{"from":4,"to":1},{"from":5,"to":6},{"from":5,"to":1},{"from":5,"to":6},{"from":4,"to":6},{"from":4,"to":2}],"reverse":[{"from":1,"to":5},{"from":2,"to":5},{"from":1,"to":5},{"from":0,"to":6},{"from":1,"to":6},{"from":3,"to":0},{"from":4,"to":1},{"from":2,"to":6},{"from":4,"to":3},{"from":4,"to":1},{"from":2,"to":5},{"from":1,"to":6},{"from":2,"to":1},{"from":4,"to":2},{"from":2,"to":1}],"order":[2,4,0,3,6,5,1]},{"id":17,"seed":271632,"capacity":4,"board":[[2,0,1,4],[],[],[3,3,3,4],[1,1,1,3],[0,0,0,2],[4,2,4,2]],"shortest":11,"solution":[{"from":5,"to":1},{"from":6,"to":1},{"from":3,"to":2},{"from":4,"to":3},{"from":6,"to":2},{"from":6,"to":1},{"from":6,"to":2},{"from":0,"to":2},{"from":0,"to":4},{"from":0,"to":5},{"from":0,"to":1}],"reverse":[{"from":2,"to":5},{"from":0,"to":5},{"from":2,"to":0},{"from":1,"to":5},{"from":3,"to":1},{"from":4,"to":3},{"from":4,"to":6},{"from":4,"to":5},{"from":2,"to":4},{"from":6,"to":4},{"from":2,"to":4}],"order":[5,2,6,3,1,0,4]},{"id":18,"seed":279551,"capacity":4,"board":[[],[0,1,0,1],[4,4,4,3],[2,2,2,0],[],[3,3,3,1],[2,4,0,1]],"shortest":11,"solution":[{"from":3,"to":4},{"from":5,"to":0},{"from":2,"to":5},{"from":6,"to":0},{"from":1,"to":0},{"from":6,"to":4},{"from":6,"to":2},{"from":6,"to":3},{"from":1,"to":4},{"from":1,"to":0},{"from":1,"to":4}],"reverse":[{"from":4,"to":6},{"from":3,"to":4},{"from":2,"to":5},{"from":6,"to":5},{"from":1,"to":3},{"from":0,"to":2},{"from":0,"to":6},{"from":1,"to":6},{"from":0,"to":5},{"from":1,"to":5},{"from":0,"to":6},{"from":1,"to":6}],"order":[1,6,4,2,0,3,5]},{"id":19,"seed":287470,"capacity":4,"board":[[],[2,2,2,5],[0,4,5,1],[],[2,1,1,1],[4,4,4,3],[0,0,0,5],[3,3,3,5]],"shortest":12,"solution":[{"from":6,"to":3},{"from":1,"to":3},{"from":7,"to":3},{"from":5,"to":7},{"from":2,"to":0},{"from":2,"to":3},{"from":2,"to":5},{"from":2,"to":6},{"from":4,"to":0},{"from":4,"to":0},{"from":4,"to":0},{"from":4,"to":1}],"reverse":[{"from":2,"to":6},{"from":0,"to":7},{"from":5,"to":2},{"from":5,"to":0},{"from":4,"to":7},{"from":3,"to":4},{"from":5,"to":7},{"from":5,"to":3},{"from":6,"to":5},{"from":1,"to":7},{"from":5,"to":6},{"from":1,"to":6},{"from":1,"to":5},{"from":1,"to":6},{"from":6,"to":5},{"from":5,"to":1},{"from":5,"to":6},{"from":1,"to":5},{"from":6,"to":1},{"from":1,"to":5},{"from":5,"to":6},{"from":5,"to":6}],"order":[5,2,7,1,6,4,0,3]},{"id":20,"seed":295389,"capacity":4,"board":[[],[1,1,3,2],[0,1,5,3],[2,2,2,4],[0,0,0,5],[4,1,5,4],[],[5,3,4,3]],"shortest":15,"solution":[{"from":3,"to":6},{"from":1,"to":3},{"from":5,"to":6},{"from":1,"to":0},{"from":7,"to":0},{"from":7,"to":6},{"from":7,"to":0},{"from":2,"to":0},{"from":4,"to":7},{"from":5,"to":7},{"from":2,"to":7},{"from":5,"to":1},{"from":5,"to":6},{"from":2,"to":1},{"from":2,"to":4}],"reverse":[{"from":4,"to":6},{"from":1,"to":6},{"from":0,"to":7},{"from":5,"to":0},{"from":1,"to":7},{"from":3,"to":1},{"from":5,"to":6},{"from":4,"to":6},{"from":5,"to":7},{"from":3,"to":5},{"from":4,"to":5},{"from":2,"to":1},{"from":4,"to":2},{"from":3,"to":4},{"from":4,"to":5},{"from":3,"to":7}],"order":[4,1,7,2,0,6,3,5]},{"id":21,"seed":303308,"capacity":4,"board":[[4,4,1,0],[5,3,3,3],[],[2,1,5,3],[2,2,2,4],[],[0,0,0,5],[1,1,5,4]],"shortest":14,"solution":[{"from":7,"to":5},{"from":3,"to":2},{"from":1,"to":2},{"from":1,"to":2},{"from":1,"to":2},{"from":6,"to":1},{"from":0,"to":6},{"from":7,"to":1},{"from":3,"to":1},{"from":0,"to":7},{"from":3,"to":7},{"from":4,"to":0},{"from":5,"to":0},{"from":3,"to":4}],"reverse":[{"from":2,"to":7},{"from":1,"to":7},{"from":5,"to":7},{"from":4,"to":6},{"from":4,"to":2},{"from":1,"to":4},{"from":0,"to":4},{"from":5,"to":0},{"from":5,"to":1},{"from":3,"to":7},{"from":6,"to":1},{"from":3,"to":5},{"from":3,"to":5},{"from":3,"to":6},{"from":5,"to":3},{"from":6,"to":5},{"from":3,"to":6},{"from":6,"to":5}],"order":[4,5,6,7,2,3,0,1]},{"id":22,"seed":311227,"capacity":4,"board":[[5,5,5,0],[],[4,4,4,5],[4,2,1,0],[3,3,3,2],[1,1,1,2],[],[2,3,0,0]],"shortest":12,"solution":[{"from":5,"to":6},{"from":4,"to":6},{"from":0,"to":1},{"from":2,"to":0},{"from":3,"to":1},{"from":3,"to":5},{"from":3,"to":6},{"from":3,"to":2},{"from":7,"to":1},{"from":7,"to":1},{"from":7,"to":4},{"from":7,"to":6}],"reverse":[{"from":4,"to":6},{"from":2,"to":6},{"from":1,"to":6},{"from":2,"to":1},{"from":2,"to":7},{"from":3,"to":2},{"from":5,"to":4},{"from":7,"to":3},{"from":0,"to":5},{"from":0,"to":2},{"from":0,"to":7},{"from":0,"to":6},{"from":7,"to":2}],"order":[5,7,4,6,3,1,0,2]},{"id":23,"seed":319146,"capacity":4,"board":[[],[],[5,5,4,5],[1,1,1,0],[0,3,2,4],[2,2,4,4],[3,3,3,1],[0,5,2,0]],"shortest":15,"solution":[{"from":2,"to":0},{"from":2,"to":1},{"from":0,"to":2},{"from":4,"to":1},{"from":5,"to":1},{"from":5,"to":1},{"from":4,"to":5},{"from":3,"to":0},{"from":6,"to":3},{"from":4,"to":6},{"from":0,"to":4},{"from":7,"to":4},{"from":7,"to":5},{"from":7,"to":2},{"from":7,"to":4}],"reverse":[{"from":2,"to":6},{"from":0,"to":7},{"from":3,"to":7},{"from":6,"to":7},{"from":1,"to":3},{"from":2,"to":7},{"from":0,"to":6},{"from":0,"to":1},{"from":4,"to":2},{"from":4,"to":2},{"from":5,"to":6},{"from":7,"to":6},{"from":0,"to":6},{"from":2,"to":7},{"from":4,"to":2},{"from":5,"to":0},{"from":5,"to":0},{"from":4,"to":0},{"from":5,"to":0}],"order":[4,5,0,1,7,2,3,6]},{"id":24,"seed":327065,"capacity":4,"board":[[2,2,2,3],[3,3,5,0],[1,1,1,5],[],[],[4,4,4,5],[5,0,0,0],[4,1,2,3]],"shortest":12,"solution":[{"from":1,"to":3},{"from":6,"to":3},{"from":6,"to":3},{"from":6,"to":3},{"from":2,"to":6},{"from":1,"to":6},{"from":5,"to":6},{"from":0,"to":1},{"from":7,"to":1},{"from":7,"to":0},{"from":7,"to":2},{"from":7,"to":5}],"reverse":[{"from":4,"to":7},{"from":1,"to":7},{"from":2,"to":7},{"from":5,"to":6},{"from":3,"to":2},{"from":6,"to":1},{"from":3,"to":7},{"from":5,"to":6},{"from":5,"to":3},{"from":0,"to":6},{"from":5,"to":4},{"from":0,"to":6},{"from":6,"to":5},{"from":5,"to":0},{"from":0,"to":6},{"from":6,"to":3},{"from":0,"to":5},{"from":0,"to":5},{"from":5,"to":6},{"from":6,"to":0},{"from":0,"to":5},{"from":5,"to":6},{"from":5,"to":6}],"order":[2,3,1,0,5,4,6,7]},{"id":25,"seed":334984,"capacity":4,"board":[[5,5,5,2],[],[2,1,3,3],[0,0,0,2],[],[4,4,4,1],[1,5,4,1],[0,2,3,3]],"shortest":14,"solution":[{"from":5,"to":1},{"from":6,"to":1},{"from":6,"to":5},{"from":2,"to":4},{"from":2,"to":4},{"from":2,"to":1},{"from":7,"to":4},{"from":7,"to":4},{"from":3,"to":2},{"from":0,"to":2},{"from":7,"to":2},{"from":7,"to":3},{"from":6,"to":0},{"from":6,"to":1}],"reverse":[{"from":0,"to":6},{"from":2,"to":0},{"from":1,"to":7},{"from":5,"to":7},{"from":2,"to":5},{"from":4,"to":7},{"from":2,"to":6},{"from":1,"to":4},{"from":1,"to":7},{"from":1,"to":2},{"from":3,"to":6},{"from":3,"to":6},{"from":3,"to":2},{"from":3,"to":1},{"from":6,"to":3},{"from":3,"to":2},{"from":2,"to":1},{"from":1,"to":6},{"from":1,"to":2}],"order":[5,1,2,0,3,4,7,6]},{"id":26,"seed":342903,"capacity":4,"board":[[5,1,1,0],[2,2,0,1],[5,5,4,2],[5,2,3,3],[],[4,4,4,0],[0,1,3,3],[]],"shortest":16,"solution":[{"from":1,"to":4},{"from":6,"to":7},{"from":6,"to":7},{"from":3,"to":7},{"from":3,"to":7},{"from":6,"to":4},{"from":1,"to":6},{"from":5,"to":6},{"from":0,"to":6},{"from":2,"to":1},{"from":2,"to":5},{"from":3,"to":1},{"from":3,"to":2},{"from":0,"to":4},{"from":0,"to":4},{"from":0,"to":2}],"reverse":[{"from":5,"to":7},{"from":5,"to":6},{"from":1,"to":6},{"from":4,"to":5},{"from":1,"to":6},{"from":2,"to":7},{"from":2,"to":7},{"from":2,"to":7},{"from":0,"to":4},{"from":7,"to":2},{"from":0,"to":6},{"from":0,"to":2},{"from":7,"to":5},{"from":1,"to":0},{"from":3,"to":7},{"from":1,"to":2},{"from":3,"to":1},{"from":3,"to":1},{"from":3,"to":0},{"from":1,"to":7},{"from":1,"to":3},{"from":7,"to":3},{"from":3,"to":1},{"from":3,"to":7},{"from":7,"to":1},{"from":1,"to":0},{"from":0,"to":7},{"from":7,"to":3},{"from":1,"to":7},{"from":7,"to":3},{"from":3,"to":1},{"from":3,"to":0},{"from":0,"to":1},{"from":1,"to":3},{"from":1,"to":3},{"from":3,"to":7},{"from":7,"to":0},{"from":3,"to":1},{"from":0,"to":3},{"from":1,"to":0},{"from":0,"to":7},{"from":7,"to":1},{"from":1,"to":3},{"from":3,"to":0},{"from":3,"to":7}],"order":[6,2,5,7,1,4,0,3]},{"id":27,"seed":350822,"capacity":4,"board":[[5,4,5,4],[],[5,5,0,3],[2,2,2,0],[],[3,2,4,1],[4,1,3,1],[0,0,3,1]],"shortest":16,"solution":[{"from":7,"to":4},{"from":6,"to":4},{"from":5,"to":4},{"from":7,"to":1},{"from":3,"to":7},{"from":6,"to":1},{"from":6,"to":4},{"from":2,"to":1},{"from":2,"to":7},{"from":0,"to":6},{"from":0,"to":2},{"from":0,"to":6},{"from":0,"to":2},{"from":5,"to":6},{"from":5,"to":3},{"from":5,"to":1}],"reverse":[{"from":3,"to":7},{"from":5,"to":6},{"from":4,"to":6},{"from":5,"to":6},{"from":2,"to":7},{"from":4,"to":6},{"from":0,"to":2},{"from":4,"to":7},{"from":0,"to":5},{"from":1,"to":7},{"from":3,"to":0},{"from":1,"to":0},{"from":1,"to":4},{"from":3,"to":5},{"from":3,"to":4},{"from":1,"to":4}],"order":[6,3,5,2,1,7,4,0]},{"id":28,"seed":358741,"capacity":4,"board":[[],[1,5,0,3],[2,2,4,0],[3,3,0,4],[1,2,2,1],[1,0,4,4],[5,5,5,3],[]],"shortest":16,"solution":[{"from":2,"to":0},{"from":2,"to":7},{"from":3,"to":7},{"from":5,"to":7},{"from":5,"to":7},{"from":3,"to":0},{"from":1,"to":3},{"from":6,"to":3},{"from":1,"to":0},{"from":1,"to":6},{"from":5,"to":0},{"from":1,"to":5},{"from":4,"to":5},{"from":4,"to":2},{"from":4,"to":2},{"from":4,"to":5}],"reverse":[{"from":1,"to":6},{"from":2,"to":6},{"from":1,"to":7},{"from":2,"to":6},{"from":1,"to":6},{"from":5,"to":1},{"from":3,"to":5},{"from":0,"to":1},{"from":4,"to":2},{"from":0,"to":2},{"from":3,"to":1},{"from":0,"to":7},{"from":0,"to":3},{"from":4,"to":3},{"from":4,"to":7},{"from":4,"to":7}],"order":[0,1,2,3,6,7,5,4]},{"id":29,"seed":366660,"capacity":4,"board":[[],[1,1,1,2],[],[4,5,3,3],[4,4,4,1],[5,0,2,3],[5,0,2,3],[0,0,2,5]],"shortest":16,"solution":[{"from":1,"to":0},{"from":4,"to":1},{"from":6,"to":2},{"from":6,"to":0},{"from":5,"to":2},{"from":5,"to":0},{"from":6,"to":5},{"from":3,"to":2},{"from":3,"to":2},{"from":7,"to":6},{"from":7,"to":0},{"from":3,"to":6},{"from":3,"to":4},{"from":5,"to":7},{"from":5,"to":7},{"from":5,"to":6}],"reverse":[{"from":5,"to":7},{"from":4,"to":6},{"from":0,"to":7},{"from":5,"to":6},{"from":5,"to":6},{"from":0,"to":5},{"from":1,"to":4},{"from":2,"to":0},{"from":2,"to":1},{"from":2,"to":5},{"from":2,"to":5},{"from":6,"to":2},{"from":5,"to":7},{"from":2,"to":0},{"from":3,"to":7},{"from":3,"to":2},{"from":3,"to":5},{"from":3,"to":6},{"from":2,"to":3},{"from":3,"to":6}],"order":[2,1,3,6,4,7,5,0]},{"id":30,"seed":374579,"capacity":4,"board":[[0,5,0,5],[3,3,2,0],[4,4,4,2],[],[4,2,5,5],[],[3,2,1,0],[1,1,1,3]],"shortest":16,"solution":[{"from":0,"to":3},{"from":4,"to":3},{"from":4,"to":3},{"from":0,"to":5},{"from":0,"to":3},{"from":0,"to":5},{"from":1,"to":5},{"from":6,"to":5},{"from":1,"to":0},{"from":7,"to":1},{"from":6,"to":7},{"from":2,"to":0},{"from":6,"to":0},{"from":6,"to":1},{"from":4,"to":0},{"from":4,"to":2}],"reverse":[{"from":4,"to":7},{"from":3,"to":6},{"from":2,"to":7},{"from":2,"to":4},{"from":2,"to":6},{"from":1,"to":6},{"from":3,"to":1},{"from":2,"to":3},{"from":0,"to":6},{"from":5,"to":7},{"from":0,"to":2},{"from":5,"to":2},{"from":0,"to":2},{"from":0,"to":3},{"from":5,"to":2},{"from":5,"to":7}],"order":[2,3,4,0,7,5,6,1]},{"id":31,"seed":382498,"capacity":4,"board":[[4,4,1,0],[],[4,0,2,2],[1,1,1,5],[0,5,4,2],[],[3,3,0,3],[5,5,3,2]],"shortest":16,"solution":[{"from":6,"to":5},{"from":6,"to":1},{"from":5,"to":6},{"from":0,"to":1},{"from":7,"to":5},{"from":7,"to":6},{"from":3,"to":7},{"from":0,"to":3},{"from":4,"to":5},{"from":4,"to":0},{"from":4,"to":7},{"from":4,"to":1},{"from":2,"to":5},{"from":2,"to":5},{"from":2,"to":1},{"from":2,"to":0}],"reverse":[{"from":4,"to":6},{"from":0,"to":6},{"from":0,"to":7},{"from":5,"to":7},{"from":4,"to":7},{"from":1,"to":4},{"from":5,"to":1},{"from":3,"to":5},{"from":0,"to":4},{"from":3,"to":5},{"from":0,"to":3},{"from":5,"to":3},{"from":2,"to":0},{"from":2,"to":6},{"from":2,"to":0},{"from":2,"to":7},{"from":0,"to":5},{"from":0,"to":2},{"from":2,"to":6}],"order":[4,2,6,1,7,0,3,5]},{"id":32,"seed":390417,"capacity":4,"board":[[5,5,5,3],[1,1,2,0],[1,4,3,4],[1,2,5,4],[3,0,0,3],[],[],[2,2,0,4]],"shortest":17,"solution":[{"from":1,"to":6},{"from":7,"to":5},{"from":7,"to":6},{"from":1,"to":7},{"from":3,"to":5},{"from":2,"to":5},{"from":4,"to":2},{"from":4,"to":6},{"from":4,"to":6},{"from":0,"to":4},{"from":3,"to":0},{"from":3,"to":7},{"from":3,"to":1},{"from":2,"to":4},{"from":2,"to":4},{"from":2,"to":5},{"from":2,"to":1}],"reverse":[{"from":1,"to":6},{"from":1,"to":7},{"from":2,"to":1},{"from":2,"to":6},{"from":4,"to":7},{"from":5,"to":6},{"from":3,"to":7},{"from":3,"to":5},{"from":0,"to":2},{"from":0,"to":2},{"from":3,"to":7},{"from":0,"to":3},{"from":2,"to":1},{"from":4,"to":2},{"from":4,"to":6},{"from":0,"to":3},{"from":7,"to":3},{"from":4,"to":0},{"from":0,"to":7}],"order":[5,1,7,6,3,4,0,2]},{"id":33,"seed":398336,"capacity":4,"board":[[3,3,3,2],[4,4,6,5],[],[3,4,0,6],[],[6,6,0,2],[5,4,1,2],[1,5,1,2],[0,0,5,1]],"shortest":19,"solution":[{"from":0,"to":4},{"from":7,"to":4},{"from":5,"to":4},{"from":6,"to":4},{"from":7,"to":6},{"from":1,"to":2},{"from":7,"to":2},{"from":8,"to":7},{"from":8,"to":2},{"from":5,"to":8},{"from":1,"to":5},{"from":3,"to":5},{"from":3,"to":8},{"from":3,"to":1},{"from":3,"to":0},{"from":6,"to":7},{"from":6,"to":7},{"from":6,"to":1},{"from":6,"to":2}],"reverse":[{"from":3,"to":7},{"from":4,"to":7},{"from":2,"to":3},{"from":5,"to":8},{"from":0,"to":7},{"from":4,"to":8},{"from":6,"to":7},{"from":6,"to":4},{"from":0,"to":6},{"from":2,"to":6},{"from":5,"to":0},{"from":5,"to":0},{"from":5,"to":4},{"from":1,"to":5},{"from":5,"to":8},{"from":2,"to":8},{"from":1,"to":5},{"from":0,"to":5},{"from":1,"to":0},{"from":1,"to":5},{"from":2,"to":1},{"from":1,"to":5}],"order":[3,4,2,7,1,6,8,5,0]},{"id":34,"seed":406255,"capacity":4,"board":[[6,6,4,3],[2,2,4,6],[5,0,3,3],[0,0,0,3],[],[],[1,4,2,1],[5,5,5,1],[2,1,6,4]],"shortest":18,"solution":[{"from":3,"to":5},{"from":0,"to":5},{"from":2,"to":5},{"from":2,"to":5},{"from":2,"to":3},{"from":7,"to":4},{"from":2,"to":7},{"from":6,"to":4},{"from":0,"to":2},{"from":1,"to":0},{"from":1,"to":2},{"from":8,"to":2},{"from":8,"to":0},{"from":8,"to":4},{"from":8,"to":1},{"from":6,"to":1},{"from":6,"to":2},{"from":6,"to":4}],"reverse":[{"from":2,"to":7},{"from":1,"to":8},{"from":4,"to":8},{"from":1,"to":7},{"from":2,"to":8},{"from":6,"to":7},{"from":4,"to":7},{"from":4,"to":2},{"from":6,"to":2},{"from":4,"to":6},{"from":1,"to":8},{"from":3,"to":6},{"from":5,"to":4},{"from":1,"to":5},{"from":4,"to":1},{"from":0,"to":1},{"from":3,"to":0},{"from":3,"to":1},{"from":3,"to":4},{"from":4,"to":1}],"order":[6,2,1,0,4,3,8,5,7]},{"id":35,"seed":414174,"capacity":4,"board":[[3,3,3,4],[1,0,5,1],[0,0,1,2],[],[4,6,4,2],[3,4,6,2],[6,6,1,0],[5,5,5,2],[]],"shortest":18,"solution":[{"from":2,"to":3},{"from":4,"to":3},{"from":7,"to":3},{"from":5,"to":3},{"from":2,"to":8},{"from":6,"to":2},{"from":6,"to":8},{"from":5,"to":6},{"from":4,"to":5},{"from":4,"to":6},{"from":1,"to":8},{"from":1,"to":7},{"from":1,"to":2},{"from":1,"to":8},{"from":0,"to":4},{"from":5,"to":4},{"from":5,"to":4},{"from":5,"to":0}],"reverse":[{"from":3,"to":7},{"from":4,"to":7},{"from":4,"to":7},{"from":7,"to":3},{"from":4,"to":7},{"from":6,"to":4},{"from":7,"to":4},{"from":6,"to":7},{"from":1,"to":6},{"from":1,"to":8},{"from":0,"to":8},{"from":0,"to":6},{"from":2,"to":7},{"from":5,"to":8},{"from":1,"to":8},{"from":1,"to":0},{"from":2,"to":5},{"from":2,"to":0},{"from":2,"to":1},{"from":1,"to":4}],"order":[3,8,0,1,4,7,6,5,2]},{"id":36,"seed":422093,"capacity":4,"board":[[5,4,6,1],[],[6,6,1,2],[0,2,0,0],[5,5,4,3],[],[3,3,3,2],[5,6,2,0],[4,1,4,1]],"shortest":21,"solution":[{"from":6,"to":1},{"from":4,"to":6},{"from":2,"to":1},{"from":8,"to":5},{"from":8,"to":4},{"from":8,"to":5},{"from":2,"to":5},{"from":0,"to":5},{"from":0,"to":2},{"from":0,"to":8},{"from":4,"to":8},{"from":4,"to":8},{"from":0,"to":4},{"from":7,"to":0},{"from":7,"to":1},{"from":7,"to":2},{"from":7,"to":4},{"from":3,"to":0},{"from":3,"to":0},{"from":3,"to":1},{"from":3,"to":0}],"reverse":[{"from":5,"to":8},{"from":5,"to":7},{"from":4,"to":5},{"from":4,"to":8},{"from":4,"to":5},{"from":6,"to":7},{"from":1,"to":4},{"from":6,"to":8},{"from":5,"to":4},{"from":1,"to":6},{"from":1,"to":8},{"from":3,"to":5},{"from":2,"to":7},{"from":2,"to":6},{"from":1,"to":4},{"from":2,"to":7},{"from":7,"to":3},{"from":2,"to":1},{"from":1,"to":7},{"from":7,"to":2},{"from":2,"to":1},{"from":0,"to":2},{"from":0,"to":7},{"from":0,"to":2},{"from":1,"to":0},{"from":2,"to":1},{"from":1,"to":0},{"from":2,"to":1},{"from":1,"to":0}],"order":[8,1,6,0,5,2,3,7,4]},{"id":37,"seed":430012,"capacity":4,"board":[[],[5,5,0,6],[3,6,3,3],[0,0,0,2],[],[2,2,1,3],[5,1,1,6],[4,4,4,1],[5,2,6,4]],"shortest":18,"solution":[{"from":5,"to":0},{"from":2,"to":0},{"from":2,"to":0},{"from":2,"to":4},{"from":2,"to":0},{"from":6,"to":4},{"from":1,"to":4},{"from":5,"to":2},{"from":3,"to":5},{"from":1,"to":3},{"from":7,"to":2},{"from":8,"to":7},{"from":8,"to":4},{"from":8,"to":5},{"from":8,"to":1},{"from":6,"to":2},{"from":6,"to":2},{"from":6,"to":1}],"reverse":[{"from":5,"to":8},{"from":5,"to":7},{"from":2,"to":7},{"from":5,"to":8},{"from":1,"to":5},{"from":0,"to":8},{"from":6,"to":7},{"from":2,"to":0},{"from":1,"to":2},{"from":4,"to":7},{"from":1,"to":5},{"from":1,"to":2},{"from":6,"to":5},{"from":3,"to":1},{"from":6,"to":8},{"from":2,"to":4},{"from":6,"to":1},{"from":3,"to":2},{"from":3,"to":6},{"from":3,"to":1},{"from":6,"to":3},{"from":3,"to":1}],"order":[3,8,1,0,6,2,5,4,7]},{"id":38,"seed":437931,"capacity":4,"board":[[0,6,4,2],[],[5,4,2,2],[3,3,1,4],[6,6,1,4],[0,0,0,3],[1,5,5,2],[],[6,3,1,5]],"shortest":19,"solution":[{"from":6,"to":7},{"from":0,"to":7},{"from":2,"to":7},{"from":2,"to":7},{"from":3,"to":1},{"from":2,"to":1},{"from":4,"to":1},{"from":0,"to":1},{"from":8,"to":2},{"from":6,"to":2},{"from":6,"to":2},{"from":3,"to":6},{"from":5,"to":3},{"from":4,"to":6},{"from":8,"to":6},{"from":8,"to":3},{"from":8,"to":4},{"from":0,"to":4},{"from":0,"to":5}],"reverse":[{"from":0,"to":8},{"from":3,"to":0},{"from":6,"to":7},{"from":3,"to":7},{"from":1,"to":7},{"from":1,"to":3},{"from":6,"to":8},{"from":1,"to":7},{"from":7,"to":6},{"from":4,"to":3},{"from":4,"to":6},{"from":4,"to":8},{"from":5,"to":1},{"from":4,"to":8},{"from":5,"to":4},{"from":4,"to":7},{"from":5,"to":1},{"from":2,"to":1},{"from":8,"to":5},{"from":2,"to":4},{"from":2,"to":4},{"from":4,"to":5},{"from":4,"to":2},{"from":2,"to":5},{"from":5,"to":8},{"from":2,"to":4},{"from":4,"to":5}],"order":[8,4,5,3,6,0,1,2,7]},{"id":39,"seed":445850,"capacity":4,"board":[[5,5,0,2],[0,0,6,2],[4,4,6,5],[],[1,1,0,3],[1,4,5,3],[],[1,4,2,6],[3,3,6,2]],"shortest":18,"solution":[{"from":1,"to":6},{"from":8,"to":6},{"from":0,"to":6},{"from":1,"to":3},{"from":0,"to":1},{"from":2,"to":0},{"from":8,"to":3},{"from":4,"to":8},{"from":4,"to":1},{"from":5,"to":8},{"from":5,"to":0},{"from":2,"to":3},{"from":7,"to":3},{"from":7,"to":6},{"from":7,"to":2},{"from":5,"to":2},{"from":7,"to":4},{"from":5,"to":4}],"reverse":[{"from":1,"to":7},{"from":4,"to":7},{"from":1,"to":8},{"from":4,"to":8},{"from":0,"to":1},{"from":6,"to":4},{"from":3,"to":1},{"from":5,"to":8},{"from":5,"to":4},{"from":3,"to":8},{"from":6,"to":3},{"from":2,"to":7},{"from":0,"to":5},{"from":2,"to":3},{"from":6,"to":0},{"from":6,"to":0},{"from":0,"to":7},{"from":2,"to":5},{"from":2,"to":0}],"order":[5,0,4,6,1,8,2,7,3]},{"id":40,"seed":453769,"capacity":4,"board":[[],[3,3,3,2],[0,4,2,6],[],[1,1,1,4],[6,6,5,5],[4,1,4,3],[2,0,5,6],[0,0,2,5]],"shortest":18,"solution":[{"from":8,"to":0},{"from":5,"to":0},{"from":5,"to":0},{"from":7,"to":5},{"from":7,"to":0},{"from":2,"to":5},{"from":8,"to":2},{"from":7,"to":8},{"from":1,"to":7},{"from":6,"to":1},{"from":2,"to":7},{"from":2,"to":7},{"from":4,"to":3},{"from":6,"to":3},{"from":6,"to":4},{"from":6,"to":3},{"from":2,"to":3},{"from":2,"to":8}],"reverse":[{"from":4,"to":7},{"from":1,"to":7},{"from":4,"to":7},{"from":3,"to":7},{"from":4,"to":1},{"from":2,"to":3},{"from":0,"to":8},{"from":4,"to":8},{"from":2,"to":8},{"from":2,"to":8},{"from":0,"to":2},{"from":8,"to":0},{"from":5,"to":2},{"from":5,"to":0},{"from":6,"to":4},{"from":6,"to":2},{"from":5,"to":6},{"from":5,"to":6},{"from":4,"to":8}],"order":[4,3,8,5,1,6,7,2,0]},{"id":41,"seed":461688,"capacity":4,"board":[[3,2,2,0],[3,2,5,0],[0,4,6,6],[7,1,6,6],[],[2,3,0,4],[5,5,5,3],[],[7,7,7,4],[1,1,1,4]],"shortest":21,"solution":[{"from":9,"to":4},{"from":5,"to":4},{"from":8,"to":4},{"from":2,"to":7},{"from":2,"to":7},{"from":2,"to":4},{"from":3,"to":7},{"from":3,"to":7},{"from":3,"to":9},{"from":3,"to":8},{"from":5,"to":2},{"from":1,"to":2},{"from":0,"to":2},{"from":5,"to":3},{"from":6,"to":3},{"from":1,"to":6},{"from":1,"to":5},{"from":1,"to":3},{"from":0,"to":5},{"from":0,"to":5},{"from":0,"to":3}],"reverse":[{"from":3,"to":8},{"from":2,"to":8},{"from":3,"to":9},{"from":2,"to":9},{"from":5,"to":8},{"from":2,"to":9},{"from":3,"to":2},{"from":3,"to":5},{"from":0,"to":3},{"from":3,"to":8},{"from":0,"to":9},{"from":7,"to":3},{"from":0,"to":2},{"from":4,"to":7},{"from":1,"to":3},{"from":4,"to":1},{"from":4,"to":0},{"from":4,"to":2},{"from":6,"to":3},{"from":6,"to":3},{"from":3,"to":0},{"from":6,"to":4},{"from":4,"to":0},{"from":6,"to":4},{"from":0,"to":6},{"from":4,"to":0},{"from":0,"to":3},{"from":6,"to":0}],"order":[9,8,0,3,4,2,5,6,7,1]},{"id":42,"seed":469607,"capacity":4,"board":[[1,1,4,7],[],[6,5,3,1],[7,3,2,0],[5,5,5,1],[4,0,2,0],[3,0,4,2],[6,6,6,3],[7,7,2,4],[]],"shortest":20,"solution":[{"from":6,"to":1},{"from":5,"to":9},{"from":5,"to":1},{"from":5,"to":9},{"from":3,"to":9},{"from":3,"to":1},{"from":6,"to":5},{"from":6,"to":9},{"from":8,"to":5},{"from":8,"to":1},{"from":0,"to":8},{"from":0,"to":5},{"from":4,"to":0},{"from":2,"to":0},{"from":7,"to":6},{"from":3,"to":6},{"from":3,"to":8},{"from":2,"to":6},{"from":2,"to":4},{"from":2,"to":7}],"reverse":[{"from":6,"to":9},{"from":3,"to":6},{"from":5,"to":9},{"from":1,"to":5},{"from":3,"to":8},{"from":3,"to":9},{"from":1,"to":9},{"from":8,"to":3},{"from":4,"to":1},{"from":7,"to":8},{"from":7,"to":1},{"from":2,"to":7},{"from":3,"to":8},{"from":0,"to":3},{"from":2,"to":8},{"from":4,"to":3},{"from":4,"to":7},{"from":2,"to":8},{"from":8,"to":3},{"from":2,"to":8},{"from":0,"to":4},{"from":8,"to":2},{"from":2,"to":4},{"from":0,"to":2},{"from":0,"to":4},{"from":2,"to":8}],"order":[1,0,9,8,5,4,3,6,7,2]},{"id":43,"seed":477526,"capacity":4,"board":[[6,5,4,5],[4,6,5,3],[2,2,2,3],[7,7,7,0],[],[4,6,2,5],[1,4,3,3],[],[0,0,0,7],[1,1,1,6]],"shortest":20,"solution":[{"from":8,"to":7},{"from":3,"to":8},{"from":7,"to":3},{"from":2,"to":7},{"from":1,"to":7},{"from":6,"to":7},{"from":6,"to":7},{"from":1,"to":4},{"from":0,"to":4},{"from":0,"to":6},{"from":0,"to":4},{"from":5,"to":4},{"from":5,"to":2},{"from":9,"to":0},{"from":1,"to":0},{"from":5,"to":0},{"from":1,"to":5},{"from":6,"to":5},{"from":6,"to":5},{"from":6,"to":9}],"reverse":[{"from":0,"to":9},{"from":7,"to":0},{"from":9,"to":8},{"from":8,"to":7},{"from":1,"to":8},{"from":4,"to":8},{"from":4,"to":8},{"from":8,"to":9},{"from":4,"to":8},{"from":6,"to":9},{"from":6,"to":4},{"from":5,"to":4},{"from":5,"to":4},{"from":2,"to":9},{"from":6,"to":1},{"from":4,"to":6},{"from":8,"to":6},{"from":3,"to":8},{"from":5,"to":6},{"from":3,"to":2},{"from":5,"to":4},{"from":3,"to":5},{"from":4,"to":9},{"from":5,"to":3},{"from":3,"to":4},{"from":3,"to":8}],"order":[6,4,2,7,5,9,8,3,0,1]},{"id":44,"seed":485445,"capacity":4,"board":[[2,2,2,3],[1,7,0,1],[6,6,6,2],[5,0,1,0],[6,4,4,3],[7,7,7,5],[],[],[3,3,5,0],[4,5,4,1]],"shortest":20,"solution":[{"from":8,"to":6},{"from":3,"to":6},{"from":9,"to":7},{"from":3,"to":7},{"from":3,"to":6},{"from":1,"to":7},{"from":1,"to":6},{"from":8,"to":3},{"from":0,"to":8},{"from":2,"to":0},{"from":4,"to":8},{"from":9,"to":4},{"from":9,"to":3},{"from":5,"to":3},{"from":1,"to":5},{"from":1,"to":7},{"from":4,"to":9},{"from":4,"to":9},{"from":4,"to":9},{"from":4,"to":2}],"reverse":[{"from":6,"to":9},{"from":2,"to":6},{"from":4,"to":9},{"from":4,"to":9},{"from":4,"to":9},{"from":5,"to":4},{"from":9,"to":4},{"from":3,"to":9},{"from":1,"to":8},{"from":7,"to":8},{"from":5,"to":7},{"from":3,"to":2},{"from":1,"to":4},{"from":5,"to":3},{"from":0,"to":8},{"from":0,"to":3},{"from":1,"to":8},{"from":0,"to":5},{"from":1,"to":5},{"from":0,"to":5}],"order":[2,8,6,5,9,7,0,1,3,4]},{"id":45,"seed":493364,"capacity":4,"board":[[5,5,0,6],[5,4,7,7],[4,1,2,3],[],[5,2,2,4],[2,3,7,7],[],[0,0,4,3],[6,6,6,0],[1,1,1,3]],"shortest":20,"solution":[{"from":7,"to":3},{"from":9,"to":3},{"from":2,"to":3},{"from":5,"to":6},{"from":5,"to":6},{"from":5,"to":3},{"from":1,"to":6},{"from":1,"to":6},{"from":2,"to":5},{"from":2,"to":9},{"from":7,"to":2},{"from":8,"to":7},{"from":0,"to":8},{"from":0,"to":7},{"from":4,"to":2},{"from":1,"to":2},{"from":1,"to":0},{"from":4,"to":5},{"from":4,"to":5},{"from":4,"to":0}],"reverse":[{"from":5,"to":9},{"from":5,"to":8},{"from":2,"to":8},{"from":2,"to":8},{"from":0,"to":5},{"from":4,"to":9},{"from":6,"to":5},{"from":0,"to":6},{"from":4,"to":0},{"from":4,"to":8},{"from":1,"to":4},{"from":2,"to":4},{"from":3,"to":0},{"from":3,"to":4},{"from":3,"to":1},{"from":3,"to":2},{"from":7,"to":9},{"from":7,"to":3},{"from":3,"to":2},{"from":7,"to":9},{"from":7,"to":3},{"from":9,"to":3},{"from":3,"to":7},{"from":7,"to":9},{"from":3,"to":2}],"order":[5,9,4,3,8,2,7,0,6,1]},{"id":46,"seed":501283,"capacity":4,"board":[[0,0,0,4],[],[3,3,4,1],[1,2,5,5],[7,7,4,1],[],[6,2,5,5],[4,0,7,2],[3,1,3,7],[6,6,6,2]],"shortest":21,"solution":[{"from":9,"to":5},{"from":7,"to":5},{"from":3,"to":1},{"from":3,"to":1},{"from":3,"to":5},{"from":6,"to":1},{"from":6,"to":1},{"from":6,"to":5},{"from":6,"to":9},{"from":2,"to":3},{"from":4,"to":3},{"from":0,"to":6},{"from":2,"to":6},{"from":4,"to":6},{"from":7,"to":4},{"from":7,"to":0},{"from":7,"to":6},{"from":8,"to":4},{"from":8,"to":2},{"from":8,"to":3},{"from":8,"to":2}],"reverse":[{"from":0,"to":9},{"from":4,"to":0},{"from":4,"to":8},{"from":9,"to":8},{"from":3,"to":9},{"from":1,"to":9},{"from":3,"to":9},{"from":7,"to":9},{"from":7,"to":8},{"from":4,"to":7},{"from":4,"to":3},{"from":1,"to":3},{"from":2,"to":8},{"from":6,"to":4},{"from":6,"to":4},{"from":1,"to":7},{"from":2,"to":1},{"from":2,"to":1},{"from":2,"to":1},{"from":4,"to":6},{"from":1,"to":4},{"from":1,"to":2},{"from":2,"to":6},{"from":5,"to":2},{"from":5,"to":1},{"from":5,"to":1},{"from":1,"to":4},{"from":5,"to":1},{"from":2,"to":5},{"from":1,"to":4},{"from":4,"to":5},{"from":5,"to":2},{"from":5,"to":4},{"from":4,"to":1},{"from":2,"to":5},{"from":1,"to":5},{"from":5,"to":4},{"from":4,"to":1},{"from":1,"to":5},{"from":5,"to":4},{"from":5,"to":2},{"from":4,"to":2},{"from":2,"to":5},{"from":5,"to":1},{"from":1,"to":4},{"from":4,"to":5},{"from":2,"to":1},{"from":1,"to":4},{"from":5,"to":1}],"order":[0,5,3,1,7,2,4,8,9,6]},{"id":47,"seed":509202,"capacity":4,"board":[[3,3,3,7],[1,6,0,5],[7,7,7,6],[5,4,5,2],[6,0,2,2],[3,1,6,0],[1,1,5,2],[4,4,4,0],[],[]],"shortest":20,"solution":[{"from":6,"to":8},{"from":3,"to":8},{"from":3,"to":6},{"from":4,"to":8},{"from":4,"to":8},{"from":7,"to":9},{"from":3,"to":7},{"from":4,"to":9},{"from":5,"to":9},{"from":2,"to":4},{"from":0,"to":2},{"from":5,"to":4},{"from":1,"to":3},{"from":1,"to":9},{"from":1,"to":4},{"from":6,"to":3},{"from":6,"to":3},{"from":5,"to":6},{"from":5,"to":0},{"from":1,"to":6}],"reverse":[{"from":3,"to":8},{"from":7,"to":3},{"from":1,"to":8},{"from":1,"to":9},{"from":6,"to":8},{"from":0,"to":8},{"from":6,"to":9},{"from":5,"to":1},{"from":0,"to":9},{"from":6,"to":7},{"from":5,"to":1},{"from":5,"to":9},{"from":4,"to":5},{"from":1,"to":5},{"from":0,"to":4},{"from":0,"to":6},{"from":2,"to":6},{"from":2,"to":1},{"from":2,"to":0},{"from":2,"to":5},{"from":0,"to":6}],"order":[3,9,7,5,6,8,1,4,0,2]},{"id":48,"seed":517121,"capacity":4,"board":[[],[0,0,0,2],[6,6,6,1],[1,1,4,5],[],[2,5,2,3],[3,7,7,7],[6,2,5,3],[1,5,7,3],[4,4,4,0]],"shortest":20,"solution":[{"from":3,"to":0},{"from":6,"to":4},{"from":6,"to":4},{"from":6,"to":4},{"from":5,"to":6},{"from":8,"to":6},{"from":8,"to":4},{"from":7,"to":6},{"from":8,"to":0},{"from":7,"to":0},{"from":5,"to":7},{"from":5,"to":0},{"from":1,"to":5},{"from":9,"to":1},{"from":3,"to":9},{"from":2,"to":3},{"from":8,"to":3},{"from":7,"to":5},{"from":7,"to":5},{"from":7,"to":2}],"reverse":[{"from":6,"to":9},{"from":1,"to":8},{"from":1,"to":6},{"from":2,"to":9},{"from":4,"to":1},{"from":5,"to":8},{"from":5,"to":1},{"from":0,"to":4},{"from":2,"to":9},{"from":2,"to":0},{"from":5,"to":2},{"from":9,"to":2},{"from":5,"to":9},{"from":7,"to":5},{"from":3,"to":9},{"from":3,"to":2},{"from":7,"to":8},{"from":3,"to":8},{"from":7,"to":5},{"from":7,"to":3},{"from":5,"to":7},{"from":5,"to":7},{"from":7,"to":3},{"from":7,"to":3}],"order":[5,0,6,1,7,2,3,9,8,4]},{"id":49,"seed":525040,"capacity":4,"board":[[2,1,5,7],[3,3,5,1],[1,7,7,7],[0,3,2,5],[0,0,0,4],[],[6,6,6,5],[4,4,3,6],[],[4,2,1,2]],"shortest":20,"solution":[{"from":0,"to":8},{"from":2,"to":8},{"from":2,"to":8},{"from":2,"to":8},{"from":1,"to":2},{"from":0,"to":5},{"from":0,"to":2},{"from":1,"to":5},{"from":6,"to":5},{"from":7,"to":6},{"from":3,"to":5},{"from":7,"to":1},{"from":4,"to":7},{"from":9,"to":0},{"from":9,"to":2},{"from":9,"to":0},{"from":9,"to":7},{"from":3,"to":0},{"from":3,"to":1},{"from":3,"to":4}],"reverse":[{"from":4,"to":8},{"from":0,"to":9},{"from":4,"to":0},{"from":3,"to":9},{"from":3,"to":4},{"from":2,"to":8},{"from":5,"to":3},{"from":6,"to":4},{"from":1,"to":3},{"from":1,"to":8},{"from":5,"to":6},{"from":2,"to":9},{"from":2,"to":8},{"from":5,"to":9},{"from":1,"to":2},{"from":5,"to":2},{"from":7,"to":5},{"from":5,"to":1},{"from":7,"to":2},{"from":7,"to":5},{"from":7,"to":5},{"from":5,"to":1},{"from":5,"to":7},{"from":1,"to":5},{"from":7,"to":1},{"from":1,"to":5},{"from":5,"to":7},{"from":7,"to":1},{"from":5,"to":7},{"from":7,"to":1}],"order":[2,3,1,9,0,7,6,4,5,8]},{"id":50,"seed":532959,"capacity":4,"board":[[1,1,1,6],[4,4,4,6],[],[0,0,0,5],[1,2,2,3],[6,5,3,5],[4,2,5,3],[7,7,7,2],[],[0,7,6,3]],"shortest":20,"solution":[{"from":3,"to":8},{"from":5,"to":8},{"from":6,"to":2},{"from":6,"to":8},{"from":7,"to":6},{"from":5,"to":2},{"from":5,"to":8},{"from":9,"to":2},{"from":4,"to":2},{"from":0,"to":5},{"from":1,"to":5},{"from":9,"to":5},{"from":9,"to":7},{"from":9,"to":3},{"from":6,"to":9},{"from":6,"to":9},{"from":6,"to":1},{"from":4,"to":9},{"from":4,"to":9},{"from":4,"to":0}],"reverse":[{"from":1,"to":9},{"from":0,"to":8},{"from":7,"to":8},{"from":6,"to":1},{"from":2,"to":9},{"from":2,"to":7},{"from":2,"to":9},{"from":2,"to":9},{"from":4,"to":2},{"from":6,"to":4},{"from":6,"to":8},{"from":3,"to":8},{"from":5,"to":6},{"from":3,"to":6},{"from":9,"to":2},{"from":5,"to":6},{"from":5,"to":0},{"from":5,"to":2},{"from":3,"to":9},{"from":3,"to":5},{"from":5,"to":2}],"order":[1,4,5,0,9,6,2,7,3,8]}]'),In=El;function Lr(i,t,e,n={top:0,right:0,bottom:0,left:0}){const r=i>=700,o=r&&i>t,s=r?32:16,a={x:n.left+s,y:n.top+12,width:i-n.left-n.right-s*2,height:t-n.top-n.bottom-24},l=r?64:56,c={x:a.x,y:a.y,width:l,height:l},f={...c,x:a.x+a.width-l},d=l*4+(r?20:16)*3,h=a.x+(a.width-d)/2,m=a.y+a.height-l-10,g=[c,f,...Array.from({length:4},(M,P)=>({x:h+P*(l+(r?20:16)),y:m,width:l,height:l}))],v=o?e<=5?e:Math.ceil(e/2):r?Math.min(4,e):e<=3||e<=6?3:e<=8?4:5,p=Math.ceil(e/v),u=a.y+(r?154:136),T=m-34,E=r?30:8,A=r?30:14,C=Math.min(r?160:104,(a.width-E*(v-1))/v),y=Math.min(r?330:236,(T-u-A*(p-1))/p),L=p*y+(p-1)*A,F=u+(T-u-L)/2,S=Array.from({length:e},(M,P)=>{const N=Math.floor(P/v),V=Math.min(v,e-N*v);return{x:a.x+(a.width-V*C-(V-1)*E)/2+P%v*(C+E),y:F+N*(y+A),width:C,height:y}});return{safe:a,hud:g,slots:S,columns:v,rows:p,tablet:r,artScale:Math.min(C/1.42,(y-22)/4.65,r?72:54)}}const Wi=[{name:"Strawberry",color:"#ed8fa8",ink:"#bb446c",pattern:"hearts"},{name:"Chocolate",color:"#a56d53",ink:"#55372c",pattern:"chips"},{name:"Vanilla",color:"#ffe9b9",ink:"#fff9e3",pattern:"ribbon"},{name:"Mint",color:"#8fd7b6",ink:"#3c9a7b",pattern:"stripes"},{name:"Blueberry",color:"#85b8ea",ink:"#3c6eaf",pattern:"dots"},{name:"Mango",color:"#ffc06b",ink:"#bd792f",pattern:"leaves"},{name:"Grape",color:"#b59bdb",ink:"#7955ac",pattern:"spiral"},{name:"Cookies & Cream",color:"#f5f2e7",ink:"#51443e",pattern:"cookies"}];const ls="181",Tl=0,Ls=1,Al=2,Ia=1,wl=2,xn=3,On=0,Ne=1,gn=2,Sn=0,xi=1,Ds=2,Us=3,Is=4,Rl=5,Yn=100,Cl=101,Pl=102,Ll=103,Dl=104,Ul=200,Il=201,Nl=202,Fl=203,xo=204,go=205,Ol=206,Bl=207,zl=208,Vl=209,Gl=210,Hl=211,kl=212,Wl=213,Xl=214,_o=0,vo=1,Mo=2,_i=3,So=4,bo=5,yo=6,Eo=7,Na=0,ql=1,Yl=2,Nn=0,$l=1,Kl=2,Zl=3,Fa=4,jl=5,Jl=6,Ql=7,Oa=300,vi=301,Mi=302,To=303,Ao=304,Dr=306,Er=1e3,vn=1001,wo=1002,Ge=1003,tc=1004,Qi=1005,qe=1006,Br=1007,Kn=1008,ln=1009,Ba=1010,za=1011,Fi=1012,cs=1013,Zn=1014,Mn=1015,yi=1016,fs=1017,us=1018,Oi=1020,Va=35902,Ga=35899,Ha=1021,ka=1022,en=1023,Bi=1026,zi=1027,Wa=1028,ds=1029,hs=1030,ms=1031,ps=1033,vr=33776,Mr=33777,Sr=33778,br=33779,Ro=35840,Co=35841,Po=35842,Lo=35843,Do=36196,Uo=37492,Io=37496,No=37808,Fo=37809,Oo=37810,Bo=37811,zo=37812,Vo=37813,Go=37814,Ho=37815,ko=37816,Wo=37817,Xo=37818,qo=37819,Yo=37820,$o=37821,Ko=36492,Zo=36494,jo=36495,Jo=36283,Qo=36284,ts=36285,es=36286,ec=3200,nc=3201,Xa=0,ic=1,Dn="",Ie="srgb",Si="srgb-linear",Tr="linear",Zt="srgb",Qn=7680,Ns=519,rc=512,oc=513,sc=514,qa=515,ac=516,lc=517,cc=518,fc=519,Fs=35044,Os="300 es",an=2e3,Ar=2001;function Ya(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function uc(){const i=wr("canvas");return i.style.display="block",i}const Bs={};function zs(...i){const t="THREE."+i.shift();console.log(t,...i)}function Dt(...i){const t="THREE."+i.shift();console.warn(t,...i)}function fe(...i){const t="THREE."+i.shift();console.error(t,...i)}function Vi(...i){const t=i.join(" ");t in Bs||(Bs[t]=!0,Dt(...i))}function dc(i,t,e){return new Promise(function(n,r){function o(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}class Ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const o=r.indexOf(e);o!==-1&&r.splice(o,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zr=Math.PI/180,ns=180/Math.PI;function Xi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function hc(i,t){return(i%t+t)%t}function Vr(i,t,e){return(1-e)*i+e*t}function wi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class qt{constructor(t=0,e=0){qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),o=this.x-t.x,s=this.y-t.y;return this.x=o*n-s*r+t.x,this.y=o*r+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qi{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,o,s,a){let l=n[r+0],c=n[r+1],f=n[r+2],d=n[r+3],h=o[s+0],m=o[s+1],g=o[s+2],v=o[s+3];if(a<=0){t[e+0]=l,t[e+1]=c,t[e+2]=f,t[e+3]=d;return}if(a>=1){t[e+0]=h,t[e+1]=m,t[e+2]=g,t[e+3]=v;return}if(d!==v||l!==h||c!==m||f!==g){let p=l*h+c*m+f*g+d*v;p<0&&(h=-h,m=-m,g=-g,v=-v,p=-p);let u=1-a;if(p<.9995){const T=Math.acos(p),E=Math.sin(T);u=Math.sin(u*T)/E,a=Math.sin(a*T)/E,l=l*u+h*a,c=c*u+m*a,f=f*u+g*a,d=d*u+v*a}else{l=l*u+h*a,c=c*u+m*a,f=f*u+g*a,d=d*u+v*a;const T=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=T,c*=T,f*=T,d*=T}}t[e]=l,t[e+1]=c,t[e+2]=f,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,r,o,s){const a=n[r],l=n[r+1],c=n[r+2],f=n[r+3],d=o[s],h=o[s+1],m=o[s+2],g=o[s+3];return t[e]=a*g+f*d+l*m-c*h,t[e+1]=l*g+f*h+c*d-a*m,t[e+2]=c*g+f*m+a*h-l*d,t[e+3]=f*g-a*d-l*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,o=t._z,s=t._order,a=Math.cos,l=Math.sin,c=a(n/2),f=a(r/2),d=a(o/2),h=l(n/2),m=l(r/2),g=l(o/2);switch(s){case"XYZ":this._x=h*f*d+c*m*g,this._y=c*m*d-h*f*g,this._z=c*f*g+h*m*d,this._w=c*f*d-h*m*g;break;case"YXZ":this._x=h*f*d+c*m*g,this._y=c*m*d-h*f*g,this._z=c*f*g-h*m*d,this._w=c*f*d+h*m*g;break;case"ZXY":this._x=h*f*d-c*m*g,this._y=c*m*d+h*f*g,this._z=c*f*g+h*m*d,this._w=c*f*d-h*m*g;break;case"ZYX":this._x=h*f*d-c*m*g,this._y=c*m*d+h*f*g,this._z=c*f*g-h*m*d,this._w=c*f*d+h*m*g;break;case"YZX":this._x=h*f*d+c*m*g,this._y=c*m*d+h*f*g,this._z=c*f*g-h*m*d,this._w=c*f*d-h*m*g;break;case"XZY":this._x=h*f*d-c*m*g,this._y=c*m*d-h*f*g,this._z=c*f*g+h*m*d,this._w=c*f*d+h*m*g;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],o=e[8],s=e[1],a=e[5],l=e[9],c=e[2],f=e[6],d=e[10],h=n+a+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-l)*m,this._y=(o-c)*m,this._z=(s-r)*m}else if(n>a&&n>d){const m=2*Math.sqrt(1+n-a-d);this._w=(f-l)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(o+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-n-d);this._w=(o-c)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+d-n-a);this._w=(s-r)/m,this._x=(o+c)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,o=t._z,s=t._w,a=e._x,l=e._y,c=e._z,f=e._w;return this._x=n*f+s*a+r*c-o*l,this._y=r*f+s*l+o*a-n*c,this._z=o*f+s*c+n*l-r*a,this._w=s*f-n*a-r*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,r=t._y,o=t._z,s=t._w,a=this.dot(t);a<0&&(n=-n,r=-r,o=-o,s=-s,a=-a);let l=1-e;if(a<.9995){const c=Math.acos(a),f=Math.sin(c);l=Math.sin(l*c)/f,e=Math.sin(e*c)/f,this._x=this._x*l+n*e,this._y=this._y*l+r*e,this._z=this._z*l+o*e,this._w=this._w*l+s*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+r*e,this._z=this._z*l+o*e,this._w=this._w*l+s*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vs.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vs.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*r,this.y=o[1]*e+o[4]*n+o[7]*r,this.z=o[2]*e+o[5]*n+o[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,o=t.elements,s=1/(o[3]*e+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*r+o[12])*s,this.y=(o[1]*e+o[5]*n+o[9]*r+o[13])*s,this.z=(o[2]*e+o[6]*n+o[10]*r+o[14])*s,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,o=t.x,s=t.y,a=t.z,l=t.w,c=2*(s*r-a*n),f=2*(a*e-o*r),d=2*(o*n-s*e);return this.x=e+l*c+s*d-a*f,this.y=n+l*f+a*c-o*d,this.z=r+l*d+o*f-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r,this.y=o[1]*e+o[5]*n+o[9]*r,this.z=o[2]*e+o[6]*n+o[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,o=t.z,s=e.x,a=e.y,l=e.z;return this.x=r*l-o*a,this.y=o*s-n*l,this.z=n*a-r*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Gr.copy(this).projectOnVector(t),this.sub(Gr)}reflect(t){return this.sub(Gr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gr=new O,Vs=new qi;class Ut{constructor(t,e,n,r,o,s,a,l,c){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,o,s,a,l,c)}set(t,e,n,r,o,s,a,l,c){const f=this.elements;return f[0]=t,f[1]=r,f[2]=a,f[3]=e,f[4]=o,f[5]=l,f[6]=n,f[7]=s,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,o=this.elements,s=n[0],a=n[3],l=n[6],c=n[1],f=n[4],d=n[7],h=n[2],m=n[5],g=n[8],v=r[0],p=r[3],u=r[6],T=r[1],E=r[4],A=r[7],C=r[2],y=r[5],L=r[8];return o[0]=s*v+a*T+l*C,o[3]=s*p+a*E+l*y,o[6]=s*u+a*A+l*L,o[1]=c*v+f*T+d*C,o[4]=c*p+f*E+d*y,o[7]=c*u+f*A+d*L,o[2]=h*v+m*T+g*C,o[5]=h*p+m*E+g*y,o[8]=h*u+m*A+g*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],f=t[8];return e*s*f-e*a*c-n*o*f+n*a*l+r*o*c-r*s*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],f=t[8],d=f*s-a*c,h=a*l-f*o,m=c*o-s*l,g=e*d+n*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(r*c-f*n)*v,t[2]=(a*n-r*s)*v,t[3]=h*v,t[4]=(f*e-r*l)*v,t[5]=(r*o-a*e)*v,t[6]=m*v,t[7]=(n*l-c*e)*v,t[8]=(s*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,o,s,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*s+c*a)+s+t,-r*c,r*l,-r*(-c*s+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Hr.makeScale(t,e)),this}rotate(t){return this.premultiply(Hr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Hr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Hr=new Ut,Gs=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hs=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mc(){const i={enabled:!0,workingColorSpace:Si,spaces:{},convert:function(r,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===Zt&&(r.r=bn(r.r),r.g=bn(r.g),r.b=bn(r.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[o].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Zt&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b))),r},workingToColorSpace:function(r,o){return this.convert(r,this.workingColorSpace,o)},colorSpaceToWorking:function(r,o){return this.convert(r,o,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Dn?Tr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,o=this.workingColorSpace){return r.fromArray(this.spaces[o].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,o,s){return r.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,o){return Vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,o)},toWorkingColorSpace:function(r,o){return Vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,o)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Si]:{primaries:t,whitePoint:n,transfer:Tr,toXYZ:Gs,fromXYZ:Hs,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:Zt,toXYZ:Gs,fromXYZ:Hs,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}const Wt=mc();function bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ti;class pc{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ti===void 0&&(ti=wr("canvas")),ti.width=t.width,ti.height=t.height;const r=ti.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=ti}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=bn(o[s]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bn(e[n]/255)*255):e[n]=bn(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xc=0;class xs{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xc++}),this.uuid=Xi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(kr(r[s].image)):o.push(kr(r[s]))}else o=kr(r);n.url=o}return e||(t.images[this.uuid]=n),n}}function kr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let gc=0;const Wr=new O;class Ee extends Ei{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=vn,r=vn,o=qe,s=Kn,a=en,l=ln,c=Ee.DEFAULT_ANISOTROPY,f=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gc++}),this.uuid=Xi(),this.name="",this.source=new xs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Wr).x}get height(){return this.source.getSize(Wr).y}get depth(){return this.source.getSize(Wr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Oa)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Er:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case wo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Er:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case wo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=Oa;Ee.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,r=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,o=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r+s[12]*o,this.y=s[1]*e+s[5]*n+s[9]*r+s[13]*o,this.z=s[2]*e+s[6]*n+s[10]*r+s[14]*o,this.w=s[3]*e+s[7]*n+s[11]*r+s[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,o;const l=t.elements,c=l[0],f=l[4],d=l[8],h=l[1],m=l[5],g=l[9],v=l[2],p=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,A=(m+1)/2,C=(u+1)/2,y=(f+h)/4,L=(d+v)/4,F=(g+p)/4;return E>A&&E>C?E<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(E),r=y/n,o=L/n):A>C?A<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(A),n=y/r,o=F/r):C<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(C),n=L/o,r=F/o),this.set(n,r,o,e),this}let T=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(h-f)*(h-f));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(d-v)/T,this.z=(h-f)/T,this.w=Math.acos((c+m+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _c extends Ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const r={width:t,height:e,depth:n.depth},o=new Ee(r);this.textures=[];const s=n.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new xs(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jn extends _c{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class $a extends Ee{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vc extends Ee{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)t.isMesh===!0?t.getVertexPosition(s,Ke):Ke.fromBufferAttribute(o,s),Ke.applyMatrix4(t.matrixWorld),this.expandByPoint(Ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const r=t.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ke),Ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ri),er.subVectors(this.max,Ri),ei.subVectors(t.a,Ri),ni.subVectors(t.b,Ri),ii.subVectors(t.c,Ri),An.subVectors(ni,ei),wn.subVectors(ii,ni),Vn.subVectors(ei,ii);let e=[0,-An.z,An.y,0,-wn.z,wn.y,0,-Vn.z,Vn.y,An.z,0,-An.x,wn.z,0,-wn.x,Vn.z,0,-Vn.x,-An.y,An.x,0,-wn.y,wn.x,0,-Vn.y,Vn.x,0];return!Xr(e,ei,ni,ii,er)||(e=[1,0,0,0,1,0,0,0,1],!Xr(e,ei,ni,ii,er))?!1:(nr.crossVectors(An,wn),e=[nr.x,nr.y,nr.z],Xr(e,ei,ni,ii,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const fn=[new O,new O,new O,new O,new O,new O,new O,new O],Ke=new O,tr=new Yi,ei=new O,ni=new O,ii=new O,An=new O,wn=new O,Vn=new O,Ri=new O,er=new O,nr=new O,Gn=new O;function Xr(i,t,e,n,r){for(let o=0,s=i.length-3;o<=s;o+=3){Gn.fromArray(i,o);const a=r.x*Math.abs(Gn.x)+r.y*Math.abs(Gn.y)+r.z*Math.abs(Gn.z),l=t.dot(Gn),c=e.dot(Gn),f=n.dot(Gn);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}const Mc=new Yi,Ci=new O,qr=new O;class gs{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Mc.setFromPoints(t).getCenter(n);let r=0;for(let o=0,s=t.length;o<s;o++)r=Math.max(r,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ci.subVectors(t,this.center);const e=Ci.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Ci,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ci.copy(t.center).add(qr)),this.expandByPoint(Ci.copy(t.center).sub(qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const un=new O,Yr=new O,ir=new O,Rn=new O,$r=new O,rr=new O,Kr=new O;class Sc{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(un.copy(this.origin).addScaledVector(this.direction,e),un.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Yr.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),Rn.copy(this.origin).sub(Yr);const o=t.distanceTo(e)*.5,s=-this.direction.dot(ir),a=Rn.dot(this.direction),l=-Rn.dot(ir),c=Rn.lengthSq(),f=Math.abs(1-s*s);let d,h,m,g;if(f>0)if(d=s*l-a,h=s*a-l,g=o*f,d>=0)if(h>=-g)if(h<=g){const v=1/f;d*=v,h*=v,m=d*(d+s*h+2*a)+h*(s*d+h+2*l)+c}else h=o,d=Math.max(0,-(s*h+a)),m=-d*d+h*(h+2*l)+c;else h=-o,d=Math.max(0,-(s*h+a)),m=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-s*o+a)),h=d>0?-o:Math.min(Math.max(-o,-l),o),m=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-o,-l),o),m=h*(h+2*l)+c):(d=Math.max(0,-(s*o+a)),h=d>0?o:Math.min(Math.max(-o,-l),o),m=-d*d+h*(h+2*l)+c);else h=s>0?-o:o,d=Math.max(0,-(s*h+a)),m=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Yr).addScaledVector(ir,h),m}intersectSphere(t,e){un.subVectors(t.center,this.origin);const n=un.dot(this.direction),r=un.dot(un)-n*n,o=t.radius*t.radius;if(r>o)return null;const s=Math.sqrt(o-r),a=n-s,l=n+s;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,o,s,a,l;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),f>=0?(o=(t.min.y-h.y)*f,s=(t.max.y-h.y)*f):(o=(t.max.y-h.y)*f,s=(t.min.y-h.y)*f),n>s||o>r||((o>n||isNaN(n))&&(n=o),(s<r||isNaN(r))&&(r=s),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,un)!==null}intersectTriangle(t,e,n,r,o){$r.subVectors(e,t),rr.subVectors(n,t),Kr.crossVectors($r,rr);let s=this.direction.dot(Kr),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Rn.subVectors(this.origin,t);const l=a*this.direction.dot(rr.crossVectors(Rn,rr));if(l<0)return null;const c=a*this.direction.dot($r.cross(Rn));if(c<0||l+c>s)return null;const f=-a*Rn.dot(Kr);return f<0?null:this.at(f/s,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,n,r,o,s,a,l,c,f,d,h,m,g,v,p){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,o,s,a,l,c,f,d,h,m,g,v,p)}set(t,e,n,r,o,s,a,l,c,f,d,h,m,g,v,p){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=r,u[1]=o,u[5]=s,u[9]=a,u[13]=l,u[2]=c,u[6]=f,u[10]=d,u[14]=h,u[3]=m,u[7]=g,u[11]=v,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/ri.setFromMatrixColumn(t,0).length(),o=1/ri.setFromMatrixColumn(t,1).length(),s=1/ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,o=t.z,s=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),f=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const h=s*f,m=s*d,g=a*f,v=a*d;e[0]=l*f,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=h-v*c,e[9]=-a*l,e[2]=v-h*c,e[6]=g+m*c,e[10]=s*l}else if(t.order==="YXZ"){const h=l*f,m=l*d,g=c*f,v=c*d;e[0]=h+v*a,e[4]=g*a-m,e[8]=s*c,e[1]=s*d,e[5]=s*f,e[9]=-a,e[2]=m*a-g,e[6]=v+h*a,e[10]=s*l}else if(t.order==="ZXY"){const h=l*f,m=l*d,g=c*f,v=c*d;e[0]=h-v*a,e[4]=-s*d,e[8]=g+m*a,e[1]=m+g*a,e[5]=s*f,e[9]=v-h*a,e[2]=-s*c,e[6]=a,e[10]=s*l}else if(t.order==="ZYX"){const h=s*f,m=s*d,g=a*f,v=a*d;e[0]=l*f,e[4]=g*c-m,e[8]=h*c+v,e[1]=l*d,e[5]=v*c+h,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=s*l}else if(t.order==="YZX"){const h=s*l,m=s*c,g=a*l,v=a*c;e[0]=l*f,e[4]=v-h*d,e[8]=g*d+m,e[1]=d,e[5]=s*f,e[9]=-a*f,e[2]=-c*f,e[6]=m*d+g,e[10]=h-v*d}else if(t.order==="XZY"){const h=s*l,m=s*c,g=a*l,v=a*c;e[0]=l*f,e[4]=-d,e[8]=c*f,e[1]=h*d+v,e[5]=s*f,e[9]=m*d-g,e[2]=g*d-m,e[6]=a*f,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bc,t,yc)}lookAt(t,e,n){const r=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),Cn.crossVectors(n,Be),Cn.lengthSq()===0&&(Math.abs(n.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),Cn.crossVectors(n,Be)),Cn.normalize(),or.crossVectors(Be,Cn),r[0]=Cn.x,r[4]=or.x,r[8]=Be.x,r[1]=Cn.y,r[5]=or.y,r[9]=Be.y,r[2]=Cn.z,r[6]=or.z,r[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,o=this.elements,s=n[0],a=n[4],l=n[8],c=n[12],f=n[1],d=n[5],h=n[9],m=n[13],g=n[2],v=n[6],p=n[10],u=n[14],T=n[3],E=n[7],A=n[11],C=n[15],y=r[0],L=r[4],F=r[8],S=r[12],M=r[1],P=r[5],N=r[9],V=r[13],H=r[2],q=r[6],W=r[10],nt=r[14],k=r[3],et=r[7],ot=r[11],St=r[15];return o[0]=s*y+a*M+l*H+c*k,o[4]=s*L+a*P+l*q+c*et,o[8]=s*F+a*N+l*W+c*ot,o[12]=s*S+a*V+l*nt+c*St,o[1]=f*y+d*M+h*H+m*k,o[5]=f*L+d*P+h*q+m*et,o[9]=f*F+d*N+h*W+m*ot,o[13]=f*S+d*V+h*nt+m*St,o[2]=g*y+v*M+p*H+u*k,o[6]=g*L+v*P+p*q+u*et,o[10]=g*F+v*N+p*W+u*ot,o[14]=g*S+v*V+p*nt+u*St,o[3]=T*y+E*M+A*H+C*k,o[7]=T*L+E*P+A*q+C*et,o[11]=T*F+E*N+A*W+C*ot,o[15]=T*S+E*V+A*nt+C*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],o=t[12],s=t[1],a=t[5],l=t[9],c=t[13],f=t[2],d=t[6],h=t[10],m=t[14],g=t[3],v=t[7],p=t[11],u=t[15];return g*(+o*l*d-r*c*d-o*a*h+n*c*h+r*a*m-n*l*m)+v*(+e*l*m-e*c*h+o*s*h-r*s*m+r*c*f-o*l*f)+p*(+e*c*d-e*a*m-o*s*d+n*s*m+o*a*f-n*c*f)+u*(-r*a*f-e*l*d+e*a*h+r*s*d-n*s*h+n*l*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],f=t[8],d=t[9],h=t[10],m=t[11],g=t[12],v=t[13],p=t[14],u=t[15],T=d*p*c-v*h*c+v*l*m-a*p*m-d*l*u+a*h*u,E=g*h*c-f*p*c-g*l*m+s*p*m+f*l*u-s*h*u,A=f*v*c-g*d*c+g*a*m-s*v*m-f*a*u+s*d*u,C=g*d*l-f*v*l-g*a*h+s*v*h+f*a*p-s*d*p,y=e*T+n*E+r*A+o*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/y;return t[0]=T*L,t[1]=(v*h*o-d*p*o-v*r*m+n*p*m+d*r*u-n*h*u)*L,t[2]=(a*p*o-v*l*o+v*r*c-n*p*c-a*r*u+n*l*u)*L,t[3]=(d*l*o-a*h*o-d*r*c+n*h*c+a*r*m-n*l*m)*L,t[4]=E*L,t[5]=(f*p*o-g*h*o+g*r*m-e*p*m-f*r*u+e*h*u)*L,t[6]=(g*l*o-s*p*o-g*r*c+e*p*c+s*r*u-e*l*u)*L,t[7]=(s*h*o-f*l*o+f*r*c-e*h*c-s*r*m+e*l*m)*L,t[8]=A*L,t[9]=(g*d*o-f*v*o-g*n*m+e*v*m+f*n*u-e*d*u)*L,t[10]=(s*v*o-g*a*o+g*n*c-e*v*c-s*n*u+e*a*u)*L,t[11]=(f*a*o-s*d*o-f*n*c+e*d*c+s*n*m-e*a*m)*L,t[12]=C*L,t[13]=(f*v*r-g*d*r+g*n*h-e*v*h-f*n*p+e*d*p)*L,t[14]=(g*a*r-s*v*r-g*n*l+e*v*l+s*n*p-e*a*p)*L,t[15]=(s*d*r-f*a*r+f*n*l-e*d*l-s*n*h+e*a*h)*L,this}scale(t){const e=this.elements,n=t.x,r=t.y,o=t.z;return e[0]*=n,e[4]*=r,e[8]*=o,e[1]*=n,e[5]*=r,e[9]*=o,e[2]*=n,e[6]*=r,e[10]*=o,e[3]*=n,e[7]*=r,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),o=1-n,s=t.x,a=t.y,l=t.z,c=o*s,f=o*a;return this.set(c*s+n,c*a-r*l,c*l+r*a,0,c*a+r*l,f*a+n,f*l-r*s,0,c*l-r*a,f*l+r*s,o*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,o,s){return this.set(1,n,o,0,t,1,s,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,o=e._x,s=e._y,a=e._z,l=e._w,c=o+o,f=s+s,d=a+a,h=o*c,m=o*f,g=o*d,v=s*f,p=s*d,u=a*d,T=l*c,E=l*f,A=l*d,C=n.x,y=n.y,L=n.z;return r[0]=(1-(v+u))*C,r[1]=(m+A)*C,r[2]=(g-E)*C,r[3]=0,r[4]=(m-A)*y,r[5]=(1-(h+u))*y,r[6]=(p+T)*y,r[7]=0,r[8]=(g+E)*L,r[9]=(p-T)*L,r[10]=(1-(h+v))*L,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let o=ri.set(r[0],r[1],r[2]).length();const s=ri.set(r[4],r[5],r[6]).length(),a=ri.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),t.x=r[12],t.y=r[13],t.z=r[14],Ze.copy(this);const c=1/o,f=1/s,d=1/a;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=f,Ze.elements[5]*=f,Ze.elements[6]*=f,Ze.elements[8]*=d,Ze.elements[9]*=d,Ze.elements[10]*=d,e.setFromRotationMatrix(Ze),n.x=o,n.y=s,n.z=a,this}makePerspective(t,e,n,r,o,s,a=an,l=!1){const c=this.elements,f=2*o/(e-t),d=2*o/(n-r),h=(e+t)/(e-t),m=(n+r)/(n-r);let g,v;if(l)g=o/(s-o),v=s*o/(s-o);else if(a===an)g=-(s+o)/(s-o),v=-2*s*o/(s-o);else if(a===Ar)g=-s/(s-o),v=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,r,o,s,a=an,l=!1){const c=this.elements,f=2/(e-t),d=2/(n-r),h=-(e+t)/(e-t),m=-(n+r)/(n-r);let g,v;if(l)g=1/(s-o),v=s/(s-o);else if(a===an)g=-2/(s-o),v=-(s+o)/(s-o);else if(a===Ar)g=-1/(s-o),v=-o/(s-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ri=new O,Ze=new ue,bc=new O(0,0,0),yc=new O(1,1,1),Cn=new O,or=new O,Be=new O,ks=new ue,Ws=new qi;class cn{constructor(t=0,e=0,n=0,r=cn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,o=r[0],s=r[4],a=r[8],l=r[1],c=r[5],f=r[9],d=r[2],h=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Gt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ks.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ks,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ws.setFromEuler(this),this.setFromQuaternion(Ws,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cn.DEFAULT_ORDER="XYZ";class Ka{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ec=0;const Xs=new O,oi=new qi,dn=new ue,sr=new O,Pi=new O,Tc=new O,Ac=new qi,qs=new O(1,0,0),Ys=new O(0,1,0),$s=new O(0,0,1),Ks={type:"added"},wc={type:"removed"},si={type:"childadded",child:null},Zr={type:"childremoved",child:null};class ve extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ec++}),this.uuid=Xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new O,e=new cn,n=new qi,r=new O(1,1,1);function o(){n.setFromEuler(e,!1)}function s(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ue},normalMatrix:{value:new Ut}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.multiply(oi),this}rotateOnWorldAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.premultiply(oi),this}rotateX(t){return this.rotateOnAxis(qs,t)}rotateY(t){return this.rotateOnAxis(Ys,t)}rotateZ(t){return this.rotateOnAxis($s,t)}translateOnAxis(t,e){return Xs.copy(t).applyQuaternion(this.quaternion),this.position.add(Xs.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qs,t)}translateY(t){return this.translateOnAxis(Ys,t)}translateZ(t){return this.translateOnAxis($s,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?sr.copy(t):sr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Pi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Pi,sr,this.up):dn.lookAt(sr,Pi,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),oi.setFromRotationMatrix(dn),this.quaternion.premultiply(oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ks),si.child=t,this.dispatchEvent(si),si.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wc),Zr.child=t,this.dispatchEvent(Zr),Zr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ks),si.child=t,this.dispatchEvent(si),si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,t,Tc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,Ac,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));r.material=a}else r.material=o(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(o(t.animations,l))}}if(e){const a=s(t.geometries),l=s(t.materials),c=s(t.textures),f=s(t.images),d=s(t.shapes),h=s(t.skeletons),m=s(t.animations),g=s(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),f.length>0&&(n.images=f),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function s(a){const l=[];for(const c in a){const f=a[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ve.DEFAULT_UP=new O(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const je=new O,hn=new O,jr=new O,mn=new O,ai=new O,li=new O,Zs=new O,Jr=new O,Qr=new O,to=new O,eo=new ce,no=new ce,io=new ce;class Qe{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),je.subVectors(t,e),r.cross(je);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(t,e,n,r,o){je.subVectors(r,e),hn.subVectors(n,e),jr.subVectors(t,e);const s=je.dot(je),a=je.dot(hn),l=je.dot(jr),c=hn.dot(hn),f=hn.dot(jr),d=s*c-a*a;if(d===0)return o.set(0,0,0),null;const h=1/d,m=(c*l-a*f)*h,g=(s*f-a*l)*h;return o.set(1-m-g,g,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(t,e,n,r,o,s,a,l){return this.getBarycoord(t,e,n,r,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,mn.x),l.addScaledVector(s,mn.y),l.addScaledVector(a,mn.z),l)}static getInterpolatedAttribute(t,e,n,r,o,s){return eo.setScalar(0),no.setScalar(0),io.setScalar(0),eo.fromBufferAttribute(t,e),no.fromBufferAttribute(t,n),io.fromBufferAttribute(t,r),s.setScalar(0),s.addScaledVector(eo,o.x),s.addScaledVector(no,o.y),s.addScaledVector(io,o.z),s}static isFrontFacing(t,e,n,r){return je.subVectors(n,e),hn.subVectors(t,e),je.cross(hn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return je.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),je.cross(hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,o){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,r,o)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,o=this.c;let s,a;ai.subVectors(r,n),li.subVectors(o,n),Jr.subVectors(t,n);const l=ai.dot(Jr),c=li.dot(Jr);if(l<=0&&c<=0)return e.copy(n);Qr.subVectors(t,r);const f=ai.dot(Qr),d=li.dot(Qr);if(f>=0&&d<=f)return e.copy(r);const h=l*d-f*c;if(h<=0&&l>=0&&f<=0)return s=l/(l-f),e.copy(n).addScaledVector(ai,s);to.subVectors(t,o);const m=ai.dot(to),g=li.dot(to);if(g>=0&&m<=g)return e.copy(o);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(li,a);const p=f*g-m*d;if(p<=0&&d-f>=0&&m-g>=0)return Zs.subVectors(o,r),a=(d-f)/(d-f+(m-g)),e.copy(r).addScaledVector(Zs,a);const u=1/(p+v+h);return s=v*u,a=h*u,e.copy(n).addScaledVector(ai,s).addScaledVector(li,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Za={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},ar={h:0,s:0,l:0};function ro(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=Wt.workingColorSpace){if(t=hc(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,s=2*n-o;this.r=ro(s,o,t+1/3),this.g=ro(s,o,t),this.b=ro(s,o,t-1/3)}return Wt.colorSpaceToWorking(this,r),this}setStyle(t,e=Ie){function n(o){o!==void 0&&parseFloat(o)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(o,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const n=Za[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bn(t.r),this.g=bn(t.g),this.b=bn(t.b),this}copyLinearToSRGB(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return Wt.workingToColorSpace(Se.copy(this),t),Math.round(Gt(Se.r*255,0,255))*65536+Math.round(Gt(Se.g*255,0,255))*256+Math.round(Gt(Se.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.workingToColorSpace(Se.copy(this),e);const n=Se.r,r=Se.g,o=Se.b,s=Math.max(n,r,o),a=Math.min(n,r,o);let l,c;const f=(a+s)/2;if(a===s)l=0,c=0;else{const d=s-a;switch(c=f<=.5?d/(s+a):d/(2-s-a),s){case n:l=(r-o)/d+(r<o?6:0);break;case r:l=(o-n)/d+2;break;case o:l=(n-r)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,e=Wt.workingColorSpace){return Wt.workingToColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Ie){Wt.workingToColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,r=Se.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Pn),this.setHSL(Pn.h+t,Pn.s+e,Pn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Pn),t.getHSL(ar);const n=Vr(Pn.h,ar.h,e),r=Vr(Pn.s,ar.s,e),o=Vr(Pn.l,ar.l,e);return this.setHSL(n,r,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*r,this.g=o[1]*e+o[4]*n+o[7]*r,this.b=o[2]*e+o[5]*n+o[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Xt;Xt.NAMES=Za;let Rc=0;class $i extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rc++}),this.uuid=Xi(),this.name="",this.type="Material",this.blending=xi,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xo,this.blendDst=go,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ns,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qn,this.stencilZFail=Qn,this.stencilZPass=Qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xo&&(n.blendSrc=this.blendSrc),this.blendDst!==go&&(n.blendDst=this.blendDst),this.blendEquation!==Yn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ns&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){const s=[];for(const a in o){const l=o[a];delete l.metadata,s.push(l)}return s}if(e){const o=r(t.textures),s=r(t.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ii extends $i{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=Na,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const de=new O,lr=new qt;let Cc=0;class nn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cc++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fs,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix3(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix4(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyNormalMatrix(t),this.setXYZ(e,de.x,de.y,de.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.transformDirection(t),this.setXYZ(e,de.x,de.y,de.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,o){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),r=Ue(r,this.array),o=Ue(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fs&&(t.usage=this.usage),t}}class ja extends nn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ja extends nn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Te extends nn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Pc=0;const Xe=new ue,oo=new ve,ci=new O,ze=new Yi,Li=new Yi,pe=new O;class Ye extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pc++}),this.uuid=Xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ya(t)?Ja:ja)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Ut().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,n){return Xe.makeTranslation(t,e,n),this.applyMatrix4(Xe),this}scale(t,e,n){return Xe.makeScale(t,e,n),this.applyMatrix4(Xe),this}lookAt(t){return oo.lookAt(t),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ci).negate(),this.translate(ci.x,ci.y,ci.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,o=t.length;r<o;r++){const s=t[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Te(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const o=t[r];e.setXYZ(r,o.x,o.y,o.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const o=e[n];ze.setFromBufferAttribute(o),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let o=0,s=e.length;o<s;o++){const a=e[o];Li.setFromBufferAttribute(a),this.morphTargetsRelative?(pe.addVectors(ze.min,Li.min),ze.expandByPoint(pe),pe.addVectors(ze.max,Li.max),ze.expandByPoint(pe)):(ze.expandByPoint(Li.min),ze.expandByPoint(Li.max))}ze.getCenter(n);let r=0;for(let o=0,s=t.count;o<s;o++)pe.fromBufferAttribute(t,o),r=Math.max(r,n.distanceToSquared(pe));if(e)for(let o=0,s=e.length;o<s;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)pe.fromBufferAttribute(a,c),l&&(ci.fromBufferAttribute(t,c),pe.add(ci)),r=Math.max(r,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),a=[],l=[];for(let F=0;F<n.count;F++)a[F]=new O,l[F]=new O;const c=new O,f=new O,d=new O,h=new qt,m=new qt,g=new qt,v=new O,p=new O;function u(F,S,M){c.fromBufferAttribute(n,F),f.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),h.fromBufferAttribute(o,F),m.fromBufferAttribute(o,S),g.fromBufferAttribute(o,M),f.sub(c),d.sub(c),m.sub(h),g.sub(h);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(v.copy(f).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(P),p.copy(d).multiplyScalar(m.x).addScaledVector(f,-g.x).multiplyScalar(P),a[F].add(v),a[S].add(v),a[M].add(v),l[F].add(p),l[S].add(p),l[M].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let F=0,S=T.length;F<S;++F){const M=T[F],P=M.start,N=M.count;for(let V=P,H=P+N;V<H;V+=3)u(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const E=new O,A=new O,C=new O,y=new O;function L(F){C.fromBufferAttribute(r,F),y.copy(C);const S=a[F];E.copy(S),E.sub(C.multiplyScalar(C.dot(S))).normalize(),A.crossVectors(y,S);const P=A.dot(l[F])<0?-1:1;s.setXYZW(F,E.x,E.y,E.z,P)}for(let F=0,S=T.length;F<S;++F){const M=T[F],P=M.start,N=M.count;for(let V=P,H=P+N;V<H;V+=3)L(t.getX(V+0)),L(t.getX(V+1)),L(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);const r=new O,o=new O,s=new O,a=new O,l=new O,c=new O,f=new O,d=new O;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),v=t.getX(h+1),p=t.getX(h+2);r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,v),s.fromBufferAttribute(e,p),f.subVectors(s,o),d.subVectors(r,o),f.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),a.add(f),l.add(f),c.add(f),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)r.fromBufferAttribute(e,h+0),o.fromBufferAttribute(e,h+1),s.fromBufferAttribute(e,h+2),f.subVectors(s,o),d.subVectors(r,o),f.cross(d),n.setXYZ(h+0,f.x,f.y,f.z),n.setXYZ(h+1,f.x,f.y,f.z),n.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(a,l){const c=a.array,f=a.itemSize,d=a.normalized,h=new c.constructor(l.length*f);let m=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*f;for(let u=0;u<f;u++)h[g++]=c[m++]}return new nn(h,f,d)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ye,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let f=0,d=c.length;f<d;f++){const h=c[f],m=t(h,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let d=0,h=c.length;d<h;d++){const m=c[d];f.push(m.toJSON(t.data))}f.length>0&&(r[l]=f,o=!0)}o&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(e))}const o=t.morphAttributes;for(const c in o){const f=[],d=o[c];for(let h=0,m=d.length;h<m;h++)f.push(d[h].clone(e));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,f=s.length;c<f;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const js=new ue,Hn=new Sc,cr=new gs,Js=new O,fr=new O,ur=new O,dr=new O,so=new O,hr=new O,Qs=new O,mr=new O;class Ve extends ve{constructor(t=new Ye,e=new Ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){const a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(o&&a){hr.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const f=a[l],d=o[l];f!==0&&(so.fromBufferAttribute(d,t),s?hr.addScaledVector(so,f):hr.addScaledVector(so.sub(e),f))}e.add(hr)}return e}raycast(t,e){const n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(o),Hn.copy(t.ray).recast(t.near),!(cr.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(cr,Js)===null||Hn.origin.distanceToSquared(Js)>(t.far-t.near)**2))&&(js.copy(o).invert(),Hn.copy(t.ray).applyMatrix4(js),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hn)))}_computeIntersections(t,e,n){let r;const o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,f=o.attributes.uv1,d=o.attributes.normal,h=o.groups,m=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,v=h.length;g<v;g++){const p=h[g],u=s[p.materialIndex],T=Math.max(p.start,m.start),E=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let A=T,C=E;A<C;A+=3){const y=a.getX(A),L=a.getX(A+1),F=a.getX(A+2);r=pr(this,u,t,n,c,f,d,y,L,F),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,u=v;p<u;p+=3){const T=a.getX(p),E=a.getX(p+1),A=a.getX(p+2);r=pr(this,s,t,n,c,f,d,T,E,A),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,v=h.length;g<v;g++){const p=h[g],u=s[p.materialIndex],T=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let A=T,C=E;A<C;A+=3){const y=A,L=A+1,F=A+2;r=pr(this,u,t,n,c,f,d,y,L,F),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,u=v;p<u;p+=3){const T=p,E=p+1,A=p+2;r=pr(this,s,t,n,c,f,d,T,E,A),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function Lc(i,t,e,n,r,o,s,a){let l;if(t.side===Ne?l=n.intersectTriangle(s,o,r,!0,a):l=n.intersectTriangle(r,o,s,t.side===On,a),l===null)return null;mr.copy(a),mr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(mr);return c<e.near||c>e.far?null:{distance:c,point:mr.clone(),object:i}}function pr(i,t,e,n,r,o,s,a,l,c){i.getVertexPosition(a,fr),i.getVertexPosition(l,ur),i.getVertexPosition(c,dr);const f=Lc(i,t,e,n,fr,ur,dr,Qs);if(f){const d=new O;Qe.getBarycoord(Qs,fr,ur,dr,d),r&&(f.uv=Qe.getInterpolatedAttribute(r,a,l,c,d,new qt)),o&&(f.uv1=Qe.getInterpolatedAttribute(o,a,l,c,d,new qt)),s&&(f.normal=Qe.getInterpolatedAttribute(s,a,l,c,d,new O),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new O,materialIndex:0};Qe.getNormal(fr,ur,dr,h.normal),f.face=h,f.barycoord=d}return f}class Ki extends Ye{constructor(t=1,e=1,n=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:o,depthSegments:s};const a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);const l=[],c=[],f=[],d=[];let h=0,m=0;g("z","y","x",-1,-1,n,e,t,s,o,0),g("z","y","x",1,-1,n,e,-t,s,o,1),g("x","z","y",1,1,t,n,e,r,s,2),g("x","z","y",1,-1,t,n,-e,r,s,3),g("x","y","z",1,-1,t,e,n,r,o,4),g("x","y","z",-1,-1,t,e,-n,r,o,5),this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(f,3)),this.setAttribute("uv",new Te(d,2));function g(v,p,u,T,E,A,C,y,L,F,S){const M=A/L,P=C/F,N=A/2,V=C/2,H=y/2,q=L+1,W=F+1;let nt=0,k=0;const et=new O;for(let ot=0;ot<W;ot++){const St=ot*P-V;for(let Ht=0;Ht<q;Ht++){const Yt=Ht*M-N;et[v]=Yt*T,et[p]=St*E,et[u]=H,c.push(et.x,et.y,et.z),et[v]=0,et[p]=0,et[u]=y>0?1:-1,f.push(et.x,et.y,et.z),d.push(Ht/L),d.push(1-ot/F),nt+=1}}for(let ot=0;ot<F;ot++)for(let St=0;St<L;St++){const Ht=h+St+q*ot,Yt=h+St+q*(ot+1),Jt=h+(St+1)+q*(ot+1),Qt=h+(St+1)+q*ot;l.push(Ht,Yt,Qt),l.push(Yt,Jt,Qt),k+=6}a.addGroup(m,k,S),m+=k,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ki(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function we(i){const t={};for(let e=0;e<i.length;e++){const n=bi(i[e]);for(const r in n)t[r]=n[r]}return t}function Dc(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Qa(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Uc={clone:bi,merge:we};var Ic=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yn extends $i{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ic,this.fragmentShader=Nc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bi(t.uniforms),this.uniformsGroups=Dc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?e.uniforms[r]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[r]={type:"m4",value:s.toArray()}:e.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class tl extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=an,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ln=new O,ta=new qt,ea=new qt;class Je extends tl{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ns*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(zr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ns*2*Math.atan(Math.tan(zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ln.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ln.x,Ln.y).multiplyScalar(-t/Ln.z),Ln.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ln.x,Ln.y).multiplyScalar(-t/Ln.z)}getViewSize(t,e){return this.getViewBounds(t,ta,ea),e.subVectors(ea,ta)}setViewOffset(t,e,n,r,o,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(zr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,o=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*r/l,e-=s.offsetY*n/c,r*=s.width/l,n*=s.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fi=-90,ui=1;class Fc extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Je(fi,ui,t,e);r.layers=this.layers,this.add(r);const o=new Je(fi,ui,t,e);o.layers=this.layers,this.add(o);const s=new Je(fi,ui,t,e);s.layers=this.layers,this.add(s);const a=new Je(fi,ui,t,e);a.layers=this.layers,this.add(a);const l=new Je(fi,ui,t,e);l.layers=this.layers,this.add(l);const c=new Je(fi,ui,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,o,s,a,l]=e;for(const c of e)this.remove(c);if(t===an)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,s,a,l,c,f]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,o),t.setRenderTarget(n,1,r),t.render(e,s),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,r),t.render(e,f),t.setRenderTarget(d,h,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class el extends Ee{constructor(t=[],e=vi,n,r,o,s,a,l,c,f){super(t,e,n,r,o,s,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Oc extends jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new el(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ki(5,5,5),o=new yn({name:"CubemapFromEquirect",uniforms:bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Sn});o.uniforms.tEquirect.value=e;const s=new Ve(r,o),a=e.minFilter;return e.minFilter===Kn&&(e.minFilter=qe),new Fc(1,10,this).update(t,s),e.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const o=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,n,r);t.setRenderTarget(o)}}class mi extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bc={type:"move"};class ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,o=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,n),u=this._getHandJoint(c,v);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=f.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Bc)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new mi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class zc extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Vc extends Ee{constructor(t=null,e=1,n=1,r,o,s,a,l,c=Ge,f=Ge,d,h){super(null,s,a,l,c,f,r,o,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const lo=new O,Gc=new O,Hc=new Ut;class qn{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=lo.subVectors(n,e).cross(Gc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(lo),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Hc.getNormalMatrix(t),r=this.coplanarPoint(lo).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kn=new gs,kc=new qt(.5,.5),xr=new O;class _s{constructor(t=new qn,e=new qn,n=new qn,r=new qn,o=new qn,s=new qn){this.planes=[t,e,n,r,o,s]}set(t,e,n,r,o,s){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=an,n=!1){const r=this.planes,o=t.elements,s=o[0],a=o[1],l=o[2],c=o[3],f=o[4],d=o[5],h=o[6],m=o[7],g=o[8],v=o[9],p=o[10],u=o[11],T=o[12],E=o[13],A=o[14],C=o[15];if(r[0].setComponents(c-s,m-f,u-g,C-T).normalize(),r[1].setComponents(c+s,m+f,u+g,C+T).normalize(),r[2].setComponents(c+a,m+d,u+v,C+E).normalize(),r[3].setComponents(c-a,m-d,u-v,C-E).normalize(),n)r[4].setComponents(l,h,p,A).normalize(),r[5].setComponents(c-l,m-h,u-p,C-A).normalize();else if(r[4].setComponents(c-l,m-h,u-p,C-A).normalize(),e===an)r[5].setComponents(c+l,m+h,u+p,C+A).normalize();else if(e===Ar)r[5].setComponents(l,h,p,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(kn)}intersectsSprite(t){kn.center.set(0,0,0);const e=kc.distanceTo(t.center);return kn.radius=.7071067811865476+e,kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(kn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(xr.x=r.normal.x>0?t.max.x:t.min.x,xr.y=r.normal.y>0?t.max.y:t.min.y,xr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(xr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wc extends Ee{constructor(t,e,n,r,o,s,a,l,c){super(t,e,n,r,o,s,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nl extends Ee{constructor(t,e,n=Zn,r,o,s,a=Ge,l=Ge,c,f=Bi,d=1){if(f!==Bi&&f!==zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:d};super(h,r,o,s,a,l,f,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new xs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class il extends Ee{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class vs extends Ye{constructor(t=1,e=1,n=1,r=32,o=1,s=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),o=Math.floor(o);const f=[],d=[],h=[],m=[];let g=0;const v=[],p=n/2;let u=0;T(),s===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(f),this.setAttribute("position",new Te(d,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(m,2));function T(){const A=new O,C=new O;let y=0;const L=(e-t)/n;for(let F=0;F<=o;F++){const S=[],M=F/o,P=M*(e-t)+t;for(let N=0;N<=r;N++){const V=N/r,H=V*l+a,q=Math.sin(H),W=Math.cos(H);C.x=P*q,C.y=-M*n+p,C.z=P*W,d.push(C.x,C.y,C.z),A.set(q,L,W).normalize(),h.push(A.x,A.y,A.z),m.push(V,1-M),S.push(g++)}v.push(S)}for(let F=0;F<r;F++)for(let S=0;S<o;S++){const M=v[S][F],P=v[S+1][F],N=v[S+1][F+1],V=v[S][F+1];(t>0||S!==0)&&(f.push(M,P,V),y+=3),(e>0||S!==o-1)&&(f.push(P,N,V),y+=3)}c.addGroup(u,y,0),u+=y}function E(A){const C=g,y=new qt,L=new O;let F=0;const S=A===!0?t:e,M=A===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,p*M,0),h.push(0,M,0),m.push(.5,.5),g++;const P=g;for(let N=0;N<=r;N++){const H=N/r*l+a,q=Math.cos(H),W=Math.sin(H);L.x=S*W,L.y=p*M,L.z=S*q,d.push(L.x,L.y,L.z),h.push(0,M,0),y.x=q*.5+.5,y.y=W*.5*M+.5,m.push(y.x,y.y),g++}for(let N=0;N<r;N++){const V=C+N,H=P+N;A===!0?f.push(H,H+1,V):f.push(H+1,H,V),F+=3}c.addGroup(u,F,A===!0?1:2),u+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ms extends vs{constructor(t=1,e=1,n=32,r=1,o=!1,s=0,a=Math.PI*2){super(0,t,e,n,r,o,s,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:s,thetaLength:a}}static fromJSON(t){return new Ms(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zi extends Ye{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const o=t/2,s=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,f=l+1,d=t/a,h=e/l,m=[],g=[],v=[],p=[];for(let u=0;u<f;u++){const T=u*h-s;for(let E=0;E<c;E++){const A=E*d-o;g.push(A,-T,0),v.push(0,0,1),p.push(E/a),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let T=0;T<a;T++){const E=T+c*u,A=T+c*(u+1),C=T+1+c*(u+1),y=T+1+c*u;m.push(E,A,y),m.push(A,C,y)}this.setIndex(m),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(v,3)),this.setAttribute("uv",new Te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Rr extends Ye{constructor(t=1,e=32,n=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(s+a,Math.PI);let c=0;const f=[],d=new O,h=new O,m=[],g=[],v=[],p=[];for(let u=0;u<=n;u++){const T=[],E=u/n;let A=0;u===0&&s===0?A=.5/e:u===n&&l===Math.PI&&(A=-.5/e);for(let C=0;C<=e;C++){const y=C/e;d.x=-t*Math.cos(r+y*o)*Math.sin(s+E*a),d.y=t*Math.cos(s+E*a),d.z=t*Math.sin(r+y*o)*Math.sin(s+E*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),p.push(y+A,1-E),T.push(c++)}f.push(T)}for(let u=0;u<n;u++)for(let T=0;T<e;T++){const E=f[u][T+1],A=f[u][T],C=f[u+1][T],y=f[u+1][T+1];(u!==0||s>0)&&m.push(E,A,y),(u!==n-1||l<Math.PI)&&m.push(A,C,y)}this.setIndex(m),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(v,3)),this.setAttribute("uv",new Te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Cr extends Ye{constructor(t=1,e=.4,n=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:o},n=Math.floor(n),r=Math.floor(r);const s=[],a=[],l=[],c=[],f=new O,d=new O,h=new O;for(let m=0;m<=n;m++)for(let g=0;g<=r;g++){const v=g/r*o,p=m/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(v),d.y=(t+e*Math.cos(p))*Math.sin(v),d.z=e*Math.sin(p),a.push(d.x,d.y,d.z),f.x=t*Math.cos(v),f.y=t*Math.sin(v),h.subVectors(d,f).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=r;g++){const v=(r+1)*m+g-1,p=(r+1)*(m-1)+g-1,u=(r+1)*(m-1)+g,T=(r+1)*m+g;s.push(v,p,T),s.push(p,u,T)}this.setIndex(s),this.setAttribute("position",new Te(a,3)),this.setAttribute("normal",new Te(l,3)),this.setAttribute("uv",new Te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class na extends $i{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xa,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xc extends $i{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ec,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qc extends $i{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class rl extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Yc extends rl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const co=new ue,ia=new O,ra=new O;class $c{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _s,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ia.setFromMatrixPosition(t.matrixWorld),e.position.copy(ia),ra.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ra),e.updateMatrixWorld(),co.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(co,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(co)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ss extends tl{constructor(t=-1,e=1,n=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=n-t,s=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Kc extends $c{constructor(){super(new Ss(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zc extends rl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new Kc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class jc extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function oa(i,t,e,n){const r=Jc(n);switch(e){case Ha:return i*t;case Wa:return i*t/r.components*r.byteLength;case ds:return i*t/r.components*r.byteLength;case hs:return i*t*2/r.components*r.byteLength;case ms:return i*t*2/r.components*r.byteLength;case ka:return i*t*3/r.components*r.byteLength;case en:return i*t*4/r.components*r.byteLength;case ps:return i*t*4/r.components*r.byteLength;case vr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Sr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Co:case Lo:return Math.max(i,16)*Math.max(t,8)/4;case Ro:case Po:return Math.max(i,8)*Math.max(t,8)/2;case Do:case Uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Oo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case zo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ko:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Yo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case $o:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ko:case Zo:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Jo:case Qo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ts:case es:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jc(i){switch(i){case ln:case Ba:return{byteLength:1,components:1};case Fi:case za:case yi:return{byteLength:2,components:1};case fs:case us:return{byteLength:2,components:4};case Zn:case cs:case Mn:return{byteLength:4,components:1};case Va:case Ga:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ls}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ls);function ol(){let i=null,t=!1,e=null,n=null;function r(o,s){e(o,s),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function Qc(i){const t=new WeakMap;function e(a,l){const c=a.array,f=a.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,f),a.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const f=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,f);else{d.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<d.length;m++){const g=d[h],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let m=0,g=d.length;m<g;m++){const v=d[m];i.bufferSubData(c,v.start*f.BYTES_PER_ELEMENT,f,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=t.get(a);(!f||f.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:o,update:s}}var tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ef=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,af=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,df=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ef=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Af=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Df=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,If=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Yf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$f=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,eu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ru=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ou=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,su=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,au=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,du=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_u=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Su=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Eu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Au=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ru=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Pu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Du=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Iu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ou=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Vu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ku=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$u=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ku=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ju=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ju=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const td=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ed=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,id=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,od=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ad=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ld=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ud=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,md=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_d=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Md=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ed=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Td=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ad=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ld=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ud=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,It={alphahash_fragment:tf,alphahash_pars_fragment:ef,alphamap_fragment:nf,alphamap_pars_fragment:rf,alphatest_fragment:of,alphatest_pars_fragment:sf,aomap_fragment:af,aomap_pars_fragment:lf,batching_pars_vertex:cf,batching_vertex:ff,begin_vertex:uf,beginnormal_vertex:df,bsdfs:hf,iridescence_fragment:mf,bumpmap_pars_fragment:pf,clipping_planes_fragment:xf,clipping_planes_pars_fragment:gf,clipping_planes_pars_vertex:_f,clipping_planes_vertex:vf,color_fragment:Mf,color_pars_fragment:Sf,color_pars_vertex:bf,color_vertex:yf,common:Ef,cube_uv_reflection_fragment:Tf,defaultnormal_vertex:Af,displacementmap_pars_vertex:wf,displacementmap_vertex:Rf,emissivemap_fragment:Cf,emissivemap_pars_fragment:Pf,colorspace_fragment:Lf,colorspace_pars_fragment:Df,envmap_fragment:Uf,envmap_common_pars_fragment:If,envmap_pars_fragment:Nf,envmap_pars_vertex:Ff,envmap_physical_pars_fragment:Yf,envmap_vertex:Of,fog_vertex:Bf,fog_pars_vertex:zf,fog_fragment:Vf,fog_pars_fragment:Gf,gradientmap_pars_fragment:Hf,lightmap_pars_fragment:kf,lights_lambert_fragment:Wf,lights_lambert_pars_fragment:Xf,lights_pars_begin:qf,lights_toon_fragment:$f,lights_toon_pars_fragment:Kf,lights_phong_fragment:Zf,lights_phong_pars_fragment:jf,lights_physical_fragment:Jf,lights_physical_pars_fragment:Qf,lights_fragment_begin:tu,lights_fragment_maps:eu,lights_fragment_end:nu,logdepthbuf_fragment:iu,logdepthbuf_pars_fragment:ru,logdepthbuf_pars_vertex:ou,logdepthbuf_vertex:su,map_fragment:au,map_pars_fragment:lu,map_particle_fragment:cu,map_particle_pars_fragment:fu,metalnessmap_fragment:uu,metalnessmap_pars_fragment:du,morphinstance_vertex:hu,morphcolor_vertex:mu,morphnormal_vertex:pu,morphtarget_pars_vertex:xu,morphtarget_vertex:gu,normal_fragment_begin:_u,normal_fragment_maps:vu,normal_pars_fragment:Mu,normal_pars_vertex:Su,normal_vertex:bu,normalmap_pars_fragment:yu,clearcoat_normal_fragment_begin:Eu,clearcoat_normal_fragment_maps:Tu,clearcoat_pars_fragment:Au,iridescence_pars_fragment:wu,opaque_fragment:Ru,packing:Cu,premultiplied_alpha_fragment:Pu,project_vertex:Lu,dithering_fragment:Du,dithering_pars_fragment:Uu,roughnessmap_fragment:Iu,roughnessmap_pars_fragment:Nu,shadowmap_pars_fragment:Fu,shadowmap_pars_vertex:Ou,shadowmap_vertex:Bu,shadowmask_pars_fragment:zu,skinbase_vertex:Vu,skinning_pars_vertex:Gu,skinning_vertex:Hu,skinnormal_vertex:ku,specularmap_fragment:Wu,specularmap_pars_fragment:Xu,tonemapping_fragment:qu,tonemapping_pars_fragment:Yu,transmission_fragment:$u,transmission_pars_fragment:Ku,uv_pars_fragment:Zu,uv_pars_vertex:ju,uv_vertex:Ju,worldpos_vertex:Qu,background_vert:td,background_frag:ed,backgroundCube_vert:nd,backgroundCube_frag:id,cube_vert:rd,cube_frag:od,depth_vert:sd,depth_frag:ad,distanceRGBA_vert:ld,distanceRGBA_frag:cd,equirect_vert:fd,equirect_frag:ud,linedashed_vert:dd,linedashed_frag:hd,meshbasic_vert:md,meshbasic_frag:pd,meshlambert_vert:xd,meshlambert_frag:gd,meshmatcap_vert:_d,meshmatcap_frag:vd,meshnormal_vert:Md,meshnormal_frag:Sd,meshphong_vert:bd,meshphong_frag:yd,meshphysical_vert:Ed,meshphysical_frag:Td,meshtoon_vert:Ad,meshtoon_frag:wd,points_vert:Rd,points_frag:Cd,shadow_vert:Pd,shadow_frag:Ld,sprite_vert:Dd,sprite_frag:Ud},st={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},sn={basic:{uniforms:we([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:we([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Xt(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:we([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:we([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:we([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Xt(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:we([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:we([st.points,st.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:we([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:we([st.common,st.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:we([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:we([st.sprite,st.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:we([st.common,st.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:we([st.lights,st.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};sn.physical={uniforms:we([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const gr={r:0,b:0,g:0},Wn=new cn,Id=new ue;function Nd(i,t,e,n,r,o,s){const a=new Xt(0);let l=o===!0?0:1,c,f,d=null,h=0,m=null;function g(E){let A=E.isScene===!0?E.background:null;return A&&A.isTexture&&(A=(E.backgroundBlurriness>0?e:t).get(A)),A}function v(E){let A=!1;const C=g(E);C===null?u(a,l):C&&C.isColor&&(u(C,1),A=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,A){const C=g(A);C&&(C.isCubeTexture||C.mapping===Dr)?(f===void 0&&(f=new Ve(new Ki(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:bi(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(y,L,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Wn.copy(A.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),f.material.uniforms.envMap.value=C,f.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Id.makeRotationFromEuler(Wn)),f.material.toneMapped=Wt.getTransfer(C.colorSpace)!==Zt,(d!==C||h!==C.version||m!==i.toneMapping)&&(f.material.needsUpdate=!0,d=C,h=C.version,m=i.toneMapping),f.layers.enableAll(),E.unshift(f,f.geometry,f.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Ve(new Zi(2,2),new yn({name:"BackgroundMaterial",uniforms:bi(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Wt.getTransfer(C.colorSpace)!==Zt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||h!==C.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=C,h=C.version,m=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function u(E,A){E.getRGB(gr,Qa(i)),n.buffers.color.setClear(gr.r,gr.g,gr.b,A,s)}function T(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,A=1){a.set(E),l=A,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,u(a,l)},render:v,addToRenderList:p,dispose:T}}function Fd(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let o=r,s=!1;function a(M,P,N,V,H){let q=!1;const W=d(V,N,P);o!==W&&(o=W,c(o.object)),q=m(M,V,N,H),q&&g(M,V,N,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(q||s)&&(s=!1,A(M,P,N,V),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function f(M){return i.deleteVertexArray(M)}function d(M,P,N){const V=N.wireframe===!0;let H=n[M.id];H===void 0&&(H={},n[M.id]=H);let q=H[P.id];q===void 0&&(q={},H[P.id]=q);let W=q[V];return W===void 0&&(W=h(l()),q[V]=W),W}function h(M){const P=[],N=[],V=[];for(let H=0;H<e;H++)P[H]=0,N[H]=0,V[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:V,object:M,attributes:{},index:null}}function m(M,P,N,V){const H=o.attributes,q=P.attributes;let W=0;const nt=N.getAttributes();for(const k in nt)if(nt[k].location>=0){const ot=H[k];let St=q[k];if(St===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(St=M.instanceColor)),ot===void 0||ot.attribute!==St||St&&ot.data!==St.data)return!0;W++}return o.attributesNum!==W||o.index!==V}function g(M,P,N,V){const H={},q=P.attributes;let W=0;const nt=N.getAttributes();for(const k in nt)if(nt[k].location>=0){let ot=q[k];ot===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor));const St={};St.attribute=ot,ot&&ot.data&&(St.data=ot.data),H[k]=St,W++}o.attributes=H,o.attributesNum=W,o.index=V}function v(){const M=o.newAttributes;for(let P=0,N=M.length;P<N;P++)M[P]=0}function p(M){u(M,0)}function u(M,P){const N=o.newAttributes,V=o.enabledAttributes,H=o.attributeDivisors;N[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),H[M]!==P&&(i.vertexAttribDivisor(M,P),H[M]=P)}function T(){const M=o.newAttributes,P=o.enabledAttributes;for(let N=0,V=P.length;N<V;N++)P[N]!==M[N]&&(i.disableVertexAttribArray(N),P[N]=0)}function E(M,P,N,V,H,q,W){W===!0?i.vertexAttribIPointer(M,P,N,H,q):i.vertexAttribPointer(M,P,N,V,H,q)}function A(M,P,N,V){v();const H=V.attributes,q=N.getAttributes(),W=P.defaultAttributeValues;for(const nt in q){const k=q[nt];if(k.location>=0){let et=H[nt];if(et===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(et=M.instanceColor)),et!==void 0){const ot=et.normalized,St=et.itemSize,Ht=t.get(et);if(Ht===void 0)continue;const Yt=Ht.buffer,Jt=Ht.type,Qt=Ht.bytesPerElement,Y=Jt===i.INT||Jt===i.UNSIGNED_INT||et.gpuType===cs;if(et.isInterleavedBufferAttribute){const Z=et.data,dt=Z.stride,Lt=et.offset;if(Z.isInstancedInterleavedBuffer){for(let _t=0;_t<k.locationSize;_t++)u(k.location+_t,Z.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let _t=0;_t<k.locationSize;_t++)p(k.location+_t);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let _t=0;_t<k.locationSize;_t++)E(k.location+_t,St/k.locationSize,Jt,ot,dt*Qt,(Lt+St/k.locationSize*_t)*Qt,Y)}else{if(et.isInstancedBufferAttribute){for(let Z=0;Z<k.locationSize;Z++)u(k.location+Z,et.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Z=0;Z<k.locationSize;Z++)p(k.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let Z=0;Z<k.locationSize;Z++)E(k.location+Z,St/k.locationSize,Jt,ot,St*Qt,St/k.locationSize*Z*Qt,Y)}}else if(W!==void 0){const ot=W[nt];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(k.location,ot);break;case 3:i.vertexAttrib3fv(k.location,ot);break;case 4:i.vertexAttrib4fv(k.location,ot);break;default:i.vertexAttrib1fv(k.location,ot)}}}}T()}function C(){F();for(const M in n){const P=n[M];for(const N in P){const V=P[N];for(const H in V)f(V[H].object),delete V[H];delete P[N]}delete n[M]}}function y(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const N in P){const V=P[N];for(const H in V)f(V[H].object),delete V[H];delete P[N]}delete n[M.id]}function L(M){for(const P in n){const N=n[P];if(N[M.id]===void 0)continue;const V=N[M.id];for(const H in V)f(V[H].object),delete V[H];delete N[M.id]}}function F(){S(),s=!0,o!==r&&(o=r,c(o.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:F,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:y,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:p,disableUnusedAttributes:T}}function Od(i,t,e){let n;function r(c){n=c}function o(c,f){i.drawArrays(n,c,f),e.update(f,n,1)}function s(c,f,d){d!==0&&(i.drawArraysInstanced(n,c,f,d),e.update(f,n,d))}function a(c,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,f,0,d);let m=0;for(let g=0;g<d;g++)m+=f[g];e.update(m,n,1)}function l(c,f,d,h){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)s(c[g],f[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,f,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=f[v]*h[v];e.update(g,n,1)}}this.setMode=r,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Bd(i,t,e,n){let r;function o(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(L){return!(L!==en&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const F=L===yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==ln&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Mn&&!F)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const f=l(c);f!==c&&(Dt("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:A,vertexTextures:C,maxSamples:y}}function zd(i){const t=this;let e=null,n=0,r=!1,o=!1;const s=new qn,a=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||n!==0||r;return r=h,n=d.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){e=f(d,h,0)},this.setState=function(d,h,m){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!r||g===null||g.length===0||o&&!p)o?f(null):c();else{const T=o?0:n,E=T*4;let A=u.clippingState||null;l.value=A,A=f(g,h,E,m);for(let C=0;C!==E;++C)A[C]=e[C];u.clippingState=A,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(d,h,m,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const u=m+v*4,T=h.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<u)&&(p=new Float32Array(u));for(let E=0,A=m;E!==v;++E,A+=4)s.copy(d[E]).applyMatrix4(T,a),s.normal.toArray(p,A),p[A+3]=s.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Vd(i){let t=new WeakMap;function e(s,a){return a===To?s.mapping=vi:a===Ao&&(s.mapping=Mi),s}function n(s){if(s&&s.isTexture){const a=s.mapping;if(a===To||a===Ao)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Oc(l.height);return c.fromEquirectangularTexture(i,s),t.set(s,c),s.addEventListener("dispose",r),e(c.texture,s.mapping)}else return null}}return s}function r(s){const a=s.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}const Un=4,sa=[.125,.215,.35,.446,.526,.582],$n=20,Gd=256,Di=new Ss,aa=new Xt;let fo=null,uo=0,ho=0,mo=!1;const Hd=new O;class la{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,r=100,o={}){const{size:s=256,position:a=Hd}=o;fo=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ua(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(fo,uo,ho),this._renderer.xr.enabled=mo,t.scissorTest=!1,di(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vi||t.mapping===Mi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fo=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qe,minFilter:qe,generateMipmaps:!1,type:yi,format:en,colorSpace:Si,depthBuffer:!1},r=ca(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ca(t,e,n);const{_lodMax:o}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=kd(o)),this._blurMaterial=Xd(o,t,e),this._ggxMaterial=Wd(o,t,e)}return r}_compileMaterial(t){const e=new Ve(new Ye,t);this._renderer.compile(e,Di)}_sceneToCubeUV(t,e,n,r,o){const l=new Je(90,1,e,n),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(aa),d.toneMapping=Nn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ve(new Ki,new Ii({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let u=!1;const T=t.background;T?T.isColor&&(p.color.copy(T),t.background=null,u=!0):(p.color.copy(aa),u=!0);for(let E=0;E<6;E++){const A=E%3;A===0?(l.up.set(0,c[E],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+f[E],o.y,o.z)):A===1?(l.up.set(0,0,c[E]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+f[E],o.z)):(l.up.set(0,c[E],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+f[E]));const C=this._cubeSize;di(r,A*C,E>2?C:0,C,C),d.setRenderTarget(r),u&&d.render(v,l),d.render(t,l)}d.toneMapping=m,d.autoClear=h,t.background=T}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===vi||t.mapping===Mi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ua()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fa());const o=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=o;const a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;di(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(s,Di)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodMeshes.length;for(let o=1;o<r;o++)this._applyGGXFilter(t,o-1,o);e.autoClear=n}_applyGGXFilter(t,e,n){const r=this._renderer,o=this._pingPongRenderTarget,s=this._ggxMaterial,a=this._lodMeshes[n];a.material=s;const l=s.uniforms,c=n/(this._lodMeshes.length-1),f=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-f*f),h=.05+c*.95,m=d*h,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-Un?n-g+Un:0),u=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=g-e,di(o,p,u,3*v,2*v),r.setRenderTarget(o),r.render(a,Di),l.envMap.value=o.texture,l.roughness.value=0,l.mipInt.value=g-n,di(t,p,u,3*v,2*v),r.setRenderTarget(t),r.render(a,Di)}_blur(t,e,n,r,o){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,n,r,"latitudinal",o),this._halfBlur(s,t,n,n,r,"longitudinal",o)}_halfBlur(t,e,n,r,o,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const f=3,d=this._lodMeshes[r];d.material=c;const h=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*$n-1),v=o/g,p=isFinite(o)?1+Math.floor(f*v):$n;p>$n&&Dt(`sigmaRadians, ${o}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${$n}`);const u=[];let T=0;for(let L=0;L<$n;++L){const F=L/v,S=Math.exp(-F*F/2);u.push(S),L===0?T+=S:L<p&&(T+=2*S)}for(let L=0;L<u.length;L++)u[L]=u[L]/T;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=u,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const A=this._sizeLods[r],C=3*A*(r>E-Un?r-E+Un:0),y=4*(this._cubeSize-A);di(e,C,y,3*A,2*A),l.setRenderTarget(e),l.render(d,Di)}}function kd(i){const t=[],e=[],n=[];let r=i;const o=i-Un+1+sa.length;for(let s=0;s<o;s++){const a=Math.pow(2,r);t.push(a);let l=1/a;s>i-Un?l=sa[s-i+Un-1]:s===0&&(l=0),e.push(l);const c=1/(a-2),f=-c,d=1+c,h=[f,f,d,f,d,d,f,f,d,d,f,d],m=6,g=6,v=3,p=2,u=1,T=new Float32Array(v*g*m),E=new Float32Array(p*g*m),A=new Float32Array(u*g*m);for(let y=0;y<m;y++){const L=y%3*2/3-1,F=y>2?0:-1,S=[L,F,0,L+2/3,F,0,L+2/3,F+1,0,L,F,0,L+2/3,F+1,0,L,F+1,0];T.set(S,v*g*y),E.set(h,p*g*y);const M=[y,y,y,y,y,y];A.set(M,u*g*y)}const C=new Ye;C.setAttribute("position",new nn(T,v)),C.setAttribute("uv",new nn(E,p)),C.setAttribute("faceIndex",new nn(A,u)),n.push(new Ve(C,null)),r>Un&&r--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function ca(i,t,e){const n=new jn(i,t,e);return n.texture.mapping=Dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function di(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Wd(i,t,e){return new yn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gd,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ur(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Xd(i,t,e){const n=new Float32Array($n),r=new O(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:$n,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ur(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function fa(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ur(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ua(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ur(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Ur(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qd(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===To||l===Ao,f=l===vi||l===Mi;if(c||f){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new la(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||f&&m&&r(m)?(e===null&&(e=new la(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let f=0;f<c;f++)a[f]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:s}}function Yd(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const r=i.getExtension(n);return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Vi("WebGLRenderer: "+n+" extension not supported."),r}}}function $d(i,t,e,n){const r={},o=new WeakMap;function s(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",s),delete r[h.id];const m=o.get(h);m&&(t.remove(m),o.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)t.update(h[m],i.ARRAY_BUFFER)}function c(d){const h=[],m=d.index,g=d.attributes.position;let v=0;if(m!==null){const T=m.array;v=m.version;for(let E=0,A=T.length;E<A;E+=3){const C=T[E+0],y=T[E+1],L=T[E+2];h.push(C,y,y,L,L,C)}}else if(g!==void 0){const T=g.array;v=g.version;for(let E=0,A=T.length/3-1;E<A;E+=3){const C=E+0,y=E+1,L=E+2;h.push(C,y,y,L,L,C)}}else return;const p=new(Ya(h)?Ja:ja)(h,1);p.version=v;const u=o.get(d);u&&t.remove(u),o.set(d,p)}function f(d){const h=o.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:f}}function Kd(i,t,e){let n;function r(h){n=h}let o,s;function a(h){o=h.type,s=h.bytesPerElement}function l(h,m){i.drawElements(n,m,o,h*s),e.update(m,n,1)}function c(h,m,g){g!==0&&(i.drawElementsInstanced(n,m,o,h*s,g),e.update(m,n,g))}function f(h,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,o,h,0,g);let p=0;for(let u=0;u<g;u++)p+=m[u];e.update(p,n,1)}function d(h,m,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<h.length;u++)c(h[u]/s,m[u],v[u]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,o,h,0,v,0,g);let u=0;for(let T=0;T<g;T++)u+=m[T]*v[T];e.update(u,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function Zd(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(e.calls++,s){case i.TRIANGLES:e.triangles+=a*(o/3);break;case i.LINES:e.lines+=a*(o/2);break;case i.LINE_STRIP:e.lines+=a*(o-1);break;case i.LINE_LOOP:e.lines+=a*o;break;case i.POINTS:e.points+=a*o;break;default:fe("WebGLInfo: Unknown draw mode:",s);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function jd(i,t,e){const n=new WeakMap,r=new ce;function o(s,a,l){const c=s.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=f!==void 0?f.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let S=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",S)};h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let E=0;m===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let A=a.attributes.position.count*E,C=1;A>t.maxTextureSize&&(C=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const y=new Float32Array(A*C*4*d),L=new $a(y,A,C,d);L.type=Mn,L.needsUpdate=!0;const F=E*4;for(let M=0;M<d;M++){const P=p[M],N=u[M],V=T[M],H=A*C*4*M;for(let q=0;q<P.count;q++){const W=q*F;m===!0&&(r.fromBufferAttribute(P,q),y[H+W+0]=r.x,y[H+W+1]=r.y,y[H+W+2]=r.z,y[H+W+3]=0),g===!0&&(r.fromBufferAttribute(N,q),y[H+W+4]=r.x,y[H+W+5]=r.y,y[H+W+6]=r.z,y[H+W+7]=0),v===!0&&(r.fromBufferAttribute(V,q),y[H+W+8]=r.x,y[H+W+9]=r.y,y[H+W+10]=r.z,y[H+W+11]=V.itemSize===4?r.w:1)}}h={count:d,texture:L,size:new qt(A,C)},n.set(a,h),a.addEventListener("dispose",S)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,e);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:o}}function Jd(i,t,e,n){let r=new WeakMap;function o(l){const c=n.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==c&&(t.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function s(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:s}}const sl=new Ee,da=new nl(1,1),al=new $a,ll=new vc,cl=new el,ha=[],ma=[],pa=new Float32Array(16),xa=new Float32Array(9),ga=new Float32Array(4);function Ti(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let o=ha[r];if(o===void 0&&(o=new Float32Array(r),ha[r]=o),t!==0){n.toArray(o,0);for(let s=1,a=0;s!==t;++s)a+=e,i[s].toArray(o,a)}return o}function he(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ir(i,t){let e=ma[t];e===void 0&&(e=new Int32Array(t),ma[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Qd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function th(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2fv(this.addr,t),me(e,t)}}function eh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(he(e,t))return;i.uniform3fv(this.addr,t),me(e,t)}}function nh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4fv(this.addr,t),me(e,t)}}function ih(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(he(e,n))return;ga.set(n),i.uniformMatrix2fv(this.addr,!1,ga),me(e,n)}}function rh(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(he(e,n))return;xa.set(n),i.uniformMatrix3fv(this.addr,!1,xa),me(e,n)}}function oh(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(he(e,n))return;pa.set(n),i.uniformMatrix4fv(this.addr,!1,pa),me(e,n)}}function sh(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ah(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2iv(this.addr,t),me(e,t)}}function lh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;i.uniform3iv(this.addr,t),me(e,t)}}function ch(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4iv(this.addr,t),me(e,t)}}function fh(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function uh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2uiv(this.addr,t),me(e,t)}}function dh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;i.uniform3uiv(this.addr,t),me(e,t)}}function hh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4uiv(this.addr,t),me(e,t)}}function mh(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let o;this.type===i.SAMPLER_2D_SHADOW?(da.compareFunction=qa,o=da):o=sl,e.setTexture2D(t||o,r)}function ph(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||ll,r)}function xh(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||cl,r)}function gh(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||al,r)}function _h(i){switch(i){case 5126:return Qd;case 35664:return th;case 35665:return eh;case 35666:return nh;case 35674:return ih;case 35675:return rh;case 35676:return oh;case 5124:case 35670:return sh;case 35667:case 35671:return ah;case 35668:case 35672:return lh;case 35669:case 35673:return ch;case 5125:return fh;case 36294:return uh;case 36295:return dh;case 36296:return hh;case 35678:case 36198:case 36298:case 36306:case 35682:return mh;case 35679:case 36299:case 36307:return ph;case 35680:case 36300:case 36308:case 36293:return xh;case 36289:case 36303:case 36311:case 36292:return gh}}function vh(i,t){i.uniform1fv(this.addr,t)}function Mh(i,t){const e=Ti(t,this.size,2);i.uniform2fv(this.addr,e)}function Sh(i,t){const e=Ti(t,this.size,3);i.uniform3fv(this.addr,e)}function bh(i,t){const e=Ti(t,this.size,4);i.uniform4fv(this.addr,e)}function yh(i,t){const e=Ti(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Eh(i,t){const e=Ti(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Th(i,t){const e=Ti(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ah(i,t){i.uniform1iv(this.addr,t)}function wh(i,t){i.uniform2iv(this.addr,t)}function Rh(i,t){i.uniform3iv(this.addr,t)}function Ch(i,t){i.uniform4iv(this.addr,t)}function Ph(i,t){i.uniform1uiv(this.addr,t)}function Lh(i,t){i.uniform2uiv(this.addr,t)}function Dh(i,t){i.uniform3uiv(this.addr,t)}function Uh(i,t){i.uniform4uiv(this.addr,t)}function Ih(i,t,e){const n=this.cache,r=t.length,o=Ir(e,r);he(n,o)||(i.uniform1iv(this.addr,o),me(n,o));for(let s=0;s!==r;++s)e.setTexture2D(t[s]||sl,o[s])}function Nh(i,t,e){const n=this.cache,r=t.length,o=Ir(e,r);he(n,o)||(i.uniform1iv(this.addr,o),me(n,o));for(let s=0;s!==r;++s)e.setTexture3D(t[s]||ll,o[s])}function Fh(i,t,e){const n=this.cache,r=t.length,o=Ir(e,r);he(n,o)||(i.uniform1iv(this.addr,o),me(n,o));for(let s=0;s!==r;++s)e.setTextureCube(t[s]||cl,o[s])}function Oh(i,t,e){const n=this.cache,r=t.length,o=Ir(e,r);he(n,o)||(i.uniform1iv(this.addr,o),me(n,o));for(let s=0;s!==r;++s)e.setTexture2DArray(t[s]||al,o[s])}function Bh(i){switch(i){case 5126:return vh;case 35664:return Mh;case 35665:return Sh;case 35666:return bh;case 35674:return yh;case 35675:return Eh;case 35676:return Th;case 5124:case 35670:return Ah;case 35667:case 35671:return wh;case 35668:case 35672:return Rh;case 35669:case 35673:return Ch;case 5125:return Ph;case 36294:return Lh;case 36295:return Dh;case 36296:return Uh;case 35678:case 36198:case 36298:case 36306:case 35682:return Ih;case 35679:case 36299:case 36307:return Nh;case 35680:case 36300:case 36308:case 36293:return Fh;case 36289:case 36303:case 36311:case 36292:return Oh}}class zh{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=_h(e.type)}}class Vh{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bh(e.type)}}class Gh{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let o=0,s=r.length;o!==s;++o){const a=r[o];a.setValue(t,e[a.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function _a(i,t){i.seq.push(t),i.map[t.id]=t}function Hh(i,t,e){const n=i.name,r=n.length;for(po.lastIndex=0;;){const o=po.exec(n),s=po.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===r){_a(e,c===void 0?new zh(a,i,t):new Vh(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Gh(a),_a(e,d)),e=d}}}class yr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=t.getActiveUniform(e,r),s=t.getUniformLocation(e,o.name);Hh(o,s,this)}}setValue(t,e,n,r){const o=this.map[e];o!==void 0&&o.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let o=0,s=e.length;o!==s;++o){const a=e[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,o=t.length;r!==o;++r){const s=t[r];s.id in e&&n.push(s)}return n}}function va(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const kh=37297;let Wh=0;function Xh(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let s=r;s<o;s++){const a=s+1;n.push(`${a===t?">":" "} ${a}: ${e[s]}`)}return n.join(`
`)}const Ma=new Ut;function qh(i){Wt._getMatrix(Ma,Wt.workingColorSpace,i);const t=`mat3( ${Ma.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case Tr:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sa(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),o=(i.getShaderInfoLog(t)||"").trim();if(n&&o==="")return"";const s=/ERROR: 0:(\d+)/.exec(o);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+o+`

`+Xh(i.getShaderSource(t),a)}else return o}function Yh(i,t){const e=qh(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $h(i,t){let e;switch(t){case $l:e="Linear";break;case Kl:e="Reinhard";break;case Zl:e="Cineon";break;case Fa:e="ACESFilmic";break;case Jl:e="AgX";break;case Ql:e="Neutral";break;case jl:e="Custom";break;default:Dt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new O;function Kh(){Wt.getLuminanceCoefficients(_r);const i=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zh(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ui).join(`
`)}function jh(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jh(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const o=i.getActiveAttrib(t,r),s=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),e[s]={type:o.type,location:i.getAttribLocation(t,s),locationSize:a}}return e}function Ui(i){return i!==""}function ba(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ya(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qh=/^[ \t]*#include +<([\w\d./]+)>/gm;function is(i){return i.replace(Qh,em)}const tm=new Map;function em(i,t){let e=It[t];if(e===void 0){const n=tm.get(t);if(n!==void 0)e=It[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return is(e)}const nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ea(i){return i.replace(nm,im)}function im(i,t,e,n){let r="";for(let o=parseInt(t);o<parseInt(e);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Ta(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ia?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===wl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function om(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vi:case Mi:t="ENVMAP_TYPE_CUBE";break;case Dr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function sm(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Mi&&(t="ENVMAP_MODE_REFRACTION"),t}function am(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Na:t="ENVMAP_BLENDING_MULTIPLY";break;case ql:t="ENVMAP_BLENDING_MIX";break;case Yl:t="ENVMAP_BLENDING_ADD";break}return t}function lm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function cm(i,t,e,n){const r=i.getContext(),o=e.defines;let s=e.vertexShader,a=e.fragmentShader;const l=rm(e),c=om(e),f=sm(e),d=am(e),h=lm(e),m=Zh(e),g=jh(o),v=r.createProgram();let p,u,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ui).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ui).join(`
`),u.length>0&&(u+=`
`)):(p=[Ta(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ui).join(`
`),u=[Ta(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+f:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Nn?"#define TONE_MAPPING":"",e.toneMapping!==Nn?It.tonemapping_pars_fragment:"",e.toneMapping!==Nn?$h("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,Yh("linearToOutputTexel",e.outputColorSpace),Kh(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ui).join(`
`)),s=is(s),s=ba(s,e),s=ya(s,e),a=is(a),a=ba(a,e),a=ya(a,e),s=Ea(s),a=Ea(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",e.glslVersion===Os?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Os?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const E=T+p+s,A=T+u+a,C=va(r,r.VERTEX_SHADER,E),y=va(r,r.FRAGMENT_SHADER,A);r.attachShader(v,C),r.attachShader(v,y),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function L(P){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",V=r.getShaderInfoLog(C)||"",H=r.getShaderInfoLog(y)||"",q=N.trim(),W=V.trim(),nt=H.trim();let k=!0,et=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,C,y);else{const ot=Sa(r,C,"vertex"),St=Sa(r,y,"fragment");fe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+q+`
`+ot+`
`+St)}else q!==""?Dt("WebGLProgram: Program Info Log:",q):(W===""||nt==="")&&(et=!1);et&&(P.diagnostics={runnable:k,programLog:q,vertexShader:{log:W,prefix:p},fragmentShader:{log:nt,prefix:u}})}r.deleteShader(C),r.deleteShader(y),F=new yr(r,v),S=Jh(r,v)}let F;this.getUniforms=function(){return F===void 0&&L(this),F};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,kh)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wh++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=y,this}let fm=0;class um{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(t);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new dm(t),e.set(t,n)),n}}class dm{constructor(t){this.id=fm++,this.code=t,this.usedTimes=0}}function hm(i,t,e,n,r,o,s){const a=new Ka,l=new um,c=new Set,f=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,M,P,N,V){const H=N.fog,q=V.geometry,W=S.isMeshStandardMaterial?N.environment:null,nt=(S.isMeshStandardMaterial?e:t).get(S.envMap||W),k=nt&&nt.mapping===Dr?nt.image.height:null,et=g[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&Dt("WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const ot=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,St=ot!==void 0?ot.length:0;let Ht=0;q.morphAttributes.position!==void 0&&(Ht=1),q.morphAttributes.normal!==void 0&&(Ht=2),q.morphAttributes.color!==void 0&&(Ht=3);let Yt,Jt,Qt,Y;if(et){const $t=sn[et];Yt=$t.vertexShader,Jt=$t.fragmentShader}else Yt=S.vertexShader,Jt=S.fragmentShader,l.update(S),Qt=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);const Z=i.getRenderTarget(),dt=i.state.buffers.depth.getReversed(),Lt=V.isInstancedMesh===!0,_t=V.isBatchedMesh===!0,Ot=!!S.map,_e=!!S.matcap,Ft=!!nt,ne=!!S.aoMap,w=!!S.lightMap,Bt=!!S.bumpMap,zt=!!S.normalMap,te=!!S.displacementMap,pt=!!S.emissiveMap,re=!!S.metalnessMap,Mt=!!S.roughnessMap,Pt=S.anisotropy>0,b=S.clearcoat>0,x=S.dispersion>0,I=S.iridescence>0,X=S.sheen>0,K=S.transmission>0,G=Pt&&!!S.anisotropyMap,gt=b&&!!S.clearcoatMap,at=b&&!!S.clearcoatNormalMap,bt=b&&!!S.clearcoatRoughnessMap,xt=I&&!!S.iridescenceMap,j=I&&!!S.iridescenceThicknessMap,tt=X&&!!S.sheenColorMap,At=X&&!!S.sheenRoughnessMap,Et=!!S.specularMap,ft=!!S.specularColorMap,Rt=!!S.specularIntensityMap,R=K&&!!S.transmissionMap,lt=K&&!!S.thicknessMap,it=!!S.gradientMap,rt=!!S.alphaMap,J=S.alphaTest>0,$=!!S.alphaHash,ht=!!S.extensions;let Ct=Nn;S.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ct=i.toneMapping);const ee={shaderID:et,shaderType:S.type,shaderName:S.name,vertexShader:Yt,fragmentShader:Jt,defines:S.defines,customVertexShaderID:Qt,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:_t,batchingColor:_t&&V._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&V.instanceColor!==null,instancingMorph:Lt&&V.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Si,alphaToCoverage:!!S.alphaToCoverage,map:Ot,matcap:_e,envMap:Ft,envMapMode:Ft&&nt.mapping,envMapCubeUVHeight:k,aoMap:ne,lightMap:w,bumpMap:Bt,normalMap:zt,displacementMap:h&&te,emissiveMap:pt,normalMapObjectSpace:zt&&S.normalMapType===ic,normalMapTangentSpace:zt&&S.normalMapType===Xa,metalnessMap:re,roughnessMap:Mt,anisotropy:Pt,anisotropyMap:G,clearcoat:b,clearcoatMap:gt,clearcoatNormalMap:at,clearcoatRoughnessMap:bt,dispersion:x,iridescence:I,iridescenceMap:xt,iridescenceThicknessMap:j,sheen:X,sheenColorMap:tt,sheenRoughnessMap:At,specularMap:Et,specularColorMap:ft,specularIntensityMap:Rt,transmission:K,transmissionMap:R,thicknessMap:lt,gradientMap:it,opaque:S.transparent===!1&&S.blending===xi&&S.alphaToCoverage===!1,alphaMap:rt,alphaTest:J,alphaHash:$,combine:S.combine,mapUv:Ot&&v(S.map.channel),aoMapUv:ne&&v(S.aoMap.channel),lightMapUv:w&&v(S.lightMap.channel),bumpMapUv:Bt&&v(S.bumpMap.channel),normalMapUv:zt&&v(S.normalMap.channel),displacementMapUv:te&&v(S.displacementMap.channel),emissiveMapUv:pt&&v(S.emissiveMap.channel),metalnessMapUv:re&&v(S.metalnessMap.channel),roughnessMapUv:Mt&&v(S.roughnessMap.channel),anisotropyMapUv:G&&v(S.anisotropyMap.channel),clearcoatMapUv:gt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:at&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:j&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:At&&v(S.sheenRoughnessMap.channel),specularMapUv:Et&&v(S.specularMap.channel),specularColorMapUv:ft&&v(S.specularColorMap.channel),specularIntensityMapUv:Rt&&v(S.specularIntensityMap.channel),transmissionMapUv:R&&v(S.transmissionMap.channel),thicknessMapUv:lt&&v(S.thicknessMap.channel),alphaMapUv:rt&&v(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(zt||Pt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!q.attributes.uv&&(Ot||rt),fog:!!H,useFog:S.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:dt,skinning:V.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Ht,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ct,decodeVideoTexture:Ot&&S.map.isVideoTexture===!0&&Wt.getTransfer(S.map.colorSpace)===Zt,decodeVideoTextureEmissive:pt&&S.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(S.emissiveMap.colorSpace)===Zt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===gn,flipSided:S.side===Ne,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ht&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ht&&S.extensions.multiDraw===!0||_t)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ee.vertexUv1s=c.has(1),ee.vertexUv2s=c.has(2),ee.vertexUv3s=c.has(3),c.clear(),ee}function u(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(T(M,S),E(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function T(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function E(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function A(S){const M=g[S.type];let P;if(M){const N=sn[M];P=Uc.clone(N.uniforms)}else P=S.uniforms;return P}function C(S,M){let P;for(let N=0,V=f.length;N<V;N++){const H=f[N];if(H.cacheKey===M){P=H,++P.usedTimes;break}}return P===void 0&&(P=new cm(i,M,S,o),f.push(P)),P}function y(S){if(--S.usedTimes===0){const M=f.indexOf(S);f[M]=f[f.length-1],f.pop(),S.destroy()}}function L(S){l.remove(S)}function F(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:A,acquireProgram:C,releaseProgram:y,releaseShaderCache:L,programs:f,dispose:F}}function mm(){let i=new WeakMap;function t(s){return i.has(s)}function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function n(s){i.delete(s)}function r(s,a,l){i.get(s)[a]=l}function o(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:o}}function pm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Aa(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wa(){const i=[];let t=0;const e=[],n=[],r=[];function o(){t=0,e.length=0,n.length=0,r.length=0}function s(d,h,m,g,v,p){let u=i[t];return u===void 0?(u={id:d.id,object:d,geometry:h,material:m,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},i[t]=u):(u.id=d.id,u.object=d,u.geometry=h,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=v,u.group=p),t++,u}function a(d,h,m,g,v,p){const u=s(d,h,m,g,v,p);m.transmission>0?n.push(u):m.transparent===!0?r.push(u):e.push(u)}function l(d,h,m,g,v,p){const u=s(d,h,m,g,v,p);m.transmission>0?n.unshift(u):m.transparent===!0?r.unshift(u):e.unshift(u)}function c(d,h){e.length>1&&e.sort(d||pm),n.length>1&&n.sort(h||Aa),r.length>1&&r.sort(h||Aa)}function f(){for(let d=t,h=i.length;d<h;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:o,push:a,unshift:l,finish:f,sort:c}}function xm(){let i=new WeakMap;function t(n,r){const o=i.get(n);let s;return o===void 0?(s=new wa,i.set(n,[s])):r>=o.length?(s=new wa,o.push(s)):s=o[r],s}function e(){i=new WeakMap}return{get:t,dispose:e}}function gm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Xt};break;case"SpotLight":e={position:new O,direction:new O,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function _m(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let vm=0;function Mm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Sm(i){const t=new gm,e=_m(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);const r=new O,o=new ue,s=new ue;function a(c){let f=0,d=0,h=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let m=0,g=0,v=0,p=0,u=0,T=0,E=0,A=0,C=0,y=0,L=0;c.sort(Mm);for(let S=0,M=c.length;S<M;S++){const P=c[S],N=P.color,V=P.intensity,H=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=N.r*V,d+=N.g*V,h+=N.b*V;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],V);L++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const nt=P.shadow,k=e.get(P);k.shadowIntensity=nt.intensity,k.shadowBias=nt.bias,k.shadowNormalBias=nt.normalBias,k.shadowRadius=nt.radius,k.shadowMapSize=nt.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=P.shadow.matrix,T++}n.directional[m]=W,m++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(N).multiplyScalar(V),W.distance=H,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;const nt=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,nt.updateMatrices(P),P.castShadow&&y++),n.spotLightMatrix[v]=nt.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=nt.intensity,k.shadowBias=nt.bias,k.shadowNormalBias=nt.normalBias,k.shadowRadius=nt.radius,k.shadowMapSize=nt.mapSize,n.spotShadow[v]=k,n.spotShadowMap[v]=q,A++}v++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(N).multiplyScalar(V),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=W,p++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const nt=P.shadow,k=e.get(P);k.shadowIntensity=nt.intensity,k.shadowBias=nt.bias,k.shadowNormalBias=nt.normalBias,k.shadowRadius=nt.radius,k.shadowMapSize=nt.mapSize,k.shadowCameraNear=nt.camera.near,k.shadowCameraFar=nt.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(V),W.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[u]=W,u++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=d,n.ambient[2]=h;const F=n.hash;(F.directionalLength!==m||F.pointLength!==g||F.spotLength!==v||F.rectAreaLength!==p||F.hemiLength!==u||F.numDirectionalShadows!==T||F.numPointShadows!==E||F.numSpotShadows!==A||F.numSpotMaps!==C||F.numLightProbes!==L)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=A+C-y,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=L,F.directionalLength=m,F.pointLength=g,F.spotLength=v,F.rectAreaLength=p,F.hemiLength=u,F.numDirectionalShadows=T,F.numPointShadows=E,F.numSpotShadows=A,F.numSpotMaps=C,F.numLightProbes=L,n.version=vm++)}function l(c,f){let d=0,h=0,m=0,g=0,v=0;const p=f.matrixWorldInverse;for(let u=0,T=c.length;u<T;u++){const E=c[u];if(E.isDirectionalLight){const A=n.directional[d];A.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),d++}else if(E.isSpotLight){const A=n.spot[m];A.position.setFromMatrixPosition(E.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const A=n.rectArea[g];A.position.setFromMatrixPosition(E.matrixWorld),A.position.applyMatrix4(p),s.identity(),o.copy(E.matrixWorld),o.premultiply(p),s.extractRotation(o),A.halfWidth.set(E.width*.5,0,0),A.halfHeight.set(0,E.height*.5,0),A.halfWidth.applyMatrix4(s),A.halfHeight.applyMatrix4(s),g++}else if(E.isPointLight){const A=n.point[h];A.position.setFromMatrixPosition(E.matrixWorld),A.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){const A=n.hemi[v];A.direction.setFromMatrixPosition(E.matrixWorld),A.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:n}}function Ra(i){const t=new Sm(i),e=[],n=[];function r(f){c.camera=f,e.length=0,n.length=0}function o(f){e.push(f)}function s(f){n.push(f)}function a(){t.setup(e)}function l(f){t.setupView(e,f)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function bm(i){let t=new WeakMap;function e(r,o=0){const s=t.get(r);let a;return s===void 0?(a=new Ra(i),t.set(r,[a])):o>=s.length?(a=new Ra(i),s.push(a)):a=s[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const ym=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Em=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tm(i,t,e){let n=new _s;const r=new qt,o=new qt,s=new ce,a=new Xc({depthPacking:nc}),l=new qc,c={},f=e.maxTextureSize,d={[On]:Ne,[Ne]:On,[gn]:gn},h=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:ym,fragmentShader:Em}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ye;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ve(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ia;let u=this.type;this.render=function(y,L,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||y.length===0)return;const S=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Sn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const V=u!==xn&&this.type===xn,H=u===xn&&this.type!==xn;for(let q=0,W=y.length;q<W;q++){const nt=y[q],k=nt.shadow;if(k===void 0){Dt("WebGLShadowMap:",nt,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const et=k.getFrameExtents();if(r.multiply(et),o.copy(k.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(o.x=Math.floor(f/et.x),r.x=o.x*et.x,k.mapSize.x=o.x),r.y>f&&(o.y=Math.floor(f/et.y),r.y=o.y*et.y,k.mapSize.y=o.y)),k.map===null||V===!0||H===!0){const St=this.type!==xn?{minFilter:Ge,magFilter:Ge}:{};k.map!==null&&k.map.dispose(),k.map=new jn(r.x,r.y,St),k.map.texture.name=nt.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ot=k.getViewportCount();for(let St=0;St<ot;St++){const Ht=k.getViewport(St);s.set(o.x*Ht.x,o.y*Ht.y,o.x*Ht.z,o.y*Ht.w),N.viewport(s),k.updateMatrices(nt,St),n=k.getFrustum(),A(L,F,k.camera,nt,this.type)}k.isPointLightShadow!==!0&&this.type===xn&&T(k,F),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(S,M,P)};function T(y,L){const F=t.update(v);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new jn(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(L,null,F,h,v,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(L,null,F,m,v,null)}function E(y,L,F,S){let M=null;const P=F.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(P!==void 0)M=P;else if(M=F.isPointLight===!0?l:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const N=M.uuid,V=L.uuid;let H=c[N];H===void 0&&(H={},c[N]=H);let q=H[V];q===void 0&&(q=M.clone(),H[V]=q,L.addEventListener("dispose",C)),M=q}if(M.visible=L.visible,M.wireframe=L.wireframe,S===xn?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:d[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,F.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const N=i.properties.get(M);N.light=F}return M}function A(y,L,F,S,M){if(y.visible===!1)return;if(y.layers.test(L.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===xn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld);const V=t.update(y),H=y.material;if(Array.isArray(H)){const q=V.groups;for(let W=0,nt=q.length;W<nt;W++){const k=q[W],et=H[k.materialIndex];if(et&&et.visible){const ot=E(y,et,S,M);y.onBeforeShadow(i,y,L,F,V,ot,k),i.renderBufferDirect(F,null,V,ot,y,k),y.onAfterShadow(i,y,L,F,V,ot,k)}}}else if(H.visible){const q=E(y,H,S,M);y.onBeforeShadow(i,y,L,F,V,q,null),i.renderBufferDirect(F,null,V,q,y,null),y.onAfterShadow(i,y,L,F,V,q,null)}}const N=y.children;for(let V=0,H=N.length;V<H;V++)A(N[V],L,F,S,M)}function C(y){y.target.removeEventListener("dispose",C);for(const F in c){const S=c[F],M=y.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Am={[_o]:vo,[Mo]:yo,[So]:Eo,[_i]:bo,[vo]:_o,[yo]:Mo,[Eo]:So,[bo]:_i};function wm(i,t){function e(){let R=!1;const lt=new ce;let it=null;const rt=new ce(0,0,0,0);return{setMask:function(J){it!==J&&!R&&(i.colorMask(J,J,J,J),it=J)},setLocked:function(J){R=J},setClear:function(J,$,ht,Ct,ee){ee===!0&&(J*=Ct,$*=Ct,ht*=Ct),lt.set(J,$,ht,Ct),rt.equals(lt)===!1&&(i.clearColor(J,$,ht,Ct),rt.copy(lt))},reset:function(){R=!1,it=null,rt.set(-1,0,0,0)}}}function n(){let R=!1,lt=!1,it=null,rt=null,J=null;return{setReversed:function($){if(lt!==$){const ht=t.get("EXT_clip_control");$?ht.clipControlEXT(ht.LOWER_LEFT_EXT,ht.ZERO_TO_ONE_EXT):ht.clipControlEXT(ht.LOWER_LEFT_EXT,ht.NEGATIVE_ONE_TO_ONE_EXT),lt=$;const Ct=J;J=null,this.setClear(Ct)}},getReversed:function(){return lt},setTest:function($){$?Z(i.DEPTH_TEST):dt(i.DEPTH_TEST)},setMask:function($){it!==$&&!R&&(i.depthMask($),it=$)},setFunc:function($){if(lt&&($=Am[$]),rt!==$){switch($){case _o:i.depthFunc(i.NEVER);break;case vo:i.depthFunc(i.ALWAYS);break;case Mo:i.depthFunc(i.LESS);break;case _i:i.depthFunc(i.LEQUAL);break;case So:i.depthFunc(i.EQUAL);break;case bo:i.depthFunc(i.GEQUAL);break;case yo:i.depthFunc(i.GREATER);break;case Eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}rt=$}},setLocked:function($){R=$},setClear:function($){J!==$&&(lt&&($=1-$),i.clearDepth($),J=$)},reset:function(){R=!1,it=null,rt=null,J=null,lt=!1}}}function r(){let R=!1,lt=null,it=null,rt=null,J=null,$=null,ht=null,Ct=null,ee=null;return{setTest:function($t){R||($t?Z(i.STENCIL_TEST):dt(i.STENCIL_TEST))},setMask:function($t){lt!==$t&&!R&&(i.stencilMask($t),lt=$t)},setFunc:function($t,on,$e){(it!==$t||rt!==on||J!==$e)&&(i.stencilFunc($t,on,$e),it=$t,rt=on,J=$e)},setOp:function($t,on,$e){($!==$t||ht!==on||Ct!==$e)&&(i.stencilOp($t,on,$e),$=$t,ht=on,Ct=$e)},setLocked:function($t){R=$t},setClear:function($t){ee!==$t&&(i.clearStencil($t),ee=$t)},reset:function(){R=!1,lt=null,it=null,rt=null,J=null,$=null,ht=null,Ct=null,ee=null}}}const o=new e,s=new n,a=new r,l=new WeakMap,c=new WeakMap;let f={},d={},h=new WeakMap,m=[],g=null,v=!1,p=null,u=null,T=null,E=null,A=null,C=null,y=null,L=new Xt(0,0,0),F=0,S=!1,M=null,P=null,N=null,V=null,H=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,nt=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(k)[1]),W=nt>=1):k.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),W=nt>=2);let et=null,ot={};const St=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),Yt=new ce().fromArray(St),Jt=new ce().fromArray(Ht);function Qt(R,lt,it,rt){const J=new Uint8Array(4),$=i.createTexture();i.bindTexture(R,$),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ht=0;ht<it;ht++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,rt,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(lt+ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return $}const Y={};Y[i.TEXTURE_2D]=Qt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Qt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Qt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Qt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),s.setFunc(_i),Bt(!1),zt(Ls),Z(i.CULL_FACE),ne(Sn);function Z(R){f[R]!==!0&&(i.enable(R),f[R]=!0)}function dt(R){f[R]!==!1&&(i.disable(R),f[R]=!1)}function Lt(R,lt){return d[R]!==lt?(i.bindFramebuffer(R,lt),d[R]=lt,R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=lt),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function _t(R,lt){let it=m,rt=!1;if(R){it=h.get(lt),it===void 0&&(it=[],h.set(lt,it));const J=R.textures;if(it.length!==J.length||it[0]!==i.COLOR_ATTACHMENT0){for(let $=0,ht=J.length;$<ht;$++)it[$]=i.COLOR_ATTACHMENT0+$;it.length=J.length,rt=!0}}else it[0]!==i.BACK&&(it[0]=i.BACK,rt=!0);rt&&i.drawBuffers(it)}function Ot(R){return g!==R?(i.useProgram(R),g=R,!0):!1}const _e={[Yn]:i.FUNC_ADD,[Cl]:i.FUNC_SUBTRACT,[Pl]:i.FUNC_REVERSE_SUBTRACT};_e[Ll]=i.MIN,_e[Dl]=i.MAX;const Ft={[Ul]:i.ZERO,[Il]:i.ONE,[Nl]:i.SRC_COLOR,[xo]:i.SRC_ALPHA,[Gl]:i.SRC_ALPHA_SATURATE,[zl]:i.DST_COLOR,[Ol]:i.DST_ALPHA,[Fl]:i.ONE_MINUS_SRC_COLOR,[go]:i.ONE_MINUS_SRC_ALPHA,[Vl]:i.ONE_MINUS_DST_COLOR,[Bl]:i.ONE_MINUS_DST_ALPHA,[Hl]:i.CONSTANT_COLOR,[kl]:i.ONE_MINUS_CONSTANT_COLOR,[Wl]:i.CONSTANT_ALPHA,[Xl]:i.ONE_MINUS_CONSTANT_ALPHA};function ne(R,lt,it,rt,J,$,ht,Ct,ee,$t){if(R===Sn){v===!0&&(dt(i.BLEND),v=!1);return}if(v===!1&&(Z(i.BLEND),v=!0),R!==Rl){if(R!==p||$t!==S){if((u!==Yn||A!==Yn)&&(i.blendEquation(i.FUNC_ADD),u=Yn,A=Yn),$t)switch(R){case xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ds:i.blendFunc(i.ONE,i.ONE);break;case Us:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Is:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:fe("WebGLState: Invalid blending: ",R);break}else switch(R){case xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Us:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Is:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",R);break}T=null,E=null,C=null,y=null,L.set(0,0,0),F=0,p=R,S=$t}return}J=J||lt,$=$||it,ht=ht||rt,(lt!==u||J!==A)&&(i.blendEquationSeparate(_e[lt],_e[J]),u=lt,A=J),(it!==T||rt!==E||$!==C||ht!==y)&&(i.blendFuncSeparate(Ft[it],Ft[rt],Ft[$],Ft[ht]),T=it,E=rt,C=$,y=ht),(Ct.equals(L)===!1||ee!==F)&&(i.blendColor(Ct.r,Ct.g,Ct.b,ee),L.copy(Ct),F=ee),p=R,S=!1}function w(R,lt){R.side===gn?dt(i.CULL_FACE):Z(i.CULL_FACE);let it=R.side===Ne;lt&&(it=!it),Bt(it),R.blending===xi&&R.transparent===!1?ne(Sn):ne(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),o.setMask(R.colorWrite);const rt=R.stencilWrite;a.setTest(rt),rt&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),pt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(R){M!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),M=R)}function zt(R){R!==Tl?(Z(i.CULL_FACE),R!==P&&(R===Ls?i.cullFace(i.BACK):R===Al?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):dt(i.CULL_FACE),P=R}function te(R){R!==N&&(W&&i.lineWidth(R),N=R)}function pt(R,lt,it){R?(Z(i.POLYGON_OFFSET_FILL),(V!==lt||H!==it)&&(i.polygonOffset(lt,it),V=lt,H=it)):dt(i.POLYGON_OFFSET_FILL)}function re(R){R?Z(i.SCISSOR_TEST):dt(i.SCISSOR_TEST)}function Mt(R){R===void 0&&(R=i.TEXTURE0+q-1),et!==R&&(i.activeTexture(R),et=R)}function Pt(R,lt,it){it===void 0&&(et===null?it=i.TEXTURE0+q-1:it=et);let rt=ot[it];rt===void 0&&(rt={type:void 0,texture:void 0},ot[it]=rt),(rt.type!==R||rt.texture!==lt)&&(et!==it&&(i.activeTexture(it),et=it),i.bindTexture(R,lt||Y[R]),rt.type=R,rt.texture=lt)}function b(){const R=ot[et];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function X(){try{i.texSubImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function K(){try{i.texSubImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function gt(){try{i.compressedTexSubImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function at(){try{i.texStorage2D(...arguments)}catch(R){R("WebGLState:",R)}}function bt(){try{i.texStorage3D(...arguments)}catch(R){R("WebGLState:",R)}}function xt(){try{i.texImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function j(){try{i.texImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function tt(R){Yt.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),Yt.copy(R))}function At(R){Jt.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),Jt.copy(R))}function Et(R,lt){let it=c.get(lt);it===void 0&&(it=new WeakMap,c.set(lt,it));let rt=it.get(R);rt===void 0&&(rt=i.getUniformBlockIndex(lt,R.name),it.set(R,rt))}function ft(R,lt){const rt=c.get(lt).get(R);l.get(lt)!==rt&&(i.uniformBlockBinding(lt,rt,R.__bindingPointIndex),l.set(lt,rt))}function Rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},et=null,ot={},d={},h=new WeakMap,m=[],g=null,v=!1,p=null,u=null,T=null,E=null,A=null,C=null,y=null,L=new Xt(0,0,0),F=0,S=!1,M=null,P=null,N=null,V=null,H=null,Yt.set(0,0,i.canvas.width,i.canvas.height),Jt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:Z,disable:dt,bindFramebuffer:Lt,drawBuffers:_t,useProgram:Ot,setBlending:ne,setMaterial:w,setFlipSided:Bt,setCullFace:zt,setLineWidth:te,setPolygonOffset:pt,setScissorTest:re,activeTexture:Mt,bindTexture:Pt,unbindTexture:b,compressedTexImage2D:x,compressedTexImage3D:I,texImage2D:xt,texImage3D:j,updateUBOMapping:Et,uniformBlockBinding:ft,texStorage2D:at,texStorage3D:bt,texSubImage2D:X,texSubImage3D:K,compressedTexSubImage2D:G,compressedTexSubImage3D:gt,scissor:tt,viewport:At,reset:Rt}}function Rm(i,t,e,n,r,o,s){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qt,f=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return m?new OffscreenCanvas(b,x):wr("canvas")}function v(b,x,I){let X=1;const K=Pt(b);if((K.width>I||K.height>I)&&(X=I/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const G=Math.floor(X*K.width),gt=Math.floor(X*K.height);d===void 0&&(d=g(G,gt));const at=x?g(G,gt):d;return at.width=G,at.height=gt,at.getContext("2d").drawImage(b,0,0,G,gt),Dt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+gt+")."),at}else return"data"in b&&Dt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function p(b){return b.generateMipmaps}function u(b){i.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,x,I,X,K=!1){if(b!==null){if(i[b]!==void 0)return i[b];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let G=x;if(x===i.RED&&(I===i.FLOAT&&(G=i.R32F),I===i.HALF_FLOAT&&(G=i.R16F),I===i.UNSIGNED_BYTE&&(G=i.R8)),x===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(G=i.R8UI),I===i.UNSIGNED_SHORT&&(G=i.R16UI),I===i.UNSIGNED_INT&&(G=i.R32UI),I===i.BYTE&&(G=i.R8I),I===i.SHORT&&(G=i.R16I),I===i.INT&&(G=i.R32I)),x===i.RG&&(I===i.FLOAT&&(G=i.RG32F),I===i.HALF_FLOAT&&(G=i.RG16F),I===i.UNSIGNED_BYTE&&(G=i.RG8)),x===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(G=i.RG8UI),I===i.UNSIGNED_SHORT&&(G=i.RG16UI),I===i.UNSIGNED_INT&&(G=i.RG32UI),I===i.BYTE&&(G=i.RG8I),I===i.SHORT&&(G=i.RG16I),I===i.INT&&(G=i.RG32I)),x===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(G=i.RGB8UI),I===i.UNSIGNED_SHORT&&(G=i.RGB16UI),I===i.UNSIGNED_INT&&(G=i.RGB32UI),I===i.BYTE&&(G=i.RGB8I),I===i.SHORT&&(G=i.RGB16I),I===i.INT&&(G=i.RGB32I)),x===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),I===i.UNSIGNED_INT&&(G=i.RGBA32UI),I===i.BYTE&&(G=i.RGBA8I),I===i.SHORT&&(G=i.RGBA16I),I===i.INT&&(G=i.RGBA32I)),x===i.RGB&&(I===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),x===i.RGBA){const gt=K?Tr:Wt.getTransfer(X);I===i.FLOAT&&(G=i.RGBA32F),I===i.HALF_FLOAT&&(G=i.RGBA16F),I===i.UNSIGNED_BYTE&&(G=gt===Zt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function A(b,x){let I;return b?x===null||x===Zn||x===Oi?I=i.DEPTH24_STENCIL8:x===Mn?I=i.DEPTH32F_STENCIL8:x===Fi&&(I=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Zn||x===Oi?I=i.DEPTH_COMPONENT24:x===Mn?I=i.DEPTH_COMPONENT32F:x===Fi&&(I=i.DEPTH_COMPONENT16),I}function C(b,x){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ge&&b.minFilter!==qe?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function y(b){const x=b.target;x.removeEventListener("dispose",y),F(x),x.isVideoTexture&&f.delete(x)}function L(b){const x=b.target;x.removeEventListener("dispose",L),M(x)}function F(b){const x=n.get(b);if(x.__webglInit===void 0)return;const I=b.source,X=h.get(I);if(X){const K=X[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(b),Object.keys(X).length===0&&h.delete(I)}n.remove(b)}function S(b){const x=n.get(b);i.deleteTexture(x.__webglTexture);const I=b.source,X=h.get(I);delete X[x.__cacheKey],s.memory.textures--}function M(b){const x=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let K=0;K<x.__webglFramebuffer[X].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[X][K]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const I=b.textures;for(let X=0,K=I.length;X<K;X++){const G=n.get(I[X]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),s.memory.textures--),n.remove(I[X])}n.remove(b)}let P=0;function N(){P=0}function V(){const b=P;return b>=r.maxTextures&&Dt("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),P+=1,b}function H(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function q(b,x){const I=n.get(b);if(b.isVideoTexture&&re(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const X=b.image;if(X===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(I,b,x);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+x)}function W(b,x){const I=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){Y(I,b,x);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+x)}function nt(b,x){const I=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){Y(I,b,x);return}e.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+x)}function k(b,x){const I=n.get(b);if(b.version>0&&I.__version!==b.version){Z(I,b,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+x)}const et={[Er]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[wo]:i.MIRRORED_REPEAT},ot={[Ge]:i.NEAREST,[tc]:i.NEAREST_MIPMAP_NEAREST,[Qi]:i.NEAREST_MIPMAP_LINEAR,[qe]:i.LINEAR,[Br]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},St={[rc]:i.NEVER,[fc]:i.ALWAYS,[oc]:i.LESS,[qa]:i.LEQUAL,[sc]:i.EQUAL,[cc]:i.GEQUAL,[ac]:i.GREATER,[lc]:i.NOTEQUAL};function Ht(b,x){if(x.type===Mn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===qe||x.magFilter===Br||x.magFilter===Qi||x.magFilter===Kn||x.minFilter===qe||x.minFilter===Br||x.minFilter===Qi||x.minFilter===Kn)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,et[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,et[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,et[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ot[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ot[x.minFilter]),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,St[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ge||x.minFilter!==Qi&&x.minFilter!==Kn||x.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Yt(b,x){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",y));const X=x.source;let K=h.get(X);K===void 0&&(K={},h.set(X,K));const G=H(x);if(G!==b.__cacheKey){K[G]===void 0&&(K[G]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,I=!0),K[G].usedTimes++;const gt=K[b.__cacheKey];gt!==void 0&&(K[b.__cacheKey].usedTimes--,gt.usedTimes===0&&S(x)),b.__cacheKey=G,b.__webglTexture=K[G].texture}return I}function Jt(b,x,I){return Math.floor(Math.floor(b/I)/x)}function Qt(b,x,I,X){const G=b.updateRanges;if(G.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,I,X,x.data);else{G.sort((j,tt)=>j.start-tt.start);let gt=0;for(let j=1;j<G.length;j++){const tt=G[gt],At=G[j],Et=tt.start+tt.count,ft=Jt(At.start,x.width,4),Rt=Jt(tt.start,x.width,4);At.start<=Et+1&&ft===Rt&&Jt(At.start+At.count-1,x.width,4)===ft?tt.count=Math.max(tt.count,At.start+At.count-tt.start):(++gt,G[gt]=At)}G.length=gt+1;const at=i.getParameter(i.UNPACK_ROW_LENGTH),bt=i.getParameter(i.UNPACK_SKIP_PIXELS),xt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let j=0,tt=G.length;j<tt;j++){const At=G[j],Et=Math.floor(At.start/4),ft=Math.ceil(At.count/4),Rt=Et%x.width,R=Math.floor(Et/x.width),lt=ft,it=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Rt),i.pixelStorei(i.UNPACK_SKIP_ROWS,R),e.texSubImage2D(i.TEXTURE_2D,0,Rt,R,lt,it,I,X,x.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,at),i.pixelStorei(i.UNPACK_SKIP_PIXELS,bt),i.pixelStorei(i.UNPACK_SKIP_ROWS,xt)}}function Y(b,x,I){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);const K=Yt(b,x),G=x.source;e.bindTexture(X,b.__webglTexture,i.TEXTURE0+I);const gt=n.get(G);if(G.version!==gt.__version||K===!0){e.activeTexture(i.TEXTURE0+I);const at=Wt.getPrimaries(Wt.workingColorSpace),bt=x.colorSpace===Dn?null:Wt.getPrimaries(x.colorSpace),xt=x.colorSpace===Dn||at===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let j=v(x.image,!1,r.maxTextureSize);j=Mt(x,j);const tt=o.convert(x.format,x.colorSpace),At=o.convert(x.type);let Et=E(x.internalFormat,tt,At,x.colorSpace,x.isVideoTexture);Ht(X,x);let ft;const Rt=x.mipmaps,R=x.isVideoTexture!==!0,lt=gt.__version===void 0||K===!0,it=G.dataReady,rt=C(x,j);if(x.isDepthTexture)Et=A(x.format===zi,x.type),lt&&(R?e.texStorage2D(i.TEXTURE_2D,1,Et,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,Et,j.width,j.height,0,tt,At,null));else if(x.isDataTexture)if(Rt.length>0){R&&lt&&e.texStorage2D(i.TEXTURE_2D,rt,Et,Rt[0].width,Rt[0].height);for(let J=0,$=Rt.length;J<$;J++)ft=Rt[J],R?it&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ft.width,ft.height,tt,At,ft.data):e.texImage2D(i.TEXTURE_2D,J,Et,ft.width,ft.height,0,tt,At,ft.data);x.generateMipmaps=!1}else R?(lt&&e.texStorage2D(i.TEXTURE_2D,rt,Et,j.width,j.height),it&&Qt(x,j,tt,At)):e.texImage2D(i.TEXTURE_2D,0,Et,j.width,j.height,0,tt,At,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){R&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Et,Rt[0].width,Rt[0].height,j.depth);for(let J=0,$=Rt.length;J<$;J++)if(ft=Rt[J],x.format!==en)if(tt!==null)if(R){if(it)if(x.layerUpdates.size>0){const ht=oa(ft.width,ft.height,x.format,x.type);for(const Ct of x.layerUpdates){const ee=ft.data.subarray(Ct*ht/ft.data.BYTES_PER_ELEMENT,(Ct+1)*ht/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Ct,ft.width,ft.height,1,tt,ee)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ft.width,ft.height,j.depth,tt,ft.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Et,ft.width,ft.height,j.depth,0,ft.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?it&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ft.width,ft.height,j.depth,tt,At,ft.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,Et,ft.width,ft.height,j.depth,0,tt,At,ft.data)}else{R&&lt&&e.texStorage2D(i.TEXTURE_2D,rt,Et,Rt[0].width,Rt[0].height);for(let J=0,$=Rt.length;J<$;J++)ft=Rt[J],x.format!==en?tt!==null?R?it&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ft.width,ft.height,tt,ft.data):e.compressedTexImage2D(i.TEXTURE_2D,J,Et,ft.width,ft.height,0,ft.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?it&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ft.width,ft.height,tt,At,ft.data):e.texImage2D(i.TEXTURE_2D,J,Et,ft.width,ft.height,0,tt,At,ft.data)}else if(x.isDataArrayTexture)if(R){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Et,j.width,j.height,j.depth),it)if(x.layerUpdates.size>0){const J=oa(j.width,j.height,x.format,x.type);for(const $ of x.layerUpdates){const ht=j.data.subarray($*J/j.data.BYTES_PER_ELEMENT,($+1)*J/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,j.width,j.height,1,tt,At,ht)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,tt,At,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,j.width,j.height,j.depth,0,tt,At,j.data);else if(x.isData3DTexture)R?(lt&&e.texStorage3D(i.TEXTURE_3D,rt,Et,j.width,j.height,j.depth),it&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,tt,At,j.data)):e.texImage3D(i.TEXTURE_3D,0,Et,j.width,j.height,j.depth,0,tt,At,j.data);else if(x.isFramebufferTexture){if(lt)if(R)e.texStorage2D(i.TEXTURE_2D,rt,Et,j.width,j.height);else{let J=j.width,$=j.height;for(let ht=0;ht<rt;ht++)e.texImage2D(i.TEXTURE_2D,ht,Et,J,$,0,tt,At,null),J>>=1,$>>=1}}else if(Rt.length>0){if(R&&lt){const J=Pt(Rt[0]);e.texStorage2D(i.TEXTURE_2D,rt,Et,J.width,J.height)}for(let J=0,$=Rt.length;J<$;J++)ft=Rt[J],R?it&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,tt,At,ft):e.texImage2D(i.TEXTURE_2D,J,Et,tt,At,ft);x.generateMipmaps=!1}else if(R){if(lt){const J=Pt(j);e.texStorage2D(i.TEXTURE_2D,rt,Et,J.width,J.height)}it&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt,At,j)}else e.texImage2D(i.TEXTURE_2D,0,Et,tt,At,j);p(x)&&u(X),gt.__version=G.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Z(b,x,I){if(x.image.length!==6)return;const X=Yt(b,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+I);const G=n.get(K);if(K.version!==G.__version||X===!0){e.activeTexture(i.TEXTURE0+I);const gt=Wt.getPrimaries(Wt.workingColorSpace),at=x.colorSpace===Dn?null:Wt.getPrimaries(x.colorSpace),bt=x.colorSpace===Dn||gt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const xt=x.isCompressedTexture||x.image[0].isCompressedTexture,j=x.image[0]&&x.image[0].isDataTexture,tt=[];for(let $=0;$<6;$++)!xt&&!j?tt[$]=v(x.image[$],!0,r.maxCubemapSize):tt[$]=j?x.image[$].image:x.image[$],tt[$]=Mt(x,tt[$]);const At=tt[0],Et=o.convert(x.format,x.colorSpace),ft=o.convert(x.type),Rt=E(x.internalFormat,Et,ft,x.colorSpace),R=x.isVideoTexture!==!0,lt=G.__version===void 0||X===!0,it=K.dataReady;let rt=C(x,At);Ht(i.TEXTURE_CUBE_MAP,x);let J;if(xt){R&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Rt,At.width,At.height);for(let $=0;$<6;$++){J=tt[$].mipmaps;for(let ht=0;ht<J.length;ht++){const Ct=J[ht];x.format!==en?Et!==null?R?it&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,0,0,Ct.width,Ct.height,Et,Ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,Rt,Ct.width,Ct.height,0,Ct.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,0,0,Ct.width,Ct.height,Et,ft,Ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,Rt,Ct.width,Ct.height,0,Et,ft,Ct.data)}}}else{if(J=x.mipmaps,R&&lt){J.length>0&&rt++;const $=Pt(tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Rt,$.width,$.height)}for(let $=0;$<6;$++)if(j){R?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,tt[$].width,tt[$].height,Et,ft,tt[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Rt,tt[$].width,tt[$].height,0,Et,ft,tt[$].data);for(let ht=0;ht<J.length;ht++){const ee=J[ht].image[$].image;R?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,0,0,ee.width,ee.height,Et,ft,ee.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,Rt,ee.width,ee.height,0,Et,ft,ee.data)}}else{R?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Et,ft,tt[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Rt,Et,ft,tt[$]);for(let ht=0;ht<J.length;ht++){const Ct=J[ht];R?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,0,0,Et,ft,Ct.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,Rt,Et,ft,Ct.image[$])}}}p(x)&&u(i.TEXTURE_CUBE_MAP),G.__version=K.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function dt(b,x,I,X,K,G){const gt=o.convert(I.format,I.colorSpace),at=o.convert(I.type),bt=E(I.internalFormat,gt,at,I.colorSpace),xt=n.get(x),j=n.get(I);if(j.__renderTarget=x,!xt.__hasExternalTextures){const tt=Math.max(1,x.width>>G),At=Math.max(1,x.height>>G);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,G,bt,tt,At,x.depth,0,gt,at,null):e.texImage2D(K,G,bt,tt,At,0,gt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),pt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,K,j.__webglTexture,0,te(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,K,j.__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(b,x,I){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer){const X=x.depthTexture,K=X&&X.isDepthTexture?X.type:null,G=A(x.stencilBuffer,K),gt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=te(x);pt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,G,x.width,x.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,G,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,G,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,b)}else{const X=x.textures;for(let K=0;K<X.length;K++){const G=X[K],gt=o.convert(G.format,G.colorSpace),at=o.convert(G.type),bt=E(G.internalFormat,gt,at,G.colorSpace),xt=te(x);I&&pt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,bt,x.width,x.height):pt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,bt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,bt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _t(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q(x.depthTexture,0);const K=X.__webglTexture,G=te(x);if(x.depthTexture.format===Bi)pt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===zi)pt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ot(b){const x=n.get(b),I=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const X=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=X}if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");const X=b.texture.mipmaps;X&&X.length>0?_t(x.__webglFramebuffer[0],b):_t(x.__webglFramebuffer,b)}else if(I){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Lt(x.__webglDepthbuffer[X],b,!1);else{const K=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,G)}}else{const X=b.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Lt(x.__webglDepthbuffer,b,!1);else{const K=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,G)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(b,x,I){const X=n.get(b);x!==void 0&&dt(X.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&Ot(b)}function Ft(b){const x=b.texture,I=n.get(b),X=n.get(x);b.addEventListener("dispose",L);const K=b.textures,G=b.isWebGLCubeRenderTarget===!0,gt=K.length>1;if(gt||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,s.memory.textures++),G){I.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer[at]=[];for(let bt=0;bt<x.mipmaps.length;bt++)I.__webglFramebuffer[at][bt]=i.createFramebuffer()}else I.__webglFramebuffer[at]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)I.__webglFramebuffer[at]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(gt)for(let at=0,bt=K.length;at<bt;at++){const xt=n.get(K[at]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),s.memory.textures++)}if(b.samples>0&&pt(b)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let at=0;at<K.length;at++){const bt=K[at];I.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[at]);const xt=o.convert(bt.format,bt.colorSpace),j=o.convert(bt.type),tt=E(bt.internalFormat,xt,j,bt.colorSpace,b.isXRRenderTarget===!0),At=te(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,At,tt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,I.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Lt(I.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ht(i.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let bt=0;bt<x.mipmaps.length;bt++)dt(I.__webglFramebuffer[at][bt],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,bt);else dt(I.__webglFramebuffer[at],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);p(x)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let at=0,bt=K.length;at<bt;at++){const xt=K[at],j=n.get(xt);let tt=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(tt=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,j.__webglTexture),Ht(tt,xt),dt(I.__webglFramebuffer,b,xt,i.COLOR_ATTACHMENT0+at,tt,0),p(xt)&&u(tt)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(at=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,X.__webglTexture),Ht(at,x),x.mipmaps&&x.mipmaps.length>0)for(let bt=0;bt<x.mipmaps.length;bt++)dt(I.__webglFramebuffer[bt],b,x,i.COLOR_ATTACHMENT0,at,bt);else dt(I.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,at,0);p(x)&&u(at),e.unbindTexture()}b.depthBuffer&&Ot(b)}function ne(b){const x=b.textures;for(let I=0,X=x.length;I<X;I++){const K=x[I];if(p(K)){const G=T(b),gt=n.get(K).__webglTexture;e.bindTexture(G,gt),u(G),e.unbindTexture()}}}const w=[],Bt=[];function zt(b){if(b.samples>0){if(pt(b)===!1){const x=b.textures,I=b.width,X=b.height;let K=i.COLOR_BUFFER_BIT;const G=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(b),at=x.length>1;if(at)for(let xt=0;xt<x.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const bt=b.texture.mipmaps;bt&&bt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let xt=0;xt<x.length;xt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[xt]);const j=n.get(x[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,j,0)}i.blitFramebuffer(0,0,I,X,0,0,I,X,K,i.NEAREST),l===!0&&(w.length=0,Bt.length=0,w.push(i.COLOR_ATTACHMENT0+xt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(w.push(G),Bt.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Bt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,w))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let xt=0;xt<x.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[xt]);const j=n.get(x[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,j,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const x=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function te(b){return Math.min(r.maxSamples,b.samples)}function pt(b){const x=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function re(b){const x=s.render.frame;f.get(b)!==x&&(f.set(b,x),b.update())}function Mt(b,x){const I=b.colorSpace,X=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==Si&&I!==Dn&&(Wt.getTransfer(I)===Zt?(X!==en||K!==ln)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",I)),x}function Pt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=N,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=nt,this.setTextureCube=k,this.rebindTextures=_e,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=pt}function Cm(i,t){function e(n,r=Dn){let o;const s=Wt.getTransfer(r);if(n===ln)return i.UNSIGNED_BYTE;if(n===fs)return i.UNSIGNED_SHORT_4_4_4_4;if(n===us)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Va)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ga)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ba)return i.BYTE;if(n===za)return i.SHORT;if(n===Fi)return i.UNSIGNED_SHORT;if(n===cs)return i.INT;if(n===Zn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===yi)return i.HALF_FLOAT;if(n===Ha)return i.ALPHA;if(n===ka)return i.RGB;if(n===en)return i.RGBA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===zi)return i.DEPTH_STENCIL;if(n===Wa)return i.RED;if(n===ds)return i.RED_INTEGER;if(n===hs)return i.RG;if(n===ms)return i.RG_INTEGER;if(n===ps)return i.RGBA_INTEGER;if(n===vr||n===Mr||n===Sr||n===br)if(s===Zt)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===vr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===br)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===vr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===br)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ro||n===Co||n===Po||n===Lo)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Ro)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Co)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Po)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Do||n===Uo||n===Io)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Do||n===Uo)return s===Zt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Io)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===No||n===Fo||n===Oo||n===Bo||n===zo||n===Vo||n===Go||n===Ho||n===ko||n===Wo||n===Xo||n===qo||n===Yo||n===$o)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===No)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===zo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Go)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ho)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ko)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===qo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yo)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$o)return s===Zt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ko||n===Zo||n===jo)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Ko)return s===Zt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Jo||n===Qo||n===ts||n===es)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Jo)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Qo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ts)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===es)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Oi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Pm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Dm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new il(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new yn({vertexShader:Pm,fragmentShader:Lm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ve(new Zi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Um extends Ei{constructor(t,e){super();const n=this;let r=null,o=1,s=null,a="local-floor",l=1,c=null,f=null,d=null,h=null,m=null,g=null;const v=typeof XRWebGLBinding<"u",p=new Dm,u={},T=e.getContextAttributes();let E=null,A=null;const C=[],y=[],L=new qt;let F=null;const S=new Je;S.viewport=new ce;const M=new Je;M.viewport=new ce;const P=[S,M],N=new jc;let V=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=C[Y];return Z===void 0&&(Z=new ao,C[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=C[Y];return Z===void 0&&(Z=new ao,C[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=C[Y];return Z===void 0&&(Z=new ao,C[Y]=Z),Z.getHandSpace()};function q(Y){const Z=y.indexOf(Y.inputSource);if(Z===-1)return;const dt=C[Z];dt!==void 0&&(dt.update(Y.inputSource,Y.frame,c||s),dt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",nt);for(let Y=0;Y<C.length;Y++){const Z=y[Y];Z!==null&&(y[Y]=null,C[Y].disconnect(Z))}V=null,H=null,p.reset();for(const Y in u)delete u[Y];t.setRenderTarget(E),m=null,h=null,d=null,r=null,A=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){o=Y,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,e)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(E=t.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",W),r.addEventListener("inputsourceschange",nt),T.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,Lt=null,_t=null;T.depth&&(_t=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=T.stencil?zi:Bi,Lt=T.stencil?Oi:Zn);const Ot={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:o};d=this.getBinding(),h=d.createProjectionLayer(Ot),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),A=new jn(h.textureWidth,h.textureHeight,{format:en,type:ln,depthTexture:new nl(h.textureWidth,h.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const dt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(r,e,dt),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),A=new jn(m.framebufferWidth,m.framebufferHeight,{format:en,type:ln,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(a),Qt.setContext(r),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function nt(Y){for(let Z=0;Z<Y.removed.length;Z++){const dt=Y.removed[Z],Lt=y.indexOf(dt);Lt>=0&&(y[Lt]=null,C[Lt].disconnect(dt))}for(let Z=0;Z<Y.added.length;Z++){const dt=Y.added[Z];let Lt=y.indexOf(dt);if(Lt===-1){for(let Ot=0;Ot<C.length;Ot++)if(Ot>=y.length){y.push(dt),Lt=Ot;break}else if(y[Ot]===null){y[Ot]=dt,Lt=Ot;break}if(Lt===-1)break}const _t=C[Lt];_t&&_t.connect(dt)}}const k=new O,et=new O;function ot(Y,Z,dt){k.setFromMatrixPosition(Z.matrixWorld),et.setFromMatrixPosition(dt.matrixWorld);const Lt=k.distanceTo(et),_t=Z.projectionMatrix.elements,Ot=dt.projectionMatrix.elements,_e=_t[14]/(_t[10]-1),Ft=_t[14]/(_t[10]+1),ne=(_t[9]+1)/_t[5],w=(_t[9]-1)/_t[5],Bt=(_t[8]-1)/_t[0],zt=(Ot[8]+1)/Ot[0],te=_e*Bt,pt=_e*zt,re=Lt/(-Bt+zt),Mt=re*-Bt;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Mt),Y.translateZ(re),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),_t[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Pt=_e+re,b=Ft+re,x=te-Mt,I=pt+(Lt-Mt),X=ne*Ft/b*Pt,K=w*Ft/b*Pt;Y.projectionMatrix.makePerspective(x,I,X,K,Pt,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function St(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let Z=Y.near,dt=Y.far;p.texture!==null&&(p.depthNear>0&&(Z=p.depthNear),p.depthFar>0&&(dt=p.depthFar)),N.near=M.near=S.near=Z,N.far=M.far=S.far=dt,(V!==N.near||H!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),V=N.near,H=N.far),N.layers.mask=Y.layers.mask|6,S.layers.mask=N.layers.mask&3,M.layers.mask=N.layers.mask&5;const Lt=Y.parent,_t=N.cameras;St(N,Lt);for(let Ot=0;Ot<_t.length;Ot++)St(_t[Ot],Lt);_t.length===2?ot(N,S,M):N.projectionMatrix.copy(S.projectionMatrix),Ht(Y,N,Lt)};function Ht(Y,Z,dt){dt===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(dt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ns*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(N)},this.getCameraTexture=function(Y){return u[Y]};let Yt=null;function Jt(Y,Z){if(f=Z.getViewerPose(c||s),g=Z,f!==null){const dt=f.views;m!==null&&(t.setRenderTargetFramebuffer(A,m.framebuffer),t.setRenderTarget(A));let Lt=!1;dt.length!==N.cameras.length&&(N.cameras.length=0,Lt=!0);for(let Ft=0;Ft<dt.length;Ft++){const ne=dt[Ft];let w=null;if(m!==null)w=m.getViewport(ne);else{const zt=d.getViewSubImage(h,ne);w=zt.viewport,Ft===0&&(t.setRenderTargetTextures(A,zt.colorTexture,zt.depthStencilTexture),t.setRenderTarget(A))}let Bt=P[Ft];Bt===void 0&&(Bt=new Je,Bt.layers.enable(Ft),Bt.viewport=new ce,P[Ft]=Bt),Bt.matrix.fromArray(ne.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(ne.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(w.x,w.y,w.width,w.height),Ft===0&&(N.matrix.copy(Bt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Lt===!0&&N.cameras.push(Bt)}const _t=r.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const Ft=d.getDepthInformation(dt[0]);Ft&&Ft.isValid&&Ft.texture&&p.init(Ft,r.renderState)}if(_t&&_t.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let Ft=0;Ft<dt.length;Ft++){const ne=dt[Ft].camera;if(ne){let w=u[ne];w||(w=new il,u[ne]=w);const Bt=d.getCameraImage(ne);w.sourceTexture=Bt}}}}for(let dt=0;dt<C.length;dt++){const Lt=y[dt],_t=C[dt];Lt!==null&&_t!==void 0&&_t.update(Lt,Z,c||s)}Yt&&Yt(Y,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Qt=new ol;Qt.setAnimationLoop(Jt),this.setAnimationLoop=function(Y){Yt=Y},this.dispose=function(){}}}const Xn=new cn,Im=new ue;function Nm(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,Qa(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,T,E,A){u.isMeshBasicMaterial||u.isMeshLambertMaterial?o(p,u):u.isMeshToonMaterial?(o(p,u),d(p,u)):u.isMeshPhongMaterial?(o(p,u),f(p,u)):u.isMeshStandardMaterial?(o(p,u),h(p,u),u.isMeshPhysicalMaterial&&m(p,u,A)):u.isMeshMatcapMaterial?(o(p,u),g(p,u)):u.isMeshDepthMaterial?o(p,u):u.isMeshDistanceMaterial?(o(p,u),v(p,u)):u.isMeshNormalMaterial?o(p,u):u.isLineBasicMaterial?(s(p,u),u.isLineDashedMaterial&&a(p,u)):u.isPointsMaterial?l(p,u,T,E):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function o(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Ne&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Ne&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const T=t.get(u),E=T.envMap,A=T.envMapRotation;E&&(p.envMap.value=E,Xn.copy(A),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),p.envMapRotation.value.setFromMatrix4(Im.makeRotationFromEuler(Xn)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function s(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function a(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,T,E){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*T,p.scale.value=E*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function f(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function h(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,T){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ne&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function v(p,u){const T=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Fm(i,t,e,n){let r={},o={},s=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const A=E.program;n.uniformBlockBinding(T,A)}function c(T,E){let A=r[T.id];A===void 0&&(g(T),A=f(T),r[T.id]=A,T.addEventListener("dispose",p));const C=E.program;n.updateUBOMapping(T,C);const y=t.render.frame;o[T.id]!==y&&(h(T),o[T.id]=y)}function f(T){const E=d();T.__bindingPointIndex=E;const A=i.createBuffer(),C=T.__size,y=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,A),A}function d(){for(let T=0;T<a;T++)if(s.indexOf(T)===-1)return s.push(T),T;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const E=r[T.id],A=T.uniforms,C=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let y=0,L=A.length;y<L;y++){const F=Array.isArray(A[y])?A[y]:[A[y]];for(let S=0,M=F.length;S<M;S++){const P=F[S];if(m(P,y,S,C)===!0){const N=P.__offset,V=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let q=0;q<V.length;q++){const W=V[q],nt=v(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,N+H,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,H),H+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,E,A,C){const y=T.value,L=E+"_"+A;if(C[L]===void 0)return typeof y=="number"||typeof y=="boolean"?C[L]=y:C[L]=y.clone(),!0;{const F=C[L];if(typeof y=="number"||typeof y=="boolean"){if(F!==y)return C[L]=y,!0}else if(F.equals(y)===!1)return F.copy(y),!0}return!1}function g(T){const E=T.uniforms;let A=0;const C=16;for(let L=0,F=E.length;L<F;L++){const S=Array.isArray(E[L])?E[L]:[E[L]];for(let M=0,P=S.length;M<P;M++){const N=S[M],V=Array.isArray(N.value)?N.value:[N.value];for(let H=0,q=V.length;H<q;H++){const W=V[H],nt=v(W),k=A%C,et=k%nt.boundary,ot=k+et;A+=et,ot!==0&&C-ot<nt.storage&&(A+=C-ot),N.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=A,A+=nt.storage}}}const y=A%C;return y>0&&(A+=C-y),T.__size=A,T.__cache={},this}function v(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Dt("WebGLRenderer: Unsupported uniform value type.",T),E}function p(T){const E=T.target;E.removeEventListener("dispose",p);const A=s.indexOf(E.__bindingPointIndex);s.splice(A,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete o[E.id]}function u(){for(const T in r)i.deleteBuffer(r[T]);s=[],r={},o={}}return{bind:l,update:c,dispose:u}}const Om=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let pn=null;function Bm(){return pn===null&&(pn=new Vc(Om,32,32,hs,yi),pn.minFilter=qe,pn.magFilter=qe,pn.wrapS=vn,pn.wrapT=vn,pn.generateMipmaps=!1,pn.needsUpdate=!0),pn}class zm{constructor(t={}){const{canvas:e=uc(),context:n=null,depth:r=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=s;const g=new Set([ps,ms,ds]),v=new Set([ln,Zn,Fi,Oi,fs,us]),p=new Uint32Array(4),u=new Int32Array(4);let T=null,E=null;const A=[],C=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let L=!1;this._outputColorSpace=Ie;let F=0,S=0,M=null,P=-1,N=null;const V=new ce,H=new ce;let q=null;const W=new Xt(0);let nt=0,k=e.width,et=e.height,ot=1,St=null,Ht=null;const Yt=new ce(0,0,k,et),Jt=new ce(0,0,k,et);let Qt=!1;const Y=new _s;let Z=!1,dt=!1;const Lt=new ue,_t=new O,Ot=new ce,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function ne(){return M===null?ot:1}let w=n;function Bt(_,D){return e.getContext(_,D)}try{const _={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ls}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",ht,!1),w===null){const D="webgl2";if(w=Bt(D,_),w===null)throw Bt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw _("WebGLRenderer: "+_.message),_}let zt,te,pt,re,Mt,Pt,b,x,I,X,K,G,gt,at,bt,xt,j,tt,At,Et,ft,Rt,R,lt;function it(){zt=new Yd(w),zt.init(),Rt=new Cm(w,zt),te=new Bd(w,zt,t,Rt),pt=new wm(w,zt),te.reversedDepthBuffer&&h&&pt.buffers.depth.setReversed(!0),re=new Zd(w),Mt=new mm,Pt=new Rm(w,zt,pt,Mt,te,Rt,re),b=new Vd(y),x=new qd(y),I=new Qc(w),R=new Fd(w,I),X=new $d(w,I,re,R),K=new Jd(w,X,I,re),At=new jd(w,te,Pt),xt=new zd(Mt),G=new hm(y,b,x,zt,te,R,xt),gt=new Nm(y,Mt),at=new xm,bt=new bm(zt),tt=new Nd(y,b,x,pt,K,m,l),j=new Tm(y,K,te),lt=new Fm(w,re,te,pt),Et=new Od(w,zt,re),ft=new Kd(w,zt,re),re.programs=G.programs,y.capabilities=te,y.extensions=zt,y.properties=Mt,y.renderLists=at,y.shadowMap=j,y.state=pt,y.info=re}it();const rt=new Um(y,w);this.xr=rt,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const _=zt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){const _=zt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(_){_!==void 0&&(ot=_,this.setSize(k,et,!1))},this.getSize=function(_){return _.set(k,et)},this.setSize=function(_,D,B=!0){if(rt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}k=_,et=D,e.width=Math.floor(_*ot),e.height=Math.floor(D*ot),B===!0&&(e.style.width=_+"px",e.style.height=D+"px"),this.setViewport(0,0,_,D)},this.getDrawingBufferSize=function(_){return _.set(k*ot,et*ot).floor()},this.setDrawingBufferSize=function(_,D,B){k=_,et=D,ot=B,e.width=Math.floor(_*B),e.height=Math.floor(D*B),this.setViewport(0,0,_,D)},this.getCurrentViewport=function(_){return _.copy(V)},this.getViewport=function(_){return _.copy(Yt)},this.setViewport=function(_,D,B,z){_.isVector4?Yt.set(_.x,_.y,_.z,_.w):Yt.set(_,D,B,z),pt.viewport(V.copy(Yt).multiplyScalar(ot).round())},this.getScissor=function(_){return _.copy(Jt)},this.setScissor=function(_,D,B,z){_.isVector4?Jt.set(_.x,_.y,_.z,_.w):Jt.set(_,D,B,z),pt.scissor(H.copy(Jt).multiplyScalar(ot).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(_){pt.setScissorTest(Qt=_)},this.setOpaqueSort=function(_){St=_},this.setTransparentSort=function(_){Ht=_},this.getClearColor=function(_){return _.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(_=!0,D=!0,B=!0){let z=0;if(_){let U=!1;if(M!==null){const Q=M.texture.format;U=g.has(Q)}if(U){const Q=M.texture.type,ct=v.has(Q),mt=tt.getClearColor(),ut=tt.getClearAlpha(),Tt=mt.r,wt=mt.g,vt=mt.b;ct?(p[0]=Tt,p[1]=wt,p[2]=vt,p[3]=ut,w.clearBufferuiv(w.COLOR,0,p)):(u[0]=Tt,u[1]=wt,u[2]=vt,u[3]=ut,w.clearBufferiv(w.COLOR,0,u))}else z|=w.COLOR_BUFFER_BIT}D&&(z|=w.DEPTH_BUFFER_BIT),B&&(z|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),tt.dispose(),at.dispose(),bt.dispose(),Mt.dispose(),b.dispose(),x.dispose(),K.dispose(),R.dispose(),lt.dispose(),G.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Es),rt.removeEventListener("sessionend",Ts),Bn.stop()};function J(_){_.preventDefault(),zs("WebGLRenderer: Context Lost."),L=!0}function $(){zs("WebGLRenderer: Context Restored."),L=!1;const _=re.autoReset,D=j.enabled,B=j.autoUpdate,z=j.needsUpdate,U=j.type;it(),re.autoReset=_,j.enabled=D,j.autoUpdate=B,j.needsUpdate=z,j.type=U}function ht(_){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function Ct(_){const D=_.target;D.removeEventListener("dispose",Ct),ee(D)}function ee(_){$t(_),Mt.remove(_)}function $t(_){const D=Mt.get(_).programs;D!==void 0&&(D.forEach(function(B){G.releaseProgram(B)}),_.isShaderMaterial&&G.releaseShaderCache(_))}this.renderBufferDirect=function(_,D,B,z,U,Q){D===null&&(D=_e);const ct=U.isMesh&&U.matrixWorld.determinant()<0,mt=gl(_,D,B,z,U);pt.setMaterial(z,ct);let ut=B.index,Tt=1;if(z.wireframe===!0){if(ut=X.getWireframeAttribute(B),ut===void 0)return;Tt=2}const wt=B.drawRange,vt=B.attributes.position;let Vt=wt.start*Tt,Kt=(wt.start+wt.count)*Tt;Q!==null&&(Vt=Math.max(Vt,Q.start*Tt),Kt=Math.min(Kt,(Q.start+Q.count)*Tt)),ut!==null?(Vt=Math.max(Vt,0),Kt=Math.min(Kt,ut.count)):vt!=null&&(Vt=Math.max(Vt,0),Kt=Math.min(Kt,vt.count));const ae=Kt-Vt;if(ae<0||ae===1/0)return;R.setup(U,z,mt,B,ut);let le,jt=Et;if(ut!==null&&(le=I.get(ut),jt=ft,jt.setIndex(le)),U.isMesh)z.wireframe===!0?(pt.setLineWidth(z.wireframeLinewidth*ne()),jt.setMode(w.LINES)):jt.setMode(w.TRIANGLES);else if(U.isLine){let yt=z.linewidth;yt===void 0&&(yt=1),pt.setLineWidth(yt*ne()),U.isLineSegments?jt.setMode(w.LINES):U.isLineLoop?jt.setMode(w.LINE_LOOP):jt.setMode(w.LINE_STRIP)}else U.isPoints?jt.setMode(w.POINTS):U.isSprite&&jt.setMode(w.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Vi("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),jt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))jt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const yt=U._multiDrawStarts,oe=U._multiDrawCounts,kt=U._multiDrawCount,Fe=ut?I.get(ut).bytesPerElement:1,Jn=Mt.get(z).currentProgram.getUniforms();for(let Oe=0;Oe<kt;Oe++)Jn.setValue(w,"_gl_DrawID",Oe),jt.render(yt[Oe]/Fe,oe[Oe])}else if(U.isInstancedMesh)jt.renderInstances(Vt,ae,U.count);else if(B.isInstancedBufferGeometry){const yt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,oe=Math.min(B.instanceCount,yt);jt.renderInstances(Vt,ae,oe)}else jt.render(Vt,ae)};function on(_,D,B){_.transparent===!0&&_.side===gn&&_.forceSinglePass===!1?(_.side=Ne,_.needsUpdate=!0,Ji(_,D,B),_.side=On,_.needsUpdate=!0,Ji(_,D,B),_.side=gn):Ji(_,D,B)}this.compile=function(_,D,B=null){B===null&&(B=_),E=bt.get(B),E.init(D),C.push(E),B.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(E.pushLight(U),U.castShadow&&E.pushShadow(U))}),_!==B&&_.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(E.pushLight(U),U.castShadow&&E.pushShadow(U))}),E.setupLights();const z=new Set;return _.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const Q=U.material;if(Q)if(Array.isArray(Q))for(let ct=0;ct<Q.length;ct++){const mt=Q[ct];on(mt,B,U),z.add(mt)}else on(Q,B,U),z.add(Q)}),E=C.pop(),z},this.compileAsync=function(_,D,B=null){const z=this.compile(_,D,B);return new Promise(U=>{function Q(){if(z.forEach(function(ct){Mt.get(ct).currentProgram.isReady()&&z.delete(ct)}),z.size===0){U(_);return}setTimeout(Q,10)}zt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let $e=null;function xl(_){$e&&$e(_)}function Es(){Bn.stop()}function Ts(){Bn.start()}const Bn=new ol;Bn.setAnimationLoop(xl),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(_){$e=_,rt.setAnimationLoop(_),_===null?Bn.stop():Bn.start()},rt.addEventListener("sessionstart",Es),rt.addEventListener("sessionend",Ts),this.render=function(_,D){if(D!==void 0&&D.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(D),D=rt.getCamera()),_.isScene===!0&&_.onBeforeRender(y,_,D,M),E=bt.get(_,C.length),E.init(D),C.push(E),Lt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Y.setFromProjectionMatrix(Lt,an,D.reversedDepth),dt=this.localClippingEnabled,Z=xt.init(this.clippingPlanes,dt),T=at.get(_,A.length),T.init(),A.push(T),rt.enabled===!0&&rt.isPresenting===!0){const Q=y.xr.getDepthSensingMesh();Q!==null&&Fr(Q,D,-1/0,y.sortObjects)}Fr(_,D,0,y.sortObjects),T.finish(),y.sortObjects===!0&&T.sort(St,Ht),Ft=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Ft&&tt.addToRenderList(T,_),this.info.render.frame++,Z===!0&&xt.beginShadows();const B=E.state.shadowsArray;j.render(B,_,D),Z===!0&&xt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=T.opaque,U=T.transmissive;if(E.setupLights(),D.isArrayCamera){const Q=D.cameras;if(U.length>0)for(let ct=0,mt=Q.length;ct<mt;ct++){const ut=Q[ct];ws(z,U,_,ut)}Ft&&tt.render(_);for(let ct=0,mt=Q.length;ct<mt;ct++){const ut=Q[ct];As(T,_,ut,ut.viewport)}}else U.length>0&&ws(z,U,_,D),Ft&&tt.render(_),As(T,_,D);M!==null&&S===0&&(Pt.updateMultisampleRenderTarget(M),Pt.updateRenderTargetMipmap(M)),_.isScene===!0&&_.onAfterRender(y,_,D),R.resetDefaultState(),P=-1,N=null,C.pop(),C.length>0?(E=C[C.length-1],Z===!0&&xt.setGlobalState(y.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?T=A[A.length-1]:T=null};function Fr(_,D,B,z){if(_.visible===!1)return;if(_.layers.test(D.layers)){if(_.isGroup)B=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(D);else if(_.isLight)E.pushLight(_),_.castShadow&&E.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||Y.intersectsSprite(_)){z&&Ot.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Lt);const ct=K.update(_),mt=_.material;mt.visible&&T.push(_,ct,mt,B,Ot.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||Y.intersectsObject(_))){const ct=K.update(_),mt=_.material;if(z&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),Ot.copy(_.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Ot.copy(ct.boundingSphere.center)),Ot.applyMatrix4(_.matrixWorld).applyMatrix4(Lt)),Array.isArray(mt)){const ut=ct.groups;for(let Tt=0,wt=ut.length;Tt<wt;Tt++){const vt=ut[Tt],Vt=mt[vt.materialIndex];Vt&&Vt.visible&&T.push(_,ct,Vt,B,Ot.z,vt)}}else mt.visible&&T.push(_,ct,mt,B,Ot.z,null)}}const Q=_.children;for(let ct=0,mt=Q.length;ct<mt;ct++)Fr(Q[ct],D,B,z)}function As(_,D,B,z){const{opaque:U,transmissive:Q,transparent:ct}=_;E.setupLightsView(B),Z===!0&&xt.setGlobalState(y.clippingPlanes,B),z&&pt.viewport(V.copy(z)),U.length>0&&ji(U,D,B),Q.length>0&&ji(Q,D,B),ct.length>0&&ji(ct,D,B),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function ws(_,D,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;E.state.transmissionRenderTarget[z.id]===void 0&&(E.state.transmissionRenderTarget[z.id]=new jn(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?yi:ln,minFilter:Kn,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const Q=E.state.transmissionRenderTarget[z.id],ct=z.viewport||V;Q.setSize(ct.z*y.transmissionResolutionScale,ct.w*y.transmissionResolutionScale);const mt=y.getRenderTarget(),ut=y.getActiveCubeFace(),Tt=y.getActiveMipmapLevel();y.setRenderTarget(Q),y.getClearColor(W),nt=y.getClearAlpha(),nt<1&&y.setClearColor(16777215,.5),y.clear(),Ft&&tt.render(B);const wt=y.toneMapping;y.toneMapping=Nn;const vt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),Z===!0&&xt.setGlobalState(y.clippingPlanes,z),ji(_,B,z),Pt.updateMultisampleRenderTarget(Q),Pt.updateRenderTargetMipmap(Q),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Kt=0,ae=D.length;Kt<ae;Kt++){const le=D[Kt],{object:jt,geometry:yt,material:oe,group:kt}=le;if(oe.side===gn&&jt.layers.test(z.layers)){const Fe=oe.side;oe.side=Ne,oe.needsUpdate=!0,Rs(jt,B,z,yt,oe,kt),oe.side=Fe,oe.needsUpdate=!0,Vt=!0}}Vt===!0&&(Pt.updateMultisampleRenderTarget(Q),Pt.updateRenderTargetMipmap(Q))}y.setRenderTarget(mt,ut,Tt),y.setClearColor(W,nt),vt!==void 0&&(z.viewport=vt),y.toneMapping=wt}function ji(_,D,B){const z=D.isScene===!0?D.overrideMaterial:null;for(let U=0,Q=_.length;U<Q;U++){const ct=_[U],{object:mt,geometry:ut,group:Tt}=ct;let wt=ct.material;wt.allowOverride===!0&&z!==null&&(wt=z),mt.layers.test(B.layers)&&Rs(mt,D,B,ut,wt,Tt)}}function Rs(_,D,B,z,U,Q){_.onBeforeRender(y,D,B,z,U,Q),_.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),U.onBeforeRender(y,D,B,z,_,Q),U.transparent===!0&&U.side===gn&&U.forceSinglePass===!1?(U.side=Ne,U.needsUpdate=!0,y.renderBufferDirect(B,D,z,U,_,Q),U.side=On,U.needsUpdate=!0,y.renderBufferDirect(B,D,z,U,_,Q),U.side=gn):y.renderBufferDirect(B,D,z,U,_,Q),_.onAfterRender(y,D,B,z,U,Q)}function Ji(_,D,B){D.isScene!==!0&&(D=_e);const z=Mt.get(_),U=E.state.lights,Q=E.state.shadowsArray,ct=U.state.version,mt=G.getParameters(_,U.state,Q,D,B),ut=G.getProgramCacheKey(mt);let Tt=z.programs;z.environment=_.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(_.isMeshStandardMaterial?x:b).get(_.envMap||z.environment),z.envMapRotation=z.environment!==null&&_.envMap===null?D.environmentRotation:_.envMapRotation,Tt===void 0&&(_.addEventListener("dispose",Ct),Tt=new Map,z.programs=Tt);let wt=Tt.get(ut);if(wt!==void 0){if(z.currentProgram===wt&&z.lightsStateVersion===ct)return Ps(_,mt),wt}else mt.uniforms=G.getUniforms(_),_.onBeforeCompile(mt,y),wt=G.acquireProgram(mt,ut),Tt.set(ut,wt),z.uniforms=mt.uniforms;const vt=z.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(vt.clippingPlanes=xt.uniform),Ps(_,mt),z.needsLights=vl(_),z.lightsStateVersion=ct,z.needsLights&&(vt.ambientLightColor.value=U.state.ambient,vt.lightProbe.value=U.state.probe,vt.directionalLights.value=U.state.directional,vt.directionalLightShadows.value=U.state.directionalShadow,vt.spotLights.value=U.state.spot,vt.spotLightShadows.value=U.state.spotShadow,vt.rectAreaLights.value=U.state.rectArea,vt.ltc_1.value=U.state.rectAreaLTC1,vt.ltc_2.value=U.state.rectAreaLTC2,vt.pointLights.value=U.state.point,vt.pointLightShadows.value=U.state.pointShadow,vt.hemisphereLights.value=U.state.hemi,vt.directionalShadowMap.value=U.state.directionalShadowMap,vt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,vt.spotShadowMap.value=U.state.spotShadowMap,vt.spotLightMatrix.value=U.state.spotLightMatrix,vt.spotLightMap.value=U.state.spotLightMap,vt.pointShadowMap.value=U.state.pointShadowMap,vt.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=wt,z.uniformsList=null,wt}function Cs(_){if(_.uniformsList===null){const D=_.currentProgram.getUniforms();_.uniformsList=yr.seqWithValue(D.seq,_.uniforms)}return _.uniformsList}function Ps(_,D){const B=Mt.get(_);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function gl(_,D,B,z,U){D.isScene!==!0&&(D=_e),Pt.resetTextureUnits();const Q=D.fog,ct=z.isMeshStandardMaterial?D.environment:null,mt=M===null?y.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Si,ut=(z.isMeshStandardMaterial?x:b).get(z.envMap||ct),Tt=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,wt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),vt=!!B.morphAttributes.position,Vt=!!B.morphAttributes.normal,Kt=!!B.morphAttributes.color;let ae=Nn;z.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(ae=y.toneMapping);const le=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,jt=le!==void 0?le.length:0,yt=Mt.get(z),oe=E.state.lights;if(Z===!0&&(dt===!0||_!==N)){const Ae=_===N&&z.id===P;xt.setState(z,_,Ae)}let kt=!1;z.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==oe.state.version||yt.outputColorSpace!==mt||U.isBatchedMesh&&yt.batching===!1||!U.isBatchedMesh&&yt.batching===!0||U.isBatchedMesh&&yt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&yt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&yt.instancing===!1||!U.isInstancedMesh&&yt.instancing===!0||U.isSkinnedMesh&&yt.skinning===!1||!U.isSkinnedMesh&&yt.skinning===!0||U.isInstancedMesh&&yt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&yt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&yt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&yt.instancingMorph===!1&&U.morphTexture!==null||yt.envMap!==ut||z.fog===!0&&yt.fog!==Q||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==xt.numPlanes||yt.numIntersection!==xt.numIntersection)||yt.vertexAlphas!==Tt||yt.vertexTangents!==wt||yt.morphTargets!==vt||yt.morphNormals!==Vt||yt.morphColors!==Kt||yt.toneMapping!==ae||yt.morphTargetsCount!==jt)&&(kt=!0):(kt=!0,yt.__version=z.version);let Fe=yt.currentProgram;kt===!0&&(Fe=Ji(z,D,U));let Jn=!1,Oe=!1,Ai=!1;const se=Fe.getUniforms(),Le=yt.uniforms;if(pt.useProgram(Fe.program)&&(Jn=!0,Oe=!0,Ai=!0),z.id!==P&&(P=z.id,Oe=!0),Jn||N!==_){pt.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),se.setValue(w,"projectionMatrix",_.projectionMatrix),se.setValue(w,"viewMatrix",_.matrixWorldInverse);const De=se.map.cameraPosition;De!==void 0&&De.setValue(w,_t.setFromMatrixPosition(_.matrixWorld)),te.logarithmicDepthBuffer&&se.setValue(w,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&se.setValue(w,"isOrthographic",_.isOrthographicCamera===!0),N!==_&&(N=_,Oe=!0,Ai=!0)}if(U.isSkinnedMesh){se.setOptional(w,U,"bindMatrix"),se.setOptional(w,U,"bindMatrixInverse");const Ae=U.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),se.setValue(w,"boneTexture",Ae.boneTexture,Pt))}U.isBatchedMesh&&(se.setOptional(w,U,"batchingTexture"),se.setValue(w,"batchingTexture",U._matricesTexture,Pt),se.setOptional(w,U,"batchingIdTexture"),se.setValue(w,"batchingIdTexture",U._indirectTexture,Pt),se.setOptional(w,U,"batchingColorTexture"),U._colorsTexture!==null&&se.setValue(w,"batchingColorTexture",U._colorsTexture,Pt));const We=B.morphAttributes;if((We.position!==void 0||We.normal!==void 0||We.color!==void 0)&&At.update(U,B,Fe),(Oe||yt.receiveShadow!==U.receiveShadow)&&(yt.receiveShadow=U.receiveShadow,se.setValue(w,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Le.envMap.value=ut,Le.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&D.environment!==null&&(Le.envMapIntensity.value=D.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=Bm()),Oe&&(se.setValue(w,"toneMappingExposure",y.toneMappingExposure),yt.needsLights&&_l(Le,Ai),Q&&z.fog===!0&&gt.refreshFogUniforms(Le,Q),gt.refreshMaterialUniforms(Le,z,ot,et,E.state.transmissionRenderTarget[_.id]),yr.upload(w,Cs(yt),Le,Pt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(yr.upload(w,Cs(yt),Le,Pt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&se.setValue(w,"center",U.center),se.setValue(w,"modelViewMatrix",U.modelViewMatrix),se.setValue(w,"normalMatrix",U.normalMatrix),se.setValue(w,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ae=z.uniformsGroups;for(let De=0,Or=Ae.length;De<Or;De++){const zn=Ae[De];lt.update(zn,Fe),lt.bind(zn,Fe)}}return Fe}function _l(_,D){_.ambientLightColor.needsUpdate=D,_.lightProbe.needsUpdate=D,_.directionalLights.needsUpdate=D,_.directionalLightShadows.needsUpdate=D,_.pointLights.needsUpdate=D,_.pointLightShadows.needsUpdate=D,_.spotLights.needsUpdate=D,_.spotLightShadows.needsUpdate=D,_.rectAreaLights.needsUpdate=D,_.hemisphereLights.needsUpdate=D}function vl(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(_,D,B){const z=Mt.get(_);z.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Mt.get(_.texture).__webglTexture=D,Mt.get(_.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,D){const B=Mt.get(_);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0};const Ml=w.createFramebuffer();this.setRenderTarget=function(_,D=0,B=0){M=_,F=D,S=B;let z=!0,U=null,Q=!1,ct=!1;if(_){const ut=Mt.get(_);if(ut.__useDefaultFramebuffer!==void 0)pt.bindFramebuffer(w.FRAMEBUFFER,null),z=!1;else if(ut.__webglFramebuffer===void 0)Pt.setupRenderTarget(_);else if(ut.__hasExternalTextures)Pt.rebindTextures(_,Mt.get(_.texture).__webglTexture,Mt.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){const vt=_.depthTexture;if(ut.__boundDepthTexture!==vt){if(vt!==null&&Mt.has(vt)&&(_.width!==vt.image.width||_.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Pt.setupDepthRenderbuffer(_)}}const Tt=_.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(ct=!0);const wt=Mt.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(wt[D])?U=wt[D][B]:U=wt[D],Q=!0):_.samples>0&&Pt.useMultisampledRTT(_)===!1?U=Mt.get(_).__webglMultisampledFramebuffer:Array.isArray(wt)?U=wt[B]:U=wt,V.copy(_.viewport),H.copy(_.scissor),q=_.scissorTest}else V.copy(Yt).multiplyScalar(ot).floor(),H.copy(Jt).multiplyScalar(ot).floor(),q=Qt;if(B!==0&&(U=Ml),pt.bindFramebuffer(w.FRAMEBUFFER,U)&&z&&pt.drawBuffers(_,U),pt.viewport(V),pt.scissor(H),pt.setScissorTest(q),Q){const ut=Mt.get(_.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut.__webglTexture,B)}else if(ct){const ut=D;for(let Tt=0;Tt<_.textures.length;Tt++){const wt=Mt.get(_.textures[Tt]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Tt,wt.__webglTexture,B,ut)}}else if(_!==null&&B!==0){const ut=Mt.get(_.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,ut.__webglTexture,B)}P=-1},this.readRenderTargetPixels=function(_,D,B,z,U,Q,ct,mt=0){if(!(_&&_.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=Mt.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ct!==void 0&&(ut=ut[ct]),ut){pt.bindFramebuffer(w.FRAMEBUFFER,ut);try{const Tt=_.textures[mt],wt=Tt.format,vt=Tt.type;if(!te.textureFormatReadable(wt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(vt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=_.width-z&&B>=0&&B<=_.height-U&&(_.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+mt),w.readPixels(D,B,z,U,Rt.convert(wt),Rt.convert(vt),Q))}finally{const Tt=M!==null?Mt.get(M).__webglFramebuffer:null;pt.bindFramebuffer(w.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(_,D,B,z,U,Q,ct,mt=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=Mt.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ct!==void 0&&(ut=ut[ct]),ut)if(D>=0&&D<=_.width-z&&B>=0&&B<=_.height-U){pt.bindFramebuffer(w.FRAMEBUFFER,ut);const Tt=_.textures[mt],wt=Tt.format,vt=Tt.type;if(!te.textureFormatReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Vt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Vt),w.bufferData(w.PIXEL_PACK_BUFFER,Q.byteLength,w.STREAM_READ),_.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+mt),w.readPixels(D,B,z,U,Rt.convert(wt),Rt.convert(vt),0);const Kt=M!==null?Mt.get(M).__webglFramebuffer:null;pt.bindFramebuffer(w.FRAMEBUFFER,Kt);const ae=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await dc(w,ae,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Vt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,Q),w.deleteBuffer(Vt),w.deleteSync(ae),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,D=null,B=0){const z=Math.pow(2,-B),U=Math.floor(_.image.width*z),Q=Math.floor(_.image.height*z),ct=D!==null?D.x:0,mt=D!==null?D.y:0;Pt.setTexture2D(_,0),w.copyTexSubImage2D(w.TEXTURE_2D,B,0,0,ct,mt,U,Q),pt.unbindTexture()};const Sl=w.createFramebuffer(),bl=w.createFramebuffer();this.copyTextureToTexture=function(_,D,B=null,z=null,U=0,Q=null){Q===null&&(U!==0?(Vi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=U,U=0):Q=0);let ct,mt,ut,Tt,wt,vt,Vt,Kt,ae;const le=_.isCompressedTexture?_.mipmaps[Q]:_.image;if(B!==null)ct=B.max.x-B.min.x,mt=B.max.y-B.min.y,ut=B.isBox3?B.max.z-B.min.z:1,Tt=B.min.x,wt=B.min.y,vt=B.isBox3?B.min.z:0;else{const We=Math.pow(2,-U);ct=Math.floor(le.width*We),mt=Math.floor(le.height*We),_.isDataArrayTexture?ut=le.depth:_.isData3DTexture?ut=Math.floor(le.depth*We):ut=1,Tt=0,wt=0,vt=0}z!==null?(Vt=z.x,Kt=z.y,ae=z.z):(Vt=0,Kt=0,ae=0);const jt=Rt.convert(D.format),yt=Rt.convert(D.type);let oe;D.isData3DTexture?(Pt.setTexture3D(D,0),oe=w.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Pt.setTexture2DArray(D,0),oe=w.TEXTURE_2D_ARRAY):(Pt.setTexture2D(D,0),oe=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,D.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,D.unpackAlignment);const kt=w.getParameter(w.UNPACK_ROW_LENGTH),Fe=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Jn=w.getParameter(w.UNPACK_SKIP_PIXELS),Oe=w.getParameter(w.UNPACK_SKIP_ROWS),Ai=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,le.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,le.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Tt),w.pixelStorei(w.UNPACK_SKIP_ROWS,wt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,vt);const se=_.isDataArrayTexture||_.isData3DTexture,Le=D.isDataArrayTexture||D.isData3DTexture;if(_.isDepthTexture){const We=Mt.get(_),Ae=Mt.get(D),De=Mt.get(We.__renderTarget),Or=Mt.get(Ae.__renderTarget);pt.bindFramebuffer(w.READ_FRAMEBUFFER,De.__webglFramebuffer),pt.bindFramebuffer(w.DRAW_FRAMEBUFFER,Or.__webglFramebuffer);for(let zn=0;zn<ut;zn++)se&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Mt.get(_).__webglTexture,U,vt+zn),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Mt.get(D).__webglTexture,Q,ae+zn)),w.blitFramebuffer(Tt,wt,ct,mt,Vt,Kt,ct,mt,w.DEPTH_BUFFER_BIT,w.NEAREST);pt.bindFramebuffer(w.READ_FRAMEBUFFER,null),pt.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(U!==0||_.isRenderTargetTexture||Mt.has(_)){const We=Mt.get(_),Ae=Mt.get(D);pt.bindFramebuffer(w.READ_FRAMEBUFFER,Sl),pt.bindFramebuffer(w.DRAW_FRAMEBUFFER,bl);for(let De=0;De<ut;De++)se?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,We.__webglTexture,U,vt+De):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,We.__webglTexture,U),Le?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ae.__webglTexture,Q,ae+De):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ae.__webglTexture,Q),U!==0?w.blitFramebuffer(Tt,wt,ct,mt,Vt,Kt,ct,mt,w.COLOR_BUFFER_BIT,w.NEAREST):Le?w.copyTexSubImage3D(oe,Q,Vt,Kt,ae+De,Tt,wt,ct,mt):w.copyTexSubImage2D(oe,Q,Vt,Kt,Tt,wt,ct,mt);pt.bindFramebuffer(w.READ_FRAMEBUFFER,null),pt.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Le?_.isDataTexture||_.isData3DTexture?w.texSubImage3D(oe,Q,Vt,Kt,ae,ct,mt,ut,jt,yt,le.data):D.isCompressedArrayTexture?w.compressedTexSubImage3D(oe,Q,Vt,Kt,ae,ct,mt,ut,jt,le.data):w.texSubImage3D(oe,Q,Vt,Kt,ae,ct,mt,ut,jt,yt,le):_.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,Q,Vt,Kt,ct,mt,jt,yt,le.data):_.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,Q,Vt,Kt,le.width,le.height,jt,le.data):w.texSubImage2D(w.TEXTURE_2D,Q,Vt,Kt,ct,mt,jt,yt,le);w.pixelStorei(w.UNPACK_ROW_LENGTH,kt),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Fe),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Jn),w.pixelStorei(w.UNPACK_SKIP_ROWS,Oe),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ai),Q===0&&D.generateMipmaps&&w.generateMipmap(oe),pt.unbindTexture()},this.initRenderTarget=function(_){Mt.get(_).__webglFramebuffer===void 0&&Pt.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?Pt.setTextureCube(_,0):_.isData3DTexture?Pt.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?Pt.setTexture2DArray(_,0):Pt.setTexture2D(_,0),pt.unbindTexture()},this.resetState=function(){F=0,S=0,M=null,pt.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}function Vm(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),o={},s={},a=i[0].morphTargetsRelative,l=new Ye;let c=0;for(let f=0;f<i.length;++f){const d=i[f];let h=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in d.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;o[m]===void 0&&(o[m]=[]),o[m].push(d.attributes[m]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in d.morphAttributes){if(!r.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;s[m]===void 0&&(s[m]=[]),s[m].push(d.morphAttributes[m])}if(t){let m;if(e)m=d.index.count;else if(d.attributes.position!==void 0)m=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,m,f),c+=m}}if(e){let f=0;const d=[];for(let h=0;h<i.length;++h){const m=i[h].index;for(let g=0;g<m.count;++g)d.push(m.getX(g)+f);f+=i[h].attributes.position.count}l.setIndex(d)}for(const f in o){const d=Ca(o[f]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;l.setAttribute(f,d)}for(const f in s){const d=s[f][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[f]=[];for(let h=0;h<d;++h){const m=[];for(let v=0;v<s[f].length;++v)m.push(s[f][v][h]);const g=Ca(m);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;l.morphAttributes[f].push(g)}}return l}function Ca(i){let t,e,n,r=-1,o=0;for(let c=0;c<i.length;++c){const f=i[c];if(t===void 0&&(t=f.array.constructor),t!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=f.itemSize),e!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=f.gpuType),r!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=f.count*e}const s=new t(o),a=new nn(s,e,n);let l=0;for(let c=0;c<i.length;++c){const f=i[c];if(f.isInterleavedBufferAttribute){const d=l/e;for(let h=0,m=f.count;h<m;h++)for(let g=0;g<e;g++){const v=f.getComponent(h,g);a.setComponent(h+d,g,v)}}else s.set(f.array,l);l+=f.count*e}return r!==void 0&&(a.gpuType=r),a}function rs(i){const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");if(!e)throw Error("Canvas is unavailable");i(e);const n=new Wc(t);return n.colorSpace=Ie,n}function Gm(i){const t=Wi[i];return rs(e=>{if(e.fillStyle=t.color,e.fillRect(0,0,256,256),e.fillStyle=t.ink,e.strokeStyle=t.ink,e.lineWidth=5,e.lineCap="round",t.pattern==="ribbon"||t.pattern==="stripes"){e.lineWidth=t.pattern==="ribbon"?11:4;for(let n=-100;n<340;n+=39){e.beginPath();for(let r=0;r<=256;r+=4){const o=n+(t.pattern==="ribbon"?Math.sin(r/23)*8:r*.5);r?e.lineTo(r,o):e.moveTo(r,o)}e.stroke()}}else if(t.pattern==="spiral")for(let n=24;n<256;n+=67)for(let r=18;r<256;r+=67){e.beginPath();for(let o=0;o<12;o+=.1){const s=1+o*1.2,a=r+Math.cos(o)*s,l=n+Math.sin(o)*s;o?e.lineTo(a,l):e.moveTo(a,l)}e.stroke()}else for(let n=0;n<5;n++)for(let r=0;r<5;r++){const o=18+r*52+n%2*18,s=22+n*51;if(e.save(),e.translate(o,s),e.rotate((n+r)*.7),t.pattern==="hearts")e.beginPath(),e.moveTo(0,8),e.bezierCurveTo(-21,-5,-4,-16,0,-6),e.bezierCurveTo(8,-17,21,-3,0,8),e.fill();else if(t.pattern==="dots")e.beginPath(),e.arc(0,0,4,0,Math.PI*2),e.fill();else if(t.pattern==="leaves")e.beginPath(),e.ellipse(0,0,3,10,.6,0,Math.PI*2),e.fill();else{const a=t.pattern==="cookies"?13:7;e.beginPath(),e.moveTo(-a/2,-a/2),e.lineTo(a/2,-a/3),e.lineTo(a/3,a/2),e.lineTo(-a/2,a/3),e.fill()}e.restore()}})}class Hm{renderer;scene=new zc;camera=new Ss;root=new mi;coneGeometry=new Ms(.43,1.32,32);rimGeometry=new Cr(.405,.055,8,32);scoopGeometry;coneMaterial;scoopMaterials;shadowMaterial;shadowGeometry=new Zi(1.55,.35);ringGeometry=new Cr(.64,.037,6,48);sourceMaterial=new Ii({color:"#c8577f"});targetMaterial=new Ii({color:"#4f9c85"});coneGroups=[];scoopMeshes=[];ringMeshes=[];scale=1;width=0;height=0;selected=null;frame=0;flight=null;shake=null;title=!1;reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;constructor(t){this.renderer=new zm({antialias:!0,alpha:!0,powerPreference:"low-power"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=Ie,this.renderer.toneMapping=Fa,this.renderer.toneMappingExposure=.9,this.renderer.setSize(innerWidth,innerHeight),t.append(this.renderer.domElement),this.scene.add(new Yc(16776434,12111813,2.4));const e=new Zc(16777215,3.1);e.position.set(-200,400,600),this.scene.add(e),this.scene.add(this.root),this.camera.position.z=1e3;const n=rs(l=>{l.fillStyle="#dca260",l.fillRect(0,0,256,256);for(const c of[-1,1])for(let f=-256;f<512;f+=32)l.strokeStyle="#b98043",l.lineWidth=6,l.beginPath(),l.moveTo(f,0),l.lineTo(f+c*256,256),l.stroke(),l.strokeStyle="#f4c982",l.lineWidth=2,l.beginPath(),l.moveTo(f+3,0),l.lineTo(f+3+c*256,256),l.stroke()});n.wrapS=Er,n.repeat.x=2,this.coneMaterial=new na({map:n,roughness:.82,color:"#fff2d5"}),this.scoopMaterials=Wi.map((l,c)=>new na({map:Gm(c),roughness:.29,metalness:.02}));const r=new Rr(.515,24,16);r.scale(1,.88,1);const o=[r];for(let l=0;l<8;l++){const c=l/8*Math.PI*2,f=new Rr(.165,10,7);f.scale(1,.75,1),f.translate(Math.cos(c)*.36,-.26,Math.sin(c)*.36),o.push(f)}const s=Vm(o);if(!s)throw Error("Scoop geometry failed");this.scoopGeometry=s,o.forEach(l=>l.dispose());const a=rs(l=>{const c=l.createRadialGradient(128,128,4,128,128,125);c.addColorStop(0,"rgba(73,81,64,.28)"),c.addColorStop(1,"rgba(73,81,64,0)"),l.fillStyle=c,l.fillRect(0,0,256,256)});this.shadowMaterial=new Ii({map:a,transparent:!0,depthWrite:!1}),document.addEventListener("visibilitychange",()=>{document.hidden?cancelAnimationFrame(this.frame):this.animate()}),this.animate()}resize(t,e){this.width=t,this.height=e,this.renderer.setSize(t,e),this.camera.left=-t/2,this.camera.right=t/2,this.camera.top=e/2,this.camera.bottom=-e/2,this.camera.near=.1,this.camera.far=2e3,this.camera.updateProjectionMatrix()}setBoard(t,e,n,r=!1){this.root.clear(),this.coneGroups=[],this.scoopMeshes=[],this.ringMeshes=[],this.scale=n,this.title=r;for(let o=0;o<t.length;o++){const s=new mi,a=e[o];s.position.set(a.x+a.width/2-this.width/2,this.height/2-a.y-a.height+18,0),s.scale.setScalar(n);const l=new Ve(this.coneGeometry,this.coneMaterial);l.rotation.z=Math.PI,l.position.y=.66,s.add(l);const c=new Ve(this.rimGeometry,this.coneMaterial);c.rotation.x=Math.PI/2,c.position.y=1.31,s.add(c);const f=new Ve(this.shadowGeometry,this.shadowMaterial);f.position.set(0,-.015,-1),s.add(f);const d=new Ve(this.ringGeometry,this.targetMaterial);d.scale.y=.24,d.position.set(0,.015,.4),d.visible=!1,s.add(d),this.ringMeshes.push(d);const h=t[o].map((m,g)=>{const v=new Ve(this.scoopGeometry,this.scoopMaterials[m]);return v.position.y=1.57+g*.69,v.rotation.y=o*.9+g*.55,s.add(v),v});this.root.add(s),this.coneGroups.push(s),this.scoopMeshes.push(h)}this.select(null,[])}select(t,e,n){this.selected=t,this.ringMeshes.forEach((r,o)=>{r.visible=o===t||e.includes(o)||o===n?.from||o===n?.to,r.material=o===t||o===n?.from?this.sourceMaterial:this.targetMaterial})}invalid(t){this.shake={index:t,start:performance.now()}}drag(t,e,n){const r=this.scoopMeshes[t]?.at(-1),o=this.coneGroups[t];r&&o&&(r.position.x=(e-this.width/2-o.position.x)/this.scale,r.position.y=(this.height/2-n-o.position.y)/this.scale,r.position.z=6)}fly(t,e){const n=this.scoopMeshes[t.from]?.at(-1),r=this.coneGroups[t.to];if(!n||!r)return Promise.resolve();n.updateWorldMatrix(!0,!1);const o=n.getWorldPosition(new O);this.root.attach(n);const s=r.position.clone().add(new O(0,(1.57+e[t.to].length*.69)*this.scale,0));return new Promise(a=>{this.flight={mesh:n,from:o,to:s,start:performance.now(),finish:a}})}animate=()=>{if(document.hidden)return;const t=performance.now();if(this.scoopMeshes.forEach((e,n)=>e.forEach((r,o)=>{if(this.flight?.mesh===r||r.position.z===6)return;const s=o===e.length-1,a=s&&n===this.selected,l=1.57+o*.69+(a?.38:0);r.position.y+=(l-r.position.y)*.22,r.scale.setScalar(a?1.07:1),this.title&&!this.reducedMotion&&(r.rotation.y+=.002)})),this.shake){const e=(t-this.shake.start)/420,n=this.coneGroups[this.shake.index];n&&(n.rotation.z=Math.sin(e*Math.PI*6)*.035*(1-Math.min(e,1))),e>=1&&(this.shake=null)}if(this.flight){const e=this.flight,n=Math.min(1,(t-e.start)/(this.reducedMotion?50:430)),r=n*n*(3-2*n);e.mesh.position.lerpVectors(e.from,e.to,r),e.mesh.position.y+=Math.sin(n*Math.PI)*this.scale*1.3,e.mesh.position.z=80,n>=1&&(this.flight=null,e.finish())}this.renderer.render(this.scene,this.camera),this.frame=requestAnimationFrame(this.animate)}}const Pa={home:'<path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10"/>',undo:'<path d="M8 4 3 9l5 5M3 9h10a7 7 0 0 1 0 14" transform="translate(0 -2)"/>',restart:'<path d="M20 10a8 8 0 1 0-2 8M20 3v7h-7"/>',hint:'<path d="M9 18h6M10 22h4M8 14a7 7 0 1 1 8 0c-1.5 1-1.5 2-1.5 4h-5c0-2 0-3-1.5-4Z"/>',sound:'<path d="M3 9h4l5-5v16l-5-5H3ZM16 8c2 2 2 6 0 8M19 5c4 4 4 10 0 14"/>',muted:'<path d="M3 9h4l5-5v16l-5-5H3ZM17 9l5 6M22 9l-5 6"/>',cone:'<path d="m6 10 6 12 6-12ZM4 9a5 5 0 0 1 8-4 5 5 0 0 1 8 4ZM18 2v6M15 5h6"/>',play:'<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke-linejoin="round"/>',arrow:'<path d="M4 12h16m-7-7 7 7-7 7"/>',map:'<rect x="3" y="3" width="6" height="6" rx="2"/><rect x="15" y="3" width="6" height="6" rx="2"/><rect x="3" y="15" width="6" height="6" rx="2"/><rect x="15" y="15" width="6" height="6" rx="2"/>',lock:'<rect x="6" y="10" width="12" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',check:'<path d="m5 12 5 5L20 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',sparkle:'<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z"/>'},He=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Pa[i]??Pa.sparkle}</svg>`,La=()=>({completedLevels:[],nextLevel:1,muted:!1,lastPlayedLevel:1,tutorialSeen:!1});function km(){try{const i=JSON.parse(localStorage.getItem("icecream-sort-v1")??"null");if(!i||typeof i!="object")return La();const t=r=>typeof r=="number"&&Number.isInteger(r)&&r>=1&&r<=50,e="completedLevels"in i&&Array.isArray(i.completedLevels)?[...new Set(i.completedLevels.filter(t))]:[];let n=1;for(;n<50&&e.includes(n);)n++;return{completedLevels:e,nextLevel:n,muted:"muted"in i&&i.muted===!0,lastPlayedLevel:"lastPlayedLevel"in i&&t(i.lastPlayedLevel)?i.lastPlayedLevel:n,tutorialSeen:"tutorialSeen"in i&&i.tutorialSeen===!0}}catch{return La()}}function Wm(i){try{localStorage.setItem("icecream-sort-v1",JSON.stringify(i))}catch{}}class Xm{context=null;muted=!1;play(t){if(this.muted)return;this.context??=new AudioContext;const e=this.context;e.resume(),(t==="win"?[523.25,659.25,783.99,1046.5]:t==="invalid"?[196]:t==="select"?[392]:[523.25,659.25]).forEach((r,o)=>{const s=e.createOscillator(),a=e.createGain(),l=e.currentTime+o*.12;s.type="sine",s.frequency.value=r,a.gain.setValueAtTime(0,l),a.gain.linearRampToValueAtTime(.065,l+.025),a.gain.exponentialRampToValueAtTime(.001,l+.24),s.connect(a),a.connect(e.destination),s.start(l),s.stop(l+.26)})}}const fl=document.querySelector("#app");if(!fl)throw Error("App root missing");fl.innerHTML='<div class="shop"><div class="awning"></div><div class="window-arch"></div><div class="shop-line"></div><div class="counter"></div></div><div id="scene" aria-hidden="true"></div><main id="ui"></main><div id="modal"></div><div class="safe-probe"></div><div id="announcement" class="sr-only" aria-live="polite"></div>';const Nr=i=>{const t=document.getElementById(i);if(!t)throw Error(`Missing ${i}`);return t},rn=Nr("ui"),Re=Nr("modal"),ul=Nr("scene");let ke;try{ke=new Hm(ul)}catch{throw rn.innerHTML='<div class="fallback">This shop needs WebGL. Please open it in Safari or Chrome with graphics enabled.</div>',Error("WebGL unavailable")}const ie=km(),En=new Xm;En.muted=ie.muted;let Ce="title",ye=1,Nt=new Ua(In[0].board,In[0].capacity),Pe=null,ge,Fn=!1,_n=0,Gi=!1,Hi=Lr(innerWidth,innerHeight,3);const hi=new URLSearchParams(location.search).get("capture"),dl=new Worker(new URL(""+new URL("solver.worker-Di7CFin_.js",import.meta.url).href,import.meta.url),{type:"module"});let tn=!1;function ki(i){Nr("announcement").textContent=i}function bs(){const i=getComputedStyle(document.querySelector(".safe-probe"));return{top:parseFloat(i.paddingTop),bottom:parseFloat(i.paddingBottom),left:parseFloat(i.paddingLeft),right:parseFloat(i.paddingRight)}}function Da(i){return`left:${i.x}px;top:${i.y}px;width:${i.width}px;height:${i.height}px`}function os(i,t,e,n=""){return`<button class="icon-button ${n}" aria-label="${t}" title="${t}" data-action="${e}">${He(i)}</button>`}function ys(){Wm(ie)}function Tn(i){Pe=i;const t=i===null?[]:Nt.board.flatMap((n,r)=>Pr(Nt.board,Nt.capacity,{from:i,to:r})?[r]:[]);ke.select(i,t,ge),rn.querySelectorAll(".cone-target").forEach((n,r)=>{n.classList.toggle("selected",r===i),n.classList.toggle("legal",t.includes(r)),n.classList.toggle("hint-from",r===ge?.from),n.classList.toggle("hint-to",r===ge?.to),n.setAttribute("aria-pressed",String(r===i))}),i!==null&&ki(`${Wi[Nt.board[i].at(-1)??0].name} selected. Choose a matching or empty cone.`);const e=rn.querySelector(".tutorial-hand");if(e&&Gi){const n=In[0].solution[0],r=Hi.slots[i===null?n.from:n.to];e.style.left=`${r.x+r.width/2}px`,e.style.top=`${r.y+r.height-70}px`}}function hl(){ke.resize(innerWidth,innerHeight),xe()}window.addEventListener("resize",hl);function xe(){document.body.dataset.screen=Ce,ul.hidden=Ce==="map",Ce==="title"&&qm(),Ce==="map"&&$m(),Ce==="play"&&Ym()}function qm(){const i=Lr(innerWidth,innerHeight,3,bs()).safe,t=innerWidth>=700,e=i.y+(t?260:200),n=Math.min(i.y+i.height-220,e+(t?380:300)),r=Math.min(i.width,t?620:360),o=r/3,s=Array.from({length:3},(l,c)=>({x:(innerWidth-r)/2+c*o,y:e,width:o,height:n-e})),a=Math.min(t?73:48,(n-e)/4.8);s[1].y-=18,s[1].height+=18,ke.setBoard([[0,0,0],[3,3,3,3],[4,4,4]],s,a,!0),rn.innerHTML=`<div class="title-tools" style="top:${i.y}px;right:${i.x}px">${os(ie.muted?"muted":"sound","Toggle sound","mute")}</div><section class="title-heading" style="top:${i.y+(t?70:73)}px"><span class="eyebrow">A LITTLE SCOOP OF HAPPINESS</span><h1>little scoop<span>ice cream sort</span></h1></section><div class="hero-sparkle s1">✧</div><div class="hero-sparkle s2">✦</div><div class="hero-sparkle s3">✧</div><section class="title-actions" style="bottom:${innerHeight-i.y-i.height+32}px"><p>Mix a little. Match a little. Smile a lot.</p><button class="primary" data-action="play">${He("play")}<span>${ie.completedLevels.length?"Continue":"Let’s play"}</span></button><button class="map-entry" data-action="map">${He("map")}<span>50 little adventures</span></button></section><span class="shop-tag">FRESH SCOOPS · HAPPY LITTLE MINDS</span>`}function Ni(i){_n++,tn=!1,ye=Math.max(1,Math.min(50,i));const t=In[ye-1];Nt=new Ua(t.board,t.capacity),Pe=null,ge=void 0,Fn=!1,Ce="play",Re.innerHTML="",ie.lastPlayedLevel=ye,Gi=ye===1&&!ie.tutorialSeen,Gi&&(ie.tutorialSeen=!0),ys(),xe()}function Ym(){Hi=Lr(innerWidth,innerHeight,Nt.board.length,bs());const{safe:i,hud:t,slots:e,artScale:n}=Hi;ke.setBoard(Nt.board,e,n);const r=["home",ie.muted?"muted":"sound","undo","restart","hint","cone"],o=["home","mute","undo","restart","hint","extra"],s=["Home","Toggle sound","Undo","Restart","Hint","Extra cone"];rn.innerHTML=`<div class="level-heading" style="top:${i.y+3}px"><span class="eyebrow">LITTLE SCOOP</span><h2>Level ${ye}<span> / 50</span></h2></div><div class="goal" style="top:${i.y+84}px">${ye===1?"One flavor. One happy cone.":'<span class="goal-dot"></span><span class="goal-dot"></span><span class="goal-dot"></span>'}</div><div class="tool-tray" style="left:${t[2].x-14}px;top:${t[2].y-14}px;width:${t[5].x+t[5].width-t[2].x+28}px;height:${t[2].height+28}px"></div>`+t.map((a,l)=>{const c=l===2&&!Nt.history.length||l===5&&(ye<9||Nt.extra);return`<button class="icon-button hud-button ${l===4?"hint-button":""} ${l===5?"extra-button":""}" style="${Da(a)}" aria-label="${s[l]}" title="${s[l]}" data-action="${o[l]}" ${c?"disabled":""}>${He(r[l])}${l>=2?`<span>${["","","Undo","Again","Hint","+ Cone"][l]}</span>`:""}</button>`}).join("")+e.map((a,l)=>`<button class="cone-target" data-cone="${l}" aria-label="Cone ${l+1}: ${Nt.board[l].map(c=>Wi[c].name).join(", ")||"empty"}" style="${Da(a)}"><span class="cone-marker">${Nt.board[l].length===Nt.capacity&&Nt.board[l].every(c=>c===Nt.board[l][0])?He("check"):l+1}</span></button>`).join("")+(Gi?'<div class="tutorial-hand" aria-hidden="true">☝<span>tap, then tap</span></div>':"")+(tn?'<div class="hint-status" role="status">Finding a little nudge…</div>':""),Tn(Pe)}function $m(){const i=Lr(innerWidth,innerHeight,3,bs()).safe;rn.innerHTML=`<div class="map-header" style="padding-top:${i.y}px">${os("home","Home","home")}<div><span class="eyebrow">YOUR SCOOP JOURNEY</span><h2>Little adventures</h2></div>${os(ie.muted?"muted":"sound","Toggle sound","mute")}</div><p class="map-caption">${ie.completedLevels.length} / 50 happy little puzzles</p><div class="level-scroll" style="bottom:${innerHeight-i.y-i.height+16}px"><div class="level-grid">${In.map(t=>{const e=ie.completedLevels.includes(t.id),n=t.id<=ie.nextLevel;return`<button class="level-cell ${e?"completed":t.id===ie.nextLevel?"current":"locked"}" data-level="${t.id}" aria-label="Level ${t.id}${e?", complete":n?", current":", locked"}" ${n?"":"disabled"}><span>${n?t.id:He("lock")}</span>${e?`<i>${He("check")}</i>`:t.id===ie.nextLevel?"<i>✦</i>":""}</button>`}).join("")}</div><p class="map-footer">A scoop at a time. You’re doing beautifully.</p></div>`}async function ml(i){if(Pe===null||Fn)return;const t={from:Pe,to:i};if(i===Pe){ge=void 0,Tn(null);return}if(!Pr(Nt.board,Nt.capacity,t)){ke.invalid(i),ke.invalid(Pe),En.play("invalid");const e=rn.querySelector(`[data-cone="${i}"]`);e?.classList.remove("bounce"),requestAnimationFrame(()=>e?.classList.add("bounce")),ki("Try a matching flavor or an empty cone.");return}Fn=!0,_n++,tn=!1,En.play("move"),await ke.fly(t,Nt.board),Nt.move(t),Pe=null,ge=void 0,Gi=!1,Fn=!1,xe(),as(Nt.board,Nt.capacity)&&pl()}function pl(){ie.completedLevels.includes(ye)||ie.completedLevels.push(ye);let i=1;for(;i<50&&ie.completedLevels.includes(i);)i++;ie.nextLevel=i,ys(),En.play("win"),Re.innerHTML=`<div class="confetti" aria-hidden="true">${Array.from({length:65},(t,e)=>`<i style="--x:${(e*37+13)%100}%;--delay:${-(e%9)*.18}s;--duration:${2.4+e%4*.35}s;--color:${Wi[e%8].color};--angle:${e*43}deg"></i>`).join("")}</div><div class="modal-backdrop"><section class="win-card" role="dialog" aria-modal="true" aria-labelledby="win-title"><div class="sticker">${He("sparkle")}<span>lovely!</span></div><span class="eyebrow">LEVEL ${ye} COMPLETE</span><h2 id="win-title">Sweetly sorted!</h2><p>${ye===50?"All 50 adventures. So many happy scoops!":"A little sprinkle of “I did it!”"}</p><button class="primary" data-action="next"><span>${ye===50?"All levels":"Next"}</span>${He("arrow")}</button><button class="map-entry" data-action="map">${He("map")}<span>Level map</span></button></section></div>`,Re.querySelector(".primary")?.focus(),ki("Sweetly sorted! Level complete.")}function Km(){Re.innerHTML=`<div class="modal-backdrop"><section class="confirm-card" role="dialog" aria-modal="true" aria-labelledby="restart-title"><div class="confirm-symbol">${He("restart")}</div><h2 id="restart-title">Fresh scoops?</h2><p>Start this little puzzle again.</p><div class="confirm-actions"><button class="icon-button cancel" aria-label="Keep playing" data-action="cancel">${He("close")}</button><button class="icon-button accept" aria-label="Restart level" data-action="confirm-restart">${He("check")}</button></div></section></div>`,Re.querySelector(".cancel")?.focus()}function Zm(){tn||Fn||(tn=!0,ge=void 0,Tn(null),xe(),dl.postMessage({board:pi(Nt.board),capacity:Nt.capacity,request:++_n}))}dl.onmessage=i=>{if(!(i.data.request!==_n||Ce!=="play"))if(tn=!1,i.data.kind==="solved"&&i.data.moves.length)ge=i.data.moves[0],Pe=ge.from,xe(),En.play("select"),ki("Follow the pink ring to the mint ring.");else{xe(),rn.querySelector('[data-action="undo"]')?.classList.add("nudge"),ki("Let’s undo a scoop, then try the hint again.");const e=document.createElement("div");e.className="hint-status",e.textContent="↶ A little step back. Try Undo.",rn.append(e)}};let be=null;rn.addEventListener("pointerdown",i=>{if(Ce!=="play"||Fn||Re.children.length)return;const t=i.target instanceof Element?i.target.closest("[data-cone]"):null;t&&(be={id:i.pointerId,cone:Number(t.dataset.cone),x:i.clientX,y:i.clientY,dragging:!1})});window.addEventListener("pointermove",i=>{!be||i.pointerId!==be.id||Fn||(!be.dragging&&Math.hypot(i.clientX-be.x,i.clientY-be.y)>9&&Nt.board[be.cone].length&&(be.dragging=!0,ge=void 0,Tn(be.cone),En.play("select")),be.dragging&&(i.preventDefault(),ke.drag(be.cone,i.clientX,i.clientY)))},{passive:!1});window.addEventListener("pointerup",i=>{if(!be||i.pointerId!==be.id)return;const t=be;if(be=null,!t.dragging)return;const e=Hi.slots.findIndex(n=>i.clientX>=n.x&&i.clientX<=n.x+n.width&&i.clientY>=n.y&&i.clientY<=n.y+n.height);ss=!0,setTimeout(()=>ss=!1,0),e>=0&&e!==t.cone&&Pr(Nt.board,Nt.capacity,{from:t.cone,to:e})?ml(e):(ke.invalid(t.cone),En.play("invalid"),Tn(null),xe())});window.addEventListener("pointercancel",()=>{be=null,Tn(null),Ce==="play"&&xe()});let ss=!1;document.addEventListener("click",i=>{if(ss||Fn)return;const t=i.target instanceof Element?i.target.closest("button"):null;if(!t){Ce==="play"&&(ge=void 0,Tn(null));return}if(!t.disabled){if(t.dataset.cone!==void 0){const e=Number(t.dataset.cone);Pe!==null?ml(e):Nt.board[e].length&&(ge=void 0,Tn(e),En.play("select"));return}if(t.dataset.level){Ni(Number(t.dataset.level));return}switch(t.dataset.action){case"play":Ni(ie.nextLevel);break;case"home":_n++,tn=!1,Ce="title",Re.innerHTML="",xe();break;case"map":_n++,tn=!1,Ce="map",Re.innerHTML="",xe();break;case"mute":ie.muted=!ie.muted,En.muted=ie.muted,ys(),xe();break;case"undo":_n++,tn=!1,Nt.undo(),Pe=null,ge=void 0,xe();break;case"restart":Km();break;case"cancel":Re.innerHTML="",rn.querySelector('[data-action="restart"]')?.focus();break;case"confirm-restart":_n++,tn=!1,Nt.restart(),Pe=null,ge=void 0,Re.innerHTML="",xe();break;case"hint":Zm();break;case"extra":ye>=9&&Nt.addCone()&&(ge=void 0,Pe=null,_n++,tn=!1,xe());break;case"next":ye===50?(Ce="map",Re.innerHTML="",xe()):Ni(ye+1);break}}});document.addEventListener("keydown",i=>{if(i.key==="Escape"&&(Re.children.length&&!as(Nt.board,Nt.capacity)?Re.innerHTML="":(ge=void 0,Tn(null))),i.key==="Tab"&&Re.children.length){const t=Re.querySelectorAll("button"),e=t[0],n=t[t.length-1];i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())}});hl();if(hi){const i=Number(new URLSearchParams(location.search).get("level")??"42");if((hi==="midgame"||hi==="board")&&(Ni(i),hi==="midgame")){for(const t of In[i-1].solution.slice(0,3))Nt.move(t);ge=In[i-1].solution[3],Pe=ge?.from??null,xe()}if(hi==="win"){Ni(9);for(const t of In[8].solution)Nt.move(t);xe(),pl()}hi==="map"&&(ie.completedLevels=Array.from({length:13},(t,e)=>e+1),ie.nextLevel=14,Ce="map",xe())}Object.defineProperty(window,"__scoop",{get:()=>({screen:Ce,levelId:ye,board:pi(Nt.board),history:Nt.history.length,selected:Pe,extra:Nt.extra,won:as(Nt.board,Nt.capacity),layout:Hi,renderer:{calls:ke.renderer.info.render.calls,triangles:ke.renderer.info.render.triangles,dpr:ke.renderer.getPixelRatio()}})});"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"}).then(()=>navigator.serviceWorker.ready).then(i=>{navigator.serviceWorker.controller||i.active?.postMessage("CLAIM_CLIENTS")}).catch(()=>{});
