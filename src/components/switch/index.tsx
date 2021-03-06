import { View, Switch } from '@tarojs/components'
import Vue, { VNode } from 'vue'
import classNames from 'classnames'
import { CommonEvent } from '@tarojs/components/types/common'

const AtSwitch = Vue.extend({
  name: 'AtSwitch',
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
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#6190e8',
    },
    border: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: function () {
        return function () {}
      },
    },
  },
  methods: {
    handleChange(event: CommonEvent): void {
      const { value, checked } = event.detail
      const state = typeof value === 'undefined' ? checked : value
      this.onChange && this.onChange(state)
    },
  },
  render(h): VNode {
    const { customStyle, className, disabled, border, title, checked, color } = this

    const rootCls = classNames(
      'at-switch',
      {
        'at-switch--without-border': !border,
      },
      className
    )
    const containerCls = classNames('at-switch__container', {
      'at-switch--disabled': disabled,
    })

    return (
      <View class={rootCls} style={customStyle}>
        <View class="at-switch__title">{title}</View>
        <View class={containerCls}>
          <View class="at-switch__mask"></View>
          <Switch
            class="at-switch__switch"
            checked={checked}
            color={color}
            onChange={this.handleChange}
          />
        </View>
      </View>
    )
  },
})

export default AtSwitch
