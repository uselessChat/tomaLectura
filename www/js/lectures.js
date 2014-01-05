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
	
	//Called to download the file that contain the information required by the user
	function downloadFile(){
		alert(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileName,
			fileApi.transferOptions.fileURI+'/'+fileApi.fileName,fileDownloadComplete,fileTransferError );
		//fileApi.ft.download(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileName,
			//fileApi.transferOptions.fileURI+'/'+fileApi.fileName,fileDownloadComplete,fileTransferError );
			//"file:///sdcard/image.jpg",fileDownloadComplete,fileTransferError   
	}