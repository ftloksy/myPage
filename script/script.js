let md = window.markdownit();
let biotext;
let contacttext;

$.get("me/bio.md", function ( data ){
    console.log(data);
    biotext = md.render(data);
});

$.get("me/contact.md", function ( data ){
    console.log(data);
    contacttext = md.render(data);
});


$(document).ready(function() {




/*     $("biopage").load("includeHtml/bio.html", function() {
//        $("img#biolab").attr("right", "0px");

        $("div#biolab").html(biotext);
    }); */
	// load the header. in header, there is my logo, webpage name
	// and a dropdown menu. because header and photo is in different <div>
	// so If I refresh the photo display, will not clear the header's event handler.
	$("header").load("includeHtml/header.html", function() {
        $("logo").load("svg/frankie.svg");
    });
/*         $("navbar").load("includeHtml/navigationBar.html", function() {
            $("nav.dropdown").click(function() {
				$(this).children("div").toggle("slow");
			});  
        }); */
	// });

    $("pagebody").load("includeHtml/pages.html", function() {

        $("div#biolab").html(biotext);
        $("div#contact").html(contacttext);
        $("div#contact").css("display", "none");

        $("nav#bio").load("svg/bio.svg", function() {
            $(this).children("svg").attr("id", "bio");
            $(this).children("svg").children("g").children("text").text("Bio");
            $(this).children("svg").on("click", function() {
                console.log($("svg#bio").attr("id"));
                console.log($("div#biolab").attr("id"));
    
    
                $("div#contact").animate({
                    right: "1000px",
                }).css("display", "none");
    
                $("div#biolab").css("display", "block").animate({
                    right: "0px",
                })
            });
        });
        $("nav#contentme").load("svg/bio.svg", function() {
            $(this).children("svg").attr("id", "content");
            $(this).children("svg").children("g").children("text").text("Content");

            $(this).children("svg").on("click", function() {
                $("div#biolab").animate({
                    right: "1000px",
                }).css("display", "none");

                $("div#contact").css("display", "block").animate({
                    right: "0px",
                })
            })
        });




    });


/*     $("bio").children("svg").on("click", function() {
        console.log($("svg#bio").attr("id"));
        console.log($("div#biolab").attr("id"));


        $("img#biolabtwo").animate({
            right: "1000px",
        }).css("display", "none");

        $("div#biolab").css("display", "block").animate({
            right: "0px",
        })
    }); */

/*     $.get("me/test.md", function ( data ){
        console.log(data);
        $("div#biolab").html(md.render(data));
    }); */

    $("footer").load("includeHtml/footer.html");
    
});
