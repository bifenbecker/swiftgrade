var $ = window.jQuery;

var initFixedFooter = function($changelist) {
    var $toolbar = $('#toolbar');
    var $content = $('#content');
    var $breadcrumbs = $('.breadcrumbs');
    var $footer = $changelist.find('.changelist-footer');
    
    var $results = $footer.siblings('.results');

    if ($footer.length == 0 || $results.length == 0) {
        return;
    }

    $(window).off('scroll');
    $(window).off('resize');

    var headerHeight = 0;
    if ($('.sidebar-header-wrapper').css('display') == 'block') {
        headerHeight = $('.sidebar-header-wrapper').height();
    }

    var toolbarHeight = $toolbar.height() + parseInt($toolbar.css('margin-bottom'));
    var breadcrumbsHeight = $breadcrumbs.height() + parseInt($breadcrumbs.css('padding-top')) +
        parseInt($breadcrumbs.css('padding-bottom'));
    var contentHeight = parseInt($content.css('padding-top')) + parseInt($content.css('padding-bottom'));
    var footerHeight = $footer.height() + parseInt($footer.css('padding-top')) +
        parseInt($footer.css('padding-bottom'));

    var resultsHeader = $(window).height() - headerHeight - toolbarHeight - breadcrumbsHeight - contentHeight
        - footerHeight;
    $($results).height(resultsHeader);
};

$(document).ready(function () {
    $('#changelist').each(function () {
        initFixedFooter($(this));
    });
});