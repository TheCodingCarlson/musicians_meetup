$(document).ready(function() {
	$('.delete').on('click', function(e) {
		e.preventDefault();
		var id = $(this).data('id');

		$.ajax({
			url: '/user_profile/'+id,
			method: 'DELETE'
		}).done(function() {
			window.location = '/';
		});
	});
});