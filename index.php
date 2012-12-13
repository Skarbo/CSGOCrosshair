<?php
// Please do not hold me accountable for the code. Its...pretty ugly.

$localhost = strpos( $_SERVER[ "HTTP_HOST" ], "localhost" ) !== false;
$imgPath = $localhost ? "img/" : "https://s3.amazonaws.com/csgo-crosshair-generator/img/";
$javascript = $localhost ? "javascript/" : "https://s3.amazonaws.com/csgo-crosshair-generator/javascript/";
$css = $localhost ? "css/" : "https://s3.amazonaws.com/csgo-crosshair-generator/css/";
$jquery = $localhost ? "javascript/jquery-1.8.3.min.js" : "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js";
$kineticjs = $localhost ? "javascript/kinetic-v4.1.2.min.js" : "http://kineticjs.com/download/v4.1.2/kinetic-v4.1.2.min.js";
?>
<!DOCTYPE HTML PUBLIC "-/W3C/DTD HTML 4.01 Transitional/EN\" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta charset='utf-8'>
<!--
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
-->
<meta http-equiv="cache-control" content="public" />
<meta http-equiv="expires" content="Tue, 01 Jan 2050 1:00:00 GMT" />
<title>CS:GO Crosshair Generator</title>
<link rel="shortcut icon" href="favicon.ico" />
<meta name="keywords"
    content="CS:GO, Counter Strike, Global Offensive, Crosshair, Generator">
<meta name="description"
    content="Counter-Strike:Global Offensive Crosshair Generator">
<meta property="og:title" content="CS:GO Crosshair Generator" />
<meta property="og:description"
    content="Counter-Strike:Global Offensive Crosshair Generator" />
<meta property="og:image" content="<?php echo $imgPath; ?>image.png" />
<base href="" target="_blank">
<link rel="image_src" href="<?php echo $imgPath; ?>image.png" />
<script type="text/javascript" src="<?php echo $jquery; ?>"></script>
<script type="text/javascript"
    src="<?php echo $javascript; ?>jquery.history.js"></script>
<script type="text/javascript" src="<?php echo $kineticjs; ?>"></script>
<script type="text/javascript"
    src="<?php echo $javascript; ?>jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript"
    src="<?php echo $javascript; ?>spectrum.js"></script>
<script type="text/javascript" src="javascript/javascript.min.js"></script>
<link rel="stylesheet"
    href="css/ui-lightness/jquery-ui-1.9.2.custom.min.css">
<link rel="stylesheet" href="<?php echo $css; ?>spectrum.css">
<link rel="stylesheet" href="css/css.css">
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16538668-3']);
  _gaq.push(['_setDomainName', 'krisskarbo.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
<body>

    <div id="wrapper">

        <div id="wrapper_table">
            <div>
                <h1>CS:GO Crosshair Generator</h1>
                <div id="container_wrapper">
                    <div id="container">
                        <img alt="CS:GO Crosshair Generator"
                            src="<?php echo $imgPath; ?>image.png"
                            height="450" width="650">
                    </div>
                </div>
                <div class="tip" style="text-align: center;">Move the
                    crosshair around to see how it looks on different
                    surfaces, click to lock it</div>
                <div id="backgrounds"></div>
            </div>
            <div>

                <div class="tabs_wrapper">
                    <div class="tabs">
                        <div>
                            <div for="controls" class="selected">Crosshair</div>
                            <div for="binds_tab">Binds</div>
                            <div id="add_bind"
                                title="Add crosshair to binds">+</div>
                        </div>
                    </div>
                    <div class="tab_content">
                        <div class="selected" id="controls">
                            <form autocomplete="off">
                                <table id="controls_table">
                                    <tr>
                                        <td><span
                                            title="<table
                                            class=title><tr>
                                                    <td>cl_crosshairstyle
                                                    <td>0
                                                    <td>Default dynamic
                                                <tr>
                                                    <td>
                                                    <td>1
                                                    <td>Default static
                                                <tr>
                                                    <td>
                                                    <td>2
                                                    <td>Classic normal
                                                <tr>
                                                    <td>
                                                    <td>3
                                                    <td>Classic dynamic
                                                </tr>
                                                <tr>
                                                    <td>
                                                    <td>4
                                                    <td>Classic static
                                                </tr>

                                </table>
                                ">Style</span>
                                </td>
                                <td></td>
                                <td colspan="5" id="crosshair_style"
                                    class="fillwidth">
                                    <div id="crosshair_style_type">
                                        <input type="radio"
                                            id="crosshair_style_default"
                                            name="radio" value="default" /><label
                                            for="crosshair_style_default">Default</label>
                                        <input type="radio"
                                            id="crosshair_style_classic"
                                            name="radio" value="classic" /><label
                                            for="crosshair_style_classic">Classic</label>
                                    </div>
                                    <input type="checkbox"
                                    id="crosshair_style_dynamic" /><label
                                    for="crosshair_style_dynamic">Dynamic</label>
                                </td>
                                </tr>
                                <tr>
                                    <td><span
                                        title="<table
                                        class=title><tr>
                                                <td>cl_crosshairalpha</td>
                                                <td>0-255</td>
                                            </tr>
                                            <tr>
                                                <td>cl_crossusealpha</td>
                                                <td>0/1</td>
                                            </tr>
                                            </table>">Alpha</span></td>
                                    <td><img
                                        src="img/crosshair_alpha_0.png" /></td>
                                    <td class="fillwidth"><div
                                            id="crosshair_alpha_slider"
                                            class="slider"></div></td>
                                    <td><input class="spinner"
                                        id="crosshair_alpha_spinner" /></td>
                                    <td><img
                                        src="img/crosshair_alpha_1.png" /></td>
                                    <td id="crosshair_usealpha_wrapper"><input
                                        type="checkbox"
                                        id="crosshair_usealpha" /><label
                                        for="crosshair_usealpha"></label></td>
                                </tr>
                                <tr>
                                    <td><span
                                        title="<table
                                        class=title><tr>
                                                <td>cl_crosshairthickness</td>
                                            </tr>
                                            </table>">Thickness</span></td>
                                    <td><img
                                        src="img/crosshair_thickness_0.png" />
                                    </td>
                                    <td class="fillwidth">
                                        <div
                                            id="crosshair_thickness_slider"
                                            class="slider"></div>
                                    </td>
                                    <td><input class="spinner"
                                        id="crosshair_thickness_spinner" /></td>
                                    <td><img
                                        src="img/crosshair_thickness_1.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <td><span
                                        title="<table
                                        class=title><tr>
                                                <td>cl_crosshairsize</td>
                                            </tr>
                                            </table>">Size</span></td>
                                    <td><img
                                        src="img/crosshair_size_0.png" /></td>
                                    <td class="fillwidth"><div
                                            id="crosshair_size_slider"
                                            class="slider"></div></td>
                                    <td><input class="spinner"
                                        id="crosshair_size_spinner" /></td>
                                    <td><img
                                        src="img/crosshair_size_1.png" /></td>
                                </tr>
                                <tr>
                                    <td><span
                                        title="<table
                                        class=title><tr>
                                                <td>cl_crosshairgap</td>
                                            </tr>
                                            </table>">Gap</span></td>
                                    <td><img
                                        src="img/crosshair_gap_0.png" /></td>
                                    <td class="fillwidth"><div
                                            id="crosshair_gap_slider"
                                            class="slider"></div></td>
                                    <td><input class="spinner"
                                        id="crosshair_gap_spinner" /></td>
                                    <td><img
                                        src="img/crosshair_gap_1.png" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="4"><span
                                        title="<table
                                        class=title><tr>
                                                <td>cl_crosshaircolor</td>
                                                <td>1-4</td>
                                                <td>Predefined</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>5</td>
                                                <td>Custom</td>
                                            </tr>
                                            <tr>
                                                <td>cl_crosshaircolor_r</td>
                                                <td>0-255</td>
                                                <td>Red</td>
                                            </tr>
                                            <tr>
                                                <td>cl_crosshaircolor_g</td>
                                                <td>0-255</td>
                                                <td>Green</td>
                                            </tr>
                                            <tr>
                                                <td>cl_crosshaircolor_b</td>
                                                <td>0-255</td>
                                                <td>Blue</td>
                                            </tr>
                                            </table>">Color</span></td>
                                    <td></td>
                                    <td colspan="4">
                                        <div id="crosshair_color_type">
                                            <input type="radio"
                                                id="crosshair_color_1"
                                                name="radio" value="1" /><label
                                                for="crosshair_color_1">Green</label>
                                            <input type="radio"
                                                id="crosshair_color_2"
                                                name="radio" value="2" /><label
                                                for="crosshair_color_2">Yellow</label>
                                            <input type="radio"
                                                id="crosshair_color_3"
                                                name="radio" value="3" /><label
                                                for="crosshair_color_3">Blue</label>
                                            <input type="radio"
                                                id="crosshair_color_4"
                                                name="radio" value="4" /><label
                                                for="crosshair_color_4">Cyan</label>
                                            <input type="radio"
                                                id="crosshair_color_5"
                                                name="radio" value="5" /><label
                                                for="crosshair_color_5">Custom</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="fillwidth">
                                        <div
                                            id="crosshair_color_r_slider"
                                            class="slider"></div>
                                    </td>
                                    <td><input class="spinner"
                                        id="crosshair_color_r_spinner" /></td>
                                    <td rowspan="3" colspan="2">
                                        <div id="crosshair_color">
                                            <input type='text'
                                                id="crosshair_color_palette" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="fillwidth">
                                        <div
                                            id="crosshair_color_g_slider"
                                            class="slider"></div>
                                    </td>
                                    <td><input class="spinner"
                                        id="crosshair_color_g_spinner" /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="fillwidth">
                                        <div
                                            id="crosshair_color_b_slider"
                                            class="slider"></div>
                                    </td>
                                    <td><input class="spinner"
                                        id="crosshair_color_b_spinner" /></td>
                                </tr>

                                <tr>
                                    <td><span
                                        title="<table
                                        class=title><tr>
                                                <td>cl_crosshairdot</td>
                                                <td>0/1</td>
                                            </tr>
                                            </table>">Dot</span></td>
                                    <td></td>
                                    <td id="crosshair_dot_wrapper"
                                        class="fillwidth"><input
                                        type="checkbox"
                                        id="crosshair_dot" /><label
                                        for="crosshair_dot">&nbsp;</label></td>
                                </tr>

                                <tr>
                                    <td>Preset</td>
                                    <td></td>
                                    <td colspan="4" class="fillwidth"><div
                                            data-template="def"
                                            class="crosshair_template">Default</div>
                                        <div data-template="dot"
                                            class="crosshair_template">Dot</div>
                                        <div data-template="cross"
                                            class="crosshair_template">Cross</div>
                                        <div data-template="16"
                                            class="crosshair_template">1.6</div>
                                        <div
                                            id="crosshair_template_players">
                                            <i>Players</i>
                                        </div>
                                        <ul>
                                            <li><a href="#"
                                                data-template="hatton">Hatton</a></li>
                                            <li><a href="#"
                                                data-template="nip_getright">NiP
                                                    GeT_RiGhT</a></li>
                                            <li><a href="#"
                                                data-template="nip_forest">NiP
                                                    f0rest</a></li>
                                            <li><a href="#"
                                                data-template="nip_friberg">NiP
                                                    friberg</a></li>
                                            <li><a href="#"
                                                data-template="nip_xizt">NiP
                                                    Xizt</a></li>
                                            <li><a href="#"
                                                data-template="nip_fifflaren">NiP
                                                    Fifflaren</a></li>
                                        </ul></td>
                                </tr>

                                <tr>
                                    <td>Config</td>
                                    <td colspan="5"><textarea
                                            id="crosshair_config"
                                            spellcheck="false"
                                            autocomplete="off" wrap="off"></textarea>
                                        <div class="tip">Copy/paste
                                            variables to config or
                                            config to textfield</div> <input
                                        id="crosshair_config_console"
                                        readonly="readonly">
                                        <div class="tip">Copy/paste
                                            variables directly into
                                            console</div></td>
                                </tr>

                                </table>

                            </form>
                        </div>
                        <div id="binds_tab">
                            <form autocomplete="off">

                                <table id="binds_tab_table">
                                    <tr>
                                        <td>Crosshairs</td>
                                        <td>
                                            <table id="bind_crosshairs">
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr class="bind">
                                                        <td>
                                                            <input type="hidden"
                                                            name="bind_crosshair" />
                                                            <div class="bind_crosshair_canvas"></div>
                                                        </td>
                                                        <td><input
                                                            name="bind_key" placeholder="Key" disabled="disabled" />
                                                            <!-- <div
                                                                class="bind_key_more ui-state-default ui-corner-all">
                                                                <span
                                                                    class="ui-icon ui-icon-carat-1-s"></span>
                                                            </div> -->
                                                            </td>
                                                            <td>
                                                                <div class="bind_key_keyboard"><img src="img/keyboard.png" alt="keyboard"/></div>
                                                            </td>
                                                        <td clasS="bind_name"><input placeholder="Name"
                                                            name="bind_name" disabled="disabled" /></td>
                                                        <td>
                                                            <div class="add_bind ui-state-default ui-corner-all" title="Add current crosshair">
                                                                <span class="ui-icon ui-icon-plus"></span>
                                                            </div>
                                                            <div class="remove_bind hide ui-state-default ui-corner-all" title="Remove crosshair bind">
                                                                <span class="ui-icon ui-icon-trash"></span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </td>
                                    <tr>
                                        <td>Other</td>
                                        <td>
                                            <table id="bind_binds">
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr class="bind">
                                                        <td><div style="height: 19px; width: 21px;">&nbsp;</div></td>
                                                        <td><input name="bind_key" placeholder="Key" disabled="disabled" />
                                                        </td>
                                                        <td>
                                                            <div class="bind_key_keyboard hidden"><img src="img/keyboard.png" alt="keyboard"/></div>
                                                        </td>
                                                        <td>
                                                            <div class="bind_type">
                                                                <div class="bind_type_value"><i>Type</i></div>
                                                            <div class="bind_type_drop bind_key_more ui-state-default ui-corner-all">
                                                                <span class="ui-icon ui-icon-carat-1-s"></span>
                                                            </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="remove_bind hide ui-state-default ui-corner-all" title="Remove bind">
                                                                <span class="ui-icon ui-icon-trash"></span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Autoexec
                                            <div style="display: inline-block; cursor: pointer; vertical-align: middle; margin-left: 0.2em;" id="empty_autoexec" class="ui-state-default ui-corner-all" title="Remove all binds">
                                                <span class="ui-icon ui-icon-trash"></span>
                                            </div>
                                        </td>
                                        <td><textarea spellcheck="false" id="binds_autoexes" rows="" cols="" wrap="off"></textarea>
                                        <div class="tip">Copy textfield into your autoexec or paste your autoexec into textfield<br />Type 'binds' in console to get list of commands</div>
                                        </td>
                                    </tr>

                                </table>

                                <div id="bind_binds_type">
                                    <div><a href="#" data-type="toggle">Toggle Crosshairs</a></div>
                                    <div><a href="#" data-type="toggle_dot">Toggle Dot</a></div>
                                    <div><a href="#" data-type="size_inc">Size Inc</a></div>
                                    <div><a href="#" data-type="size_dec">Size Dec</a></div>
                                    <div><a href="#" data-type="thickness_inc">Thickness Inc</a></div>
                                    <div><a href="#" data-type="thickness_dec">Thickness Dec</a></div>
                                    <div><a href="#" data-type="gap_inc">Gap Inc</a></div>
                                    <div><a href="#" data-type="gap_dec">Gap Dec</a></div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="tip" style="text-align: center;">
                        Share crosshair by copying URL - <a
                            href="http://www.hattongames.com/2012/06/how-to-create-an-autoexec-file-for-csgo/"
                            target="_blank">How to create an autoexec</a>
                    </div>

                </div>
            </div>
        </div>

        <div class="footer">
            <h1>CS:GO Crosshair Generator</h1>
            - Skarbo 2012 - <a
                title="This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License"
                rel="license"
                href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img
                alt="Creative Commons License" style="border-width: 0"
                src="img/cc.png" /></a> - <span title="<table><tr>
                    <td>0.2

                    <td>Default crosshair style can choose between
                        predefined colors<br />Paste variables directly
                        into console

                <tr>
                    <td>0.3

                    <td>Moved images to amazon

                <tr>
                    <td>0.4

                    <td>Added players to background<br />URL is updated
                        less frequently<br />Changed hash splitters

                <tr>
                    <td>0.5

                    <td>Updated default crosshair representation and
                        added fixedgap support
                        <tr><td>0.6<td>Added binds feature (beta)
                        </table>">Version 0.6</span> - Feedback: <a
                href="http://www.reddit.com/r/GlobalOffensive/comments/1473t5/ive_created_a_csgo_crosshair_generator/" target="_blank">Reddit</a>/<a
                href="http://forums.steampowered.com/forums/showthread.php?p=33511649#post33511649"
                target="_blank">Steam forum</a>/<a href="https://github.com/Skarbo/CSGOCrosshair/issues" target="_blank">GitHub</a>
        </div>

    </div>

    <?php include_once 'keyboard.php';?>

</body>
</html>