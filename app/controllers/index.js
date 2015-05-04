
var vistaFiltros=Alloy.createController('filtros').getView();

$.opP1.addEventListener('click',function(){
	// $.vistas.currentPage=0;
	
	$.vistas.add(vistaFiltros);
});

$.opP2.addEventListener('click',function(){
	// $.vistas.currentPage=1;
	$.vistas.remove(vistaFiltros);
});
// 
// $.opP3.addEventListener('click',function(){
	// $.vistas.currentPage=2;
// });

$.index.open();

$.index.addEventListener('click',function(e){
	if(e.source.id=="filtro"){
		// $.cambioEti.text=Alloy.Globals.datosTabla;
		// $.cambioEti2.text=Alloy.Globals.datosPicker;
	}else if(e.source.id=='aceptaFiltro'){
		$.cambioEti.text=Alloy.Globals.datosTabla;
		$.cambioEti2.text=Alloy.Globals.datosPicker;
		$.vistas.remove(vistaFiltros);
	}
});


