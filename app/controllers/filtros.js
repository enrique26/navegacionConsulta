var args = arguments[0] || {};

var jsonFiltros=[
{
	"id":1,
	"categoria":"hospitales",
	"sub":false
},
{
	"id":2,
	"categoria":"Doctores",
	"sub":false
},{
	"id":3,
	"categoria":"estados",
	"sub":true,
	"subcategorias":["morelos","michoacan","guadalajara","yucatan","baja california sur","baja california norte","monterrey","sonora","distrito federal"]
},{
	"id":4,
	"categoria":"servicios",
	"sub":false
},{
	"id":5,
	"categoria":"oficinas",
	"sub":false
	}
];


var data=[];
for(var i=0;i<jsonFiltros.length;i++){
	if(jsonFiltros[i].categoria!='estados'){
		var row=Ti.UI.createTableViewRow({
			height:50,
			title:jsonFiltros[i].categoria,
			id:'filtro',
			propiedad1:jsonFiltros[i].categoria
			
		});
		data.push(row);
	}
}

$.filtrosTipo.data=data;


$.filtrosTipo.addEventListener('click',function(e){
	Alloy.Globals.datosTabla=e.source.propiedad1;
	
});

///// picker estados desde json
var pickerEstados=Ti.UI.createPicker({});
var pickerColumEdo=Ti.UI.createPickerColumn();
var estadosFiltrados=jsonFiltros[2].subcategorias;

for(var i=0;i<estadosFiltrados.length;i++){
	
	var pickerEdoRow=Ti.UI.createPickerRow({
	title:estadosFiltrados[i],
	});
	pickerColumEdo.addRow(pickerEdoRow);
}

pickerEstados.add([pickerColumEdo]);

$.opcionesFiltros.add(pickerEstados);


pickerEstados.addEventListener('change',function(e){
	Ti.API.info(''+JSON.stringify(e));
	if(e.selectedValue!='estados'){
	Alloy.Globals.datosPicker=(e.selectedValue).toString();
	}
});
