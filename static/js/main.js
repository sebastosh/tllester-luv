document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Toggle the mobile menu
  var menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      var mobileNav = document.querySelector('.mobile-navigation');
      var drawer = document.querySelector('.drawer');
      var spans = this.querySelectorAll('span');

      if (mobileNav) mobileNav.classList.toggle('toggle-active');
      if (drawer) {
        if (drawer.style.display === 'none' || drawer.style.display === '') {
          drawer.style.display = 'inline-block';
          drawer.classList.add('show-drawer');
        } else {
          drawer.style.display = 'none';
          drawer.classList.remove('show-drawer');
        }
      }

      // Toggle span visibility
      spans.forEach(function(span) {
        if (span.style.display === 'none') {
          span.style.display = '';
        } else {
          span.style.display = 'none';
        }
      });
    });
  }

  // Mobile submenu toggles
  var toggleSubs = document.querySelectorAll('.drawer .toggle-sub');
  toggleSubs.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      var expanded = this.getAttribute('aria-expanded');
      this.setAttribute('aria-expanded', expanded === 'false' ? 'true' : 'false');

      var parentLi = this.closest('.menu-item-has-children');
      if (parentLi) {
        parentLi.classList.toggle('drop-open');
      }

      var subMenu = this.previousElementSibling;
      if (subMenu && subMenu.classList.contains('sub-menu')) {
        subMenu.classList.toggle('drop-active');
      }

      // Toggle icon
      var icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-angle-down');
        icon.classList.toggle('fa-angle-up');
      }
    });
  });

  // Search toggle
  var searchToggle = document.querySelector('.search-toggle');
  if (searchToggle) {
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();

      var header = document.querySelector('.site-header');
      var drawer = document.querySelector('.search-drawer');

      if (header) header.classList.toggle('search-drawer-open');

      if (drawer) {
        var expanded = drawer.getAttribute('aria-expanded');
        drawer.setAttribute('aria-expanded', expanded === 'false' ? 'true' : 'false');

        if (drawer.style.display === 'none' || drawer.style.display === '') {
          drawer.style.display = 'block';
          var input = drawer.querySelector('.search-input');
          if (input) input.focus();
        } else {
          drawer.style.display = 'none';
        }
      }

      // Toggle search icons
      var icons = this.querySelectorAll('i');
      icons.forEach(function(icon) {
        icon.style.display = icon.style.display === 'none' ? '' : 'none';
      });
    });
  }

  // Close search drawer on Escape key
  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) {
      var drawer = document.querySelector('.search-drawer');
      if (drawer) {
        drawer.setAttribute('aria-expanded', 'false');
        drawer.style.display = 'none';
      }
      var header = document.querySelector('.site-header');
      if (header) header.classList.remove('search-drawer-open');

      // Reset search toggle icons
      var searchToggle = document.querySelector('.search-toggle');
      if (searchToggle) {
        var icons = searchToggle.querySelectorAll('i');
        if (icons[0]) icons[0].style.display = '';
        if (icons[1]) icons[1].style.display = 'none';
      }
    }
  });

  // Center submenus on desktop
  if (window.innerWidth > 768) {
    var menuItems = document.querySelectorAll('.main-navigation li');
    menuItems.forEach(function(item) {
      var submenu = item.querySelector('ul');
      if (submenu) {
        var parentWidth = item.offsetWidth;
        var childWidth = submenu.offsetWidth;
        var offset = parseInt((childWidth - parentWidth) / 2);
        submenu.style.marginLeft = -offset + 'px';
      }
    });
  }
});
