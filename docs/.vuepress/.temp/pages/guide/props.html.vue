<template><div><h1 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h1>
<h2 id="roomname" tabindex="-1"><a class="header-anchor" href="#roomname" aria-hidden="true">#</a> roomName</h2>
<p><strong>String</strong> | required</p>
<p>The name of the room to join (Should be at least 4 characters long and contains no capital letters or Spaces).</p>
<h2 id="appdomain" tabindex="-1"><a class="header-anchor" href="#appdomain" aria-hidden="true">#</a> appDomain</h2>
<p><strong>String</strong> | optional | <em>meet.jit.si</em></p>
<p>The domain of the jitsi meet</p>
<h2 id="roompassword" tabindex="-1"><a class="header-anchor" href="#roompassword" aria-hidden="true">#</a> roomPassword</h2>
<p><strong>String</strong> | optional | <em>null</em></p>
<p>The password of the room.</p>
<h2 id="username" tabindex="-1"><a class="header-anchor" href="#username" aria-hidden="true">#</a> userName</h2>
<p><strong>String</strong> | optional | <em>null</em></p>
<p>The username of the user (Should be at least 3 characters long if used and should contain no capital letters or Spaces), If not provided a random string will be generated.</p>
<h2 id="displayname" tabindex="-1"><a class="header-anchor" href="#displayname" aria-hidden="true">#</a> displayName</h2>
<p><strong>String</strong> | optional | <em>null</em></p>
<p>The display name of the user.</p>
<h2 id="videoconstraints" tabindex="-1"><a class="header-anchor" href="#videoconstraints" aria-hidden="true">#</a> videoConstraints</h2>
<p><strong>Number</strong> | optional | <em>360</em></p>
<p>The video constraints of the user (180, 360, 720).</p>
<h2 id="apptoken" tabindex="-1"><a class="header-anchor" href="#apptoken" aria-hidden="true">#</a> appToken</h2>
<p><strong>String</strong> | optional | <em>null</em></p>
<p>the JWT token used to authenticate with the server.</p>
<h2 id="allowvideo" tabindex="-1"><a class="header-anchor" href="#allowvideo" aria-hidden="true">#</a> allowVideo</h2>
<p><strong>Bool</strong> | optional | <em>true</em></p>
<p>Set to false if you want audio only.</p>
<h2 id="allowaudio" tabindex="-1"><a class="header-anchor" href="#allowaudio" aria-hidden="true">#</a> allowAudio</h2>
<p><strong>Bool</strong> | optional | <em>true</em></p>
<p>Set to false if you want video only.</p>
<h2 id="debuglevel" tabindex="-1"><a class="header-anchor" href="#debuglevel" aria-hidden="true">#</a> debugLevel</h2>
<p><strong>String</strong> | optional | <em>ERROR</em></p>
<p>The debug level of the jitsi meet api.</p>
<p>Available options:</p>
<ul>
<li>DEBUG</li>
<li>ERROR</li>
<li>INFO</li>
<li>LOG</li>
<li>TRACE</li>
<li>WARN</li>
</ul>
<h2 id="aspect" tabindex="-1"><a class="header-anchor" href="#aspect" aria-hidden="true">#</a> aspect</h2>
<p><strong>Number</strong> | optional | <em>0</em></p>
<p>Determines the aspect ratio of the video</p>
<p>Available options:</p>
<ul>
<li><strong>0:</strong> 4:3</li>
<li><strong>1:</strong> 16:9</li>
<li><strong>2:</strong> 1:1</li>
<li><strong>3:</strong> 1:2</li>
</ul>
<h2 id="alwaysshowcontrols" tabindex="-1"><a class="header-anchor" href="#alwaysshowcontrols" aria-hidden="true">#</a> alwaysShowControls</h2>
<p><strong>Bool</strong> | optional | <em>false</em></p>
<p>Set to true if you want to always show the controls, otherwise they will only show when you hover over the video.</p>
<h2 id="autoconnect" tabindex="-1"><a class="header-anchor" href="#autoconnect" aria-hidden="true">#</a> autoConnect</h2>
<p><strong>Bool</strong> | optional | <em>false</em></p>
<p>When set to true, the component will automatically connect to the room when it is mounted, this is useful if you want to connect to the room when the user clicks an action button probably after filling a form.</p>
</div></template>


