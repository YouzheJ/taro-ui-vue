const path = require('path')
const fs = require('fs')

const COMPONENTS_LIST = [
  'Input',
  'Textarea',
  'Switch',
  'Slider',
  'Text',
  'Picker',
  'Image',
  'Icon',
  'ScrollView',
  'scroll-view',
]

const kebabCase = (v) =>
  v
    .replace(/([A-Z])/g, '-$1')
    .slice(1)
    .toLowerCase()

const BASE_PATH = path.resolve(__dirname, './src/components')

const formatter = (p) => {
  const stat = fs.lstatSync(p)
  if (stat.isDirectory()) {
    const dirs = fs.readdirSync(p)
    dirs.map((key) => {
      formatter(path.resolve(p, key))
    })
    return
  }

  if (!/\.[jt]sx$/.test(p)) {
    return
  }
  let file = fs.readFileSync(p, 'utf-8')

  file = file
    .replace(/import.+from.+@tarojs\/components.+/, (match) => {
      return ''
    })
    .replace(/onTap=/g, 'onClick=')

  COMPONENTS_LIST.forEach((key) => {
    file = file
      .replace(new RegExp(`<${key}(?![a-zA-Z0-9])`, 'g'), `<taro-${kebabCase(key)}`)
      .replace(new RegExp(`</${key}>`, 'g'), `</taro-${kebabCase(key)}>`)
  })

  fs.writeFileSync(p, file, 'utf-8')
}

formatter(BASE_PATH)
