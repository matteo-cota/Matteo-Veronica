(function ($) {
    "use strict";

    // Funzione per generare i cuori che cadono
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️'; // Aggiungi il cuore
        heart.style.left = `${Math.random() * 100}vw`; // Posizione casuale sulla larghezza
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // Durata dell'animazione tra 5 e 10 secondi
        document.getElementById('hearts-container').appendChild(heart);

        // Rimuovi il cuore dopo che ha completato l'animazione
        setTimeout(() => {
            heart.remove();
        }, 10000); // Rimuovi dopo 10 secondi (la durata dell'animazione)
    }

    // Chiamata per generare cuori ogni 2 secondi
    setInterval(createHeart, 2000); 

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });

    // Data di arrivo (14 Giugno 2025)
    const countDownDate = new Date("Jun 14, 2025 00:00:00").getTime();

    // Funzione per aggiornare il countdown ogni secondo
    const x = setInterval(function() {
         
        // Ottieni la data e ora attuali
        const now = new Date().getTime();
         
        // Calcola la distanza tra la data di arrivo e quella attuale
        const distance = countDownDate - now;
         
        // Calcola i giorni, le ore, i minuti e i secondi rimanenti
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
         
        // Mostra i risultati nel countdown
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
         
        // Se il countdown è finito, mostra un messaggio
        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".special-day-container p").innerHTML = "Il grande giorno è arrivato!";
            document.querySelector(".countdown").style.display = "none";
        }
    }, 1000);   


})(jQuery);
