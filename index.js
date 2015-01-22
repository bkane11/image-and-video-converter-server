var mime = require('mime')
	// , walk = require('walk')
	, fs = require('fs')
	, path = require('path')
	;


function buildDirPath(name){
	var subdir = 'SSCO2D1_SSMH2E28'
	, searchDir
	, basedir
	;

	if(process.argv.length > 2)
		subdir = process.argv[2]
	// print process.argv
	// process.argv.forEach(function (val, index, array) {
	//   console.log(index + ': ' + val);
	// });

	dir = name || subdir; 
	
	baseDir = path.join(__dirname, 'arcims_sewer_inspection_videos', dir) ;
	return baseDir
}


// console.log('---')
	console.log('searching for images and video files in', basedir);

function searchDir(dir, imgs, videos){
	imgs = imgs || []; 
	imgs = videos || []; 
	fs.readdirSync(dir).forEach(function(item){ 
		var stats = fs.statSync(path.join(dir, item));
		if(stats.isFile()){
			if(mime.lookup(item).indexOf('image')!==-1){
				console.log(path.join(dir, item))
				return imgs.push(path.join(dir, item))
			}
			if(mime.lookup(item).indexOf('image')!==-1){
				console.log(path.join(dir, item))
				return imgs.push(path.join(dir, item))
			}
		}
		if(stats.isDirectory()){
			return searchDir(path.join(dir, item), imgs)
		}
	})
	return imgs
}


function searchForFiles
var images = lookforimgs(basedir)
console.log(images);
// var walker
// 	, options
// 	;

// options = {
//     followLinks: true
//     // directories with these keys will be skipped
//   , filters: ["Temp", "_Temp"]
// };

// walker = walk.walk("C:/Port_of_Oakland_GSMS/Development_Data/Aviation_APMS/CrackImagery", options);
// // walker = walk.walk("C:/Port of ", options);

// walker.on('file', function(root, stats, next){
// 	// fs.readFile(fileStats.name)
// 	// console.log(root, stats)
// 	if(!stats.type === 'file') return
// 	if(mime.lookup(stats.name).indexOf('image')!==-1)
// 		console.log(stats.name, path.join(root, stats.name))

// 	next();
// });

// walker.on("errors", function (root, nodeStatsArray, next) {
// 	next();
// });

// walker.on("end", function () {
// 	console.log("all done");
// });
