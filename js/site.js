function recomposeMail(obj, region, nom, domaine)
{
	obj.href = 'mailto:' + nom + '@' + domaine + '.' + region;
	obj.onclick = (function() {});
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function sidenotes()
{
	var elem = document.querySelectorAll("#texte > p");
	var ps, processedNotes=0 , notes = document.getElementsByClassName("notesbaspage");
	for (var i = 0; i < elem.length; i++) {
		var paraNotes=elem[i].getElementsByClassName("footnotecall");
		if(paraNotes.length) {
			// Si le paragraphe contient des notes
			var paraTop = elem[i].offsetTop;
			for(var j = 0; j < paraNotes.length; j++) {
				var sidenote = notes[processedNotes];
				var marginTop=ps?paraTop-ps.offsetTop-ps.offsetHeight:paraTop;
				sidenote.style.marginTop=(marginTop>0?marginTop:0)+"px";
				sidenote.className = "notesbaspage sidenote dot-ellipsis dot-resize-update is-truncated";
				sidenote.firstChild.setAttribute("href", "#"+sidenote.firstChild.id);
				sidenote.firstChild.removeAttribute("id");
				ps = sidenote;
				processedNotes++;
			}
		}
	}
}

function resizeText(multiplier) {
  if (document.getElementById('inside').style.fontSize == "") {
    document.getElementById('inside').style.fontSize = "1.0em";
  }
  document.getElementById('inside').style.fontSize = parseFloat(document.getElementById('inside').style.fontSize) + (multiplier * 0.2) + "em";
}

function responsiveImages() {
  var articleImages = document.querySelectorAll("p.texte>img");
  for (var i = 0; i < articleImages.length; i++) {
    articleImages[i].classList.add('img-responsive');
    fancybox=document.createElement('a');
    fancybox.href = articleImages[i].src;
    fancybox.classList.add('fancybox');
    insertAfter(fancybox,articleImages[i]);
    fancybox.appendChild(articleImages[i]);
  }
}

var resizeTimer;
window.onresize=function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout( sidenotes(), 250);
};
window.onload=function(){
	sidenotes();
	responsiveImages();
	$(".fancybox").fancybox();
};
