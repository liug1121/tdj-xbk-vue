
let _homeList = []
let _schoolList = []
let _useList = []

let _homeHash = {}
let _schoolHash = {}
let _usedaddress = {}

class ResidueModel {
  add ($item) {
    switch ($item.groupId) {
      case 'home':
        _homeHash[$item.id] = $item
        _homeList.push($item)
        break
      case 'school':
        _schoolHash[$item.id] = $item
        _schoolList.push($item)
        break
      case 'usedaddress':
        _usedaddress[$item.id] = $item
        _useList.push($item)
        break
      default:
        break
    }
  }

  clear () {
    _homeList = []
    _schoolList = []
    _useList = []

    _homeHash = {}
    _schoolHash = {}
    _usedaddress = {}
  }

  get homeDataList () {
    return _homeList || []
  }

  get schoolDataList () {
    return _schoolList || []
  }

  get useDataList () {
    return _useList || []
  }
}

export default new ResidueModel()
