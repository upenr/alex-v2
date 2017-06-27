function EXPORTN(email,notes) {
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
  var url = 'https://ibmtechu.com/cgi-bin/app/appnotes.cgi?id='+email+'&notes='+notes

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
    if (title == 'PASS') {
	var alt = "Notes sent to: "+email;
        myApp.alert(alt,'Notes Export'); 
	$$(spinnotes).hide();
    }
    else {
        myApp.alert('Oops, something went wrong!'); 
    }
  };

  xhr.onerror = function() {
    myApp.alert('Woops, it appears there is no internet connectivity!','Error!'); 
  };

  xhr.send();
}
makeCorsRequestTHREE(email,notes);
} //end EXPORTN



$$(document).on('page:init', function (e) {
    var page = e.detail.page;
    if (page.name === 'notesoverview') {
	var x = "";
	var userid = localStorage.getItem("email");
	
	// $$('.closeNotesExp').on('click', function(){
	//	$$(NotesExp).hide();
        // });

	// $$('.emailnotes').on('click', function(){
	//	$$(NotesExp).show();
	// });

	var x = "";
	$$('.emailnotes').on('click', function(){
        $$(spinnotes).show();

	x += "<br><b>IBMTechU Pocket Guide Notes export.</b><br><br>";

	var noteData = myApp.formGetData('noteform');
        if (noteData == undefined) { var ingore = "yes"; }
        else {
	  var name1 = JSON.stringify(noteData.namenote1); var name1str = (name1.replace(/["]+/g, ''));
          var note1 = JSON.stringify(noteData.note1); var note1str = (note1.replace(/["]+/g, ''));
          var note1str = (note1str.replace(/\\n/g, "; ")); 
          //alert('I have data '+name2str+"  "+note2str);
          x += "Note1: <b>"+name1str+"</b><br>"+note1str+"<br><br>";
        }

	var noteData2 = myApp.formGetData('noteform2');
        if (noteData2 == undefined) { var ingore = "yes"; }
        else {
          var name2 = JSON.stringify(noteData2.namenote2); var name2str = (name2.replace(/["]+/g, ''));
          var note2 = JSON.stringify(noteData2.note2); var note2str = (note2.replace(/["]+/g, ''));
          var note2str = (note2str.replace(/\\n/g, "; "));
          x += "Note2: <b>"+name2str+"</b><br>"+note2str+"<br><br>";
        }

	var noteData3 = myApp.formGetData('noteform3');
	if (noteData3 == undefined) { var ingore = "yes"; }
        else {
	  var name3 = JSON.stringify(noteData3.namenote3); var name3str = (name3.replace(/["]+/g, ''));
          var note3 = JSON.stringify(noteData3.note3); var note3str = (note3.replace(/["]+/g, ''));
          var note3str = (note3str.replace(/\\n/g, "; "));
	  x += "Note3: <b>"+name3str+"</b><br>"+note3str+"<br><br>";
        }

	var noteData4 = myApp.formGetData('noteform4');
        if (noteData4 == undefined) { var ingore = "yes"; }
        else {
          var name4 = JSON.stringify(noteData4.namenote4); var name4str = (name4.replace(/["]+/g, ''));
          var note4 = JSON.stringify(noteData4.note4); var note4str = (note4.replace(/["]+/g, ''));
          var note4str = (note4str.replace(/\\n/g, "; "));
          x += "Note4: <b>"+name4str+"</b><br>"+note4str+"<br><br>";
        }

	var noteData5 = myApp.formGetData('noteform5');
        if (noteData5 == undefined) { var ingore = "yes"; }
        else {
          var name5 = JSON.stringify(noteData5.namenote5); var name5str = (name5.replace(/["]+/g, ''));
          var note5 = JSON.stringify(noteData5.note5); var note5str = (note5.replace(/["]+/g, ''));
          var note5str = (note5str.replace(/\\n/g, "; "));
          x += "Note5: <b>"+name5str+"</b><br>"+note5str+"<br><br>";
        }

	//document.getElementById("exportnotes").innerHTML = x;

	//str = "mailto:alex@lpar.co.uk?subject=subject&body=body";
        //window.open(str, '_system');

	EXPORTN(userid,x);

        });



    }

});
