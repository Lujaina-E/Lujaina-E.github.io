document.getElementById("personal-photo").className = "parent"; 
document.getElementById("Academic").className = "fade fadeOut list-academic"; 

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 8) || 20;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};


var nav = $('nav');
var line = $('<div />').addClass('line');

line.appendTo(nav);

var active = nav.find('.active');
var pos = 0;
var wid = 0;

if(active.length) {
  pos = active.position().left;
  wid = active.width();
  line.css({
    left: pos,
    width: wid
  });
}

nav.find('ul li a').click(function(e) {
  e.preventDefault();
  if(!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {
    
    nav.addClass('animate');

    var _this = $(this);

    nav.find('ul li').removeClass('active');

    var position = _this.parent().position();
    var width = _this.parent().width();

    if(position.left >= pos) {
      line.animate({
        width: ((position.left - pos) + width)
      }, 300, function() {
        line.animate({
          width: width,
          left: position.left
        }, 150, function() {
          nav.removeClass('animate');
        });
        _this.parent().addClass('active');
      });
    } else {
      line.animate({
        left: position.left,
        width: ((pos - position.left) + wid)
      }, 300, function() {
        line.animate({
          width: width
        }, 150, function() {
          nav.removeClass('animate');
        });
        _this.parent().addClass('active');
      });
    }

    pos = position.left;
    wid = width;
  }
});

(function(){
  var timeout;
  var $window = $(window);
  var $sidebar = $('#row-contact');
  var $navbar = $('#top-navbar');
  
  $window.on('scroll', function(e){
    clearTimeout(timeout);
    
    timeout = setTimeout(function(){
      if ($window.scrollTop() < 450) {
        $navbar.removeClass('appear');
        $sidebar.removeClass('appear');
      } else {
        $navbar.addClass('appear');
        $sidebar.addClass('appear');
      }
    }, 100);
  });
}());

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7
};

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.replace('fadeOut', 'fadeIn');
    } else {
      entry.target.classList.replace('fadeIn', 'fadeOut');
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

const fadeElms = document.querySelectorAll('.fade');
fadeElms.forEach(el => observer.observe(el));


window.smoothScroll = function(target) {
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
