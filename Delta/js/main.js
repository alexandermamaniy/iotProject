/*=====================================================================
/  Theme Name: Eden Builder
/  Author: Script Eden
/  Author URI: http://www.scripteden.com
/  Description: Eden Builder
/  Version: 2.0
/*=====================================================================*/

(function($){
	$(window).load(function(){
		
        /*	FlexSlide text
        /*----------------------------------------------------*/
		$('.flexslider').flexslider({
			animation: "slide",
			selector: ".flex-slogan > li",
			controlNav: false,
			directionNav: false,
			direction: "vertical",
			slideshowSpeed: 4000,
			keyboard: true,
			touch: false,
         });

        /*	Smooth Scroll
        /*----------------------------------------------------*/
        $(function() {
            $('.scroll').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 800);
                        return false;
                    }
                }
            });
        });

        /*	countdown
        /*----------------------------------------------------*/
        var dateFinal = '2019/11/01';

        $('.countdown').countdown(dateFinal, function(event) {

            var $this = $(this)

            //$this.find('span.weeks').html(event.strftime('%w'));
            $this.find('span.days').html(event.strftime('%D'));
            $this.find('span.hours').html(event.strftime('%H'));
            $this.find('span.minutes').html(event.strftime('%M'));
            $this.find('span.seconds').html(event.strftime('%S'));
        });
        
	});
    
    /*	slideshow1 ( nivo Slider )
    /*----------------------------------------------------*/
    $(function(){

            startSlideshow();

        })

        function startSlideshow() {

            $('#nivoSlider').nivoSlider({
                effect: 'slideInRight'
            });

        }
    
})(jQuery);
