
function createDataBase(){

	var db = Ti.Database.open('aseguradora');
	db.execute('PRAGMA encoding = "UTF-8"');
	db.execute('CREATE TABLE IF NOT EXISTS directorio(id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT,nombre TEXT, direccion TEXT, estado TEXT, latitude DOUBLE, longitude DOUBLE);');
	db.close();
	Ti.API.info('se creo la base de datos');
		
}

exports.creacion=function(){
	createDataBase();
};

	
exports.cargarBase=function(categoria,nombre,direccion,estado,latitude,longitude){

	//esto se ejecutara en el cliente	
					
					var cateD=(categoria).toLowerCase();
					var nombreD=(nombre).toLowerCase();
					var direccD=(direccion).toLowerCase();
					var estadoD=(estado).toLowerCase();
					var latD=latitude;
					var longD=longitude;

					var db = Ti.Database.open('aseguradora');
					db.execute('PRAGMA encoding = "UTF-8"');
					db.execute('INSERT INTO directorio(categoria,nombre,direccion,estado,latitude,longitude) VALUES(?,?,?,?,?,?)',cateD,nombreD,direccD,estadoD,latD,longD);
					Ti.API.info('se añadio un registro');
					db.close();
};


exports.countCategoria=function(){
	var db = Ti.Database.open('aseguradora');
	var row = db.execute('SELECT * FROM directorio');
	var count = row.rowCount;
	row.close();
	db.close();
	return count;
};

exports.countCategoria2=function(){
	var data=[];
	var db = Ti.Database.open('aseguradora');
	var result = db.execute('SELECT * FROM directorio');
	var count = result.rowCount;
	while(result.isValidRow()) {
		data.push({
			categoriaD:result.fieldByName('categoria'),
			nombreD:result.fieldByName('nombre'),
			especieM:result.fieldByName('direccion'),
			estadoD:result.fieldByName('estado'),
			latitudeD:result.fieldByName('latitude'),
			longitudeD:result.fieldByName('longitude')
		});
		result.next();
	}
	result.close();
	db.close();
	return data;
};


function addCategorias(){

	if (Ti.Network.online) {


		var data = {
			'UID':'listaCategorias',
			 	
			
		};
		var clienteCategorias = Ti.Network.createHTTPClient({
			onload: function(e){
				var result = JSON.parse(this.responseData);
				Ti.API.info(result);

				// alert(result.length);
				// alert()

				for (var i = 0; i < result.length; i++) {
					var id = result[i].id;
					var nombreP=result[i].nombreP;
					var descripcion1= result[i].descripcio1;
					var descripcion2= result[i].descripcion2;
					var descripcion3= result[i].descripcion3;
					var imagen = result[i].imagen;
					var video = result[i].video;

					var db = Ti.Database.open('eventosMascota');
					db.execute('PRAGMA encoding = "UTF-8"');
					db.execute('INSERT INTO mascotas(id, nombreP, imagen, video, descripcion1,descripcion2,descripcion3) VALUES(?,?,?,?,?,?,?)', id, nombreP, imagen, video, descripcion1,descripcion2,descripcion3);
					db.close();

					Ti.API.info(countCategoria());

				};


			},
			onerror: function(e){
				alert(e.error);
			},
			timeout:5000,
		});

		clienteCategorias.open('POST', Alloy.Globals.urlBase);
		clienteCategorias.send(data);


	}else{
		alert('sin internet');
	}

}

exports.filtrarLugares = function(type,type3){
	var data=[];
	var db = Ti.Database.open('aseguradora');
	db.execute('PRAGMA encoding = "UTF-8"');
	var result = db.execute("SELECT * FROM directorio WHERE categoria LIKE \'%" + type + "%\' AND ( estado LIKE \'%" + type3 + "%\') ");
	while(result.isValidRow()) {
		data.push({
			categoriaD:result.fieldByName('categoria'),
			nombreD:result.fieldByName('nombre'),
			especieM:result.fieldByName('direccion'),
			estadoD:result.fieldByName('estado'),
			latitudeD:result.fieldByName('latitude'),
			longitudeD:result.fieldByName('longitude')
		});
		result.next();
	}
	result.close();
	db.close();
	return data;
};


exports.borrarEventoId=function(idE){
	var db=Ti.Database.open('misMascotas');
	db.execute('PRAGMA encoding = "UTF-8"');
	var result=db.execute('DELETE FROM eventos WHERE idEvento="'+idE+'"');
	db.close();
	
};
exports.borrarMascotaId=function(idM){
	var db=Ti.Database.open('misMascotas');
	db.execute('PRAGMA encoding = "UTF-8"');
	var result=db.execute('DELETE FROM mascotas WHERE idMascota='+idM);
	result=db.execute('DELETE FROM eventos WHERE idMascota='+idM);
	db.close();
	
};

exports.borrado=function() {
	var db = Ti.Database.open('aseguradora');
	db.execute('DROP TABLE IF EXISTS directorio');
	db.close();
	// Ti.API.info('Todos los registros borrados');
};

/////////

exports.productos = function(type){
	var data = [];
	var db = Ti.Database.open('misMascotas');
	db.execute('PRAGMA encoding = "UTF-8"');
	var result = db.execute("SELECT * FROM eventos WHERE nombreP LIKE \'%" + type + "%\' ");
	while(result.isValidRow()) {
		data.push({
			//id:result.fieldByName('id'),
			id:result.fieldByName('id'),
			nombreP:result.fieldByName('nombreP'),
			imagen:result.fieldByName('imagen'),
			video:result.fieldByName('video'),
			descripcion1:result.fieldByName('descripcion1'),
			descripcion2:result.fieldByName('descripcion2'),
			descripcion3:result.fieldByName('descripcion3'),
		});
		result.next();
	}
	result.close();
	db.close();
	return data;
};

exports.addAll = function(){
	addCategorias();
};

// addCategorias();
// alert(countCategoria())


