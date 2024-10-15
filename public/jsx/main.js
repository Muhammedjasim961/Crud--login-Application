$(document).ready(() => {
  $('.delete-student').on('click', (e) => {
    const $target = $(e.target); // Fixed the typo here
    const id = $target.attr('data-id');

    $.ajax({
      url: '/student/' + id,
      type: 'DELETE',
      success: (response) => {
        alert('Student deleted successfully');
        window.location.href = '/'; // Fixed this line
      },
      error: (err) => {
        console.log('Error deleting student:', err);
      },
    });
  });
});
