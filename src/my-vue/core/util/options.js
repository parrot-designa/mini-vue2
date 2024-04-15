import { hasOwn,camelize } from "@/my-vue/shared/util";
import { warn } from "./index";


export function mergeOptions(
    parent,
    child,
    vm
){
    const options = {};
    let key
    for (key in parent) {
      mergeField(key,parent[key])
    }

    for (key in child) {
        mergeField(key,child[key])
    }

    function mergeField(key,value){
        options[key] = value;
    }

    return options;
}

export function resolveAsset(
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    const assets = options[type]
    // check local registration variations first
    if (hasOwn(assets, id)) return assets[id]
    const camelizedId = camelize(id)
    if (hasOwn(assets, camelizedId)) return assets[camelizedId]
    const PascalCaseId = capitalize(camelizedId)
    if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
    // fallback to prototype chain
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
    if (__DEV__ && warnMissing && !res) {
      warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id)
    }
    return res
  }
  