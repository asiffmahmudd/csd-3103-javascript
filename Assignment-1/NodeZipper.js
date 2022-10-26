/* 
    ID: c0837117
    Name: Asif Mahmud
*/

/////////////////* LIBRARY USED */////////

//adm-zip
//source: https://www.npmjs.com/package/adm-zip

/////////////////*  */////////////////////


//importing modules
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip"); //importing library used for zipping directory

//recursive function for going through all the folders and subfolders in the given directory
function outputAllFolders(folderPaths){
    //going through all the folders in the directory
    folderPaths.forEach(folderPath => {
        //reads the contents of the directory
        const results = fs.readdirSync(folderPath);
        //only stores all the folders inside the directory and filters out the files
        const folders = results.filter(res => {
            //condition for checking if it's a folder
            if(fs.lstatSync(path.resolve(folderPath, res)).isDirectory()){
                //checking if the folder name is "node_modules"
                if(res.toLowerCase() == "node_modules"){
                    //async function for creating zipped folder
                    async function createZipArchive() {
                        //initializing the adm-zip library
                        const zip = new AdmZip();
                        //name of the output zipped folder
                        const outputFile = "node_modules.zip";
                        //path to the zipped folder
                        zip.addLocalFolder(folderPath+"\\"+res);
                        //writing the zip file into the passed path
                        zip.writeZip(folderPath+"\\"+outputFile);
                    }
                    //calling the async function for creating the zipped folder
                    createZipArchive();
                }
                else{
                    // return true if it's not "node_module" folder but a directory
                    return true;
                }
            }
        });
        // used to resolve a sequence of path-segments to an absolute path
        const innerFolderPaths = folders.map(folder => path.resolve(folderPath, folder));

        //base condition for recursive function. returns if the innerFolderPaths array's length is 0
        if(innerFolderPaths.length == 0){
            return;
        }
        //calling the function recursively
        outputAllFolders(innerFolderPaths);
    })
}

//calling the function
outputAllFolders([path.resolve(process.argv[2])]);