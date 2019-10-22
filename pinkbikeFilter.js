// ==UserScript==
// @name        Pinkbike comment and article filter
// @namespace   Violentmonkey Scripts
// @include     http://www.pinkbike.com/*
// @include     https://www.pinkbike.com/*
// @version     1.1
// ==/UserScript==

/*** start of settings ***************************************/

//  Configure the users to block.
//  Suppose a user 'Billy Bob' has profile url "https://www.pinkbike.com/u/billybob/"
//  then use:
//
//  	var userNames = ['billybob'];
//
//  If you want to block a user with url "https://www.pinkbike.com/u/johnny3000/" too
//  then use:
//
//      var userNames = ['billybob','johnny3000'];
//
var userNames = [''];

// toggle to hide replies to commments by blocked users: true  for yes,  false for no.
var filterReplies = true;

// Configure articles  to block
//
// If you want to hide front-page articles which have a tag that links to urls
// 'https://www.pinkbike.com/news/tags/emtb/' or 'https://www.pinkbike.com/news/tags/xc-racing' , 
// then use:
//  
//     var tags = ['emtb','xc-racing'];
//
var tags = [''];

/**** end of settings ****************************************/

// hide articles by tags
if (articles = document.getElementById('news-container')){
  articles = articles.getElementsByClassName('news-style1');
  for (var i=0;i < articles.length; i++){
    var tagsInArticle = articles[i].querySelectorAll('.pb-tag');
    for (var ii=0;ii<tagsInArticle.length;ii++){
        var tagUrl = tagsInArticle[ii].getAttribute("href");
        for (var iii=0;iii<tags.length;iii++){
           if ( tagUrl == 'https://www.pinkbike.com/news/tags/' + tags[iii]  + '/'){
             articles[i].style.display = 'none';
             break;
          }
        }
    }
  }
}

// hide article-comments by username

var arrRegexpAtUserName = [];
for (var i=0;i<userNames.length;i++){
  arrRegexpAtUserName[i]= new RegExp('\@'+userNames[i], 'g');
  i++;
 
}

var collPpcont = document.querySelectorAll('.ppcont');
for(var i=0;i<collPpcont.length;i++){
  var collCmcont = collPpcont[i].querySelectorAll('.cmcont');
  for(var ii=0;ii<collCmcont.length;ii++){
      try{
        var atUserName = collCmcont[ii].querySelectorAll('.comtext')[0].innerText;
        var userUrl = collCmcont[ii].children[2].getElementsByTagName('a')[0].getAttribute("href");
      }catch(err) {
        console.log(err.message);
      }
      for (var iii=0;iii<userNames.length;iii++){
          if  (userUrl && userUrl == 'https://www.pinkbike.com/u/' + userNames[iii] + '/'){
               collCmcont[ii].style.display = 'none';
               if(filterReplies === true && ii==0){
                   collPpcont[i].style.display = 'none';
               }
               break;            
          }
          if ( atUserName && filterReplies === true && atUserName.match(arrRegexpAtUserName[iii])){
             collCmcont[ii].style.display = 'none';
             break
          }
      }
    }
}
