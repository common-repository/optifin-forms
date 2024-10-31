document.addEventListener("DOMContentLoaded", function() {
  const kreditrechner = document.querySelector('#kreditrechner');

  if (kreditrechner) {
    //parse passed atts from php
    var shortcodeAtts;
    if (typeof shortcode_atts_kreditrechner === "undefined") {
      shortcodeAtts = null;
    } else {
      shortcodeAtts = shortcode_atts_kreditrechner;
    }

    var currentScript;
    document.querySelectorAll('script').forEach(function(s){
      if(s.src.includes('kreditrechner.js')){
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
    (function genKreditrechner(index = 0) {

      var layout =
        '    <div class="opt-header">' +
        '        <div class="opt-header__background"></div>' +
        '        <div class="opt-header__text">KREDITRECHNER</div>' +
        '        <div class="opt-header__switch-wrapper">' +
        '            <div class="opt-header__switch">RATE BERECHNEN</div>' +
        '            <div class="opt-header__switch">FINANZIERUNGSSUMME BERECHNEN</div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="opt-body">' +
        '        <div class="opt-body__background"></div>' +
        '        <div class="opt-body__heading">{bodyHeading}</div>' +
        '        <div class="opt-body__slider-input-wrapper">' +
        '            <div class="opt-body__slider-wrapper">' +
        '                <div class="opt-body__slider-text-above-wrapper">' +
        '                    <div class="opt-body__slider-text-above">{firstSliderFirstTextAbove}</div>' +
        '                    <div class="opt-body__slider-text-above">EUR</div>' +
        '                </div>' +
        '                <input id="FSSlider" type="range">' +
        '                <div class="opt-body__slider-text-below-wrapper">' +
        '                    <div class="opt-body__slider-text-below">{firstSliderFirstTextBelow}</div>' +
        '                    <div class="opt-body__slider-text-below">{firstSliderSecondTextBelow}</div>' +
        '                    <div class="opt-body__slider-text-below">{firstSliderThirdTextBelow}</div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="opt-body__input-wrapper"><input id="FSInput" class="opt-body__input">' +
        '                <div class="opt-body__input-label">EUR</div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="opt-body__slider-input-wrapper">' +
        '            <div class="opt-body__slider-wrapper">' +
        '                <div class="opt-body__slider-text-above-wrapper">' +
        '                    <div class="opt-body__slider-text-above">Laufzeit</div>' +
        '                    <div class="opt-body__slider-text-above">Jahre</div>' +
        '                </div>' +
        '                <input id="LZSlider" type="range">' +
        '                <div class="opt-body__slider-text-below-wrapper">' +
        '                    <div class="opt-body__slider-text-below">10</div>' +
        '                    <div class="opt-body__slider-text-below">25</div>' +
        '                    <div class="opt-body__slider-text-below">40</div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="opt-body__input-wrapper"><input id="LZInput" class="opt-body__input">' +
        '                <div class="opt-body__input-label">Jahre</div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="opt-body__slider-input-wrapper">' +
        '            <div class="opt-body__slider-wrapper">' +
        '                <div class="opt-body__slider-text-above-wrapper">' +
        '                    <div class="opt-body__slider-text-above">Zinssatz (p.a.)</div>' +
        '                    <div class="opt-body__slider-text-above">%</div>' +
        '                </div>' +
        '                <input id="ZSSlider" type="range">' +
        '                <div class="opt-body__slider-text-below-wrapper">' +
        '                    <div class="opt-body__slider-text-below">0,5</div>' +
        '                    <div class="opt-body__slider-text-below">5</div>' +
        '                    <div class="opt-body__slider-text-below">10</div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="opt-body__input-wrapper"><input id="ZSInput" class="opt-body__input">' +
        '                <div class="opt-body__input-label">%</div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="opt-body__monthly-rate-text">{resultText}</div>' +
        '        <div class="opt-body__monthly-rate-input-wrapper">' +
        '            <div class="opt-body__input-wrapper"><input class="opt-body__input" disabled="">' +
        '                <div class="opt-body__input-label">EUR</div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="opt-inquiry-button-wrapper">' +
        '        <div class="opt-inquiry-button">UNVERBINDLICHE ANFRAGE STELLEN</div>' +
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


      layout = layout.replace('{bodyHeading}', index == 0 ? 'Kreditrate berechnen' : 'Mögliche Finanzierungssumme berechnen');
      layout = layout.replace('{firstSliderFirstTextAbove}', index == 0 ? 'Finanzierungssumme' : 'Monatliche Rate');
      layout = layout.replace('{firstSliderFirstTextBelow}', index == 0 ? '50.000' : '0');
      layout = layout.replace('{firstSliderSecondTextBelow}', index == 0 ? '500.000' : '2.500');
      layout = layout.replace('{firstSliderThirdTextBelow}', index == 0 ? '1.000.000' : '5.000');
      layout = layout.replace('{resultText}', index == 0 ? 'MONATLICHE RATE' : 'FINANZIERUNGSSUMME');


      kreditrechner.innerHTML = layout;

      if(!showBackground){
        document.querySelector('#kreditrechner .opt-body__background').remove();
      }
      (function applyCustomColors () {

        if(color1) {
          document.querySelector('#kreditrechner .opt-header .opt-header__background').style = 'background: ' + color1;
          document.querySelectorAll('#kreditrechner .opt-header .opt-header__switch, #kreditrechner .opt-body .opt-body__heading, #kreditrechner .opt-body .opt-body__monthly-rate-text, #kreditrechner .opt-body__monthly-rate-input-wrapper .opt-body__input, #kreditrechner .opt-body__monthly-rate-input-wrapper .opt-body__input-label').forEach(function (q){
            q.style.color = color1;
          });
          //These try/catches are necessary because some browsers don't allow to insert css rules for other browsers ...
          //FF
          try {
            stylesheet.insertRule('#kreditrechner input[type="range"]::-moz-range-progress{background-color: ' + color1 + ';}');
            stylesheet.insertRule('#kreditrechner input[type="range"]::-moz-range-thumb{background-color: ' + color1 + ';}');
          }catch (e){}
          //Webkit
          try {
            stylesheet.insertRule('#kreditrechner input[type="range"]::-webkit-slider-thumb{background-color: ' + color1 + ';}');
          }catch(e){}
        }
        if(color2) {
          if(showBackground) {
            document.querySelector('#kreditrechner .opt-body .opt-body__background').style = 'background: ' + color2;
          }
          document.querySelectorAll('#kreditrechner .opt-header .opt-header__switch')[index === 0 ? 1 : 0].style.background = color2;
        }
        if(color3) {
          document.querySelector('#kreditrechner .opt-inquiry-button-wrapper .opt-inquiry-button').style = 'background: ' + color3;
        }
        if(color4) {
          document.querySelector('#kreditrechner .opt-inquiry-button-wrapper').style = 'background: ' + color4;
        }
      })();

      var switches = document.querySelectorAll('#kreditrechner .opt-header__switch');
      switches[index].className = 'opt-header__switch opt-header__switch--selected';
      switches[index === 0 ? 1 : 0].addEventListener('click', function () {
        genKreditrechner(index === 0 ? 1 : 0)
      });


      // Finanzierungssumme
      let FSDefault;
      if (index == 0) {
        const urlParams = (new URL(window.location)).searchParams
        let finsum = urlParams.get('finsum');
        if( finsum) {
          finsum = finsum.replace('.', '');
          FSDefault = parseInt(finsum);
        } else {
          FSDefault = 200000
        }
      } else {
        FSDefault = 500
      }
      const FSSlider = document.querySelector('#kreditrechner #FSSlider')
      const FSInput = document.querySelector('#kreditrechner #FSInput')
      FSSlider.min = index == 0 ? 50000 : 0;
      FSSlider.max = index == 0 ? 1000000 : 5000;
      FSSlider.step = index == 0 ? 1000 : 10;
      setupEventListenerNumber(FSSlider, FSInput);
      FSInput.value = numberFormatter(FSDefault);
      FSSlider.value = FSDefault;
      fillSlider(FSSlider);
      // end Finanzierungssumme

      // Laufzeit (in Jahren)
      let LZDefault;
      if (index == 0) {
        const urlParams = (new URL(window.location)).searchParams
        const runtime = urlParams.get('runtime');
        if( runtime && parseInt(runtime)) {
          LZDefault = runtime;
        } else {
          LZDefault = 25
        }
      } else {
        LZDefault = 25
      }
      const LZSlider = document.querySelector('#kreditrechner #LZSlider')
      const LZInput = document.querySelector('#kreditrechner #LZInput')
      LZSlider.min = 10;
      LZSlider.max = 40;
      LZSlider.step = 1;
      setupEventListenerNumber(LZSlider, LZInput);
      LZInput.value = numberFormatter(LZDefault);
      LZSlider.value = LZDefault;
      fillSlider(LZSlider);
      // end Laufzeit (in Jahren)

      // Zinssatz (p.a.)
      const ZSDefault = 1;
      const ZSSlider = document.querySelector('#kreditrechner #ZSSlider')
      const ZSInput = document.querySelector('#kreditrechner #ZSInput')
      ZSSlider.min = 0.5;
      ZSSlider.max = 10;
      ZSSlider.step = 0.125;
      setupEventListenerPercentage(ZSSlider, ZSInput);
      ZSInput.value = numberFormatter(ZSDefault);
      ZSSlider.value = ZSDefault;
      fillSlider(ZSSlider);
      // end Zinssatz (p.a.)


      (function initCalcExample() {
        const calcExampleHeading = document.querySelector('#kreditrechner .opt-calc-example-heading')
        const calcExampleWrapper = document.querySelector('#kreditrechner .opt-calc-example-wrapper')
        calcExampleHeading.addEventListener('click', function () {
          if (calcExampleWrapper.className.includes('--show')) {
            calcExampleWrapper.className = 'opt-calc-example-wrapper'
          } else {
            calcExampleWrapper.className = 'opt-calc-example-wrapper opt-calc-example-wrapper--show'
          }
        })
      })();

      var result;
      function calcResult() {

        if (index === 0) {
          result = ((FSSlider.value * (((ZSSlider.value / 100) * Math.pow((1 + ZSSlider.value / 100), (LZSlider.value))) / (Math.pow((1 + ZSSlider.value / 100), (LZSlider.value)) - 1)) / 12) * 1.01);
        } else {
          result = (FSSlider.value / ((((ZSSlider.value / 100) * Math.pow((1 + (ZSSlider.value / 100)), (LZSlider.value))) / (Math.pow((1 + (ZSSlider.value / 100)), (LZSlider.value)) - 1)) / 12) * 0.989);
        }
        document.querySelector('#kreditrechner .opt-body__monthly-rate-input-wrapper input').value = numberFormatter(result) + ',' + result.toFixed(2).split('.')[1];
      }

      calcResult();


      const inquiryButton = document.querySelector('#kreditrechner .opt-inquiry-button-wrapper .opt-inquiry-button');
      inquiryButton.addEventListener('click', function () {
        const finsum = index == 0 ? FSSlider.value : result;
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
          const wrapper = document.querySelector('#kreditrechner .opt-inquiry-button-wrapper')
          wrapper.style.background = 'transparent';
          wrapper.id = 'lf1'
          document.querySelector('#kreditrechner .opt-inquiry-button-wrapper .opt-inquiry-button').remove()
          const inquiryForm = document.createElement('script');
          var src = currentScript.src.split('/');
          src.pop();
          src.push('inquiry.js');
          src = src.join('/');
          inquiryForm.src = src;
          document.body.appendChild(inquiryForm);
        }
      })

      if(window.innerWidth <= 480) {
        inquiryButton.innerText = 'UNVERBINDLICH ANFRAGEN';
      } else {
        inquiryButton.innerText = 'UNVERBINDLICHE ANFRAGE STELLEN';
      }


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

    })();

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
        if (stylesheet.rules[i].selectorText && stylesheet.rules[i].selectorText.includes('#kreditrechner #' + slider.id)) {
          rule = stylesheet.rules[i];
        }
      }
      if (rule) {
        rule.style.background = 'linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%)'
      } else {
        stylesheet.insertRule('#kreditrechner #' + slider.id + '::-webkit-slider-runnable-track { background: linear-gradient(to right, ' + fillColor + ' 0%, ' + fillColor + ' ' + filledPercentage + '%, #d4d4d4 ' + filledPercentage + '%, #d4d4d4 100%); }');
      }
    }
    (function adaptMaxWidth() {
      let s = document.querySelector('link[href*=\'kreditrechner.css\']');
      try {
        s = s.sheet
        for (var j = (s.cssRules.length - 1); j >= 0; j--) {
          if (s.cssRules[j].conditionText && s.cssRules[j].conditionText.includes('max-width')) {
            var maxWidth = parseInt(s.cssRules[j].conditionText.split(': ')[1].split('px')[0]);
            if (document.body.clientWidth != kreditrechner.clientWidth) {
              maxWidth += parseInt(Math.abs((kreditrechner.clientWidth - document.body.clientWidth)))
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


