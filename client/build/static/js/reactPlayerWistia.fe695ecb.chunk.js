(self.webpackChunkclient=self.webpackChunkclient||[]).push([[55],{6261:function(e,n,t){var a,l=t(2122).default,o=t(6690).default,r=t(9728).default,u=t(6115).default,i=t(1655).default,s=t(6389).default,c=t(4704).default,y=Object.create,p=Object.defineProperty,d=Object.getOwnPropertyDescriptor,f=Object.getOwnPropertyNames,h=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty,v=function(e,n,t,a){if(n&&"object"===typeof n||"function"===typeof n){var l,o=c(f(n));try{var r=function(){var o=l.value;b.call(e,o)||o===t||p(e,o,{get:function(){return n[o]},enumerable:!(a=d(n,o))||a.enumerable})};for(o.s();!(l=o.n()).done;)r()}catch(u){o.e(u)}finally{o.f()}}return e},P=function(e,n,t){return function(e,n,t){n in e?p(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t}(e,"symbol"!==typeof n?n+"":n,t),t},k={};!function(e,n){for(var t in n)p(e,t,{get:n[t],enumerable:!0})}(k,{default:function(){return C}}),e.exports=(a=k,v(p({},"__esModule",{value:!0}),a));var m=function(e,n,t){return t=null!=e?y(h(e)):{},v(!n&&e&&e.__esModule?t:p(t,"default",{value:e,enumerable:!0}),e)}(t(7313)),g=t(563),w=t(4442),C=function(e){"use strict";i(t,e);var n=s(t);function t(){var e;return o(this,t),e=n.apply(this,arguments),P(u(e),"callPlayer",g.callPlayer),P(u(e),"playerID",e.props.config.playerId||"".concat("wistia-player-").concat((0,g.randomString)())),P(u(e),"onPlay",(function(){var n;return(n=e.props).onPlay.apply(n,arguments)})),P(u(e),"onPause",(function(){var n;return(n=e.props).onPause.apply(n,arguments)})),P(u(e),"onSeek",(function(){var n;return(n=e.props).onSeek.apply(n,arguments)})),P(u(e),"onEnded",(function(){var n;return(n=e.props).onEnded.apply(n,arguments)})),P(u(e),"onPlaybackRateChange",(function(){var n;return(n=e.props).onPlaybackRateChange.apply(n,arguments)})),P(u(e),"mute",(function(){e.callPlayer("mute")})),P(u(e),"unmute",(function(){e.callPlayer("unmute")})),e}return r(t,[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e){var n=this,t=this.props,a=t.playing,o=t.muted,r=t.controls,u=t.onReady,i=t.config,s=t.onError;(0,g.getSDK)("https://fast.wistia.com/assets/external/E-v1.js","Wistia").then((function(e){i.customControls&&i.customControls.forEach((function(n){return e.defineControl(n)})),window._wq=window._wq||[],window._wq.push({id:n.playerID,options:l({autoPlay:a,silentAutoPlay:"allow",muted:o,controlsVisibleOnLoad:r,fullscreenButton:r,playbar:r,playbackRateControl:r,qualityControl:r,volumeControl:r,settingsControl:r,smallPlayButton:r},i.options),onReady:function(e){n.player=e,n.unbind(),n.player.bind("play",n.onPlay),n.player.bind("pause",n.onPause),n.player.bind("seek",n.onSeek),n.player.bind("end",n.onEnded),n.player.bind("playbackratechange",n.onPlaybackRateChange),u()}})}),s)}},{key:"unbind",value:function(){this.player.unbind("play",this.onPlay),this.player.unbind("pause",this.onPause),this.player.unbind("seek",this.onSeek),this.player.unbind("end",this.onEnded),this.player.unbind("playbackratechange",this.onPlaybackRateChange)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){this.unbind(),this.callPlayer("remove")}},{key:"seekTo",value:function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("time",e),n||this.pause()}},{key:"setVolume",value:function(e){this.callPlayer("volume",e)}},{key:"setPlaybackRate",value:function(e){this.callPlayer("playbackRate",e)}},{key:"getDuration",value:function(){return this.callPlayer("duration")}},{key:"getCurrentTime",value:function(){return this.callPlayer("time")}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){var e=this.props.url,n=e&&e.match(w.MATCH_URL_WISTIA)[1],t="wistia_embed wistia_async_".concat(n);return m.default.createElement("div",{id:this.playerID,key:n,className:t,style:{width:"100%",height:"100%"}})}}]),t}(m.Component);P(C,"displayName","Wistia"),P(C,"canPlay",w.canPlay.wistia),P(C,"loopOnEnded",!0)}}]);