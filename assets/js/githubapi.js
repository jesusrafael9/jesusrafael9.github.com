
(function($) {
	$.ajax({
	    url:'https://api.github.com/users/jesusrafael9/repos',
	    data:{
          client_id:'f63015713195c252f8dd',
          client_secret:'f7a802a4176007b18d5b67f032bfd06ca4225605',
          sort: 'created: asc',
          per_page: 10
        }
	}).done(function(repos){
		var $portfolio = $("#portfolio div.container div.row");
	
		$portfolio.html(getArticles(repos))

	    function getArticles(repos){
	    	return (`
            <div class="4u 12u$(mobile)">
									<article class="item">
										<a href="${repos[8].html_url}" class="image fit"><img src="images/pic02.jpg" alt="" /></a>
										<div class="content">
								            <span class="description">${repos[0].description}.</span>
								         </div>
										<header>
											<h3>${repos[8].name}</h3>
										</header>
									</article>
									<article class="item">
										<a href="${repos[1].html_url}" class="image fit"><img src="images/pic03.jpg" alt="" /></a>
										<div class="content">
								            <span class="description">${repos[1].description}.</span>
								         </div>
										<header>
											<h3>${repos[1].name}</h3>
										</header>
									</article>
								</div>
								<div class="4u 12u$(mobile)">
									<article class="item">
										<a href="${repos[2].html_url}" class="image fit"><img src="images/pic04.jpg" alt="" /></a>
										<div class="content">
								            <span class="description">${repos[2].description}.</span>
								         </div>
										<header>
											<h3>${repos[2].name}</h3>
										</header>
									</article>
									<article class="item">
										<a href="${repos[3].html_url}" class="image fit"><img src="images/pic05.jpg" alt="" /></a>
										<div class="content">
								            <span class="description">${repos[3].description}.</span>
								         </div>
										<header>
											<h3>${repos[3].name}</h3>
										</header>
									</article>
								</div>
								<div class="4u$ 12u$(mobile)">
									<article class="item">
										<a href="${repos[4].html_url}" class="image fit"><img src="images/pic06.jpg" alt="" /></a>
										<div class="content">
								            <span class="description">${repos[4].description}.</span>
								         </div>
										<header>
											<h3>${repos[4].name}</h3>
										</header>
									</article>
									<article class="item">
										<a href="${repos[5].html_url}" class="image fit"><img src="images/pic07.jpg" alt="" /></a>
										<div class="content">
								            <span class="description">${repos[5].description}.</span>
								         </div>
										<header>
											<h3>${repos[5].name}</h3>
										</header>
									</article>
								</div>
          `);
	    }
	});
})(jQuery);