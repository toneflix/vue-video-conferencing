<template><div><h1 id="slots" tabindex="-1"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h1>
<h2 id="controls" tabindex="-1"><a class="header-anchor" href="#controls" aria-hidden="true">#</a> controls</h2>
<p>The controls slot allows you to modify or add custom controls to the video conferencing component.</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VideoConference</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span>
      <span class="token attr-name">#controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{
        // toggleFullscreen,
        // activeVideoTrack,
        // videoTracks,
        // conference,
        // muteMe,
        // tracks,
        // status,
        // start,
        // stop
      }<span class="token punctuation">"</span></span>
    <span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Custom Button<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>VideoConference</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h3>
<h4 id="function-togglefullscreen" tabindex="-1"><a class="header-anchor" href="#function-togglefullscreen" aria-hidden="true">#</a> <strong>[Function]</strong> toggleFullscreen</h4>
<p>The toggleFullscreen function allows you to toggle the fullscreen mode of the video conferencing component.</p>
<h4 id="object-activevideotrack" tabindex="-1"><a class="header-anchor" href="#object-activevideotrack" aria-hidden="true">#</a> <strong>[Object]</strong> activeVideoTrack</h4>
<p>The activeVideoTrack variable contains the current active video track object.</p>
<h4 id="array-videotracks" tabindex="-1"><a class="header-anchor" href="#array-videotracks" aria-hidden="true">#</a> <strong>[Array]</strong> videoTracks</h4>
<p>The videoTracks variable contains an array of all the video tracks.</p>
<h4 id="object-conference" tabindex="-1"><a class="header-anchor" href="#object-conference" aria-hidden="true">#</a> <strong>[Object]</strong> conference</h4>
<p>The conference variable contains the current conference object.</p>
<h4 id="function-muteme" tabindex="-1"><a class="header-anchor" href="#function-muteme" aria-hidden="true">#</a> <strong>[Function]</strong> muteMe</h4>
<p>The muteMe function allows you to toggle the mute state of the current user.
The function takes a string as an argument which can be either &quot;audio&quot; or &quot;video&quot;, if no argument is provided it will toggle the mute state of the audio.</p>
<h4 id="array-tracks" tabindex="-1"><a class="header-anchor" href="#array-tracks" aria-hidden="true">#</a> <strong>[Array]</strong> tracks</h4>
<p>The tracks variable contains an array of all the tracks.</p>
<h4 id="object-status" tabindex="-1"><a class="header-anchor" href="#object-status" aria-hidden="true">#</a> <strong>[Object]</strong> status</h4>
<p>The status variable contains the current status of the video conferencing component.</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// true if the video conferencing component is making a request to the server</span>
  <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// true if a video conference is active and the video conferencing component is visible</span>
  <span class="token literal-property property">audioMuted</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// true if the audio of the current user is muted</span>
  <span class="token literal-property property">videoMuted</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// true if the video of the current user is muted</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="function-start" tabindex="-1"><a class="header-anchor" href="#function-start" aria-hidden="true">#</a> <strong>[Function]</strong> start</h4>
<p>The start function allows you to start the video conferencing component.</p>
<h4 id="function-stop" tabindex="-1"><a class="header-anchor" href="#function-stop" aria-hidden="true">#</a> <strong>[Function]</strong> stop</h4>
<p>The stop function allows you to stop the video conferencing component.</p>
</div></template>


