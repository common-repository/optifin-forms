document.addEventListener("DOMContentLoaded", function() {

    const nebenkostenrechner = document.querySelector('#nebenkostenrechner');


    if (nebenkostenrechner) {
        //parse passed atts from php
        var shortcodeAtts;
        if (typeof shortcode_atts_nebenkostenrechner === "undefined") {
            shortcodeAtts = null;
        } else {
            shortcodeAtts = shortcode_atts_nebenkostenrechner;
        }
        var currentScript;
        document.querySelectorAll('script').forEach(function(s){
            if(s.src.includes('nebenkostenrechner.js')){
                currentScript = s;
            }
        });


        const hideSideCosts = (shortcodeAtts ? shortcodeAtts.hide_side_costs : false) || currentScript.getAttribute('hide_side_costs');
        const includeInquiryForm = (shortcodeAtts ? shortcodeAtts.include_inquiry_form : false) || currentScript.getAttribute('include_inquiry_form');
        const showBackground = (shortcodeAtts ? shortcodeAtts.show_background : false) || currentScript.getAttribute('show_background');
        const color1 = (shortcodeAtts ? shortcodeAtts.color1 : false) || currentScript.getAttribute('color1');
        const color2 = (shortcodeAtts ? shortcodeAtts.color2 : false) || currentScript.getAttribute('color2');
        const color3 = (shortcodeAtts ? shortcodeAtts.color3 : false) || currentScript.getAttribute('color3');
        const color4 = (shortcodeAtts ? shortcodeAtts.color4 : false) || currentScript.getAttribute('color4');

        const style = document.createElement('style');
        document.body.appendChild(style);
        const stylesheet = style.sheet;
        const layout =
            '    <div class="opt-header">' +
            '        <div class="opt-header__background"></div>' +
            '        <div class="opt-header__text">NEBENKOSTENRECHNER</div>' +
            '    </div>' +
            '    <div class="opt-body">' +
            '        <div class="opt-body__background"></div>' +
            '        <div class="opt-body__sliders">' +
            '            <div class="opt-body__slider-wrapper">' +
            '                <div class="opt-body__slider-text-above-wrapper">' +
            '                    <div class="opt-body__slider-text-above">Kaufpreis</div>' +
            '                    <div class="opt-body__input-wrapper"><input id="KPInput" class="opt-body__input">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <input id="KPSlider" type="range">' +
            '                <div class="opt-body__slider-text-below-wrapper">' +
            '                    <div class="opt-body__slider-text-below">0</div>' +
            '                    <div class="opt-body__slider-text-below">1.000.000</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-wrapper">' +
            '                <div class="opt-body__slider-text-above-wrapper">' +
            '                    <div class="opt-body__slider-text-above">Provision <br>Immobilienmakler</div>' +
            '                    <div class="opt-body__input-wrapper"><input id="PIInput" class="opt-body__input">' +
            '                        <div class="opt-body__input-label">%</div>' +
            '                    </div>' +
            '                </div>' +
            '                <input id="PISlider" type="range">' +
            '                <div class="opt-body__slider-text-below-wrapper">' +
            '                    <div class="opt-body__slider-text-below">0</div>' +
            '                    <div class="opt-body__slider-text-below">3</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-wrapper">' +
            '                <div class="opt-body__slider-text-above-wrapper">' +
            '                    <div class="opt-body__slider-text-above">Kaufvertragsgebühren</div>' +
            '                    <div class="opt-body__input-wrapper"><input id="KGInput" class="opt-body__input">' +
            '                        <div class="opt-body__input-label">%</div>' +
            '                    </div>' +
            '                </div>' +
            '                <input id="KGSlider" type="range">' +
            '                <div class="opt-body__slider-text-below-wrapper">' +
            '                    <div class="opt-body__slider-text-below">0</div>' +
            '                    <div class="opt-body__slider-text-below">3</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__info">' +
            '            <div class="opt-body__info-section">' +
            '                <div class="opt-body__row-wrapper">' +
            '                    <div class="opt-body__text">Grund&shy;erwerb&shy;steuer</div>' +
            '                    <div class="opt-body__number-label-wrapper">' +
            '                        <div class="opt-body__number">– 57.773</div>' +
            '                        <div class="opt-body__label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__row-wrapper">' +
            '                    <div class="opt-body__text">Grundbuch&shy;eintragungs&shy;gebühr</div>' +
            '                    <div class="opt-body__number-label-wrapper">' +
            '                        <div class="opt-body__number">– 57.773</div>' +
            '                        <div class="opt-body__label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__row-wrapper">' +
            '                    <div class="opt-body__text">Provision Immobilienmakler</div>' +
            '                    <div class="opt-body__number-label-wrapper">' +
            '                        <div class="opt-body__number">– 57.773</div>' +
            '                        <div class="opt-body__label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__row-wrapper">' +
            '                    <div class="opt-body__text">Kaufvertrags&shy;gebühren&shy;kosten</div>' +
            '                    <div class="opt-body__number-label-wrapper">' +
            '                        <div class="opt-body__number">– 57.773</div>' +
            '                        <div class="opt-body__label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__row-wrapper">' +
            '                    <div class="opt-body__text">Finanzierungs&shy;nebenkosten</div>' +
            '                    <div class="opt-body__number-label-wrapper">' +
            '                        <div class="opt-body__number">– 57.773</div>' +
            '                        <div class="opt-body__label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__info-section">' +
            '                <div class="opt-body__row-wrapper">' +
            '                    <div class="opt-body__text">Summe</div>' +
            '                    <div class="opt-body__number-label-wrapper">' +
            '                        <div class="opt-body__number">– 57.773</div>' +
            '                        <div class="opt-body__label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '    <div class="opt-inquiry-button-wrapper">' +
            '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' +
            '    </div>'

        nebenkostenrechner.innerHTML = layout;

        if(!showBackground){
            document.querySelector('#nebenkostenrechner .opt-body__background').remove();
        }

        (function applyCustomColors () {
            if(color1) {
                document.querySelector('#nebenkostenrechner .opt-header .opt-header__background').style = 'background: ' + color1;
                document.querySelectorAll('#nebenkostenrechner .opt-body__info .opt-body__info-section')[1].style = 'background: ' + color1;
                document.querySelectorAll('#nebenkostenrechner .opt-body__info-section:first-child .opt-body__text, #nebenkostenrechner .opt-body__info-section:first-child .opt-body__number, #nebenkostenrechner .opt-body__info-section:first-child .opt-body__label').forEach(function (q){
                    q.style.color = color1;
                });
                //These try/catches are necessary because some browsers don't allow to insert css rules for other browsers ...
                //FF
                try {
                    stylesheet.insertRule('#nebenkostenrechner input[type="range"]::-moz-range-progress{background-color: ' + color1 + ';}');
                    stylesheet.insertRule('#nebenkostenrechner input[type="range"]::-moz-range-thumb{background-color: ' + color1 + ';}');
                }catch (e){}
                //Webkit
                try {
                    stylesheet.insertRule('#nebenkostenrechner input[type="range"]::-webkit-slider-thumb{background-color: ' + color1 + ';}');
                }catch(e){}
            }
            if(color2) {
                if(showBackground) {
                    document.querySelector('#nebenkostenrechner .opt-body .opt-body__background').style = 'background: ' + color2;
                }
                document.querySelectorAll('#nebenkostenrechner .opt-body__info .opt-body__info-section')[0].style = 'background: ' + color2;
            }
            if(color3) {
                document.querySelector('#nebenkostenrechner .opt-inquiry-button-wrapper .opt-inquiry-button').style = 'background: ' + color3;
            }
            if(color4) {
                document.querySelector('#nebenkostenrechner .opt-inquiry-button-wrapper').style = 'background: ' + color4;
            }
        })();

        if (hideSideCosts) {
            document.querySelector('#nebenkostenrechner .opt-body__info-section .opt-body__row-wrapper:last-child').remove();
        }


        // Kaufpreis
        const KPDefault = 200000;
        const KPSlider = document.querySelector('#nebenkostenrechner #KPSlider')
        const KPInput = document.querySelector('#nebenkostenrechner #KPInput')
        KPSlider.min = 0;
        KPSlider.max = 1000000;
        KPSlider.step = 1000;
        setupEventListenerNumber(KPSlider, KPInput);
        KPInput.value = numberFormatter(KPDefault);
        KPSlider.value = KPDefault;
        fillSlider(KPSlider);
        // end Kaufpreis

        // Provision Immobilienmakler
        const PIDefault = 2;
        const PISlider = document.querySelector('#nebenkostenrechner #PISlider')
        const PIInput = document.querySelector('#nebenkostenrechner #PIInput')
        PISlider.min = 0;
        PISlider.max = 3;
        PISlider.step = 0.125;
        setupEventListenerPercentage(PISlider, PIInput);
        PIInput.value = numberFormatter(PIDefault);
        PISlider.value = PIDefault;
        fillSlider(PISlider);
        // end Provision Immobilienmakler

        // Kaufvertragsgebühren
        const KGDefault = 2;
        const KGSlider = document.querySelector('#nebenkostenrechner #KGSlider')
        const KGInput = document.querySelector('#nebenkostenrechner #KGInput')
        KGSlider.min = 0;
        KGSlider.max = 3;
        KGSlider.step = 0.125;
        setupEventListenerPercentage(KGSlider, KGInput);
        KGInput.value = numberFormatter(KGDefault);
        KGSlider.value = KGDefault;
        fillSlider(KGSlider);

        // end Kaufvertragsgebühren

        function calcResult() {
            const landAcquisitionFee = KPSlider.value * 0.035;
            const landRegisterFee = KPSlider.value * 0.011;
            const brokerFee = KPSlider.value * PISlider.value * 1.2 / 100;
            const contractFee = KPSlider.value * KGSlider.value / 100;
            const sideCosts = KPSlider.value * 0.044;
            const sum = landAcquisitionFee + landRegisterFee + brokerFee + contractFee + (hideSideCosts ? 0 : sideCosts);
            const infoSections = document.querySelectorAll('#nebenkostenrechner .opt-body__info-section .opt-body__number');
            infoSections[0].innerText = numberFormatter(landAcquisitionFee);
            infoSections[1].innerText = numberFormatter(landRegisterFee);
            infoSections[2].innerText = numberFormatter(brokerFee);
            infoSections[3].innerText = numberFormatter(contractFee);
            if (!hideSideCosts) {
                infoSections[4].innerText = numberFormatter(sideCosts);
            }
            infoSections[hideSideCosts ? 4 : 5].innerText = numberFormatter(sum);
        }

        calcResult();

        const inquiryButton = document.querySelector('#nebenkostenrechner .opt-inquiry-button-wrapper .opt-inquiry-button');
        inquiryButton.addEventListener('click', function () {
            const finsum = KPSlider.value;
            if(!includeInquiryForm) {
            const opti_pid = (shortcodeAtts ? shortcodeAtts.opti_pid : false) || currentScript.getAttribute('opti_pid')
            const opti_purl = (shortcodeAtts ? shortcodeAtts.opti_purl : false) || currentScript.getAttribute('opti_purl')
            const utm_medium = (shortcodeAtts ? shortcodeAtts.utm_medium : false) || currentScript.getAttribute('utm_medium')
            const utm_campaign = (shortcodeAtts ? shortcodeAtts.utm_campaign : false) || currentScript.getAttribute('utm_campaign')

            var url = 'https://optifin.at/finanzierungsanfrage';
            url += '?opti_pid=' + opti_pid;
            url += '&opti_purl=' + opti_purl;
            url += '&utm_medium=' + utm_medium;
            url += '&utm_campaign=' + utm_campaign;
            url += '&finsum=' + finsum;

            var win = window.open(url, '_blank');
            win.focus();
            } else {
                window.finsum = finsum;
                const wrapper = document.querySelector('#nebenkostenrechner .opt-inquiry-button-wrapper')
                wrapper.style.background = 'transparent';
                wrapper.id = 'lf1'
                document.querySelector('#nebenkostenrechner .opt-inquiry-button-wrapper .opt-inquiry-button').remove()
                const inquiryForm = document.createElement('script');
                var src = currentScript.src.split('/');
                src.pop();
                src.push('inquiry.js');
                src = src.join('/');
                inquiryForm.src = src;
                document.body.appendChild(inquiryForm);
            }
        });

        function setupEventListenerNumber(slider, input) {
            slider.addEventListener('input', function (e) {
                input.value = numberFormatter(e.target.value);
                calcResult();
                fillSlider(e.target);
            })

            input.addEventListener('focus', function (e) {
                input.value = parseInt(input.value.toString().split('.').join(''));
            })

            input.addEventListener('focusout', function (e) {
                let formatted = numberFormatter(e.target.value, slider.min, slider.max);
                input.value = formatted;
                slider.value = parseInt(formatted.split('.').join(''));
                calcResult();
            })
        }

        function setupEventListenerPercentage(slider, input) {
            slider.addEventListener('input', function (e) {
                input.value = e.target.value.split('.').join(',');
                calcResult();
                fillSlider(e.target);
            })

            input.addEventListener('focusout', function (e) {
                let value = parseFloat(e.target.value.split(',').join('.'));
                if (value > slider.max) {
                    value = slider.max;
                } else if (value < slider.min) {
                    value = slider.min;
                }
                value = (((value / slider.step).toFixed(0)) * slider.step).toString();

                var formatted = value.split('.').join(',');
                input.value = formatted;
                slider.value = value;
                calcResult();
            })
        }

        function numberFormatter(number, min = 0, max = 99999999, def = 0) {
            number = parseInt(number)
            const prefix = number >= 0 ? '' : '-'
            number = Math.abs(number)
            min = parseInt(min)
            max = parseInt(max)

            let text = number.toString()

            var formattedNumber = [];
            if (text.match(/^[0-9]+$/)) {

                if (number < min) {
                    return numberFormatter(min)
                }

                if (number > max) {
                    return numberFormatter(max)
                }


                if (text.length > 3) {
                    for (var i = text.length - 1; i >= 0; i--) {
                        formattedNumber.push(text.charAt(i))
                        if ((formattedNumber.length - parseInt((text.length - 1 - i) / 3)) % 3 === 0 && i !== 0) {
                            formattedNumber.push('.')
                        }
                    }
                    return prefix + formattedNumber.reverse().join('')
                }
                return prefix + text
            }


            return numberFormatter(def)
        }

        function getFilledPercentage(min, max, value) {

            var rawPercentage = (value - min) / (max - min)

            var filledPercentage = (rawPercentage * 100).toFixed(2)

            return filledPercentage
        }

        function fillSlider(slider) {
            const filledPercentage = getFilledPercentage(slider.min, slider.max, slider.value);
            const fillColor = color1 ? color1 : '#216197';
            var rule = null;
            for (var i = 0; i < stylesheet.rules.length; i++) {
                if (stylesheet.rules[i].selectorText && stylesheet.rules[i].selectorText.includes('#nebenkostenrechner #' + slider.id)) {
                    rule = stylesheet.rules[i];
                }
            }
            if (rule) {
                rule.style.background = 'linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%)'
            } else {
                stylesheet.insertRule('#nebenkostenrechner #' + slider.id + '::-webkit-slider-runnable-track { background: linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%); }');
            }
        }
        (function adaptMaxWidth() {
            let s = document.querySelector('link[href*=\'nebenkostenrechner.css\']');
            try {
                    s = s.sheet
                    for (var j = (s.cssRules.length - 1); j >= 0; j--) {
                        if (s.cssRules[j].conditionText && s.cssRules[j].conditionText.includes('max-width')) {
                            var maxWidth = parseInt(s.cssRules[j].conditionText.split(': ')[1].split('px')[0]);
                            if (document.body.clientWidth != nebenkostenrechner.clientWidth) {
                                maxWidth += parseInt(Math.abs((nebenkostenrechner.clientWidth - document.body.clientWidth)))
                            }

                            const index = stylesheet.insertRule(s.cssRules[j].cssText);

                            stylesheet.cssRules[index].conditionText = '(max-width: ' + maxWidth + 'px)'
                            stylesheet.cssRules[index].media[0] = '(max-width: ' + maxWidth + 'px)'
                            stylesheet.cssRules[index].media['mediaText'] = '(max-width: ' + maxWidth + 'px)'
                        }
                    }
            } catch(e) {
                setTimeout(function () {
                    adaptMaxWidth()
                }, 200)
            }
        })();
    }
});



