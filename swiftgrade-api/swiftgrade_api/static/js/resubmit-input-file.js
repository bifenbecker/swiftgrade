var $ = window.jQuery;

$(document).ready(function () {
    $('.resubmit-input-file-button').on('click', function (event) {
        event.preventDefault();
        $(this).prev("input[type='file']").trigger('click');
        $(this).prev("input[type='file']").change(function () {
            $(this).siblings('.resubmit-input-file-name').text(this.value.replace(/C:\\fakepath\\/i, ''))
        })
    });
});