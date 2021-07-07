let _List = []
let _Hash = {}

class BuyPackgeModle {
  // constructor () { }

  update ($list) {
    $list && $list.length && $list.forEach($ele => {
      const obj = updateData($ele)
      if (!_Hash[obj.productCode]) {
        _List.push(obj)
        _Hash[obj.productCode] = obj
      }
    })
  }

  clear () {
    _List = []
    _Hash = {}
  }

  get list () {
    return _List || []
  }
}

function updateData ($obj) {
  const obj = {
    name: '',
    yPrice: 0,
    xPrice: 0,
    productClassify: '',
    productCode: '',
    productType: ''
  }
  // $obj.hasOwnProperty('name') && (obj.name = $obj.name)
  // $obj.hasOwnProperty('originalPrice') && (obj.yPrice = $obj.originalPrice)
  // $obj.hasOwnProperty('price') && (obj.xPrice = $obj.price)
  // $obj.hasOwnProperty('productClassify') && (obj.productClassify = $obj.productClassify)
  // $obj.hasOwnProperty('productCode') && (obj.productCode = $obj.productCode)
  // $obj.hasOwnProperty('productType') && (obj.productType = $obj.productType)
  return obj
}

export default new BuyPackgeModle()
