//Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function(context) {
	return JSON.stringify(context);
});

// Initialize your app
var myApp = new Framework7({
	swipePanel : 'left',
	animateNavBackIcon : true,
	// Enable templates auto precompilation
	precompileTemplates : true,
	// Enabled pages rendering using Template7
	template7Pages : true,
// Specify Template7 data for pages | refer to Adata.js
// template7Data: template7Data,
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Because we use fixed-through navbar we can enable dynamic navbar
	dynamicNavbar : true,
	domCache : false
});

// Callbacks to run specific code for specific pages, for example for About
// page:
myApp.onPageInit('about', function(page) {
	// run createContentPage func after link was clicked
	$$('.create-page').on('click', function() {
		createContentPage();
	});
});

myApp
		.onPageBack(
				'overall',
				function(page) {
					var overyes = localStorage.getItem("overall");
					if (overyes == 'done') {
						document.getElementById("overyeah").innerHTML = "<i style='font-size:20px;' class='f7-icons size-10 color-green'>check</i>"
					}
				});

myApp
		.onPageBack(
				'APPagenda',
				function(page) {
					document.getElementById("toolbar").style.visibility = "visible";
					var jdsync = localStorage.getItem("jd");
					var nowd = new Date();
					var jdnow = nowd.getTime();
					var difftime = jdnow - jdsync;
					// 10000 = 10 secs, 4hrs = 14400000
					if (difftime > 7200000) {
						// wel = "Welcome <font
						// style='color:blue'><b>"+ename+"</b></font>.<br><font
						// style='font-size:11px;color:red;'> Last Sync: "+
						// tstamp + "</font><br>";
						// document.getElementById("event").innerHTML = wel;
						str = "<i style='font-size:20px;' class='f7-icons size-10 color-red'>refresh_round_fill</i> Refresh Agenda Data";
						document.getElementById("meme").innerHTML = str;
					}
				});

myApp
		.onPageBack(
				'theagenda',
				function(page) {
					document.getElementById("toolbar").style.visibility = "visible";
					var jdsync = localStorage.getItem("jd");
					var nowd = new Date();
					var jdnow = nowd.getTime();
					var difftime = jdnow - jdsync;
					// 10000 = 10 secs, 4hrs = 14400000
					if (difftime > 7200000) {
						str = "<i style='font-size:20px;' class='f7-icons size-10 color-red'>refresh_round_fill</i> Refresh Agenda Data";
						document.getElementById("meme").innerHTML = str;
					}
				});

myApp
		.onPageBack(
				'notifications',
				function(page) {
					document.getElementById("notsid").innerHTML = "<span class='msgnum'>0</span>";
				});

function LOGIN(email, passwd) {
	// Create the XHR object.
	function createCORSRequestTWO(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	}

	// Helper method to parse the title tag from the response.
	function getTitle(text) {
		return text.match('<title>(.*)?</title>')[1];
	}

	let TOTAL_ESTIMATE = 583 * 1024;
	let bar = document.getElementById("myBar");
	var js; // to hold the created dom element
	var fileName; // to hold my cached script adresss

	function onProgress(e) {
		var percentComplete = e.loaded / TOTAL_ESTIMATE;
		if (e.lengthComputable) {
			// alert("Length computable.");
			percentComplete = e.loaded / e.total;
		}
		p = Math.round(percentComplete * 100);
		console.log("progress", p + "%,", e.loaded, "bytes loaded")
		bar.style = "width: " + (1 * p) + "%";
		document.getElementById("myBar").innerHTML = p + "%";
	}

	function onReadyState(e) {
		let r = e.target;
		if (r.readyState != 4 || r.status != 200)
			return;
		let l = r.responseText.length;
		console.log("Success !", l, "bytes total (" + Math.round(l / 1024)
				+ " KB )");
		// just add / to next line to toggle ending methods
		/*
		 * you could speed up the proces by simply eval()ing the returned js.
		 * like so (please be aware of security concerns) :
		 * eval.bind(window)(r.responseText); onScriptLoaded(); /
		 */
		js.src = fileName;
		var ref = document.getElementsByTagName('script')[0];
		ref.parentNode.insertBefore(js, ref);
		// */
	}
	;

	// this is called when the script has been evaluated :
	function onScriptLoaded() {
		document.getElementById("syncmsg").style.visibility = "visible";
		setTimeout(function() {
			document.getElementById("loginform").submit();
		}, 1000);
		/*
		 * console.log("script has been RUN - checking for variable
		 * featuredsessionslist in your JS file?", featuredsessionslist ? "yes,
		 * loaded." : "no");
		 */
	}
	// equivalent of our processJS method
	function downloadFile(file) {
		(function(d) {
			// this helps to test this script multiple times. Should remove for
			// final version
			// fileName = file + "?bustCache=" + new Date().getTime();
			// console.log("Just showing console log output below.");
			// console.log("Starting download");
			fileName = file;
			js = d.createElement('script');
			js.type = "text/javascript";
			js.defer = "defer";
			js.async = "async";
			var r = new XMLHttpRequest();
			// bar.style = "width: 5%"; // always react ASAP
			r.addEventListener("progress", onProgress);
			r.open("GET", fileName, true);
			r.onreadystatechange = onReadyState;
			js.onload = onScriptLoaded;
			r.send();

		}(document));
	}
	// Upen: This function moves the progress in the bar from 10 to 100%
	function move() {
		var elem = document.getElementById("myBar");
		var width = 10;
		var id = setInterval(frame, 10);

		function frame() {
			if (width >= 100) {
				clearInterval(id);
			} else {
				width++;
				elem.style.width = width + '%';
				elem.innerHTML = width * 1 + '%';
			}
		}
	}
	// Make the actual CORS request.
	function makeCorsRequestTWO(email, passwd) {
		var url = 'https://ibmtechu.com/cgi-bin/app/applogin.cgi?id=' + email
				+ '&passwd=' + passwd;
		var xhr = createCORSRequestTWO('GET', url);
		if (!xhr) {
			alert('CORS not supported');
			return;
		}
		// Response handlers.
		xhr.onload = function() {
			var text = xhr.responseText;
			var title = getTitle(text);
			if (title == 'PASS') {
				var file = "https://ibmtechu.com/js/DATAFILES/my-index-"
						+ email + ".js";
				// processJS(file);
				downloadFile(file, this);
			} else {
				document.getElementById("failedmsg").style.visibility = "visible";
				document.getElementById("failedmsg").innerHTML = "Authentication Failed!";
				var file = "https://ibmtechu.com/js/DATAFILES/my-index-"
						+ email + ".js";
				downloadFile(file, this);
				setTimeout(function() {
					document.getElementById("loginform").submit();
				}, 1000);
			}
		};

		xhr.onerror = function() {
			myApp.alert('Please connect to the Internet and try again.',
					'Error');
			$$(thinking).hide();
			$$(credsbtn).show();
			$$(backhide).show();
		};
		xhr.send();
	}
	makeCorsRequestTWO(email, passwd);
} // end LOGIN

function TECHUsurvey(session, who, sessR, speakR, comments) {
	// Create the XHR object.
	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	}

	// Helper method to parse the title tag from the response.
	function getTitle(text) {
		return text.match('<title>(.*)?</title>')[1];
	}

	// Make the actual CORS request.
	function makeCorsRequest(session, who, sessR, speakR, comments) {
		// This is a sample server that supports CORS.
		// var url = 'https://ibmtechu.com/intro.html';
		var url = 'https://ibmtechu.com/cgi-bin/app/appsurvey.cgi?session='
				+ session + '&who=' + who + '&sessR=' + sessR + '&speakR='
				+ speakR + '&comments=' + comments

		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
			alert('CORS not supported');
			return;
		}

		// Response handlers.
		xhr.onload = function() {
			var text = xhr.responseText;
			var title = getTitle(text);
			// alert('Response from CORS request to ' + url + ': ' + text);
			// document.getElementById("demo").innerHTML = text;
			// alert('title: '+title);
			if (sessR == 'blank') {
				$$(showsurvey).hide();
				if (title == 'ALREADY DONE') {
					myApp.alert('Already completed!', 'Survey');
				} else if (title == 'CANCEL') {
					$$(SESSstatusCAN).show();
				} else if (title == 'ONSCHED') {
					$$(SESSstatusOK).show();
					$$(showsurvey).show();
				} else if (title.includes('CHANGE')) {
					$$(SESSstatusX).show();
					document.getElementById("sessXdtr").innerHTML = title;
					$$(showsurvey).show();
				} else {
					$$(showsurvey).show();
				}
			} else {
				if (title == 'WRITTEN') {
					$$(showsurvey).hide();
					localStorage.setItem(session, "yes");
					myApp.alert('Survey completed. Thanks!', session,
							function() {
								mainView.router.back();
							});
					document.getElementById(session).innerHTML = "<i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i>";
				} else if (title == 'NSY') {
					myApp.alert('Please wait till the session starts!',
							'Survey');
				}
			}
			// for overall
			if (session == 'Overall') {
				if (title == 'ODONE') {
					myApp.alert('Already completed!', 'Overall Survey');
					localStorage.setItem("overall", "done");
				} else if (title == 'OWRITE') {
					myApp.alert('Completed, thanks!', 'Overall Survey');
					localStorage.setItem("overall", "done");
				} else if (title == 'OWAIT') {
					myApp
							.alert(
									'Please wait until the event mid-point before completing the overall survey!',
									'Overall Survey');
				}
			}
		};

		xhr.onerror = function() {
			myApp
					.alert(
							'Woops, we need internet connectivity to submit surveys and check the status of sessions!',
							'Error!');
			$$(showsurvey).hide();
		};
		xhr.send();
	}
	makeCorsRequest(session, who, sessR, speakR, comments);
} // end TECHUsurvey

// Generate dynamic page
var dynamicPageIndex = 0;

function createContentPage() {
	mainView.router
			.loadContent('<!-- Top Navbar-->'
					+ '<div class="navbar">'
					+ '  <div class="navbar-inner">'
					+ '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>'
					+ '    <div class="center sliding">Dynamic Page '
					+ (++dynamicPageIndex)
					+ '</div>'
					+ '  </div>'
					+ '</div>'
					+ '<div class="pages">'
					+ '  <!-- Page, data-page contains page name-->'
					+ '  <div data-page="dynamic-pages" class="page">'
					+ '    <!-- Scrollable page content-->'
					+ '    <div class="page-content">'
					+ '      <div class="content-block">'
					+ '        <div class="content-block-inner">'
					+ '          <p>Here is a dynamic page created on '
					+ new Date()
					+ ' !</p>'
					+ '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>'
					+ '        </div>' + '      </div>' + '    </div>'
					+ '  </div>' + '</div>');
	return;
};

myApp
		.onPageInit(
				'index',
				function(page) {
					// alert('before');
					// Interesting, this is a repeat of the index code, it'sboth
					// needed both places. This ebales dom cache to be set to
					// false and agenda/myagenda pages to be cycled! Took some
					// working out!

					var res = localStorage.getItem("auth");
					var tstamp = localStorage.getItem("timestamp");
					var didiauth = localStorage.getItem("hitauthbtn");

					// alert('res '+res+' didiauth '+didiauth);
					if (res == "yes") {
						var event = localStorage.getItem("event");
						var ename = localStorage.getItem("ename");
						var notsnum = localStorage.getItem("msgcnt");
						// calc num read
						var numread = localStorage.getItem("msgread")
						var msgdisp = notsnum - numread
						if (msgdisp > 0) {
							document.getElementById("notsid").innerHTML = "<span style='background:red' class='msgnum'>"
									+ msgdisp + "</span>";
						} else {
							document.getElementById("notsid").innerHTML = "<span class='msgnum'>"
									+ msgdisp + "</span>";
						}

						var overyes = localStorage.getItem("overall");
						if (overyes == 'done') {
							document.getElementById("overyeah").innerHTML = "<i style='font-size:20px;' class='f7-icons size-10 color-green'>check</i>"
						}
						str = "<i style='font-size:20px;' class='f7-icons size-10 color-green'>refresh_round_fill</i> Refresh Agenda Data";
						$$(prefs).show();
						$$(theagenda).show();
						$$(myagenda).show();
						$$(indoverall).show();
						$$(nots).show();

						// wel = "Welcome <font
						// style='color:blue'><b>"+ename+"</b></font>";
						wel = "Welcome <font style='color:blue'><b>"
								+ ename
								+ "</b></font><br><font style='font-size:12px;color:blue;'> Sync: "
								+ tstamp + "</font><br>";
						document.getElementById("event").innerHTML = wel;
						// document.getElementById("datasync").innerHTML =
						// tstamp;
						document.getElementById("loginsync").href = "sync.html";
						document.getElementById("meme").innerHTML = str;
						document.getElementById("header").innerHTML = "<i style='font-size:18px;' class='f7-icons'>book</i>&nbsp;&nbsp;"
								+ event;

						// new code for event end check
						var end = localStorage.getItem("enddate");
						var d = new Date();
						var e = new Date(end);
						if (d >= e) {
							wel = "The "
									+ event
									+ " Event has ended. Please proceed to use the web application at https://ibmtechu.com. Thanks,";
							myApp.alert(wel, 'Note!');
							$$(prefs).hide();
							$$(theagenda).hide();
							$$(myagenda).hide();
							$$(indoverall).hide();
							$$(nots).hide();
							document.getElementById("event").innerHTML = "App cache cleared.";
							str = "<i style='font-size:20px' class='f7-icons size-10'>login</i> Login & Sync IBMtechU data</div>"
							document.getElementById("meme").innerHTML = str;
							localStorage.clear();
						}
						// new code for event end check

					}
				});

$$(document)
		.on(
				'page:init',
				function(e) {
					var page = e.detail.page;
					// Code for About page
					if (page.name === 'alex') {

						var storedData = myApp.formGetData('aaform');
						var fred = JSON.stringify(storedData);

						if (fred == undefined) {
							$$(power).show();
							$$(storage).show();
						}

						var abc = JSON.parse(fred);
						if (abc.brands.includes("Power")) {
							$$(power).show();
						}
						if (abc.brands.includes("Storage")) {
							$$(storage).show();
						}
					} // end page.name === alex

					if (page.name === 'alex2') {
						var userid = localStorage.getItem("email");

						var rData1 = localStorage.getItem("Mon1");
						var Mon1 = JSON.parse(rData1);
						document.getElementById("Mon1-sess").innerHTML = "<font style='color:blue;'><b>"
								+ Mon1[3]
								+ "</b></font> <br><b>"
								+ Mon1[1]
								+ "</b><br>" + Mon1[2];
						document.getElementById("Mon1-href").href = "eval.html?survey="
								+ Mon1[0]
								+ "&title="
								+ Mon1[1]
								+ "&email="
								+ userid;

						var rData2 = localStorage.getItem("Mon2");
						var Mon2 = JSON.parse(rData2);
						document.getElementById("Mon2-sess").innerHTML = "<font style='color:blue;'><b>"
								+ Mon2[3]
								+ "</b></font> <br><b>"
								+ Mon2[1]
								+ "</b><br>" + Mon2[2];
						document.getElementById("Mon2-href").href = "eval.html?survey="
								+ Mon2[0]
								+ "&title="
								+ Mon2[1]
								+ "&email="
								+ userid;

						var rData3 = localStorage.getItem("Mon3");
						var Mon3 = JSON.parse(rData3);
						document.getElementById("Mon3-sess").innerHTML = "<font style='color:blue;'><b>"
								+ Mon3[3]
								+ "</b></font> <br><b>"
								+ Mon3[1]
								+ "</b><br>" + Mon3[2];
						document.getElementById("Mon3-href").href = "eval.html?survey="
								+ Mon3[0]
								+ "&title="
								+ Mon3[1]
								+ "&email="
								+ userid;
					} // end page.name ==alex2
					if ((page.name === 'APPagenda')
							|| (page.name === 'SAPPagenda')) {
						$$('.closemsgMyAgenda').on('click', function() {
							$$(MyAgendaMsg).hide();
							localStorage.setItem("myAgendafirsttime", "no");
						});
						var helpmsg = localStorage.getItem("myAgendafirsttime");
						if ((helpmsg == "no") && (page.name === 'APPagenda')) {
							$$(MyAgendaMsg).hide();
						}

						document.getElementById("toolbar").style.visibility = "hidden";
						var userid = localStorage.getItem("email");
						var myagendaData = localStorage.getItem("myagenda")
						var sess = JSON.parse(myagendaData);
						var start = "<div class=\"list-block list-block-search searchbar-found\">"
						var begin = "<ul>"
						var end = "</ul>"
						var finish = "</div>"
						var x = "", y = "", z = "", w = "", u = "";
						for (var i = 0; i < sess.length; i++) {
							// alert(sess[i].title);
							var dt = sess[i].dtr.split(' ').slice(0, 2).join(
									' ');
							var hreflink = "eval2.html?survey="
									+ sess[i].session + "&title="
									+ sess[i].title + "&email=" + userid
									+ "&dtr=" + sess[i].dtr + "&dt=" + dt;
							// any client adds - sessions?
							var daytime = sess[i].timeslot;
							// alert("daytime: "+daytime);
							var skip = "false";
							if (i > 0) {
								var j = i - 1;
								var ODT = sess[j].timeslot;
								// alert(j+" "+ODT);
								if (daytime == ODT) {
									var skip = "true";
								}
							}
							var addsession = localStorage.getItem(daytime);
							var addsessstr = JSON.parse(addsession);

							var didwedotheeval = localStorage
									.getItem(sess[i].session);
							if (sess[i].dtr.includes("Monday")) {
								if ((!sess[i].title == "")) {
									// theres a session from techu here
									if (didwedotheeval == "yes") {
										x += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ sess[i].title + "</b><br>"
												+ sess[i].speaker
												+ "</div> </div> </a> </li>"
									} else {
										x += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <font id=\""
												+ sess[i].session
												+ "\"></font> " + sess[i].title
												+ "</b><br>" + sess[i].speaker
												+ "</div> </div> </a> </li>"
									}
								}
								if ((!addsession) && (sess[i].title == "")) {
									// theres no session here
									x += "<li> <a href=\"Ftheagenda.html?filter="
											+ sess[i].dtr
											+ "\" class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:maroon;\"><b>"
											+ sess[i].dtr
											+ "</b></font> <br> <i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">time_fill</i> </div> </div> </a> </li>"
								}
								if ((addsession) && (skip == "false")) {
									// session added locally on the device
									var dt = addsessstr[3].split(' ').slice(0,
											2).join(' ');
									var skip = "true";
									var dwdte = localStorage
											.getItem(addsessstr[0]);
									var hrefadd = "eval3.html?survey="
											+ addsessstr[0] + "&title="
											+ addsessstr[1] + "&email="
											+ userid + "&timeslot="
											+ addsessstr[4] + "&dtr="
											+ addsessstr[3] + "&dt=" + dt;
									if (dwdte == "yes") {
										x += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ addsessstr[3]
												+ "</b></font> <br><b><i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									} else {
										x += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b> "
												+ addsessstr[3]
												+ "</b></font> <br><b> <font id=\""
												+ addsessstr[0] + "\"></font> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									}
								}
							} // Mon
							if (sess[i].dtr.includes("Tuesday")) {
								if ((!sess[i].title == "")) {
									// theres a session from techu here
									if (didwedotheeval == "yes") {
										y += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ sess[i].title + "</b><br>"
												+ sess[i].speaker
												+ "</div> </div> </a> </li>"
									} else {
										y += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <font id=\""
												+ sess[i].session
												+ "\"></font> " + sess[i].title
												+ "</b><br>" + sess[i].speaker
												+ "</div> </div> </a> </li>"
									}
								}
								if ((!addsession) && (sess[i].title == "")) {
									// theres no session here
									y += "<li> <a href=\"Ftheagenda.html?filter="
											+ sess[i].dtr
											+ "\" class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:maroon;\"><b>"
											+ sess[i].dtr
											+ "</b></font> <br> <i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">time_fill</i> </div> </div> </a> </li>"
								}
								if ((addsession) && (skip == "false")) {
									// session added locally on the device
									var dt = addsessstr[3].split(' ').slice(0,
											2).join(' ');
									var skip = "true";
									var dwdte = localStorage
											.getItem(addsessstr[0]);
									var hrefadd = "eval3.html?survey="
											+ addsessstr[0] + "&title="
											+ addsessstr[1] + "&email="
											+ userid + "&timeslot="
											+ addsessstr[4] + "&dtr="
											+ addsessstr[3] + "&dt=" + dt;
									if (dwdte == "yes") {
										y += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ addsessstr[3]
												+ "</b></font> <br><b><i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									} else {
										y += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b> "
												+ addsessstr[3]
												+ "</b></font> <br><b> <font id=\""
												+ addsessstr[0] + "\"></font> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									}
								}
							} // Tuesday
							if (sess[i].dtr.includes("Wednesday")) {
								if ((!sess[i].title == "")) {
									// theres a session from techu here
									if (didwedotheeval == "yes") {
										z += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ sess[i].title + "</b><br>"
												+ sess[i].speaker
												+ "</div> </div> </a> </li>"
									} else {
										z += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <font id=\""
												+ sess[i].session
												+ "\"></font> " + sess[i].title
												+ "</b><br>" + sess[i].speaker
												+ "</div> </div> </a> </li>"
									}
								}
								if ((!addsession) && (sess[i].title == "")) {
									// theres no session here
									z += "<li> <a href=\"Ftheagenda.html?filter="
											+ sess[i].dtr
											+ "\" class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:maroon;\"><b>"
											+ sess[i].dtr
											+ "</b></font> <br> <i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">time_fill</i> </div> </div> </a> </li>"
								}
								if ((addsession) && (skip == "false")) {
									// session added locally on the device
									var dt = addsessstr[3].split(' ').slice(0,
											2).join(' ');
									var skip = "true";
									var dwdte = localStorage
											.getItem(addsessstr[0]);
									var hrefadd = "eval3.html?survey="
											+ addsessstr[0] + "&title="
											+ addsessstr[1] + "&email="
											+ userid + "&timeslot="
											+ addsessstr[4] + "&dtr="
											+ addsessstr[3] + "&dt=" + dt;
									if (dwdte == "yes") {
										z += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ addsessstr[3]
												+ "</b></font> <br><b><i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									} else {
										z += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b> "
												+ addsessstr[3]
												+ "</b></font> <br><b> <font id=\""
												+ addsessstr[0] + "\"></font> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									}
								}
							} // Wednesday
							if (sess[i].dtr.includes("Thursday")) {
								if ((!sess[i].title == "")) {
									// theres a session from techu here
									if (didwedotheeval == "yes") {
										w += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ sess[i].title + "</b><br>"
												+ sess[i].speaker
												+ "</div> </div> </a> </li>"
									} else {
										w += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <font id=\""
												+ sess[i].session
												+ "\"></font> " + sess[i].title
												+ "</b><br>" + sess[i].speaker
												+ "</div> </div> </a> </li>"
									}
								}
								if ((!addsession) && (sess[i].title == "")) {
									// theres no session here
									w += "<li> <a href=\"Ftheagenda.html?filter="
											+ sess[i].dtr
											+ "\" class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:maroon;\"><b>"
											+ sess[i].dtr
											+ "</b></font> <br> <i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">time_fill</i> </div> </div> </a> </li>"
								}
								if ((addsession) && (skip == "false")) {
									// session added locally on the device
									var dt = addsessstr[3].split(' ').slice(0,
											2).join(' ');
									var skip = "true";
									var dwdte = localStorage
											.getItem(addsessstr[0]);
									var hrefadd = "eval3.html?survey="
											+ addsessstr[0] + "&title="
											+ addsessstr[1] + "&email="
											+ userid + "&timeslot="
											+ addsessstr[4] + "&dtr="
											+ addsessstr[3] + "&dt=" + dt;
									if (dwdte == "yes") {
										w += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ addsessstr[3]
												+ "</b></font> <br><b><i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									} else {
										w += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b> "
												+ addsessstr[3]
												+ "</b></font> <br><b> <font id=\""
												+ addsessstr[0] + "\"></font> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									}
								}
							} // Thur
							if (sess[i].dtr.includes("Friday")) {
								if ((!sess[i].title == "")) {
									// theres a session from techu here
									if (didwedotheeval == "yes") {
										u += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ sess[i].title + "</b><br>"
												+ sess[i].speaker
												+ "</div> </div> </a> </li>"
									} else {
										u += "<li> <a href=\""
												+ hreflink
												+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ sess[i].dtr
												+ "</b></font> <br><b> <font id=\""
												+ sess[i].session
												+ "\"></font> " + sess[i].title
												+ "</b><br>" + sess[i].speaker
												+ "</div> </div> </a> </li>"
									}
								}
								if ((!addsession) && (sess[i].title == "")) {
									// theres no session here
									u += "<li> <a href=\"Ftheagenda.html?filter="
											+ sess[i].dtr
											+ "\" class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:maroon;\"><b>"
											+ sess[i].dtr
											+ "</b></font> <br> <i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">time_fill</i> </div> </div> </a> </li>"
								}
								if ((addsession) && (skip == "false")) {
									// session added locally on the device
									var dt = addsessstr[3].split(' ').slice(0,
											2).join(' ');
									var skip = "true";
									var dwdte = localStorage
											.getItem(addsessstr[0]);
									var hrefadd = "eval3.html?survey="
											+ addsessstr[0] + "&title="
											+ addsessstr[1] + "&email="
											+ userid + "&timeslot="
											+ addsessstr[4] + "&dtr="
											+ addsessstr[3] + "&dt=" + dt;
									if (dwdte == "yes") {
										u += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
												+ addsessstr[3]
												+ "</b></font> <br><b><i style=\"color:green;font-size:16px\" class=\"f7-icons size-10\">check_round_fill</i> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									} else {
										u += "<li id=\""
												+ addsessstr[4]
												+ "\"> <a href=\""
												+ hrefadd
												+ "\" class=\"item-content item-link\" style='background: #b2d6ff'> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b> "
												+ addsessstr[3]
												+ "</b></font> <br><b> <font id=\""
												+ addsessstr[0] + "\"></font> "
												+ addsessstr[1] + "</b><br>"
												+ addsessstr[2]
												+ "</div> </div> </a> </li>"
									}
								}
							} // Friday
						} // for
						document.getElementById("Monday").innerHTML = start
								+ begin + x + end + finish;
						document.getElementById("Tuesday").innerHTML = start
								+ begin + y + end + finish;
						document.getElementById("Wednesday").innerHTML = start
								+ begin + z + end + finish;
						document.getElementById("Thursday").innerHTML = start
								+ begin + w + end + finish;
						document.getElementById("Friday").innerHTML = start
								+ begin + u + end + finish;

						for (var i = 0; i < sess.length; i++) {
							// feck
							var xyz = localStorage.getItem(sess[i].session);
							// document.getElementById(sess[i].session).innerHTML
							// = "<i style=\"color:red;font-size:16px\"
							// class=\"f7-icons size-10\">check_round_fill</i>";
						}

						$$('.MON')
								.on(
										'click',
										function() {
											$$(Monday).show();
											$$(Tuesday).hide();
											$$(Wednesday).hide();
											$$(Thursday).hide();
											$$(Friday).hide();
											document.getElementById("oneday").style.background = '#0e4077';
											document.getElementById("twoday").style.background = '#007aff';
											document.getElementById("threeday").style.background = '#007aff';
											document.getElementById("fourday").style.background = '#007aff';
											document.getElementById("fiveday").style.background = '#007aff';
											localStorage
													.setItem("CHday", "Mon");
										});
						$$('.TUE')
								.on(
										'click',
										function() {
											$$(Monday).hide();
											$$(Tuesday).show();
											$$(Wednesday).hide();
											$$(Thursday).hide();
											$$(Friday).hide();
											document.getElementById("oneday").style.background = '#007aff';
											document.getElementById("twoday").style.background = '#0e4077';
											document.getElementById("threeday").style.background = '#007aff';
											document.getElementById("fourday").style.background = '#007aff';
											document.getElementById("fiveday").style.background = '#007aff';
											localStorage
													.setItem("CHday", "Tue");
										});
						$$('.WED')
								.on(
										'click',
										function() {
											$$(Monday).hide();
											$$(Tuesday).hide();
											$$(Wednesday).show();
											$$(Thursday).hide();
											$$(Friday).hide();
											document.getElementById("oneday").style.background = '#007aff';
											document.getElementById("twoday").style.background = '#007aff';
											document.getElementById("threeday").style.background = '#0e4077';
											document.getElementById("fourday").style.background = '#007aff';
											document.getElementById("fiveday").style.background = '#007aff';
											localStorage
													.setItem("CHday", "Wed");
										});
						$$('.THU')
								.on(
										'click',
										function() {
											$$(Monday).hide();
											$$(Tuesday).hide();
											$$(Wednesday).hide();
											$$(Thursday).show();
											$$(Friday).hide();
											document.getElementById("oneday").style.background = '#007aff';
											document.getElementById("twoday").style.background = '#007aff';
											document.getElementById("threeday").style.background = '#007aff';
											document.getElementById("fourday").style.background = '#0e4077';
											document.getElementById("fiveday").style.background = '#007aff';
											localStorage
													.setItem("CHday", "Thu");
										});
						$$('.FRI')
								.on(
										'click',
										function() {
											$$(Monday).hide();
											$$(Tuesday).hide();
											$$(Wednesday).hide();
											$$(Thursday).hide();
											$$(Friday).show();
											document.getElementById("oneday").style.background = '#007aff';
											document.getElementById("twoday").style.background = '#007aff';
											document.getElementById("threeday").style.background = '#007aff';
											document.getElementById("fourday").style.background = '#007aff';
											document.getElementById("fiveday").style.background = '#0e4077';
											localStorage
													.setItem("CHday", "Fri");
										});
						var CHday = localStorage.getItem("CHday");
						if (CHday == 'Mon') {
							$$(Monday).show();
							$$(Tuesday).hide();
							$$(Wednesday).hide();
							$$(Thursday).hide();
							$$(Friday).hide();
							document.getElementById("oneday").style.background = '#0e4077';
							document.getElementById("twoday").style.background = '#007aff';
							document.getElementById("threeday").style.background = '#007aff';
							document.getElementById("fourday").style.background = '#007aff';
							document.getElementById("fiveday").style.background = '#007aff';
						}
						if (CHday == 'Tue') {
							$$(Monday).hide();
							$$(Tuesday).show();
							$$(Wednesday).hide();
							$$(Thursday).hide();
							$$(Friday).hide();
							document.getElementById("oneday").style.background = '#007aff';
							document.getElementById("twoday").style.background = '#0e4077';
							document.getElementById("threeday").style.background = '#007aff';
							document.getElementById("fourday").style.background = '#007aff';
							document.getElementById("fiveday").style.background = '#007aff';
						}
						if (CHday == 'Wed') {
							$$(Monday).hide();
							$$(Tuesday).hide();
							$$(Wednesday).show();
							$$(Thursday).hide();
							$$(Friday).hide();
							document.getElementById("oneday").style.background = '#007aff';
							document.getElementById("twoday").style.background = '#007aff';
							document.getElementById("threeday").style.background = '#0e4077';
							document.getElementById("fourday").style.background = '#007aff';
							document.getElementById("fiveday").style.background = '#007aff';
							localStorage.setItem("CHday", "Wed");
						}
						if (CHday == 'Thu') {
							$$(Monday).hide();
							$$(Tuesday).hide();
							$$(Wednesday).hide();
							$$(Thursday).show();
							$$(Friday).hide();
							document.getElementById("oneday").style.background = '#007aff';
							document.getElementById("twoday").style.background = '#007aff';
							document.getElementById("threeday").style.background = '#007aff';
							document.getElementById("fourday").style.background = '#0e4077';
							document.getElementById("fiveday").style.background = '#007aff';
						}
						if (CHday == 'Fri') {
							$$(Monday).hide();
							$$(Tuesday).hide();
							$$(Wednesday).hide();
							$$(Thursday).hide();
							$$(Friday).show();
							document.getElementById("oneday").style.background = '#007aff';
							document.getElementById("twoday").style.background = '#007aff';
							document.getElementById("threeday").style.background = '#007aff';
							document.getElementById("fourday").style.background = '#007aff';
							document.getElementById("fiveday").style.background = '#0e4077';
						}
					} // end page.name ==myagenda
					if ((page.name === 'theagenda')
							|| (page.name === 'Stheagenda')) {
						$$('.closemsgAgenda').on('click', function() {
							$$(AgendaMsg).hide();
							localStorage.setItem("Agendafirsttime", "no");
						});
						var Ahelpmsg = localStorage.getItem("Agendafirsttime");
						if ((Ahelpmsg == "no") && (page.name === 'theagenda')) {
							$$(AgendaMsg).hide();
						}

						document.getElementById("toolbar").style.visibility = "hidden";
						var userid = localStorage.getItem("email");
						var theagendaData = localStorage.getItem("theagenda")
						var sess = JSON.parse(theagendaData);
						// localStorage.removeItem(sess[0].session);
						var start = "<div class=\"list-block list-block-search searchbar-found\">"
						var begin = "<ul>"
						var end = "</ul>"
						var finish = "</div>"
						var x = "", y = "", z = "", brand = "";
						// get brands
						var storedData = myApp.formGetData('aaform');
						var rBrands = JSON.stringify(storedData);
						if (rBrands) {
							var choosenBrands = JSON.parse(rBrands);
						} else {
							// var storedData =
							// {"brands":["AIX","IBMi","pLinux","opower","Storage","zsys","xbrand"],"theday":["Monday","Tuesday","Wednesday","Thursday","Friday"]};
							var storedData = {
								"starsess" : [ "YES" ],
								"brands" : [ "AIX", "IBMi", "pLinux", "opower",
										"Storage", "zsys", "xbrand" ],
								"theday" : [ "Monday", "Tuesday", "Wednesday",
										"Thursday", "Friday" ]
							};
							var rBrands = JSON.stringify(storedData);
							var choosenBrands = JSON.parse(rBrands);
						}
						// alert(choosenBrands.brands);
						// alert(choosenBrands.theday);
						// Get features sessions from applogin!
						var feature = localStorage.getItem("fsessl");
						for (var i = 0; i < sess.length; i++) {
							// if (i === 3) { break; }
							// alert(choosenBrands.starsess);
							if (choosenBrands.starsess == "YES") {
								if (!(feature.indexOf(sess[i].session) > -1)) {
									continue;
								}
								document.getElementById("allsessionstitle").innerHTML = "<font style='color:red'><i style=\"font-size:20px;color:red\" class=\"f7-icons size-10\">star_fill</i> Featured Sessions</font>";
							}

							var hreflink2 = "sessdetails.html?session="
									+ sess[i].session + "&title="
									+ sess[i].title + "&email=" + userid
									+ "&level=" + sess[i].level + "&type="
									+ sess[i].type + "&reps=" + sess[i].reps
									+ "&track=" + sess[i].track + "&timeslot="
									+ sess[i].timeslot + "&speaker="
									+ sess[i].speaker + "&dtr=" + sess[i].dtr
									+ "&abstract=" + sess[i].abstr;
							if (sess[i].brand == "Cross Brand") {
								brand = "<font style='border-radius:5px;font-size:12px;background:green;color:white;padding:3px 5px 2px 5px;font-weight:normal'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].brand == "Storage") {
								brand = "<font style='border-radius:5px;font-size:12px;background:maroon;color:white;padding:3px 5px 2px 5px;font-weight:normal'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].brand == "z Systems"
									|| sess[i].brand == "Linux on Sys z"
									|| sess[i].brand == "zOS"
									|| sess[i].brand == "zVM"
									|| sess[i].brand == "zVSE") {
								brand = "<font style='border-radius:5px;font-size:12px;background:black;color:white;padding:3px 5px 2px 5px;font-weight:normal'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].brand == "Power"
									|| sess[i].brand == "AIX"
									|| sess[i].brand == "IBM i"
									|| sess[i].brand == "Linux on Power"
									|| sess[i].brand == "OpenPOWER"
									|| sess[i].brand == "Power HW"
									|| sess[i].brand == "Power SW") {
								brand = "<font style='border-radius:5px;font-size:12px;background:navy;color:white;padding:3px 5px 2px 5px;font-weight:normal;'>"
										+ sess[i].brand + "</font>"
							}
							if (choosenBrands.theday.includes("Monday")
									&& sess[i].dtr.includes("Monday")) {
								// DISPagenda(choosenBrands.brands,choosenBrands.theday,hreflink2,sess[i].brand,sess[i].dtr);
								if (choosenBrands.brands.includes("AIX")
										&& (sess[i].brand == "AIX"
												|| sess[i].brand == "Power HW" || sess[i].brand == "Power SW")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("IBMi")
										&& sess[i].brand == "IBM i") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("pLinux")
										&& sess[i].brand == "Linux on Power") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("opower")
										&& sess[i].brand == "OpenPOWER") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("Storage")
										&& sess[i].brand == "Storage") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("zsys")
										&& (sess[i].brand == "Linux on Sys z"
												|| sess[i].brand == "z Systems"
												|| sess[i].brand == "zOS"
												|| sess[i].brand == "zVM" || sess[i].brand == "zVSE")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("xbrand")
										&& sess[i].brand == "Cross Brand") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands == null) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
							} // if Monday
							if (choosenBrands.theday.includes("Tuesday")
									&& sess[i].dtr.includes("Tuesday")) {
								if (choosenBrands.brands.includes("AIX")
										&& (sess[i].brand == "AIX"
												|| sess[i].brand == "Power HW" || sess[i].brand == "Power SW")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("IBMi")
										&& sess[i].brand == "IBM i") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("pLinux")
										&& sess[i].brand == "Linux on Power") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("opower")
										&& sess[i].brand == "OpenPOWER") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("Storage")
										&& sess[i].brand == "Storage") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("zsys")
										&& (sess[i].brand == "Linux on Sys z"
												|| sess[i].brand == "z Systems"
												|| sess[i].brand == "zOS"
												|| sess[i].brand == "zVM" || sess[i].brand == "zVSE")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("xbrand")
										&& sess[i].brand == "Cross Brand") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands == null) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
							} // if Tuesday
							if (choosenBrands.theday.includes("Wednesday")
									&& sess[i].dtr.includes("Wednesday")) {
								if (choosenBrands.brands.includes("AIX")
										&& (sess[i].brand == "AIX"
												|| sess[i].brand == "Power HW" || sess[i].brand == "Power SW")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("IBMi")
										&& sess[i].brand == "IBM i") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("pLinux")
										&& sess[i].brand == "Linux on Power") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("opower")
										&& sess[i].brand == "OpenPOWER") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("Storage")
										&& sess[i].brand == "Storage") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("zsys")
										&& (sess[i].brand == "Linux on Sys z"
												|| sess[i].brand == "z Systems"
												|| sess[i].brand == "zOS"
												|| sess[i].brand == "zVM" || sess[i].brand == "zVSE")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("xbrand")
										&& sess[i].brand == "Cross Brand") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands == null) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
							} // if Wednesday
							if (choosenBrands.theday.includes("Thursday")
									&& sess[i].dtr.includes("Thursday")) {
								if (choosenBrands.brands.includes("AIX")
										&& (sess[i].brand == "AIX"
												|| sess[i].brand == "Power HW" || sess[i].brand == "Power SW")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("IBMi")
										&& sess[i].brand == "IBM i") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("pLinux")
										&& sess[i].brand == "Linux on Power") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("opower")
										&& sess[i].brand == "OpenPOWER") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("Storage")
										&& sess[i].brand == "Storage") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("zsys")
										&& (sess[i].brand == "Linux on Sys z"
												|| sess[i].brand == "z Systems"
												|| sess[i].brand == "zOS"
												|| sess[i].brand == "zVM" || sess[i].brand == "zVSE")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("xbrand")
										&& sess[i].brand == "Cross Brand") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands == null) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
							} // if Thursday
							if (choosenBrands.theday.includes("Friday")
									&& sess[i].dtr.includes("Friday")) {
								if (choosenBrands.brands.includes("AIX")
										&& (sess[i].brand == "AIX"
												|| sess[i].brand == "Power HW" || sess[i].brand == "Power SW")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("IBMi")
										&& sess[i].brand == "IBM i") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("pLinux")
										&& sess[i].brand == "Linux on Power") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("opower")
										&& sess[i].brand == "OpenPOWER") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("Storage")
										&& sess[i].brand == "Storage") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("zsys")
										&& (sess[i].brand == "Linux on Sys z"
												|| sess[i].brand == "z Systems"
												|| sess[i].brand == "zOS"
												|| sess[i].brand == "zVM" || sess[i].brand == "zVSE")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("xbrand")
										&& sess[i].brand == "Cross Brand") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands == null) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
							} // if Friday

						} // for
						document.getElementById("AllSessions").innerHTML = start
								+ begin + x + end + finish;
					} // end page.name ==theagenda

					if ((page.name === 'Ftheagenda')) {
						var dtData = myApp.formToData('#daytimefilter');
						var dtfilter = (JSON.stringify(dtData.filter));
						var dt = (dtfilter.replace(/["]+/g, ''));

						document.getElementById("toolbar").style.visibility = "hidden";
						var userid = localStorage.getItem("email");
						var theagendaData = localStorage.getItem("theagenda")
						var sess = JSON.parse(theagendaData);
						var start = "<div class=\"list-block list-block-search searchbar-found\">"
						var begin = "<ul>"
						var end = "</ul>"
						var finish = "</div>"
						var x = "", y = "", z = "", brand = "";
						// get brands
						var storedData = myApp.formGetData('aaform');
						var rBrands = JSON.stringify(storedData);
						if (rBrands) {
							var choosenBrands = JSON.parse(rBrands);
						} else {
							// var storedData =
							// {"brands":["AIX","IBMi","pLinux","opower","Storage","zsys","xbrand"]};
							var storedData = {
								"brands" : [ "AIX", "IBMi", "pLinux", "opower",
										"Storage", "zsys", "xbrand" ],
								"theday" : [ "Monday", "Tuesday", "Wednesday",
										"Thursday", "Friday" ]
							};
							var rBrands = JSON.stringify(storedData);
							var choosenBrands = JSON.parse(rBrands);
						}
						// alert(choosenBrands.brands);
						// alert(choosenBrands.theday);
						for (var i = 0; i < sess.length; i++) {
							var hreflink2 = "sessdetails.html?session="
									+ sess[i].session + "&title="
									+ sess[i].title + "&email=" + userid
									+ "&level=" + sess[i].level + "&type="
									+ sess[i].type + "&reps=" + sess[i].reps
									+ "&track=" + sess[i].track + "&timeslot="
									+ sess[i].timeslot + "&speaker="
									+ sess[i].speaker + "&dtr=" + sess[i].dtr
									+ "&abstract=" + sess[i].abstr;
							if (sess[i].brand == "Cross Brand") {
								brand = "<font style='border-radius:5px;font-size:10px;background:green;color:white;padding:2px 5px;font-weight:normal'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].brand == "Storage") {
								brand = "<font style='border-radius:5px;font-size:10px;background:maroon;color:white;padding:2px 5px;font-weight:normal'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].brand == "z Systems"
									|| sess[i].brand == "Linux on Sys z"
									|| sess[i].brand == "zOS"
									|| sess[i].brand == "zVM"
									|| sess[i].brand == "zVSE") {
								brand = "<font style='border-radius:5px;font-size:10px;background:black;color:white;padding:2px 5px;font-weight:normal'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].brand == "Power"
									|| sess[i].brand == "AIX"
									|| sess[i].brand == "IBM i"
									|| sess[i].brand == "Linux on Power"
									|| sess[i].brand == "OpenPOWER"
									|| sess[i].brand == "Power HW"
									|| sess[i].brand == "Power SW") {
								brand = "<font style='border-radius:5px;font-size:10px;background:navy;color:white;padding:2px 5px;font-weight:normal;'>"
										+ sess[i].brand + "</font>"
							}
							if (sess[i].dtr.includes(dt)) {
								if (choosenBrands.brands.includes("AIX")
										&& (sess[i].brand == "AIX"
												|| sess[i].brand == "Power HW" || sess[i].brand == "Power SW")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("IBMi")
										&& sess[i].brand == "IBM i") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("Storage")
										&& sess[i].brand == "Storage") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("zsys")
										&& (sess[i].brand == "Linux on Sys z"
												|| sess[i].brand == "zOS"
												|| sess[i].brand == "zVM" || sess[i].brand == "zVSE")) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands.includes("xbrand")
										&& sess[i].brand == "Cross Brand") {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
								if (choosenBrands.brands == null) {
									x += "<li> <a href=\""
											+ hreflink2
											+ "\" class=\"item-content item-link\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:blue;\"><b>"
											+ sess[i].dtr + "</b></font><br>"
											+ brand + "<br>" + sess[i].title
											+ "</b><br>" + sess[i].speaker
											+ "</div> </div> </a> </li>"
								}
							} // if

						} // for
						document.getElementById("AllSessions").innerHTML = start
								+ begin + x + end + finish;
					} // end page.name ==Ftheagenda

					// Code for Services page
					if (page.name === 'login') {
						function alex(poo) {
							// alert(poo);
							(function(d) {
								var ref = d.getElementsByTagName('script')[0];
								var js = d.createElement('script');
								js.src = poo;
								ref.parentNode.insertBefore(js, ref);
							}(document));
						}

						$$(submitbtn).hide();
						$$(thinking).hide();
						$$('.ttt')
								.on(
										'click',
										function() {
											localStorage.setItem("hitauthbtn",
													"yes");
											localStorage.removeItem("auth");
											var storedData = myApp
													.formGetData('loginform');
											if (storedData) {
												var str = JSON
														.stringify(storedData);
												var abc = JSON.parse(str);
												// alert(abc.email);
												// feck over to techu and check

												LOGIN(abc.email, abc.password);
												$$(thinking).show();
												// $$(thinking).hide();
												$$(credsbtn).hide();
												$$(backhide).hide();
												document
														.getElementById("hideperftip").style.visibility = "hidden";
												document
														.getElementById("failedmsg").style.visibility = "hidden";
												document
														.getElementById("syncmsg").style.visibility = "hidden";
											} else {
												myApp
														.alert(
																'Enter email address and password!',
																'Error!');
											}
										}); // end of ttt button

						$$('.aaa').on('click', function() {
							// alert('alex');
						});

					} // end of main if/login

					if (page.name === 'pulltosync') {
						function alex(poo) {
							(function(d) {
								var ref = d.getElementsByTagName('script')[0];
								var js = d.createElement('script');
								js.src = poo;
								ref.parentNode.insertBefore(js, ref);
							}(document));
						}
						$$(submitbtn).hide();
						$$(thinking).hide();
						localStorage.setItem("hitauthbtn", "yes");
						localStorage.removeItem("auth");
						var storedData = myApp.formGetData('loginform');
						if (storedData) {
							var str = JSON.stringify(storedData);
							var abc = JSON.parse(str);
							LOGIN(abc.email, abc.password);
							$$(thinking).show();
							// $$(thinking).hide();
							$$(credsbtn).hide();
							$$(backhide).hide();
							document.getElementById("hideperftip").style.visibility = "hidden";
							document.getElementById("failedmsg").style.visibility = "hidden";
							document.getElementById("syncmsg").style.visibility = "hidden";
							// document.getElementById("progone").style.visibility
							// = "hidden";
							// document.getElementById("progtwo").style.visibility
							// = "hidden";
							// document.getElementById("progthree").style.visibility
							// = "hidden";
							// document.getElementById("progfour").style.visibility
							// = "hidden";
						}
					} // end of pulltosync
					if (page.name === 'form2') {
						$$('.ttt').on('click', function() {
							myApp.alert('hi');
						});

						// Create the XHR object.
						function createCORSRequest(method, url) {
							var xhr = new XMLHttpRequest();
							if ("withCredentials" in xhr) {
								// XHR for Chrome/Firefox/Opera/Safari.
								xhr.open(method, url, true);
							} else if (typeof XDomainRequest != "undefined") {
								// XDomainRequest for IE.
								xhr = new XDomainRequest();
								xhr.open(method, url);
							} else {
								// CORS not supported.
								xhr = null;
							}
							return xhr;
						}

						// Helper method to parse the title tag from the
						// response.
						function getTitle(text) {
							return text.match('<title>(.*)?</title>')[1];
						}

						// Upen:Back button logic (Documentation for Alex:
						// http://docs.phonegap.com/en/3.5.0/cordova_events_events.md.html#backbutton)
						function onLoad() {
							document.addEventListener("deviceready",
									onDeviceReady, false);
						}
						// device APIs are available
						function onDeviceReady() {
							// Register the event listener
							document.addEventListener("backbutton",
									onBackKeyDown, false);
							document.addEventListener("menubutton",
									onMenuKeyDown, false);
						}
						// Handle the back button
						function onBackKeyDown(e) {
							e.preventDefault();
							navigator.notification.confirm(
									"Are you sure you want to exit?",
									onConfirm, "Confirmation", "Yes,No");
						}

						function onConfirm(button) {
							if (button == 2) { // If the user selected No, then
								// we just do nothing
								return;
							} else {
								navigator.app.exitApp(); // Otherwise we quit
								// the app.
							}
						}
						// Handle the menu button
						function onMenuKeyDown() {
						}
						// Make the actual CORS request.
						function makeCorsRequest() {
							// This is a sample server that supports CORS.
							// var url = 'https://ibmtechu.com/intro.html';
							var url = 'https://ibmtechu.com/cgi-bin/app/apphello.cgi';

							var xhr = createCORSRequest('GET', url);
							if (!xhr) {
								alert('CORS not supported');
								return;
							}

							// Response handlers.
							xhr.onload = function() {
								var text = xhr.responseText;
								var title = getTitle(text);
								alert('Response from CORS request to ' + url
										+ ': ' + text);
								// alert('title: '+title);
								document.getElementById("demo").innerHTML = text;
							};

							xhr.onerror = function() {
								alert('Woops, there was an error making the request.');
							};

							xhr.send();
						}
						makeCorsRequest();

						// Get the data from storage !! -> aaform
						$$('.get-storage-data')
								.on(
										'click',
										function() {
											var storedData = myApp
													.formGetData('aaform');
											if (storedData) {
												alert(JSON
														.stringify(storedData));
											} else {
												alert('There is no stored data for this form yet. Try to change any field')
											}
											var fred = JSON
													.stringify(storedData);
											var abc = JSON.parse(fred);
											alert(abc.brand);
										});
					}
					if (page.name === 'settings') {
						// document.getElementById("wedbox").checked = false;

						$$('.ttt').on('click', function() {
							myApp.alert('hi');
						});
						// Get data on the form -> aaform
						$$('.form-to-data').on('click', function() {
							var formData = myApp.formToData('#aaform');
							myApp.alert(JSON.stringify(formData));
						});
						$$('.powersess').on('click', function() {
							// localStorage.setItem("auth", "yes");
						});
					} // end settings
					if (page.name === 'sessdet') {
						$$('.addtoagenda')
								.on(
										'click',
										function() {
											// myApp.alert('hi');
											var formData = myApp
													.formToData('#addsess');
											var session = (JSON
													.stringify(formData.session));
											var title = (JSON
													.stringify(formData.title));
											var speaker = (JSON
													.stringify(formData.speaker));
											var dtr = (JSON
													.stringify(formData.dtr));
											var timeslot = (JSON
													.stringify(formData.timeslot));
											var ts2 = (timeslot.replace(
													/["]+/g, ''));
											var tmpstr = "[ " + session + ", "
													+ title + ", " + speaker
													+ ", " + dtr + ", "
													+ timeslot + " ]";
											localStorage.setItem(ts2, tmpstr);
											myApp.alert("Add completed!",
													session);
										});
					} // end sessdet
					if (page.name === 'evaldev') {
						$$('.rmfromagenda').on('click', function() {
							var formData = myApp.formToData('#rmsess');
							var session = (JSON.stringify(formData.session));
							var timeslot = (JSON.stringify(formData.timeslot));
							var ts2 = (timeslot.replace(/["]+/g, ''));
							var sess2 = (session.replace(/["]+/g, ''));
							// works, to hide only:
							// document.getElementById(sess2).style.visibility =
							// "hidden";
							localStorage.removeItem(ts2);
							document.getElementById(sess2).remove();
							myApp.alert("Removed!", session);
						});
					} // end evaldev
					if (page.name === 'survey') {
						// test
						$$('.rmfromagenda')
								.on(
										'click',
										function() {
											var formData = myApp
													.formToData('#rmsess');
											var session = (JSON
													.stringify(formData.session));
											var timeslot = (JSON
													.stringify(formData.timeslot));
											var dtr = (JSON
													.stringify(formData.dtr));
											var ts2 = (timeslot.replace(
													/["]+/g, ''));
											var sess2 = (session.replace(
													/["]+/g, ''));
											var dtr2 = (dtr
													.replace(/["]+/g, ''));
											var dtr3 = dtr2.split(' ').slice(0,
													2).join(' ');
											var dtr4 = dtr3.split('-').slice(0,
													1).join(' ');
											// dtr3 is a smart way to get the
											// Day<space>Room for the blank one
											// below
											// works, to hide only:
											// document.getElementById(sess2).style.visibility
											// = "hidden";
											localStorage.removeItem(ts2);
											// document.getElementById(sess2).remove();
											document.getElementById(ts2).innerHTML = "<li> <a href=\"Ftheagenda.html?filter="
													+ dtr3
													+ "\" class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\" style=\"font-size:14px;\"> <font style=\"color:maroon;\"><b>"
													+ dtr4
													+ "</b></font> <br> <i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">time_fill</i> </div> </div> </a> </li>";
											// myApp.alert("Removed!",session);
											myApp.alert('Removed!', session,
													function() {
														mainView.router.back();
													});
										});
						// end test
						var pickerDevice = myApp
								.picker({
									input : '#picker-sessR',
									rotateEffect : true,
									cols : [ {
										textAlign : 'center',
										values : [
												'&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;[Very Good]',
												'&#9733;&#9733;&#9733;&#9733;&#9734;&nbsp;[Good]',
												'&#9733;&#9733;&#9733;&#9734;&#9734;&nbsp;[Average]',
												'&#9733;&#9733;&#9734;&#9734;&#9734;&nbsp;[Poor]',
												'&#9733;&#9734;&#9734;&#9734;&#9734;&nbsp;[Very Poor]' ]
									} ]
								});
						var pickerDevice2 = myApp
								.picker({
									input : '#picker-speakR',
									rotateEffect : true,
									cols : [ {
										textAlign : 'center',
										values : [
												'&#9733;&#9733;&#9733;&#9733;&#9733;&nbsp;[Very Good]',
												'&#9733;&#9733;&#9733;&#9733;&#9734;&nbsp;[Good]',
												'&#9733;&#9733;&#9733;&#9734;&#9734;&nbsp;[Average]',
												'&#9733;&#9733;&#9734;&#9734;&#9734;&nbsp;[Poor]',
												'&#9733;&#9734;&#9734;&#9734;&#9734;&nbsp;[Very Poor]' ]
									} ]
								});
						var userid = localStorage.getItem("email");
						var formData = myApp.formToData('#survey');
						var session = (JSON.stringify(formData.Sessioncode));
						var session = (session.replace(/["]+/g, ''));
						var dtr = (JSON.stringify(formData.dtr));
						var dtr = (dtr.replace(/["]+/g, ''));
						if (session == "") {
							myApp.alert('Slot Empty!', 'Session');
							$$(showsurvey).hide();
						} else {
							TECHUsurvey(session, userid, "blank", "blank", dtr);
							$$('.evalsubmit')
									.on(
											'click',
											function() {
												var userid = localStorage
														.getItem("email");
												var formData = myApp
														.formToData('#survey');
												var session = (JSON
														.stringify(formData.Sessioncode));
												var sessR = (JSON
														.stringify(formData.SessionRating));
												var speakR = (JSON
														.stringify(formData.SpeakerRating));
												var comments = (JSON
														.stringify(formData.comments));
												var session = (session.replace(
														/["]+/g, ''));
												var sessR = (sessR.replace(
														/["]+/g, ''));
												var speakR = (speakR.replace(
														/["]+/g, ''));
												var comments = (comments
														.replace(/["]+/g, ''));
												// alert(' '+session+'
												// '+userid+' '+sessR+'
												// '+speakR+' '+comments);
												if ((sessR == "")
														|| (speakR == "")) {
													myApp
															.alert(
																	'Please rate the session',
																	'Error!');
												} else {
													TECHUsurvey(session,
															userid, sessR,
															speakR, comments);
												}
											});
						}
					} // end survey
					if (page.name === 'overall') {
						var overyes = localStorage.getItem("overall");
						if (overyes == 'done') {
							myApp.alert('Completed.', 'Overall Survey',
									function() {
										mainView.router.back();
									});
						}
						$$('.overallsubmit')
								.on(
										'click',
										function() {
											var userid = localStorage
													.getItem("email");
											var OformData = myApp
													.formToData('#overallform');
											var Oevent = (JSON
													.stringify(OformData.event));
											event = (Oevent
													.replace(/["]+/g, ''));
											var Ocontent = (JSON
													.stringify(OformData.content));
											content = (Ocontent.replace(
													/["]+/g, ''));
											var Owelcome = (JSON
													.stringify(OformData.welcome));
											welcome = (Owelcome.replace(
													/["]+/g, ''));
											var Ofacilites = (JSON
													.stringify(OformData.facilites));
											facilites = (Ofacilites.replace(
													/["]+/g, ''));
											var Oregistration = (JSON
													.stringify(OformData.registration));
											registration = (Oregistration
													.replace(/["]+/g, ''));
											var Oexpo = (JSON
													.stringify(OformData.expo));
											expo = (Oexpo.replace(/["]+/g, ''));
											var Ocomments = (JSON
													.stringify(OformData.comments));
											comments = (Ocomments.replace(
													/["]+/g, ''));
											// alert(event+' '+content+'
											// '+welcome+' '+facilites+'
											// '+registration+' '+expo+'
											// '+comments);
											if ((event == 0) || (content == 0)
													|| (welcome == 0)
													|| (facilites == 0)
													|| (registration == 0)
													|| (expor == 0)) {
												myApp
														.alert(
																'Please answer all the questions.',
																'Note!');
											} else {
												TECHUsurvey("Overall", userid,
														event + '|' + content
																+ '|' + welcome
																+ '|'
																+ facilites
																+ '|'
																+ registration
																+ '|' + expo,
														"notreq", comments);
											}
										});

					} // end overallform
					if (page.name === 'notifications') {
						var myNots = localStorage.getItem("mynots")
						var nots = JSON.parse(myNots);
						var meme = "";
						var end = "<br><br><br>"
						localStorage.setItem("msgread", nots.length);
						for (var i = 0; i < nots.length; i++) {
							// alert(nots[i].notification);
							meme += "<div class=\"card\"> <div class=\"card-content\"> <div class=\"card-content-inner\"><i class=\"f7-icons size-8 color-blue\">info_fill</i> &nbsp; <font style='font-size:10px'>"
									+ nots[i].ntime
									+ " </font> <hr style=\"color:#e0ebeb\"> <font style='color:black'>"
									+ nots[i].notification
									+ "</font> </div> </div> </div>"
							// meme += "<font>"+nots[i].notification+" --
							// "+nots[i].ntime+"</font><br><br>"
						}
						// document.getElementById("showmsgs").innerHTML =
						// start+x+end;
						document.getElementById("showmsgs").innerHTML = meme
								+ end;
					} // end notification
					if (page.name === 'notesoverview') {
						var notediv1;
						var noteData = myApp.formGetData('noteform');
						if (noteData == undefined) {
							notesdiv1 = "<li id=\"notesdiv1\"><a href=\"notespg1.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose</i> <font style='color:grey'>Note 1 ... tap to add notes.</font> <br> </div> </div> </div></a> </li>"
						} else {
							var name1 = JSON.stringify(noteData.namenote1);
							var name1str = (name1.replace(/["]+/g, ''));
							var note1 = JSON.stringify(noteData.note1);
							var note1str = (note1.replace(/["]+/g, ''));
							var note1str = (note1str.replace(/\\n/g, "; "));
							notesdiv1 = "<li id=\"notesdiv1\"><a href=\"notespg1.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose_fill</i> "
									+ name1str
									+ "<br> <font style='font-size:14px;color:grey'>"
									+ note1str
									+ "</div> </div> </div></a> </li>"
						}
						// note 2
						var notediv2;
						var noteData2 = myApp.formGetData('noteform2');
						if (noteData2 == undefined) {
							notesdiv2 = "<li id=\"notesdiv2\"><a href=\"notespg2.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose</i> <font style='color:grey'>Note 2 ... </font> <br> </div> </div> </div></a> </li>"
						} else {
							var name2 = JSON.stringify(noteData2.namenote2);
							var name2str = (name2.replace(/["]+/g, ''));
							var note2 = JSON.stringify(noteData2.note2);
							var note2str = (note2.replace(/["]+/g, ''));
							var note2str = (note2str.replace(/\\n/g, "; "));
							notesdiv2 = "<li id=\"notesdiv2\"><a href=\"notespg2.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose_fill</i> "
									+ name2str
									+ "<br> <font style='font-size:14px;color:grey'>"
									+ note2str
									+ "</div> </div> </div></a> </li>"
						}
						// note 3
						var notediv3;
						var noteData3 = myApp.formGetData('noteform3');
						if (noteData3 == undefined) {
							notesdiv3 = "<li id=\"notesdiv3\"><a href=\"notespg3.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose</i> <font style='color:grey'>Note 3 ... </font> <br> </div> </div> </div></a> </li>"
						} else {
							var name3 = JSON.stringify(noteData3.namenote3);
							var name3str = (name3.replace(/["]+/g, ''));
							var note3 = JSON.stringify(noteData3.note3);
							var note3str = (note3.replace(/["]+/g, ''));
							var note3str = (note3str.replace(/\\n/g, "; "));
							notesdiv3 = "<li id=\"notesdiv3\"><a href=\"notespg3.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose_fill</i> "
									+ name3str
									+ "<br> <font style='font-size:14px;color:grey'>"
									+ note3str
									+ "</div> </div> </div></a> </li>"
						}
						// note 4
						var notediv4;
						var noteData4 = myApp.formGetData('noteform4');
						if (noteData4 == undefined) {
							notesdiv4 = "<li id=\"notesdiv4\"><a href=\"notespg4.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose</i> <font style='color:grey'>Note 4 ... </font> <br> </div> </div> </div></a> </li>"
						} else {
							var name4 = JSON.stringify(noteData4.namenote4);
							var name4str = (name4.replace(/["]+/g, ''));
							var note4 = JSON.stringify(noteData4.note4);
							var note4str = (note4.replace(/["]+/g, ''));
							var note4str = (note4str.replace(/\\n/g, "; "));
							notesdiv4 = "<li id=\"notesdiv4\"><a href=\"notespg4.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose_fill</i> "
									+ name4str
									+ "<br> <font style='font-size:14px;color:grey'>"
									+ note4str
									+ "</div> </div> </div></a> </li>"
						}
						// note 5
						var notediv5;
						var noteData5 = myApp.formGetData('noteform5');
						if (noteData5 == undefined) {
							notesdiv5 = "<li id=\"notesdiv5\"><a href=\"notespg5.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose</i> <font style='color:grey'>Note 5 ... </font> <br> </div> </div> </div></a> </li>"
						} else {
							var name5 = JSON.stringify(noteData5.namenote5);
							var name5str = (name5.replace(/["]+/g, ''));
							var note5 = JSON.stringify(noteData5.note5);
							var note5str = (note5.replace(/["]+/g, ''));
							var note5str = (note5str.replace(/\\n/g, "; "));
							notesdiv5 = "<li id=\"notesdiv5\"><a href=\"notespg5.html\" class=\"item-link\"> <div class=\"item-content\"> <div class=\"item-inner\"> <div class=\"item-title\"><i style=\"font-size:20px;color:#007aff\" class=\"f7-icons size-10\">compose_fill</i> "
									+ name5str
									+ "<br> <font style='font-size:14px;color:grey'>"
									+ note5str
									+ "</div> </div> </div></a> </li>"
						}
						document.getElementById("notesdiv1").innerHTML = notesdiv1;
						document.getElementById("notesdiv2").innerHTML = notesdiv2;
						document.getElementById("notesdiv3").innerHTML = notesdiv3;
						document.getElementById("notesdiv4").innerHTML = notesdiv4;
						document.getElementById("notesdiv5").innerHTML = notesdiv5;

					} // end notesoverview
				});

function DISPagenda(brands, theday, hreflink2, brand, dtr) {
	alert(brand);
	alert(dtr);
} //end DISPagenda

function overallticks(Q, val) {
	var what = Q;
	if (what == "Q1") {
		if (val == "0") {
			$$(showQ1).hide();
		} else {
			$$(showQ1).show();
			var a = 1;
		}
	}
	if (what == "Q2") {
		if (val == "0") {
			$$(showQ2).hide();
		} else {
			$$(showQ2).show();
			var b = 1;
		}
	}
	if (what == "Q3") {
		if (val == "0") {
			$$(showQ3).hide();
		} else {
			$$(showQ3).show();
		}
	}
	if (what == "Q4") {
		if (val == "0") {
			$$(showQ4).hide();
		} else {
			$$(showQ4).show();
		}
	}
	if (what == "Q5") {
		if (val == "0") {
			$$(showQ5).hide();
		} else {
			$$(showQ5).show();
		}
	}
	if (what == "Q6") {
		if (val == "0") {
			$$(showQ6).hide();
		} else {
			$$(showQ6).show();
		}
	}
}