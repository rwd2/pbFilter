// ==UserScript==
// @name        Pinkbike comment and article filter
// @namespace   Violentmonkey Scripts
// @include     http://www.pinkbike.com/*
// @include     https://www.pinkbike.com/*
// @version     1.2
// ==/UserScript==

/*** start of settings ***************************************/

//  Configure which users to block.
//
//  Add the unsernames you want to block by enclosing them in single quotes, separated by a comma.
//
//  -- Example -- 
//
//  Suppose a user 'Billy Bob' has profile url "https://www.pinkbike.com/u/BillyBob/"
//  then use:
//
//  	var userNames = ['BillyBob'];
//
//  When you want to block users with url "https://www.pinkbike.com/u/johnny3000/" and 
//  "https://www.pinkbike.com/u/mtbderp/" too, then use:
//
//      var userNames = ['BillyBob','johnny3000','mtbderp'];
//
var userNames = [''];

// toggle to hide replies to commments by blocked users: true  for yes,  false for no.
var filterReplies = true;

// Configure which articles to block.
//
//  Add the tags you want to block by enclosing them in single quotes, separated by a comma.
//
// -- Example -- 
//
// If you want to hide front-page articles which have a tag that links to urls
// 'https://www.pinkbike.com/news/tags/emtb/' and/or 'https://www.pinkbike.com/news/tags/contests-and-deals/' ,
// then use:
//
//     var tags = ['emtb','contests-and-deals'];
//
var tags = [''];

// when set to 'true' don't filter anything but show a red outline around articles and comments that would be filtered.
var testmode = false;

/**** end of settings ****************************************/

var i = 0;
var ii = 0;
var iii = 0;
var articles, tagsInArticle, tagUrl;

function hideElement(domElement){
   if (testmode === true){
      domElement.style.border = '2px solid red';
   }else{
      domElement.style.display = 'none';   
   }
}

// hide articles by tags
if (articles = document.getElementById('news-container')){
  articles = articles.getElementsByClassName('news-style1');
  for (i=0;i < articles.length; i++){
    tagsInArticle = articles[i].querySelectorAll('.pb-tag');
    for ( ii=0;ii<tagsInArticle.length;ii++){
        tagUrl = tagsInArticle[ii].getAttribute("href");
        for ( iii=0;iii<tags.length;iii++){
           if ( tagUrl == 'https://www.pinkbike.com/news/tags/' + tags[iii] + '/'){
             hideElement(articles[i]);
             console.log (tagUrl);
             break;
          }
        }
    }
  }
}

// hide article-comments by username
var arrRegexpAtUserName = [];
for (i=0;i<userNames.length;i++){
  arrRegexpAtUserName[i]= new RegExp('\@'+userNames[i], 'g');
}

var atUserName, userUrl;
var collPpcont = document.querySelectorAll('.ppcont');
for(i=0;i<collPpcont.length;i++){
  var collCmcont = collPpcont[i].querySelectorAll('.cmcont');                  
  for( ii=0;ii<collCmcont.length;ii++){
      try{
        atUserName = collCmcont[ii].querySelectorAll('.comtext')[0].innerText; 
        userUrl = collCmcont[ii].getElementsByTagName('a')[1].getAttribute("href");
      }catch(err) {  
        console.log(err.message);
      }
      for ( iii=0;iii<userNames.length;iii++){
          if (userUrl && userUrl == 'https://www.pinkbike.com/u/' + userNames[iii] + '/'){  
              hideElement(collCmcont[ii]);
               if(filterReplies === true && ii==0){
                  hideElement(collPpcont[i]);
               }
               break;
          }
          if ( atUserName && filterReplies  && atUserName.match(arrRegexpAtUserName[iii])){
              hideElement(collCmcont[ii]);
             break;
          }
      }
    }
}

