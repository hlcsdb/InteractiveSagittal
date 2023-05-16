/*This script contains listeners that control user settings. 
At this point, it only controlls selection settings for the vocalfolds table
*/
const openCheckbox = document.getElementById("open");
const closedCheckbox = document.getElementById("closed");
const vibratingCheckbox = document.getElementById("vibrating");

openCheckbox.addEventListener("change", () => {
  closedCheckbox.checked = false;
  vibratingCheckbox.checked = false;
  findSelectedSound();
});

closedCheckbox.addEventListener("change", () => {
  openCheckbox.checked = false;
  findSelectedSound();
});
vibratingCheckbox.addEventListener("change", () => {
  openCheckbox.checked = false;
  findSelectedSound();
});

const search_trigger = document.querySelector('#search-button');

search_trigger.addEventListener('click', () => {
  console.log('search click event triggered');
  transcribe();
});


function showFeatureExplanation(featureID){
  console.log("featureID: ",featureID);
  var feature = featureDescriptionsJSON.find(obj => obj.id === featureID||obj.featureName ===featureID);
  document.getElementById("featureName").innerHTML = feature.featureName;
  document.getElementById("featureInfoText").innerHTML = feature.description;
}

/*POPUPS!!*/
//all popup containers

//Credits POPUP
const credits_popup_button_trigger = document.querySelector('.credits-popup-button-trigger');
const creditsPopupContainer = document.querySelector('.credits-popup-container');


credits_popup_button_trigger.addEventListener('click', () => {
  console.log("supposed to show credits popup");
  showPopup(creditsPopupContainer);
});

const creditsCloseBtn = document.querySelector('.credits-close-button');

creditsCloseBtn.addEventListener('click', () => {
  hidePopup(creditsPopupContainer);
});

const example_popup_trigger = document.querySelector('.example-popup-trigger');
const examplePopupContainer = document.querySelector('.example-popup-container');

document.addEventListener('click', (event) => {
  if (event.target.classList.contains("example-popup-trigger")) {
    console.log("supposed to show example popup");
    popMoreInfo();
    showPopup(examplePopupContainer);
  }
});
const exampleCloseBtn = document.querySelector('.example-close-button');

exampleCloseBtn.addEventListener('click', () => {
    hidePopup(examplePopupContainer);
});

//Features POPUP
const feature_popup_button_triggers = document.querySelectorAll('.feature-popup-button-trigger');
const featurePopupContainer = document.querySelector('.feature-popup-container');

feature_popup_button_triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    var featureName = trigger.innerHTML;
    showFeatureExplanation(featureName);
    showPopup(featurePopupContainer);
  });
});

const featureCloseBtn = document.querySelector('.feature-close-button');

featureCloseBtn.addEventListener('click', () => {
    hidePopup(featurePopupContainer);
});

let activePopup = null;
console.log(activePopup);

function showPopup(popupContainer) {
  overlay.style.display = 'block';
  popupContainer.style.display = 'block';
  activePopup = popupContainer;
  console.log(activePopup);
}

function hidePopup(popupContainer) {
  overlay.style.display = 'none';
  popupContainer.style.display = 'none';
  activePopup = null;
  console.log(activePopup);
}

const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', () => {
    hidePopup(activePopup);
});