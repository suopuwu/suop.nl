const images = ['0sdthi0rtz271.png',
  'bg.png', '1i918gwz1gl61.png', 'img35.jpg', '2mn8bo9krcx71.png', 'nva4qvr8fm681.jpg', 'o6lintmgye981.jpg', '938300.jpg', 'Act34K(9)_optimized.jpg', 'qfke5wwsu3881.png', 'a6kfi5d80q581.png', 'qu50qobcyv881.jpg', 'beachcolorpalette.png', 'elqlyrb492u71.png', 'wallpape.png', 'slcdn6avjgn71.png', 'hziglh9vo8l51.png', 'tboesrruypyz.jpg', 'img32.jpg', 'tjz0oeavjgn71.png', 'tv7b6eavjgn71.png', 'vsg2e7qo70a81.jpg', 'lqa26xnqt4i71.png', 'mfh3poncfea81.png', '1.jpg'
];

function changeIcon(newIcon) {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = newIcon;
}

function Timer(callback, delay) {
  var id, started, remaining = delay,
    running;

  this.start = function () {
    running = true;
    started = new Date();
    id = setTimeout(callback, remaining);
  };

  this.pause = function () {
    running = false;
    clearTimeout(id);
    remaining -= new Date() - started;
  };

  this.getTimeLeft = function () {
    if (running) {
      this.pause();
      this.start();
    }

    return remaining;
  };

  this.getStateRunning = function () {
    return running;
  };

  this.start();
}

var chosen = 1;
document.querySelector('#body').style.backgroundImage = `url("img/${images[chosen]}")`;
setTimeout(function () {
  setTimeout(() => {

    document.querySelector('#body').style.opacity = '1';
  }, 100);
  // document.querySelector('#body').style.bottom = '0';
}, 1);
console.log(document.querySelector('#body').style.backgroundImage);
var reloj = document.getElementById('reloj');
var getHour = function () {
  var fecha = new Date(),
    horas = fecha.getHours(),
    minutos = fecha.getMinutes(),
    segundos = fecha.getSeconds();
  if (segundos < 10) {
    segundos = '0' + segundos;
  }
  reloj.textContent = (horas < 13 ? horas : horas - 12) + ' ' + (minutos > 9 ? minutos : '0' + minutos);
  if (currentlyWorking) {
    document.title = Math.round(currentTimerHolder.getTimeLeft() / (60 * 1000)) + (restMode ? ' R' : ' W');
  }
};
getHour();
setInterval(getHour, 500);
var currentlyWorking = false;
var restMode = false;
var currentTimerHolder;

function beginWork() {

  var time = $('#work-time').html() * 60 * 1000;
  currentTimerHolder = new Timer(beginRest, (time > 60000 ? time : 60000));

  restMode = false;
  $('.begin-working').html('Stop');
  document.title = Math.round(currentTimerHolder.getTimeLeft() / (60 * 1000)) + (restMode ? ' R' : ' W');
  Notification.requestPermission().then(function (result) {
    var notification = new Notification('To do list', {
      body: 'Begin working for ' + $('#work-time').html() + ' minutes'
    });
  });
}

function beginRest() {
  var time = $('#rest-time').html() * 60 * 1000;
  currentTimerHolder = new Timer(beginWork, (time > 60000 ? time : 60000));

  restMode = true;
  $('.begin-working').html('Stop');
  document.title = Math.round(currentTimerHolder.getTimeLeft() / (60 * 1000)) + (restMode ? ' R' : ' W');
  var notification = new Notification('To do list', {
    body: 'Begin resting for ' + $('#rest-time').html() + ' minutes'
  });
}
$('.begin-working').on('click', () => {

  currentlyWorking = !currentlyWorking;
  switch (currentlyWorking) {
    case true:
      $('.work-setting').each(function (i) {
        $(this).prop('contenteditable', false);
      });
      beginWork();
      break;
    case false:
      $('.work-setting').each(function (i) {
        $(this).prop('contenteditable', true);
      });
      try {
        $('.begin-working').html('Work');
        document.title = '‎';
        clearTimeout(currentTimerHolder.id);
      } catch (e) {
        console.error(e);
      }
      break;
  }
});
var fancyButtonsArray = $('.fancy-button');
$.each(fancyButtonsArray, function (index, val) {
  var temp = val.dataset.colors.split('');
  var color = temp.splice(0, 7).join(''),
    baseColor = temp.splice(1, 7).join(''),
    buttonHeight = val.dataset.height;
  temp = null;
  $('.fancy-button')[index].id = 'fancy-button' + index;
  $('.fancy-button')[index].style.backgroundColor = color;
  var temp = '0px ' + buttonHeight + ' ' + baseColor;
  for (let i = 0; i < buttonHeight.split('').reverse().splice(2, buttonHeight.length).reverse().join(''); i += 10) {
    temp += ', 0px ' + i + 'px ' + baseColor;
  }
  $('.fancy-button')[index].style.boxShadow = temp;
  $('<style> #fancy-button' + index + ':focus {box-shadow: 0px 0px ' + baseColor + '!important; top: ' + buttonHeight + ';} </style>').appendTo('head');
  $('.fancy-button')[index].style.padding = val.dataset.padding;
  $('.fancy-button')[index].style.marginBottom = buttonHeight;
  $('.fancy-button')[index].addEventListener('click', function () {
    setTimeout(() => {
      document.activeElement.blur();
    }, 300);
  });
});
$('<style> .fancy-button {border: none;cursor: pointer;padding: 20px;background-color: #E0E0E0;margin-bottom: 20px;text-transform: uppercase;font-family: Futura, Futura-Medium "Futura Medium", "Century Gothic", CenturyGothic, "Apple Gothic", AppleGothic, "URW Gothic L", "Avant Garde", sans-serif;font-weight: 900;color: #f5f5f5;border-radius: 25px;box-shadow: 0px 20px #9E9E9E, 0px 10px #9E9E9E;position: relative;top: 0;transition: all 0.5s ease-out;} .fancy-button:focus {top: 20px;box-shadow: 0px 0px #9E9E9E;outline: none;}</style>').appendTo('head');