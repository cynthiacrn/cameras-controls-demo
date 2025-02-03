import{E as x,V as l,Q as g,S as M,C as D,B as K,l as F,e as z,D as A,A as j,P as q,W as P,k as W}from"./three.module-920182d7.js";const Q={type:"change"};class C extends x{constructor(m,R){super(),this.object=m,this.domElement=R,this.movementSpeed=1,this.rollSpeed=.005,this.dragToLook=!1,this.autoForward=!1;const e=this,w=1e-6,u=new g,v=new l;this.tmpQuaternion=new g,this.status=0,this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0},this.moveVector=new l(0,0,0),this.rotationVector=new l(0,0,0),this.keydown=function(t){if(!t.altKey){switch(t.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=.1;break;case"KeyW":this.moveState.forward=1;break;case"KeyS":this.moveState.back=1;break;case"KeyA":this.moveState.left=1;break;case"KeyD":this.moveState.right=1;break;case"KeyR":this.moveState.up=1;break;case"KeyF":this.moveState.down=1;break;case"ArrowUp":this.moveState.pitchUp=1;break;case"ArrowDown":this.moveState.pitchDown=1;break;case"ArrowLeft":this.moveState.yawLeft=1;break;case"ArrowRight":this.moveState.yawRight=1;break;case"KeyQ":this.moveState.rollLeft=1;break;case"KeyE":this.moveState.rollRight=1;break}this.updateMovementVector(),this.updateRotationVector()}},this.keyup=function(t){switch(t.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=1;break;case"KeyW":this.moveState.forward=0;break;case"KeyS":this.moveState.back=0;break;case"KeyA":this.moveState.left=0;break;case"KeyD":this.moveState.right=0;break;case"KeyR":this.moveState.up=0;break;case"KeyF":this.moveState.down=0;break;case"ArrowUp":this.moveState.pitchUp=0;break;case"ArrowDown":this.moveState.pitchDown=0;break;case"ArrowLeft":this.moveState.yawLeft=0;break;case"ArrowRight":this.moveState.yawRight=0;break;case"KeyQ":this.moveState.rollLeft=0;break;case"KeyE":this.moveState.rollRight=0;break}this.updateMovementVector(),this.updateRotationVector()},this.pointerdown=function(t){if(this.dragToLook)this.status++;else{switch(t.button){case 0:this.moveState.forward=1;break;case 2:this.moveState.back=1;break}this.updateMovementVector()}},this.pointermove=function(t){if(!this.dragToLook||this.status>0){const n=this.getContainerDimensions(),s=n.size[0]/2,y=n.size[1]/2;this.moveState.yawLeft=-(t.pageX-n.offset[0]-s)/s,this.moveState.pitchDown=(t.pageY-n.offset[1]-y)/y,this.updateRotationVector()}},this.pointerup=function(t){if(this.dragToLook)this.status--,this.moveState.yawLeft=this.moveState.pitchDown=0;else{switch(t.button){case 0:this.moveState.forward=0;break;case 2:this.moveState.back=0;break}this.updateMovementVector()}this.updateRotationVector()},this.update=function(t){const n=t*e.movementSpeed,s=t*e.rollSpeed;e.object.translateX(e.moveVector.x*n),e.object.translateY(e.moveVector.y*n),e.object.translateZ(e.moveVector.z*n),e.tmpQuaternion.set(e.rotationVector.x*s,e.rotationVector.y*s,e.rotationVector.z*s,1).normalize(),e.object.quaternion.multiply(e.tmpQuaternion),(v.distanceToSquared(e.object.position)>w||8*(1-u.dot(e.object.quaternion))>w)&&(e.dispatchEvent(Q),u.copy(e.object.quaternion),v.copy(e.object.position))},this.updateMovementVector=function(){const t=this.moveState.forward||this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right,this.moveVector.y=-this.moveState.down+this.moveState.up,this.moveVector.z=-t+this.moveState.back},this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp,this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft,this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft},this.getContainerDimensions=function(){return this.domElement!=document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}},this.dispose=function(){this.domElement.removeEventListener("contextmenu",E),this.domElement.removeEventListener("pointerdown",f),this.domElement.removeEventListener("pointermove",p),this.domElement.removeEventListener("pointerup",S),window.removeEventListener("keydown",b),window.removeEventListener("keyup",k)};const p=this.pointermove.bind(this),f=this.pointerdown.bind(this),S=this.pointerup.bind(this),b=this.keydown.bind(this),k=this.keyup.bind(this);this.domElement.addEventListener("contextmenu",E),this.domElement.addEventListener("pointerdown",f),this.domElement.addEventListener("pointermove",p),this.domElement.addEventListener("pointerup",S),window.addEventListener("keydown",b),window.addEventListener("keyup",k),this.updateMovementVector(),this.updateRotationVector()}}function E(i){i.preventDefault()}const a=document.querySelector("canvas.webgl-fly-controls"),o={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{o.width=window.innerWidth,o.height=window.innerHeight,r.aspect=o.width/o.height,r.updateProjectionMatrix(),h.setSize(o.width,o.height),h.setPixelRatio(Math.min(window.devicePixelRatio,2))});window.addEventListener("dblclick",()=>{document.fullscreenElement||document.webkitFullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():a.requestFullscreen?a.requestFullscreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()});const c=new M;c.background=new D("#222222");const T=new K(2,2,2),U=new F({color:4500104});for(let i=0;i<100;i++){const m=new z(T,U);m.position.set((Math.random()-.5)*100,(Math.random()-.5)*100,(Math.random()-.5)*100),c.add(m)}const L=new A(16777215,1);L.position.set(5,10,5);c.add(L);const _=new j(6710886);c.add(_);const r=new q(65,o.width/o.height,.1,500);r.position.set(0,5,10);c.add(r);const h=new P({canvas:a,antialias:!0});h.setPixelRatio(window.devicePixelRatio);h.setSize(o.width,o.height);h.shadowMap.enabled=!0;const d=new C(r,a);d.movementSpeed=20;d.rollSpeed=Math.PI/6;d.autoForward=!1;d.dragToLook=!0;const H=new W,V=()=>{const i=H.getDelta();d.update(i),h.render(c,r),window.requestAnimationFrame(V)};V();
//# sourceMappingURL=fly-controls-3b20badc.js.map
