'use strict';

//= ../libs/jquery/dist/jquery.min.js
//= ../libs/slick-carousel/slick/slick.min.js


var hamburger = document.querySelector('.hamburger');
var navbar = document.querySelector('.navbar');

// add is-active and is-open classes to navbar and hamburger on hamburger btn click
hamburger.addEventListener('click', handleHamburgerClick);

function handleHamburgerClick(e) {
  e.preventDefault();
  navbar.classList.toggle('is-open');
  hamburger.classList.toggle('is-active');
}

// remove is-active and is-open classes on more than 768px screens
window.addEventListener('resize', function(e) {
  var windowWidth = window.innerWidth;

  if (windowWidth >= 768) {
    hamburger.classList.remove('is-active');
    navbar.classList.remove('is-open');
  }
});

// make the navbar height less on sroll
window.addEventListener('scroll', function(e) {
  var scrollPos = document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollPos > 100) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');

  }
});

// TABS
// Add event listeners for document click
var tabs = document.querySelectorAll('.programs__tabs a');
for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', tabClick);
}

// define a func that filters the unwanted click events on the document
function tabClick(e) {
  var elem = e.target,
      elemHREF = elem.getAttribute('href'),
      tabContents = document.querySelectorAll('.programs__content .programs__item');

  // if we click on elem whose href contains 'tab-', proceed
  if (elemHREF != null && elemHREF.indexOf('program-') != -1) {
    e.preventDefault();

    // if we didn't click an active item, switch tabs
    if (elem.className.indexOf('active') == -1) {
      // remove the active class from the tabs and the visible class from the tab cotents
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        tabContents[i].classList.remove('visible');
      }

      //add the active class to the clicked elem and the visible class to the corresponding tab content
      elem.classList.add('active');
      document.getElementById(elemHREF).classList.add('visible');
    }
  }
}

// Make all headings in a program__item equal height
function equalHeights(className) {
    var headings = document.getElementsByClassName(className);
    var tallest = 0;

  // Loop over matching divs
  for (i = 0; i < headings.length; i++) {
    headings[i].style.height = 'auto';
    var elem = headings[i];
    var elemHeight = elem.offsetHeight;
    tallest = (elemHeight > tallest ? elemHeight : tallest);
  }

  for (i = 0; i < headings.length; i++) {
    headings[i].style.height = tallest + "px";
  }

}

document.addEventListener("DOMContentLoaded", function() {
  equalHeights('program-item__heading');
});
window.addEventListener('resize', function() {
  equalHeights('program-item__heading');
});

$(document).ready(function(){
  //gallery__slider
  $('.gallery__slider').slick({
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          variableWidth: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          centerMode: false,
          variableWidth: false,
          slidesToShow: 1
        }
      }
    ]
  });

  var gallerySlideCounter = document.querySelector('.gallery__counter-current');
  var galleryTotalSlideCounter = document.querySelector('.gallery__counter-total');

  function updatSlideCounter() {
    var currentSlide = $('.gallery__slider').slick('slickCurrentSlide');
    gallerySlideCounter.textContent = currentSlide + 1;
  }

  function updatSlidesInfo() {
    var currentSlide = $('.gallery__slider').slick('slickCurrentSlide');
    var galleryTotalSlides = document.querySelectorAll('.gallery__item:not(.slick-cloned)');
    gallerySlideCounter.textContent = currentSlide + 1;
    galleryTotalSlideCounter.textContent = galleryTotalSlides.length;
  }

  updatSlidesInfo();

  $('.gallery__controls .prev').click(function(){
    $('.gallery__slider').slick('slickPrev');
    updatSlideCounter();
  });

  $('.gallery__controls .next').click(function(){
    $('.gallery__slider').slick('slickNext');
    updatSlideCounter();
  });

//testimonials__slider
  $('.testimonials__slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000
  });

  $('.testimonials .prev-btn').click(function(){
    $('.testimonials__slider').slick('slickPrev');
  });

  $('.testimonials .next-btn').click(function(){
    $('.testimonials__slider').slick('slickNext');
  });

//partners__slider
  $('.partners__slider').slick({
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          slidesToShow: 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
  });

  $('.partners .prev-btn').click(function(){
    $('.partners__slider').slick('slickPrev');
  });

  $('.partners .next-btn').click(function(){
    $('.partners__slider').slick('slickNext');
  });


  //smooth scrolling
  var $root = $('html, body');
  var navbarLinks = $('.navbar .menu__link');
  $(document).on("scroll", onScroll);

  $('a').click(function() {

    var href = $.attr(this, 'href');
    $root.animate({
      scrollTop: $(href).offset().top
    }, 500, function () {
      window.location.hash = href;
    });
    return false;
  });

  function onScroll(event){
    var scrollPos = $(document).scrollTop();
    navbarLinks.each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos + 50 && refElement.position().top + refElement.height() > scrollPos + 50) {
            navbarLinks.removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
  }

});
