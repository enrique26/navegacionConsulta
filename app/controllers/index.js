
var db=require('lib/db');
db.borrado();
db.creacion();



var jsonDirectorio=[
{
	"id":1,
	"nombre":"jose E. G.",
	"categoria":"doctores",
	"direccion":"calle n, colonia n",
	"latitude":19.438499,
	"longitude":-99.197702,
	"estado":"morelos"
	
},{
	"id":2,
	"nombre":"Maria Romo. N.",
	"categoria":"dentisa",
	"direccion":"calle n, colonia n",
	"latitude":19.4369,
	"longitude":-99.209139,
	"estado":"distrito federal"
	
},{
	"id":3,
	"nombre":"Raul F. N.",
	"categoria":"hospitales",
	"direccion":"calle n, colonia n",
	"latitude":19.406759,
	"longitude": -99.182281,
	"estado":"distrito federal"
	
},{
	"id":4,
	"nombre":"central 45",
	"categoria":"oficinas",
	"direccion":"calle n, colonia n",
	"latitude":19.412102, 
	"longitude":-99.174556,
	"estado":"distrito federal"
	
},{
	"id":5,
	"nombre":"Clinica Mayo",
	"categoria":"hospitales",
	"direccion":"calle n, colonia n",
	"latitude":19.396437, 
	"longitude":-99.156317,
	"estado":"morelos"
	
},{
	"id":6,
	"nombre":"Beatriz G.",
	"categoria":"doctores",
	"direccion":"calle n, colonia n",
	"latitude":19.4369,
	"longitude":-99.209139,
	"estado":"morelos"
	
}

];
//cargar la base de datos
var aviso=Ti.UI.createLabel({
	text:'cargando',
	font:{
		fontSize:34,
	},
	color:'red'
});
$.v2.add(aviso);
for(x=0;x<jsonDirectorio.length;x++){
	db.cargarBase(jsonDirectorio[x].categoria,jsonDirectorio[x].nombre,jsonDirectorio[x].direccion,jsonDirectorio[x].estado,jsonDirectorio[x].latitude,jsonDirectorio[x].longitude);
};

setTimeout(function(){
	aviso.hide();
},1200);



//añadir el view de filtros 
var vistaFiltros=Alloy.createController('filtros').getView();

$.opP1.addEventListener('click',function(){
	// $.vistas.currentPage=0;
	$.buscarS.blur();
	$.vistas.add(vistaFiltros);
});

$.opP2.addEventListener('click',function(){
	// $.vistas.currentPage=1;
	$.vistas.remove(vistaFiltros);
});

$.opP3.addEventListener('click',function(){
	$.vistas.currentPage=2;
	$.buscarS.visible=true;
	$.buscarS.focus();
});

$.index.open();

///cargar listview
function cargarListview(resultados){
	
	var myTemplate = {
	//CARACTERRISTCAS DE LOS ROWS
	properties : {
		accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
		height : '68dp',
		backgroundColor : 'transparent',
		top:5,
		
	},
	childTemplates : [
	 {// Title
		type : 'Ti.UI.Label', // Use a label for the title
		bindId : 'elemento', // Maps to a custom info property of the item data
		properties : {// Sets the label properties
			color : 'gray',
			font : {
				fontFamily : 'Arial',
				fontSize : '20dp',
				fontWeight : 'bold'
			},
			left : '60dp',
			top : '10dp',

		}
	}, {// Subtitle
		type : 'Ti.UI.Label', // Use a label for the subtitle
		bindId : 'es_info', // Maps to a custom es_info property of the item data
		properties : {// Sets the label properties
			color : 'gray',
			font : {
				fontFamily : 'Arial',
				fontSize : '14dp'
			},
			left : '60dp',
			top : '32dp',
		}
	}]
};

	var secciones=[];
	for(i=0;i<1;i++){
		var header = Ti.UI.createView({
				width : '100%',
				height : '20dp',
				backgroundColor:'black'
			});
			var titulo = Ti.UI.createLabel({
				color : 'white',
				font : {
					fontSize : 22,
				},
				text : 'Area '+i,
				left:'6dp'
			});
			header.add(titulo);
			var seccionN = Ti.UI.createListSection({
				// headerTitle:'clasificacion '+i,
				// headerView : header,
			});
			var dataItems = [];
			for(x=0;x<resultados.length;x++){
				
				dataItems.push({
					
					elemento : {
						text : 'Categoria ' + resultados[x].categoriaD,
					},
					es_info : {
						text : 'Nombre:'+resultados[x].nombreD,
					},
					properties : {
						itemId : x,
						titulo : 'nuevo nivel',
						searchableText:'Especialidad '+resultados[x].categoriaD+resultados[x].nombreD,
					}
				});
				seccionN.setItems(dataItems);
			}
			secciones.push(seccionN);
	}
	
		$.listaGeneral.templates = {
			'template' : myTemplate
		};
		$.listaGeneral.defaultItemTemplate = 'template';
	
		$.listaGeneral.sections=secciones;
};


function agregarPins(Anotaciones){
	var map = require("ti.map");
	var anotaciones=[];
	 
	for (var i in Anotaciones){
		var pin=map.createAnnotation({
			latitude:Anotaciones[i].latitudeD,
			longitude:Anotaciones[i].longitudeD,
			title:Anotaciones[i].nombreD,
			leftView:{
				paused:false,
				height:40,
				autorotate:true,
				horizontalWrap:true,
				animating:false,
				duration:200,
				reverse:false,
				stopped:true,
				width:40},
			rightButton:"images/general/flecha.png",
			id:"26",
			animate:true,
			pincolor: map.ANNOTATION_GREEN
		});
	
		anotaciones.push(pin);
	}
	Ti.API.info(''+JSON.stringify(anotaciones));
	$.mapView.removeAllAnnotations();
	$.mapView.annotations=anotaciones;
}


$.index.addEventListener('click',function(e){
	if(e.source.id=='aceptaFiltro'){	
		$.cambioEti.text=Alloy.Globals.datosTabla;
		$.cambioEti2.text=Alloy.Globals.datosPicker;
		var categoriaF=Alloy.Globals.datosTabla;
		var estadoF=Alloy.Globals.datosPicker;
		var listaResult=Alloy.Globals.leerLugares((categoriaF).toString(),(estadoF).toString());
		// var listaResult=Alloy.Globals.leerTodos();
		Ti.API.info('resultados'+JSON.stringify(listaResult));
		
		
		$.vista2.currentPage=1;
		$.vistas.remove(vistaFiltros);
		if(listaResult.length==0){
			$.listaGeneral.sections=[];
			alert('no hay resultados con ese criterio de busqueda');
			Alloy.Globals.datosTabla='hospitales';
			Alloy.Globals.datosPicker='morelos';
			$.mapView.removeAllAnnotations();
		}else{
			cargarListview(listaResult);
			//centar map a el primer resultado de las respuestas
			centerMap(listaResult[0].latitudeD,listaResult[0].longitudeD);
			agregarPins(listaResult);
			
		}
	}else if(e.source.id=='cancelaFiltro'){
		$.vistas.remove(vistaFiltros);
	}
});


///seleccionat la region del mapa para los resultados
$.verMapa.addEventListener('click',function(){
	$.vista2.currentPage=0;
	// centerMap(19.438499,-99.197702);
});

$.verDirectorio.addEventListener('click',function(){
	$.vista2.currentPage=1;
});

function centerMap(lat, lng) {
	
	
	var region = {
		latitude : lat,
		longitude : lng,
		latitudeDelta : 0.05,
		longitudeDelta : 0.05
	};

	$.mapView.region = region;
};

// $.vista2.addEventListener('scrollEnd',function(){
	// centerMap(19.438499,-99.197702);
// });

