import { View } from '@tarojs/components'
import classNames from 'classnames'

export default {
  name: 'AtFab',
  props: {
    size: {
      type: String,
      default: 'normal',
      validator: (val) => ['normal', 'small'].includes(val),
    },
    className: {
      type: [Object, String],
      default: '',
    },
    onClick: {
      type: Function,
      default: () => () => {},
    },
  },
  methods: {
    handleTab(event) {
      this.onClick && this.onClick(event)
    },
  },
  render() {
    const { size, className } = this
    const rootClass = classNames('at-fab', className, {
      [`at-fab--${size}`]: size,
    })
    return (
      <View class={rootClass} onTap={this.handleTab}>
        {this.$slots.default}
      </View>
    )
  },
}
