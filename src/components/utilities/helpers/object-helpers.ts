export const updateObjInArray = (items: Array<any>, itemId: number,
                                 objProp: string, newObjProps: {[key: string]: any}) => {
  return items.map(item => {
    return item[objProp] === itemId ? {...item, ...newObjProps} : item
  })
}