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
	var paragraphe = 0;
	var previousSidenoteBox;
	for (var i = 0; i < elem.length; i++) {

		//si l'élement a un numéro de paragraphe
		if(elem[i].getElementsByClassName("paranumber").length) {
		
			sidenoteBox = document.createElement('p');
			sidenoteBox.className = "sidenoteBox";
			if(i>0){
				offset = previousSidenoteBox.offsetHeight - elem[i-1].offsetHeight;
				lastOffset = parseInt(previousSidenoteBox.style.top);
				if(!isNaN(lastOffset)) offset += lastOffset;
                        	if(offset>0) sidenoteBox.style.top = offset+"px" ;
			}
			insertAfter(sidenoteBox,document.getElementsByClassName("paranumber")[paragraphe]);
			previousSidenoteBox = sidenoteBox;
			paragraphe++;
		}
	
		//Parcours des notes
		var sidenotes = elem[i].getElementsByClassName("footnotecall");
		for(var j = 0; j < sidenotes.length; j++) {
			var sidenote = document.getElementsByClassName("notesbaspage")[0];
			sidenote.className = "sidenoteItem dot-ellipsis dot-resize-update";
			sidenote.firstChild.setAttribute("href", "#"+sidenote.firstChild.id);
			sidenote.firstChild.removeAttribute("id");
			sidenoteBox.appendChild(sidenote);
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
