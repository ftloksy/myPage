let md = window.markdownit();


$(document).ready(function() {




    $("bio").load("includeHtml/bio.html", function() {
//        $("img#biolab").attr("right", "0px");
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
            console.log($("img#bio").attr("src"));
            console.log($("img#biolab").attr("src"));
            $("img#biolabtwo").animate({
                right: "1000px",
            }).css("display", "none");

            $("img#biolab").css("display", "block").animate({
                right: "0px",
            })
        });

        $("svg#biotwo").on("click", function() {
            $("img#biolab").animate({
                right: "1000px",
            }).css("display", "none");

            $("img#biolabtwo").css("display", "block").animate({
                right: "0px",
            })
        })
    });

    $.get("me/test.md", function ( data ){
        console.log(data);
        $("markdowntest").html(md.render(data));
    });

    $("footer").load("includeHtml/footer.html");
    
});
