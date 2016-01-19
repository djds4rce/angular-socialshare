'use strict';

/*
 *  * angular-socialshare v0.0.2
 *   * ♡ CopyHeart 2014 by Dayanand Prabhu http://djds4rce.github.io
 *    * Copying is an act of love. Please copy.
 *     */

angular.module('djds4rce.angular-socialshare', [])
	.factory('$FB', ['$window', function($window) {
		return {
			init: function(fbId) {
				if (fbId) {
					this.fbId = fbId;
					$window.fbAsyncInit = function() {
						FB.init({
							appId: fbId,
							channelUrl: 'app/channel.html',
							status: true,
							xfbml: true
						});
					};
					(function(d) {
						var js,
							id = 'facebook-jssdk',
							ref = d.getElementsByTagName('script')[0];
						if (d.getElementById(id)) {
							return;
						}

						js = d.createElement('script');
						js.id = id;
						js.async = true;
						js.src = "//connect.facebook.net/en_US/all.js";

						ref.parentNode.insertBefore(js, ref);

					}(document));
				} else {
					throw ("FB App Id Cannot be blank");
				}
			}
		};

	}]).directive('facebook', ['$http', function($http) {
		return {
			scope: {
				callback: '=',
				shares: '='
			},
			transclude: true,
			template: '<div class="facebookButton">' +
				'<div class="pluginButton">' +
				'<div class="pluginButtonContainer">' +
				'<div class="pluginButtonImage">' +
				'<button type="button">' +
				'<i class="pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue"></i>' +
				'</button>' +
				'</div>' +
				'<span class="pluginButtonLabel">Share</span>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="facebookCount">' +
				'<div class="pluginCountButton pluginCountNum">' +
				'<span ng-transclude></span>' +
				'</div>' +
				'<div class="pluginCountButtonNub"><s></s><i></i></div>' +
				'</div>',
			link: function(scope, element, attr) {
				attr.$observe('url', function() {
					if (attr.shares && attr.url) {
						$http.get('https://api.facebook.com/method/links.getStats?urls=' + attr.url + '&format=json').success(function(res) {
							var count = res[0] ? res[0].total_count.toString() : 0;
							var decimal = '';
							if (count.length > 6) {
								if (count.slice(-6, -5) != "0") {
									decimal = '.' + count.slice(-6, -5);
								}
								count = count.slice(0, -6);
								count = count + decimal + 'M';
							} else if (count.length > 3) {
								if (count.slice(-3, -2) != "0") {
									decimal = '.' + count.slice(-3, -2);
								}
								count = count.slice(0, -3);
								count = count + decimal + 'k';
							}
							scope.shares = count;
						}).error(function() {
							scope.shares = 0;
						});
					}
					element.unbind();
					element.bind('click', function(e) {
						FB.ui({
							method: 'share',
							href: attr.url
						}, function(response){
							if (scope.callback !== undefined && typeof scope.callback === "function") {
								scope.callback(response);
							}
						});
						e.preventDefault();
					});
				});
			}
		};
	}]).directive('facebookFeedShare', ['$http', function($http) {
		return {
			scope: {
				callback: '=',
				shares: '='
			},
			transclude: true,
			template: '<div class="facebookButton">' +
				'<div class="pluginButton">' +
				'<div class="pluginButtonContainer">' +
				'<div class="pluginButtonImage">' +
				'<button type="button">' +
				'<i class="pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue"></i>' +
				'</button>' +
				'</div>' +
				'<span class="pluginButtonLabel">Share</span>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="facebookCount">' +
				'<div class="pluginCountButton pluginCountNum">' +
				'<span ng-transclude></span>' +
				'</div>' +
				'<div class="pluginCountButtonNub"><s></s><i></i></div>' +
				'</div>',
			link: function(scope, element, attr) {
				attr.$observe('url', function() {
					if (attr.shares && attr.url) {
						$http.get('https://api.facebook.com/method/links.getStats?urls=' + attr.url + '&format=json').success(function(res) {
							var count = res[0] ? res[0].total_count.toString() : 0;
							var decimal = '';
							if (count.length > 6) {
								if (count.slice(-6, -5) != "0") {
									decimal = '.' + count.slice(-6, -5);
								}
								count = count.slice(0, -6);
								count = count + decimal + 'M';
							} else if (count.length > 3) {
								if (count.slice(-3, -2) != "0") {
									decimal = '.' + count.slice(-3, -2);
								}
								count = count.slice(0, -3);
								count = count + decimal + 'k';
							}
							scope.shares = count;
						}).error(function() {
							scope.shares = 0;
						});
					}
					element.unbind();
					element.bind('click', function(e) {
						FB.ui({
							method: 'feed',
							link: attr.url,
							picture: attr.picture,
							name: attr.name,
							caption: attr.caption,
							description: attr.description
						}, function(response){
							if (scope.callback !== undefined && typeof scope.callback === "function") {
								scope.callback(response);
							}
						});
						e.preventDefault();
					});
				});
			}
		};
	}]).directive('twitter', ['$timeout', function($timeout) {
		return {
			link: function(scope, element, attr) {
				var renderTwitterButton = debounce(function() {
					if (attr.url) {
						$timeout(function() {
							element[0].innerHTML = '';
							twttr.widgets.createShareButton(
								attr.url,
								element[0],
								function() {}, {
									count: attr.count,
									text: attr.text,
									via: attr.via,
									size: attr.size
								}
							);
						});
					}
				}, 75);
				attr.$observe('url', renderTwitterButton);
				attr.$observe('text', renderTwitterButton);
			}
		};
	}]).directive('linkedin', ['$timeout', '$http', '$window', function($timeout, $http, $window) {
		return {
			scope: {
				shares: '='
			},
			transclude: true,
			template: '<div class="linkedinButton">' +
				'<div class="pluginButton">' +
				'<div class="pluginButtonContainer">' +
				'<div class="pluginButtonImage">in' +
				'</div>' +
				'<span class="pluginButtonLabel"><span>Share</span></span>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="linkedinCount">' +
				'<div class="pluginCountButton">' +
				'<div class="pluginCountButtonRight">' +
				'<div class="pluginCountButtonLeft">' +
				'<span ng-transclude></span>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>',
			link: function(scope, element, attr) {
				var renderLinkedinButton = debounce(function() {
					if (attr.shares && attr.url) {
						$http.jsonp('https://www.linkedin.com/countserv/count/share?url=' + attr.url + '&callback=JSON_CALLBACK&format=jsonp').success(function(res) {
							scope.shares = res.count.toLocaleString();
						}).error(function() {
							scope.shares = 0;
						});
					}
					$timeout(function() {
						element.unbind();
						element.bind('click', function() {
							var url = encodeURIComponent(attr.url).replace(/'/g, "%27").replace(/"/g, "%22")
							$window.open("//www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + attr.title + "&summary=" + attr.summary);
						});
					});
				}, 100);
				attr.$observe('url', renderLinkedinButton);
				attr.$observe('title', renderLinkedinButton);
				attr.$observe('summary', renderLinkedinButton);
			}
		};
	}]).directive('gplus', [function() {
		return {
			link: function(scope, element, attr) {
				var googleShare = debounce(function() {
					if (typeof gapi == "undefined") {
						(function() {
							var po = document.createElement('script');
							po.type = 'text/javascript';
							po.async = true;
							po.src = 'https://apis.google.com/js/platform.js';
							po.onload = renderGoogleButton;
							var s = document.getElementsByTagName('script')[0];
							s.parentNode.insertBefore(po, s);
						})();
					} else {
						renderGoogleButton();
					}
				}, 100);
				//voodo magic
				var renderGoogleButton = (function(ele, attr) {
					return function() {
						var googleButton = document.createElement('div');
						var id = attr.id || randomString(5);
						attr.id = id;
						googleButton.setAttribute('id', id);
						element.innerHTML = '';
						element.append(googleButton);
						if (attr.class && attr.class.indexOf('g-plusone') != -1) {
							window.gapi.plusone.render(id, attr);
						} else {
							window.gapi.plus.render(id, attr);
						}
					}
				}(element, attr));
				attr.$observe('href', googleShare);
			}
		};
	}]).directive('tumblrText', [function() {
		return {
			link: function(scope, element, attr) {
				var tumblr_button = document.createElement("a");
				var renderTumblrText = debounce(function() {
					tumblr_button.setAttribute("href", "https://www.tumblr.com/share/link?url=" + encodeURIComponent(attr.url) + "&name=" + encodeURIComponent(attr.name) + "&description=" + encodeURIComponent(attr.description));
					tumblr_button.setAttribute("title", attr.title || "Share on Tumblr");
					tumblr_button.setAttribute("style", attr.styling || "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('https://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
					element[0].innerHTML = '';
					element.append(tumblr_button);
				}, 100);
				attr.$observe('url', renderTumblrText);
				attr.$observe('name', renderTumblrText);
				attr.$observe('description', renderTumblrText);
			}

		}
	}]).directive('tumblrQoute', [function() {
		return {
			link: function(scope, element, attr) {
				var tumblr_button = document.createElement("a");
				var renderTumblrQoute = debounce(function() {
					tumblr_button.setAttribute("href", "https://www.tumblr.com/share/quote?quote=" + encodeURIComponent(attr.qoute) + "&source=" + encodeURIComponent(attr.source));
					tumblr_button.setAttribute("title", attr.title || "Share on Tumblr");
					tumblr_button.setAttribute("style", attr.styling || "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('https://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
					element[0].innerHTML = '';
					element.append(tumblr_button);
				}, 100);
				attr.$observe('qoute', renderTumblrQoute);
				attr.$observe('source', renderTumblrQoute);
			}
		}
	}]).directive('tumblrImage', [function() {
		return {
			link: function(scope, element, attr) {
				var tumblr_button = document.createElement("a");
				var renderTumblrImage = debounce(function() {
					tumblr_button.setAttribute("href", "https://www.tumblr.com/share/photo?source=" + encodeURIComponent(attr.source) + "&caption=" + encodeURIComponent(attr.caption) + "&clickthru=" + encodeURIComponent(attr.clickthru));
					tumblr_button.setAttribute("title", attr.title || "Share on Tumblr");
					tumblr_button.setAttribute("style", attr.styling || "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('https://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
					element[0].innerHTML = '';
					element.append(tumblr_button);
				}, 100);
				attr.$observe('source', renderTumblrImage);
				attr.$observe('caption', renderTumblrImage);
				attr.$observe('clickthru', renderTumblrImage);
			}
		}
	}]).directive('tumblrVideo', [function() {
		return {
			link: function(scope, element, attr) {
				var tumblr_button = document.createElement("a");
				var renderTumblrVideo = debounce(function() {
					tumblr_button.setAttribute("href", "https://www.tumblr.com/share/video?embed=" + encodeURIComponent(attr.embedcode) + "&caption=" + encodeURIComponent(attr.caption));
					tumblr_button.setAttribute("title", attr.title || "Share on Tumblr");
					tumblr_button.setAttribute("style", attr.styling || "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('https://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
					element[0].innerHTML = '';
					element.append(tumblr_button);
				}, 100);
				attr.$observe('embedcode', renderTumblrVideo);
				attr.$observe('caption', renderTumblrVideo);
			}
		}
	}]).directive('pintrest', ['$window', '$timeout', function($window, $timeout) {
		return {
			template: '<a href="{{href}}" data-pin-do="{{pinDo}}" data-pin-config="{{pinConfig}}"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" /></a>',
			link: function(scope, element, attr) {
				var pintrestButtonRenderer = debounce(function() {
					var pin_button = document.createElement("a");
					pin_button.setAttribute("href", '//www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(attr.href) + '&media=' + encodeURIComponent(attr.img) + '&description=' + encodeURIComponent(attr.description));
					pin_button.setAttribute("pinDo", attr.pinDo || "buttonPin");
					pin_button.setAttribute("pinConfig", attr.pinConfig || "beside");
					element[0].innerHTML = '';
					element.append(pin_button);
					$timeout(function() {
						$window.parsePins(element);
					});
				}, 100);

				attr.$observe('href', pintrestButtonRenderer);
				attr.$observe('img', pintrestButtonRenderer);
				attr.$observe('description', pintrestButtonRenderer);
			}
		}
	}]);
//Simple Debounce Implementation
//http://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
//http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
/**
 * RANDOM STRING GENERATOR
 *
 * Info:      http://stackoverflow.com/a/27872144/383904
 * Use:       randomString(length [,"A"] [,"N"] );
 * Default:   return a random alpha-numeric string
 * Arguments: If you use the optional "A", "N" flags:
 *            "A" (Alpha flag)   return random a-Z string
 *            "N" (Numeric flag) return random 0-9 string
 */
function randomString(len, an) {
	an = an && an.toLowerCase();
	var str = "",
		i = 0,
		min = an == "a" ? 10 : 0,
		max = an == "n" ? 10 : 62;
	for (; i++ < len;) {
		var r = Math.random() * (max - min) + min << 0;
		str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
	}
	return str;
}
