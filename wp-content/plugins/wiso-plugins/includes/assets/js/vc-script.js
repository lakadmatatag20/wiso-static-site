
(function($) {

    // VC Wiso - theme predefined vc templates js
    vc.TemplateWindowUIPanelBackendEditor = vc.TemplatesPanelViewBackend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
        panelName: "template_window",
        showMessageDisabled: !1,
        initialize: function() {
            vc.TemplateWindowUIPanelBackendEditor.__super__.initialize.call(this), this.trigger("show", this.initTemplatesTabs, this)
        },
        show: function() {
            var t = $(this).attr("data-sort");
            this.clearSearch(), vc.TemplateWindowUIPanelBackendEditor.__super__.show.call(this), $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates ul > li').each(function() {
                "all" == $(this).attr("data-sort") ? $(this).find(".count").html($('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template').length) : $(this).find(".count").html($('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template.general.' + t).length)
           }), $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates li[data-sort="all"]').addClass("active").trigger("click"), $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates li').click(function() {
                $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates li').removeClass("active"), $(this).addClass("active");
                var t = $(this).attr("data-sort");
                $('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template').removeClass("hidden"), "all" != t && $('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template:not(.' + t + ")").addClass("hidden")
            }),
                $('.vc_ui-template', $(this.el) ).removeClass('is-loading').find('.vc-composer-icon').removeClass('vc-c-icon-sync').addClass('vc-c-icon-add');
            $('.vc_ui-control-button i', $(this.el) ).removeClass('rotating');
            $(this.el).on('click', '.vc_ui-template [data-template-handler]' ,function() {

                $(this).closest('.vc_ui-template').addClass('is-loading')
                if ( $(this).is('.vc_ui-control-button') ) {
                    $(this).find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
                } else {
                    $(this).next('.vc_ui-list-bar-item-actions').find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
                }

            })
        },
        initTemplatesTabs: function() {

            this.$el.find('[data-vc-ui-element="panel-tabs-controls"]').vcTabsLine("moveTabs")

        },
        showMessage: function(text, type) {

            var wrapperCssClasses;
            if (this.showMessageDisabled) return !1;
            wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $messageBox, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (type) {
                case "error":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "danger",
                        icon: "times",
                        text: text
                    }));
                    break;
                case "warning":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: text
                    }));
                    break;
                case "success":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "success",
                        icon: "check",
                        text: text
                    }))
            }
            $messageBox.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                $messageBox.remove()
            }, 6e3)
        },
        changeTab: function(e) {
            e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
            var $tab = $(e.currentTarget);
            $tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
        },
        setPreviewFrameHeight: function(templateID, height) {
            parseInt(height) < 100 && (height = 100), $('data-vc-template-preview-frame="' + templateID + '"').height(height)
        }
    }), vc.TemplateWindowUIPanelBackendEditor.prototype.events = $.extend(!0, vc.TemplateWindowUIPanelBackendEditor.prototype.events, {
        'click [data-vc-ui-element="button-save"]': "save",
        'click [data-vc-ui-element="button-close"]': "hide",
        'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
        "keyup [data-vc-templates-name-filter]": "searchTemplate",
        "search [data-vc-templates-name-filter]": "searchTemplate",
        "click .vc_template-save-btn": "saveTemplate",
        "click [data-template_id] [data-template-handler]": "loadTemplate",
        'click [data-vc-container=".vc_ui-list-bar"][data-vc-preview-handler]': "buildTemplatePreview",
        'click [data-vc-ui-delete="template-title"]': "removeTemplate",
        'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
    }), vc.TemplateWindowUIPanelFrontendEditor = vc.TemplatesPanelViewFrontend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
        panelName: "template_window",
        showMessageDisabled: !1,
        show: function() {
            this.clearSearch(), vc.TemplateWindowUIPanelFrontendEditor.__super__.show.call(this), $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates ul > li').each(function() {
                var t = $(this).attr("data-sort");

                "all" == $(this).attr("data-sort") ? $(this).find(".count").html($('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template').length) : $(this).find(".count").html($('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template.general.' + t).length)
            }), $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates li[data-sort="all"]').addClass("active").trigger("click"), $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates li').click(function() {
                $('.vc_edit-form-tab[data-tab="wiso_templates"] .sortable_templates li').removeClass("active"), $(this).addClass("active");
                var t = $(this).attr("data-sort");
                $('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template').removeClass("hidden"), "all" != t && $('.vc_edit-form-tab[data-tab="wiso_templates"] .vc_ui-template-list > .vc_ui-template:not(.' + t + ")").addClass("hidden")
            }),
                $('.vc_ui-template', $(this.el) ).removeClass('is-loading').find('.vc-composer-icon').removeClass('vc-c-icon-sync').addClass('vc-c-icon-add');
            $('.vc_ui-control-button i', $(this.el) ).removeClass('rotating');
            $(this.el).on('click', '.vc_ui-template [data-template-handler]' ,function() {

                $(this).closest('.vc_ui-template').addClass('is-loading')
                if ( $(this).is('.vc_ui-control-button') ) {
                    $(this).find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
                } else {
                    $(this).next('.vc_ui-list-bar-item-actions').find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
                }

            })
        },
        showMessage: function(text, type) {
            if (this.showMessageDisabled) return !1;
            this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $messageBox, wrapperCssClasses, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", type) {
                case "error":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "danger",
                        icon: "times",
                        text: text
                    }));
                    break;
                case "warning":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: text
                    }));
                    break;
                case "success":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "success",
                        icon: "check",
                        text: text
                    }))
            }
            $messageBox.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
                $messageBox.remove()
            }, 6e3)
        },
        changeTab: function(e) {
            e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
            var $tab = $(e.currentTarget);
            $tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
        }
    })

})(jQuery);
