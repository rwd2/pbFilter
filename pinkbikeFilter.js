// ==UserScript==
// @name        Pinkbike comment and article filter
// @namespace   Violentmonkey Scripts
// @include     http://www.pinkbike.com/*
// @include     https://www.pinkbike.com/*
// @version     1.0
// ==/UserScript==

/*** start of settings ***************************************/

//  Configure the users to block.
//  Suppose a user 'Billy Bob' has profile url "https://www.pinkbike.com/u/billybob/"
//  then use:
//
//  	var userUrls = ['billybob'];
//
//  If you want to block a user with url "https://www.pinkbike.com/u/johnny3000/" too
//  then use:
//
//      var userUrls = ['billybob','johnny3000'];
//
var userUrls = [''];

// toggle to hide replies to commments by blocked users: true  for yes,  false for no.
var filterReplies = true;

// Configure articles  to block
//
// If you want to hide front-page articles which have a tag that links to urls
// 'https://www.pinkbike.com/news/tags/emtb/' or 'https://www.pinkbike.com/news/tags/xc-racing' , 
// then use:
//  
//     var newsTags = ['emtb','xc-racing'];
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
var collPpcont = document.querySelectorAll('.ppcont');
for(var i=0;i<collPpcont.length;i++){
  var collCmcont = collPpcont[i].querySelectorAll('.cmcont');
  for(var ii=0;ii<collCmcont.length;ii++){
      try{
        var div = collCmcont[ii].children[2];
        var userUrl = div.getElementsByTagName('a')[0].getAttribute("href");
        for (var iii=0;iii<userUrls.length;iii++){
           if (userUrl == 'https://www.pinkbike.com/u/' + userUrls[iii] + '/'){
             div.style.display = 'none';
             if(filterReplies === true && ii==0){
                   collPpcont[i].style.display = 'none';
             }
             break;
          }
        }
      }catch(err) {
        console.log(err.message);
      }
  }
}





