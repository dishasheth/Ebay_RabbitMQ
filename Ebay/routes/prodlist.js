
exports.prodlist = function(req, res){
	/*var list=req.param("list");
	var pname=req.param("pname");
	var cost=req.param("cost");
	var a=[];
	var b=[];
	var c=[];
	a=list.split(",");
	b=pname.split(",");
	c=cost.split(",");
	console.log("a............."+a.length);
	
	for(i=0;i<a.length;i++){
		console.log(a[i]);
	}
	var json_responses={ pid:a,pname:b,cost:c };
//	res.send(json_responses);
*/  res.render('prodlist');
};