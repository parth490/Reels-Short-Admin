/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by HernÃ¡n Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

$(document).ready(function () {

  /******  Nice Select  ******/
  $('select').niceSelect();

  /******  menu hover  ******/
  $(".menu-lnk.has-item").hover(function () {
    $(this).toggleClass("menu_active");
    $(this).find(".menu-dropdown").toggleClass("open_menu");
    $("body").toggleClass("no_scroll");
  });

  /********* Mobile Menu ********/
  $('.mobile-menu-btn').on('click', function (e) {
    e.preventDefault();
    setTimeout(function () {
      $('body').addClass('no_scroll active_menu');
      $(".mobile-menu-btn").toggleClass("active_menu");
      $('.overlay').addClass('active');
    }, 50);
  });
  $('body').on('click', '.overlay, .menu-close-icon svg', function (e) {
    e.preventDefault();
    $('body').removeClass('no_scroll active_menu');
    $(".mobile-menu-btn").removeClass("active_menu");
    $('.overlay').removeClass('active');
  });

  //--  UPGRADE POPUP  --//

  const upgradeBtn = document.querySelector(".upgrade-btn");
  const popup = document.getElementById("upgrade-popup");
  const closeUpgrade = document.getElementById("close-upgrade");

  upgradeBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  closeUpgrade.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  /*********  Multi-level accordion nav  ********/
  $('.acnav-label').click(function () {
    var label = $(this);
    var parent = label.parent('.has-children');
    var list = label.siblings('.acnav-list');
    if (parent.hasClass('is_open')) {
      list.slideUp('fast');
      parent.removeClass('is_open');
    }
    else {
      list.slideDown('fast');
      parent.addClass('is_open');
    }
  });

  /****  TAB Js ****/
  $("ul.tabs li").click(function () {
    var $this = $(this);
    var $theTab = $(this).attr("data-tab");
    if ($this.hasClass("active")) {
    } else {
      $this
        .closest(".tabs-wrapper")
        .find("ul.tabs li, .tabs-container .tab-content")
        .removeClass("active");
      $(
        '.tabs-container .tab-content[id="' +
        $theTab +
        '"], ul.tabs li[data-tab="' +
        $theTab +
        "]"
      ).addClass("active");
    }
    $(this).addClass("active");
  });

  /********* qty spinner ********/
  var quantity = 0;
  $('.quantity-increment').click(function () {
    ;
    var t = $(this).siblings('.quantity');
    var quantity = parseInt($(t).val());
    $(t).val(quantity + 1);
  });
  $('.quantity-decrement').click(function () {
    var t = $(this).siblings('.quantity');
    var quantity = parseInt($(t).val());
    if (quantity > 1) {
      $(t).val(quantity - 1);
    }
  });

  //-- SIDE BAR CLICK JS --//
  // Function to show the clicked section and hide others

  function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });

    // Show the selected section
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.remove('hidden');
    }
  }

  // Wait for DOM to load before adding event listeners 
  // Get all menu items
  const menuItems = document.querySelectorAll('.sidebar-menu li a');

  menuItems.forEach(menu => {
    menu.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Get the corresponding section ID (assuming ID is like "dashboard-section")
      const sectionId = menu.id + '-section';
      showSection(sectionId);

      // Remove "active" class from all menu items and add to the clicked one
      menuItems.forEach(item => item.classList.remove('active'));
      menu.classList.add('active');
    });
  });

  // Show the default section when the page loads
  showSection('dashboard-section');

  // profile btn click Event
  $('#profile-btn').click(function () {
    showSection('profile-section');
  });

  // User Btn Click event 
  $('#user-btn').click(function () {
    showSection('users-section');
  });

  // Content Btn Click event 
  $('#Content-btn').click(function () {
    showSection('Content-section');
  });

  // Actors Btn Click event 
  $('#Actor-btn').click(function () {
    showSection('actors-section');
  });

  // Generes Btn Click event 
  $('#genres-btn').click(function () {
    showSection('genres-section');
  });
  
  // languages Btn Click event 
  $('#languages-btn').click(function () {
    showSection('languages-section');
  });
    
  // liveTvCategories Btn Click event 
  $('#liveTvCategories-btn').click(function () {
    showSection('live-tv-section');
  });

  // live-Tv-Channels Btn Click event 
  $('#liveTvChannels-btn').click(function () {
    showSection('live-tv-channels-section');
  });

  
  //--  SIDE BAR JS --//  
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");

  mobileBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  window.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target) && window.innerWidth <= 767) {
      sidebar.classList.remove("active");
    }
  });

  //--  PRE LOADER JS --// 
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    content.style.display = "block";

    setTimeout(() => {
      content.style.opacity = "1";
    }, 100);
  }, 2000);
  

  //-- PROGRESS WRP --//
  $(document).ready(function () {
    "use strict";
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
      } else {
        jQuery('.progress-wrap').removeClass('active-progress');
      }
    });
    jQuery('.progress-wrap').on('click', function (event) {
      event.preventDefault();
      jQuery('html, body').animate({ scrollTop: 0 }, duration);
      return false;
    });
  });

  //-- COMMUNITATION LOGO SLIDER --//
  var swiper = new Swiper(".communication-slider", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      1199: {
        slidesPerView: 3,
      },
    },
  });

  //-- FEATURED SLIDER --//
  var swiper = new Swiper(".featured-slider", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    centeredSlides: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1400: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  //--- SERIES SLIDER ---//
  var swiper = new Swiper(".series-slider", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    centeredSlides: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1400: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  //-- FLOW SWIPER SLIDER --//
  var swiper = new Swiper('.flow-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });

  //--  USER DATA TABLE FILTER JS --//
  $(document).ready(function () {
    $('#usersTable').DataTable({
      pageLength: 4,
      scrollX: true,
      lengthChange: false,
      columnDefs: [
        { orderable: false, targets: [1, 10] }
      ]
    });
  });

  //-- USERS DATA TABLE FILTER JS --//
  $('#usersTables').DataTable({
    columns: [
      { data: 'profile' },
      { data: 'email' },
      { data: 'device' },
      { data: 'login' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 3] }
    ]
  });

  //-- MOVIES DATA TABLE FILTER JS --//
  $('#moviesTables').DataTable({
    columns: [
      { data: 'No' },
      { data: 'Poster' },
      { data: 'Title' },
      { data: 'Type' },
      { data: 'Episode' },
      { data: 'Free Episode' },
      { data: 'Recomended' },
      { data: 'Free' },
      { data: 'Active' },
      { data: 'Date' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 10] }
    ]
  });

  //-- MOVIES DATA TABLE FILTER JS --//
  $('#seriesTables').DataTable({
    columns: [
      { data: 'Poster' },
      { data: 'Title' },
      { data: 'Ratings' },
      { data: 'Release Year' },
      { data: 'Language' },
      { data: 'Featured' },
      { data: 'Hide / Show' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 7] }
    ]
  });

  //-- MEDIA DATA TABLE FILTER JS --//
  $('#Media-Tables').DataTable({
    columns: [
      { data: 'Source' },
      { data: 'Title' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 2] }
    ]
  }); 
  
  //-- TOP CONTENT TABLE FILTER JS --//
  $('#Top-Contents').DataTable({
    columns: [
      { data: 'Order' },
      { data: 'Poster' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 2] }
    ]
  });

  //-- Actors TABLE FILTER JS --//
  $('#actors-Contents').DataTable({
    columns: [
      { data: 'Profile' },
      { data: 'Dob' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 2] }
    ]
  });

  //-- genres TABLE FILTER JS --//
  $('#genres-Contents').DataTable({
    columns: [
      { data: 'Title' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 1] }
    ]
  });

  //-- LANGUAGES TABLE FILTER JS --//
  $('#languages-Contents').DataTable({
    columns: [
      { data: 'Title' },
      { data: 'Code' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [0, 1, 2] }
    ]
  });

  //-- LIVE TV CATEGORIES TABLE FILTER JS --//
  $('#live-tv-Contents').DataTable({
    columns: [
      { data: 'Image' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [1, 1] }
    ]
  });

  //-- LIVE TV CHANNEL TABLE FILTER JS --//
  $('#live-tv-channels-Contents').DataTable({
    columns: [
      { data: 'Image' },
      { data: 'Category' }, 
      { data: 'Type' },
      { data: 'Preview' },
      { data: 'Action' }
    ],
    columnDefs: [
      { orderable: false, targets: [0, 1, 2] }
    ]
  });
  
    //-- NOTIFICATIONS CONTENTS TABLE FILTER JS --//
    $('#notification-Contents').DataTable({
      columns: [
        { data: 'Title' },
        { data: 'Description' }, 
        { data: 'Action' }
      ],
      columnDefs: [
        { orderable: false, targets: [1, 2] }
      ]
    }); 

  /******* edit-popup Js *******/
  $(".edit-btn").click(function () {
    $(".edit-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* video-edit-popup Js *******/
  $(".video-edit-btn").click(function () {
    $(".video-edit-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".video-edit-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* add-edit-popup Js *******/
  $(".add-edit-btn").click(function () {
    $(".add-edit-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-edit-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* Content-popup Js *******/
  $(".select-content-btn").click(function () {
    $(".content-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".content-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* add-actor-popup Js *******/
  $(".add-actor-btn").click(function () {
    $(".add-actor-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-actor-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* actor-edit-popup Js *******/
  $(".actor-edit-btn").click(function () {
    $(".actor-edit-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".actor-edit-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* add-genre-popup Js *******/
  $(".add-genre-btn").click(function () {
    $(".add-genre-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-genre-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /*******genre-edit-btn Js *******/
  $(".genre-edit-btn").click(function () {
    $(".genre-edit-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".genre-edit-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* Language-edit-popup Js *******/
  $(".languages-edit-btn").click(function () {
    $(".languages-edit-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".languages-edit-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /******* add-languages-popup Js *******/
  $(".add-languages-btn").click(function () {
    $(".add-languages-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-languages-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

    /******* live-tv-edit-popup Js *******/
    $(".live-tv-edit-btn").click(function () {
      $(".live-tv-edit-popup").addClass("active");
      $("body").addClass("no_scroll");
      $('.overlay').addClass('qv_active');
    });
    $(".edit-close-btn, .overlay").click(function () {
      $(".live-tv-edit-popup").removeClass("active");
      $("body").removeClass("no_scroll");
      $('.overlay').removeClass('qv_active');
    });

     /******* add-live-tv-popup Js *******/
    $(".add-live-tv-btn").click(function () {
      $(".add-live-tv-popup").addClass("active");
      $("body").addClass("no_scroll");
      $('.overlay').addClass('qv_active');
    });
    $(".edit-close-btn, .overlay").click(function () {
      $(".add-live-tv-popup").removeClass("active");
      $("body").removeClass("no_scroll");
      $('.overlay').removeClass('qv_active');
    });

    /******* live-tv-channels-edit-popup Js *******/
    $(".live-tv-channels-edit-btn").click(function () {
      $(".live-tv-channels-edit-popup").addClass("active");
      $("body").addClass("no_scroll");
      $('.overlay').addClass('qv_active');
    });
    $(".edit-close-btn, .overlay").click(function () {
      $(".live-tv-channels-edit-popup").removeClass("active");
      $("body").removeClass("no_scroll");
      $('.overlay').removeClass('qv_active');
    }); 

     /******* add-live-tv-channels-popup Js *******/
     $(".add-live-tv-channels-btn").click(function () {
      $(".live-tv-channels-add-popup").addClass("active");
      $("body").addClass("no_scroll");
      $('.overlay').addClass('qv_active');
    });
    $(".edit-close-btn, .overlay").click(function () {
      $(".live-tv-channels-add-popup").removeClass("active");
      $("body").removeClass("no_scroll");
      $('.overlay').removeClass('qv_active');
    });  

     /******* notification-edit-popup Js *******/
     $(".notification-edit-btn").click(function () {
      $(".notification-edit-popup").addClass("active");
      $("body").addClass("no_scroll");
      $('.overlay').addClass('qv_active');
    });
    $(".edit-close-btn, .overlay").click(function () {
      $(".notification-edit-popup").removeClass("active");
      $("body").removeClass("no_scroll");
      $('.overlay').removeClass('qv_active');
    }); 

     /******* Add-notification-popup Js *******/
     $(".add-notification-btn").click(function () {
      $(".notification-add-popup").addClass("active");
      $("body").addClass("no_scroll");
      $('.overlay').addClass('qv_active');
    });
    $(".edit-close-btn, .overlay").click(function () {
      $(".notification-add-popup").removeClass("active");
      $("body").removeClass("no_scroll");
      $('.overlay').removeClass('qv_active');
    }); 
//   
  // -- Date of Birth --//  
  $(document).ready(function () {
    $('.dob-picker').each(function () {
      flatpickr(this, {
        dateFormat: "Y-m-d",
        maxDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        defaultDate: "1990-01-01"
      });
    });
  });
 
  //-- IMAGES UPLOAD JS DYNEMIC --//
  window.loadFile = function (event, imgId) {
    const output = document.getElementById(imgId);
    if (event.target.files && event.target.files[0]) {
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
    }
  }; 
});

//-- VIDEO SHOW POPUP -- //
$(document).ready(function () {
  $('.video-prv-btn').click(function () {
    $('.video-popup').fadeIn();
  });

  $('.close-popup').click(function () {
    $('.video-popup').fadeOut();
  });

  $('.video-popup').click(function (e) {
    if ($(e.target).is('.video-popup')) {
      $(this).fadeOut();
    }
  });
});

//-- MOVIE INTERESRS CHART -- //
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("movieInterestChart").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Inception', 'Interstellar', 'Joker', 'Parasite', 'Avatar', 'Tenet'],
      datasets: [{
        label: 'Interest (%)',
        data: [85, 72, 60, 50, 68, 40],
        backgroundColor: [
          '#facc15', '#34d399', '#f87171', '#60a5fa', '#a78bfa', '#fb923c'
        ],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1f2937",
          titleColor: "#facc15",
          bodyColor: "#fff"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks:
          {
            color: '#e5e7eb'
          },
          grid: {
            color: 'rgba(255,255,255,0.05)'
          }
        },
        x: {
          ticks: {
            color: '#e5e7eb',
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
});

//-- TV SHOW ANALYSIS CHART -- //
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'TV Show Users',
          data: [120, 190, 300, 500, 200, 300, 400],
          borderColor: '#42a5f5',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Trending Shows',
          data: [60, 80, 100, 150, 180, 120, 160],
          borderColor: '#66bb6a',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Public Interest',
          data: [200, 300, 250, 400, 450, 420, 500],
          borderColor: '#ef5350',
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#ffffff'
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff' // X-axis tick labels
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)' // Optional: faint white grid lines
          }
        },
        y: {
          ticks: {
            color: '#ffffff' // Y-axis tick labels
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)' // Optional: faint white grid lines
          }
        }
      },
    },
  });
});

//--  REPORTS KPI LOADER JS --// 
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const progressFills = document.querySelectorAll(".progress-fill");

  counters.forEach((counter, index) => {
    const target = parseInt(counter.getAttribute("data-target")) || 100;
    const duration = 60000; // 60 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * target);
      counter.innerText = counter.innerText.includes('$') ? `$${currentValue.toLocaleString()}` : currentValue.toLocaleString();

      // Animate progress bar
      const percentage = parseInt(progressFills[index].getAttribute("data-percentage")) || 100;
      progressFills[index].style.width = `${progress * percentage}%`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = counter.innerText.includes('$') ? `$${target.toLocaleString()}` : target.toLocaleString();
        progressFills[index].style.width = `${percentage}%`;
      }
    }

    requestAnimationFrame(updateCounter);
  });
});

//-- USERS KPI MULTIPLE LINE CHART --// 
const ctx = document.getElementById('multiLineChart').getContext('2d');
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Users',
      data: [120, 150, 170, 180, 200, 220],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Sessions',
      data: [80, 100, 130, 160, 180, 210],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Revenue',
      data: [200, 250, 300, 350, 400, 450],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4,
      fill: false
    }
  ]
};
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        color: '#ffffff',
        text: 'Overview Dashboard Metrics'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: 'white',
        },
        position: 'bottom'
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.11)'
        }
      },
      y: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.11)'
        }
      }
    }
  }
};
const multiLineChart = new Chart(ctx, config);


//--- Domumentation Js ---//
document.addEventListener('DOMContentLoaded', function () {
    function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");

        document.getElementById('body-overlay').classList.toggle("active");
    }

    document.getElementById('close-doc-btn').addEventListener('click', function () {
        const sidebar = document.querySelector('.doc_sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        document.getElementById('body-overlay').classList.remove('active');
    });

    document.getElementById('body-overlay').addEventListener('click', function () {
        const sidebar = document.querySelector('.doc_sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        this.classList.remove('active');
    });
 
    window.toggleSidebar = toggleSidebar;
});

function scrollWithOffset(id, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
