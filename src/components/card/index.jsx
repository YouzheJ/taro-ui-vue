import { View, Image } from '@tarojs/components'
import classNames from 'classnames'

export default {
  name: 'AtCard',
  props: {
    note: {
      type: String,
      default: '',
    },
    isFull: {
      type: Boolean,
      default: false,
    },
    thumb: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    icon: {
      type: Object,
      default: () => {},
    },
    onClick: {
      type: Function,
      default: () => () => {},
    },
    renderIcon: {
      type: String,
      default: '',
    },
    extraStyle: {
      type: Object,
      default: () => {},
    },
    className: {
      type: [String, Array],
      default: '',
    },
  },
  methods: {
    handleClick(args) {
      if (typeof this.onClick === 'function') {
        this.onClick(args)
      }
    },
  },
  render() {
    const { title, note, extra, extraStyle, thumb, isFull, icon, renderIcon } = this

    const rootClass = classNames(
      'at-card',
      {
        'at-card--full': isFull,
      },
      this.className
    )
    const iconClass = classNames({
      'at-icon': true,
      [`at-icon-${icon && icon.value}`]: icon && icon.value,
      'at-card__header-icon': true,
    })

    const iconStyle = {
      color: (icon && icon.color) || '',
      fontSize: (icon && `${icon.size}px`) || '',
    }

    return (
      <View onTap={this.handleClick} class={rootClass}>
        <View class="at-card__header">
          {thumb && (
            <View class="at-card__header-thumb">
              <Image class="at-card__header-thumb-info" mode="scaleToFill" src={thumb} />
            </View>
          )}
          {renderIcon || this.$slots.renderIcon || ''}
          {!thumb && icon && icon.value && <View class={iconClass} style={iconStyle}></View>}

          <View class="at-card__header-title">{title}</View>
          {extra && (
            <View style={{ ...extraStyle }} class="at-card__header-extra">
              {extra}
            </View>
          )}
        </View>
        <View class="at-card__content">
          <View class="at-card__content-info">{this.$slots.default}</View>
          {note && <View class="at-card__content-note">{note}</View>}
        </View>
      </View>
    )
  },
}
