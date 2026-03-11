/* ============================================================
   Alex Rivera Portfolio — main.js
   ============================================================ */

   'use strict';

   /* ── Cursor Glow ─────────────────────────────────────────── */
   (function initCursorGlow() {
     const glow = document.getElementById('cursorGlow');
     if (!glow || window.matchMedia('(pointer: coarse)').matches) {
       if (glow) glow.style.display = 'none';
       return;
     }
   
     let mouseX = 0, mouseY = 0;
     let glowX = 0, glowY = 0;
     let raf;
   
     document.addEventListener('mousemove', (e) => {
       mouseX = e.clientX;
       mouseY = e.clientY;
     });
   
     document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
     document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
   
     function animateGlow() {
       glowX += (mouseX - glowX) * 0.1;
       glowY += (mouseY - glowY) * 0.1;
       glow.style.left = glowX + 'px';
       glow.style.top  = glowY + 'px';
       raf = requestAnimationFrame(animateGlow);
     }
     raf = requestAnimationFrame(animateGlow);
   })();
   
   
   /* ── Sticky Nav ──────────────────────────────────────────── */
   (function initStickyNav() {
     const header = document.getElementById('navHeader');
     if (!header) return;
   
     const onScroll = () => {
       header.classList.toggle('scrolled', window.scrollY > 30);
     };
     window.addEventListener('scroll', onScroll, { passive: true });
     onScroll();
   })();
   
   
   /* ── Mobile Hamburger ────────────────────────────────────── */
   (function initMobileMenu() {
     const btn   = document.getElementById('hamburger');
     const links = document.getElementById('navLinks');
     if (!btn || !links) return;
   
     const toggle = (open) => {
       const isOpen = open !== undefined ? open : btn.getAttribute('aria-expanded') !== 'true';
       btn.setAttribute('aria-expanded', String(isOpen));
       links.classList.toggle('open', isOpen);
       document.body.style.overflow = isOpen ? 'hidden' : '';
     };
   
     btn.addEventListener('click', () => toggle());
   
     // Close on nav link click
     links.querySelectorAll('.nav-link').forEach(link => {
       link.addEventListener('click', () => toggle(false));
     });
   
     // Close on outside click
     document.addEventListener('click', (e) => {
       if (!btn.contains(e.target) && !links.contains(e.target)) {
         toggle(false);
       }
     });
   
     // Close on Escape
     document.addEventListener('keydown', (e) => {
       if (e.key === 'Escape') toggle(false);
     });
   })();
   
   
   /* ── Scroll Animations (Intersection Observer) ───────────── */
   (function initScrollAnimations() {
     const els = document.querySelectorAll('.animate-on-scroll');
     if (!els.length) return;
   
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           entry.target.classList.add('animated');
           observer.unobserve(entry.target);
         }
       });
     }, {
       threshold: 0.12,
       rootMargin: '0px 0px -40px 0px'
     });
   
     els.forEach(el => observer.observe(el));
   })();
   
   
   /* ── Active Nav Link on Scroll ───────────────────────────── */
   (function initActiveNavHighlight() {
     const sections = document.querySelectorAll('section[id]');
     const navLinks = document.querySelectorAll('.nav-link');
     if (!sections.length || !navLinks.length) return;
   
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           navLinks.forEach(link => {
             link.classList.toggle(
               'active',
               link.getAttribute('href') === '#' + entry.target.id
             );
           });
         }
       });
     }, {
       rootMargin: '-30% 0px -60% 0px',
       threshold: 0
     });
   
     sections.forEach(sec => observer.observe(sec));
   })();
   
   
   /* ── Smooth Scroll for All In-Page Links ─────────────────── */
   (function initSmoothScroll() {
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function (e) {
         const target = document.querySelector(this.getAttribute('href'));
         if (!target) return;
         e.preventDefault();
         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
       });
     });
   })();