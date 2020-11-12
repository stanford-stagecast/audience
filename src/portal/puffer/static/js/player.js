'use strict';

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const ESCAPE_KEY = 27;

var chatFromTime = 0;

var ws_client;

function load_script(script_path) {
  /* Create and append a new script */
  var new_script = document.createElement('script');
  new_script.type = 'text/javascript';
  new_script.src = script_path;
  document.getElementsByTagName('head')[0].appendChild(new_script);
  return new_script;
}

var lastTimeHeartAnimationCalled;
function showHeartAnimation() {
  lastTimeHeartAnimationCalled = Date.now();
  // code from https://codepen.io/vivinantony/pen/gbENBB
  for (var i = 0; i < 3; i++) { // loop to show 3x2 = 6 hearts 
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");

    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");

    $('.heart').each(function() {
      var top = $(this).css("top").replace(/[^-\d\.]/g, '');
      var width = $(this).css("width").replace(/[^-\d\.]/g, '');
      if (top <= -100 || width >= 150) {
          $(this).detach();
      }
    });
  }
  setTimeout(function(){clearHeartAnimation();}, 4000); // remove element after 4000 ms
}

function clearHeartAnimation() {
  // called after few seconds elapse without call to showHeartAnimation
  // To make sure repeated clicks keep on producing the hearts until there is a lull of 4s
  if (Date.now() - lastTimeHeartAnimationCalled > 4000) {
    $('.bg_heart').empty();
  }
}

var lastTimeEmojiAnimationCalled;
function showEmojiAnimation(emoji) {
  lastTimeEmojiAnimationCalled = Date.now();
  // code from https://codepen.io/vivinantony/pen/gbENBB
  for (var i = 0; i < 3; i++) { // loop to show 3x2 = 6 hearts 
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 45) +30;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $('.bg_emoji').append("<div class='emoji_animation' style='width:" + r_size + "px;height:" + r_size + "px;font-size:" + r_size + "px;left:" + r_left + "%;-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'>"+emoji+"</div>");

    $('.bg_emoji').append("<div class='emoji_animation' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;;font-size:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'>"+emoji+"</div>");

    $('.emoji_animation').each(function() {
      var top = $(this).css("top").replace(/[^-\d\.]/g, '');
      var width = $(this).css("width").replace(/[^-\d\.]/g, '');
      if (top <= -100 || width >= 150) {
          $(this).detach();
      }
    });
  }
  setTimeout(function(){clearEmojiAnimation();}, 3000); // remove element after 3000 ms
}

function clearEmojiAnimation() {
  // called after few seconds elapse without call to showEmojiAnimation
  // To make sure repeated clicks keep on producing the emojis until there is a lull of 3s
  if (Date.now() - lastTimeEmojiAnimationCalled > 3000) {
    $('.bg_emoji').empty();
  }
}

//The animation for firework
// code from https://codepen.io/judag/pen/XmXMOL
var lastTimeFireworkAnimationCalled;
function showFireWorkAnimation() {
	//record the time once the firework starts
	lastTimeFireworkAnimationCalled = Date.now();
  	window.requestAnimationFrame = 
            window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };  
    var canvas, ctx, w, h, particles = [], probability = 0.04, xPoint, yPoint;
    //start drawing the fireworks
    onLoad();

    //define helper functions
    function onLoad() {
        canvas = document.getElementById("firework-canvas");
        ctx = canvas.getContext("2d");
        resizeCanvas();           
        window.requestAnimationFrame(updateWorld);
    } 
        
    function resizeCanvas() {
        if (!!canvas) {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
    } 
        
    function updateWorld() {
    	//only play the firework animation for 4 seconds
    	if (Date.now() - lastTimeFireworkAnimationCalled < 4000){
            update();
            paint();
            window.requestAnimationFrame(updateWorld);   		
    	}
    	else{
    		//clear the canvas after it plays for 3 seconds
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    	}

    } 
        
    function update() {
        if (particles.length < 500 && Math.random() < probability) {
            createFirework();
        }
        var alive = [];
        for (var i=0; i<particles.length; i++) {
            if (particles[i].move()) {
                alive.push(particles[i]);
            }
        }
        particles = alive;
    } 
        
    function paint() {
    	ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.globalCompositeOperation = 'lighter';
        for (var i=0; i<particles.length; i++) {
            particles[i].draw(ctx);
        }
    } 
        
    function createFirework() {
        xPoint = Math.random()*(w-200)+100;
        yPoint = Math.random()*(h-200)+100;
        var nFire = Math.random()*50+100;
        var c = "rgb("+(~~(Math.random()*200+55))+","
             +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
        for (var i=0; i<nFire; i++) {
            var particle = new Particle();
            particle.color = c;
            var vy = Math.sqrt(25-particle.vx*particle.vx);
            if (Math.abs(particle.vy) > vy) {
                particle.vy = particle.vy>0 ? vy: -vy;
            }
            particles.push(particle);
        }
    } 
        
    function Particle() {
        this.w = this.h = Math.random()*4+1;
            
        this.x = xPoint-this.w/2;
        this.y = yPoint-this.h/2;
            
        this.vx = (Math.random()-0.5)*10;
        this.vy = (Math.random()-0.5)*10;
            
        this.alpha = Math.random()*.5+.5;
            
        this.color;
    } 
        
    Particle.prototype = {
        gravity: 0.05,
        move: function () {
            this.x += this.vx;
            this.vy += this.gravity;
            this.y += this.vy;
            this.alpha -= 0.01;
            if (this.x <= -this.w || this.x >= screen.width ||
                this.y >= screen.height ||
                this.alpha <= 0) {
                    return false;
            }
            return true;
        },
        draw: function (c) {
            c.save();
            c.beginPath();
                
            c.translate(this.x+this.w/2, this.y+this.h/2);
            c.arc(0, 0, this.w, 0, Math.PI*2);
            c.fillStyle = this.color;
            c.globalAlpha = this.alpha;
                
            c.closePath();
            c.fill();
            c.restore();
        }
    } 
}




function ControlBar() {

  var video = document.getElementById('tv-video');
  var tv_container = document.getElementById('tv-container');
  var tv_controls = document.getElementById('tv-controls');
  var reaction_controls = document.getElementById('reaction-controls');

  var volume_bar = document.getElementById('volume-bar');
  var mute_button = document.getElementById('mute-button');
  var unmute_here = document.getElementById('unmute-here');
  const volume_on_img = 'url(/static/dist/images/volume-on.svg)';
  const volume_off_img = 'url(/static/dist/images/volume-off.svg)';
  // set callbacks for reaction button press
  function reaction_button_clicked(button_idx,button_inner_text,sentiment,audio) {
    // play the emoji animation after a button is clicked
    showEmojiAnimation(button_inner_text);
    // if sentiment is happy, play firework animation with probability 1/3
    if (sentiment === "happy") {
      if (Math.random() <= 1/3) {
        showFireWorkAnimation();
      }
    }

    if (audio !== undefined) {
      // play audio clip corresponding to emoji (using howler.js library)
      // Sound effects from http://www.realmofdarkness.net/sb/crowd/
      var sound = new Howl({
        src: ['/static/dist/audio/'+audio],
        volume: 0.15*volume_bar.value // multiple by factor to reduce wrt main audio
      });
      sound.play();
    }

    // button index is simply the position of button in list
    console.log("Button pressed!");
    console.log("button_idx:",button_idx);
    console.log("button_inner_text:",button_inner_text);
    console.log("Button press: video.currentTime:",video.currentTime);
    var reaction_msg = {
      timeStamp: video.currentTime, 
      reactionText: button_inner_text,
      reactionIdx: button_idx
    };
    ws_client.send_client_reaction(reaction_msg);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/feedback/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);
    xhr.send(JSON.stringify({
      'timestamp': video.currentTime,
      'feedback': button_inner_text,
    }));
  };

  // now we assign these to the buttons
  var button_list = reaction_controls.children[0].children;
  for (var i = 0; i < button_list.length; i++) {
    button_list[i].children[0].button_idx = i;
    button_list[i].children[0].onclick = function() {reaction_button_clicked(this.button_idx,this.innerText,this.dataset.sentiment,this.dataset.audio)};
  }

  function sendChat(input) {
    console.log("Sending chat message: ", input.value);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/feedback/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);
    xhr.send(JSON.stringify({
      'timestamp': video.currentTime,
      'feedback': input.value,
    }));
    input.value = "";
  };

  var chatBox = document.getElementById('chatbox');
  setTimeout(() => {
    chatBox.style.height = `${video.getBoundingClientRect().height}px`;
    chatBox.style.maxHeight = `${video.getBoundingClientRect().height}px`;
  }, 500);

  var chatInput = document.getElementById('chatbox-entry-input');
  var chatSend = document.getElementById('chatbox-entry-send');
  chatSend.onclick = () => {if (chatInput.value) sendChat(chatInput)};

  var chatAvailable = false;
  (() => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          chatAvailable = true;
        } else {
          chatAvailable = false;
          document.getElementById('chatbox-entry-input').placeholder = "Sorry, chat is not currently available";
          document.getElementById('chatbox-entry-input').disabled = true;
          document.getElementById('chatbox-entry-input').style.border = "none";
          document.getElementById('chatbox-entry-send').style.visibility = "hidden";
        }
      }
    }
    xhr.open('GET', '/is_chat_available/');
    xhr.send();
  })();

  $("#chatbox-entry-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#chatbox-entry-send").click();
    }
  });

  var from = 0;
  function getChats(from, to) {
    if (to <= from) {
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      var replay = chatReplay;
      var replayList = chatReplayList;

      chatFromTime = to;
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var chatReplayShouldScroll = chatReplay.scrollTop + chatReplay.offsetHeight > chatReplay.scrollHeight - 10;
        var fsChatReplayShouldScroll = fsChatReplay.scrollTop + fsChatReplay.offsetHeight > fsChatReplay.scrollHeight - 10;

        var chatList = JSON.parse(xhr.responseText);
        chatList = chatList.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
        var chatHTML = "";
        chatList.forEach((chat) => {
          chatHTML += `<li>
            <span class="chat-replay-username">${chat.username}</span>
            <span class="chat-replay-text">${chat.feedback}</span>
          </li>`;
        });
        chatReplayList.innerHTML += chatHTML;
        fsChatReplayList.innerHTML += chatHTML;

        if (chatReplayShouldScroll) {
          chatReplay.scrollTop = chatReplay.scrollHeight;
        }
        if (fsChatReplayShouldScroll) {
          fsChatReplay.scrollTop = fsChatReplay.scrollHeight;
        }
      }
    }
    xhr.open('POST', '/get_chat/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);
    xhr.send(JSON.stringify({
      'from': from, 'to': to,
    }));
  }

  var chatReplay = document.getElementById('chatbox-replay');
  var chatReplayList = document.getElementById('chatbox-replay-list');
  var fsChat = document.getElementById('fullscreen-chatbox');
  var fsChatReplay = document.getElementById('fullscreen-chatbox-replay');
  var fsChatReplayList = document.getElementById('fullscreen-chatbox-replay-list');

  setInterval(() => {
    getChats(chatFromTime, video.currentTime);
  }, 500);

  var chatToggle = document.getElementById('fs-chat-toggle');
  var toggleFullscreenChat = function() {
    if (fsChat.style.visibility === "visible") {
      fsChat.style.visibility = "hidden"
    } else {
      fsChat.style.visibility = "visible";
    }
  };
  chatToggle.onclick = toggleFullscreenChat;

  /* video is muted by default */
  video.volume = 0;
  mute_button.muted = true;
  mute_button.style.backgroundImage = volume_off_img;
  var last_volume_before_mute = 1;

  /* after setting the initial volume, don't manually set video.volume anymore;
   * call the function below instead */
  function set_video_volume(new_volume) {
    var unmute_message = document.getElementById('unmute-message');
    if (unmute_message) {
      unmute_message.style.display = 'none';
    }
    new_volume = Math.min(Math.max(0, new_volume.toFixed(2)), 1);

    video.muted = false;  // allow unmuting and use video.volume to control
    video.volume = new_volume;

    /* change volume bar and mute button */
    volume_bar.value = new_volume;
    if (new_volume > 0) {
      mute_button.muted = false;
      mute_button.style.backgroundImage = volume_on_img;
    } else {
      mute_button.muted = true;
      mute_button.style.backgroundImage = volume_off_img;
    }
  }

  volume_bar.oninput = function() {
    set_video_volume(Number(volume_bar.value));
  };

  mute_button.onclick = function() {
    if (mute_button.muted) {
      set_video_volume(last_volume_before_mute);
    } else {
      last_volume_before_mute = video.volume;
      set_video_volume(0);
    }
  };

  unmute_here.onclick = function() {
    set_video_volume(1);
  };

  function show_control_bar() {
    tv_controls.style.opacity = '0.5';
    reaction_controls.style.opacity = '1.0';
    tv_container.style.cursor = 'default';
  }

  function hide_control_bar() {
    tv_controls.style.opacity = '0';
    reaction_controls.style.opacity = '0';
    tv_container.style.cursor = 'none';
  }

  /* initialize opacity and cursor control bar and cursor */
  show_control_bar();
  var control_bar_timeout = setTimeout(hide_control_bar, 3000);

  function show_control_bar_briefly() {
    clearTimeout(control_bar_timeout);
    show_control_bar();

    control_bar_timeout = setTimeout(function() {
      hide_control_bar();
    }, 3000);
  }

  tv_container.onmousemove = function() {
    show_control_bar_briefly();
  };

  tv_container.onmouseleave = function() {
    tv_controls.style.opacity = '0';
    reaction_controls.style.opacity = '0';
  };

  /* full screen behavior */
  const enter_fullscreen_img = 'url(/static/dist/images/enter-fullscreen.svg)';
  const exit_fullscreen_img = 'url(/static/dist/images/exit-fullscreen.svg)';

  var full_screen_button = document.getElementById('full-screen-button');
  full_screen_button.style.backgroundImage = enter_fullscreen_img;

  function toggle_full_screen() {
    show_control_bar_briefly();

    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
      chatToggle.style.visibility = "visible";
      fsChat.style.visibility = "visible";
      full_screen_button.style.backgroundImage = exit_fullscreen_img;

      if (tv_container.requestFullscreen) {
        tv_container.requestFullscreen();
      } else if (tv_container.mozRequestFullScreen) {
        tv_container.mozRequestFullScreen();
      } else if (tv_container.webkitRequestFullScreen) {
        tv_container.webkitRequestFullScreen();
      } else if (tv_container.msRequestFullscreen) {
        tv_container.msRequestFullscreen();
      }
    } else {
      chatToggle.style.visibility = "hidden";
      fsChat.style.visibility = "hidden";
      full_screen_button.style.backgroundImage = enter_fullscreen_img;

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  full_screen_button.onclick = toggle_full_screen;
  video.ondblclick = toggle_full_screen;

  var handleFullScreen = function (e) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!!isInFullScreen) {
      chatToggle.style.visibility = "visible";
      fsChat.style.visibility = "visible";
      full_screen_button.style.backgroundImage = exit_fullscreen_img;
    } else {
      chatToggle.style.visibility = "hidden";
      fsChat.style.visibility = "hidden";
      full_screen_button.style.backgroundImage = enter_fullscreen_img;
    }
  }

  document.addEventListener("fullscreenchange", handleFullScreen);
  document.addEventListener("msfullscreenchange", handleFullScreen);
  document.addEventListener("mozfullscreenchange", handleFullScreen);
  document.addEventListener("webkitfullscreenchange", handleFullScreen);

  // Note: disabling below because it doesn't work well with the chatbox
  // /* press F to toggle full screen */
  // const LOWERCASE_F = 70;
  // const UPPERCASE_F = 102;

  // this.onkeydown = function(e) {
  //   if (e.keyCode === LOWERCASE_F || e.keyCode === UPPERCASE_F) {
  //     toggle_full_screen();
  //   } else if (e.keyCode === LEFT_ARROW || e.keyCode === RIGHT_ARROW) {
  //     show_control_bar_briefly();

  //     if (e.keyCode === LEFT_ARROW) {
  //       set_video_volume(video.volume - 0.05);
  //     } else if (e.keyCode === RIGHT_ARROW) {
  //       set_video_volume(video.volume + 0.05);
  //     }
  //   }
  // };
}

function ChannelBar() {
  var that = this;

  /* callback function to be defined when channel is changed */
  this.on_channel_change = null;

  /* find the current channel */
  var channel_list = document.querySelectorAll('#channel-list .list-group-item');
  var active_idx = 0;  // index of the active channel

  /* restore the previously watched channel if there is any */
  if (window.name) {
    var prev_channel = window.name;
    for (var i = 0; i < channel_list.length; i++) {
      if (channel_list[i].getAttribute('name') === prev_channel) {
        active_idx = i;
        break;
      }
    }
  }

  channel_list[active_idx].classList.add('active');

  var curr_channel_name = channel_list[active_idx].getAttribute('name');
  console.log('Initial channel:', curr_channel_name);
  window.name = curr_channel_name;  // save current channel in window.name

  this.get_curr_channel = function() {
    return curr_channel_name;
  };

  function change_channel(new_channel_idx) {
    if (new_channel_idx >= channel_list.length || new_channel_idx < 0) {
      return;  // invalid channel index
    }

    if (active_idx === new_channel_idx) {
      return;  // same channel
    }

    var old_channel = channel_list[active_idx];
    var new_channel = channel_list[new_channel_idx];

    old_channel.classList.remove('active');
    new_channel.classList.add('active');

    curr_channel_name = new_channel.getAttribute('name');
    console.log('Set channel:', curr_channel_name);
    window.name = curr_channel_name;  // save current channel in window.name

    if (that.on_channel_change) {
      /* call on_channel_change callback */
      that.on_channel_change(curr_channel_name);
    } else {
      console.log('Warning: on_channel_change callback has not been defined');
    }

    active_idx = new_channel_idx;
  }

  /* set up onclick callbacks for channels */
  for (var i = 0; i < channel_list.length; i++) {
    channel_list[i].onclick = (function(i) {
      return function() {
        change_channel(i);
      };
    })(i);
  }

  // Note: disabling below because it doesn't work well with the chatbox (and not needed here)
  // this.onkeydown = function(e) {
  //   if (e.keyCode === DOWN_ARROW) {
  //     change_channel(active_idx + 1);
  //   } else if (e.keyCode === UP_ARROW) {
  //     change_channel(active_idx - 1);
  //   }
  // };
}


function get_client_system_info() {
  /* Below code adapted from https://stackoverflow.com/a/18706818 */
  var nAgt = navigator.userAgent;
  var browser = navigator.appName;
  var nameOffset, verOffset;

  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera';
  }
  // Opera Next
  else if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera';
  }
  // Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
    browser = 'Microsoft Edge';
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer';
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome';
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari';
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox';
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer';
  }
  // Other browsers
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1)
           < (verOffset = nAgt.lastIndexOf('/'))) {
    browser = nAgt.substring(nameOffset, verOffset);
    if (browser.toLowerCase() === browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  // OS
  var os = 'unknown';
  var clientStrings = [
    {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
    {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
    {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
    {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
    {s:'Windows Vista', r:/Windows NT 6.0/},
    {s:'Windows Server 2003', r:/Windows NT 5.2/},
    {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
    {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
    {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
    {s:'Windows 98', r:/(Windows 98|Win98)/},
    {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
    {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
    {s:'Windows CE', r:/Windows CE/},
    {s:'Windows 3.11', r:/Win16/},
    {s:'Android', r:/Android/},
    {s:'Open BSD', r:/OpenBSD/},
    {s:'Sun OS', r:/SunOS/},
    {s:'Linux', r:/(Linux|X11)/},
    {s:'iOS', r:/(iPhone|iPad|iPod)/},
    {s:'Mac OS X', r:/Mac OS X/},
    {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
    {s:'QNX', r:/QNX/},
    {s:'UNIX', r:/UNIX/},
    {s:'BeOS', r:/BeOS/},
    {s:'OS/2', r:/OS\/2/},
    {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
  ];
  for (var id in clientStrings) {
    var cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }
  return {
    os: os,
    browser: browser
  };
}

function add_player_error(error_message, error_id) {
  var id = 'player-error-' + error_id;

  var li = document.getElementById(id);
  if (li) {
    return;
  }

  var ul = document.getElementById('player-error-list');

  li = document.createElement('li');
  li.setAttribute('id', id);

  var div = document.createElement('div');
  div.setAttribute('class', 'alert alert-danger');
  div.setAttribute('role', 'alert');
  div.innerHTML = error_message;

  li.append(div);
  ul.appendChild(li);
}

function remove_player_error(error_id) {
  var id = 'player-error-' + error_id;

  var li = document.getElementById(id);
  if (!li) {
    return;
  }

  var ul = document.getElementById('player-error-list');
  ul.removeChild(li);
}

/* clear all player errors */
function clear_player_errors() {
  var ul = document.getElementById('player-error-list');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

/* start and display loading circle */
function start_spinner() {
  hide_play_button();
  var spinner = document.getElementById('tv-spinner');
  spinner.classList.remove('paused');
  spinner.style.display = 'block';
}

/* pause and hide loading circle */
function stop_spinner() {
  var spinner = document.getElementById('tv-spinner');
  spinner.classList.add('paused');
  spinner.style.display = 'none';
}

/* display/hide the play button, which is mutual exclusive with the spinner */
function show_play_button() {
  stop_spinner();
  var play_button = document.getElementById('tv-play-button');
  play_button.style.display = 'block';
}

function hide_play_button() {
  var play_button = document.getElementById('tv-play-button');
  play_button.style.display = 'none';
}

function get_screen_size() {
  const raw_screen_width = screen.width;
  const raw_screen_height = screen.height;

  var screen_width = Math.max(raw_screen_width, raw_screen_height);
  var screen_height = Math.min(raw_screen_width, raw_screen_height);

  return [screen_width, screen_height];
}

function init_recording() {
  // we use hark library from 
  // https://github.com/otalk/hark

  navigator.mediaDevices.getUserMedia({audio: true, video: false})
  .then(
  (stream) => {
      /* mute audio behavior */
      const unmuted_mic_img = 'url(/static/dist/images/mic_unmuted.svg)';
      const muted_mic_img = 'url(/static/dist/images/mic_muted.svg)';

      var mute_audio_button = document.getElementById('mute-audio-button');
      // start off muted
      mute_audio_button.style.backgroundImage = muted_mic_img;
      mute_audio_button.muted = true;
      stream.getAudioTracks()[0].enabled = false;
      mute_audio_button.onclick = function() {
        var unmute_audio_message = document.getElementById('unmute-audio-message');
        if (unmute_audio_message) {
          unmute_audio_message.style.display = 'none';
        }    
        if (mute_audio_button.muted) {
          mute_audio_button.muted = false;
          stream.getAudioTracks()[0].enabled = true;
          mute_audio_button.style.backgroundImage = unmuted_mic_img;
        } else {
          mute_audio_button.muted = true;
          stream.getAudioTracks()[0].enabled = false;
          mute_audio_button.style.backgroundImage = muted_mic_img;
        }
      };    

      var unmute_audio_here = document.getElementById('unmute-audio-here');
      unmute_audio_here.onclick = function() {
        var unmute_audio_message = document.getElementById('unmute-audio-message');
        unmute_audio_message.style.display = 'none';
        mute_audio_button.muted = false;
        stream.getAudioTracks()[0].enabled = true;
        mute_audio_button.style.backgroundImage = unmuted_mic_img;
      };
    
      var audioRecordingIndicator = document.getElementById('audio-recording-indicator');
      var video = document.getElementById('tv-video');
      audioRecordingIndicator.style.display = 'none';
      console.log("success getting mic set up.");

      // set up audio recording
      // code inspired by tutorial at 
      // https://medium.com/jeremy-gottfrieds-tech-blog/javascript-tutorial-record-audio-and-encode-it-to-mp3-2eedcd466e78
      // and at https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
      let rec = new MediaRecorder(stream, {mimeType: 'audio/webm; codec=opus'});
      let chunkNum = 0; // chunk number for current recording
      // we send smaller chunks to server rather than waiting for entire
      // recording, since in some cases the recorder might be on for long times
      // leading to very large files sent to server.
      // Note that we need to concatenate the files at the server to allow playback.
      rec.ondataavailable = e => {
        // this happens after rec.stop is called
        // this section of audio is finished so upload to server
        // first convert to blob
        let blob = new Blob([e.data], { 'type' : 'audio/webm; codecs=opus' });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/audiofeedback/');
        xhr.setRequestHeader('X-CSRFToken', csrf_token);
        var formData = new FormData();
        formData.append("timestamp", recordingStartTimestamp);
        formData.append("audio_file", blob, "audio_"+recordingStartTimestamp+"_"+chunkNum+".webm");
        chunkNum += 1;
        // third parameter above is the file name
        xhr.send(formData);
    
        /*
        // Test code below from https://developers.google.com/web/updates/2016/01/mediarecorder
        // This downloads each audio file to the client
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'test.webm';
        a.click();
        window.URL.revokeObjectURL(url);
        */
      };


      var options = {}; // can set detection threshold and polling interval here
      var speechEvents = hark(stream, options);
      speechEvents.setInterval(10); // ms
      // set to small so we don't miss short claps
      // Note that can lead to fragmentation, so we have timeToWaitBeforeStoppingRecord below
      var lastDetectedStoppedSpeakingTimeStamp = 0;
      const timeToWaitBeforeStoppingRecord = 1000; // ms
      // this variable specifies the minimum length of silence needed to stop recording
      var currentlySpeaking = false;
      var alreadyCalledStopRecording = false; // to avoid multiple calls 
      /* timeToWaitBeforeStoppingRecord:
          Don't stop recording immediately after we get stopped_speaking,
          rather stop after stopped_speaking only when the time till the last 
          speaking event exceeds timeToWaitBeforeStoppingRecord
      */
      var recordingStartTimestamp; // video timestamp at start of recording

      speechEvents.on('speaking', function () {
        console.log('detected speaking');
        currentlySpeaking = true;
        if (rec.state === 'recording') {
          // do nothing (this happens in case there are rapid start/stop events)
        } else {
          audioRecordingIndicator.style.display = 'block';
          chunkNum = 0;
          recordingStartTimestamp = video.currentTime;
          rec.start(60000); // record in 60 s chunks so we send small files to server
                            // Chunks need to be concatenated at server for playback
        }
      });

      function stopRecording() {
        if (!currentlySpeaking && 
          Date.now()-lastDetectedStoppedSpeakingTimeStamp > timeToWaitBeforeStoppingRecord) {
          // if no speaking event currently
          // and if there has been sufficient time since the last stopped_speaking event
          audioRecordingIndicator.style.display = 'none';
          rec.stop();
          alreadyCalledStopRecording = false;
        } else {
          // otherwise try again 
          setTimeout(stopRecording,timeToWaitBeforeStoppingRecord);
        }
      };

      speechEvents.on('stopped_speaking', function () {
        console.log('detected stopped_speaking');
        currentlySpeaking = false;
        lastDetectedStoppedSpeakingTimeStamp = Date.now();
        if (rec.state === 'inactive' || alreadyCalledStopRecording) {
          // do nothing (this happens in case there are rapid start/stop events)
        } else {
          stopRecording(); // which will take care of having sufficient duration before actually stopping
          alreadyCalledStopRecording = true;
        }
      });
  }).catch(
    (err) => {
      console.log(err);
      console.log("disabled audio feedback.");
      var mute_audio_button = document.getElementById('mute-audio-button');
      mute_audio_button.style.display = "none";
    });
}

function init_player(params_json, csrf_token) {
  const params = JSON.parse(params_json);

  const session_key = params.session_key;
  const username = params.username;
  const settings_debug = params.debug;
  const port = params.port;

  /* assert that session_key and username exist */
  if (!session_key || !username) {
    console.log('Error: no session key or username')
    return;
  }

  /* client's system information (OS and browser) */
  const sysinfo = get_client_system_info();

  var control_bar = new ControlBar();
  var channel_bar = new ChannelBar();

  // Note: disabling below because it doesn't work well with the chatbox
  // document.onkeydown = function(e) {
  //   e = e || window.event;

  //   /* prevent the default behaviors of arrow keys */
  //   if (e.keyCode == UP_ARROW || e.keyCode == DOWN_ARROW ||
  //       e.keyCode == LEFT_ARROW || e.keyCode == RIGHT_ARROW)
  //     e.preventDefault();

  //   control_bar.onkeydown(e);
  //   channel_bar.onkeydown(e);
  // };

  // initiate user audio recording
  init_recording();

  load_script('/static/js/puffer.js').onload = function() {
    ws_client = new WebSocketClient(
      session_key, username, settings_debug, port, csrf_token, sysinfo);

    channel_bar.on_channel_change = function(new_channel) {
      ws_client.set_channel(new_channel);
    };

    /* configure play button's onclick event */
    var play_button = document.getElementById('tv-play-button');
    play_button.onclick = function() {
      ws_client.set_channel(channel_bar.get_curr_channel());
      play_button.style.display = 'none';
    };

    ws_client.connect(channel_bar.get_curr_channel());
  };
}