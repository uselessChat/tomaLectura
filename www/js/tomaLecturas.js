//var xml para desarrollo
var xml = {
    get parse(){
		/*if(!xmlFile.length > 0){
			readFile();
		}*/
		return $.parseXML(xmlFile);
	}
};

var setXml = function(){
	if(!xmlFile.length > 0){
		readFile();
	}
	$.mobile.changePage($('#menu'));
};

var currentsId = {
    routeId : null,
    accountId : null,
    anomalyId : null,
    imageId : null,
    set actualId(id){
        switch(id.length){
            case subStringId.lengthR: this.routeId = id;alerts(this.routeId);break;
            case subStringId.lengthAcc: this.accountId = id;break;
            case subStringId.lengthAmy : this.anomalyId = id;break;
            case subStringId.lengthImg : this.imageId = id;break;
        }
        alerts("id: "+id +" Length: "+id.length);
    },
    get actualR(){return this.routeId;},
    get actualAcc(){return this.accountId;},
    get actualAmy(){return this.anomalyId;},
    get actualImg(){return this.imageId;}
};

var total ={//FIXME
    image : {
        i : 0,
        add : function(){this.i++;},
        remove : function(){this.i--;},
        get get(){return i;}
    },
    anomaly : {
        a : 0,
        add : function(){this.a++;},
        remove : function(){this.a--;},
        get get(){return a;}
    }
};

var subStringId = {
    length :        3,
    routeStart :    3,
    accountStart :  9,
    anomalyStart :  15,
    imageStart :    21,
    route :         'rou',
    account :       'acc',
    anomaly :       'amy',
    image :         'img',
    get lengthR(){return this.routeStart+this.length;},
    get lengthAcc(){return this.accountStart+this.length;},
    get lengthAmy(){return this.anomalyStart+this.length;},
    get lengthImg(){return this.imageStart+this.length;}
};

var uniqueId = {
    fillZero : function(v){
        v++;
        if(v/10 < 1){
            return '00'+v;
        }else{
            if(v/100 < 1){
                return '0'+v;
            }
        }
        return v;
    },
    //Se define para la ruta - Formato : rut### donde # : 0-9
    getRutaIdNumber : {
        currentValue : function(v){
            return v.substr(subStringId.routeStart,subStringId.length);
        },
        nextValue : function(v){
            return v.substr(0,subStringId.routeStart)+uniqueId.fillZero(this.currentValue(v)*1);
        }
    },
    //Se define para la cuenta - Formato : acc### donde # : 0-9
    getAccountIdNumber : {
        currentValue : function(v){
            return v.substr(subStringId.accountStart,subStringId.length);
        },
        nextValue : function(v){
            return v.substr(0,subStringId.accountStart)+uniqueId.fillZero(this.currentValue(v)*1);
        }
    },
    //Se define para la anomalia - Formato : amy### donde # : 0-9
    getAnomalyIdNumber : {
        currentValue : function(v){
            return v.substr(subStringId.anomalyStart,subStringId.length);
        },
        nextValue : function(v){
            return v.substr(0,subStringId.anomalyStart)+uniqueId.fillZero(this.currentValue(v)*1);
        }
    },
    //Se define para la imagen - Formato : img### donde # : 0-9
    getImageIdNumber : {
        currentValue : function(v){
            return v.substr(subStringId.imageStart,subStringId.length);
        },
        nextValue : function(v){
            return v.substr(0,subStringId.imageStart)+uniqueId.fillZero(this.currentValue(v)*1);
        }
    }
};

function newObjectList(){
    var objectLi = {
        id : null,
        name : null,
        description : null        
    };
    return objectLi;
}
var load = {
	description : 'description',
	routes : {
		id : '#takeMeasures',
		ulElementAppend : '#takeMeasuresUl',
		desireEvent : 'loadAccounts',
		rootElement : 'root',
		group: 'route',
		name : 'routename'
	},
	accounts : {
		id : '#accountsList',
		ulElementAppend : '#accountsListUl',
		desireEvent : 'loadAccount',
		get rootElement(){return currentsId.actualR;},
		group : 'account',
		name : 'accountname'
	},
	anomalies : {
		id : '#anomaliesList',
		ulElementAppend : '#anomaliesListUl',
		desireEvent : 'loadAnomaly',
		get rootElement(){return currentsId.actualAcc;},
		group : 'anomalies > anomaly',
		name : 'anomalyname',
        anomalies : 'anomalies'
	},
	images : {
		id : '#anomalyImages',
		ulElementAppend : '#anomalyImagesUl',
		desireEvent : 'loadImage',
		get rootElement(){return currentsId.actualAmy;},
		group : 'images > image',
		name : 'imagename',
		images : 'images'
	},
	account : {
		id : '#account',
		name : 'accountname',
		header : '#accountHeader',
		subHeaderText: 'Cuenta ',
		get rootElement(){return currentsId.actualAcc;}
	},
	anomaly : {
		id : '#anomaly',
		name : 'anomalyname',
		header: 'anomalyHeader',
		subHeaderText: 'Anomalia ',
		get rootElement(){return currentsId.actualAmy;}
	},
	image : {
		id : '#image',
		name : 'imagename',
		image : 'image',
		header: 'imageHeader',
		subHeaderText: 'Imagen ',
		get rootElement(){return currentsId.actualImg;}
	},
	accountInformation : {
		id : '#accountInformation',
		get name(){return load.account.name;},
		header : '#accountInformationHeader',
		subHeaderText : 'Informacion de la cuenta',
		get rootElement(){return load.account.rootElement;}
	},
	measure : {
		id : '#measure',
		get name(){return load.account.name;},
		header : 'measureHeader',
		subHeaderText : 'Toma de Lectura Cuenta: ',
		get rootElement(){return load.account.rootElement;}
	}
};
//Actualziamos el contenido de la pagina que muestra la información de la Anomalia seleccionada
function showAnomalyInformation(){
    xmlParsed = xml.parse;
    //XML
    $xml = $(xmlParsed).find('#'+currentsId.actualAmy );//+' > '+ accountMeasureTag.measure
    alerts('#' + anomalyTagDom.anomalytype +" AnomalyType: "+ $xml.find(anomalyTagDom.anomalytype).text());
    //alerts($xml.find(accountMeasureTag.lecture ).text() + " lectura: "+$xml.find(accountMeasureTag.measuretaken ).text());
    
    //$( + 'option:selected').val();
    //$('#' + anomalyTagDom.anomalytype).prop("selectedIndex", $xml.find(anomalyTagDom.anomalytype).text());
    alerts($('#' + anomalyTagDom.anomalytype).val());
	$('#' + anomalyTagDom.anomalyname).val($xml.find(anomalyTagDom.anomalyname).text());
    $('#' + anomalyTagDom.anomalytype).val($xml.find(anomalyTagDom.anomalytype).text());
    //$("#dropDownList").prop("selectedIndex", 1);
    $('#' + anomalyTagDom.comment).val($xml.find(anomalyTagDom.comment ).text());
    
}
//Actualizamos el contenido de la pagina que muestra las lecturas de la cuenta correspondiente
function showAccountMeasure(){
    xmlParsed = xml.parse;
    //XML
    $xml = $(xmlParsed).find('#'+currentsId.actualAcc );//+' > '+ accountMeasureTag.measure
    alerts('#'+currentsId.actualAcc +' > '+ accountMeasureTag.measure);
    alerts($xml.find(accountMeasureTag.lecture ).text() + " lectura: "+$xml.find(accountMeasureTag.measuretaken ).text());
    
    $('#' + accountMeasureTag.lecture).val($xml.find(accountMeasureTag.lecture ).text());
    $('#' + accountMeasureTag.measuretaken).val($xml.find(accountMeasureTag.measuretaken ).text());
}
//Actualizamos el contenido de la pagina Informacion de la cuenta
function showAccountInformation(){
    xmlParsed = xml.parse;
    //XML
    $xml = $(xmlParsed).find('#'+currentsId.actualAcc);
    $('#' + accountInformationTag.number).val($xml.find(accountInformationTag.number ).text());
    $('#' + accountInformationTag.accounttype).val($xml.find(accountInformationTag.accounttype ).text());
    $('#' + accountInformationTag.street).val($xml.find(accountInformationTag.street ).text());
    $('#' + accountInformationTag.exthousenumber).val($xml.find(accountInformationTag.exthousenumber ).text());
    $('#' + accountInformationTag.inthousenumber).val($xml.find(accountInformationTag.inthousenumber ).text());
    $('#' + accountInformationTag.numbermeasure).val($xml.find(accountInformationTag.numbermeasure ).text());    
}
//Actualizamos el contenido de la pagina Imagen
function showImageInformation(){
    xmlParsed = xml.parse;
    //XML
    $xml = $(xmlParsed).find('#'+currentsId.actualImg);
    //alerts($xml.html());
    //alerts($('#' + imageTagDom.imagename).text() + " value: "+$xml.find(imageTagDom.imagename ).text());
    //Dcoument
    $('#' + imageTagDom.imagename).val($xml.find(imageTagDom.imagename ).text());
    $('#' + imageTagDom.latitude).val($xml.find(imageTagDom.latitude ).text());
    $('#' + imageTagDom.longitude).val($xml.find(imageTagDom.longitude ).text());
    $('#' + imageTagDom.date).val($xml.find(imageTagDom.date ).text());
    
}
var imageTagDom = {
    image: 'image',
    imagename: 'imagename',
    imageb64: 'imageb64',
    latitude: 'latitude',
    longitude: 'longitude',
    date: 'date'
};
var newimageTagDom = {
    newimage : 'newimage',
    newimagename : 'newimagename',
    newimageb64 : 'newimageb64',
    newlatitude : 'newlatitude',
    newlongitude : 'newlongitude',
    newdate : 'newdate'
};
var anomalyTagDom = {
    anomaly: 'anomaly',
    anomalytype : 'anomalytype',
    anomalyname: 'anomalyname',
    informativeanomaly: 'informativeanomaly',
    comment: 'comment',
    images: 'images'
};
var newanomalyTagDom = {
    newanomaly : 'newanomaly',
    newanomalytype : 'newanomalytype',
    newanomalyname : 'newanomalyname',
    newinformativeanomaly : 'newinformativeanomaly',
    newcomment : 'newcomment'
};
var accountInformationTag = {
    idAcc: function() {return currentsId.actualAcc;},
    information : 'information',
    number: 'number',
    accounttype : 'accounttype',
    street : 'street',
    exthousenumber : 'exthousenumber',
    inthousenumber : 'inthousenumber',
    numbermeasure : 'numbermeasure'
};
var accountMeasureTag = {
    measure : 'measure',
    lecture : 'lecture',
    measuretaken : 'measuretaken'
};
function cE(v) {
    return document.createElement(v);
}
function newAnomalyTagXml() {
    //Importante: Los tags se crean sin case sensitive D:!!!! )
    //$(node).empty() : solo borra los hijos tipo elementos sin tocar el atributo
    var mapAnomalyTagXml = {
        anomaly: cE(anomalyTagDom.anomaly),
        anomalytype : cE(anomalyTagDom.anomalytype),
        anomalyname: cE(anomalyTagDom.anomalyname),
        informativeanomaly: cE(anomalyTagDom.informativeanomaly),
        comment: cE(anomalyTagDom.comment),
        images: cE(anomalyTagDom.images),
        get anomalyUpdateChilds() {
            $(this.anomaly).empty();
            this.anomaly.appendChild(this.anomalyname);
            this.anomaly.appendChild(this.anomalytype);
            this.anomaly.appendChild(this.informativeanomaly);
            this.anomaly.appendChild(this.comment);
            this.anomaly.appendChild(this.images);
            //return this.anomaly;
        }
    };
    //var n = mapAnomalyTagXml.anomalyUpdateChilds;
    //$(n).empty();
    //alerts($(n).prop('outerHTML'));
    //$(mapAnomalyTagXml.anomaly).empty();
    alerts($(mapAnomalyTagXml.anomaly).prop('outerHTML'));
    return mapAnomalyTagXml;
}
function newImageTagXml() {
    //Importante: Los tags se crean sin case sensitive D:!!!! )
    var mapImageTagXml = {
        image: cE(imageTagDom.image),
        imagename: cE(imageTagDom.imagename),
        imageb64: cE(imageTagDom.imageb64),
        latitude: cE(imageTagDom.latitude),
        longitude: cE(imageTagDom.longitude),
        date: cE(imageTagDom.date),
        get imageUpdateChilds() {
            $(this.image).empty();
            this.image.appendChild(this.imagename);
            this.image.appendChild(this.imageb64);
            this.image.appendChild(this.latitude);
            this.image.appendChild(this.longitude);
            this.image.appendChild(this.date);
        }
    };
    //var n  = mapImageTagXml.imageUpdateChilds;
   // alerts($(mapImageTagXml.image).prop('outerHTML'));
    alerts($(mapImageTagXml.image).prop('outerHTML'));
    return mapImageTagXml;
}
function setTextNodeInElement(e, t) {
    var textNode = document.createTextNode(t);
    e.appendChild(textNode);
}
function createAnomalyTag() {
    var newId = getNextIdFromLastChild('#'+currentsId.actualAcc+' '+load.anomalies.group,
            currentsId.actualAcc + subStringId.anomaly);
    alerts("New Id Anomaly: "+newId);
    var tag = newAnomalyTagXml();
    tag.anomaly.setAttribute('id',newId);
    alerts('Atributo en el nuevo nodo de anomalia: '+$(tag.anomaly).attr('id'));
    alerts('new Name: '+$('#'+newanomalyTagDom.newanomalyname).val());
    alerts('new type: '+$('#'+newanomalyTagDom.newanomalytype).val());
    alerts('new comment: '+$('#'+newanomalyTagDom.newcomment).val());
    setTextNodeInElement(tag.anomalyname,$('#'+newanomalyTagDom.newanomalyname).val());
    setTextNodeInElement(tag.comment,$('#'+newanomalyTagDom.newcomment).val());
    setTextNodeInElement(tag.anomalytype,$('#'+newanomalyTagDom.newanomalytype).val());
    //setTextNodeInElement(tag.informativeanomaly,$(newanomalyTagDom.newinformativeanomaly).text());
    tag.anomalyUpdateChilds;
    
    //Convertir el nodo DOM en texto para unirlo al archivo xml
    var t = $(tag.anomaly).prop('outerHTML');
    alerts('DOM text: '+t);
    
    //insetar en el XML
    insertTagInXml('#'+currentsId.actualAcc+' '+load.anomalies.anomalies,t);
    
    //recargamos la lista de las anomalias de la cuenta correspondiente
    loadAnomalies();
    
}
function createImageTag() {
	var newIdImage = getNextIdFromLastChild('#'+currentsId.actualAmy+' '+load.images.group,
            currentsId.actualAmy + subStringId.image);
    alerts("New Id Image: "+newIdImage);
    //var idImage = uniqueId.getImageIdNumber.nextValue()
    var tag = newImageTagXml();
    tag.image.setAttribute('id', newIdImage);
	alerts($('#'+newimageTagDom.newimagename).val());
	alerts($('#'+newimageTagDom.newlatitude).val());
	alerts($('#'+newimageTagDom.newlongitude).val());
	alerts($('#'+newimageTagDom.newdate).val());
    setTextNodeInElement(tag.imagename, $('#'+newimageTagDom.newimagename).val());
    //missed the encode to b64 from uri
    setTextNodeInElement(tag.latitude, $('#'+newimageTagDom.newlatitude).val());
    setTextNodeInElement(tag.longitude,$('#'+newimageTagDom.newlongitude).val());
    setTextNodeInElement(tag.date, $('#'+newimageTagDom.newdate).val());
    tag.imageUpdateChilds;
    
	//Convertir el nodo DOM en texto para unirlo al archivo xml
    var t = $(tag.image).prop('outerHTML');
    alerts('DOM text: '+t);
    
    //insetar en el XML
    insertTagInXml('#'+currentsId.actualAmy+' '+load.images.images,t);
    
    //recargamos la lista de las anomalias de la cuenta correspondiente
    loadImages();
}
function updateSingleTagInXml(selector,value){
	xmlParsed = xml.parse;
	$(xmlParsed).find(selector).text(value);
		
	$root = $(xmlParsed).find('root');
	//alerts('XML de salida en prueba de metodos para imprimir el xml completo');
	//alerts($root.html());
    
    //Hay que actualizar el archivo modificado
	/*if($root && $root.html()){
		xmlFile = '<root>'+$root.html()+'</root>';
	}else{*/
		xmlFile = (new XMLSerializer()).serializeToString($root.context);
	//}
    
    alerts('Se imprime el nuevo xml file: '+xmlFile);
}
function saveMeasureTaken(){
	alerts("Valor del lectura Doc: "+$('#'+accountMeasureTag.lecture).val());
	alerts("Valor de la presion Doc: "+$('#'+accountMeasureTag.measuretaken).val());
	updateSingleTagInXml('#'+currentsId.actualAcc+' '+accountMeasureTag.lecture,$('#'+accountMeasureTag.lecture).val());
	updateSingleTagInXml('#'+currentsId.actualAcc+' '+accountMeasureTag.measuretaken,$('#'+accountMeasureTag.measuretaken).val());
	
	alerts("Valor del lectura xml: "+$(xmlParsed).find('#'+currentsId.actualAcc+' '+accountMeasureTag.lecture).text());
	alerts("Valor de la presion Doc: "+$(xmlParsed).find('#'+currentsId.actualAcc+' '+accountMeasureTag.measuretaken).text());
	
	//Cargamos la info de la cuenta
	loadAccount();
}
function saveAnomalyChange(){
	alerts("Valor del anomalytype Doc: "+$('#'+anomalyTagDom.anomalytype).val());
	alerts("Valor de la anomalyname Doc: "+$('#'+anomalyTagDom.anomalyname).val());
	alerts("Valor del informativeanomaly Doc: "+$('#'+anomalyTagDom.informativeanomaly).val());
	alerts("Valor de la comment Doc: "+$('#'+anomalyTagDom.comment).val());
	//updateSingleTagInXml('#'+currentsId.actualAmy+' '+anomalyTagDom.anomalytype,$('#'+anomalyTagDom.anomalytype).val());
	updateSingleTagInXml('#'+currentsId.actualAmy+' '+anomalyTagDom.anomalyname,$('#'+anomalyTagDom.anomalyname).val());
	//updateSingleTagInXml('#'+currentsId.actualAmy+' '+anomalyTagDom.informativeanomaly,$('#'+anomalyTagDom.informativeanomaly).val());
	updateSingleTagInXml('#'+currentsId.actualAmy+' '+anomalyTagDom.comment,$('#'+anomalyTagDom.comment).val());
	alerts('Selector anomaly name: '+'#'+currentsId.actualAmy+' '+anomalyTagDom.anomalyname);
	alerts('Selector comment: '+'#'+currentsId.actualAmy+' '+anomalyTagDom.comment);
	
	loadAnomalies();
	/*anomalyTagDom anomalytype : 'anomalytype',
    anomalyname: 'anomalyname',
    informativeanomaly: 'informativeanomaly',
    comment: 'comment',*/
}
function insertTagInXml(selector, tag) {
    alerts("Selector para la insersion en el xml:");
    alerts(selector);
    xmlParsed = xml.parse; //tengo un ejemplo para insertar en un xml (falta buscarlo xD)
    $(xmlParsed).find(selector).append(tag);
    //test
    $root = $(xmlParsed).find('root');
	alerts('XML de salida en prueba de metodos para imprimir el xml completo');
	//alerts($root.html());
    
    //Hay que actualizar el archivo modificado
    xmlFile = '<root>'+$root.html()+'</root>';
    //alerts('Se imprime el nuevo xml file:');
    //alerts(xmlFile);
}
function getNextIdFromLastChild(selector, group) {
    xmlParsed = xml.parse;
    $root = $(xmlParsed).find(selector);
    //alerts($root.html());
    alerts('Length Childs: '+$root.length);
    var l = $root.length,
        id;
    if(l > 0){
        id = group + uniqueId.fillZero(l);
    }else{
        id = group + '000';
    }
    alerts('New Id: '+id);
    return id;
}
function loadLinks(id, ul, evt, g, re, n) {
    var listElementsLi = new Array();

    $(ul).empty();
    xmlParsed = xml.parse;
    $root = $(xmlParsed).find('#' + re);
    $root.find(g).each(function() {
        var o = newObjectList();
        o.id = $(this).attr('id');
        if ($(this).find(n))
            o.name = $(this).find(n).text();
        if ($(this).find(load.description))
            o.description = $(this).find(load.description).text();
        listElementsLi.push(o);
        alerts('id: ' + o.id + " name: " + o.name + " desc: " + o.description);
    });
    for (var i = 0; i < listElementsLi.length; i++) {
        createLiElement(listElementsLi[i], ul, evt);
    }
    $.mobile.changePage($(id));
}
function loadLink(id, re, n, h, sht) {
    xmlParsed = xml.parse;
    $root = $(xmlParsed).find('#' + re);
    var t = $root.find(n).text();
    $(h).text(sht + t);
    $.mobile.changePage($(id));
}
function loadImages() {
    loadLinks(load.images.id,
            load.images.ulElementAppend,
            load.images.desireEvent,
            load.images.group,
            load.images.rootElement,
            load.images.name);
}
function loadImage(id) {
	if(id) currentsId.actualId = id;
	else id = currentsId.actualImg;
    showImageInformation();
    loadLink(load.image.id,
            load.image.rootElement,
            load.image.name,
            load.image.header,
            load.image.subHeaderText);
   /* alerts(load.image.id + " " +
            load.image.rootElement + " " +
            load.image.name + " " +
            load.image.header + " " +
            load.image.subHeaderText);*/
}
function loadAccount(id) {
	if(id)currentsId.actualId = id;
	else id = currentsId.actualAcc;
    loadLink(load.account.id,
            load.account.rootElement,
            load.account.name,
            load.account.header,
            load.account.subHeaderText);
    /*alerts(		load.account.id+" "+
     load.account.rootElement+" "+
     load.account.name+" "+
     load.account.header+" "+
     load.account.subHeaderText);*/
}
function loadAnomaly(id) {
    if(id) {currentsId.actualId = id;}
    else {id = currentsId.actualAmy;}
	//Limpiar la cache o mejor dicho poner los parametros en null/ ''
	clearCache.anomaly;
	showAnomalyInformation();
    loadLink(load.anomaly.id,
            load.anomaly.rootElement,
            load.anomaly.name,
            load.anomaly.header,
            load.anomaly.subHeaderText);
    /*alerts(		load.anomaly.id+" "+
     load.anomaly.rootElement+" "+
     load.anomaly.name+" "+
     load.anomaly.header+" "+
     load.anomaly.subHeaderText);*/
}
function loadAccountInformation() {
    showAccountInformation();
    loadLink(load.accountInformation.id,
            load.accountInformation.rootElement,
            load.accountInformation.name,
            load.accountInformation.header,
            load.accountInformation.subHeaderText);
}
function loadAccountMeassure() {
    showAccountMeasure();
    loadLink(load.measure.id,
            load.measure.rootElement,
            load.measure.name,
            load.measure.header,
            load.measure.subHeaderText);
}
function loadAnomalies() {
    //el id de la cuenta para el parse ya está set
    //currentsId.actualId = id;
    loadLinks(load.anomalies.id,
            load.anomalies.ulElementAppend,
            load.anomalies.desireEvent,
            load.anomalies.group,
            load.anomalies.rootElement,
            load.anomalies.name);
    /*alerts(		load.anomalies.id+" "+
     load.anomalies.ulElementAppend+" "+
     load.anomalies.desireEvent+" "+
     load.anomalies.group+" "+
     load.anomalies.rootElement+" "+
     load.anomalies.name);*/
}
function loadRoutes() {
    loadLinks(load.routes.id,
            load.routes.ulElementAppend,
            load.routes.desireEvent,
            load.routes.group,
            load.routes.rootElement,
            load.routes.name);
}
function loadAccounts(id) {
    currentsId.actualId = id;
    alerts(currentsId.actualR);
    loadLinks(load.accounts.id,
            load.accounts.ulElementAppend,
            load.accounts.desireEvent,
            load.accounts.group,
            load.accounts.rootElement,
            load.accounts.name);
    alerts(	load.accounts.id+
     load.accounts.ulElementAppend+
     load.accounts.desireEvent+
     load.accounts.group+
     load.accounts.rootElement+
     load.accounts.name);
}
function createLiElement(o,id,evt){
    var li = document.createElement('li');
    var a = document.createElement('a');
    var aT = document.createTextNode(o.name);
    a.setAttribute('href','#');
    a.setAttribute('onclick','javascript:'+evt+'('+'\''+ o.id +'\''+')');
    a.appendChild(aT);
    li.appendChild(a);
    $(id).append(li);
}
function none(){}
function alerts(v){
    //alert(v);
    console.log(v);
}
var clearCache = {
	get anomaly(){
		$('#'+anomalyTagDom.anomalyname).val('');
		$('#'+anomalyTagDom.comment).val('');
		$('#'+anomalyTagDom.anomalytype).val(0);
	},
	get image(){
		$('#' + imageTagDom.imagename).val('');
		$('#' + imageTagDom.latitude).val('');
		$('#' + imageTagDom.longitude).val('');
		$('#' + imageTagDom.date).val('');
	}
};
var xmlFile = '';/*
"<root>"+
"<Routes id='root'>"+
    "<route id='rou001'>"+
        "<routename>Name R1</routename>"+
        "<description>Description 1</description>"+
        "<account id='rou001acc001'>"+
            "<accountname>acc1</accountname>"+
            "<information>"+
                "<number>cuenta 01</number>"+
                "<accounttype>cuenta de gas</accounttype>"+
                "<street>tulipan</street>"+
                "<exthousenumber>437</exthousenumber>"+
                "<inthousenumber>987</inthousenumber>"+
                "<numbermeasure>128647</numbermeasure>"+
            "</information>"+
            "<meausure>"+
                "<lecture>1111111111111111111111111</lecture>"+
                "<measuretaken>222222222222222222</measuretaken>"+
            "</meausure>"+
            "<anomalies>"+
                "<anomaly id='rou001acc001amy001'>"+
                    "<anomalyname>amy01</anomalyname>"+
                    "<anomalytype>1</anomalytype>"+
                    "<informativeanomaly>anomalia informativa 1</informativeanomaly>"+
                    "<comment>comentario demo</comment>"+
                    "<images>"+
                        "<image id='rou001acc001amy001img001'>"+
                            "<imagename>imagen 1</imagename>"+
                            "<latitude>66</latitude>"+
                            "<longitude>96</longitude>"+
                            "<date>hoy</date>"+
                        "</image>"+
			"<image id='rou001acc001amy001img002'>"+
                            "<imagename>imagen 2</imagename>"+
                            "<latitude>67</latitude>"+
                            "<longitude>97</longitude>"+
                            "<date>hoy</date>"+
                        "</image>"+
                    "</images>"+
                "</anomaly>"+
		"<anomaly id='rou001acc001amy002'>"+
                    "<anomalyname>amy02</anomalyname>"+
                    "<anomalytype>2</anomalytype>"+
                    "<informativeanomaly>anomalia informativa 1</informativeanomaly>"+
                    "<comment>comentario demo</comment>"+
                    "<images>"+
                        "<image id='rou001acc001amy002img001'>"+
                            "<imagename>imagen 2</imagename>"+
                            "<latitude>68</latitude>"+
                            "<longitude>98</longitude>"+
                            "<date>hoy</date>"+
                        "</image>"+
                    "</images>"+
                "</anomaly>"+
            "</anomalies>"+
        "</account>"+
        "<account id='rou001acc002'>"+
			"<accountname>acc2</accountname>"+
            "<information>"+
                "<number>cuenta 02</number>"+
                "<accounttype>cuenta de agua</accounttype>"+
                "<street>fresno</street>"+
                "<exthousenumber>444</exthousenumber>"+
                "<inthousenumber>555</inthousenumber>"+
                "<numbermeasure>666</numbermeasure>"+
            "</information>"+
            "<meausure>"+
                "<lecture>2222222222222222222222</lecture>"+
                "<measuretaken>4444</measuretaken>"+
            "</meausure>"+
            "<anomalies>"+
                "<anomaly id='rou001acc002amy001'>"+
                    "<anomalyname>amy01</anomalyname>"+
                    "<anomalytype>1</anomalytype>"+
                    "<informativeanomaly>anomalia informativa 1</informativeanomaly>"+
                    "<comment>comentario demo</comment>"+
                    "<images>"+
                        "<image id='rou001acc002amy001img001'>"+
                            "<imagename>imagen 1</imagename>"+
                            "<latitude>63</latitude>"+
                            "<longitude>93</longitude>"+
                            "<date>hoy</date>"+
                        "</image>"+
                    "</images>"+
                "</anomaly>"+
            "</anomalies>"+
        "</account>"+
    "</route>"+
"</Routes>"+
"</root>";*/

