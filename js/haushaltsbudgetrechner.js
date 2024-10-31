document.addEventListener("DOMContentLoaded", function() {


    const haushaltsbudgetrechner = document.querySelector('#haushaltsbudgetrechner');

    if (haushaltsbudgetrechner) {
        //parse passed atts from php
        var shortcodeAtts;
        if (typeof shortcode_atts_haushaltsbudgetrechner === "undefined") {
            shortcodeAtts = null;
        } else {
            shortcodeAtts = shortcode_atts_haushaltsbudgetrechner;
        }
        var currentScript;
        document.querySelectorAll('script').forEach(function(s){
            if(s.src.includes('haushaltsbudgetrechner.js')){
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
            '        <div class="opt-header__text">HAUSHALTSBUDGETRECHNER</div>' +
            '    </div>' +
            '    <div class="opt-body">' +
            '        <div class="opt-body__background"></div>' +
            '        <div class="opt-body__section-one">' +
            '            <div class="opt-body__section-heading">Einnahmen</div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">monatliche Einnahmen aller Kreditnehmer</div>' +
            '                    </div>' +
            '                    <input id="MEAKSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">20.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="MEAKInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__section-two">' +
            '            <div class="opt-body__section-heading">Ausgaben</div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Betriebskosten (ca.&nbsp;€&nbsp;2,20&nbsp;pro&nbsp;m2)</div>' +
            '                    </div>' +
            '                    <input id="BKSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">500</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="BKInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Medien (ORF/Kabel/Internet/Telefon)</div>' +
            '                    </div>' +
            '                    <input id="MSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">500</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="MInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">KFZ (inkl. Kauf, Wartung, Unterhalt)</div>' +
            '                    </div>' +
            '                    <input id="KFZSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="KFZInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">zu zahlende Alimente</div>' +
            '                    </div>' +
            '                    <input id="ASlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="AInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Sparformen</div>' +
            '                    </div>' +
            '                    <input id="SFSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="SFInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Haushalts-/&#8203;Eigenheimversicherungen</div>' +
            '                    </div>' +
            '                    <input id="HVSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="HVInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Personen-/&#8203;Lebensversicherungen</div>' +
            '                    </div>' +
            '                    <input id="PVSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="PVInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">bestehende Kredite</div>' +
            '                    </div>' +
            '                    <input id="KSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="KInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Wohnbauförderung Rückzahlung</div>' +
            '                    </div>' +
            '                    <input id="WFRSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="WFRInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__slider-input-wrapper">' +
            '                <div class="opt-body__slider-wrapper">' +
            '                    <div class="opt-body__slider-text-above-wrapper">' +
            '                        <div class="opt-body__slider-text-above">Lebenshaltungskosten (mind.: 1 Person: € 450,- / 2' +
            '                            Personen: € 700,-)' +
            '                        </div>' +
            '                    </div>' +
            '                    <input id="LHKSlider" type="range">' +
            '                    <div class="opt-body__slider-text-below-wrapper">' +
            '                        <div class="opt-body__slider-text-below">0</div>' +
            '                        <div class="opt-body__slider-text-below">5.000</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="opt-body__input-wrapper"><input id="LHKInput" class="opt-body__input">' +
            '                    <div class="opt-body__input-label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__section-three">' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">Einnahmen</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">4.000</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">Ausgaben</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">2.000</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="opt-body__section-four">' +
            '            <div class="opt-body__row-wrapper">' +
            '                <div class="opt-body__text-wrapper">' +
            '                    <div class="opt-body__text">frei verfügbares Einkommen</div>' +
            '                </div>' +
            '                <div class="opt-body__number-label-wrapper">' +
            '                    <div class="opt-body__number">2.000</div>' +
            '                    <div class="opt-body__label">EUR</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '    <div class="opt-inquiry-button-wrapper">' +
            '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' +
            '    </div>'

        haushaltsbudgetrechner.innerHTML = layout;

        if(!showBackground){
            document.querySelector('#haushaltsbudgetrechner .opt-body__background').remove();
        }

        (function applyCustomColors () {
            if(color1) {
                document.querySelectorAll('#haushaltsbudgetrechner .opt-header .opt-header__background, #haushaltsbudgetrechner .opt-body .opt-body__section-four').forEach(function (q){
                    q.style = 'background: ' + color1;
                });
                document.querySelectorAll('#haushaltsbudgetrechner .opt-body .opt-body__section-heading, #haushaltsbudgetrechner .opt-body__section-three .opt-body__text, #haushaltsbudgetrechner .opt-body__section-three .opt-body__number, #haushaltsbudgetrechner .opt-body__section-three .opt-body__label').forEach(function (q){
                    q.style = 'color: ' + color1;
                });
                //These try/catches are necessary because some browsers don't allow to insert css rules for other browsers ...
                //FF
                try {
                    stylesheet.insertRule('#haushaltsbudgetrechner input[type="range"]::-moz-range-progress{background-color: ' + color1 + ';}');
                    stylesheet.insertRule('#haushaltsbudgetrechner input[type="range"]::-moz-range-thumb{background-color: ' + color1 + ';}');
                }catch (e){}
                //Webkit
                try {
                    stylesheet.insertRule('#haushaltsbudgetrechner input[type="range"]::-webkit-slider-thumb{background-color: ' + color1 + ';}');
                }catch(e){}
            }
            if(color2 && showBackground) {
                document.querySelector('#haushaltsbudgetrechner .opt-body .opt-body__background').style = 'background: ' + color2;
            }
            if(color3) {
                document.querySelector('#haushaltsbudgetrechner .opt-inquiry-button-wrapper .opt-inquiry-button').style = 'background: ' + color3;
            }
            if(color4) {
                document.querySelector('#haushaltsbudgetrechner .opt-inquiry-button-wrapper').style = 'background: ' + color4;
            }
            if(color5) {
                document.querySelector('#haushaltsbudgetrechner .opt-body .opt-body__section-one').style = 'background: ' + color5;
            }
            if(color6) {
                document.querySelector('#haushaltsbudgetrechner .opt-body .opt-body__section-three').style = 'background: ' + color6;
            }
        })();

        // monatliche Einnahmen aller Kreditnehmer
        const MEAKDefault = 0;
        const MEAKSlider = document.querySelector('#haushaltsbudgetrechner #MEAKSlider')
        const MEAKInput = document.querySelector('#haushaltsbudgetrechner #MEAKInput')
        MEAKSlider.min = 0;
        MEAKSlider.max = 20000;
        MEAKSlider.step = 100;
        setupEventListenerNumber(MEAKSlider, MEAKInput);
        MEAKInput.value = numberFormatter(MEAKDefault);
        MEAKSlider.value = MEAKDefault;
        fillSlider(MEAKSlider);
        // end monatliche Einnahmen aller Kreditnehmer

        // Betriebskosten
        const BKDefault = 0;
        const BKSlider = document.querySelector('#haushaltsbudgetrechner #BKSlider')
        const BKInput = document.querySelector('#haushaltsbudgetrechner #BKInput')
        BKSlider.min = 0;
        BKSlider.max = 500;
        BKSlider.step = 1;
        setupEventListenerNumber(BKSlider, BKInput);
        BKInput.value = numberFormatter(BKDefault);
        BKSlider.value = BKDefault;
        fillSlider(BKSlider);
        // end Betriebskosten

        // Medien
        const MDefault = 0;
        const MSlider = document.querySelector('#haushaltsbudgetrechner #MSlider')
        const MInput = document.querySelector('#haushaltsbudgetrechner #MInput')
        MSlider.min = 0;
        MSlider.max = 500;
        MSlider.step = 1;
        setupEventListenerNumber(MSlider, MInput);
        MInput.value = numberFormatter(MDefault);
        MSlider.value = MDefault;
        fillSlider(MSlider);
        // end Medien

        // KFZ
        const KFZDefault = 0;
        const KFZSlider = document.querySelector('#haushaltsbudgetrechner #KFZSlider')
        const KFZInput = document.querySelector('#haushaltsbudgetrechner #KFZInput')
        KFZSlider.min = 0;
        KFZSlider.max = 5000;
        KFZSlider.step = 10;
        setupEventListenerNumber(KFZSlider, KFZInput);
        KFZInput.value = numberFormatter(KFZDefault);
        KFZSlider.value = KFZDefault;
        fillSlider(KFZSlider);
        // end KFZ

        // zu zahlende Alimente
        const ADefault = 0;
        const ASlider = document.querySelector('#haushaltsbudgetrechner #ASlider')
        const AInput = document.querySelector('#haushaltsbudgetrechner #AInput')
        ASlider.min = 0;
        ASlider.max = 5000;
        ASlider.step = 10;
        setupEventListenerNumber(ASlider, AInput);
        AInput.value = numberFormatter(ADefault);
        ASlider.value = ADefault;
        fillSlider(ASlider);
        // end zu zahlende Alimente

        // Sparformen
        const SFDefault = 0;
        const SFSlider = document.querySelector('#haushaltsbudgetrechner #SFSlider')
        const SFInput = document.querySelector('#haushaltsbudgetrechner #SFInput')
        SFSlider.min = 0;
        SFSlider.max = 5000;
        SFSlider.step = 10;
        setupEventListenerNumber(SFSlider, SFInput);
        SFInput.value = numberFormatter(SFDefault);
        SFSlider.value = SFDefault;
        fillSlider(SFSlider);
        // end Sparformen

        // Haushalts-/Eigenheimversicherungen
        const HVDefault = 0;
        const HVSlider = document.querySelector('#haushaltsbudgetrechner #HVSlider')
        const HVInput = document.querySelector('#haushaltsbudgetrechner #HVInput')
        HVSlider.min = 0;
        HVSlider.max = 5000;
        HVSlider.step = 10;
        setupEventListenerNumber(HVSlider, HVInput);
        HVInput.value = numberFormatter(HVDefault);
        HVSlider.value = HVDefault;
        fillSlider(HVSlider);
        // end Haushalts-/Eigenheimversicherungen

        // Personen/Lebensversicherungen
        const PVDefault = 0;
        const PVSlider = document.querySelector('#haushaltsbudgetrechner #PVSlider')
        const PVInput = document.querySelector('#haushaltsbudgetrechner #PVInput')
        PVSlider.min = 0;
        PVSlider.max = 5000;
        PVSlider.step = 10;
        setupEventListenerNumber(PVSlider, PVInput);
        PVInput.value = numberFormatter(PVDefault);
        PVSlider.value = PVDefault;
        fillSlider(PVSlider);
        // end Personen/Lebensversicherungen

        // bestehende Kredite
        const KDefault = 0;
        const KSlider = document.querySelector('#haushaltsbudgetrechner #KSlider')
        const KInput = document.querySelector('#haushaltsbudgetrechner #KInput')
        KSlider.min = 0;
        KSlider.max = 5000;
        KSlider.step = 10;
        setupEventListenerNumber(KSlider, KInput);
        KInput.value = numberFormatter(KDefault);
        KSlider.value = KDefault;
        fillSlider(KSlider);
        // end bestehende Kredite

        // Wohnbauförderung Rückzahlung
        const WFRDefault = 0;
        const WFRSlider = document.querySelector('#haushaltsbudgetrechner #WFRSlider')
        const WFRInput = document.querySelector('#haushaltsbudgetrechner #WFRInput')
        WFRSlider.min = 0;
        WFRSlider.max = 5000;
        WFRSlider.step = 10;
        setupEventListenerNumber(WFRSlider, WFRInput);
        WFRInput.value = numberFormatter(WFRDefault);
        WFRSlider.value = WFRDefault;
        fillSlider(WFRSlider);
        // end Wohnbauförderung Rückzahlung

        // Lebenshaltungskosten
        const LHKDefault = 0;
        const LHKSlider = document.querySelector('#haushaltsbudgetrechner #LHKSlider')
        const LHKInput = document.querySelector('#haushaltsbudgetrechner #LHKInput')
        LHKSlider.min = 0;
        LHKSlider.max = 5000;
        LHKSlider.step = 10;
        setupEventListenerNumber(LHKSlider, LHKInput);
        LHKInput.value = numberFormatter(LHKDefault);
        LHKSlider.value = LHKDefault;
        fillSlider(LHKSlider);

        // end Lebenshaltungskosten

        function calcResult() {
            var sumIn = MEAKSlider.value;
            var sumOut = 0;
            document.querySelectorAll('#haushaltsbudgetrechner input[type="range"]').forEach(function (e, i) {
                if (i)
                    sumOut += parseInt(e.value);
            })
            var diff = parseInt(sumIn - sumOut);
            document.querySelectorAll('#haushaltsbudgetrechner .opt-body__section-three .opt-body__number')[0].innerText = numberFormatter(sumIn);
            document.querySelectorAll('#haushaltsbudgetrechner .opt-body__section-three .opt-body__number')[1].innerText = numberFormatter(sumOut);
            document.querySelector('#haushaltsbudgetrechner .opt-body__section-four .opt-body__number').innerText = numberFormatter(diff);
        }

        calcResult();


        const inquiryButton = document.querySelector('#haushaltsbudgetrechner .opt-inquiry-button-wrapper .opt-inquiry-button');
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

            var win = window.open(url, '_blank');
            win.focus();
            } else {
                const wrapper = document.querySelector('#haushaltsbudgetrechner .opt-inquiry-button-wrapper')
                wrapper.style.background = 'transparent';
                wrapper.id = 'lf1'
                document.querySelector('#haushaltsbudgetrechner .opt-inquiry-button-wrapper .opt-inquiry-button').remove()
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
                if (stylesheet.rules[i].selectorText && stylesheet.rules[i].selectorText.includes('#haushaltsbudgetrechner #' + slider.id)) {
                    rule = stylesheet.rules[i];
                }
            }
            if (rule) {
                rule.style.background = 'linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%)'
            } else {
                stylesheet.insertRule('#haushaltsbudgetrechner #' + slider.id + '::-webkit-slider-runnable-track { background: linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%); }');
            }
        }
        (function adaptMaxWidth() {
            let s = document.querySelector('link[href*=\'haushaltsbudgetrechner.css\']');
                try {
                        s = s.sheet
                        for (var j = (s.cssRules.length - 1); j >= 0; j--) {
                            if (s.cssRules[j].conditionText && s.cssRules[j].conditionText.includes('max-width')) {
                                var maxWidth = parseInt(s.cssRules[j].conditionText.split(': ')[1].split('px')[0]);
                                if (document.body.clientWidth != haushaltsbudgetrechner.clientWidth) {
                                    maxWidth += parseInt(Math.abs((haushaltsbudgetrechner.clientWidth - document.body.clientWidth)))
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
