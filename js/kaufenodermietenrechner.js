document.addEventListener("DOMContentLoaded", function() {

    const kaufenodermietenrechner = document.querySelector('#kaufenodermietenrechner');


    if (kaufenodermietenrechner) {
        //parse passed atts from php
        var shortcodeAtts;
        if (typeof shortcode_atts_kaufenodermietenrechner === "undefined") {
            shortcodeAtts = null;
        } else {
            shortcodeAtts = shortcode_atts_kaufenodermietenrechner;
        }
        var currentScript;
        document.querySelectorAll('script').forEach(function(s){
            if(s.src.includes('kaufenodermietenrechner.js')){
                currentScript = s;
            }
        });

        const includeInquiryForm = (shortcodeAtts ? shortcodeAtts.include_inquiry_form : false) || currentScript.getAttribute('include_inquiry_form');
        const showBackground = (shortcodeAtts ? shortcodeAtts.show_background : false) || currentScript.getAttribute('show_background');
        const color1 = (shortcodeAtts ? shortcodeAtts.color1 : false) || currentScript.getAttribute('color1');
        const color2 = (shortcodeAtts ? shortcodeAtts.color2 : false) || currentScript.getAttribute('color2');
        const color3 = (shortcodeAtts ? shortcodeAtts.color3 : false) || currentScript.getAttribute('color3');
        const color4 = (shortcodeAtts ? shortcodeAtts.color4 : false) || currentScript.getAttribute('color4');
        const color5 = (shortcodeAtts ? shortcodeAtts.color5 : false) || currentScript.getAttribute('color5');
        const color6 = (shortcodeAtts ? shortcodeAtts.color6 : false) || currentScript.getAttribute('color6');

        const style = document.createElement('style');
        document.body.appendChild(style);
        const stylesheet = style.sheet;


        const layout =
            '    <div class="opt-header">' +
            '        <div class="opt-header__background"></div>' +
            '        <div class="opt-header__text">KAUFEN ODER MIETEN RECHNER</div>' +
            '    </div>' +
            '    <div class="opt-body">' +
            '        <div class="opt-body__background"></div>' +
            '        <div class="opt-body__section-one">' +
            '            <div class="opt-body__section-heading">Miete</div>' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">monatliche Kaltmiete</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="MKMInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">EUR</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="MKMSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Mietsteigerung pro Jahr</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="MSInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">%</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="MSSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">1</div>' +
            '                        <div class="opt-body__slider-text-below">10</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__section-two">' +
            '            <div class="opt-body__section-heading">Kauf</div>' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">monatliche Kreditrate</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="MKRInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">EUR</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="MKRSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Laufzeit Kredit in Jahren</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="LZInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">Jahre</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="LZSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">40</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Vergleichs&shy;zeitraum in Jahren</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="VZInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">Jahre</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="VZSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">80</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__section-three">' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">Ausgaben Kredit</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">123.456</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">Ausgaben Miete</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">– 240,72</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">Monatsmiete am Ende</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">– 240,72</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__section-four">' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">Differenz Kauf&nbsp;zu&nbsp;Miete</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">– 57.773</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '    <div class="opt-inquiry-button-wrapper">' +
            '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' +
            '    </div>' +
            '    <div class="opt-calc-example-wrapper">' +
            '        <div class="opt-calc-example-heading">Repräsentatives Rechenbeispiel</div>' +
            '        <div class="opt-calc-example-content"><b>Kreditvertrag mit einem Kreditbetrag von EUR 200.000,- besichert mit' +
            '            einer Hypothek Laufzeit 30 Jahre | Gesamtbetrag zu zahlen EUR 236.250,99</b><br><br>Gesamtkreditbetrag' +
            '            (tatsächlicher Auszahlungsbetrag) EUR 192.227,-<br>Kreditlaufzeit 30 Jahre = 360 Monate<br>Sollzinssatz' +
            '            1,125 % p.a.*)<br>Bearbeitungsspesen EUR 6.000,- **)<br>Grundbucheintragungsgebühr EUR 2.880,- ***)<br>Monatliche' +
            '            Kreditrate EUR 656,25<br>Effektiver Jahreszinssatz 1,400%<br>Gesamtbetrag zu zahlen EUR 236.250,99<br><br>*)' +
            '            Kondition: abhängig von Bonität, Volumen, Laufzeit, Verwendungszweck und Besicherung.<br>**) Einmalig 3% vom' +
            '            Kreditnominale.<br>***) Einmalige Gebühr: 1,2% vom Kreditnominale zzgl. 20% Nebengebührensicherung. Der' +
            '            Kreditvertrag ist durch ein grundbücherliches Pfandrecht zu besichern. Stand: 1. November 2017<br><br>Der' +
            '            Zinssatz für die individuellen Finanzierungsprojekte von mehr als 50% der Realfinanz Kunden läge unter' +
            '            Berücksichtigung der zu Grunde liegenden Sollzinsbindung und Annahmen aktuell bei 1,125% p.a. Sollzinssatz' +
            '            bzw. 1,400% p.a. effektiver Jahreszinssatz. Die Ermittlung des effektiven Jahreszinssatzes erfolgte mit' +
            '            folgenden Parametern: Rückzahlung in 360 monatlichen Pauschalraten; 3% Bearbeitungsgebühr bzw.' +
            '            Vermittlungsvergütung des nominalen Kreditbetrages; Grundbuchseintragungsgebühr 1,2% vom Kreditnominale' +
            '            zzgl. Nebengebührensicherstellung, Schätzgebühr EUR 399,00; Beurkundungsgebühr EUR 450,00 (gibt es' +
            '            eigentlich fast nirgendwo mehr); Legitimationsentgelt EUR 90,00; Abfrage KSV und GB Auszug je € 28,00.' +
            '            Sämtliche Werte in der Berechnung verstehen sich als unverbindliche Richtwerte und sind von Bonität,' +
            '            Volumen, Laufzeit, Verwendungszweck und Besicherung abhängig.<br></div>' +
            '    </div>';

        kaufenodermietenrechner.innerHTML = layout;

        if(!showBackground){
            document.querySelector('#kaufenodermietenrechner .opt-body__background').remove();
        }

        (function applyCustomColors () {
            if(color1) {
                document.querySelectorAll('#kaufenodermietenrechner .opt-header .opt-header__background, #kaufenodermietenrechner .opt-body .opt-body__section-four').forEach(function (q) {
                    q.style = 'background: ' + color1;
                });
                document.querySelectorAll('#kaufenodermietenrechner .opt-body .opt-body__section-heading, #kaufenodermietenrechner .opt-body__section-three .opt-body__text, #kaufenodermietenrechner .opt-body__section-three .opt-body__number, #kaufenodermietenrechner .opt-body__section-three .opt-body__label').forEach(function (q) {
                    q.style = 'color: ' + color1;
                });
                //These try/catches are necessary because some browsers don't allow to insert css rules for other browsers ...
                //FF
                try {
                    stylesheet.insertRule('#kaufenodermietenrechner input[type="range"]::-moz-range-progress{background-color: ' + color1 + ';}');
                    stylesheet.insertRule('#kaufenodermietenrechner input[type="range"]::-moz-range-thumb{background-color: ' + color1 + ';}');
                }catch (e){}
                //Webkit
                try {
                    stylesheet.insertRule('#kaufenodermietenrechner input[type="range"]::-webkit-slider-thumb{background-color: ' + color1 + ';}');
                }catch(e){}
            }
            if(color2 && showBackground) {
                document.querySelector('#kaufenodermietenrechner .opt-body .opt-body__background').style = 'background: ' + color2;
            }
            if(color3) {
                document.querySelector('#kaufenodermietenrechner .opt-inquiry-button-wrapper .opt-inquiry-button').style = 'background: ' + color3;
            }
            if(color4) {
                document.querySelector('#kaufenodermietenrechner .opt-inquiry-button-wrapper').style = 'background: ' + color4;
            }
            if(color5) {
                document.querySelector('#kaufenodermietenrechner .opt-body .opt-body__section-one').style = 'background: ' + color5;
            }
            if(color6) {
                document.querySelector('#kaufenodermietenrechner .opt-body .opt-body__section-three').style = 'background: ' + color6;
            }
        })();

        // monatliche Kaltmiete
        const MKMDefault = 800;
        const MKMSlider = document.querySelector('#kaufenodermietenrechner #MKMSlider')
        const MKMInput = document.querySelector('#kaufenodermietenrechner #MKMInput')
        MKMSlider.min = 0;
        MKMSlider.max = 5000;
        MKMSlider.step = 10;
        setupEventListenerNumber(MKMSlider, MKMInput);
        MKMInput.value = numberFormatter(MKMDefault);
        MKMSlider.value = MKMDefault;
        fillSlider(MKMSlider);
        // end monatliche Kaltmiete

        // Mietsteigerung pro Jahr
        const MSDefault = 2;
        const MSSlider = document.querySelector('#kaufenodermietenrechner #MSSlider')
        const MSInput = document.querySelector('#kaufenodermietenrechner #MSInput')
        MSSlider.min = 1;
        MSSlider.max = 10;
        MSSlider.step = 0.125;
        setupEventListenerPercentage(MSSlider, MSInput);
        MSInput.value = numberFormatter(MSDefault);
        MSSlider.value = MSDefault;
        fillSlider(MSSlider);
        // end Mietsteigerung pro Jahr

        // monatliche Kreditrate
        const MKRDefault = 500;
        const MKRSlider = document.querySelector('#kaufenodermietenrechner #MKRSlider')
        const MKRInput = document.querySelector('#kaufenodermietenrechner #MKRInput')
        MKRSlider.min = 0;
        MKRSlider.max = 5000;
        MKRSlider.step = 10;
        setupEventListenerNumber(MKRSlider, MKRInput);
        MKRInput.value = numberFormatter(MKRDefault);
        MKRSlider.value = MKRDefault;
        fillSlider(MKRSlider);
        // end monatliche Kreditrate

        // Laufzeit Kredit
        const LZDefault = 30;
        const LZSlider = document.querySelector('#kaufenodermietenrechner #LZSlider')
        const LZInput = document.querySelector('#kaufenodermietenrechner #LZInput')
        LZSlider.min = 0;
        LZSlider.max = 40;
        LZSlider.step = 1;
        setupEventListenerNumber(LZSlider, LZInput);
        LZInput.value = numberFormatter(LZDefault);
        LZSlider.value = LZDefault;
        fillSlider(LZSlider);

        // end Laufzeit Kredit

        // Vergleichszeitraum
        const VZDefault = 50;
        const VZSlider = document.querySelector('#kaufenodermietenrechner #VZSlider')
        const VZInput = document.querySelector('#kaufenodermietenrechner #VZInput')
        VZSlider.min = 0;
        VZSlider.max = 80;
        VZSlider.step = 1;
        setupEventListenerNumber(VZSlider, VZInput);
        VZInput.value = numberFormatter(VZDefault);
        VZSlider.value = VZDefault;
        fillSlider(VZSlider);
        // end Vergleichszeitraum


        (function initCalcExample() {
            const calcExampleHeading = document.querySelector('#kaufenodermietenrechner .opt-calc-example-heading')
            const calcExampleWrapper = document.querySelector('#kaufenodermietenrechner .opt-calc-example-wrapper')
            calcExampleHeading.addEventListener('click', function () {
                if (calcExampleWrapper.className.includes('--show')) {
                    calcExampleWrapper.className = 'opt-calc-example-wrapper'
                } else {
                    calcExampleWrapper.className = 'opt-calc-example-wrapper opt-calc-example-wrapper--show'
                }
            })
        })();

        var credit;
        function calcResult() {
            credit = MKRSlider.value * LZSlider.value * 12;
            const rent = MKMSlider.value * VZSlider.value * 12;
            const rentEndOfTime = MKMSlider.value * (Math.pow((1 + MSSlider.value / 100 / 10), (VZSlider.value * 10)));
            const diff = credit - rent;

            const resultTexts = document.querySelectorAll('#kaufenodermietenrechner .opt-body__number-label-wrapper .opt-body__number');
            resultTexts[0].innerText = numberFormatter(credit);
            resultTexts[1].innerText = numberFormatter(rent);
            resultTexts[2].innerText = numberFormatter(rentEndOfTime) + ',' + rentEndOfTime.toFixed(2).split('.')[1];
            resultTexts[3].innerText = numberFormatter(diff);
        }

        calcResult();


        const inquiryButton = document.querySelector('#kaufenodermietenrechner .opt-inquiry-button-wrapper .opt-inquiry-button');
        inquiryButton.addEventListener('click', function () {
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
            url += '&finsum=' + credit;

            var win = window.open(url, '_blank');
            win.focus();
            } else {
                window.finsum = credit;
                const wrapper = document.querySelector('#kaufenodermietenrechner .opt-inquiry-button-wrapper')
                wrapper.style.background = 'transparent';
                wrapper.id = 'lf1'
                document.querySelector('#kaufenodermietenrechner .opt-inquiry-button-wrapper .opt-inquiry-button').remove()
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
                if (stylesheet.rules[i].selectorText && stylesheet.rules[i].selectorText.includes('#kaufenodermietenrechner #' + slider.id)) {
                    rule = stylesheet.rules[i];
                }
            }
            if (rule) {
                rule.style.background = 'linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%)'
            } else {
                stylesheet.insertRule('#kaufenodermietenrechner #' + slider.id + '::-webkit-slider-runnable-track { background: linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%); }');
            }
        }
        (function adaptMaxWidth() {
            let s = document.querySelector('link[href*=\'kaufenodermietenrechner.css\']');
            try {
                    s = s.sheet
                    for (var j = (s.cssRules.length - 1); j >= 0; j--) {
                        if (s.cssRules[j].conditionText && s.cssRules[j].conditionText.includes('max-width')) {
                            var maxWidth = parseInt(s.cssRules[j].conditionText.split(': ')[1].split('px')[0]);
                            if (document.body.clientWidth != kaufenodermietenrechner.clientWidth) {
                                maxWidth += parseInt(Math.abs((kaufenodermietenrechner.clientWidth - document.body.clientWidth)))
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
