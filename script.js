// Code goes here

var userData;

var fetchReviews = function() {
	$.getJSON('people.json', function(data) {

		userData = data;
		// console.log('userData', userData);

		var userList = data.People.map(function(user, index) {
		 $('#users').append('<li id=' + "'" + index + "'" + 'class="list-group-item user-list">' + user.name + '<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span></li>');
		});

		$('#users').children(':first-child').addClass('selected');

        getLikes(data, 0);

        userContent(data,0);


	});
};


var userContent = function(data, index) {
	$('.user-content').children('div').remove();
	var content = '<div class="content-wrapper"><img class="user-image" src="' + data.People[index].img + '" />' +
                  '<div class="btn-rating"><button id="send-btn" class="btn btn-default">SEND MESSAGE!</button> ' + 
                  heartRating(data.People[index].rating) + '</div></div><div class="user-description">' +
                   data.People[index].Description +
                   '</div>';

    $('.user-content').append(content);
}


var getLikes = function(data, index) {
	$('#likes-body').children('tr').remove();
	var likes = data.People[index].Likes;
    var disLikes = data.People[index].Dislikes;
        for (var i = 0; i < Math.max(likes.length, disLikes.length) ; i++) {
            $('#likes-body').append("<tr>" +
                           "<td>" + (likes[i] != undefined ? likes[i] : '') + "</td>" +
                           "<td>" + (disLikes[i] != undefined ? disLikes[i] : '') + "</td>" +
                     "</tr>");
        }
}

// render hearts
var heartRating = function (rating) {
        var heart = '<div class="heartHolder">';
        for (var i = 1; i <= 5; i++) {
            heart += "<div class='heart " + (i <= rating ? 'active' : '') + "'></div>";
        }
        heart += '</div>';

        return heart;
    }

$(document).ready(function() {

	// get initial data
	fetchReviews();

	//select user, update content
	$('.list-group').on('click', '.list-group-item', function(){
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
		console.log($(this).attr('id'));
		var userId = $(this).attr('id');
		console.log('click', this);
		$('#likes-list').html().replace(getLikes(userData, userId));

		$('.user-content').html().replace(userContent(userData, userId));

	});

	//send message
	$('#section-2').on('click', '#send-btn', function(e) {
		e.preventDefault();
		console.log('this hit');
		$('.message-form').css('display', 'block');

	});
	$('#section-2').on('click', '#send-close', function(e) {
		e.preventDefault();
		console.log('this hit');
		$('.message-form').css('display', 'none');

	});



});