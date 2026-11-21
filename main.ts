import*as f from'node:fs';
const I='/input',O='/output',Z='udlr';
for(const u of f.readdirSync(I)){
const S=f.readFileSync(I+'/'+u+'/level.txt')+'',w=S.indexOf('\n')+1,n=S.length,W=new Uint8Array(n),G=[],B=[],D=[-w,w,-1,1];
let P=0;
for(let i=0;i<n;i++){const v='\n#$*.@+'.indexOf(S[i]);if(v>=0&&v<2)W[i]=1;if(v>2&&v!=5)G.push(i);if(v>1&&v<4)B.push(i);if(v>4)P=i}
const c=P-P%w,K=i=>((i%w-1)/7|0)+(i>c)*9,V=new Int32Array(n),A=new Int32Array(n);
let E=0,m='',a=P;
for(const r of new Set(B.map(K))){
const x=B.filter(b=>K(b)==r),o=G.filter(g=>K(g)==r),Q=[[x,a,'']],N=new Set();
for(let h=0;;h++){const[L,p,s]=Q[h];
if(L.every(b=>o.includes(b))){m+=s;a=p;break}
const q=[p],e=++E;A[p]=e;V[p]=p;
for(let k=0;k<q.length;k++)for(const d of D){const z=q[k]+d;if(!W[z]&&A[z]!=e&&!L.includes(z)){A[z]=e;V[z]=q[k];q.push(z)}}
for(const b of L)for(let j=0;j<4;j++){const d=D[j],t=b+d,y=b-d;
if(A[y]!=e||W[t]||L.includes(t)||(W[t-1]|W[t+1])&&(W[t-w]|W[t+w])&&!o.includes(t))continue;
const J=L.slice();J[L.indexOf(b)]=t;J.sort((a,b)=>a-b);
let k=b;for(const i of J)k=k*n+i;
if(N.has(k))continue;
N.add(k);
let g='';for(let z=y;z!=p;z=V[z])g=Z[D.indexOf(z-V[z])]+g;
Q.push([J,b,s+g+Z[j]])}}
for(const g of o)W[g]=1}
f.mkdirSync(O+'/'+u,{recursive:true});
f.writeFileSync(O+'/'+u+'/solution.txt',m)}
