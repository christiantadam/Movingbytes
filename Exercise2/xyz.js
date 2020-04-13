const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var warehouselist = [];
var goodslist = [];
var objWarehouse = {};
var objGoods = {};
var idwarehouse;
var namegoods;
var quantitygoods;

console.log('1. Input "create" to create new warehouse');
console.log('2. Input "insertGoods(idwarehouse,namegoods,quantitygoods)" to insert new goods');
console.log('3. Input "getGoods(idwarehouse,namegoods,quantitygoods)" to get available goods in warehouse');
console.log('3. Input "quit" to exit');

function createWarehouse(idWarehouse, capacityWarehouse){
	objWarehouse = {};
	var result = [];
	//console.log('id: ' + idWarehouse + ' capacity: ' + capacityWarehouse);
	objWarehouse['id'] = idWarehouse;
	objWarehouse['capacity'] = capacityWarehouse;
	if (warehouselist.length >0) {
		result = warehouselist.find( ({ id }) => id == objWarehouse.id);
		//console.log(result);
		if (result != undefined) {
			/*console.log('Warehouse already exists.');*/
		}
		else{
			/*console.log('id objWarehouse: ' + objWarehouse.id + ' capacity objWarehouse: ' + 
			objWarehouse.capacity);*/
			warehouselist.push(objWarehouse);
			//console.log('Total Warehouse: ' + warehouselist.length);

			for (var i = 0; i < warehouselist.length; i++) {
				//console.log('id: ' + warehouselist[i].id + ' capacity: ' + warehouselist[i].capacity);
			}
		}
		//console.log('warehouselist.find: ' + result.id + ' ' + result.capacity);	
	}
	else{
		//console.log('id objWarehouse: ' + objWarehouse.id + ' capacity objWarehouse: ' + objWarehouse.capacity);
		warehouselist.push(objWarehouse);
		//console.log('isi warehouselist: ' + warehouselist.length);

		for (var i = 0; i < warehouselist.length; i++) {
			/*console.log('id: ' + warehouselist[i].id + ' capacity: ' + warehouselist[i].capacity);*/
		}
	}
	console.log('Berhasil Membuat Gudang ID ' + objWarehouse.id + ' dengan kapasitas ' + 
		objWarehouse.capacity)
}

function insertGoods(idWarehouse, nameGoods, quantityGoods){
	//console.log('idwarehouse: ' + idWarehouse + ' namegoods: ' + nameGoods + ' quantitygoods: '+ quantityGoods);
	objGoods = {};
	objGoods['id'] = idWarehouse;
	objGoods['name'] = nameGoods;
	objGoods['quantity'] = parseInt(quantityGoods);
	var result = [];
	result = warehouselist.find( ({ id }) => id == idWarehouse);
	var resultgoods = [];
	resultgoods = goodslist.find( ({ name }) => name == nameGoods);
	//console.log(result);
	if(result !== undefined){
		//result = warehouselist.find( ({ id }) => id == idWarehouse);
		//console.log(resultgoods);
		if (resultgoods !== undefined && resultgoods.name == nameGoods){
			//console.log('item already exists! checking capacity' + result.capacity + ' < ' + objGoods.quantity)
			if(result.capacity < objGoods.quantity){
				console.log('Kapasitas gudang sudah penuh')
			}
			else{
			//resultqty = goodslist.find( ({ id }) => id == idWarehouse);
			//console.log('item is stored');
			console.log('Berhasil memasukan barang ' + nameGoods + ' ke dalam gudang ' + idWarehouse + 
				' dengan stok tersedia ' + quantityGoods);
			result.capacity = result.capacity - quantityGoods;
			resultgoods.quantity = parseInt(resultgoods.quantity) + parseInt(quantityGoods);	
		}
	}
	else{
			/*console.log('objGoods.id: ' + objGoods.id + ' objGoods.name' + objGoods.name 
			+ 'objGoods.quantity: ' + objGoods.quantity);*/
			console.log('Berhasil memasukan barang ' + nameGoods + ' ke dalam gudang ' + idWarehouse + 
				' dengan stok tersedia ' + quantityGoods);
			result.capacity = result.capacity - quantityGoods;
			goodslist.push(objGoods);
		}
			//console.log('isi goodslist: ' + goodslist.length);
		}
		else{
			console.log('Gudang tidak ditemukan.');
		}
	//console.log(warehouselist);
	//console.log(goodslist);
}

function getGoods(idWarehouse, nameGoods, quantityGoods){
	//console.log('idwarehouse: ' + idWarehouse + ' namegoods: ' + nameGoods + ' quantitygoods: '+ quantityGoods);
	objGoods = {};
	objGoods['id'] = idWarehouse;
	objGoods['name'] = nameGoods;
	objGoods['quantity'] = parseInt(quantityGoods);
	var result = [];
	result = warehouselist.find( ({ id }) => id == idWarehouse);
	var resultgoods = [];
	resultgoods = goodslist.find( ({ name }) => name == nameGoods);
	//console.log(result);
	if(result !== undefined){
		//result = warehouselist.find( ({ id }) => id == idWarehouse);
		//console.log(resultgoods);
		if (resultgoods !== undefined && resultgoods.name == nameGoods){
			//console.log('item already exists! checking capacity' + result.capacity + ' < ' + objGoods.quantity)
			if(objGoods.quantity == 0){
				//console.log('item is empty')
			}
			else{
			//resultqty = goodslist.find( ({ id }) => id == idWarehouse);
			//console.log('item is taken');
			console.log('Berhasil mengambil barang ' + nameGoods + ' dari gudang ' 
				+ idWarehouse + ' dengan jumlah ' + quantityGoods);
			result.capacity = result.capacity + quantityGoods;
			resultgoods.quantity = parseInt(resultgoods.quantity) - parseInt(quantityGoods);	
		}
	}
	else{
			/*console.log('objGoods.id: ' + objGoods.id + ' objGoods.name' + objGoods.name 
			+ 'objGoods.quantity: ' + objGoods.quantity);*/
			console.log('Barang tidak ditemukan dalam gudang ' + idWarehouse);
		}
			//console.log('isi goodslist: ' + goodslist.length);
		}
		else{
		//console.log('Warehouse does not yet exists.');
	}
	//console.log(warehouselist);
	//console.log(goodslist);

}

rl.on('line', (input)=>{
	if (input == 'create') {
		var capacitywarehouse;
		rl.question('Please insert warehouse number: ',(answer)=>{
			idwarehouse = answer;
			rl.question('Please insert warehouse capacity: ',(answer)=>{
				capacitywarehouse = answer;
				createWarehouse(idwarehouse,capacitywarehouse);
			})
		})
	}
	else if (input.includes('insert')){
		if (warehouselist.length < 1) {
			console.log('There is no warehouse.');
		}
		else{
			var answer = input.split('(');
			var paramList = answer[1].split(',');
			//console.log(paramList);
			idwarehouse = paramList[0];
			namegoods = paramList[1];
			quantitygoods = paramList[2].replace(')','');
			insertGoods(idwarehouse,namegoods,quantitygoods);
		}
	}
	else if (input.includes('get')) {
		if (warehouselist.length < 1) {
			console.log('There is no warehouse.');
		}
		else{
			var answer = input.split('(');
			var paramList = answer[1].replace(')','').split(',');
			//console.log(paramList);
			idwarehouse = paramList[0];
			namegoods = paramList[1];
			quantitygoods = parseInt(paramList[2]);
			getGoods(idwarehouse,namegoods,quantitygoods);
		}
	}
	else if (input == 'quit'){
		console.log('ByeBye :)')
		process.exit();
	}
	else{
		console.log('there is no such command.')
	}
})