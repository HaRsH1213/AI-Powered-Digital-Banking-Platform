const  branchIfscCodes = {
  DELHI: "NOVA0001284",
  MUMBAI: "NOVA0001285",
  INDORE: "NOVA0001286"
}


const getIfscCode = (branch) => {
    return branchIfscCodes[branch]
}

module.exports = getIfscCode