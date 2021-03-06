import classNames from 'classnames'

export default {
  name: 'AtActionSheetBody',
  props: {
    className: {
      type: [Array, String],
      default: () => '',
    },
  },
  render() {
    const rootClass = classNames('at-action-sheet__body', this.className)
    return <view class={rootClass}>{this.$slots.default}</view>
  },
}
