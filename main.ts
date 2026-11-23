import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const T=`!5U"*+/0!!!!!!!!'''''''&'''&'''!'''!!!!!!!!!!!!!ABBA!!!!!!!!!!!!&#!!!!!!!!!!!!!!""%"`;
function run(p,q){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,i=0,pc=0,st=0,ol=0;
 const t=e=>({o:o.slice(0,ol),c:e});
 for(;;){
  if(st===1e6)return t(10);
  if(pc<0||pc>=p.length)return t(9);
  const b=p[pc],v=T.charCodeAt(b)-33,u=v&3,w=v>>2&3,m=[0,1,2,4][v>>4];
  if(pc+m>=p.length)return t(9);
  st++;
  if(s<u)return t(2);
  if(s-u+w>256)return t(3);
  pc+=1+m;
  if(b==0)return t(0);
  else if(b==1)D[s++]=p[pc-1]<<24>>24;
  else if(b==2)D[s++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;
  else if(b==3)s--;
  else if(b==4){D[s]=D[s-1];s++;}
  else if(b==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
  else if(b==6){D[s]=D[s-2];s++;}
  else if(b==7)[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
  else if(b>15&&b<35&&b-23&&b-27&&b-31){
   const y=D[s-1],x=D[s-2];
   if(b>18&&b<23&&!y)return t(4);
   s-=2;D[s++]=[x+y|0,x-y|0,Math.imul(x,y),(x/y)|0,x%y|0,(x>>>0)/(y>>>0)|0,(x>>>0)%(y>>>0)|0,0,x&y,x|y,x^y,0,x<<y,x>>y,(x>>>y)|0,0,x==y?1:0,x<y?1:0,(x>>>0)<(y>>>0)?1:0][b-16];
  }
  else if(b==23||b==27)D[s-1]=b==23?-D[s-1]|0:~D[s-1];
  else if(b>47&&b<51){const r=(p[pc-2]|p[pc-1]<<8)<<16>>16;if(b==48||(b==49)===(D[--s]==0))pc+=r;}
  else if(b==51){if(c==64)return t(7);C[c++]=pc;pc=p[pc-2]|p[pc-1]<<8;}
  else if(b==52){if(!c)return t(8);pc=C[--c];}
  else if(b==64){const a=D[s-1];if(a<0||a>255)return t(6);D[s-1]=M[a];}
  else if(b==65){const a=D[s-1],z=D[s-2];if(a<0||a>255)return t(6);s-=2;M[a]=z;}
  else if(b==80){const g=String(D[s-1]);if(ol+g.length>65536)return t(11);s--;o.set(Buffer.from(g),ol);ol+=g.length;}
  else if(b==81){if(ol+1>65536)return t(11);o[ol++]=D[--s]&255;}
  else if(b==82)D[s++]=i<q.length?q[i++]:-1;
  else if(b==83)return t(D[--s]&255);
  else return t(5);
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
 const r=run(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',r.o);
 writeFileSync(O+'/'+d+'/exit.txt',r.c+'\n');
}
