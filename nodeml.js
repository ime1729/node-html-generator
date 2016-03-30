require('prototype');
function genhtml(html){
  function processObject(obj){
    if(Array.isArray(obj)){
      return obj.map(function(arg){return genhtml(arg)}).join("");}
    else{return gentag(obj);}}
  function gentag(json){
    function optionList(olist,safe){
      if(olist==undefined){return "";}
      else{return " "+Object.keys(olist).map(function(k){
	if(olist[k]===false){return "";}
	else{return k+"=\""+(safe?encodeURI(olist[k]):olist[k])+"\"";}}).
	   join(" ");}}
    if(json==null){throw new Error("Malformed expression: null detected");}
    else if('h' in json){
      return "<"+json.h+optionList(json.o,true)+optionList(json.s,false)
	+">"+genhtml(json.b)+"</"+json.h+">";}
    else if('l' in json){return "<"+json.l+""+optionList(json.o,true)
			 +optionList(json.s,false)+">";}
    else{throw new Error("Malformed expression:"+JSON.stringify(json));}}
  if(typeof html=="number"){return ""+html;}
  else if(typeof html=="string"){return html.escapeHTML();}
  else if(typeof html=="undefined"){return "";}
  else if(typeof html=="object"){return processObject(html);}
  else{throw new Error("GENHTML does not support "+(typeof html));}}
module.exports.genhtml=genhtml;
module.exports.br={l:"br"};
