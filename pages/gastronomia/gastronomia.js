$(document).ready(function() {
    // Filtrado por categoría
    $('.filter-btn').on('click', function() {
        const category = $(this).data('category');

        // Actualizar botón activo
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        // Filtrar cards
        $('.gastro-card').each(function() {
            const $card = $(this);
            const cardCategory = $card.data('category');

            if (category === 'todos' || cardCategory === category) {
                $card.css('display', 'block');
                setTimeout(function() {
                    $card.css({
                        'opacity': '1',
                        'transform': 'scale(1)'
                    });
                }, 10);
            } else {
                $card.css({
                    'opacity': '0',
                    'transform': 'scale(0.8)'
                });
                setTimeout(function() {
                    $card.css('display', 'none');
                }, 300);
            }
        });
    });
});
