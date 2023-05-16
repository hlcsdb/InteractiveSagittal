
/*SagittalImages script
This script has all the functions that control the sagittal image on the left side of the window.
They are in this script to increase cleanliness
*/

function sameSize(imgID)
{
	var newWidth = 1 * document.getElementById(imgID).width;
	var newHeight = 1 * document.getElementById(imgID).height;
	// document.getElementById(imgID).width = newWidth;
	// document.getElementById(imgID).height = newHeight;
	document.getElementById(imgID).src += "?r=" + Math.random();
}

function maintainSammy()
{
	sameSize("palate");
	sameSize("lips");
	sameSize("tongue");
	sameSize("velum");
	sameSize("vocalFolds");
}

function hiLite(imgID,imageFilename) 
{
 	document.images.namedItem(imgID).src = imageFilename; 
 	// console.log(imgName + "." + extension);
	sameSize(imgID);
}

const sagittalImageGrid=[document.getElementById('palate'), document.getElementById('lips'), document.getElementById('tongue'),document.getElementById('velum'), document.getElementById('vocalfolds')];
const gridAnatomy = ['palate', 'lips', 'tongue', 'velum', 'vocalFolds'];

function setSoundImage(){
	var soundSelectedImageFilenames = getSoundImageFilenames();
	//console.log(soundSelectedImageFilenames);
	if (sagittalImageGrid.length !== soundSelectedImageFilenames.length) {
		throw new Error("The two arrays must have the same length.");
	}

	for (let i = 0; i < sagittalImageGrid.length; i++) {
		hiLite(gridAnatomy[i],soundSelectedImageFilenames[i])
		//sagittalImageGrid[i].src = soundSelectedImageFilenames[i];
	}
}

function getSoundImageFilenames(){
	//console.log(soundSelected);
	var soundSelectedImageFilenames=[]
	var soundSelectedImages=[soundSelected.palateImage, soundSelected.lipImage, soundSelected.tongueImage, soundSelected.velumImage, soundSelected.vocalfoldsImage]; 
	for(let i = 0; i<soundSelectedImages.length;i++){

		let image = articulationImages.find(img => img.id === soundSelectedImages[i]);
		//console.log(image);
		image = generateImageFilepath(image.imageFilename);
		soundSelectedImageFilenames.push(image);
	}
	return soundSelectedImageFilenames;
}

function setFeaturesImage(){
	const functions = [setOralImage, setLipsImage, setTongueImage,setOralImage, setVocalfoldsImage];
	
	for (let i = 0; i < functions.length; i++) {
		functions[i](i);
	}
	//console.log('will set template image');
}


function setOralImage(gridPosition) {
  const imageID = gridAnatomy[gridPosition] + "-" + soundFeaturesSelected.oral;
  //console.log(imageID);
  hiLite(gridAnatomy[gridPosition], generateImageFilepath(findImageFile(imageID)));

}

/*
function setLipsImage(gridPosition){
	if(soundFeaturesSelected.place ==='dental' && soundFeaturesSelected.manner === 'fricative'){
		if(soundFeaturesSelected.labialization === 'labialized'){
			sagittalImageGrid[1].src = generateImageFilepath('lips-labialized-dental-fricative');
		}
		else if(soundFeaturesSelected.labialization === 'not-labialized'){sagittalImageGrid[1].src = generateImageFilepath('lips-not-labialized-dental-fricative');}
	} 
	else if(soundFeaturesSelected.place === 'bilabial'){
		if(soundFeaturesSelected.manner === 'fricative'){generateImageFilepath('lips-bilabial-fricative');}
		else{generateImageFilepath('lips-bilabial');}
	}
	else if(soundFeaturesSelected.labialization === 'labialized'){sagittalImageGrid[1].src = generateImageFilepath('lips-labialized');}
	else if(soundFeaturesSelected.labialization === 'not-labialized'){sagittalImageGrid[1].src = generateImageFilepath('lips-not-labialized');}
}*/
function setLipsImage(gridPosition) {
	let imageID;
	if(soundFeaturesSelected.manner==='affricate'&&soundFeaturesSelected.place==='dental'){
		imageID = gridAnatomy[gridPosition]+'-'+soundFeaturesSelected.place+'-'+soundFeaturesSelected.manner;
	}
	else if((soundFeaturesSelected.manner==='fricative'||soundFeaturesSelected.manner==='liquidglide')&&soundFeaturesSelected.place==='dental'){
		imageID = gridAnatomy[gridPosition]+'-'+soundFeaturesSelected.labialization+'-'+soundFeaturesSelected.place+'-fricative';
	}
	else if(soundFeaturesSelected.place==='bilabial'){imageID = gridAnatomy[gridPosition]+'-bilabial';}
	else{
		imageID = gridAnatomy[gridPosition]+'-'+soundFeaturesSelected.labialization;
	}
	//console.log(findImageFile(imageID));
	hiLite(gridAnatomy[gridPosition], generateImageFilepath(findImageFile(imageID)));
}



function setTongueImage(gridPosition) {
	let imageID='';
	if((soundFeaturesSelected.manner==='fricative'||soundFeaturesSelected.manner==='liquid_glide')&&soundFeaturesSelected.place==='dental'){
		imageID = gridAnatomy[gridPosition]+'-'+soundFeaturesSelected.place+'-fricative';
	}else{
	imageID = gridAnatomy[gridPosition]+'-'+soundFeaturesSelected.place+'-'+soundFeaturesSelected.manner;
	console.log(imageID);
	}
	hiLite(gridAnatomy[gridPosition], generateImageFilepath(findImageFile(imageID)));
}

/*
function setVocalfoldsImage(gridPosition){
	if(soundFeaturesSelected.vocalFolds.includes(",")){
		var vocalFolds= soundFeaturesSelected.vocalFolds.split(",");
		var imagefilepath = gridAnatomy[gridPosition]+'-'+vocalFolds[1]+','+gridAnatomy[gridPosition]+'-'+vocalFolds[0];
		alternateImages(imagefilepath, elementId[gridPosition]);
	}else{
		var imagefilepath = gridAnatomy[gridPosition]+'-'+soundFeaturesSelected.vocalFolds;
		elements[gridPosition].src = generateImageFilepath(imagefilepath);
	}
}*/

function setVocalfoldsImage(gridPosition) {
  	const imageID = 'voice-'+soundFeaturesSelected.vocalFolds.replace(',', '-');
  	//console.log(imageID);
	hiLite(gridAnatomy[gridPosition], generateImageFilepath(imageID));
}

function findImageFile(imageID){
	console.log(imageID);
	let image=articulationImages.find(img => img.id === imageID);
	
	return image.imageFilename;
}

/*
not needed anymore because using gifs
//Alternate the images in the grid for tongue or vocal folds values with 2 images:
function alternateImages(imagesString, elementId) {
  let counter = 0;
  images = imagesString.split(', ');
  var image1 = generateImageFilepath(images[0]);
  var image2 = generateImageFilepath(images[1]);

  const interval = setInterval(() => {
    if (counter % 2 === 0) {
      elementId.src = image1;
    } else {
      elementId.src = image2;
    }
    counter++;
    if (counter === 6) {
      clearInterval(interval);
    }
  }, 500);
  document.getElementById(elementId).src = images[0];
} 
*/

function generateImageFilepath(imageFilename){
  var extension="gif";
  //console.log(imageFilename);
  //console.log("images/"+ imageFilename + "." + extension);
  return "images/"+ imageFilename + "." + extension;
}

