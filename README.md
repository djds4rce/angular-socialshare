Angular Social Share
=========

Angular Social Share is a collection of directives which lets you easily share your links various social networks. Currently Facebok, Google, Twitter and Linkdin are supported. Social Networks get the Meta data of the shared content like Title, Summary and Image from the Meta tags on the page by scraping. But Single Page Apps like Angular are unable to support crawling. But these dirictives use alternative so that Meta data is displayed where it is possible. 
Checkout the [Demo].
Change Log
----
As of Verstion 1 This directive supports two way binding of data, so now you can populate the data in the directive from a HTTP request.

Future Plans
----
Support asyncronous loading of corresponding social plugin javascript assets.

Getting Started
-----
Install the library through bower.
```js
bower install angular-socialshare
```
Include the script (and optional css file) in your html file.
```html
<link rel='stylesheet' href="bower_components/angular-socialshare/angular-socialshare.min.css">
<script src="bower_components/angular-socialshare/angular-socialshare.min.js"></script>
```

Add to your APP's dependency.
```js
angular.module('testing',['djds4rce.angular-socialshare'])
```
IMPORTANT
----
For Correct Sharing of links and updating share count you must enable HTML5 Mode True for your application. i.e No `#` in URL'S .
```js
angular.module('testing').config(function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
});
```
HTML5 Mode requires server configration [Explained Here] 


Share on Facebook
----
Facebook share uses facebook API which requires us to provide a APPID. Register a facebook app and Configure the APPID in your appplication. Note that you will get an error regarding 'not permitted URL' if you are testing this button in a localhost environment.

```js
angular.module('testing').run(function($FB){
  $FB.init('YOUR_APPID');
});
```
Use the Facebook Directive
```html
 <a facebook class="facebookShare" data-url='http://google.com' data-shares='shares'>{{ shares }}</a>
```
As we are using Facebook share API and not the facebook share button, you will have to style your own Facebook button, or use the provided stylesheet that has styles for the horizontal count button. You also need to display the share count, which the directive fetches from a diffrent API. The directive has transclusion set to true. The latest Facebook share API only allows for a URL to be supplied, it will scrape the other data (image, title, description) from the supplied URL.

The Attributes for the directives are
```js
/*
data-url: URL of the Shared Content
data-shares: The Scope variable on which share count will be binded to. This lets you put
multiple share buttons on a single page and bind the share count to the respective model object.
*/
```

####Share via Feed Dialog
The feed dialog works in the same way as the normal share dialog, but also has some addittional attributes available

```html
 <a facebook-feed-share class="facebookShare" data-url='http://google.com' data-shares='shares', data-description="Example text">{{ shares }}</a>
```

```js
/*
data-url: URL of the Shared Content
data-shares: The Scope variable on which share count will be binded to. This lets you put
multiple share buttons on a single page and bind the share count to the respective model object.
data-picture: The URL of a picture attached to the share. The picture must be at least 200px by 200px.
data-source: The URL of a media file (either SWF or MP3) attached to this share. If SWF, you must also specify picture to provide a thumbnail for the video.
data-name: The name of the link attachment.
data-caption: The caption of the link (appears beneath the link name). If not specified, this field is automatically populated with the URL of the link.
data-description: The description of the link (appears beneath the link caption). If not specified, this field is automatically populated by information scraped from the link, typically the title of the page.
data-properties: A JSON object of key/value pairs which will appear in the stream attachment beneath the description, with each property on its own line. Keys must be strings, and values can be either strings or JSON objects with the keys text and href.
data-actions: A JSON array containing a single object describing the action link which will appear next to the 'Comment' and 'Like' link under posts. The contained object must have the keys name and link.
*/
```

Twitter
----
Include the twitter javascript in your HTML. 
```html
<script src="http://platform.twitter.com/widgets.js"></script>
```
Add Directive to the element where you want to display your Twitter Button
```html
<a twitter  data-lang="en" data-count='horizontal' data-url='http://google.com' data-via='notsosleepy' data-size="medium" data-text='Testing Twitter Share' ></a>
```
The Attributes for the directives are
```js
/*
data-lang: Language of the tweet
data-url: URL of the Shared Content
data-count: Position of the share counter
data-size: Size of the tweet button
data-text: Content of the tweet
data-via: User handle which will be tagged in the tweet
For options checkout https://dev.twitter.com/docs/tweet-button
*/
```
Linkedin
----
Although Linkedin has a share button and also a Javascript share API it does not take the title and the content as its parameters hence we will have to use the raw share URL to share the content.

Use the Linkedin Directive
```html
<div linkedin class="linkedinShare" data-url='http://www.google.com.au' data-title='Linkedin Share' data-summary="testing Linkedin Share" data-shares='linkedinshares'>{{linkedinshares}}</div>
```
Linkedin Directive works similar to the Facebook Mechanism. This will force us to add our own style to the button and also display count which is fetched by the directive through a diffrent API. The supplied stylesheet contains styling for the horizontal styled button.

The Attributes for the directives are
```js
/*
data-title: Title of the Shared Content
data-url: URL of the Shared Content
data-summary: Summary of the content
data-shares: The Scope variable on which share count will be binded to. This lets you put
multiple share buttons on a single page and bind the share count to the respective model object.
*/
```

Google +
----
```html
 <div gplus class="g-plus" data-size="tall" data-annotation="bubble" data-href='http://google.com' data-action='share'></div>
```
For more information on the share button attributes check the [Google Share Documentation]
>If you change the class of the button to `g-plusone' it will be converted to a google plus one button.

Tumblr
----


####Link Share
Include the tumblr javascript in your HTML. 
```html
<script src="http://platform.tumblr.com/v1/share.js"></script>

```

```html
<div tumblr-text data-url='http://google.com' data-name='Sharing to Tumblr' data-title='test' data-buttontext='Sharing Text' data-styling="display:inline-block; text-indent:-9999px; overflow:hidden; width:129px; height:20px; background:url('http://platform.tumblr.com/v1/share_3.png') top left no-repeat transparent;" data-description='this is awesome'></div>  

```
The Attributes for the directives are
```js
/*
data-url: URL of the content to be shared
data-name: Name of the content URL
data-title(Optional): Title of the button on hover
data-description: Description of the URL
data-style(Optional): Style of the button
*/
```

####Qoute Share

```html
<div tumblr-qoute data-qoute='Texting Tumblr Qoute share' data-source='http://djds4rce.github.io'></div>  
```
The Attributes for the directives are
```js
/*
data-source: Source URL of the qoute to be shared
data-qoute: Qoute to be shared
data-title(Optional): Title of the button on hover
data-style(Optional): Style of the button
*/
```

####Image Share

```html
<div tumblr-image data-source='http://plnkr.co/img/plunker.png' data-caption='Image Share' data-clickthru='http://google.com'></div>  
```
The Attributes for the directives are
```js
/*
data-source: Source URL of the Image to be shared
data-caption: Caption for the image
data-clickthru: clickthru URL for the image
data-title(Optional): Title of the button on hover
data-style(Optional): Style of the button
*/
```

####Image Share

```html
<div tumblr-video data-embedcode='<iframe width="560" height="315" src="//www.youtube.com/embed/aqHBLS_6gF8" frameborder="0" allowfullscreen></iframe>'></div>  
```
The Attributes for the directives are
```js
/*
data-embedcode: Embed code for the external video
data-caption: Caption for the Video
data-title(Optional): Title of the button on hover
data-style(Optional): Style of the button
*/
```


Pinterest
----

Include the  Pinterest javascript in your HTML. 
```html
<script type="text/javascript" src="//assets.pinterest.com/js/pinit.js" data-pin-build='parsePins'></script>

```


####Usage
```html
<div pintrest data-href='http://google.com' data-description='testing share' data-img='http://plnkr.co/img/plunker.png' data-pin-do='buttonPin' data-pin-config='beside'></div>
```

The Attributes for the directives are

```js
/*
data-href: Url To be shared
data-Description: Description of the content
data-img: Image for the Pin
data-pin-do(Optional): Type of pin
data-pin-config(Optional): Pin count Orientation 'beside' or 'above'
*/
```


**Made with Love by [Djds4rce]**
**Additions with ♡ by [haxxxton]**



[Explained Here]:http://ericduran.io/2013/05/31/angular-html5Mode-with-yeoman/
[Demo]:http://plnkr.co/edit/Cah9FtwXDrUMQjChdBG2?p=info    
[Google Share Documentation]:https://developers.google.com/+/web/share/
[Djds4rce]:http://djds4rce.wordpress.com/
[haxxxton]:http://gaandder.com/

Licenced Under MIT Licence. 
