import type { VNode } from 'vue';
import Vue from 'vue';

interface Params {
  row: unknown,
  index: number,
  column?: unknown
}

export default Vue.extend({
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render(h, ctx): VNode {
    const params:Params = {
      row: ctx.props.row,
      index: ctx.props.index
    };
    if (ctx.props.column) {
      params.column = ctx.props.column;
    }
    return ctx.props.render(h, params);
  }
});
