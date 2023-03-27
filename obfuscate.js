function obfuscate(link, x, y, z) {
  let result = ''
  let groups = []
  result = link.replace('https://discord.com/api/webhooks/','')
  for (let i of result) {
    if ("_/".includes(i)) {
      groups.push(i)
    } else {
      let el = parseInt(i,36)
      if (i.toUpperCase() == i) {
        el *= -1
      }
      el += (x-z)
      el -= (y+z)
      groups.push(el)
    }
  }
  result = groups.join(' ')
  return result
}

function unobfuscate(ob,x,y,z) {
  let result = 'https://discord.com/api/webhooks/'
  let groups = ob.split(' ')
  for (let i of groups) {
    if ("_/".includes(i)) {
      result += i
    } else {
      let el = parseInt(i) + (y+z)
      el -= (x-z)
      if (el < 0) {
        el *= -1
        result += el.toString(36).toUpperCase()
      } else {
        result += el.toString(36)
      }
    }
  }
  return result
}
