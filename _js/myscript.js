// myscript for A2

$(document).ready(function(){
	//$(document).ready(function(){
$.ajax({
type: "GET", url:"sellMore.json", dataType:"json", success: displayInfo
});

});


console.log("Before function");
function displayInfo(data) {
    console.log("in function");
	var numCust=0;
	var invListNum = 0;
	var proListNum = 0;
	var i =0;
	$("#mainPCust").html(""); // Reset 
$(data.customer).each(function(index, value){ // 
	
	
	$("#mainPCust").append("<div data-role='collapsible'><h3>" +data.customer[index].compName+ 
	"</h3><p>" + "<button class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-user'>"+data.customer[index].compName+"</button>"+
	 "<button id='addr"+data.customer[index].compId+"'" +" class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location'>"+ data.customer[index].compAddr+"</button>"+
	 "<button class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-phone'>"+ data.customer[index].compContact+"</button>"+
	"<button id='mailTo" +data.customer[index].compId+"'" +" class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-mail'>"+ data.customer[index].compEmail+"</button>"
	+
	"<button class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-bars'>"+data.customer[index].invNum+"</button>"+  
	"</p></div>"
	); // END of MainPcust append
numCust++;	
i++;

	
});


//////////////////////////WORK ON INVOICES PAGE/////////////////////////////////////////////////////////////
$("#invCont").html("");
$(data.Invoice).each(function(index, value){ // 
	$(data.customer).each(function(index2, value2){
		for (var i =0; i<3; i++){
			if (data.customer[index2].invNum[i] == data.Invoice[index].invNum){
		$("#invCont").append("<div data-role='collapsible'><h3>" +data.customer[index2].compName+ 
	"</h3><p>" +"Inv #: "+data.Invoice[index].invNum+"<br>"+"Date: "+data.Invoice[index].invDate 
	+ "<br>invAmt: "+data.Invoice[index].invAmt+
	"<br>Customer Id # : "+data.Invoice[index].compId+"<br>Product(s) :"+data.Invoice[index].product[0].prodId+" &"+ data.Invoice[index].product[1].prodId+"</p></div>"
	);
	}
	
		}
	
	 // END of MainPcust append



	
});
invListNum++; // UPDATE home page number of invoices 	
}); // added after

/////////////////////END OF Inv/////////////////////////////////////////////////////////////////
////////// PRODUCT/////////////////////////////////////////////
$("#prodCont").html("");// 
$(data.Product).each(function(index, value){ // 
	
	
	$("#prodCont").append("<div data-role='collapsible'><h3>" +"Product #"+data.Product[index].prodId+ 
	"</h3><p>" +  "Product Id: "+data.Product[index].prodId + "<br> Product Desc : " +data.Product[index].prodDesc+ "<br>Product amount # : "+data.Product[index].prodAmt+
	"</p></div>"
	); // END of MainPcust append
proListNum++;	


	
});

////////////////////// END OF PRODUCT////////////////////



//////// update /////
$("#custListNum").html(numCust); // update number of customers (home page)
$("#invListNum").html(invListNum); // update # of invoices (Home page)
$("#proListNum").html(proListNum); // update # of prduct (home page)
//////////////END OF UPDATE/////////////////////////////////

// WHEN email is clicked get the one clicked
for (var k=0; k<= numCust; k++){
	$("#mailTo" +k).click(function(){
	//alert("value is : "+$("#mailTo").text());
	
        window.location.href = '#custMail';
		$("#myEmail").val($(this).text());
		
		return false;

}); //END OF 
}
  ///////////////////// MAP DISPLAY
for (var j=0; j<= numCust; j++){
	$("#addr" +j).click(function(){
	alert($(this).text());
	 window.location.href = '#geoMapPage';
        //var address = "68 bergamot ave Etobicoke ON ";
		//codeAddress($(this).text());
		//codeAddress(address);
		getCoord($(this).text());
		return false;
	})	
		

}; //END OF BUTTON address clicked
///////////////// GOOGLE API

console.log("TEST1");
//var latlng;
var clat; 
var clng;
//

function getCoord(addre){
	console.log("IN GETCOORD");
var geocoder = new google.maps.Geocoder();


geocoder.geocode({ 'address': addre }, function(results, status) {
	
    if (status == google.maps.GeocoderStatus.OK) {
	 clat =  results[0].geometry.location.lat();
	clng =  results[0].geometry.location.lng();
	console.log(clat + "  " +clng);
	
        }
   }) 
	
	var latlng=new google.maps.LatLng(clat, clng);
	console.log(" THIS IS LATLAG" +latlng);
	var mapOptions= {
		zoom: 2,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,


}
 
var map =  new google.maps.Map($("#map-canvas")[0], mapOptions);
varmyMarker= 
new google.maps.Marker({
map: map,animation: google.maps.Animation.DROP,position: latlng});
}

////////////////////////////////

	
} // end of show info



