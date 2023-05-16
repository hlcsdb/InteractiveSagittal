/*Sound Descriptions script
This script has all the functions that set the contents of the example popup box after a valid sound is selected.
They are in this script to increase cleanliness
*/
var matchingSoundExample = '';
var soundExists = false;
var symbol = '';

/*soundExistsInLanguage()
	Determines whether there is a sound in curLanguage that matches the chosen articulatory features
*/
function soundExistsInLanguage(){
	if(soundSelected == null){console.log('null');soundExists = false;}
	else{
		console.log(soundSelected);
		// matchingSoundExample = currentSoundExamples.find(obj => obj.id === (soundSelected.SoundExamples.split(',')[0]||soundSelected.SoundExamples.split(',')[1]));
		matchingSoundExample = currentSoundExamples.find(obj => obj.id===soundSelected.SoundExamples.split(',')[1]||obj.id===soundSelected.SoundExamples.split(',')[0]);

		console.log(matchingSoundExample); // { id: "2", name: "Object 2" }
		soundExists = matchingSoundExample != null;
		if(soundExists){
			symbol = matchingSoundExample.id;
			console.log(symbol);
		} 
	}
}

console.log("=p == p: "+ "p̓".normalize("NFC")==="p̓".normalize("NFC"));

function capitalize(word) {
  if (!word) {
    return "";
  }
  var letter = word.charAt(0).toUpperCase();
  return letter + word.slice(1);
}


function transcribe()
{	
	soundSearched=true;
	soundExistsInLanguage();
	console.log(soundExists);

	if(!soundExists){
		clearExamplePopup();
		document.getElementById("ipaconcat").innerHTML = '';

		//notify user that there is no corresponding sound in the inventory
		document.getElementById("hint").innerHTML = "The features you selected don't make a sound in " + curLanguage + ". See what happens if you change just one feature.";
		//remove pointer description
		document.getElementById("exampleLink").innerHTML ="";
		document.getElementById("exampleLink").classList.remove("example-popup-trigger");

	} else {
		//set ipa symbol
		document.getElementById("ipaconcat").innerHTML = symbol;
		//set sound explanation below tables
		document.getElementById("hint").innerHTML = soundExplanation();
		//set pointer description for example word
		document.getElementById("exampleLink").innerHTML ="(Click for example 🔈)";
		document.getElementById("exampleLink").classList.add("example-popup-trigger");

		popMoreInfo();
	}
}

// Set ipa symbol
		document.getElementById("ipaconcat").innerHTML = symbol;
		// Set sound explanation below tables
		document.getElementById("hint").innerHTML = soundExplanation();
		// Set pointer description for example word
		popMoreInfo();

function soundExplanation()
{
	var labialization = soundSelected.Labialization==='labialized'? soundSelected.Labialization :'';
	var glottalization = soundSelected.Epiglottis==='glottalized'? soundSelected.Epiglottis :'';
	var manner = soundSelected.Manner === 'liquidglide'? "liquid / glide": soundSelected.Manner;
	var article = soundSelected.Place.charAt(0)==='a' && labialization === '' && glottalization===''? 'an':'a';
	var definition = symbol.bold() + " is the " + curLanguage + " symbol for " + article + " " + capitalize(glottalization) + " " + capitalize(labialization) + " " + capitalize(soundSelected.Place) + " " + capitalize(manner) + ". ";
	console.log(definition);
	return definition;
}