import { hasOwn,camelize,isArray } from "@/my-vue/shared/util";
import { LIFECYCLE_HOOKS } from "@/my-vue/shared/constants";
import { warn } from "./index";
import config from '../config'

const strats = config.optionMergeStrategies

/**
 * 默认的策略
 */
const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
}

export function mergeLifecycleHook(
  parentVal,
  childVal
) {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal
  return res ? dedupeHooks(res) : res
}

function dedupeHooks(hooks) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeLifecycleHook
})

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

    function mergeField(key){
      const strat = strats[key] || defaultStrat
      options[key] = strat(parent[key], child[key], vm, key);
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
  