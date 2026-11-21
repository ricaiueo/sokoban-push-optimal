import*as f from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,Z='udlr';
for(const u of f.readdirSync(I)){
const R=(f.readFileSync(I+'/'+u+'/level.txt')+'').trim().split('\n'),w=R[0].length,n=w*R.length,W=new Uint8Array(n),G=[],B=[],D=[-w,w,-1,1];
let P=0;
for(let i=0;i<n;i++){const v='#$*.@+'.indexOf(R[i/w|0][i%w]);if(!v)W[i]=1;if(v>1&&v!=4)G.push(i);if(v>0&&v<3)B.push(i);if(v>3)P=i}
const c=P-P%w,K=i=>((i%w-1)/7|0)+(i>c)*9,V=new Int32Array(n),A=new Int32Array(n),T=[];
let S=0,m='',a=P;
for(const r of new Set(B.map(K))){
const x=B.filter(b=>K(b)==r),o=G.filter(g=>K(g)==r),Y=W.slice();
for(const b of T)Y[b]=1;
const Q=[[x,a,'']],N=new Set();
for(let h=0;;h++){const[L,p,s]=Q[h];
if(L.every(b=>o.includes(b))){m+=s;a=p;break}
const q=[p],E=++S;A[p]=E;V[p]=p;
for(let k=0;k<q.length;k++)for(const d of D){const z=q[k]+d;if(!Y[z]&&A[z]!=E&&!L.includes(z)){A[z]=E;V[z]=q[k];q.push(z)}}
for(const b of L){
for(let j=0;j<4;j++){const d=D[j],t=b+d,y=b-d;
if(A[y]!=E||Y[t]||L.includes(t)||(Y[t-1]|Y[t+1])&&(Y[t-w]|Y[t+w])&&!o.includes(t))continue;
const J=L.slice();J[L.indexOf(b)]=t;J.sort((a,b)=>a-b);
let k=b;for(const e of J)k=k*n+e;
if(N.has(k))continue;
N.add(k);
let g='';for(let z=y;z!=p;z=V[z])g=Z[D.indexOf(z-V[z])]+g;
Q.push([J,b,s+g+Z[j]])}}}
T.push(...o)}
f.mkdirSync(O+'/'+u,{recursive:true});
f.writeFileSync(O+'/'+u+'/solution.txt',m)}
