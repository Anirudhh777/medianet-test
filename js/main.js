$( document ).ready(function() {
	var connection = new WebSocket("ws://stocks.mnet.website", "JSON");
	var stocks = new Object();
	connection.onmessage = function (e) {
		var data = JSON.parse(e.data);
		$.each(data, function( index, value ) {
			var name = value[0];
			var price = value[1];
			if(stocks.hasOwnProperty(name)){
				stocks[name].push(price);
				if(stocks[name][stocks[name].length-1] > stocks[name][stocks[name].length-2]){
					$("."+name+" .stockname").html(name);
					$("."+name+" .stockprice").html(price).css("color", "green");
				}else{
					$("."+name+" .stockname").html(name);
					$("."+name+" .stockprice").html(price).css("color", "red");
				}
			}else{
				stocks[name] = [0, price];
				$(".ticker").append(
					      "<tr class="+ name +">" +
					        "<td class='stockname'>"+ name +"</td>" +
					        "<td class='stockprice'>"+ price +"</td>" +
					      "</tr>"
				);
			}
		});
	};
});