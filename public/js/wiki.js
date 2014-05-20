/*global jQuery:true, marked:true */
!function ($, marked) {
    'use strict';

    var $editor = $('#editor'),
        $article = $('#article'),
        $content = $('#content'),
        $error = $('#notify-error'),
        $edit = $('#edit'),
        $save = $('#save');

    $edit.click(function () {
        if ($editor.is(':visible')) {
            $editor.hide();
            $edit.removeClass('active');
            $article.show();
        }
        else {
            $article.hide();
            $edit.addClass('active');
            $editor.show();
            $content.focus();
        }
    });

    $save.click(function () {
        $error.hide();

        var content = $content.val();
        $.post(window.location.href, {
            content: content
        }).done(function () {
            parseMarkdown(content);
            $edit.click();
        }).fail(function () {
            $error.show();
        });
    });

    function parseMarkdown(markdown) {
        var html = marked(markdown);
        $article.html(html);
    }
    parseMarkdown($content.val());
}(jQuery, marked);
