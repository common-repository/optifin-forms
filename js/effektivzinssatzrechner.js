

document.addEventListener("DOMContentLoaded", function() {
    const effektivzinssatzrechner = document.querySelector('#effektivzinssatzrechner');

    if (effektivzinssatzrechner) {
        //parse passed atts from php
        var shortcodeAtts;
        if (typeof shortcode_atts_effektivzinssatzrechner === "undefined") {
            shortcodeAtts = null;
        } else {
            shortcodeAtts = shortcode_atts_effektivzinssatzrechner;
        }
        var currentScript;
        document.querySelectorAll('script').forEach(function(s){
            if(s.src.includes('effektivzinssatzrechner.js')){
                currentScript = s;
            }
        });

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
            '        <div class="opt-header__text">EFFEKTIVZINSSATZRECHNER</div>' +
            '    </div>' +
            '    <div class="opt-body">' +
            '        <div class="opt-body__background"></div>' +
            '        <div class="opt-body__content">' +
            '            <div class="opt-body__sliders">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Finanzierungs&shy;summe</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="FSInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">EUR</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="FSSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">1.000.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Laufzeit in Jahren</div>' +
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
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Nominalzinssatz</div>' +
            '                        <div class="opt-body__input-wrapper"><input id="NZInput" class="opt-body__input">' +
            '                            <div class="opt-body__input-label">%</div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="NZSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">10</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__inputs">' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Bearbeitungs&shy;gebühr</div>' +
            '                    <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Gerichtliche <br>Eintragungsgebühr</div>' +
            '                    <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Bewertung der Immobilie</div>' +
            '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="290">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Grundbuch&shy;prüfung</div>' +
            '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="50">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Treuhands&shy;abwicklung</div>' +
            '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="70">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Notar der Bank <br>für Beglaubigung</div>' +
            '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="158,29">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__text-input-wrapper">' +
            '                    <div class="opt-body__text">Kontoführung monatlich</div>' +
            '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="5,97">' +
            '                        <div class="opt-body__input-label">EUR</div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__summary">' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__summary-text">Effektivzinssatz</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">0,75 %</div>' +
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
            '    </div>'

        effektivzinssatzrechner.innerHTML = layout;

        if(!showBackground){
            document.querySelector('#effektivzinssatzrechner .opt-body__background').remove();
        }

        (function applyCustomColors () {
            if(color1) {
                document.querySelectorAll('#effektivzinssatzrechner .opt-header .opt-header__background, #effektivzinssatzrechner .opt-body .opt-body__summary').forEach(function (q){
                    q.style = 'background: ' + color1;
                });
                //These try/catches are necessary because some browsers don't allow to insert css rules for other browsers ...
                //FF
                try {
                    stylesheet.insertRule('#effektivzinssatzrechner input[type="range"]::-moz-range-progress{background-color: ' + color1 + ';}');
                    stylesheet.insertRule('#effektivzinssatzrechner input[type="range"]::-moz-range-thumb{background-color: ' + color1 + ';}');
                }catch (e){}
                //Webkit
                try {
                    stylesheet.insertRule('#effektivzinssatzrechner input[type="range"]::-webkit-slider-thumb{background-color: ' + color1 + ';}');
                }catch(e){}
            }
            if(color2 && showBackground) {
                document.querySelector('#effektivzinssatzrechner .opt-body .opt-body__background').style = 'background: ' + color2;
            }
            if(color3) {
                document.querySelector('#effektivzinssatzrechner .opt-inquiry-button-wrapper .opt-inquiry-button').style = 'background: ' + color3;
            }
            if(color4) {
                document.querySelector('#effektivzinssatzrechner .opt-inquiry-button-wrapper').style = 'background: ' + color4;
            }
        })();

        // Finanzierungssumme
        const FSDefault = 192227;
        const FSSlider = document.querySelector('#effektivzinssatzrechner #FSSlider')
        const FSInput = document.querySelector('#effektivzinssatzrechner #FSInput')
        FSSlider.min = 0;
        FSSlider.max = 1000000;
        FSSlider.step = 1000;
        setupEventListenerNumber(FSSlider, FSInput);
        FSInput.value = numberFormatter(FSDefault);
        FSSlider.value = FSDefault;
        fillSlider(FSSlider);
        // end Finanzierungssumme

        // Laufzeit in Jahren
        const LZDefault = 30;
        const LZSlider = document.querySelector('#effektivzinssatzrechner #LZSlider')
        const LZInput = document.querySelector('#effektivzinssatzrechner #LZInput')
        LZSlider.min = 0;
        LZSlider.max = 40;
        LZSlider.step = 1;
        setupEventListenerNumber(LZSlider, LZInput);
        LZInput.value = numberFormatter(LZDefault);
        LZSlider.value = LZDefault;
        fillSlider(LZSlider);
        // end Laufzeit in Jahren

        // Nominalzinssatz
        const NZDefault = 1.91;
        const NZSlider = document.querySelector('#effektivzinssatzrechner #NZSlider')
        const NZInput = document.querySelector('#effektivzinssatzrechner #NZInput')
        NZSlider.min = 0;
        NZSlider.max = 10;
        NZSlider.step = 0.01;
        setupEventListenerPercentage(NZSlider, NZInput);
        NZInput.value = NZDefault.toString().replace('.',',');
        NZSlider.value = NZDefault;
        fillSlider(NZSlider);
        // end Nominalzinssatz



        (function initCalcExample() {
            const calcExampleHeading = document.querySelector('#effektivzinssatzrechner .opt-calc-example-heading')
            const calcExampleWrapper = document.querySelector('#effektivzinssatzrechner .opt-calc-example-wrapper')
            calcExampleHeading.addEventListener('click', function () {
                if(calcExampleWrapper.className.includes('--show')) {
                    calcExampleWrapper.className='opt-calc-example-wrapper'
                } else {
                    calcExampleWrapper.className='opt-calc-example-wrapper opt-calc-example-wrapper--show'
                }
            })
        })();

        const inputs = document.querySelectorAll('#effektivzinssatzrechner .opt-body__inputs .opt-body__input');
        inputs.forEach(function(e){
            if(!e.disabled)
                setupEventListenerNumber(null, e);
        })

        function calcResult () {

            const finSum = parseInt(FSSlider.value);
            const processingFee = FSSlider.value * 0.03;
            const buildingWorth = inputs[2].value ? parseInt(inputs[2].value.replace(/[.]/g,'')) : 0;
            const landRegister = inputs[3].value ? parseInt(inputs[3].value.replace(/[.]/g,'')) : 0;
            const escrow = inputs[4].value ? parseInt(inputs[4].value.replace(/[.]/g,'')) : 0;
            const bankVerification = inputs[5].value ? parseInt(inputs[5].value.replace(/[.]/g,'')) : 0;
            const accountManagementFee = inputs[6].value ? parseInt(inputs[6].value.replace(/[.]/g,'')) : 0;
            const courtRecordFee = (finSum + processingFee + buildingWorth + landRegister + escrow + bankVerification) * 0.0144;
            const effectiveRate = ((finSum*((processingFee+courtRecordFee+buildingWorth+landRegister+escrow+bankVerification+accountManagementFee)/(finSum))*2400/(((LZSlider.value*12)+1)*finSum)+parseFloat(NZSlider.value)));
            inputs[0].value = numberFormatter(processingFee);
            inputs[1].value = numberFormatter(courtRecordFee);
            document.querySelector('#effektivzinssatzrechner .opt-body__summary .opt-body__number').innerText = effectiveRate.toFixed(2) + ' %'
        }
        calcResult();

        const inquiryButton = document.querySelector('#effektivzinssatzrechner .opt-inquiry-button-wrapper .opt-inquiry-button');
        inquiryButton.addEventListener('click', function () {
            const finsum = FSSlider.value;
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
                const wrapper = document.querySelector('#effektivzinssatzrechner .opt-inquiry-button-wrapper')
                wrapper.style.background = 'transparent';
                wrapper.id = 'lf1'
                document.querySelector('#effektivzinssatzrechner .opt-inquiry-button-wrapper .opt-inquiry-button').remove()
                const inquiryForm = document.createElement('script');
                var src = currentScript.src.split('/');
                src.pop();
                src.push('inquiry.js');
                src = src.join('/');
                inquiryForm.src = src;
                document.body.appendChild(inquiryForm);
            }
        });

        function setupEventListenerNumber (slider, input) {
            if(slider) {
                slider.addEventListener('input', function (e) {
                    input.value = numberFormatter(e.target.value);
                    calcResult();
                    fillSlider(e.target);
                })
            }

            input.addEventListener('focus', function (e) {
                input.value = input.value?parseInt(input.value.toString().split('.').join('')):''
            })

            input.addEventListener('focusout', function (e) {
                let formatted = numberFormatter(e.target.value, slider ? slider.min : null, slider ? slider.max : null);
                input.value = formatted;
                if(slider) {
                    slider.value = parseInt(formatted.split('.').join(''));
                }
                calcResult();
            })
        }

        function setupEventListenerPercentage (slider, input) {
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
        function numberFormatter (number, min = 0, max = 99999999, def = 0) {
            number = parseInt(number)
            const prefix = number >= 0 ? '' : '-'
            number = Math.abs(number)
            min = parseInt(min)
            max = parseInt(max)

            let text = number.toString()

            var formattedNumber = [];
            if(text.match(/^[0-9]+$/)) {

                if(number < min) {
                    return numberFormatter(min)
                }

                if(number > max) {
                    return numberFormatter(max)
                }


                if(text.length > 3) {
                    for(var i=text.length - 1;i >= 0; i-- ) {
                        formattedNumber.push(text.charAt(i))
                        if((formattedNumber.length - parseInt((text.length - 1 - i) / 3) ) % 3 === 0 && i!==0) {
                            formattedNumber.push('.')
                        }
                    }
                    return prefix + formattedNumber.reverse().join('')
                }
                return prefix + text
            }


            return numberFormatter(def)
        }
        function getFilledPercentage (min, max, value) {

            var rawPercentage = (value-min)/(max-min)

            var filledPercentage = (rawPercentage*100).toFixed(2)

            return filledPercentage

        }
        function fillSlider (slider) {
            const filledPercentage = getFilledPercentage(slider.min, slider.max, slider.value);
            const fillColor = color1 ? color1 : '#216197';
            var rule = null;
            for(var i = 0; i < stylesheet.rules.length; i++) {
                if(stylesheet.rules[i].selectorText && stylesheet.rules[i].selectorText.includes('#effektivzinssatzrechner #' +slider.id)){
                    rule = stylesheet.rules[i];
                }
            }
            if(rule) {
                rule.style.background = 'linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%)'
            } else {
                stylesheet.insertRule('#effektivzinssatzrechner #' + slider.id + '::-webkit-slider-runnable-track { background: linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%); }');
            }
        }
        (function adaptMaxWidth() {
            let s = document.querySelector('link[href*=\'effektivzinssatzrechner.css\']');
            try {
                    s = s.sheet
                    for (var j = (s.cssRules.length - 1); j >= 0; j--) {
                        if (s.cssRules[j].conditionText && s.cssRules[j].conditionText.includes('max-width')) {
                            var maxWidth = parseInt(s.cssRules[j].conditionText.split(': ')[1].split('px')[0]);
                            if (document.body.clientWidth != effektivzinssatzrechner.clientWidth) {
                                maxWidth += parseInt(Math.abs((effektivzinssatzrechner.clientWidth - document.body.clientWidth)))
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

