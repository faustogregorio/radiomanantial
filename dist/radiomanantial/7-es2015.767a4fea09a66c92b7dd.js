(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"ct+p":function(i,n,t){"use strict";t.r(n),t.d(n,"HomeModule",function(){return d});var e=t("ofXK"),a=t("tyNb"),s=t("kZhQ"),c=t("fXoL"),r=t("Wnxi"),o=t("XiUz");const p=[{path:"",component:(()=>{class i{constructor(i){this.mainImageService=i,this.domain=s.b}ngOnInit(){this.getSelectedMainImage(),this.imagenPrincipalSubscription=this.mainImageService.imagenPrincipalChange.subscribe(i=>{""!==i&&(this.imagenPrincipal=`${this.domain}/uploads/${i}`)})}getSelectedMainImage(){this.mainImageService.getSelectedMainImage().subscribe(i=>{this.imagenPrincipal=i.success?`${this.domain}/uploads/${i.data.nombre}`:"assets/img/imagen_principal.jpeg"},i=>{this.imagenPrincipal="assets/img/imagen_principal.jpeg"})}ngOnDestroy(){this.imagenPrincipalSubscription.unsubscribe()}}return i.\u0275fac=function(n){return new(n||i)(c.Mb(r.a))},i.\u0275cmp=c.Gb({type:i,selectors:[["app-home"]],decls:4,vars:1,consts:[["fxLayout","column","fxLayoutAlign","start start",2,"width","100%"],["fxLayoutAlign","start start",2,"width","100%"],["id","logo","src","assets/img/logo.png","alt",""],["alt","","width","100%",2,"clip-path","polygon(0 10%, 100% 0, 100% 100%, 0 100%)",3,"src"]],template:function(i,n){1&i&&(c.Sb(0,"div",0),c.Sb(1,"div",1),c.Nb(2,"img",2),c.Rb(),c.Nb(3,"img",3),c.Rb()),2&i&&(c.Bb(3),c.jc("src",n.imagenPrincipal,c.sc))},directives:[o.d,o.c],styles:["#logo[_ngcontent-%COMP%]{height:80px;margin:40px 0 -20px 20px;z-index:1}@media screen and (max-width:1279px) and (min-width:960px){#logo[_ngcontent-%COMP%]{height:75px;margin:20px 0 -10px 20px;z-index:1}}@media screen and (max-width:959px) and (min-width:600px){#logo[_ngcontent-%COMP%]{height:65px;margin:10px 0 -5px 20px;z-index:1}}@media screen and (max-width:599px){#logo[_ngcontent-%COMP%]{height:50px;margin:10px 0 -5px 20px;z-index:1}}"]}),i})()}];let g=(()=>{class i{}return i.\u0275mod=c.Kb({type:i}),i.\u0275inj=c.Jb({factory:function(n){return new(n||i)},imports:[[a.d.forChild(p)],a.d]}),i})();var m=t("YUcS");let d=(()=>{class i{}return i.\u0275mod=c.Kb({type:i}),i.\u0275inj=c.Jb({factory:function(n){return new(n||i)},imports:[[e.b,g,m.a]]}),i})()}}]);