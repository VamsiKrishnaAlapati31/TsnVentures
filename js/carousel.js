/* ========================================
   TSN Ventures — Auto-Scroll Carousel
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Duplicate carousel items for seamless infinite scroll
  const tracks = document.querySelectorAll('.auto-scroll-track');

  tracks.forEach(track => {
    const items = track.innerHTML;
    // Duplicate contents so the scroll loops seamlessly
    track.innerHTML = items + items;
  });

});
