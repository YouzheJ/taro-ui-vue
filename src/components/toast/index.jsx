import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import statusImg from './img.json'
import mixins from '../mixins'

export default {
  name: 'AtToast',
  mixins: [mixins],
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    status: {
      type: String,
      default: '',
      validator: (val) => ['', 'error', 'loading', 'success'].includes(val),
    },
    onClick: {
      type: Function,
      default: null,
    },
    onClose: {
      type: Function,
      default: () => () => {},
    },
    className: {
      type: [Object, String],
      default: () => '',
    },
  },
  data() {
    return {
      state: {
        _timer: null,
        _isOpened: this.isOpened,
      },
    }
  },
  watch: {
    isOpened: {
      immediate: true,
      handler() {
        this.handleChange()
      },
    },
    duration() {
      this.handleChange()
    },
  },
  methods: {
    clearTimmer() {
      if (this._timer) {
        clearTimeout(this._timer)
        this._timer = null
      }
    },

    makeTimer(duration) {
      if (duration === 0) {
        return
      }
      this._timer = setTimeout(() => {
        this.close()
      }, +duration)
    },

    close() {
      const { _isOpened } = this.state
      if (_isOpened) {
        this.setState(
          {
            _isOpened: false,
          },
          this.handleClose
        )
        this.clearTimmer()
      }
    },

    handleClose(event) {
      if (typeof this.onClose === 'function') {
        this.onClose(event)
      }
    },

    handleClick(event) {
      const { onClick, status } = this
      if (status === 'loading') {
        return
      }
      if (typeof onClick == 'function') {
        return onClick(event)
      }
      this.close()
    },

    handleChange() {
      const { isOpened, duration } = this
      if (!isOpened) {
        this.close()
        return
      }

      if (!this.state._isOpened) {
        this.setState({
          _isOpened: true,
        })
      } else {
        this.clearTimmer()
      }
      this.makeTimer(duration || 0)
    },
  },
  render() {
    const { _isOpened } = this.state
    const { customStyle, text, icon, status, image, hasMask } = this

    const realImg = image || statusImg[status] || null
    const isRenderIcon = !!(icon && !(image || statusImg[status]))

    const bodyClass = classNames('toast-body', {
      'at-toast__body--custom-image': image,
      'toast-body--text': !realImg && !icon,
      [`at-toast__body--${status}`]: !!status,
    })

    const iconClass = classNames('at-icon', {
      [`at-icon-${icon}`]: icon,
    })

    return _isOpened ? (
      <View class={classNames('at-toast', this.className)}>
        {hasMask && <View class="at-toast__overlay" />}
        <View class={bodyClass} style={customStyle} onTap={this.handleClick}>
          <View class="toast-body-content">
            {realImg ? (
              <View class="toast-body-content__img">
                <Image class="toast-body-content__img-item" src={realImg} mode="scaleToFill" />
              </View>
            ) : null}
            {isRenderIcon && (
              <View class="toast-body-content__icon">
                <View class={iconClass} />
              </View>
            )}
            {text && (
              <View class="toast-body-content__info">
                <View>{text}</View>
              </View>
            )}
          </View>
        </View>
      </View>
    ) : null
  },
}
