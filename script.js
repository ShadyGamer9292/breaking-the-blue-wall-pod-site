
console.clear();
gsap.registerPlugin(ScrollTrigger);

// ------------------------
// MAIN GSAP ANIMATIONS
// ------------------------
window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  // Zoom image and scale hero section
  gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: true,
      markers: false
    }
  })
  .to("img", {
    scale: 2,
    z: 250,
    transformOrigin: "center center",
    ease: "power1.inOut"
  })
  .to(".section.hero", {
    scale: 1.4,
    transformOrigin: "center center",
    ease: "power1.inOut"
  }, "<")
  .to(".intro", {
    scale: 1.5,
    transformOrigin: "center center",
    ease: "power1.inOut"
  }, "<");

  // Parallax scroll AFTER .wrapper unpins (start when .wrapper ends)
  gsap.to(".intro", {
    y: "-20vh",
    ease: "none",
    scrollTrigger: {
      trigger: ".wrapper",
      start: "bottom bottom", // when .wrapper unpins
      endTrigger: ".gradient-purple",
      end: "bottom top",
      scrub: true
    }
  });

  // Sticky bar visibility + fade-out intro links
  const stickyBar = document.querySelector(".sticky-bar");
  const introLinks = document.querySelectorAll(".intro-links a");

  ScrollTrigger.create({
    trigger: ".section.hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;

      stickyBar.classList.toggle("visible", progress > 0.85);
      introLinks.forEach(link => link.classList.toggle("fade-out", progress > 0.8));
    }
  });
});

// ------------------------
// JQUERY DARKEN ON SCROLL
// ------------------------
$(document).ready(function () {
  $.fn.darkenScroll = function () {
    const elem = $(this);

    $(window).on("scroll", function () {
      const scroll = $(document).scrollTop();
      const offsetTop = elem.offset().top + elem.outerHeight();
      
      // Inverted logic: fade out as you scroll down
      let opacity = 1 - (scroll / offsetTop);
      
      // Clamp between 0 and 1
      opacity = Math.max(Math.min(opacity, 1), 0);

      elem.css("--hero-opacity", opacity);
    });
  };

  $(".section.hero").darkenScroll();
});


