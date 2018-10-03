/*	portfolio 1
/*----------------------------------------------------*/

jQuery(window).on("load resize",function(e){
	var $container = $('.portfolio-items1'),
	colWidth = function () {
		var w = $container.width(), 
		columnNum = 1,
		columnWidth = 0;
        
	//Select what will be your porjects columns according to container width
	if (w > 1040)     { columnNum  = 4; }  
	else if (w > 850) { columnNum  = 3; }  
	else if (w > 768) { columnNum  = 2; }  
	else if (w > 480) { columnNum  = 2; }
	else if (w > 300) { columnNum  = 1; }
	columnWidth = Math.floor(w/columnNum);

	//Default item width and height
	$container.find('.single-item').each(function() {
		var $item = $(this), 
		width = columnWidth,
		height = columnWidth;
		$item.css({ width: width, height: height });
	}); 

	return columnWidth;
	},
	isotope = function () {
		$container.isotope({
			resizable: true,
			itemSelector: '.single-item',
			masonry: {
				columnWidth: colWidth(),
				gutterWidth: 10
			}
		});
	};
	isotope(); 

	// bind portfolio filter list click
	$('.portfolio-filter').on( 'click', 'li', function() {
		var filterValue = $( this ).attr('data-filter');
		$container.isotope({ filter: filterValue });
	});

	// change active class on list
	$('.portfolio-filter').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'li', function() {
			$buttonGroup.find('.active').removeClass('active');
			$( this ).addClass('active');
		});
	}); 

});