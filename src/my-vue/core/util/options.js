
export function mergeOptions(
    parent,
    child,
){
    const options = {};
    let key
    for (key in parent) {
      mergeField(key,parent[key])
    }

    for (key in parent) {
        mergeField(key,parent[key])
      }

    function mergeField(key,value){
        options[key] = value;
    }
}