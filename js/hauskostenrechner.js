
document.addEventListener("DOMContentLoaded", function() {

    const hauskostenrechner = document.querySelector('#hauskostenrechner');

    if (hauskostenrechner) {
        //parse passed atts from php
        var shortcodeAtts;
        if (typeof shortcode_atts_hauskostenrechner === "undefined") {
            shortcodeAtts = null;
        } else {
            shortcodeAtts = shortcode_atts_hauskostenrechner;
        }
        var currentScript;
        document.querySelectorAll('script').forEach(function(s){
            if(s.src.includes('hauskostenrechner.js')){
                currentScript = s;
            }
        });

        const includeInquiryForm = (shortcodeAtts ? shortcodeAtts.include_inquiry_form : false) || currentScript.getAttribute('include_inquiry_form');
        const showBackground = (shortcodeAtts ? shortcodeAtts.show_background : false) || currentScript.getAttribute('show_background');

        const style = document.createElement('style');
        document.body.appendChild(style);
        const stylesheet = style.sheet;
        (function genHauskostenrechner(index = 0) {


            var layout =
                '    <div class="opt-header">' +
                '        <div class="opt-header__background"></div>' +
                '        <div class="opt-header__text">HAUSKOSTENRECHNER</div>' +
                '        <div class="opt-header__switch-wrapper">' +
                '            <div class="opt-header__switch">HAUS MASSIV</div>' +
                '            <div class="opt-header__switch">FERTIGTEILHAUS</div>' +
                '        </div>' +
                '    </div>' +
                '    <div class="opt-body">' +
                '        <div class="opt-body__background"></div>' +
                '        <div class="opt-body__content">' +
                '            <div class="opt-body__heading">Grundstück</div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Kaufpreis Grundstück</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Grundbuchseintragung 1,1 %</div>' +
                '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Grunderwerbsteuer 3,5 %</div>' +
                '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Immobilienmakler</div>' +
                '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper opt-body__text-input-wrapper--summary">' +
                '                <div class="opt-body__text">GRUNDSTÜCKSKOSTEN GESAMT</div>' +
                '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__heading opt-body__heading--extra-padding">Gebäude</div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Hausanschlusskosten<br>(Strom, Gas, Wasser, Kanal)</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Aufschließungsgebühren & Vermessung</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection3Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Fundamentplatte, Keller</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Erdarbeiten/Baggerarbeiten</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection6Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection7Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection8Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection9Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection10Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection11Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">{secondSection12Heading}</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Böden im Innenraum</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Sanitär/Badausstattung</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Küchenausstattung</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Carport, Garage</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Außenanlagen</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Fertigstellungsarbeiten</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper">' +
                '                <div class="opt-body__text">Sonstiges Reserve</div>' +
                '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="opt-body__text-input-wrapper opt-body__text-input-wrapper--summary">' +
                '                <div class="opt-body__text">GEBÄUDEKOSTEN GESAMT</div>' +
                '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input">' +
                '                    <div class="opt-body__input-label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '        <div class="opt-body__summary">' +
                '            <div class="opt-body__row-wrapper">' +
                '                <div class="opt-body__text-wrapper">' +
                '                    <div class="opt-body__summary-text">Summe</div>' +
                '                </div>' +
                '                <div class="opt-body__number-label-wrapper">' +
                '                    <div class="opt-body__number">0</div>' +
                '                    <div class="opt-body__label">EUR</div>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '    <div class="opt-inquiry-button-wrapper">' +
                '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' +
                '    </div>';

            layout = layout.replace('{secondSection3Heading}', index == 0 ? 'Planungskosten' : 'Individuelle Planung');
            layout = layout.replace('{secondSection6Heading}', index == 0 ? 'Baumeister, Spengler, Dach' : 'Schlüsselfertig - Material und Arbeit');
            layout = layout.replace('{secondSection7Heading}', index == 0 ? 'Zimmererarbeiten, Trockenbau' : 'Fertighaus belagsfertig');
            layout = layout.replace('{secondSection8Heading}', index == 0 ? 'Fenster, Innentüren, Böden' : 'Zusatzausstattung, Heizung,<br>Kamin, Entlüftung...');
            layout = layout.replace('{secondSection9Heading}', index == 0 ? 'Elektrikerarbeiten' : 'Sanitär/Badausstattung');
            layout = layout.replace('{secondSection10Heading}', index == 0 ? 'Heizungsanlage' : 'Küchenausstattung');
            layout = layout.replace('{secondSection11Heading}', index == 0 ? 'Installateurarbeiten' : 'Carport, Garage');
            layout = layout.replace('{secondSection12Heading}', index == 0 ? 'Malerarbeiten' : 'Sonstiges Reserve');

            hauskostenrechner.innerHTML = layout;

            if(!showBackground){
                document.querySelector('#hauskostenrechner .opt-body__background').remove();
            }

            (function applyCustomColors () {
                const color1 = (shortcodeAtts ? shortcodeAtts.color1 : false) || currentScript.getAttribute('color1')
                const color2 = (shortcodeAtts ? shortcodeAtts.color2 : false) || currentScript.getAttribute('color2')
                const color3 = (shortcodeAtts ? shortcodeAtts.color3 : false) || currentScript.getAttribute('color3')
                const color4 = (shortcodeAtts ? shortcodeAtts.color4 : false) || currentScript.getAttribute('color4')
                if(color1) {
                    document.querySelectorAll('#hauskostenrechner .opt-header .opt-header__background, #hauskostenrechner .opt-body .opt-body__summary').forEach(function (q){
                        q.style = 'background: ' + color1;
                    });
                    document.querySelectorAll('#hauskostenrechner .opt-header .opt-header__switch, #hauskostenrechner .opt-body .opt-body__heading, #hauskostenrechner .opt-body__text-input-wrapper--summary .opt-body__text, #hauskostenrechner .opt-body__text-input-wrapper--summary .opt-body__input, #hauskostenrechner .opt-body__text-input-wrapper--summary .opt-body__input-label').forEach(function (q){
                        q.style.color = color1;
                    });
                }
                if(color2) {
                    if (showBackground) {
                        document.querySelector('#hauskostenrechner .opt-body .opt-body__background').style = 'background: ' + color2;
                    }
                    document.querySelectorAll('#hauskostenrechner .opt-header .opt-header__switch')[index === 0 ? 1 : 0].style.background = color2;
                }
                if(color3) {
                    document.querySelector('#hauskostenrechner .opt-inquiry-button-wrapper .opt-inquiry-button').style = 'background: ' + color3;
                }
                if(color4) {
                    document.querySelector('#hauskostenrechner .opt-inquiry-button-wrapper').style = 'background: ' + color4;
                }
            })();


            var switches = document.querySelectorAll('#hauskostenrechner .opt-header__switch');
            switches[index].className = 'opt-header__switch opt-header__switch--selected';
            switches[index === 0 ? 1 : 0].addEventListener('click', function () {
                genHauskostenrechner(index === 0 ? 1 : 0)
            });

            if (index === 1) {
                document.querySelectorAll('#hauskostenrechner .opt-body__text-input-wrapper').forEach(function (e, i) {
                    if (i >= 17 && i <= 23) {
                        e.remove();
                    }
                })
            }

            const inputs = document.querySelectorAll('#hauskostenrechner .opt-body__input');

            inputs.forEach(function (e) {
                if (!e.disabled)
                    setupEventListenerNumber(e);
            })


            var finsum;
            function calcResult() {
                const value = inputs[0].value ? parseInt(inputs[0].value.replace(/[.]/g, '')) : 0;
                const landRegisterFee = value * 0.011;
                const landAcquisitionFee = value * 0.035;
                var brokerFee = value;
                if (value && value < 36336) {
                    brokerFee *= 0.048;
                } else if (value) {
                    if (value > 48448) {
                        brokerFee *= 0.036;
                    } else {
                        brokerFee = 1743.6;
                    }
                }
                brokerFee = parseInt(brokerFee.toFixed(0));
                inputs[1].value = numberFormatter(landRegisterFee);
                inputs[2].value = numberFormatter(landAcquisitionFee);
                inputs[3].value = numberFormatter(brokerFee);
                var groundSum = value + landRegisterFee + landAcquisitionFee + brokerFee;
                inputs[4].value = numberFormatter(groundSum);

                var buildingSum = 0;
                inputs.forEach(function (e, i) {
                    if (i > 4 && i < inputs.length - 1 && e.value) {
                        buildingSum += parseInt(e.value.replace(/[.]/g, ''));
                    }
                })

                inputs[inputs.length - 1].value = numberFormatter(buildingSum);

                finsum = (buildingSum + groundSum);
                document.querySelector('#hauskostenrechner .opt-body__summary .opt-body__number').innerText = numberFormatter(finsum);
            }

            const inquiryButton = document.querySelector('#hauskostenrechner .opt-inquiry-button-wrapper .opt-inquiry-button');
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
                url += '&finsum=' + finsum;

                var win = window.open(url, '_blank');
                win.focus();
                } else {
                    window.finsum = finsum;
                    const wrapper = document.querySelector('#hauskostenrechner .opt-inquiry-button-wrapper')
                    wrapper.style.background = 'transparent';
                    wrapper.id = 'lf1'
                    document.querySelector('#hauskostenrechner .opt-inquiry-button-wrapper .opt-inquiry-button').remove()
                    const inquiryForm = document.createElement('script');
                    var src = currentScript.src.split('/');
                    src.pop();
                    src.push('inquiry.js');
                    src = src.join('/');
                    inquiryForm.src = src;
                    document.body.appendChild(inquiryForm);
                }
            });


            function setupEventListenerNumber(input) {
                input.addEventListener('focus', function (e) {
                    input.value = input.value ? parseInt(input.value.toString().split('.').join('')) : '';
                })

                input.addEventListener('focusout', function (e) {
                    let formatted = numberFormatter(e.target.value);
                    input.value = formatted;
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

        })();

        (function adaptMaxWidth() {
            let s = document.querySelector('link[href*=\'hauskostenrechner.css\']');
            try {
                    s = s.sheet
                    for (var j = (s.cssRules.length - 1); j >= 0; j--) {
                        if (s.cssRules[j].conditionText && s.cssRules[j].conditionText.includes('max-width')) {
                            var maxWidth = parseInt(s.cssRules[j].conditionText.split(': ')[1].split('px')[0]);
                            if (document.body.clientWidth != hauskostenrechner.clientWidth) {
                                maxWidth += parseInt(Math.abs((hauskostenrechner.clientWidth - document.body.clientWidth)))
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
