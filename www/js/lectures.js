var fileApi = {
		ft : new FileTransfer(),
		fileName : 'lectures.xml',		//File name by the user to be read/write
		transferOptions : {
			//get fileURI(){return fileApi.fileSystem.root.fullPath;}, 
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
		onwriteend : function(evt){alert('Operation complete ');},											//Write
		set xml(x){this.x = x;},
		get xml(){return this.x;}
	};
	
    /*function onDeviceReady() {
        pictureSource	= navigator.camera.PictureSourceType;
		if(pictureSource)alert("Carga de pictureSource");
        destinationType	= navigator.camera.DestinationType;
		if(destinationType)("Carga de destinationType ");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, fileApi.storage.size, requestFileSystemOnSuccess, requestFileSystemOnError);
    }*/
	
	// Called when the file system is successfully retrieved
	var requestFileSystemOnSuccess = function(fileSystem){
		alert("Get and Set File System");
		fileApi.fileSystem = fileSystem;
		alert("Fullpath : "+fileApi.fileSystem.root.fullPath);
	};
	// Called when a failure is present when retrieving the file system
	var requestFileSystemOnError = function(error){
		alert("Error in file system request\n"+
			"Code: "+error.code+"\n"+
			"Description: "+fileErrorCodes[error.code]);
	};
	
	//Called to download the file that contain the information required by the user
	function downloadFile(){
		/*var fileTransfer = new FileTransfer();

			fileTransfer.download(
				"http://192.168.1.64/lectures/lectures.xml",
				"file:///sdcard/lectures.xml",
				function(entry) {
				alert("download complete: " + entry.fullPath);
				},
				function(error) {
					alert("download error source " + error.source);
					alert("download error target " + error.target);
					alert("upload error code" + error.code);
				}    
			);*/
		alert(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileApi.fileName);
			//alert(fileApi.transferOptions.fileURI+'/'+fileApi.fileName);//,fileDownloadComplete,fileTransferError );
		//fileApi.ft.download(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileName,
			//fileApi.transferOptions.fileURI+'/'+fileApi.fileName,fileDownloadComplete,fileTransferError );
			//"file:///sdcard/image.jpg",fileDownloadComplete,fileTransferError   
	}
	
	//Called when the download was complete
	var fileDownloadComplete = function (entry) {
		alert("download complete: " + entry.fullPath);
	};
	
	//Called when tha transfer was a failure
	var fileTransferError = function (error) {
		alert("An error has occurred: Code = " + error.code + 'Description: '+fileTransferErrorCodes[error.code]);
		alert("upload error source " + error.source);
		alert("upload error target " + error.target);
	};