function ATNSEARCH(searchcri) {
// Create the XHR object.
//alert(email+"   "+notes);
function createCORSRequestTHREE(method, url) {
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
function makeCorsRequestTHREE(email,passwd) {
  var url = 'https://ibmtechu.com/cgi-bin/app/appattendee.cgi?cri='+searchcri

  var xhr = createCORSRequestTHREE('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    //document.getElementById("demo").innerHTML = text;
    //alert('title: '+title);
    //alert(text);
    if (title == '') {
        myApp.alert('Nothin','Results'); 
    }
    else {
        //myApp.alert(title); 
	document.getElementById("returnres").innerHTML = title;
	$$(SResults).show();
	$$(spinattend).hide();
    }
  };

  xhr.onerror = function() {
    myApp.alert('Woops, it appears there is no internet connectivity!','Error!'); 
  };

  xhr.send();
}
makeCorsRequestTHREE(searchcri);
} //end ATNSEARCH



$$(document).on('page:init', function (e) {
    var page = e.detail.page;
    if (page.name === 'attendee') {
	var x = "";
	var userid = localStorage.getItem("email");
	
	$$('.closeSResults').on('click', function(){
		$$(SResults).hide();
        });

	// $$('.emailnotes').on('click', function(){
	//	$$(NotesExp).show();
	// });

	var x = "";
	$$('.attendeesearch').on('click', function(){
	
	$$(spinattend).show();
	var AData = myApp.formGetData('attendeeform');
        if (AData == undefined) { myApp.alert('Enter search criteria','Note!'); }
        else {
          var name = JSON.stringify(AData.attendsearch); var name2 = (name.replace(/["]+/g, ''));
	  if (name2 == "") { myApp.alert('Enter search criteria','Note!'); }
	  else if (name2.length < 3) { myApp.alert('Please enter at least 3 characters','Note!'); }
	  else {
	    ATNSEARCH(name2);
	  }
	}
        });
    }
});
