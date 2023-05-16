//declaration of an object with the following variables: place, manner, labialization, vocalFolds
soundFeaturesSelected = {
  place: 'bilabial',
  manner: 'stop',
  labialization: 'not-labialized',
  vocalFolds: 'closed',
  oral: 'oral',
};

var soundSearched=false;
soundSelected=soundData.find(sound => sound.hulq === 'p’');

/*setSoundFeaturesSelected()
  Finds the values of the selected radio buttons and checkboxes
  Sets values in soundFeaturesSelected[].
*/
function setSoundFeaturesSelected(){
  setPlaceMannerValues();
  setVocalFoldsValues();
  soundFeaturesSelected.labialization = document.querySelector('input[name="labialization"]:checked').value;
  console.log(soundFeaturesSelected);
}

function setPlaceMannerValues() {
  const selectedRadio = document.querySelector('input[name="lingual"]:checked');
  if (selectedRadio) {
    const id = selectedRadio.id;
    const [manner, place] = id.split('_');
    soundFeaturesSelected.manner = manner;
    soundFeaturesSelected.place = place;
    soundFeaturesSelected.oral = soundFeaturesSelected.manner === 'nasal' ? soundFeaturesSelected.manner : 'oral';
  }
}

function setVocalFoldsValues() {
  const vocalFoldCheckboxes = document.querySelectorAll('input[type="checkbox"][name="vocalFolds"]');
  let selectedValuesList = [];
  vocalFoldCheckboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      selectedValuesList.push(checkbox.value);
    };
  });
  let selectedValues='';
  for (let i = 0; i < selectedValuesList.length; i++) {
    selectedValues+=selectedValuesList[i];
    if(i<selectedValuesList.length-1){
      selectedValues+=',';
    }
  }
  soundFeaturesSelected.vocalFolds = selectedValues;
}


/*findMatchingSound()
  This function determines if there is a sound that matches the articulatory features selected. 
  It is NOT language specific. Searches from sounds in soundData[] in sound_data.js
  Determine the index of the sound in the data const based on the user's inputs:
  This function takes the values of the user's selections as arguments, 
  Filters the soundData array to find any sounds that match those selections, 
  Feturns the index of the first matching sound.
*/
function findMatchingSound() {
  const matchingSounds = soundData.filter(sound => {
    return (
      soundFeaturesSelected.manner === sound.Manner &&
      soundFeaturesSelected.place === sound.Place &&
      soundFeaturesSelected.labialization === sound.Labialization &&
      soundFeaturesSelected.oral === sound.Oral &&
      soundFeaturesSelected.vocalFolds === sound.VocalFolds
      //checkVocalFolds(sound.VocalFolds)
    );
  });
  
  // If any sounds match the features, return the first matching sound object
  if (matchingSounds.length !== 0) {
    //console.log(matchingSounds);
    return matchingSounds[0];
  }
  
  // No sounds match the features, return null
  console.log('no matching sound');
  return null;
}


//determines whether the sound object vocal folds features matches the vocal folds features selected by the user.
// function checkVocalFolds(soundVocalFolds){
//   vocalFolds_values = soundVocalFolds.split('_');
//   //console.log(vocalFolds_values.length + ' sound vf length ,'+ soundFeaturesSelected.vocalFolds.length + 'selected vf length');
//     const vocalFolds = Array.isArray(vocalFolds_values) ? soundVocalFolds : [soundVocalFolds];
    
//     if (vocalFolds.length !== soundFeaturesSelected.vocalFolds.length) {
//       return false;
//     }
//     return vocalFolds.every((element, index) => element === soundFeaturesSelected.vocalFolds[index]);
// }


// //THIS IS THE MOST IMPORTANT FUNCTION. It finds all table inputs, populates soundFeaturesSelected, locates the associated sound in soundData, and then sets the picture.
function findSelectedSound(){
  setSoundFeaturesSelected();
  soundSelected=findMatchingSound();
  //console.log(soundSearched);
  if (soundSelected===null) {setFeaturesImage();}
  else{setSoundImage();}
}

//Return the "sound examples" for a given sound index:
//This function simply returns the "SoundExamples" value for the given sound index.
function getSoundExamples(soundSelected) {
  return soundSelected.SoundExamples;
}


// get references to the buttons and textbox

// const buttonsExceptSearch = document.querySelectorAll("button:not(#search-button)");

// // attach click event listeners to all buttons except A
// buttonsExceptSearch.forEach((button) => {
//   button.addEventListener("click", () => {
//     // clear the text in the textbox
//     clearIPA();
//   });
// });

const radios = document.querySelectorAll('input[type="radio"]:not([id*="dialectA"]):not([id*="dialectB"])');
// attach click event listeners to all buttons except A
radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    // clear the text in the textbox
    soundSearched=false;
    document.getElementById("ipaconcat").innerHTML = '';
    document.getElementById("hint").innerHTML='Select features of a sound. Click to see if it’s a sound in '+curLanguage+'.';
  });
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// attach click event listeners to all buttons except A
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    // clear the text in the textbox
    soundSearched=false;
    document.getElementById("ipaconcat").innerHTML = '';
  });
});

function onVoicingMannerButtonClicked() {
  console.log("help");
  document.getElementById("vibrating").checked = true;
  document.getElementById("open").checked = false;
  //document.getElementById("closed").checked = false;
}

function orange(element) {
  document.getElementById(element).style.background = "#ffe4b5";
}

function blue(element) {
  // document.getElementById(element).style.background = "#3a3a40";
  document.getElementById(element).style.background = "#78E1D6";
}

function white(element) {
  document.getElementById(element).style.background = "#ffffff";
}

function oring(element) {
  document.getElementById(element).style.border = "4px solid #ffe4b5";
}

function bring(element) {
  document.getElementById(element).style.border = "4px solid #8a8a90";
}
