export function createPatchFunction(backend){
    const { nodeOps } = backend;
    console.log("nodeOpts==>",nodeOps);
    return function patch(){

    }
}