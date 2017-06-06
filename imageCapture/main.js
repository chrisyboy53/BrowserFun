const img = document.querySelector('img');

navigator.mediaDevices.getUserMedia({video:true})
	.then(gotMedia)
	.catch(error => logError('getUserMedia() error:', error));

function gotMedia(mediaStream) {
	const mediaStreamTrack = mediaStream.getVideoTracks()[0];
	const imageCapture = new ImageCapture(mediaStreamTrack);

	if (imageCapture) {
		imageCapture.takePhoto()
			.then(blob => {
				img.src = URL.createObjectURL(blob);
				img.onload = () => {URL.revokeObjectURL(this.src);};
			})
			.catch(error => logError('takePhoto() error:', error));
	}
	else{
		throw 'imageCapture isn\'t present in this version of chrome';
	}
}

function logError(errorStr, errorObj) {
	const errorDOM = document.getElementById('error');
	if (errorDOM) {
		errorDOM.innerHTML = errorStr;
	}
	if (errorObj) {
		console.error(errorStr, errorObj);
	}
	else {
		console.error(errorStr);
	}
}
