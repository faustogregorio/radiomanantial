(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"ct+p":function(i,t,n){"use strict";n.r(t),n.d(t,"HomeModule",(function(){return m}));var e=n("ofXK"),a=n("tyNb"),s=n("kZhQ"),c=n("fXoL"),r=n("Wnxi"),o=n("XiUz");const p=[{path:"",component:(()=>{class i{constructor(i){this.mainImageService=i,this.domain=s.b}ngOnInit(){this.getSelectedMainImage(),this.imagenPrincipalSubscription=this.mainImageService.imagenPrincipalChange.subscribe(i=>{console.log(i),""!==i&&(this.imagenPrincipal=`${this.domain}/uploads/${i}`)})}getSelectedMainImage(){this.mainImageService.getSelectedMainImage().subscribe(i=>{console.log(i),this.imagenPrincipal=0!==i.data.length?`${this.domain}/uploads/${i.data[0].nombre}`:"assets/img/imagen_principal.jpeg"},i=>{this.imagenPrincipal="assets/img/imagen_principal.jpeg"})}ngOnDestroy(){this.imagenPrincipalSubscription.unsubscribe()}}return i.\u0275fac=function(t){return new(t||i)(c.Ob(r.a))},i.\u0275cmp=c.Ib({type:i,selectors:[["app-home"]],decls:4,vars:1,consts:[["fxLayout","column","fxLayoutAlign","start start",2,"width","100%"],["fxLayoutAlign","start start",2,"width","100%"],["src","assets/img/logo.png","alt","","height","80px",2,"margin","40px 0px -20px 20px","z-index","1"],["alt","","width","100%",2,"clip-path","polygon(0 10%, 100% 0, 100% 100%, 0 100%)",3,"src"]],template:function(i,t){1&i&&(c.Ub(0,"div",0),c.Ub(1,"div",1),c.Pb(2,"img",2),c.Tb(),c.Pb(3,"img",3),c.Tb()),2&i&&(c.Cb(3),c.ic("src",t.imagenPrincipal,c.pc))},directives:[o.c,o.b],styles:[""]}),i})()}];let g=(()=>{class i{}return i.\u0275mod=c.Mb({type:i}),i.\u0275inj=c.Lb({factory:function(t){return new(t||i)},imports:[[a.a.forChild(p)],a.a]}),i})();var l=n("YUcS");let m=(()=>{class i{}return i.\u0275mod=c.Mb({type:i}),i.\u0275inj=c.Lb({factory:function(t){return new(t||i)},imports:[[e.b,g,l.a]]}),i})()}}]);