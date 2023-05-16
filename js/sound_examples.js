/*sound examples*/

var wordAud = new Audio();

function popMoreInfo()
{
	//console.log('test sound_examples.js popMoreInfo()');
	var word = matchingSoundExample.word;
	var [bI1, bI2] = matchingSoundExample.boldIndex.split(",").map(Number);
	var boldWordString = word.slice(0, bI1) + word.slice(bI1, bI2).bold() + word.slice(bI2);
	console.log(document.getElementById("moreInfo_symbol").innerHTML);
	document.getElementById("moreInfo_symbol").innerHTML = symbol;
	document.getElementById("word").innerHTML = boldWordString;
	document.getElementById("translation").innerHTML = matchingSoundExample.translation;
	document.getElementById("how_say").innerHTML = matchingSoundExample.articulationDescription;
	
	// console.log(curSymbol.soundfile);
	wordAud.src = generateSoundFilepath();
	// console.log(wordAud.src);
}

function playWordAudio()
{
	wordAud.play();
}

function generateSoundFilepath(){
	//console.log(matchingSoundExample.soundfile);
  	var extension="wav";
  	return "audio/"+ matchingSoundExample.soundfile + "." + extension;
}

/*clearExamplePopup()
	Clears all data in 'sound example'
	This may seem unnecessary since the window won't be accessable if the sound description says there's no sound associated with the language.
	That's true, but it's precautionary.
*/
function clearExamplePopup(){
	document.getElementById("moreInfo_symbol").innerHTML = '';
	document.getElementById("word").innerHTML = 'There is no sound in '+curLanguage+ ' with the features you selected';
	document.getElementById("translation").innerHTML = '';
	document.getElementById("how_say").innerHTML = '';
	wordAud.src = null;
}