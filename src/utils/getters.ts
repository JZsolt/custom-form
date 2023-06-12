export const getDataAttributes = (obj: any, key?: string) => {
  let ret = obj?.data || obj;

  if (ret.attributes && key == undefined)
    return ret.id ? { id: ret.id, ...ret.attributes } : ret.attributes;

  if (ret.attributes && key) return ret.attributes[key];

  return ret;
};

// export const getDataAttributes = (obj, first = true) => {
//   let ret = obj?.data || {};
//   if (Array.isArray(ret) && ret.length > 0)
//     first
//       ? (ret = head(ret))
//       : (ret = ret.map((e) =>
//           e.id ? { id: e.id, ...e.attributes } : e.attributes
//         ));
//   if (ret.attributes)
//     return ret.id ? { id: ret.id, ...ret.attributes } : ret.attributes;
//   return ret;
// };
