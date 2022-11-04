let md = window.markdownit();
let biotext 

$.get("me/test.md", function ( data ){
    console.log(data);
    biotext = md.render(data);
});


$(document).ready(function() {




    $("bio").load("includeHtml/bio.html", function() {
//        $("img#biolab").attr("right", "0px");

        $("div#biolab").html(biotext);
    });
	// load the header. in header, there is my logo, webpage name
	// and a dropdown menu. because header and photo is in different <div>
	// so If I refresh the photo display, will not clear the header's event handler.
	$("header").load("includeHtml/header.html", function() {
        $("myName").load("includeHtml/myName.html", function() {
            $("logo").load("svg/frankie.svg");
        });
/*         $("navbar").load("includeHtml/navigationBar.html", function() {
            $("nav.dropdown").click(function() {
				$(this).children("div").toggle("slow");
			});  
        }); */
	});

    $("nav").load("includeHtml/nav.html", function() {
        $("svg#bio").on("click", function() {
            console.log($("svg#bio").attr("id"));
            console.log($("div#biolab").attr("id"));
            $("img#biolabtwo").animate({
                right: "1000px",
            }).css("display", "none");

            $("div#biolab").css("display", "block").animate({
                right: "0px",
            })
        });

        $("svg#biotwo").on("click", function() {
            $("div#biolab").animate({
                right: "1000px",
            }).css("display", "none");

            $("img#biolabtwo").css("display", "block").animate({
                right: "0px",
            })
        })
    });

/*     $.get("me/test.md", function ( data ){
        console.log(data);
        $("div#biolab").html(md.render(data));
    }); */

    $("footer").load("includeHtml/footer.html");
    
});
