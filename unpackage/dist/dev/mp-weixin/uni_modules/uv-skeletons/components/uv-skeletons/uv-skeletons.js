"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-skeletons",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin],
  props: {
    // 是否显示骨架
    loading: {
      type: Boolean,
      default: true
    },
    // 骨架内容 具体说明参考文档：
    skeleton: {
      type: Array,
      default: () => []
    },
    // 是否开启动画效果
    animate: {
      type: Boolean,
      default: true
    },
    // 是否圆角骨架风格
    round: {
      type: Boolean,
      default: false
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.skeleton
  },
  data() {
    return {
      elements: [],
      opacity: 0.5,
      duration: 600
    };
  },
  computed: {
    animateClass() {
      return this.animate ? "uv-skeleton--animation" : "uv-skeleton--static";
    },
    roundClass() {
      return this.round ? "uv-skeleton--round" : "uv-skeleton--radius";
    },
    style(item) {
      return (item2) => {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(item2.style));
      };
    }
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 初始化数据
     */
    init() {
      let elements = [];
      if (!this.$uv.test.array(this.skeleton))
        return this.$uv.error("skeleton参数必须为数组形式，参考文档示例：");
      this.skeleton.forEach((el) => {
        const elClass = this.getElCounts(el);
        elements = elements.concat(elClass);
      });
      this.elements = [...elements];
    },
    /**
     * 处理骨架屏参数内容
     * @param {Object} el 每项数据
     */
    getElCounts(el) {
      let elements = [];
      let children = [];
      if (this.$uv.test.number(el)) {
        elements.push({
          type: "gap",
          height: el
        });
        return elements;
      } else {
        const type = el.type ? el.type : "line";
        const num = el.num ? el.num : 1;
        const style = el.style ? el.style : {};
        const styleIsArray = this.$uv.test.array(style);
        const gap = el.gap ? el.gap : "20rpx";
        const child = el.children ? el.children : [];
        for (let i = 0; i < child.length; i++) {
          children[i] = {
            clas: child[i].type.indexOf("avatar") > -1 || child[i].type.indexOf("custom") > -1 ? "" : "uv-skeleton__group__sub",
            elements: this.getElCounts(child[i])
          };
        }
        for (let i = 0; i < num; i++) {
          if (gap && i < num && i > 0) {
            elements.push({
              type: "gap",
              height: gap
            });
          }
          elements.push({
            clas: `uv-skeleton__${type}`,
            type,
            style: styleIsArray ? style[i] : style,
            gap,
            children
          });
        }
        return elements;
      }
    },
    /**
     * 创建动画
     */
    createAnimation(opacity = 1) {
      if (!this.loading || !this.animate)
        return;
      let count = 0;
      const skeletons = this.$refs.skeleton;
      skeletons.forEach((item) => {
        animation.transition(item, {
          styles: {
            opacity
          },
          duration: this.duration
        }, () => {
          count++;
          if (count >= skeletons.length) {
            setTimeout(() => {
              this.createAnimation(opacity < 1 ? 1 : this.opacity);
            }, 200);
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.loading
  }, $props.loading ? {
    b: common_vendor.f($data.elements, (item, index, i0) => {
      return common_vendor.e({
        a: item.type == "flex"
      }, item.type == "flex" ? {
        b: common_vendor.f(item.children, (item2, index2, i1) => {
          return {
            a: common_vendor.f(item2.elements, (item3, index3, i2) => {
              return common_vendor.e({
                a: item3.type == "gap"
              }, item3.type == "gap" ? {
                b: _ctx.$uv.addUnit(item3.height, "rpx")
              } : {
                c: common_vendor.n(item3.clas),
                d: common_vendor.n($options.roundClass),
                e: common_vendor.n($options.animateClass),
                f: common_vendor.s($options.style(item3))
              }, {
                g: index3
              });
            }),
            b: common_vendor.n(item2.clas),
            c: common_vendor.s($options.style(item2)),
            d: index2
          };
        }),
        c: common_vendor.s($options.style(item))
      } : item.type == "custom" ? {
        e: common_vendor.n(item.clas),
        f: common_vendor.n($options.animateClass),
        g: common_vendor.s($options.style(item))
      } : item.type == "gap" ? {
        i: _ctx.$uv.addUnit(item.height, "rpx")
      } : {
        j: common_vendor.n(item.clas),
        k: common_vendor.n($options.roundClass),
        l: common_vendor.n($options.animateClass),
        m: common_vendor.s($options.style(item))
      }, {
        d: item.type == "custom",
        h: item.type == "gap",
        n: index
      });
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cf66e016"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/uni_modules/uv-skeletons/components/uv-skeletons/uv-skeletons.vue"]]);
wx.createComponent(Component);
