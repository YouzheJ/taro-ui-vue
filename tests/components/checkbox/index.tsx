import Vue, { VNode } from 'vue'
import classNames from 'classnames'

const AtCheckbox = Vue.extend({
  name: 'AtCheckbox',
  props: {
    customStyle: {
      type: [Object, String],
      default: function () {
        return {}
      },
    },
    className: {
      type: [Object, String],
      default: function () {
        return {}
      },
    },
    options: {
      type: Array,
      default: function () {
        return []
      },
    },
    selectedList: {
      type: Array,
      default: function () {
        return []
      },
    },
    onChange: {
      type: Function,
      default: function () {
        return function () {}
      },
    },
  },
  methods: {
    handleClick(idx: number): void {
      const { selectedList, options } = this
      const option = options[idx]
      const { disabled, value } = option
      if (disabled) return

      const selectedSet = new Set(selectedList)
      if (!selectedSet.has(value)) {
        selectedSet.add(value)
      } else {
        selectedSet.delete(value)
      }
      this.onChange([...selectedSet])
    },
  },
  render(h): VNode {
    const { customStyle, className, options, selectedList } = this

    const rootCls = classNames('at-checkbox', className)

    return (
      <view class={rootCls} style={customStyle}>
        {options.map((option, idx) => {
          const { value, disabled, label, desc } = option
          const optionCls = classNames('at-checkbox__option', {
            'at-checkbox__option--disabled': disabled,
            'at-checkbox__option--selected': selectedList.includes(value),
          })

          return (
            <view class={optionCls} key={value} onTap={this.handleClick.bind(this, idx)}>
              <view class="at-checkbox__option-wrap">
                <view class="at-checkbox__option-cnt">
                  <view class="at-checkbox__icon-cnt">
                    <text class="at-icon at-icon-check"></text>
                  </view>
                  <view class="at-checkbox__title">{label}</view>
                </view>
                {desc && <view class="at-checkbox__desc">{desc}</view>}
              </view>
            </view>
          )
        })}
      </view>
    )
  },
})

export default AtCheckbox
