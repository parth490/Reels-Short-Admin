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

  //-- SIDE BAR CLICK JS --//  
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

  // Close sidebar and overlay on close button click
  document.querySelector('.close-sidebar-btn').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
  });

  // Close sidebar and overlay when clicking on overlay
  document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
  });

  // Get all menu items
  const menuItems = document.querySelectorAll('.sidebar-menu li a');

  menuItems.forEach(menu => {
    menu.addEventListener('click', (event) => {
      event.preventDefault();

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

  //   
  // -- Date of Birth --//   

  $(document).ready(function () {
  $('.dob-picker').each(function () {
    flatpickr(this, {
      enableTime: true,           
      dateFormat: "Y-m-d H:i",     
      altInput: true,
      altFormat: "F j, Y h:i K",     
      maxDate: "today",
      defaultDate: "1990-01-01 12:00"
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

  // QUotes Chart js 
  if(document.getElementById('quotesChart')){
  const ctx = document.getElementById('quotesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [{
        label: 'Quotes',
        data: [12, 9, 17, 14, 18],
        borderColor: '#7A5AF8',
        backgroundColor: 'rgba(122, 90, 248, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointRadius: 5,
        pointHoverRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { display: false } },
        x: { grid: { display: false } }
      }
    }
  });
  }

  // Job chart js 
  if(document.getElementById('jobsChart')){
    const jobsChart = new Chart(document.getElementById('jobsChart'), {
    type: 'doughnut',
    data: {
      labels: ['New Jobs', 'Job in Progress', 'Completed Jobs'],
      datasets: [{
        data: [312, 532, 839],
        backgroundColor: ['#A78BFA', '#FBBF24', '#34D399'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: false,
      plugins: { legend: { display: false }, tooltip: { enabled: true } }
    }
  }); 
  }    
  
  /**** edit-job-popup Js ****/
  $(".edit-job-btn").click(function () {
    $(".edit-job-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-job-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });  
  
   /**** SR-Recent-job-popup Js ****/ 
  $(".sr-recent-job-btn").click(function () { 
    $(".sr-recent-job-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".sr-recent-job-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });  

  /**** SR-edit-job-popup Js ****/ 
  $(".sr-edit-job-btn").click(function () { 
    $(".sr-edit-job-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".sr-edit-job-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 


    /**** mr-production-job-popup Js ****/ 
  $(".pm-production-job-btn").click(function () { 
    $(".mr-production-job-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".mr-production-job-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** signup-popup Js ****/
  $(".sign-out-btn").click(function () {
    $(".signup-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".signup-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });
  
  /**** add-task-popup Js ****/
    $(".add-task-btn").click(function () {
    $(".add-task-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-task-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** Edit-task-popup Js ****/
    $(".edit-task-btn").click(function () {
    $(".edit-task-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-task-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

    /**** add-project-popup Js ****/
    $(".add-project-btn").click(function () {
    $(".add-project-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-project-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** add-notes-popup Js ****/
   $(".add-note-btn").click(function () {
    $(".add-notes-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-notes-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

    /**** Edit-notes-popup Js ****/
   $(".edit-notes-btn").click(function () {
    $(".edit-notes-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-notes-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** add-file-popup Js ****/
   $(".add-file-btn").click(function () {
    $(".add-files-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-files-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

    /**** edit-file-popup Js ****/
   $(".edit-file-btn").click(function () {
    $(".edit-files-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-files-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });
  
    /**** Update-Profile-popup Js ****/
    $(".update-pro-btn").click(function () {
    $(".update-profile-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".update-profile-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

    /**** add-Job-popup Js ****/
    $(".create-job-btn").click(function () {
    $(".add-job-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-job-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** add-Proposal-popup Js ****/
    $(".create-proposal-btn").click(function () {
    $(".add-proposal-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-proposal-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** edit-Proposal-popup Js ****/
    $(".edit-proposal-btn").click(function () {
    $(".edit-proposal-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-proposal-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });  

   /**** add-quote-popup Js ****/
    $(".create-quote-btn").click(function () {
    $(".add-quote-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-quote-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** add-quote-popup Js ****/
    $(".edit-quote-btn").click(function () {
    $(".edit-quote-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-quote-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

    /**** add-estimate-popup Js ****/
    $(".create-estimate-btn").click(function () {
    $(".add-estimate-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-estimate-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** edit-estimate-popup Js ****/
    $(".edit-estimate-btn").click(function () {
    $(".edit-estimate-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-estimate-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** add-invoice-popup Js ****/
    $(".create-invoice-btn").click(function () {
    $(".add-invoice-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-invoice-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });
  
  /**** add-invoice-popup Js ****/
    $(".edit-invoice-btn").click(function () {
    $(".edit-invoice-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-invoice-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** add-contact-popup Js ****/
    $(".create-contacts-btn").click(function () {
    $(".add-contact-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-contact-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });
  
  /**** Edit-contact-popup Js ****/
    $(".edit-contacts-btn").click(function () {
    $(".edit-contact-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-contact-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

    /**** add-invitation-popup Js ****/
    $(".create-invitation-btn").click(function () {
    $(".add-invitation-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".add-invitation-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

     /**** edit-client-popup Js ****/
  $(".edit-client-btn").click(function () {
    $(".edit-client-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-client-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

  /**** edit-quotation-popup Js ****/
  $(".edit-quotation-btn").click(function () {
    $(".edit-quotation-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-quotation-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 
  
  /**** edit-Proposals-popup Js ****/
  $(".edit-proposals-btn").click(function () {
    $(".edit-proposals-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-proposals-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  }); 

  /**** edit-estimate-popup Js ****/
  $(".edit-estimates-btn").click(function () {
    $(".edit-estimates-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-estimates-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });
  
     /**** edit-estimate-popup Js ****/
  $(".edit-invoices-btn").click(function () {
    $(".edit-invoices-popup").addClass("active");
    $("body").addClass("no_scroll");
    $('.overlay').addClass('qv_active');
  });
  $(".edit-close-btn, .overlay").click(function () {
    $(".edit-invoices-popup").removeClass("active");
    $("body").removeClass("no_scroll");
    $('.overlay').removeClass('qv_active');
  });

});

//------ Choice js options ------//
  document.querySelectorAll('.access-select').forEach(select => {
  new Choices(select, {
    removeItemButton: true,
    searchEnabled: true,
    placeholderValue: 'Select options',
    itemSelectText: '',
  });
});

//---------  table action btn dropdown ----------//
function toggleDropdown(btn) {
  const menu = btn.nextElementSibling;
  const isVisible = menu.style.display === 'block';

  document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');

  menu.style.display = isVisible ? 'none' : 'block';
} 
// document.addEventListener('click', function (e) {
//   if (!e.target.closest('..action .dropdown-wrapper')) {
//     document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
//   }
// });
   

//------------------- SHARED -------------------//

function hideAllSections() {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
}

//------------------- JOBS -------------------//

function openJobProfile() {
  hideAllSections();
  const jobProfile = document.getElementById('job-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddJob() {
  hideAllSections();
  const addJob = document.getElementById('add-job');
  if (addJob) addJob.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-to-jobs').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('jobs-section');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});

//------------------- CLIENTS -------------------//

function openClientProfile() {
  hideAllSections();
  const clientProfile = document.getElementById('client-profile');
  if (clientProfile) clientProfile.classList.remove('hidden');
}

function openAddClient() {
  hideAllSections();
  const addClient = document.getElementById('add-client');
  if (addClient) addClient.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-to-clients').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const clientsSection = document.getElementById('Clients-section');
      if (clientsSection) clientsSection.classList.remove('hidden');
    });
  });
});
 
//------------------- Quotes -------------------// 
function openQuotesProfile() {
  hideAllSections();
  const jobProfile = document.getElementById('quotes-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddQuote() {
  hideAllSections();
  const jobProfile = document.getElementById('quotes-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-to-quotes').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('quotes-section');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});

//------------------- Preview Quotes -------------------// 
function openAddQuotePreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-quotes');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddQuotePreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-quotes');
  if (jobProfile) jobProfile.classList.remove('hidden');
}
 
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-quotes-preview').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('quotes-profile');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});  
 


//------------------- Proposal -------------------// 
function openProposalsProfile() {
  hideAllSections();
  const jobProfile = document.getElementById('Proposals-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddProposals() {
  hideAllSections();
  const jobProfile = document.getElementById('Proposals-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-to-proposals').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('proposals-section');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});

//------------------- Preview Proposal -------------------// 
function openAddProposalsPreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-proposals');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddProposalsPreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-proposals');
  if (jobProfile) jobProfile.classList.remove('hidden');
}
 
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-proposals-preview').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('Proposals-profile');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});  
 
//------------------- Estimate -------------------// 
function openAddEstimates() {
  hideAllSections();
  const jobProfile = document.getElementById('estimate-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddEstimates() {
  hideAllSections();
  const jobProfile = document.getElementById('estimate-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-to-proposals').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('estimate-section');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});

//------------------- Preview Estimate -------------------// 
function openAddEstimatesPreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-estimate');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddEstimatesPreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-estimate');
  if (jobProfile) jobProfile.classList.remove('hidden');
}
 
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-estimates-preview').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('estimate-profile');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});   

//------------------- Invoice -------------------// 
function openAddInvoices() {
  hideAllSections();
  const jobProfile = document.getElementById('invoice-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddInvoices() {
  hideAllSections();
  const jobProfile = document.getElementById('invoice-profile');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-to-proposals').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('invoice-section');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});

//------------------- Preview Invoices -------------------// 
function openAddInvoicesPreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-invoice');
  if (jobProfile) jobProfile.classList.remove('hidden');
}

function openAddInvoicesPreview() {
  hideAllSections();
  const jobProfile = document.getElementById('preview-invoice');
  if (jobProfile) jobProfile.classList.remove('hidden');
}
 
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.go-invoices-preview').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      hideAllSections();
      const jobsSection = document.getElementById('invoice-profile');
      if (jobsSection) jobsSection.classList.remove('hidden');
    });
  });
});  
 

// Notification menu js 
document.getElementById("notification-btn").addEventListener("click", function (e) {
  const dropdown = document.getElementById("notification-menu");
  dropdown.classList.toggle("show");
  e.stopPropagation();
});

// Close dropdown when clicking outside
document.addEventListener("click", function () {
  const dropdown = document.getElementById("notification-menu");
  dropdown.classList.remove("show");
}); 

//---- Sub Menu In Setting Js START ----//
function toggleSubmenu() {
  const submenu = document.getElementById("docSubmenu");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// Automatically update the main li's data-tab when a submenu item is selected
document.querySelectorAll('#docSubmenu input[type="radio"]').forEach((radio) => {
  radio.addEventListener('change', function () {
    if (this.checked) {
      const selectedTab = this.closest('li').getAttribute('data-tab');
      document.getElementById('docSettings').setAttribute('data-tab', selectedTab);
    }
  });
});

// Trigger the first checked radio to initialize parent data-tab
document.addEventListener("DOMContentLoaded", function () {
  const checkedRadio = document.querySelector('#docSubmenu input[type="radio"]:checked');
  if (checkedRadio) {
    const selectedTab = checkedRadio.closest('li').getAttribute('data-tab');
    document.getElementById('docSettings').setAttribute('data-tab', selectedTab);
  }
});

//---- Sub Menu In Setting Js END ----// 

  const fileInput = document.getElementById('fileUploader');
  const previewContainer = document.getElementById('filePreviewArea');

  fileInput.addEventListener('change', function () {
    Array.from(this.files).forEach(file => {
      const fileURL = URL.createObjectURL(file);
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview-item');

      const removeBtn = document.createElement('button');
      removeBtn.innerText = '✖';
      removeBtn.classList.add('remove-btn');
      removeBtn.onclick = () => previewItem.remove();

      previewItem.appendChild(removeBtn);

      if (file.type.startsWith('image')) {
        const img = document.createElement('img');
        img.src = fileURL;
        previewItem.appendChild(img);
      } else if (file.type.startsWith('video')) {
        const video = document.createElement('video');
        video.src = fileURL;
        video.controls = true;
        previewItem.appendChild(video);
      }

      previewContainer.appendChild(previewItem);
    });

    // Reset input so you can re-upload same files
    fileInput.value = '';
  });
 
  // Hide loader after 3 seconds
  setTimeout(() => {
    document.getElementById('loaderOverlay').classList.add('fade-out');
  }, 2500);

 
