export function updateObject<T extends Record<string,any>>(target:T, update:Record<string,any>) :T {
    for (const [key,value] of Object.entries(update)){
       if (target.hasOwnProperty(key) && typeof(value) === typeof(target[key])){
         if (['string','number','boolean'].includes(typeof value) || Array.isArray(value)){
           target[key as keyof T] = value;
         } else {
           if (typeof value === 'object'){
              target[key as keyof T] = updateObject(target[key], value)
           }
         }
       }
    }

    return target
}

