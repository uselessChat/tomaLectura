var fileApi = {
		//ft : new FileTransfer(),
		fileName : 'lectures.xml',		//File name by the user to be read/write
		transferOptions : {
			get fileURI(){return fileApi.fileSystem.root.fullPath;}, 
			serverURI : encodeURI("http://192.168.1.64/"), //Server path to uploads file
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
		var fileTransfer = new FileTransfer();

		/*	fileTransfer.download(
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
			alert(fileApi.transferOptions.fileURI+'/'+fileApi.fileName);//,fileDownloadComplete,fileTransferError );
		fileTransfer.download(fileApi.transferOptions.serverURI + fileApi.transferOptions.downloadDirectoryServer + fileApi.fileName,
			fileApi.transferOptions.fileURI+'/'+fileApi.fileName,fileDownloadComplete,fileTransferError );
			//"file:///sdcard/image.jpg",fileDownloadComplete,fileTransferError   
	}
	
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
		
		var fileTransfer = new FileTransfer();
		fileTransfer.upload(fileURI, serverURIReceiver, fileUploadResult, fileTransferError, options,true);
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
			xmlFile = reader.result;
			alert(xmlFile);
			/*var text = reader.result;   // This is the file contents
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
		};
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