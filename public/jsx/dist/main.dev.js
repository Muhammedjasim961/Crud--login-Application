"use strict";

$(document).ready(function () {
  $('.delete-student').on('click', function (e) {
    var $target = $(e.target); // Fixed the typo here

    var id = $target.attr('data-id');
    $.ajax({
      url: '/student/' + id,
      type: 'DELETE',
      success: function success(response) {
        alert('Student deleted successfully');
        window.location.href = '/'; // Fixed this line
      },
      error: function error(err) {
        console.log('Error deleting student:', err);
      }
    });
  });
});