let md = window.markdownit();
let biotext;
let contacttext;
let myprojecttext;

$.get("me/bio.md", function ( data ){
    console.log(data);
    biotext = md.render(data);
});

$.get("me/contact.md", function ( data ){
    console.log(data);
    contacttext = md.render(data);
});

myprojecttext = `
	<center style="padding-top: 0px">
	<h1>Let play 2048</h1>
	<p> use "h" for right, use "j" for down, use "k" for up, use "L" for right</p>
	<canvas
		id="2048game"
		width="512"
		height="512"
		style="border:1px solid #000000;"
		>
	</canvas>
	</center>
<script>

class twomap {
	constructor() {
		this.bm = [
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0
		];
		this.make_new_brick();
		this.make_new_brick();
		this.score = 0;
	};
	get not_all_full() {
		let not_allfull = 0;
		for (let i = 0; i < 16; i++){
			if (this.bm[i] == 0) {
				not_allfull = 1;
			}
		}
		return not_allfull;
	};
	make_new_brick() {
		if (this.not_all_full) {
			do {
				let ni = Math.floor(Math.random() * 16);
				if (this.bm[ni] == 0) {
					this.bm[ni] = 2;
					break;
				}
			}
			while (1);
		} else {
			console.log("Game Over!");
		}; 
	};
	find_y_row(n) {
		var find_y_id = [];
		var find_y = [];
		for (let i = 0; i < 4; i++) {
			find_y_id.push(n * 4 + i);
			find_y.push(this.bm[n * 4 + i]);
		};
		var o = {
			nid: find_y_id,
			v: find_y
			};
		return o;
				
	}
	find_x_row(n) {
		var find_x_id = [];
		var find_x = [];
		for (let i = 0; i < 16; i++) {
			if (i % 4 == n) {
				find_x_id.push(i);
				find_x.push(this.bm[i]);
			};
		};
		var o = {
			nid: find_x_id,
			v: find_x
			};
		return o;
	}
	move(action) {
		for (let i = 0; i < 4; i++) {
			if (action == "h" || action == "l") {
				var o = this.find_y_row(i);
			} else if (action == "j" || action == "k" ) {
				var o = this.find_x_row(i);
			}
			if (action == "h" || action == "k") {
				o.v = this.move_array(o.v);
			} else if (action == "l" || action == "j") {
				o.v.reverse();
				o.v = this.move_array(o.v);
				o.v.reverse();
			}
			

			for (let i = 0; i < 16; i++) {
				this.bm[o.nid[i]] = o.v[i];
			}
		};
		this.make_new_brick()
	}
	move_array(v){
		return this.notNull ( this.makeup_array ( this.notNull(v) ));
	}
	notNull(al) {
		var p = 0;
		for (let i = 0; i < 4; i++) {
			if (al[i] !== 0) {
				var v = al[i];
				al[i] = 0;
				al[p] = v - (v % 2);
				p = p + 1;
			}
		}
		return al;
	}
	makeup_array(al) {
		for (let i = 0; i < 3; i++){
			if (al[i] == al[i + 1]) {
				al[i] = 0;
				this.score = this.score + al[i + 1] * 2;
				al[i + 1] = al[i + 1] * 2 + 1;
			}
		};	
		return al;
	}
}

document.addEventListener("keydown", keyDownHandler, false);

var c = document.getElementById("2048game");
var ctx = c.getContext("2d");
let tm = new twomap();

var app = angular.module('myscore', []);
app.controller('gScore', function($scope, $interval) {
	$interval(function(){
		$scope.score = tm.score;
	}, 10);
});

function keyDownHandler(e) {
	if ( e.key == "l" || e.key == "h" || e.key == "j" || e.key == "k" ){
	   tm.move(e.key);
	}
}

function brick_draw(xn, yn, n) {
	colmap = {
		2: "rgb(64, 256, 256)",
		4: "rgb(256, 64, 256)",
		8: "rgb(256, 256, 64)",
		16: "rgb(64, 64, 256)",
		32: "rgb(256, 64, 64)",
		64: "rgb(64, 256, 64)",
		128: "rgb(128, 256, 256)",
		256: "rgb(256, 128, 256)",
		512: "rgb(256, 256, 128)",
		1024: "rgb(128, 128, 256)",
		2048: "rgb(256, 128, 128)"
		};
	ctx.fillStyle = colmap[n];
	ctx.fillRect(xn * 128, yn * 128, 128, 128);
	ctx.lineWidth = 5;
	ctx.strokeStyle = 'rgb(0, 255, 0)';
	ctx.strokeRect(xn * 128, yn * 128, 128, 128);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '40px georgia';
	if ( n > 1000 ) {
		ctx.fillText(n, xn * 128, yn * 128 + 75);
	}
	else if ( n > 100 ) {
		ctx.fillText(n, xn * 128 + 25, yn * 128 + 75);
	}
	else {
		ctx.fillText(n, xn * 128 + 50, yn * 128 + 75);
	}
}

function draw() {
	ctx.clearRect(0, 0, 512, 512);
	for (ni = 0; ni < 16; ni++){
		if (tm.bm[ni] != 0) {
			y = Math.floor(ni / 4);	
			x = ni % 4;
			brick_draw(x, y, tm.bm[ni]);
		}
	}
// 	document.getElementById('scoreDisplay').innerHTML = tm.score;


}

setInterval(draw, 10);

</script>

`
/* $.get("me/myproject.md", function ( data ){
    // me/myproject.md
    console.log(data);
    myprojecttext = md.render(data);
}); */


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
        // console.log($("div#myproject").text());
        console.log(myprojecttext);
        $("div#myproject").html(myprojecttext);
        // $("div#myproject").html("<h1>This is a test</h1>");
        $("div#contact").css("display", "none");
        $("div#myproject").css("display", "none");

        $("nav#bio").load("svg/bio.svg", function() {
            $(this).children("svg").attr("id", "bio");
            $(this).children("svg").children("g").children("text").text("Bio");
            $(this).children("svg").on("click", function() {
                console.log($("svg#bio").attr("id"));
                console.log($("div#biolab").attr("id"));
    
                $("div").animate({
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
                $("div").animate({
                    right: "1000px",
                }).css("display", "none");

                $("div#contact").css("display", "block").animate({
                    right: "0px",
                })
            })
        });

        $("nav#myproject").load("svg/bio.svg", function() {
            $(this).children("svg").attr("id", "myproject");
            $(this).children("svg").children("g").children("text").text("myproject");

            $(this).children("svg").on("click", function() {
                $("div").animate({
                    right: "1000px",
                }).css("display", "none");

                $("div#myproject").css("display", "block").animate({
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
