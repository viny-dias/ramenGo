// slide configuration (mobile)
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Function to switch images
  function toggleImages(card) {
    const imageInactive = card.querySelector('.image-inactive');
    const imageActive = card.querySelector('.image-active');
    if (card.classList.contains('selected')) {
      imageInactive.style.display = 'none';
      imageActive.style.display = 'inline-block';
    } else {
      imageInactive.style.display = 'inline-block';
      imageActive.style.display = 'none';
    }
  }

  // Broth selection
  const cardsBroth = document.querySelectorAll('.slide__card--broth');
  cardsBroth.forEach(card => {
    card.addEventListener('click', function() {
      cardsBroth.forEach(c => {
        c.classList.remove('selected');
        toggleImages(c);
      });
      this.classList.add('selected');
      toggleImages(this);
    });
  });

  // Protein selection
  const cardsProtein = document.querySelectorAll('.slide__card--protein');
  cardsProtein.forEach(card => {
    card.addEventListener('click', function() {
      cardsProtein.forEach(c => {
        c.classList.remove('selected');
        toggleImages(c);
      });
      this.classList.add('selected');
      toggleImages(this);
    });
  });

  // Order
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  placeOrderBtn.addEventListener('click', async function() {
    const getSelectedId = (className) => {
      const selectedElement = document.querySelector(`.${className}.selected`);
      return selectedElement ? selectedElement.querySelector('input[type="hidden"]').value : null;
    };

    const brothId = getSelectedId('slide__card--broth');
    const proteinId = getSelectedId('slide__card--protein');

    if (!brothId || !proteinId) {
      alert('Please select both a broth and a protein.');
      return;
    }

    try {
      const response = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf'
        },
        body: JSON.stringify({ brothId, proteinId })
      });

      if (response.ok) {
        window.location.href = '/success';
      } else {
        const errorData = await response.json();
        console.error('Error making the request:', errorData.message);
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  });
});
