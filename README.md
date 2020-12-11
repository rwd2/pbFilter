# pbFilter
PbFilter is script you can run in your webbrowser to filter out certain contents of the website pinkbike.com:

- filter out front-page news articles based on any tags you choose, not just the ones that can be set in the user profile
- filter out article comments by specific users

Both work without the need to be logged in.

To use it you need to:

1) install a browser extension that can run Greasemonkey scripts. So Greasemonkey or Violentmonkey for Firefox, and Tampermonkey for Chrome.

2) in the extension settings press 'new' to add a script

3) choose either 'url' and use  https://raw.githubusercontent.com/rwd2/pbCommentFilter/master/pbFilter.js, or create new script and paste te contents of pbFilter.js in it.

3) edit the usernames and tags in the script that you want to filter out

4) visit pinkbike.com to see it in action
