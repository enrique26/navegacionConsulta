var args = arguments[0] || {};

var data=[];
for(var i=0;i<3;i++){
	var row=Ti.UI.createTableViewRow({
		height:60,
		title:'categoria n'+(i+1),
		id:'filtro',
		propiedad1:'nueva categoria '+(i+1)
		
	});
	data.push(row);
}

$.filtrosTipo.data=data;


$.filtrosTipo.addEventListener('click',function(e){
	Alloy.Globals.datosTabla=e.source.propiedad1;
});



$.estadosPick.addEventListener('change',function(e){
	Ti.API.info(''+JSON.stringify(e));
	if(e.selectedValue!='estados'){
	Alloy.Globals.datosPicker=(e.selectedValue).toString();
	}
});
