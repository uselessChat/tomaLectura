//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************************************************** Camera API identifiers *********************************************/
	
	// Save the baseCode64 bits from the image and the local storage uri
	var cameraImage = {
		set baseCode64(bc){this.bc = bc;},	//image BaseCode64 value
		set uri(u){this.u = u;},			//image local uri storage
		get baseCode64(){return this.bc;},
		get uri(){return this.u;},
		id : '#viewImage'					//Element in index.html to render the image
	};
	
	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
	
	// navigator.camera.getPicture options
	var imageOptions = {
		quality			: 50,		//Quality of the saved image, range of 0 - 100
		allowEdit		: false,	//Allow simple editing of image before selection
		encodingType	: 0,		//Return JPEG encoded image
		targetWidth		: 100,		//Width in pixels to scale image
		targetHeigth	: 100,		//Height in pixels to scale image
		mediaType		: 0,		//Allow selection of still pictures only.
		correctOrientation	: true,	//Rotate the image to correct for the orientation of the device during capture
		saveToPhotoAlbum	: true,	//Save the image to the photo album on the device after capture.
		//popoverOptions			//iOS-only options that specify popover location in iPad
		//cameraDirection			//Choose the camera to use (front- or back-facing)
		destinationType : -1,		//Format of the return value
		sourceType		: -1		//Source of the picture
	};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************************************************** Geolocation identifiers ********************************************/
	//Android 2.x emulators do not return a geolocation result unless the enableHighAccuracy option is set to true
	var geolocationOptions = {
		enableHighAccuracy: true,	//Provides a hint that the application needs the best possible results.
		maximumAge:			3000,	// Accept a cached position whose age is no greater than the specified time in milliseconds.
		timeout:			10000	//The maximum length of time (milliseconds) that is allowed to pass from the call to geolocation.getCurrentPosition or geolocation.watchPosition until the corresponding geolocationSuccess callback executes
	};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/******************************************************* File identifiers ***********************************************/
	
	var fileApi = {
		ft : new FileTransfer(),
		fileName : 'lectures.xml',		//File name by the user to be read/write
		transferOptions : {
			get fileURI(){return this.fs.root.fullPath;}, 
			serverURI : encodeURI("http://192.168.1.76/"), //Server path to uploads file
			uploadReceiver : 'upload.php',
			downloadDirectoryServer : 'lectures/'
		},
		storage : {size : 10000}, //indicates how much storage space, in bytes, the application expects to need
		set fileSystem(fs){this.fs = fs;},
		get fileSystem(){return this.fs;},
		onloadStart : function(evt){ alert('Starting the reading');},										//Read
		onload : function(evt){alert('Read success Result: '+evt.target.result);},							//Read
		onabort : function(evt){alert('The operation has aborted Result: '+evt.target.result);},			//Read&&Write
		onerror : function(evt){alert('Failure in reading/writing the file Result: '+evt.target.result);},	//Read&&Write	
		onloadend: function(evt){alert('Operation complete Result: '+evt.target.result);},					//Read
		onwritestart : function(evt){ alert('Starting the writing');},										//Write
		onwrite : function(evt){alert('Write Success');},													//Write
		onwriteend : function(evt){alert('Operation complete ')},											//Write
		set xml(x){this.x = x;},
		get xml(){return this.x}
	};

	// Error codes that can be present when transferring  a file
	var fileTransferErrorCodes = {};
		fileTransferErrorCodes[FileTransferError.FILE_NOT_FOUND_ERR] = 'FILE_NOT_FOUND_ERR';
		fileTransferErrorCodes[FileTransferError.INVALID_URL_ERR] = 'INVALID_URL_ERR';
		fileTransferErrorCodes[FileTransferError.CONNECTION_ERR] = 'CONNECTION_ERR';
		fileTransferErrorCodes[FileTransferError.ABORT_ERR] = 'ABORT_ERR';
		
	// Error codes that can be present when reading/writing a file
	var fileErrorCodes = {};
		fileErrorCodes[FileError.NOT_FOUND_ERR] = 'NOT_FOUND_ERR';
		fileErrorCodes[FileError.SECURITY_ERR] = 'SECURITY_ERR';
		fileErrorCodes[FileError.ABORT_ERR] = 'ABORT_ERR';
		fileErrorCodes[FileError.NOT_READABLE_ERR] = 'NOT_READABLE_ERR';
		fileErrorCodes[FileError.ENCODING_ERR] = 'ENCODING_ERR';
		fileErrorCodes[FileError.NO_MODIFICATION_ALLOWED_ERR] = 'NO_MODIFICATION_ALLOWED_ERR';
		fileErrorCodes[FileError.INVALID_STATE_ERR] = 'INVALID_STATE_ERR';
		fileErrorCodes[FileError.SYNTAX_ERR] = 'SYNTAX_ERR';
		fileErrorCodes[FileError.INVALID_MODIFICATION_ERR] = 'INVALID_MODIFICATION_ERR';
		fileErrorCodes[FileError.QUOTA_EXCEEDED_ERR] = 'QUOTA_EXCEEDED_ERR';
		fileErrorCodes[FileError.TYPE_MISMATCH_ERR] = 'TYPE_MISMATCH_ERR';
		fileErrorCodes[FileError.PATH_EXISTS_ERR] = 'PATH_EXISTS_ERR';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/******************************************************* Events *********************************************************/
	// Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);
	
	// Sevice APIs are available
    //
    function onDeviceReady() {
        pictureSource	= navigator.camera.PictureSourceType;
        destinationType	= navigator.camera.DestinationType;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, fileApi.storage.size, requestFileSystemOnSuccess, requestFileSystemOnError);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************************************************** Camera functions ***************************************************/

	// Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
		// Uncomment to view the base64-encoded image data
		// console.log(imageData);

		// Get image handle
		//
		//var smallImage = document.getElementById('smallImage');
		var imageElement = $(cameraImage.id);
		
		// Unhide image elements
		//
		imageElement.style.display = 'block';
		// Show the captured photo
		// The in-line CSS rules are used to resize the image
		//<img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
		imageElement.src = "data:image/jpeg;base64," + imageData;
		
		// Set the value to the global identifier
		//
		cameraImage.baseCode64 = imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
		// Uncomment to view the image file URI
		// console.log(imageURI);

		// Get image handle
		//
		//var largeImage = document.getElementById('largeImage');
		var imageElement = $(cameraImage.id);
		// Unhide image elements
		//
		imageElement.style.display = 'block';
		
		// Show the captured photo
		// The in-line CSS rules are used to resize the image
		//
		imageElement.src = imageURI;

		// Set the value to the global identifier
		//
		cameraImage.uri = imageURI;	  
    }

    // Capture the photo
    //
    function capturePhoto(source) {
		// Take picture using device camera and retrieve image as base64-encoded string
		imageOptions.destinationType	= destinationType.DATA_URL;
		imageOptions.sourceType			= source;
		
		navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataError,imageOptions);
    }

    // Get a photo from the device
    //
    function getPhoto(source) {
		// Retrieve image file location from specified source
		imageOptions.destinationType	= destinationType.FILE_URI;
		imageOptions.sourceType			= source;
		
		navigator.camera.getPicture(onPhotoURISuccess, onPhotoDataError,imageOptions);
    }

    // Called if something bad happens.
    //
    function onPhotoDataError(message) {
		alert('Se ha producido un error, causa: ' + message);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************************************************** Connection functions ***********************************************/
	var checkConnection = function(){
		if(navigator.onLine){return true;}
		return false;
	};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************************************************** Geolocation functions **********************************************/
	// Get the current geolocation point
	function getGeolocation(){
		navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError,geolocationOptions);
	}
	// Called when the point is successfully retrieved
	function geoLocationSuccess(position){
		// Elements to be updated in the index.html
		$('#'+newimageTagDom.newlatitude).val(position.coords.latitude);
		$('#'+newimageTagDom.longitude).val(position.coords.longitude);
		$('#'+newimageTagDom.newdate).val(position.timestamp);
	}
	// Called when a failure is present
	function geoLocationError(error) {
		alert('Se ha producido un error\n'+
			'Code: '    + error.code    + '\n' +
			'Message: ' + error.message + '\n');
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/****************************************************** File functions **************************************************/
	// Called when the file system is successfully retrieved
	var requestFileSystemOnSuccess = function(fileSystem){
		alert("Get and Set File System");
		fileApi.fileSystem = fileSystem;
	};
	// Called when a failure is present when retrieving the file system
	var requestFileSystemOnError = function(error){
		alert("Error in file system request\n"+
			"Code: "+error.code+"\n"+
			"Description: "+fileErrorCodes[error.code]);
	};
	
	//Called to upload the updated xml
	function uploadFile() {
		var fileURI = fileApi.transferOptions.fileURI+'/'+fileApi.fileName;
		var serverURIReceiver = fileApi.transferOptions.serverURI+fileApi.transferOptions.uploadReceiver;
		
		var options = new FileUploadOptions();
		options.fileKey ="file";
		options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);
		options.mimeType ="text/plain";
		alert("fileURI: "+fileURI);
		alert('Server uri receiver: '+serverURIReceiver);
		alert("Filekey: "+options.fileKey+" FileName: "+options.fileName+" Mimetype: "+options.mimeType);
		var params = {};
		params.value1 = "test";
		params.value2 = "param";

		options.params = params;
		options.chunkedMode = false;
		//var fileApi.ft = new FileTransfer();
		fileApi.ft.upload(fileURI, serverURIReceiver, fileUploadResult, fileTransferError, options,true);
	}
	
	//Called to download the file that contain the information required by the user
	function downloadFile(){
		alert(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileName,
			fileApi.transferOptions.fileURI+'/'+fileApi.fileName,fileDownloadComplete,fileTransferError );
		fileApi.ft.download(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileName,
			fileApi.transferOptions.fileURI+'/'+fileApi.fileName,fileDownloadComplete,fileTransferError );
			//"file:///sdcard/image.jpg",fileDownloadComplete,fileTransferError   
	}
	
	//Called when the download was complete
	var fileTransferError = function (entry) {
		alert("download complete: " + entry.fullPath);
	};
	
	//Called when tha transfer was a failure
	var fileTransferError = function (error) {
		alert("An error has occurred: Code = " + error.code + 'Description: '+fileTransferErrorCodes[error.code]);
		alert("upload error source " + error.source);
		alert("upload error target " + error.target);
	};

	//Called when the transfer was successfull
	var fileUploadResult = function (r) {
		alert("Code = " + r.responseCode);
		alert("Response = " + r.response);
		alert("Sent = " + r.bytesSent);
	};
	
	// Function the chain functions to get the file to read
	var readFile = function(){
		alert("Get File Entry");
		fileApi.fileSystem.root.getFile(fileApi.fileName,null,readFileEntryOnSuccess,readFileEntryOnError); //null : dont alloy the creation of the file if doesnt exist
		//fileSystem.root.getFile("readme.txt", {create : true}, gotFileEntry, fail);
	};
	
	var readFileEntryOnSuccess = function(fileEntry){
		alert("File entry");
		fileEntry.file(fileOnSuccess, fileOnError);
	};
	var readFileEntryOnError = function(error){
		alert("Error in File Entry\n"+
			"Code: "+error.code+"\n"+
			"Description: "+fileErrorCodes[error.code]);
	};
	var fileOnSuccess = function(file){
		alert('File');
		readAsText(file);
	};

	var readAsText = function(file) {
		alert('Read as text');
		var reader = new FileReader();
		reader.onload = function() {    // Define an event handler
			var text = reader.result;   // This is the file contents
			var out = document.getElementById("output");    // Find output element
			out.innerHTML = "";                             // Clear it
			out.appendChild(document.createTextNode(text)); // Display file contents
				/*var outXml = document.getElementById("outputXml");
				outXml.innerHTML = "";
				
				var xmlDoc = $.parseXML( text ),
				$xml = $( xmlDoc );
				$element = $xml.find( "description" );
				outXml.appendChild(document.createTextNode($element.text())); // Display file contents*/
				
			//parseXml($.parseXML( text ));
		}
		reader.onabort = fileApi.onabort;
		reader.onloadStart = fileApi.onloadStart;
		reader.onerror = fileApi.onerror;
		reader.onloadend = fileApi.onloadend;
		reader.readAsText(file);
	};
	var fileOnError = function(error){
		alert("Error in file\n"+
			"Code: "+error.code+"\n"+
			"Description: "+fileErrorCodes[error.code]);
	};
	var writeFile = function(){
		alert("Get File Entry");
		fileApi.fileSystem.root.getFile(fileApi.fileName,{create: true, exclusive: false},writeFileEntryOnSuccess,writeFileEntryOnError);
		//fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
	};
	var writeFileEntryOnSuccess = function(fileEntry){
		alert('File Entry');
		fileEntry.createWriter(createWriterOnSuccess, createWriterOnError);
	};
	var createWriterOnSuccess = function(writer){
		writer.onwritestart = fileApi.onwritestart;
		writer.onwrite = fileApi.onwrite;
		writer.onwriteend  = fileApi.onwriteend;
		writer.onabort = fileApi.onabort;
		writer.onerror = fileApi.onerror;
		if(fileApi.xml){
			writer.write(fileApi.xml);
		}else{ 
			alert('The xml file has no changes, therefore is not going be updated');
		}
		
	};
	var createWriterOnError = function(){
		alert("Error in Writer\n"+
			"Code: "+error.code+"\n"+
			"Description: "+fileErrorCodes[error.code]);
	};

	var writeFileEntryOnError = function(){
		alert("Error in File Entry\n"+
			"Code: "+error.code+"\n"+
			"Description: "+fileErrorCodes[error.code]);
	};