$(document).ready(function() {

    var WEEKDAYS = [
        'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
    ];
    
    var timefieldCounter = 0;
    
    function addNewIntervalControls($parent, interval)
    {        
        var $container = $(document.createElement('div'))
            .addClass('ht-interval');
        
        var $fromLabel = $(document.createElement('span'))
            .addClass('help-inline')
            .text('von');
            
        var $fromCtrl = $(document.createElement('input'))
            .attr('type', 'text')
            .attr('name', 'from-' + timefieldCounter++)
            .attr('time', 'true')
            .addClass('ht-time required')
            .val(interval.start);
            
        var $toLabel = $(document.createElement('span'))
            .addClass('help-inline')
            .text('bis');
            
        var $toCtrl = $(document.createElement('input'))
            .attr('type', 'text')
            .attr('name', 'to-' + timefieldCounter++)
            .attr('time', 'true')
            .addClass('ht-time required')
            .val(interval.stop);
        
        var $remBtn = $(document.createElement('a'))
                .addClass('ht-interval-btn btn btn-danger')
                .text('-')
                .click(function() {
                    $container.remove();
                });
                
        $container
            .append($fromLabel)
            .append($fromCtrl)
            .append($toLabel)
            .append($toCtrl)
            .append($remBtn);
        
        $parent.append($container);
    }
    
    function handleWeekly(data)
    {
        var $weeklyCtrls = $('#ht-weekly');
        
        for (var i=1; i <= 7; i++) {
            var dayIdx = i % 7;
            var daily = data[dayIdx];
            
            var $label = $(document.createElement('label'))
                .addClass('control-label')
                .text(WEEKDAYS[dayIdx]);
                
            var $fromToCtrls = $(document.createElement('div'))
                .addClass('controls');
                
            var $addBtn = $(document.createElement('a'))
                .addClass('ht-interval-btn btn btn-primary')
                .text('+')
                .click(function() {
                    var $fromToCtrls = $(this).closest('.control-group').find('.controls:first');
                    addNewIntervalControls($fromToCtrls, { start: "09:00", stop: "18:00" });
                });
            $label.append($addBtn);
            
            for (var timeIdx in daily) {
                var interval = daily[timeIdx];
                
                addNewIntervalControls($fromToCtrls, interval);
            }
            
            var $ctrlGroup = $(document.createElement('div')).addClass('control-group')
                .append($label)
                .append($fromToCtrls);
            $weeklyCtrls.append($ctrlGroup);
        }
    }
    
    function addSpecial($specialCtrls, special)
    {
        var $label = $(document.createElement('div'))
            .addClass('control-label');
            
        var $fromDate = $(document.createElement('input'))
            .attr('type', 'text')
            .addClass('ht-date ht-date-from required')
            .attr('name', 'from' + timefieldCounter++)
            .val(special.from);
            
        var $toDate = $(document.createElement('input'))
            .attr('type', 'text')
            .addClass('ht-date required')
            .attr('name', 'to' + timefieldCounter++)
            .val(special.to);
            
        var $addBtn = $(document.createElement('a'))
            .addClass('ht-interval-btn btn btn-primary')
            .text('+')
            .click(function() {
                var $fromToCtrls = $(this).closest('.control-group').find('.controls:first');
                addNewIntervalControls($fromToCtrls, { start: "09:00", stop: "18:00" });
            });
            
        $label.append($fromDate)
            .append('-')
            .append($toDate)
            .append($addBtn);
        
        var $fromToCtrls = $(document.createElement('div'))
            .addClass('controls');
            
        for (var timeIdx in special.intervals) {
            var interval = special.intervals[timeIdx];
            
            addNewIntervalControls($fromToCtrls, interval);
        }
        
        var $ctrlGroup = $(document.createElement('div')).addClass('control-group')
            .append($label)
            .append($fromToCtrls);
            
        $specialCtrls.append($ctrlGroup);
    }
    
    function handleSpecial(data)
    {
        var $specialCtrls = $('#ht-special');
        
        for (var i in data) {
            var special = data[i];
            
            addSpecial($specialCtrls, special);
        }
    }
    
    function padLeft(number, len, ch)
    {
        var str = '' + number;
        while (str.length < len) {
            str = ch + str;
        }   
        return str;
    }
    
    function normalizeTime(time)
    {
        var colonIdx = time.indexOf(":"),
            hour = '',
            minute = '';
        
        if (colonIdx < 0) {
            hour = time;
            minute = '00';
        }
        else {
            var segments = time.split(':');
            hour = segments[0];
            minute = segments[1];
        }
        
        return padLeft(hour, 2, '0') + ':' + padLeft(minute, 2, '0');
    }
    
    function parseTime(value)
    {
        var segments = value.split(':');
        if (segments.length == 2) {
            segments.push('0');
        }
        else if (segments.length != 3) {
            return false;
        }
        
        for (var i=0; i < 3; i++) {
            if (segments[i].length < 1) {
                return false;
            }
        }
        
        var hour = Number(segments[0]);
        var minute = Number(segments[1]);
        var second = Number(segments[2]);
            
        if (isNaN(hour) || hour >= 24 || hour < 0) {
            return false;
        }
        if (isNaN(minute) || minute >= 60 || minute < 0) {
            return false;
        }
        if (isNaN(second) || second >= 60 || second < 0) {
            return false;
        }
        
        return new Date(0, 0, 0, hour, minute, second);
    }

    function isTime(value)
    {
        var parsed = parseTime(value);
        return (typeof parsed != 'boolean');
    }

    $.get('api.lua', 
        { cmd: 'getConfig' },
        function(data) {
            if (!data.success) {
                alert('Fehler: ' + data.result);
            }
            else {
                handleWeekly(data.response.weekly);
                handleSpecial(data.response.special);
                
                jQuery.validator.addMethod("time", function(value, element, param) {
    	            return this.optional(element) || isTime(value);
    	        }, "Invalid");
                
                $('#ht-weekly-form').show()
                    .validate({
                        errorClass: 'error',
                        validClass:'success',
                        highlight: function (element, errorClass, validClass) { 
                            $(element)
                                    .addClass(errorClass)
                                    .removeClass(validClass);
    	                }, 
    	                unhighlight: function (element, errorClass, validClass) { 
    	                    $(element).removeClass(errorClass); 
    	                },
    	                errorPlacement: function(error, element) {}
                    });
            }
        }
    );
    $('#ht-weekly-form').hide();
    
    $('#ht-add-special').click(function() {
        var now = new Date();
        now.setTime(now.getTime() + 1000 * 60 * 60 * 24);
        var date = '';
        date += padLeft(now.getDate(), 2, '0');
        date += "." + padLeft(now.getMonth() + 1, 2, '0');
        date += "." + padLeft(now.getFullYear(), 2,  '0');
        addSpecial($('#ht-special'), { from: date, to: date});
        return false;
    });
    
    $('#ht-btn-save-weekly').click(function() {
        var $btn = $(this);
        var $form = $btn.closest('form');
        
        if (!$form.valid()) {
            return;
        }
        
        var config = { weekly: [] };
        
        $btn.text('Bitte warten...')
            .attr('disabled', 'disabled');
        
        $form
            .find('#ht-weekly:first .control-group')
            .each(function(i, el) {
                var dayIdx = (i + 1) % 7;
                
                config.weekly[dayIdx] = [];
                $(this).find('.ht-interval').each(function(j, intervalEl) {
                    var interval = {};
                    $(this).find('.ht-time').each(function(k, timeEl) {
                        if (k == 0) {
                            interval.start = normalizeTime($(this).val());
                        }
                        else {
                            interval.stop = normalizeTime($(this).val());
                        }
                    });
                    config.weekly[dayIdx].push(interval);
                });
            });
        
        $.post('api.lua',
            { cmd: 'setConfig', args: JSON.stringify({ config: config }) },
            function (data) {
                $btn.text('Gespeichert!');
                
                setTimeout(function() {
                    $btn.text('Speichern')
                        .removeAttr('disabled');
                }, 2000);
            }
        );
    });
});