<?php
/**
 * Plugin Name: Optifin Forms
 * Description: Different forms from optifin
 * Version: 1.3.9
 * Author: Sunlime Web Innovations GmbH
 * Author URI: https://sunlime.at
 */

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if(!function_exists('opti_forms_kreditrechner')) {
    function opti_forms_kreditrechner ($atts) {
      wp_enqueue_script('kreditrechner_js', plugin_dir_url( __FILE__ ) . 'js/kreditrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/kreditrechner.js'));
      wp_enqueue_style('kreditrechner_css', plugin_dir_url( __FILE__ ) . 'css/kreditrechner.css', [],sha1_file(plugin_dir_path( __FILE__ ) . 'css/kreditrechner.css') );
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'kreditrechner_js', 'shortcode_atts_kreditrechner', $atts );

      return '<div id="kreditrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">KREDITRECHNER</div>' .
        '        <div class="opt-header__switch-wrapper">' .
        '            <div class="opt-header__switch">RATE BERECHNEN</div>' .
        '            <div class="opt-header__switch">FINANZIERUNGSSUMME BERECHNEN</div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__heading">{bodyHeading}</div>' .
        '        <div class="opt-body__slider-input-wrapper">' .
        '            <div class="opt-body__slider-wrapper">' .
        '                <div class="opt-body__slider-text-above-wrapper">' .
        '                    <div class="opt-body__slider-text-above">{firstSliderFirstTextAbove}</div>' .
        '                    <div class="opt-body__slider-text-above">EUR</div>' .
        '                </div>' .
        '                <input id="FSSlider" type="range">' .
        '                <div class="opt-body__slider-text-below-wrapper">' .
        '                    <div class="opt-body__slider-text-below">{firstSliderFirstTextBelow}</div>' .
        '                    <div class="opt-body__slider-text-below">{firstSliderSecondTextBelow}</div>' .
        '                    <div class="opt-body__slider-text-below">{firstSliderThirdTextBelow}</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__input-wrapper"><input id="FSInput" class="opt-body__input">' .
        '                <div class="opt-body__input-label">EUR</div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__slider-input-wrapper">' .
        '            <div class="opt-body__slider-wrapper">' .
        '                <div class="opt-body__slider-text-above-wrapper">' .
        '                    <div class="opt-body__slider-text-above">Laufzeit</div>' .
        '                    <div class="opt-body__slider-text-above">Jahre</div>' .
        '                </div>' .
        '                <input id="LZSlider" type="range">' .
        '                <div class="opt-body__slider-text-below-wrapper">' .
        '                    <div class="opt-body__slider-text-below">10</div>' .
        '                    <div class="opt-body__slider-text-below">25</div>' .
        '                    <div class="opt-body__slider-text-below">40</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__input-wrapper"><input id="LZInput" class="opt-body__input">' .
        '                <div class="opt-body__input-label">Jahre</div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__slider-input-wrapper">' .
        '            <div class="opt-body__slider-wrapper">' .
        '                <div class="opt-body__slider-text-above-wrapper">' .
        '                    <div class="opt-body__slider-text-above">Zinssatz (p.a.)</div>' .
        '                    <div class="opt-body__slider-text-above">%</div>' .
        '                </div>' .
        '                <input id="ZSSlider" type="range">' .
        '                <div class="opt-body__slider-text-below-wrapper">' .
        '                    <div class="opt-body__slider-text-below">0,5</div>' .
        '                    <div class="opt-body__slider-text-below">5</div>' .
        '                    <div class="opt-body__slider-text-below">10</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__input-wrapper"><input id="ZSInput" class="opt-body__input">' .
        '                <div class="opt-body__input-label">%</div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__monthly-rate-text">{resultText}</div>' .
        '        <div class="opt-body__monthly-rate-input-wrapper">' .
        '            <div class="opt-body__input-wrapper"><input class="opt-body__input" disabled="">' .
        '                <div class="opt-body__input-label">EUR</div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">UNVERBINDLICHE ANFRAGE STELLEN</div>' .
        '    </div>' .
        '    <div class="opt-calc-example-wrapper">' .
        '        <div class="opt-calc-example-heading">Repräsentatives Rechenbeispiel</div>' .
        '        <div class="opt-calc-example-content"><b>Kreditvertrag mit einem Kreditbetrag von EUR 200.000,- besichert mit' .
        '            einer Hypothek Laufzeit 30 Jahre | Gesamtbetrag zu zahlen EUR 236.250,99</b><br><br>Gesamtkreditbetrag' .
        '            (tatsächlicher Auszahlungsbetrag) EUR 192.227,-<br>Kreditlaufzeit 30 Jahre = 360 Monate<br>Sollzinssatz' .
        '            1,125 % p.a.*)<br>Bearbeitungsspesen EUR 6.000,- **)<br>Grundbucheintragungsgebühr EUR 2.880,- ***)<br>Monatliche' .
        '            Kreditrate EUR 656,25<br>Effektiver Jahreszinssatz 1,400%<br>Gesamtbetrag zu zahlen EUR 236.250,99<br><br>*)' .
        '            Kondition: abhängig von Bonität, Volumen, Laufzeit, Verwendungszweck und Besicherung.<br>**) Einmalig 3% vom' .
        '            Kreditnominale.<br>***) Einmalige Gebühr: 1,2% vom Kreditnominale zzgl. 20% Nebengebührensicherung. Der' .
        '            Kreditvertrag ist durch ein grundbücherliches Pfandrecht zu besichern. Stand: 1. November 2017<br><br>Der' .
        '            Zinssatz für die individuellen Finanzierungsprojekte von mehr als 50% der Realfinanz Kunden läge unter' .
        '            Berücksichtigung der zu Grunde liegenden Sollzinsbindung und Annahmen aktuell bei 1,125% p.a. Sollzinssatz' .
        '            bzw. 1,400% p.a. effektiver Jahreszinssatz. Die Ermittlung des effektiven Jahreszinssatzes erfolgte mit' .
        '            folgenden Parametern: Rückzahlung in 360 monatlichen Pauschalraten; 3% Bearbeitungsgebühr bzw.' .
        '            Vermittlungsvergütung des nominalen Kreditbetrages; Grundbuchseintragungsgebühr 1,2% vom Kreditnominale' .
        '            zzgl. Nebengebührensicherstellung, Schätzgebühr EUR 399,00; Beurkundungsgebühr EUR 450,00 (gibt es' .
        '            eigentlich fast nirgendwo mehr); Legitimationsentgelt EUR 90,00; Abfrage KSV und GB Auszug je € 28,00.' .
        '            Sämtliche Werte in der Berechnung verstehen sich als unverbindliche Richtwerte und sind von Bonität,' .
        '            Volumen, Laufzeit, Verwendungszweck und Besicherung abhängig.<br></div>' .
        '    </div>'.
        ' </div>';
    }

    add_shortcode("kreditrechner", "opti_forms_kreditrechner");
}

if(!function_exists('opti_forms_umschuldungsrechner')) {
    function opti_forms_umschuldungsrechner ($atts) {
      wp_enqueue_script('umschuldungsrechner_js', plugin_dir_url( __FILE__ ) . 'js/umschuldungsrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/umschuldungsrechner.js'));
      wp_enqueue_style('umschuldungsrechner_css', plugin_dir_url( __FILE__ ) . 'css/umschuldungsrechner.css', [], sha1_file(plugin_dir_path( __FILE__ ) . 'css/umschuldungsrechner.css'));
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "color5" => false,
        "color6" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'umschuldungsrechner_js', 'shortcode_atts_umschuldungsrechner', $atts );

      return '<div id="umschuldungsrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">UMSCHULDUNGSRECHNER</div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__section-one">' .
        '            <div class="opt-body__section-heading">Aktueller Kredit</div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Kreditrestbetrag</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="KRBInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">EUR</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="KRBSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">1.000.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Aktuelle Rate</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="ARInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">EUR</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="ARSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-two">' .
        '            <div class="opt-body__section-heading">Umschuldung</div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Restlaufzeit <br>in Monaten</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="RLZInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">Monate</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="RLZSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">12</div>' .
        '                        <div class="opt-body__slider-text-below">480</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Laufzeit neuer Kredit in Monaten</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="LZNKInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">Monate</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="LZNKSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">12</div>' .
        '                        <div class="opt-body__slider-text-below">480</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Zinssatz neuer Kredit</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="ZSNKInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">%</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="ZSNKSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0,5</div>' .
        '                        <div class="opt-body__slider-text-below">10</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__new-rate-wrapper">' .
        '                    <div class="opt-body__new-rate-text">NEUE RATE</div>' .
        '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" disabled="">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-three">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Kreditsumme</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">123.456</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">monatliche Differenz</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">– 240,72</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-four">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Gesamtdifferenz</div>' .
        '                    <div class="opt-body__text">Ersparnis</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">– 57.773</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' .
        '    </div>' .
        '    <div class="opt-calc-example-wrapper">' .
        '        <div class="opt-calc-example-heading">Repräsentatives Rechenbeispiel</div>' .
        '        <div class="opt-calc-example-content"><b>Kreditvertrag mit einem Kreditbetrag von EUR 200.000,- besichert mit' .
        '            einer Hypothek Laufzeit 30 Jahre | Gesamtbetrag zu zahlen EUR 236.250,99</b><br><br>Gesamtkreditbetrag' .
        '            (tatsächlicher Auszahlungsbetrag) EUR 192.227,-<br>Kreditlaufzeit 30 Jahre = 360 Monate<br>Sollzinssatz' .
        '            1,125 % p.a.*)<br>Bearbeitungsspesen EUR 6.000,- **)<br>Grundbucheintragungsgebühr EUR 2.880,- ***)<br>Monatliche' .
        '            Kreditrate EUR 656,25<br>Effektiver Jahreszinssatz 1,400%<br>Gesamtbetrag zu zahlen EUR 236.250,99<br><br>*)' .
        '            Kondition: abhängig von Bonität, Volumen, Laufzeit, Verwendungszweck und Besicherung.<br>**) Einmalig 3% vom' .
        '            Kreditnominale.<br>***) Einmalige Gebühr: 1,2% vom Kreditnominale zzgl. 20% Nebengebührensicherung. Der' .
        '            Kreditvertrag ist durch ein grundbücherliches Pfandrecht zu besichern. Stand: 1. November 2017<br><br>Der' .
        '            Zinssatz für die individuellen Finanzierungsprojekte von mehr als 50% der Realfinanz Kunden läge unter' .
        '            Berücksichtigung der zu Grunde liegenden Sollzinsbindung und Annahmen aktuell bei 1,125% p.a. Sollzinssatz' .
        '            bzw. 1,400% p.a. effektiver Jahreszinssatz. Die Ermittlung des effektiven Jahreszinssatzes erfolgte mit' .
        '            folgenden Parametern: Rückzahlung in 360 monatlichen Pauschalraten; 3% Bearbeitungsgebühr bzw.' .
        '            Vermittlungsvergütung des nominalen Kreditbetrages; Grundbuchseintragungsgebühr 1,2% vom Kreditnominale' .
        '            zzgl. Nebengebührensicherstellung, Schätzgebühr EUR 399,00; Beurkundungsgebühr EUR 450,00 (gibt es' .
        '            eigentlich fast nirgendwo mehr); Legitimationsentgelt EUR 90,00; Abfrage KSV und GB Auszug je € 28,00.' .
        '            Sämtliche Werte in der Berechnung verstehen sich als unverbindliche Richtwerte und sind von Bonität,' .
        '            Volumen, Laufzeit, Verwendungszweck und Besicherung abhängig.<br></div>' .
        '    </div>'.
        ' </div>';
    }

    add_shortcode("umschuldungsrechner", "opti_forms_umschuldungsrechner");
}

if(!function_exists('opti_forms_haushaltsbudgetrechner')) {
    function opti_forms_haushaltsbudgetrechner ($atts) {
      wp_enqueue_script('haushaltsbudgetrechner_js', plugin_dir_url( __FILE__ ) . 'js/haushaltsbudgetrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/haushaltsbudgetrechner.js'));
      wp_enqueue_style('haushaltsbudgetrechner_css', plugin_dir_url( __FILE__ ) . 'css/haushaltsbudgetrechner.css', [], sha1_file(plugin_dir_path( __FILE__ ) . 'css/haushaltsbudgetrechner.css'));
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "color5" => false,
        "color6" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'haushaltsbudgetrechner_js', 'shortcode_atts_haushaltsbudgetrechner', $atts );

      return '<div id="haushaltsbudgetrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">HAUSHALTSBUDGETRECHNER</div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__section-one">' .
        '            <div class="opt-body__section-heading">Einnahmen</div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">monatliche Einnahmen aller Kreditnehmer</div>' .
        '                    </div>' .
        '                    <input id="MEAKSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">20.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="MEAKInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-two">' .
        '            <div class="opt-body__section-heading">Ausgaben</div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Betriebskosten (ca.&nbsp;€&nbsp;2,20&nbsp;pro&nbsp;m2)</div>' .
        '                    </div>' .
        '                    <input id="BKSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">500</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="BKInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Medien (ORF/Kabel/Internet/Telefon)</div>' .
        '                    </div>' .
        '                    <input id="MSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">500</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="MInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">KFZ (inkl. Kauf, Wartung, Unterhalt)</div>' .
        '                    </div>' .
        '                    <input id="KFZSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="KFZInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">zu zahlende Alimente</div>' .
        '                    </div>' .
        '                    <input id="ASlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="AInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Sparformen</div>' .
        '                    </div>' .
        '                    <input id="SFSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="SFInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Haushalts-/&#8203;Eigenheimversicherungen</div>' .
        '                    </div>' .
        '                    <input id="HVSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="HVInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Personen-/&#8203;Lebensversicherungen</div>' .
        '                    </div>' .
        '                    <input id="PVSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="PVInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">bestehende Kredite</div>' .
        '                    </div>' .
        '                    <input id="KSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="KInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Wohnbauförderung Rückzahlung</div>' .
        '                    </div>' .
        '                    <input id="WFRSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="WFRInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-input-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Lebenshaltungskosten (mind.: 1 Person: € 450,- / 2' .
        '                            Personen: € 700,-)' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="LHKSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">5.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__input-wrapper"><input id="LHKInput" class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-three">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Einnahmen</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">4.000</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Ausgaben</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">2.000</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-four">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">frei verfügbares Einkommen</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">2.000</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' .
        '    </div>'.
        ' </div>';
    }

    add_shortcode("haushaltsbudgetrechner", "opti_forms_haushaltsbudgetrechner");
}

if(!function_exists('opti_forms_hauskostenrechner')) {
    function opti_forms_hauskostenrechner ($atts) {
      wp_enqueue_script('hauskostenrechner_js', plugin_dir_url( __FILE__ ) . 'js/hauskostenrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/hauskostenrechner.js'));
      wp_enqueue_style('hauskostenrechner_css', plugin_dir_url( __FILE__ ) . 'css/hauskostenrechner.css', [], sha1_file(plugin_dir_path( __FILE__ ) . 'css/hauskostenrechner.css'));
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'hauskostenrechner_js', 'shortcode_atts_hauskostenrechner', $atts );

      return '<div id="hauskostenrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">HAUSKOSTENRECHNER</div>' .
        '        <div class="opt-header__switch-wrapper">' .
        '            <div class="opt-header__switch">HAUS MASSIV</div>' .
        '            <div class="opt-header__switch">FERTIGTEILHAUS</div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__content">' .
        '            <div class="opt-body__heading">Grundstück</div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Kaufpreis Grundstück</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Grundbuchseintragung 1,1 %</div>' .
        '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Grunderwerbsteuer 3,5 %</div>' .
        '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Immobilienmakler</div>' .
        '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper opt-body__text-input-wrapper--summary">' .
        '                <div class="opt-body__text">GRUNDSTÜCKSKOSTEN GESAMT</div>' .
        '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__heading opt-body__heading--extra-padding">Gebäude</div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Hausanschlusskosten<br>(Strom, Gas, Wasser, Kanal)</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Aufschließungsgebühren & Vermessung</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection3Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Fundamentplatte, Keller</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Erdarbeiten/Baggerarbeiten</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection6Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection7Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection8Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection9Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection10Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection11Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">{secondSection12Heading}</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Böden im Innenraum</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Sanitär/Badausstattung</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Küchenausstattung</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Carport, Garage</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Außenanlagen</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Fertigstellungsarbeiten</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper">' .
        '                <div class="opt-body__text">Sonstiges Reserve</div>' .
        '                <div class="opt-body__input-wrapper"><input class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__text-input-wrapper opt-body__text-input-wrapper--summary">' .
        '                <div class="opt-body__text">GEBÄUDEKOSTEN GESAMT</div>' .
        '                <div class="opt-body__input-wrapper"><input disabled class="opt-body__input">' .
        '                    <div class="opt-body__input-label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__summary">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__summary-text">Summe</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">0</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' .
        '    </div> '.
        '</div>';
    }

    add_shortcode("hauskostenrechner", "opti_forms_hauskostenrechner");
}

if(!function_exists('opti_forms_nebenkostenrechner')) {
    function opti_forms_nebenkostenrechner ($atts) {

      wp_enqueue_script('nebenkostenrechner_js', plugin_dir_url( __FILE__ ) . 'js/nebenkostenrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/nebenkostenrechner.js'));
      wp_enqueue_style('nebenkostenrechner_css', plugin_dir_url( __FILE__ ) . 'css/nebenkostenrechner.css', [], sha1_file(plugin_dir_path( __FILE__ ) . 'css/nebenkostenrechner.css'));
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "hide_side_costs" => false,
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'nebenkostenrechner_js', 'shortcode_atts_nebenkostenrechner', $atts );

      return '<div id="nebenkostenrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">NEBENKOSTENRECHNER</div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__sliders">' .
        '            <div class="opt-body__slider-wrapper">' .
        '                <div class="opt-body__slider-text-above-wrapper">' .
        '                    <div class="opt-body__slider-text-above">Kaufpreis</div>' .
        '                    <div class="opt-body__input-wrapper"><input id="KPInput" class="opt-body__input">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <input id="KPSlider" type="range">' .
        '                <div class="opt-body__slider-text-below-wrapper">' .
        '                    <div class="opt-body__slider-text-below">0</div>' .
        '                    <div class="opt-body__slider-text-below">1.000.000</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-wrapper">' .
        '                <div class="opt-body__slider-text-above-wrapper">' .
        '                    <div class="opt-body__slider-text-above">Provision <br>Immobilienmakler</div>' .
        '                    <div class="opt-body__input-wrapper"><input id="PIInput" class="opt-body__input">' .
        '                        <div class="opt-body__input-label">%</div>' .
        '                    </div>' .
        '                </div>' .
        '                <input id="PISlider" type="range">' .
        '                <div class="opt-body__slider-text-below-wrapper">' .
        '                    <div class="opt-body__slider-text-below">0</div>' .
        '                    <div class="opt-body__slider-text-below">3</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__slider-wrapper">' .
        '                <div class="opt-body__slider-text-above-wrapper">' .
        '                    <div class="opt-body__slider-text-above">Kaufvertragsgebühren</div>' .
        '                    <div class="opt-body__input-wrapper"><input id="KGInput" class="opt-body__input">' .
        '                        <div class="opt-body__input-label">%</div>' .
        '                    </div>' .
        '                </div>' .
        '                <input id="KGSlider" type="range">' .
        '                <div class="opt-body__slider-text-below-wrapper">' .
        '                    <div class="opt-body__slider-text-below">0</div>' .
        '                    <div class="opt-body__slider-text-below">3</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__info">' .
        '            <div class="opt-body__info-section">' .
        '                <div class="opt-body__row-wrapper">' .
        '                    <div class="opt-body__text">Grund&shy;erwerb&shy;steuer</div>' .
        '                    <div class="opt-body__number-label-wrapper">' .
        '                        <div class="opt-body__number">– 57.773</div>' .
        '                        <div class="opt-body__label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__row-wrapper">' .
        '                    <div class="opt-body__text">Grundbuch&shy;eintragungs&shy;gebühr</div>' .
        '                    <div class="opt-body__number-label-wrapper">' .
        '                        <div class="opt-body__number">– 57.773</div>' .
        '                        <div class="opt-body__label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__row-wrapper">' .
        '                    <div class="opt-body__text">Provision Immobilienmakler</div>' .
        '                    <div class="opt-body__number-label-wrapper">' .
        '                        <div class="opt-body__number">– 57.773</div>' .
        '                        <div class="opt-body__label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__row-wrapper">' .
        '                    <div class="opt-body__text">Kaufvertrags&shy;gebühren&shy;kosten</div>' .
        '                    <div class="opt-body__number-label-wrapper">' .
        '                        <div class="opt-body__number">– 57.773</div>' .
        '                        <div class="opt-body__label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__row-wrapper">' .
        '                    <div class="opt-body__text">Finanzierungs&shy;nebenkosten</div>' .
        '                    <div class="opt-body__number-label-wrapper">' .
        '                        <div class="opt-body__number">– 57.773</div>' .
        '                        <div class="opt-body__label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__info-section">' .
        '                <div class="opt-body__row-wrapper">' .
        '                    <div class="opt-body__text">Summe</div>' .
        '                    <div class="opt-body__number-label-wrapper">' .
        '                        <div class="opt-body__number">– 57.773</div>' .
        '                        <div class="opt-body__label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' .
        '    </div>' .
        '</div>';
    }

    add_shortcode("nebenkostenrechner", "opti_forms_nebenkostenrechner");
}

if(!function_exists('opti_forms_effektivzinssatzrechner')) {
    function opti_forms_effektivzinssatzrechner ($atts) {
      wp_enqueue_script('effektivzinssatzrechner_js', plugin_dir_url( __FILE__ ) . 'js/effektivzinssatzrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/effektivzinssatzrechner.js'));
      wp_enqueue_style('effektivzinssatzrechner_css', plugin_dir_url( __FILE__ ) . 'css/effektivzinssatzrechner.css', [], sha1_file(plugin_dir_path( __FILE__ ) . 'css/effektivzinssatzrechner.css'));
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'effektivzinssatzrechner_js', 'shortcode_atts_effektivzinssatzrechner', $atts );

      return '<div id="effektivzinssatzrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">EFFEKTIVZINSSATZRECHNER</div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__content">' .
        '            <div class="opt-body__sliders">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Finanzierungs&shy;summe</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="FSInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">EUR</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="FSSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">500.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Laufzeit in Jahren</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="LZInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">Jahre</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="LZSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">40</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Nominalzinssatz</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="NZInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">%</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="NZSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">10</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__inputs">' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Bearbeitungs&shy;gebühr</div>' .
        '                    <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Gerichtliche <br>Eintragungsgebühr</div>' .
        '                    <div class="opt-body__input-wrapper"><input disabled class="opt-body__input opt-body__input--disabled">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Bewertung der Immobilie</div>' .
        '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="290">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Grundbuch&shy;prüfung</div>' .
        '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="50">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Treuhands&shy;abwicklung</div>' .
        '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="70">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Notar der Bank <br>für Beglaubigung</div>' .
        '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="158,29">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__text-input-wrapper">' .
        '                    <div class="opt-body__text">Kontoführung monatlich</div>' .
        '                    <div class="opt-body__input-wrapper"><input class="opt-body__input" value="5,97">' .
        '                        <div class="opt-body__input-label">EUR</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__summary">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__summary-text">Effektivzinssatz</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">0,75 %</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' .
        '    </div>' .
        '    <div class="opt-calc-example-wrapper">' .
        '        <div class="opt-calc-example-heading">Repräsentatives Rechenbeispiel</div>' .
        '        <div class="opt-calc-example-content"><b>Kreditvertrag mit einem Kreditbetrag von EUR 200.000,- besichert mit' .
        '            einer Hypothek Laufzeit 30 Jahre | Gesamtbetrag zu zahlen EUR 236.250,99</b><br><br>Gesamtkreditbetrag' .
        '            (tatsächlicher Auszahlungsbetrag) EUR 192.227,-<br>Kreditlaufzeit 30 Jahre = 360 Monate<br>Sollzinssatz' .
        '            1,125 % p.a.*)<br>Bearbeitungsspesen EUR 6.000,- **)<br>Grundbucheintragungsgebühr EUR 2.880,- ***)<br>Monatliche' .
        '            Kreditrate EUR 656,25<br>Effektiver Jahreszinssatz 1,400%<br>Gesamtbetrag zu zahlen EUR 236.250,99<br><br>*)' .
        '            Kondition: abhängig von Bonität, Volumen, Laufzeit, Verwendungszweck und Besicherung.<br>**) Einmalig 3% vom' .
        '            Kreditnominale.<br>***) Einmalige Gebühr: 1,2% vom Kreditnominale zzgl. 20% Nebengebührensicherung. Der' .
        '            Kreditvertrag ist durch ein grundbücherliches Pfandrecht zu besichern. Stand: 1. November 2017<br><br>Der' .
        '            Zinssatz für die individuellen Finanzierungsprojekte von mehr als 50% der Realfinanz Kunden läge unter' .
        '            Berücksichtigung der zu Grunde liegenden Sollzinsbindung und Annahmen aktuell bei 1,125% p.a. Sollzinssatz' .
        '            bzw. 1,400% p.a. effektiver Jahreszinssatz. Die Ermittlung des effektiven Jahreszinssatzes erfolgte mit' .
        '            folgenden Parametern: Rückzahlung in 360 monatlichen Pauschalraten; 3% Bearbeitungsgebühr bzw.' .
        '            Vermittlungsvergütung des nominalen Kreditbetrages; Grundbuchseintragungsgebühr 1,2% vom Kreditnominale' .
        '            zzgl. Nebengebührensicherstellung, Schätzgebühr EUR 399,00; Beurkundungsgebühr EUR 450,00 (gibt es' .
        '            eigentlich fast nirgendwo mehr); Legitimationsentgelt EUR 90,00; Abfrage KSV und GB Auszug je € 28,00.' .
        '            Sämtliche Werte in der Berechnung verstehen sich als unverbindliche Richtwerte und sind von Bonität,' .
        '            Volumen, Laufzeit, Verwendungszweck und Besicherung abhängig.<br></div>' .
        '    </div>'.
        '</div>';
    }

    add_shortcode("effektivzinssatzrechner", "opti_forms_effektivzinssatzrechner");
}

if(!function_exists('opti_forms_kaufenodermietenrechner')) {
    function opti_forms_kaufenodermietenrechner ($atts) {
      wp_enqueue_script('kaufenodermietenrechner_js', plugin_dir_url( __FILE__ ) . 'js/kaufenodermietenrechner.js', [], sha1_file(plugin_dir_path( __FILE__ ) . 'js/kaufenodermietenrechner.js'));
      wp_enqueue_style('kaufenodermietenrechner_css', plugin_dir_url( __FILE__ ) . 'css/kaufenodermietenrechner.css', [], sha1_file(plugin_dir_path( __FILE__ ) . 'css/kaufenodermietenrechner.css'));
      $atts = shortcode_atts(array(
        "opti_pid" => "schantl",
        "opti_purl" => "test",
        "utm_medium" => "affiliate",
        "utm_campaign" => "link",
        "color1" => false,
        "color2" => false,
        "color3" => false,
        "color4" => false,
        "color5" => false,
        "color6" => false,
        "include_inquiry_form" => false,
        "show_background" => false,
      ), $atts);
      wp_localize_script( 'kaufenodermietenrechner_js', 'shortcode_atts_kaufenodermietenrechner', $atts );

      return '<div id="kaufenodermietenrechner">'.
        '    <div class="opt-header">' .
        '        <div class="opt-header__background"></div>' .
        '        <div class="opt-header__text">KAUFEN ODER MIETEN RECHNER</div>' .
        '    </div>' .
        '    <div class="opt-body">' .
        '        <div class="opt-body__background"></div>' .
        '        <div class="opt-body__section-one">' .
        '            <div class="opt-body__section-heading">Miete</div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">monatliche Kaltmiete</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="MKMInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">EUR</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="MKMSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">2.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Mietsteigerung pro Jahr</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="MSInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">%</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="MSSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">1</div>' .
        '                        <div class="opt-body__slider-text-below">10</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-two">' .
        '            <div class="opt-body__section-heading">Kauf</div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">monatliche Kreditrate</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="MKRInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">EUR</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="MKRSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">2.000</div>' .
        '                    </div>' .
        '                </div>' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Laufzeit Kredit in Jahren</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="LZInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">Jahre</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="LZSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">40</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__slider-wrapper">' .
        '                    <div class="opt-body__slider-text-above-wrapper">' .
        '                        <div class="opt-body__slider-text-above">Vergleichs&shy;zeitraum in Jahren</div>' .
        '                        <div class="opt-body__input-wrapper"><input id="VZInput" class="opt-body__input">' .
        '                            <div class="opt-body__input-label">Jahre</div>' .
        '                        </div>' .
        '                    </div>' .
        '                    <input id="VZSlider" type="range">' .
        '                    <div class="opt-body__slider-text-below-wrapper">' .
        '                        <div class="opt-body__slider-text-below">0</div>' .
        '                        <div class="opt-body__slider-text-below">80</div>' .
        '                    </div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-three">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Ausgaben Kredit</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">123.456</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Ausgaben Miete</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">– 240,72</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Monatsmiete am Ende</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">– 240,72</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '        <div class="opt-body__section-four">' .
        '            <div class="opt-body__row-wrapper">' .
        '                <div class="opt-body__text-wrapper">' .
        '                    <div class="opt-body__text">Differenz Kauf&nbsp;zu&nbsp;Miete</div>' .
        '                </div>' .
        '                <div class="opt-body__number-label-wrapper">' .
        '                    <div class="opt-body__number">– 57.773</div>' .
        '                    <div class="opt-body__label">EUR</div>' .
        '                </div>' .
        '            </div>' .
        '        </div>' .
        '    </div>' .
        '    <div class="opt-inquiry-button-wrapper">' .
        '        <div class="opt-inquiry-button">ZUR FINANZIERUNGSANFRAGE</div>' .
        '    </div>' .
        '    <div class="opt-calc-example-wrapper">' .
        '        <div class="opt-calc-example-heading">Repräsentatives Rechenbeispiel</div>' .
        '        <div class="opt-calc-example-content"><b>Kreditvertrag mit einem Kreditbetrag von EUR 200.000,- besichert mit' .
        '            einer Hypothek Laufzeit 30 Jahre | Gesamtbetrag zu zahlen EUR 236.250,99</b><br><br>Gesamtkreditbetrag' .
        '            (tatsächlicher Auszahlungsbetrag) EUR 192.227,-<br>Kreditlaufzeit 30 Jahre = 360 Monate<br>Sollzinssatz' .
        '            1,125 % p.a.*)<br>Bearbeitungsspesen EUR 6.000,- **)<br>Grundbucheintragungsgebühr EUR 2.880,- ***)<br>Monatliche' .
        '            Kreditrate EUR 656,25<br>Effektiver Jahreszinssatz 1,400%<br>Gesamtbetrag zu zahlen EUR 236.250,99<br><br>*)' .
        '            Kondition: abhängig von Bonität, Volumen, Laufzeit, Verwendungszweck und Besicherung.<br>**) Einmalig 3% vom' .
        '            Kreditnominale.<br>***) Einmalige Gebühr: 1,2% vom Kreditnominale zzgl. 20% Nebengebührensicherung. Der' .
        '            Kreditvertrag ist durch ein grundbücherliches Pfandrecht zu besichern. Stand: 1. November 2017<br><br>Der' .
        '            Zinssatz für die individuellen Finanzierungsprojekte von mehr als 50% der Realfinanz Kunden läge unter' .
        '            Berücksichtigung der zu Grunde liegenden Sollzinsbindung und Annahmen aktuell bei 1,125% p.a. Sollzinssatz' .
        '            bzw. 1,400% p.a. effektiver Jahreszinssatz. Die Ermittlung des effektiven Jahreszinssatzes erfolgte mit' .
        '            folgenden Parametern: Rückzahlung in 360 monatlichen Pauschalraten; 3% Bearbeitungsgebühr bzw.' .
        '            Vermittlungsvergütung des nominalen Kreditbetrages; Grundbuchseintragungsgebühr 1,2% vom Kreditnominale' .
        '            zzgl. Nebengebührensicherstellung, Schätzgebühr EUR 399,00; Beurkundungsgebühr EUR 450,00 (gibt es' .
        '            eigentlich fast nirgendwo mehr); Legitimationsentgelt EUR 90,00; Abfrage KSV und GB Auszug je € 28,00.' .
        '            Sämtliche Werte in der Berechnung verstehen sich als unverbindliche Richtwerte und sind von Bonität,' .
        '            Volumen, Laufzeit, Verwendungszweck und Besicherung abhängig.<br></div>' .
        '    </div>'.
        '</div>';
    }

    add_shortcode("kaufenodermietenrechner", "opti_forms_kaufenodermietenrechner");
}
