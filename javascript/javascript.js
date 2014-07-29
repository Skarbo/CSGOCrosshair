/*
 * // Please do not hold me accountable for the code. Its...pretty ugly.
 * 
	"cl_crosshairalpha" def. "200" min 0 max 255        
	"cl_crosshaircolor" def. "1" Set crosshair color as defined in game_options.consoles.txt  
	"cl_crosshaircolor_b" ( def. "50" ) 
	"cl_crosshaircolor_r" ( def. "50" )  
	"cl_crosshaircolor_g" ( def. "250" )  
	"cl_crosshairdot" ( def. "0" )   
	"cl_crosshairgap" ( def. "0" )     
	"cl_crosshairscale" ( def. "0" ) Crosshair scaling factor (deprecated)
	"cl_crosshairsize" ( def. "5" )     
	"cl_crosshairstyle" ( def. "0" ) 
	"cl_crosshairusealpha" ( def. "1" )              
	"cl_crosshairthickness" ( def. "0.5" )    
 */

var IMG_PATH = window.location.hostname == "localhost" ? "img/" : "https://s3.amazonaws.com/csgo-crosshair-generator/img/";
var ALPHA_FACTOR = 255;
var THICKNESS_FACTOR = 19;
var LENGTH_FACTOR = 19;
var GAP_FACTOR = 1;
var GAP_PAD = 3;
var SHADOW_BLUR = 0;
var SHADOW_ALPHA = 0.9;
var ANIMATE_GAP = 20;
var BINDS_POST = {
	CROSSHAIR : "&",
	TOGGLE : "%",
	TOGGLE_DOT : "*",
	SIZE_INC : "(",
	SIZE_DEC : ")",
	THICKNESS_INC : "#",
	THICKNESS_DEC : "@",
	GAP_INC : ".",
	GAP_DEC : ","
};
var COLOR = {
	classic : {
		1 : "#2EFA2E",
		2 : "#FAFA2E",
		3 : "#2E2EFA",
		4 : "#2EFAFA"
	},
	def : {
		1 : {
			cross : [ 0, "#4C462E", 1, "#FFFCE9" ],
			line : "#AAB79D",
			dot : "#A3A798"
		},
		2 : {
			cross : [ 0, "#797F4F", 1, "#EFF57B" ],
			line : "#D1D48D",
			dot : "#D9DCA7"
		},
		3 : {
			cross : [ 0, "#55847C", 1, "#71E7D9" ],
			line : "#8EC4B7",
			dot : "#A0AD91"
		},
		4 : {
			cross : [ 0, "#7F8883", 1, "#E0FFF0" ],
			line : "#C4D4CA",
			dot : "#A5A99A"
		}
	}
};

var CONFIG = {
	alpha : "cl_crosshairalpha",
	color : "cl_crosshaircolor",
	color_b : "cl_crosshaircolor_b",
	color_r : "cl_crosshaircolor_r",
	color_g : "cl_crosshaircolor_g",
	dot : "cl_crosshairdot",
	gap : "cl_crosshairgap",
	size : "cl_crosshairsize",
	style : "cl_crosshairstyle",
	usealpha : "cl_crosshairusealpha",
	thickness : "cl_crosshairthickness",
	fgap : "cl_fixedcrosshairgap",
	outline : "cl_crosshair_outlinethickness",
	outline_draw : "cl_crosshair_drawoutline"
};

var TEMPLATE = {
	def : {
		alpha : 200,
		color : 5,
		color_b : 50,
		color_r : 50,
		color_g : 250,
		dot : 0,
		gap : 0,
		size : 5,
		style : 2,
		usealpha : 1,
		thickness : 0.5,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	dot : {
		alpha : 255,
		color : 5,
		color_b : 0,
		color_r : 0,
		color_g : 255,
		dot : 1,
		gap : 0,
		size : 0,
		style : 2,
		usealpha : 1,
		thickness : 2,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	cross : {
		alpha : 255,
		color : 5,
		color_b : 0,
		color_r : 0,
		color_g : 255,
		dot : 1,
		gap : -5,
		size : 5,
		style : 2,
		usealpha : 1,
		thickness : 2,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	16 : {
		alpha : 200,
		color : 5,
		color_b : 50,
		color_r : 50,
		color_g : 255,
		dot : 0,
		gap : 14,
		size : 6,
		style : 3,
		usealpha : 1,
		thickness : 0.5,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	hatton : {
		alpha : 255,
		color : 5,
		color_b : 255,
		color_r : 255,
		color_g : 0,
		dot : 1,
		gap : 0,
		size : 5,
		style : 2,
		thickness : 1,
		usealpha : 1,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	nip_getright : {
		alpha : 200,
		color : 1,
		color_b : 50,
		color_g : 250,
		color_r : 50,
		dot : 0,
		gap : 0,
		size : 5,
		style : 4,
		thickness : 1.5,
		usealpha : 1,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	nip_forest : {
		alpha : 255,
		color : 1,
		color_b : 0,
		color_g : 0,
		color_r : 0,
		dot : 0,
		gap : -1,
		size : 6,
		style : 4,
		thickness : 1,
		usealpha : 1,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	nip_friberg : {
		alpha : 255,
		color : 4,
		color_b : 250,
		color_g : 250,
		color_r : 50,
		dot : 0,
		gap : 0,
		size : 2,
		style : 2,
		thickness : 0.5,
		usealpha : 1,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	nip_xizt : {
		alpha : 200,
		color : 1,
		color_b : 50,
		color_g : 250,
		color_r : 50,
		dot : 0,
		gap : -1,
		size : 5,
		style : 2,
		thickness : 1,
		usealpha : 1,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	},
	nip_fifflaren : {
		alpha : 255,
		color : 4,
		color_b : 250,
		color_g : 250,
		color_r : 50,
		dot : 0,
		gap : 0,
		size : 3,
		style : 2,
		thickness : 0.5,
		usealpha : 1,
		fgap : 0,
		outline : 0,
		outline_draw : 0
	}
};

var canvas = {
	canvas : null,
	binds : {},
	stage : null,
	boundRect : null,
	backgroundGroup : null,
	backgrounds : {},
	crosshair : {
		group : null,
		classic : {
			group : null,
			left : null,
			right : null,
			top : null,
			bottom : null,
			dot : null
		},
		def : {
			group : null,
			left : null,
			right : null,
			top : null,
			bottom : null,
			dot : null,
			lines : {
				left : null,
				right : null,
				top : null,
				bottom : null
			}
		}
	}
};
var crosshair = $.extend({}, TEMPLATE.def);
var control = {
	spinner : {
		alpha : null,
		thickness : null,
		size : null,
		gap : null,
		color_r : null,
		color_g : null,
		color_b : null,
		outline : null
	},
	slider : {
		alpha : null,
		thickness : null,
		size : null,
		gap : null,
		color_r : null,
		color_g : null,
		color_b : null,
		outline : null
	},
	button : {
		usealpha : null,
		outline_draw : null,
		dot : null,
		style : null
	},
	buttonset : {
		color : null,
		style : null
	},
	colorPalette : null,
	config : null,
	configConsole : null
};

var center = {
	x : 0,
	y : 0
};
var freeze = false;
var background = 0;
var backgrounds = [ "de_dust2_6.jpg", "de_dust2_7.jpg", "de_inferno_1.jpg", "de_inferno_3.jpg", "de_nuke_3.jpg" ];
var animate = {
	animating : false,
	step : 0,
	timer : null,
	timout : null
};
var crosshairTimeout = null;
var crosshairDrawTimeout = null;
var binds = {
	crosshair : {},
	toggle : null,
	toggle_dot : null,
	size_inc : null,
	size_dec : null,
	thickness_inc : null,
	thickness_dec : null,
	gap_inc : null,
	gap_dec : null
};
var binds_tab = {
	binds : null,
	autoexes : null
};

$(function() {

	// STAGE

	canvas.canvas = $("#container");
	canvas.canvas.empty();

	canvas.stage = new Kinetic.Stage({
		container : canvas.canvas.attr("id"),
		width : canvas.canvas.width(),
		height : canvas.canvas.height()
	});

	canvas.stage.on("mousemove", function(event) {
		if (!freeze) {
			var position = canvas.stage.getPointerPosition();// canvas.stage.getUserPosition();
			// //
			if (canvas.backgrounds[background] && canvas.backgrounds[background].getVisible()) {
				// Move background
				canvas.backgrounds[background].setPosition((canvas.backgrounds[background].getWidth() - canvas.stage.getWidth()) * (position.x / canvas.stage.getWidth()) * -1,
						(canvas.backgrounds[background].getHeight() - canvas.stage.getHeight()) * (position.y / canvas.stage.getHeight()) * -1);
			}
			canvas.crosshair.group.setPosition(position.x, position.y);
			canvas.stage.draw();
			animateCrosshair(true);
		}
	});

	canvas.canvas.mouseout(function() {
		if (!freeze) {
			canvas.crosshair.group.setPosition(center.x, center.y);
			if (canvas.backgrounds[background])
				canvas.backgrounds[background].centerBackground();
			canvas.stage.draw();
		}
	});
	
	canvas.canvas.click(function() {
		freeze = !freeze;
	});

	// /STAGE

	center = {
		x : canvas.stage.getWidth() / 2,
		y : canvas.stage.getHeight() / 2
	};

	var layer = new Kinetic.Layer();
	canvas.stage.add(layer);

	// Bound rect
	canvas.boundRect = new Kinetic.Rect({
		height : canvas.stage.getWidth(),
		width : canvas.stage.getHeight()
	});
	layer.add(canvas.boundRect);

	// BACKGROUNDS

	canvas.backgroundGroup = new Kinetic.Group({});
	layer.add(canvas.backgroundGroup);
	canvas.backgroundGroup.moveToBottom();

	var backgroundsElement = $("#backgrounds");
	var backgroundElement = $("<div />", {});
	backgroundsElement.append(backgroundElement.attr("data-background", -1).css("background", "white"));
	for (i in backgrounds) {
		backgroundsElement.append(backgroundElement.clone().attr("data-background", i).append($("<img  />", {
			src : IMG_PATH + "min_" + backgrounds[i],
			alt : ""
		})));
	}
	backgroundsElement.children().click(function(event) {
		loadBackground($(this).attr("data-background"));
	});
	
	// /BACKGROUNDS

	// CROSSHAIR

	canvas.crosshair = createCrosshair(layer, crosshair, center);

	// canvas.crosshair.group = new Kinetic.Group({
	// position : {
	// x : center.x,
	// y : center.y
	// }
	// });
	// layer.add(canvas.crosshair.group);
	// canvas.crosshair.group.moveToTop();
	//
	// // Crosshair classic
	// canvas.crosshair.classic.group = new Kinetic.Group();
	// canvas.crosshair.group.add(canvas.crosshair.classic.group);
	// if (getCrosshairStyleType(crosshair.style) == "classic")
	// canvas.crosshair.classic.group.show();
	// else
	// canvas.crosshair.classic.group.hide();
	//
	// var crosshairShape = new Kinetic.Rect({});
	// canvas.crosshair.classic.left = crosshairShape.clone();
	// canvas.crosshair.classic.right = crosshairShape.clone();
	// canvas.crosshair.classic.top = crosshairShape.clone();
	// canvas.crosshair.classic.bottom = crosshairShape.clone();
	//
	// canvas.crosshair.classic.dot = new Kinetic.Rect({});
	//
	// canvas.crosshair.classic.group.add(canvas.crosshair.classic.left);
	// canvas.crosshair.classic.group.add(canvas.crosshair.classic.right);
	// canvas.crosshair.classic.group.add(canvas.crosshair.classic.top);
	// canvas.crosshair.classic.group.add(canvas.crosshair.classic.bottom);
	// canvas.crosshair.classic.group.add(canvas.crosshair.classic.dot);
	//
	// // Crosshair default
	// canvas.crosshair.def.group = new Kinetic.Group();
	// canvas.crosshair.group.add(canvas.crosshair.def.group);
	// if (getCrosshairStyleType(crosshair.style) == "default")
	// canvas.crosshair.def.group.show();
	// else
	// canvas.crosshair.def.group.hide();
	//
	// var crosshairShapeDef = new Kinetic.Rect({
	//
	// });
	// canvas.crosshair.def.left = new Kinetic.Polygon({
	// points : [ 0, 0, -15, -2, -15, 2 ],
	// offset : [ 10, 0 ],
	// fill : "black"
	// });
	// canvas.crosshair.def.right = canvas.crosshair.def.left.clone();
	// canvas.crosshair.def.top = canvas.crosshair.def.left.clone();
	// canvas.crosshair.def.bottom = canvas.crosshair.def.left.clone();
	//
	// canvas.crosshair.def.dot = new Kinetic.Circle({
	// x : 0,
	// y : 0,
	// radius : 2,
	// shadow : {
	// color : 'black',
	// blur : 3,
	// offset : [ 0, 0 ],
	// opacity : 1
	// }
	// });
	//
	// canvas.crosshair.def.lines.left = crosshairShapeDef.clone();
	// canvas.crosshair.def.lines.right = crosshairShapeDef.clone();
	// canvas.crosshair.def.lines.top = crosshairShapeDef.clone();
	// canvas.crosshair.def.lines.bottom = crosshairShapeDef.clone();
	//
	// canvas.crosshair.def.group.add(canvas.crosshair.def.left);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.right);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.top);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.bottom);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.dot);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.lines.left);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.lines.right);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.lines.top);
	// canvas.crosshair.def.group.add(canvas.crosshair.def.lines.bottom);

	// /CROSSHAIR

	// CONTROLS

	// Crosshair style
	var crosshairStyleFunc = function(type, dynamic) {
		type = type || "default";

		var crosshairStyle = 0;
		if (type == "classic" && !dynamic)
			crosshairStyle = 2;
		else if (type == "classic" && dynamic)
			crosshairStyle = 3;
		else if (type == "default" && !dynamic)
			crosshairStyle = 1;

		changeCrosshair({
			"style" : crosshairStyle
		});
	};

	control.buttonset.style = $("#crosshair_style_type").buttonset().change(function(event) {
		crosshairStyleFunc($(event.target).val(), control.button.style.is(":checked"));
	});

	control.button.style = $("#crosshair_style_dynamic").button().change(function(event) {
		crosshairStyleFunc(control.buttonset.style.find("input:checked").val(), $(this).is(":checked"));
	});

	// Crosshair alpha
	createControlSlider("alpha", 255);
	createControlSpinner("alpha", 255);
	control.button.usealpha = $("#crosshair_usealpha").button().change(function(event) {
		changeCrosshair({
			"usealpha" : $(this).is(":checked") ? 1 : 0
		});
	});

	// Crosshair thickness
	createControlSlider("thickness", 100, 0, 0.5);
	createControlSpinner("thickness", 100, 0, 0.5);

	// Crosshair size
	createControlSlider("size");
	createControlSpinner("size");

	// Crosshair gap
	createControlSlider("gap", 100, -100);
	createControlSpinner("gap", 100, -100);

	// Crosshair outline
	createControlSlider("outline", 3, 0);
	createControlSpinner("outline", 3, 0);
	control.button.outline_draw = $("#crosshair_outline_draw").button().change(function(event) {
		changeCrosshair({
			"outline_draw" : $(this).is(":checked") ? 1 : 0
		});
	});

	// Crosshair color
	createControlSlider("color_r", 255);
	createControlSpinner("color_r", 255);
	createControlSlider("color_g", 255);
	createControlSpinner("color_g", 255);
	createControlSlider("color_b", 255);
	createControlSpinner("color_b", 255);

	control.colorPalette = $("#crosshair_color_palette").spectrum({
		color : rgbToHex(crosshair.color_r, crosshair.color_g, crosshair.color_b),
		change : function(color) {
			var rgb = color.toRgb();
			changeCrosshair({
				"color_r" : rgb.r,
				"color_g" : rgb.g,
				"color_b" : rgb.b,
			});
		},
		showInput : true,
		showPalette : true,
		palette : [ [ 'black', 'white', 'red' ], [ 'yellow', 'rgb(0, 255, 0);', 'blue' ] ]
	});

	control.buttonset.color = $("#crosshair_color_type").buttonset().change(function(event) {
		changeCrosshair({
			"color" : $(event.target).val()
		});
	});

	// Crosshair dot
	control.button.dot = $("#crosshair_dot").button().change(function(event) {
		changeCrosshair({
			"dot" : $(this).is(":checked") ? 1 : 0
		});
	});

	// Template
	$(".crosshair_template").button();

	$("#crosshair_template_players").button({
		icons : {
			secondary : "ui-icon-triangle-1-s"
		}
	}).click(function() {
		var menu = $(this).next().show().position({
			my : "left top",
			at : "left bottom",
			of : this
		});
		$(document).one("click", function() {
			menu.hide();
		});
		return false;
	}).next().hide().menu();

	$("*[data-template]").click(function(event) {
		event.preventDefault();
		var temp = $(this).attr("data-template");
		if (TEMPLATE[temp] != undefined)
			changeCrosshair(TEMPLATE[temp]);
	});

	// Config
	control.config = $("#crosshair_config").change(changeConfig);
	control.configConsole = $("#crosshair_config_console").focus(function() {
		$(this).select();
	});

	// /CONTROLS

	// HISTORY

	// $(window).hashchange(function() {
	// changeCrosshair(getHash());
	// });
	// $(window).hashchange();

	// /HISTORY

	// RESIZE

	$(window).resize(function() {
		canvas.canvas.children().hide();
		canvas.canvas.children().height(canvas.canvas.height()).width(canvas.canvas.width());
		canvas.stage.setSize(canvas.canvas.width(), canvas.canvas.height());
		canvas.boundRect.setSize(canvas.canvas.width(), canvas.canvas.height());
		canvas.stage.draw();
		center = {
			x : canvas.stage.getWidth() / 2,
			y : canvas.stage.getHeight() / 2
		};
		canvas.canvas.children().show();
	});

	// Fixes a bug
	setTimeout(function() {
		$(window).resize();
	}, 100);

	// /RESIZE

	// UPDATE HASH

	$(window).keydown(function(event) {
		if (((event.metaKey || event.ctrlKey) && event.keyCode == 76) || (event.altKey && event.keyCode == 68) || event.keyCode == 117) {
			updateHash(crosshair);
		}
	}).blur(function(event) {
		updateHash(crosshair);
	});

	// /UPDATE HASH

	// TABS

	var tabs = $(".tabs");
	tabs.find("* >*[for]").click({
		tabs : tabs,
		content : $(".tab_content")
	}, function(event) {
		var id = $(event.target).attr("for");
		event.data.tabs.find("* >*").removeClass("selected");
		$(event.target).addClass("selected");
		event.data.content.children().removeClass("selected").filter("#" + id).addClass("selected");
	});
	tabs.find("#add_bind").click(function() {
		tabs.find("[for=binds_tab]").click();
		binds_tab.crosshairs.addBind();
	});

	// /TABS

	// BINDS

	binds_tab.tab = $("#binds_tab");

	// Key's
	binds_tab.tab.listenKey = function() {
		var bindCallback = function(id, value, target) {
			if (target.parents("#bind_crosshairs").length > 0) {
				updateBindsCrosshair(id, {
					key : value
				});
			} else if (target.parents("#bind_binds").length > 0) {
				binds[id] = value;
				updateBinds();
			}
		};

		binds_tab.tab.find("tbody .bind input[name=bind_key]").unbind(".listenkey").bind("keydown.listenkey", function(event) {
			if (event.keyCode == 9)
				return true;
			event.preventDefault();
		}).bind("keyup.listenkey", {
			callback : bindCallback
		}, function(event) {
			if (event.keyCode == 9)
				return true;
			// if (event.keyCode == 27) {
			// $(event.target).removeAttr("data-key");
			// $(event.target).val("");
			// return false;
			// }
			event.preventDefault();
			$(event.target).val("").removeClass("error");
			var key = getBind(event.which);
			if (key) {
				$(event.target).val(key);
			} else {
			}
			var bindId = $(event.target).parent().parent().attr("data-id");

			event.data.callback(bindId, $(event.target).val(), $(event.target));

			return false;
		}).bind("blur.listenkey", {
			callback : bindCallback
		}, function(event) {
			var inputs = binds_tab.tab.find("tbody > .bind input[name=bind_key]");
			inputs.removeClass("error");
			// Empty inputs
			inputs.filter(function() {
				return $(this).val() == "";
			}).addClass("error");
			// Duplicate inputs
			var val = $(event.target).val();
			var duplicate = inputs.filter(function() {
				return $(this).val() == val;
			});
			if (duplicate.length > 1)
				duplicate.addClass("error");
		}).bind("mousedown.listenkey", {
			callback : bindCallback
		}, function(event) {
			if ($(event.target).is(":focus")) {
				event.preventDefault();
				var key = getBind(event.which);
				if (key) {
					$(event.target).val(key);

					var bindId = $(event.target).parent().parent().attr("data-id");
					event.data.callback(bindId, key, $(event.target));
				}
			}
		}).bind("contextmenu.listenkey", function(event) {
			event.preventDefault();
		});

		binds_tab.tab.find("tbody .bind .bind_key_keyboard").unbind(".listenkey").bind("click.listenkey", {
			"callback" : bindCallback
		}, function(event) {
			var keyInput = $(this).parent().parent().find("input[name=bind_key]");

			keyboard.showKeyboad(keyInput, event.data.callback, $(this).position().top + $(this).outerHeight(), keyInput.val());
			return false;
		});
	};

	// Crosshairs
	binds_tab.crosshairs = $("#bind_crosshairs");

	binds_tab.crosshairs.listenBindRow = function() {
		binds_tab.tab.listenKey();

		this.find("tbody .bind input[name=bind_name]").unbind("keyup").keyup(function(event) {
			$(event.target).val($(event.target).val().replace(/\s/, "_").replace(/\W/, ""));
			var name = $(event.target).val();
			if (name != "") {
				var bindId = $(event.target).parent().parent().attr("data-id");
				updateBindsCrosshair(bindId, {
					name : name
				});
			}
		}).blur(function(event) {
			var name = $(event.target).val();
			if (name == "") {
				var bindId = $(event.target).parent().parent().attr("data-id");
				name = bindId;
				updateBindsCrosshair(bindId, {
					name : name
				});
				$(event.target).val(name);
			}
			var inputs = binds_tab.crosshairs.find("tbody .bind input[name=bind_name]");
			inputs.removeClass("error");
			var duplicate = inputs.filter(function() {
				return $(this).val() == name;
			});
			if (duplicate.length > 1)
				duplicate.addClass("error");
		});

		binds_tab.crosshairs.find("tbody .bind .remove_bind").click(function(event) {
			var bindRow = $(event.target).parent().parent().parent();
			var bindId = bindRow.attr("data-id");
			bindRow.hide();
			delete binds.crosshair[bindId];
			updateBindsCrosshair();
		});
	};
	binds_tab.crosshairs.listenBindRow();

	var keyboard = $("#keyboard").hide();
	keyboard.showKeyboad = function(keyInput, bindCallback, top, key) {
		keyboard.find("button").removeClass("selected").removeClass("picked").removeAttr("disabled").unbind("click").one("click", {
			callback : bindCallback
		}, function(event) {
			var key = $(this).attr("data-key") || jQuery.trim($(this).text());
			keyInput.val(key.toUpperCase()).blur();

			var bindId = keyInput.parent().parent().attr("data-id");
			event.data.callback(bindId, key.toUpperCase(), keyInput);
		});
		var buttonClass = function(key, clas, disable) {
			var buttonSelected = keyboard.find("button[data-key=\"" + (/[\[\]\\\/\=]/i.test(key) ? "\\" + key : key.toLowerCase()) + "\"]").addClass(clas)
					.prop("disabled", disable);
			if (buttonSelected.length == 0)
				buttonSelected = keyboard.find("button:NOT([data-key])").filter(function() {
					return jQuery.trim($(this).text()).toLowerCase() == key.toLowerCase();
				}).addClass(clas).prop("disabled", disable ? true : false);
		};
		var keysInput = binds_tab.tab.find("tbody .bind input[name=bind_key]");
		if (keysInput.length > 0) {
			keysInput.each(function(i, element) {
				buttonClass($(this).val(), "picked", true);
			});
		}
		if (key)
			buttonClass(key, "selected");
		this.css("left", $("#wrapper").innerWidth() - this.outerWidth()).css("top", top).show();
		$(document).one("click", function() {
			keyboard.hide();
		});
	};

	binds_tab.crosshairs.addBind = function(crshr, key, name, id) {
		crshr = crshr || crosshair;
		key = key || "";

		var bindBody = this.find("tbody");
		var bindRow = this.find("tfoot .bind").clone();
		var number = (parseFloat(("" + this.find("tbody .bind:last-child").attr("data-id")).replace(/\D+/, "")) || 0) + 1;
		if (!id)
			id = "bind_" + number;
		if (!name)
			name = "bind" + number;
		var canvasId = "crosshair_canvas_" + id;

		updateBindsCrosshair(id, {
			name : name,
			crosshair : jQuery.extend({}, crshr),
			test : crshr,
			key : key
		});

		bindRow.attr("data-id", id);
		var canvas = bindRow.find("div.bind_crosshair_canvas").attr("id", canvasId);

		var inputs = bindRow.find("input").removeAttr("disabled");
		inputs.filter("[name=bind_crosshair]").val(getCrosshairConfig(crshr, ";"));
		inputs.filter("[name=bind_name]").val(name);

		bindRow.find(".add_bind").hide();
		bindRow.find(".remove_bind").removeClass("hide");

		bindBody.append(bindRow);
		inputs.filter("[name=bind_key]").focus().val(key);
		binds_tab.crosshairs.listenBindRow();

		var stage = new Kinetic.Stage({
			container : canvasId,
			width : canvas.height(),
			height : canvas.width()
		});
		var center = {
			x : 0,
			y : 0
		};
		var layer = new Kinetic.Layer();
		stage.add(layer);
		var canvasCrosshair = createCrosshair(layer, crshr, center);
		updateCrosshair(canvasCrosshair, crshr, true);
		var size = getCrosshairStyleType(crshr.style) == "classic" ? canvasCrosshair.classic.size : canvasCrosshair.def.size;
		var scale = (stage.getWidth() / 2) / size;
		layer.setScale(scale);
		layer.setPosition(size * scale, size * scale);
		stage.draw();
	};

	binds_tab.crosshairs.find("tfoot .bind .add_bind").click(function() {
		binds_tab.crosshairs.addBind();
	});

	// Binds
	binds_tab.binds = $("#bind_binds");
	binds_tab.binds_type = $("#bind_binds_type").menu().hide();

	binds_tab.binds.addBind = function(type, key) {
		key = key || "";
		var body = binds_tab.binds.find("tbody");
		var row = binds_tab.binds.find("tfoot .bind").clone();

		row.find(".bind_type").attr("data-type", type).find(":first-child").text(getBindTypeTitle(type));
		row.attr("data-id", type);
		var keyInput = row.find("input[name=bind_key]").val(key).removeAttr("disabled");

		if (key) {
			binds[type] = key;
			updateBinds();
		}

		row.find(".remove_bind").removeClass("hide");

		body.append(row);
		binds_tab.binds.rebindRow();
		setTimeout(function() {
			keyInput.focus();
		}, 50);
	};

	binds_tab.binds.rebindRow = function() {
		binds_tab.tab.listenKey();

		binds_tab.binds.find(".bind_type").unbind("click").click(function(event) {
			var target = $(event.currentTarget);

			binds_tab.binds_type.find("a").show().filter(function() {
				return binds_tab.binds.find("tbody .bind .bind_type[data-type=" + $(this).attr("data-type") + "]").length > 0;
			}).hide();

			binds_tab.binds_type.show().position({
				my : "left top",
				at : "left bottom",
				of : this
			}).find("a").unbind("click").click(function(event) {
				event.preventDefault();
				if (target.parent().parent().parent().is("tfoot")) {
					binds_tab.binds.addBind($(event.target).attr("data-type"));
				} else {
					var oldType = target.attr("data-type");
					var type = $(event.target).attr("data-type");
					var key = binds[oldType];
					target.attr("data-type", type);
					target.find(":first-child").text($(event.target).text());

					delete binds[oldType];
					if (key)
						binds[type] = key;
					updateBinds();
				}
			});
			$(document).one("click", function() {
				binds_tab.binds_type.hide();
			});
			return false;
		});

		binds_tab.binds.find("tbody .bind .remove_bind").click(function(event) {
			var bindRow = $(event.target).parent().parent().parent();
			var bindId = bindRow.attr("data-id");
			bindRow.hide();
			delete binds[bindId];
			updateBinds();
		});
	};
	binds_tab.binds.rebindRow();

	binds_tab.autoexes = $("#binds_autoexes").change(changeBindAutoexec);

	$("#empty_autoexec").click(function() {
		binds_tab.autoexes.val("").change();
	});

	// /BINDS

	// binds_tab.crosshairs.addBind(TEMPLATE.def, "V");
	// binds_tab.crosshairs.addBind(TEMPLATE.dot, "B");
	// binds_tab.crosshairs.addBind(TEMPLATE.cross, "N");
	// tabs.find("[for=binds_tab]").click();

	// Tooltip
	$(document).tooltip();

	// Load background
	loadBackground(background);

	// Load crosshair from hash
	changeCrosshair(getHash());

	// Set autoexec from storage
	if (localStorage.getItem('autoexec') != null) {
		binds_tab.autoexes.val(localStorage.getItem('autoexec')).change();
	}

});

function isCrosshairDynamic(style) {
	return style == 0 || style == 3;
}

// GET

function getCrosshairStyleType(style) {
	return style == 0 || style == 1 ? "default" : "classic";
}

function getCrosshairValue(type, val) {
	var f = function(val, min, max) {
		return val >= min && val <= max ? val : (val < min ? min : max);
	};
	switch (type) {
	case "color":
		val = f(val, 1, 5);// val >= 1 && val <= 5 ? val : TEMPLATE.def[type];
		break;
	case "style":
		val = f(val, 0, 4);
		break;
	case "alpha":
	case "color_r":
	case "color_g":
	case "color_b":
		val = f(val, 0, 255); // val >= 0 && val <= 255 ? val :
		// TEMPLATE.def[type];
		break;
	case "dot":
	case "usealpha":
		val = f(val, 0, 1); // val >= 0 && val <= 1 ? val : TEMPLATE.def[type];
		break;
	case "thickness":
	case "size":
		val = val >= 0 ? val : 0;
		break;
	case "gap":
		val = val >= -100 && val <= 100 ? val : TEMPLATE.def[type];
		break;
	}
	return val;
}

function getCrosshairParsed(crosshairConfig) {
	var regex, match, config = crosshairConfig, crosshairNew = {}, val;
	for (type in CONFIG) {
		crosshairNew[type] = null;
		regex = new RegExp(CONFIG[type] + "\\s\\\"?([\\-\\d.]+)\\\"?\\;?");
		match = config.match(regex);
		if (match != null) {
			val = getCrosshairValue(type, parseFloat(match[1]));
			crosshairNew[type] = val;
		}
	}
	return crosshairNew;
};

function getBind(char) {
	var key = String.fromCharCode(char);
	var isWordcharacter = (char >= 48 && char <= 57) || (char >= 65 && char <= 90);
	if (!isWordcharacter) {
		key = "";
		switch (char) {
		case 1:
			key = "mouse1";
			break;
		case 2:
			key = "mouse3";
			break;
		case 3:
			key = "mouse2";
			break;
		case 8:
			key = "backspace";
			break;
		case 13:
			key = "enter";
			break;
		case 16:
			key = "shift";
			break;
		case 17:
			key = "ctrl";
			break;
		case 18:
			key = "alt";
			break;
		case 19:
			key = "pause";
			break;
		case 20:
			key = "capslock";
			break;
		case 27:
			key = "escape";
			break;
		case 32:
			key = "space";
			break;
		case 33:
			key = "pgup";
			break;
		case 34:
			key = "pgdn";
			break;
		case 35:
			key = "end";
			break;
		case 36:
			key = "home";
			break;
		case 37:
			key = "leftarrow";
			break;
		case 38:
			key = "uparrow";
			break;
		case 39:
			key = "rightarrow";
			break;
		case 40:
			key = "downarrow";
			break;
		case 45:
			key = "ins";
			break;
		case 46:
			key = "del";
			break;
		case 59:
			key = "semicolon";
			break;
		case 61:
			key = "=";
			break;
		case 96:
			key = "KP_INS";
			break;
		case 97:
			key = "KP_END";
			break;
		case 98:
			key = "KP_DOWNARROW";
			break;
		case 99:
			key = "KP_PGDN";
			break;
		case 100:
			key = "KP_LEFTARROW";
			break;
		case 101:
			key = "KP_5";
			break;
		case 102:
			key = "KP_RIGHTARROW";
			break;
		case 103:
			key = "KP_HOME";
			break;
		case 104:
			key = "KP_UPARROW";
			break;
		case 105:
			key = "KP_PGUP";
			break;
		case 106:
			key = "KP_MULTIPLY";
			break;
		case 107:
			key = "KP_PLUS";
			break;
		case 109:
			key = "KP_MINUS";
			break;
		case 110:
			key = "KP_DEL";
			break;
		case 111:
			key = "KP_SLASH";
			break;
		case 173:
			key = "-";
			break;
		case 188:
			key = ",";
			break;
		case 190:
			key = ".";
			break;
		case 191:
			key = "/";
			break;
		case 192:
			key = "`";
			break;
		case 220:
			key = "\\";
			break;
		case 219:
			key = "[";
			break;
		case 221:
			key = "]";
			break;
		case 222:
			key = "'";
			break;
		}
		// F-key
		if (char >= 112 && char <= 123) {
			var f = char - 111;
			key = "F" + f;
		}
	}

	return key.toUpperCase();
}

function getBindTypeTitle(type) {
	switch (type) {
	case "toggle":
		return "Toggle Crosshairs";
	case "toggle_dot":
		return "Toggle Dot";
	case "size_inc":
		return "Size Inc";
	case "size_dec":
		return "Size Dec";
	case "thickness_inc":
		return "Thickness Inc";
	case "thickness_dec":
		return "Thickness Dec";
	case "gap_inc":
		return "Gap Inc";
	case "gap_dec":
		return "Gap Dec";
	}
	return "";
}

function getCrosshairConfig(crosshair, splitter, quote) {
	splitter = splitter || "\n";
	quote = quote == undefined ? "\"" : quote;
	var value, configValue = "";
	for (type in CONFIG) {
		value = CONFIG[type] + " " + quote + crosshair[type] + quote;
		configValue += value + splitter;
	}
	return jQuery.trim(configValue);
}

// /GET

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function round5(x) {
	return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}

function bound(val, min, max) {
	return val < min ? max : (val > max ? min : val);
}

function loadBackground(index) {
	background = index;
	for (i in canvas.backgrounds) {
		canvas.backgrounds[i].hide();
	}

	if (!backgrounds[index])
		return canvas.stage.draw();

	if (canvas.backgrounds[index]) {
		canvas.backgrounds[index].show();
		canvas.backgrounds[index].centerBackground();
		canvas.stage.draw();
	} else {
		var imageObj = new Image();
		imageObj.onload = function() {
			canvas.backgrounds[index] = new Kinetic.Image({
				x : 0,
				y : 0,
				image : imageObj,
				width : imageObj.width,
				height : imageObj.height
			});
			canvas.backgrounds[index].centerBackground = function() {
				this.setPosition((this.getWidth() - this.getStage().getWidth()) / 2 * -1, (this.getHeight() - this.getStage().getHeight()) / 2 * -1);
			};
			canvas.backgroundGroup.add(canvas.backgrounds[index]);
			canvas.backgrounds[index].centerBackground();
			canvas.stage.draw();
		};
		imageObj.src = IMG_PATH + backgrounds[index];
	}

}

// CREATE

function createCrosshair(layer, crosshair, center) {
	var canvasCrosshair = {
		group : null,
		classic : {
			group : null,
			left : null,
			right : null,
			top : null,
			bottom : null,
			dot : null
		},
		def : {
			group : null,
			left : null,
			right : null,
			top : null,
			bottom : null,
			dot : null,
			lines : {
				left : null,
				right : null,
				top : null,
				bottom : null
			}
		}
	};

	canvasCrosshair.group = new Kinetic.Group({
		position : {
			x : center.x,
			y : center.y
		}
	});
	layer.add(canvasCrosshair.group);
	canvasCrosshair.group.moveToTop();

	// Crosshair classic
	canvasCrosshair.classic.group = new Kinetic.Group();
	canvasCrosshair.group.add(canvasCrosshair.classic.group);
	if (getCrosshairStyleType(crosshair.style) == "classic")
		canvasCrosshair.classic.group.show();
	else
		canvasCrosshair.classic.group.hide();

	var crosshairShape = new Kinetic.Rect({});
	canvasCrosshair.classic.left = crosshairShape.clone();
	canvasCrosshair.classic.right = crosshairShape.clone();
	canvasCrosshair.classic.top = crosshairShape.clone();
	canvasCrosshair.classic.bottom = crosshairShape.clone();

	canvasCrosshair.classic.left.rotateDeg(-90);
	canvasCrosshair.classic.right.rotateDeg(90);
	canvasCrosshair.classic.bottom.rotateDeg(180);

	canvasCrosshair.classic.dot = new Kinetic.Rect({});

	canvasCrosshair.classic.group.add(canvasCrosshair.classic.left);
	canvasCrosshair.classic.group.add(canvasCrosshair.classic.right);
	canvasCrosshair.classic.group.add(canvasCrosshair.classic.top);
	canvasCrosshair.classic.group.add(canvasCrosshair.classic.bottom);
	canvasCrosshair.classic.group.add(canvasCrosshair.classic.dot);

	// Crosshair default
	canvasCrosshair.def.group = new Kinetic.Group();
	canvasCrosshair.group.add(canvasCrosshair.def.group);
	if (getCrosshairStyleType(crosshair.style) == "default")
		canvasCrosshair.def.group.show();
	else
		canvasCrosshair.def.group.hide();

	var crosshairShapeDef = new Kinetic.Rect({

	});
	canvasCrosshair.def.left = new Kinetic.Polygon({
		points : [ 0, 0, -15, -2, -15, 2 ],
		offset : [ 10, 0 ]
	});
	canvasCrosshair.def.right = canvasCrosshair.def.left.clone();
	canvasCrosshair.def.top = canvasCrosshair.def.left.clone();
	canvasCrosshair.def.bottom = canvasCrosshair.def.left.clone();

	canvasCrosshair.def.right.rotateDeg(180);
	canvasCrosshair.def.top.rotateDeg(90);
	canvasCrosshair.def.bottom.rotateDeg(-90);

	canvasCrosshair.def.dot = new Kinetic.Circle({
		x : 0,
		y : 0,
		radius : 2,
		shadow : {
			color : 'black',
			blur : 3,
			offset : [ 0, 0 ],
			opacity : 1
		}
	});

	canvasCrosshair.def.lines.left = crosshairShapeDef.clone();
	canvasCrosshair.def.lines.right = crosshairShapeDef.clone();
	canvasCrosshair.def.lines.top = crosshairShapeDef.clone();
	canvasCrosshair.def.lines.bottom = crosshairShapeDef.clone();

	canvasCrosshair.def.lines.left.rotateDeg(90);
	canvasCrosshair.def.lines.bottom.rotateDeg(180);
	canvasCrosshair.def.lines.right.rotateDeg(-90);

	canvasCrosshair.def.group.add(canvasCrosshair.def.left);
	canvasCrosshair.def.group.add(canvasCrosshair.def.right);
	canvasCrosshair.def.group.add(canvasCrosshair.def.top);
	canvasCrosshair.def.group.add(canvasCrosshair.def.bottom);
	canvasCrosshair.def.group.add(canvasCrosshair.def.dot);
	canvasCrosshair.def.group.add(canvasCrosshair.def.lines.left);
	canvasCrosshair.def.group.add(canvasCrosshair.def.lines.right);
	canvasCrosshair.def.group.add(canvasCrosshair.def.lines.top);
	canvasCrosshair.def.group.add(canvasCrosshair.def.lines.bottom);

	return canvasCrosshair;
}

function createControlSpinner(type, max, min, step) {
	max = max || 100;
	min = min || 0;
	step = step || 1;
	control.spinner[type] = $("#crosshair_" + type + "_spinner").val(crosshair[type]).spinner({
		min : min,
		max : max,
		step : step,
		value : crosshair[type],
		spin : function(event, ui) {
			var hash = {};
			hash[type] = ui.value;
			changeCrosshair(hash);
		}
	}).keyup(function() {
		var hash = {};
		hash[type] = $(this).spinner("value");
		changeCrosshair(hash);
	});
}

function createControlSlider(type, max, min, step) {
	max = max || 100;
	min = min || 0;
	step = step || 1;
	control.slider[type] = $("#crosshair_" + type + "_slider").slider({
		min : min,
		max : max,
		step : step,
		value : crosshair[type],
		slide : function(event, ui) {
			var hash = {};
			hash[type] = ui.value;
			changeCrosshair(hash);
		}
	});
}

// /CREATE

// CALC

function calcThickness(thickness) {
	return (thickness / 10) * THICKNESS_FACTOR;
}

function calcLength(length) {
	return (length / 10) * LENGTH_FACTOR;
}

function calcGap(gap, noAnimate) {
	return (gap * GAP_FACTOR) + GAP_PAD + (!noAnimate ? ((animate.step / 10) * ANIMATE_GAP) : 0);
}

// /CALC

// UPDATE

function updateCrosshair(canvasCrosshair, crosshair, noAnimate) {
	// Classic
	var color = rgbToHex(crosshair.color_r, crosshair.color_g, crosshair.color_b);
	if (crosshair.color >= 1 && crosshair.color <= 4)
		color = COLOR.classic[crosshair.color];

	var length = calcLength(crosshair.size);
	var thickness = calcThickness(crosshair.thickness);
	var gap = calcGap(crosshair.gap, noAnimate);
	var outline = crosshair.outline_draw ? parseInt(crosshair.outline) : 0;
	var padding = outline;

	canvasCrosshair.classic.top.setSize(thickness, length * -1);
	canvasCrosshair.classic.top.setFill(color);
	canvasCrosshair.classic.top.setOffset(thickness / 2, (thickness / 2) + gap);
	canvasCrosshair.classic.top.setStrokeWidth(outline);
	canvasCrosshair.classic.top.setStroke(outline ? "black" : null);

	canvasCrosshair.classic.left.setAttrs(canvasCrosshair.classic.top.getAttrs());
	// canvasCrosshair.classic.left.rotateDeg(-90);

	canvasCrosshair.classic.right.setAttrs(canvasCrosshair.classic.top.getAttrs());
	// canvasCrosshair.classic.right.rotateDeg(90);

	canvasCrosshair.classic.bottom.setAttrs(canvasCrosshair.classic.top.getAttrs());
	// canvasCrosshair.classic.bottom.rotateDeg(180);

	// canvasCrosshair.classic.left.setPosition((calcThickness(crosshair.thickness)
	// / 2 * -1) - calcGap(crosshair.gap), calcThickness(crosshair.thickness) /
	// 2 * -1);
	// canvasCrosshair.classic.left.setFill(color);
	// canvasCrosshair.classic.left.setWidth(calcLength(crosshair.size) * -1);
	// canvasCrosshair.classic.left.setHeight(calcThickness(crosshair.thickness));

	// canvasCrosshair.classic.right.setPosition((calcThickness(crosshair.thickness)
	// / 2) + calcGap(crosshair.gap), calcThickness(crosshair.thickness) / 2 *
	// -1);
	// canvasCrosshair.classic.right.setFill(color);
	// canvasCrosshair.classic.right.setWidth(calcLength(crosshair.size));
	// canvasCrosshair.classic.right.setHeight(calcThickness(crosshair.thickness));

	// canvasCrosshair.classic.top.setPosition(calcThickness(crosshair.thickness)
	// / 2 * -1, (calcThickness(crosshair.thickness) / 2 * -1) -
	// calcGap(crosshair.gap));
	// canvasCrosshair.classic.top.setFill(color);
	// canvasCrosshair.classic.top.setWidth(calcThickness(crosshair.thickness));
	// canvasCrosshair.classic.top.setHeight(calcLength(crosshair.size) * -1);

	// canvasCrosshair.classic.bottom.setPosition(calcThickness(crosshair.thickness)
	// / 2 * -1, (calcThickness(crosshair.thickness) / 2) +
	// calcGap(crosshair.gap));
	// canvasCrosshair.classic.bottom.setFill(color);
	// canvasCrosshair.classic.bottom.setWidth(calcThickness(crosshair.thickness));
	// canvasCrosshair.classic.bottom.setHeight(calcLength(crosshair.size));

	canvasCrosshair.classic.dot.setPosition((calcThickness(crosshair.thickness) / 2 * -1), (calcThickness(crosshair.thickness) / 2 * -1));
	canvasCrosshair.classic.dot.setFill(color);
	canvasCrosshair.classic.dot.setSize(calcThickness(crosshair.thickness), calcThickness(crosshair.thickness));
	if (crosshair.dot)
		canvasCrosshair.classic.dot.show();
	else
		canvasCrosshair.classic.dot.hide();

	canvasCrosshair.classic.group.setOpacity(crosshair.usealpha ? crosshair.alpha / ALPHA_FACTOR : 0.7);

	canvasCrosshair.classic.size = length + canvasCrosshair.classic.top.getOffset().y;

	// Default
	var thickness = calcThickness(1) + padding;
	var gap = isCrosshairDynamic(crosshair.style) ? calcGap(5, noAnimate) : crosshair.gap;
	var length = 12;
	var width = thickness;
	var linesLength = 10;
	var colorNr = crosshair.color >= 1 && crosshair.color <= 4 ? crosshair.color : 1;
	var hasLine = isCrosshairDynamic(crosshair.style);

	canvasCrosshair.def.left.setPoints([ 0, 0, length * -1, width * -1, length * -1, width ]);
	// canvasCrosshair.def.left.setFill({
	// start : {
	// x : 0,
	// y : 0
	// },
	// end : {
	// x : length * -1,
	// y : 0
	// },
	// colorStops : COLOR.def[colorNr].cross,
	//		
	// fillLinearGradientStartPoint: [-50, -50],
	// fillLinearGradientEndPoint: [50, 50],
	// fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
	// });
	// canvasCrosshair.def.left.setFillEnabled(true);
	// canvasCrosshair.def.left.setFillLinearGradientColorStops(true);
	// canvasCrosshair.def.left.setFillLinearGradientEndPoint(true);
	// canvasCrosshair.def.left.setFillLinearGradientColorStops(true);

	canvasCrosshair.def.left.setAttrs({
		fillLinearGradientStartPoint : [ 0, 0 ],
		fillLinearGradientEndPoint : [ length * -1, 0 ],
		fillLinearGradientColorStops : COLOR.def[colorNr].cross
	});
	canvasCrosshair.def.left.setOffset(gap, 0);

	canvasCrosshair.def.right.setAttrs(canvasCrosshair.def.left.getAttrs());
	// canvasCrosshair.def.right.rotateDeg(180);

	canvasCrosshair.def.top.setAttrs(canvasCrosshair.def.left.getAttrs());
	// canvasCrosshair.def.top.rotateDeg(90);

	canvasCrosshair.def.bottom.setAttrs(canvasCrosshair.def.left.getAttrs());
	// canvasCrosshair.def.bottom.rotateDeg(-90);

	canvasCrosshair.def.dot.setFill(COLOR.def[colorNr].dot);

	canvasCrosshair.def.lines.top.setPosition(0, 0);
	canvasCrosshair.def.lines.top.setFill(COLOR.def[colorNr].line);
	canvasCrosshair.def.lines.top.setSize(linesLength, 1);
	canvasCrosshair.def.lines.top.setOpacity(0.5);
	canvasCrosshair.def.lines.top.setOffset(linesLength / 2, gap);
	canvasCrosshair.def.lines.top.show();

	canvasCrosshair.def.lines.bottom.setAttrs(canvasCrosshair.def.lines.top.getAttrs());
	// canvasCrosshair.def.lines.bottom.rotateDeg(180);

	canvasCrosshair.def.lines.left.setAttrs(canvasCrosshair.def.lines.top.getAttrs());
	// canvasCrosshair.def.lines.left.rotateDeg(-90);

	canvasCrosshair.def.lines.right.setAttrs(canvasCrosshair.def.lines.top.getAttrs());
	// canvasCrosshair.def.lines.right.rotateDeg(90);

	canvasCrosshair.def.size = length + canvasCrosshair.def.left.getOffset().x;

	// Show/hide default/classic
	if (getCrosshairStyleType(crosshair.style) == "default") {
		canvasCrosshair.def.group.show();
		canvasCrosshair.classic.group.hide();

		if (!hasLine) {
			canvasCrosshair.def.lines.top.hide();
			canvasCrosshair.def.lines.bottom.hide();
			canvasCrosshair.def.lines.left.hide();
			canvasCrosshair.def.lines.right.hide();
		} else {
			canvasCrosshair.def.lines.top.show();
			canvasCrosshair.def.lines.bottom.show();
			canvasCrosshair.def.lines.left.show();
			canvasCrosshair.def.lines.right.show();
		}

	} else {
		canvasCrosshair.def.group.hide();
		canvasCrosshair.classic.group.show();
	}

	// canvasCrosshair.def.group.getStage().draw();
	// canvas.stage.getUserPosition(); //
	canvas.stage.draw();
}

function updateControl() {
	var enable = getCrosshairStyleType(crosshair.style) == "classic";
	for (type in crosshair) {
		if (control.spinner[type]) {
			control.spinner[type].spinner("value", crosshair[type]);
			control.spinner[type].spinner(enable || (type == "gap" && !isCrosshairDynamic(crosshair.style)) ? "enable" : "disable");
		}
		if (control.slider[type]) {
			control.slider[type].slider("value", crosshair[type]);
			control.slider[type].slider(enable || (type == "gap" && !isCrosshairDynamic(crosshair.style)) ? "enable" : "disable");
		}
		if (control.button[type]) {
			control.button[type].button(enable || type == "style" ? "enable" : "disable");
			var buttonChecked = (type != "style" && crosshair[type]) || (type == "style" && isCrosshairDynamic(crosshair[type]));
			control.button[type].prop("checked", buttonChecked);
			control.button[type].val(crosshair[type]).button("refresh");
		}
		if (control.buttonset[type]) {
			control.buttonset[type].find("input[value=" + crosshair[type] + "]").prop("checked", false);
			control.buttonset[type].find("label").removeClass("ui-state-active").attr("aria-pressed", true);
			control.buttonset[type].buttonset(enable || type == "style" || type == "color" ? "enable" : "disable");
			if (type == "style") {
				control.buttonset[type].find("input[value=" + getCrosshairStyleType(crosshair[type]) + "]").prop("checked", true);
				control.buttonset[type].find("label[for=crosshair_" + type + "_" + getCrosshairStyleType(crosshair[type]) + "]").addClass("ui-state-active").attr("aria-pressed",
						true);
			} else {
				control.buttonset[type].find("input[value=" + crosshair[type] + "]").prop("checked", true);
				control.buttonset[type].find("label[for=crosshair_" + type + "_" + crosshair[type] + "]").addClass("ui-state-active").attr("aria-pressed", true);
			}
			// control.buttonset[type].buttonset("refresh");
		}
	}

	var alphaEnable = enable && crosshair.usealpha;
	control.slider.alpha.slider(alphaEnable ? "enable" : "disable");
	control.spinner.alpha.spinner(alphaEnable ? "enable" : "disable");
	
	var outlineEnable = enable && crosshair.outline_draw;
	control.slider.outline.slider(outlineEnable ? "enable" : "disable");
	control.spinner.outline.spinner(outlineEnable ? "enable" : "disable");

	control.colorPalette.spectrum("set", "rgb " + crosshair.color_r + " " + crosshair.color_g + " " + crosshair.color_b);

	var colorEnable = (crosshair.color < 1 || crosshair.color > 4) && enable;
	control.slider.color_r.slider(colorEnable ? "enable" : "disable");
	control.slider.color_g.slider(colorEnable ? "enable" : "disable");
	control.slider.color_b.slider(colorEnable ? "enable" : "disable");
	control.spinner.color_r.spinner(colorEnable ? "enable" : "disable");
	control.spinner.color_g.spinner(colorEnable ? "enable" : "disable");
	control.spinner.color_b.spinner(colorEnable ? "enable" : "disable");
	$("#crosshair_color").css("opacity", colorEnable ? 1 : 0.5);

	if (enable)
		$("[for=crosshair_color_5]").css("opacity", 1);
	else
		$("[for=crosshair_color_5]").css("opacity", 0.5);
}

function updateConfig() {
	control.config.val(getCrosshairConfig(crosshair));
	control.configConsole.val(getCrosshairConfig(crosshair, ";"));
}

function updateBindsCrosshair(id, bind) {
	if (id)
		binds.crosshair[id] = binds.crosshair[id] ? jQuery.extend(true, binds.crosshair[id], bind) : bind;
	updateBinds();
}

function updateBinds() {
	var autoexes = keyBinds = aliases = "";
	var crosshairString = crosshairThicknessNext = crosshairThicknessPrev = crosshairSizeNext = crosshairSizePrev = crosshairGapNext = crosshairGapPrev = toggleCrosshairBind = "";
	var toggleCrosshair = [];
	var aliasBinds = [];
	for (id in binds.crosshair) {
		if (binds.crosshair[id].key && binds.crosshair[id].name) {
			crosshairString = getCrosshairConfig(binds.crosshair[id].crosshair, ";", "");
			crosshairThicknessNext = bound((round5(binds.crosshair[id].crosshair.thickness * 10) / 10) + 0.5, 0, 30);
			crosshairThicknessPrev = bound((round5(binds.crosshair[id].crosshair.thickness * 10) / 10) - 0.5, 0, 30);
			crosshairSizeNext = bound(Math.round(binds.crosshair[id].crosshair.size) + 1, 0, 30);
			crosshairSizePrev = bound(Math.round(binds.crosshair[id].crosshair.size) - 1, 0, 30);
			crosshairGapNext = bound(Math.round(binds.crosshair[id].crosshair.gap) + 1, -25, 25);
			crosshairGapPrev = bound(Math.round(binds.crosshair[id].crosshair.gap) - 1, -25, 25);

			aliases += "alias \"" + binds.crosshair[id].name + "\" \"" + crosshairString;
			if (binds.size_inc)
				aliases += "bind " + binds.size_inc + " size_" + crosshairSizeNext + ";";
			if (binds.size_dec)
				aliases += "bind " + binds.size_dec + " size_" + crosshairSizePrev + ";";
			if (binds.thickness_inc)
				aliases += "bind " + binds.thickness_inc + " thick_" + ("" + crosshairThicknessNext).replace(".", "_") + ";";
			if (binds.thickness_dec)
				aliases += "bind " + binds.thickness_dec + " thick_" + ("" + crosshairThicknessPrev).replace(".", "_") + ";";
			if (binds.gap_inc)
				aliases += "bind " + binds.gap_inc + " gap_" + ("" + crosshairGapNext).replace("-", "_") + ";";
			if (binds.gap_dec)
				aliases += "bind " + binds.gap_dec + " gap_" + ("" + crosshairGapPrev).replace("-", "_") + ";";

			aliases += "\" //" + BINDS_POST.CROSSHAIR + id + "\n";
			keyBinds += "bind \"" + binds.crosshair[id].key + "\" \"" + binds.crosshair[id].name + "\" // Chrosshair '" + binds.crosshair[id].name + "'\n";
			toggleCrosshair.push(id);

			aliasBinds.push("'" + binds.crosshair[id].key + "': Crosshair '" + binds.crosshair[id].name + "'");
		}
	}

	var toggle = "";
	if (binds.toggle && toggleCrosshair.length > 0) {
		var id = toggleCrosshairCurrent = toggleCrosshairNext = toggleCrosshairFirst = null;
		var toggleCrosshairKey = binds.toggle;
		for ( var i = 0; i < toggleCrosshair.length; i++) {
			id = toggleCrosshair[i];
			toggleCrosshairCurrent = binds.crosshair[id].name;
			if (i == 0)
				toggleCrosshairFirst = toggleCrosshairCurrent;
			toggleCrosshairNext = toggleCrosshair[i + 1] != undefined ? binds.crosshair[toggleCrosshair[i + 1]].name : toggleCrosshairFirst;
			toggle += "alias \"toggle_" + toggleCrosshairCurrent + "\" \"" + toggleCrosshairCurrent + ";bind " + toggleCrosshairKey + " toggle_" + toggleCrosshairNext + ";\"\n";
		}
		toggle += "bind \"" + toggleCrosshairKey + "\" \"toggle_" + toggleCrosshairFirst + "\" // Toggle crosshairs\n";
		toggle += "\n";

		aliasBinds.push("'" + toggleCrosshairKey + "': Toggle " + toggleCrosshair.length + " crosshairs");
	}

	var dot = "";
	if (binds.toggle_dot) {
		dot = "alias \"dot_on\" \"cl_crosshairdot 1; bind " + binds.toggle_dot + " dot_off;\"\n";
		dot += "alias \"dot_off\" \"cl_crosshairdot 0; bind " + binds.toggle_dot + " dot_on;\"\n";
		dot += "bind \"" + binds.toggle_dot + "\" \"dot_on\" // Toggle crosshair dot\n";
		dot += "\n";

		aliasBinds.push("'" + binds.toggle_dot + "': Toggle crosshair dot");
	}

	var size = "";
	if (binds.size_inc || binds.size_dec) {
		var sizeIncNext = sizeIncPrev = null;
		var sizeIncKey = binds.size_inc;
		var sizeDecKey = binds.size_dec;
		for ( var i = 0; i <= 30; i++) {
			sizeIncNext = i < 30 ? i + 1 : 0;
			sizeIncPrev = i > 0 ? i - 1 : 30;
			size += "alias \"size_" + i + "\" \"cl_crosshairsize " + i + ";";
			if (sizeIncKey)
				size += "bind " + sizeIncKey + " size_" + sizeIncNext + ";";
			if (sizeDecKey)
				size += "bind " + sizeDecKey + " size_" + sizeIncPrev + ";";
			size += "\"\n";
		}
		if (sizeIncKey) {
			size += "bind \"" + sizeIncKey + "\" \"size_0\" // Increase crosshair size\n";
			aliasBinds.push("'" + sizeIncKey + "': Increase crosshair size");
		}
		if (sizeDecKey) {
			size += "bind \"" + sizeDecKey + "\" \"size_30\" // Decrease crosshair size\n";
			aliasBinds.push("'" + sizeDecKey + "': Decrease crosshair size");
		}
		size += "\n";

	}

	var thickness = "";
	if (binds.thickness_inc || binds.thickness_dec) {
		var thicknessIncNext = thicknessIncPrev = null;
		var thicknessIncKey = binds.thickness_inc;
		var thicknessDecKey = binds.thickness_dec;
		for ( var i = 0; i <= 30; i += 0.5) {
			thicknessIncNext = ("" + (i < 30 ? i + 0.5 : 0)).replace(".", "_");
			thicknessIncPrev = ("" + (i > 0 ? i - 0.5 : 30)).replace(".", "_");
			thickness += "alias \"thick_" + ("" + i).replace(".", "_") + "\" \"cl_crosshairthickness " + i + ";";
			if (thicknessIncKey)
				thickness += "bind " + thicknessIncKey + " thick_" + thicknessIncNext + ";";
			if (thicknessDecKey)
				thickness += "bind " + thicknessDecKey + " thick_" + thicknessIncPrev + ";";
			thickness += "\"\n";
		}
		if (thicknessIncKey) {
			thickness += "bind \"" + thicknessIncKey + "\" \"thick_0\" // Increase crosshair thickness\n";
			aliasBinds.push("'" + thicknessIncKey + "': Increase crosshair thickness");
		}
		if (thicknessDecKey) {
			thickness += "bind \"" + thicknessDecKey + "\" \"thick_30\" // Decrease crosshair thickness\n";
			aliasBinds.push("'" + thicknessDecKey + "': Decrease crosshair thickness");
		}
		thickness += "\n";
	}

	var gap = "";
	if (binds.gap_inc || binds.gap_dec) {
		var gapIncNext = gapIncPrev = null;
		var gapIncKey = binds.gap_inc;
		var gapDecKey = binds.gap_dec;
		for ( var i = -25; i <= 25; i++) {
			gapIncNext = ("" + bound(i + 1, -25, 25)).replace("-", "_");
			gapIncPrev = ("" + bound(i - 1, -25, 25)).replace("-", "_");
			gap += "alias \"gap_" + ("" + i).replace("-", "_") + "\" \"cl_crosshairgap " + i + ";cl_fixedcrosshairgap " + i + ";";
			if (gapIncKey)
				gap += "bind " + gapIncKey + " gap_" + gapIncNext + ";";
			if (gapDecKey)
				gap += "bind " + gapDecKey + " gap_" + gapIncPrev + ";";
			gap += "\"\n";
		}
		if (gapIncKey) {
			gap += "bind \"" + gapIncKey + "\" \"gap_0\" // Increase crosshair gap\n";
			aliasBinds.push("'" + gapIncKey + "': Increase crosshair gap");
		}
		if (gapDecKey) {
			gap += "bind \"" + gapDecKey + "\" \"gap_25\" // Decrease crosshair gap\n";
			aliasBinds.push("'" + gapDecKey + "': Decrease crosshair gap");
		}
		gap += "\n";
	}

	autoexes += aliases;
	autoexes += "\n";
	autoexes += keyBinds;
	autoexes += "\n";
	autoexes += toggle;
	autoexes += dot;
	autoexes += size;
	autoexes += thickness;
	autoexes += gap;
	autoexes = jQuery.trim(autoexes);

	if (autoexes != "") {
		var aliasBindsString = "\n\nalias \"binds\" \"";
		for ( var i in aliasBinds) {
			aliasBindsString += "echo " + aliasBinds[i] + ";";
		}
		aliasBindsString += "\"";
		autoexes += aliasBindsString;
	}

	binds_tab.autoexes.val(autoexes);
	localStorage.setItem('autoexec', autoexes);
}

// /UPDATE

// CHANGE

function changeCrosshair(change) {
	for (type in change) {
		if (crosshair[type] != undefined) {
			crosshair[type] = parseFloat(change[type]);
		}
	}
	crosshair.fgap = crosshair.gap;
	updateConfig();
	updateControl();
	updateCrosshair(canvas.crosshair, crosshair);
	animateCrosshair(true);

	// Update crosshair
	if (crosshairTimeout)
		clearTimeout(crosshairTimeout);
	crosshairTimeout = setTimeout(function() {
		updateHash(crosshair);
	}, 2000);
}

function changeConfig() {
	var regex, match, config = control.config.val(), crosshairNew = {}, val, i = 0;
	for (type in CONFIG) {
		regex = new RegExp(CONFIG[type] + "\\s\\W?([\\-\\d.]+)\\W?");
		match = config.match(regex);
		if (match != null) {
			val = getCrosshairValue(type, parseFloat(match[1]));
			if (match != null && crosshair[type] != undefined && crosshair[type] != val) {
				i++;
				crosshairNew[type] = val;
			}
		}
	}
	if (i > 0)
		changeCrosshair(crosshairNew);
	else
		updateConfig();
}

function changeBindAutoexec() {
	var regexBind = /bind "(.+)" "([\w]+)"/g;
	var regexAlias = /alias "(.+)" "([\w\s;.\-]+)"\s?\/\/(.)(\w+)?/g;
	var autotexec = binds_tab.autoexes.val();

	var bindsNew = {
		crosshair : {},
		toggle : null,
		toggle_dot : null,
		gap_inc : null,
		gap_dec : null,
		size_inc : null,
		size_dec : null,
		thickness_inc : null,
		thickness_dec : null
	};

	// Alias
	var match = regexAlias.exec(autotexec);
	var name = alias = type = null;
	while (match != null) {
		// for ( var i = 0; i < match.length; i++) {
		name = match[1];
		alias = match[2];
		type = match[3];
		id = match[4];

		switch (type) {
		case BINDS_POST.CROSSHAIR:
			bindsNew.crosshair[id] = {
				id : id,
				name : name,
				crosshairAlias : alias,
				crosshair : getCrosshairParsed(alias)
			};
			break;
		}
		// }
		match = regexAlias.exec(autotexec);
	}

	// Binds
	var match = regexBind.exec(autotexec);
	var key = name = type = null;
	while (match != null) {
		// for ( var i = 0; i < match.length; i++) {
		key = match[1];
		name = match[2];
		// type = match[3];

		// Crosshair
		for (id in bindsNew.crosshair) {
			if (name.match(new RegExp("^" + bindsNew.crosshair[id].name, "m"))) {
				bindsNew.crosshair[id].key = key;
			}
		}

		// Toggle
		if (name.match(/^toggle_/m)) {
			bindsNew.toggle = key;
		}
		// Dot
		else if (name.match(/^dot_/m)) {
			bindsNew.toggle_dot = key;
		}
		// Gap
		else if (name.match(/^gap_25/m)) {
			bindsNew.gap_inc = key;
		} else if (name.match(/^gap_0/m)) {
			bindsNew.gap_dec = key;
		}
		// Size
		else if (name.match(/^size_0/m)) {
			bindsNew.size_inc = key;
		} else if (name.match(/^size_30/m)) {
			bindsNew.size_dec = key;
		}
		// Thickness
		else if (name.match(/^thick_0/m)) {
			bindsNew.thickness_inc = key;
		} else if (name.match(/^thick_30/m)) {
			bindsNew.thickness_dec = key;
		}
		match = regexBind.exec(autotexec);
	}

	binds_tab.crosshairs.find("tbody").empty();
	binds_tab.binds.find("tbody").empty();
	binds = {
		crosshair : {}
	};
	var i = 0;
	for (id in bindsNew.crosshair) {
		if (bindsNew.crosshair[id].crosshair && bindsNew.crosshair[id].key) {
			binds_tab.crosshairs.addBind(bindsNew.crosshair[id].crosshair, bindsNew.crosshair[id].key, bindsNew.crosshair[id].name, id);
			i++;
		}
	}
	for (type in bindsNew) {
		if (type != "crosshair" && bindsNew[type]) {
			binds_tab.binds.addBind(type, bindsNew[type]);
			i++;
		}
	}
	if (i == 0)
		updateBinds();
};

// /CHANGE

// HASH

function getHash() {
	var hash = window.location.hash.substring(1);
	var hashesArray = hash.split("/");
	var hashesObject = {};
	var hashArray;
	for (i in hashesArray) {
		hashArray = hashesArray[i].split(/[\:\=]/);
		hashesObject[hashArray[0]] = hashArray[1];
	}
	return hashesObject;
};

function updateHash(hashObject) {
	var hash = getHash();
	var hashNew = $.extend(hash, hashObject);
	var hashArray = [];
	for (key in hashNew) {
		if (key && hashNew[key] != undefined && key != "fgap") {
			hashArray.push(key + "=" + hashNew[key]);
		}
	}
	window.location.hash = "#" + hashArray.join("/");
};

// /HASH

function animateCrosshair(reset) {
	reset = reset || false;
	if (!isCrosshairDynamic(crosshair.style)) {
		animate.step = 0;
		return;
	}
	if (reset) {
		if (animate.timout)
			animate.timout = clearTimeout(animate.timout);
		animate.timout = setTimeout(function() {
			animateCrosshair(false);
		}, 500);
		animate.step = 10;
	} else {
		animate.step -= 1;
		if (animate.step <= 0) {
			clearInterval(animate.timout);
			animate.step = 0;
		} else {
			animate.timout = setTimeout(function() {
				animateCrosshair(false);
			}, 50);
		}
	}
	updateCrosshair(canvas.crosshair, crosshair);
}
