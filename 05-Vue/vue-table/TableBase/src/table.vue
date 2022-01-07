<template>
  <div
    class="el-table"
    :class="[
      {
        'el-table--fit': fit,
        'el-table--striped': stripe,
        'el-table--border': border || isGroup,
        'el-table--hidden': isHidden,
        'el-table--group': isGroup,
        'el-table--fluid-height': maxHeight,
        'el-table--scrollable-x': layout.scrollX,
        'el-table--scrollable-y': layout.scrollY,
        'el-table--enable-row-hover': !store.states.isComplex,
        'el-table--enable-row-transition':
          (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
      },
      tableSize ? `el-table--${tableSize}` : ''
    ]"
    @mouseleave="handleMouseLeave($event)"
  >
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__header-wrapper"
      ref="headerWrapper"
      :style="{ marginBottom: isHeadertipsSlots ? `${layout.headertipsHeight}px` : '' }"
    >
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }"
      />
    </div>
    <!-- 表格 header 与 content 中间插槽 -->
    <div class="headertips-wrapper" ref="headertipsWrapper">
      <slot name="headertips"></slot>
    </div>
    <div
      class="el-table__body-wrapper"
      ref="bodyWrapper"
      :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight]"
    >
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{ width: bodyWidth }"
      />
      <div v-if="!data || data.length === 0" class="el-table__empty-block" ref="emptyBlock" :style="emptyBlockStyle">
        <span class="el-table__empty-text">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <div v-if="$slots.append" class="el-table__append-wrapper" ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__footer-wrapper"
      ref="footerWrapper"
    >
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }"
      />
    </div>
    <div
      v-if="fixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed"
      ref="fixedWrapper"
      :style="[
        {
          width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
        },
        fixedHeight
      ]"
    >
      <div v-if="showHeader" class="el-table__fixed-header-wrapper" ref="fixedHeaderWrapper">
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{ width: bodyWidth }"
        />
      </div>
      <div class="el-table__fixed-body-wrapper 123" ref="fixedBodyWrapper" :style="tableFixedStyle">
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{ width: bodyWidth }"
        />
        <div v-if="$slots.append" class="el-table__append-gutter" :style="{ height: layout.appendHeight + 'px' }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="fixedFooterWrapper"
      >
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText"
          :summary-method="summaryMethod"
          :store="store"
          :style="{ width: bodyWidth }"
        />
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed-right"
      ref="rightFixedWrapper"
      :style="[
        {
          width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
          right: layout.scrollY ? (border ? layout.gutterWidth : layout.gutterWidth || 0) + 'px' : ''
        },
        fixedHeight
      ]"
    >
      <div v-if="showHeader" class="el-table__fixed-header-wrapper" ref="rightFixedHeaderWrapper">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{ width: bodyWidth }"
        />
      </div>
      <div class="el-table__fixed-body-wrapper 456" ref="rightFixedBodyWrapper" :style="tableFixedStyle">
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{ width: bodyWidth }"
        />
        <div v-if="$slots.append" class="el-table__append-gutter" :style="{ height: layout.appendHeight + 'px' }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="rightFixedFooterWrapper"
      >
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText"
          :summary-method="summaryMethod"
          :store="store"
          :style="{ width: bodyWidth }"
        />
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      class="el-table__fixed-right-patch"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"
    ></div>
    <div class="el-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script>
import { debounce, throttle } from 'throttle-debounce';
import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event';
import Mousewheel from 'element-ui/lib/directives/mousewheel';
import { createStore, mapStates } from './store/helper';
import TableLayout from './table-layout';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
import { parseHeight } from './util';

let tableIdSeed = 1;

export default {
  name: 'ElTable',

  directives: {
    Mousewheel
  },

  props: {
    // 显示的数据
    data: {
      type: Array,
      default: () => []
    },

    // Table 的尺寸
    size: String,

    // 对应列的宽度
    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    // 是否在表尾显示合计行
    showSummary: Boolean,

    sumText: {
      type: String,
      default: '合计'
    },

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: {
      type: String,
      default: '暂无数据'
    },

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    // 展示树形数据时，树节点的缩进
    indent: {
      type: Number,
      default: 16
    },

    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },

    // 是否懒加载子节点数据
    lazy: Boolean,

    // 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: Function
  },

  data() {
    const { hasChildren = 'hasChildren', children = 'children' } = this.treeProps;
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children
    });
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      layout,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left'
    };
  },

  components: {
    TableHeader,
    TableFooter,
    TableBody
  },

  computed: {
    // 是否存在中间插槽
    isHeadertipsSlots() {
      return !!this.$slots.headertips;
    },

    tableFixedStyle() {
      const {
        layout: { headerHeight, headertipsHeight },
        fixedBodyHeight
      } = this;

      return [{ top: headerHeight + headertipsHeight + 'px' }, fixedBodyHeight];
    },

    tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },

    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },

    shouldUpdateHeight() {
      return this.height || this.maxHeight || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0 || this.isHeadertipsSlots;
    },

    bodyWidth() {
      const {
        layout: { bodyWidth, scrollY, gutterWidth }
      } = this;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },

    bodyHeight() {
      const {
        layout: { headerHeight = 0, bodyHeight, footerHeight = 0, headertipsHeight },
        height,
        maxHeight,
        showHeader,
        isHeadertipsSlots
      } = this;

      if (height) {
        if (isHeadertipsSlots) {
          return { height: bodyHeight ? `${bodyHeight - headertipsHeight}px` : '' };
        }
        return { height: bodyHeight ? `${bodyHeight}px` : '' };
      } else if (maxHeight) {
        const _maxHeight = parseHeight(maxHeight);
        if (typeof _maxHeight === 'number') {
          return { 'max-height': `${_maxHeight - footerHeight - (showHeader ? headerHeight : 0)}px` };
        }
      }
      return {};
    },

    fixedBodyHeight() {
      const {
        data,
        layout: { fixedBodyHeight, headertipsHeight, scrollX, gutterWidth, headerHeight, footerHeight },
        height,
        maxHeight,
        showHeader,
        isHeadertipsSlots
      } = this;

      if (height) {
        return {
          height: fixedBodyHeight ? `${fixedBodyHeight - (isHeadertipsSlots ? headertipsHeight : 0)}px` : ''
        };
      } else if (maxHeight) {
        let _maxHeight = parseHeight(maxHeight);

        if (typeof _maxHeight === 'number') {
          _maxHeight = scrollX ? _maxHeight - gutterWidth : _maxHeight;
          if (showHeader) {
            _maxHeight -= headerHeight;
          }
          _maxHeight -= footerHeight;
          return { 'max-height': `${_maxHeight}px` };
        }
      }
      return {};
    },

    fixedHeight() {
      const { data, maxHeight, showSummary, layout } = this;
      const { scrollX, gutterWidth, tableHeight, viewportHeight, headertipsHeight } = layout;

      if (maxHeight) {
        if (showSummary) return { bottom: 0 };

        return { bottom: scrollX && data.length ? `${gutterWidth}px` : '' };
      } else {
        if (showSummary) return { height: tableHeight ? `${tableHeight}px` : '' };

        return { height: viewportHeight ? `${viewportHeight}px` : '' };
      }
    },

    emptyBlockStyle() {
      const {
        data,
        bodyWidth: width,
        layout: { appendHeight }
      } = this;

      if (data?.length) return null;

      let height = '100%';
      if (appendHeight) {
        height = `calc(100% - ${appendHeight}px)`;
      }

      return { width, height };
    },

    ...mapStates({
      selection: 'selection',
      columns: 'columns',
      tableData: 'data',
      fixedColumns: 'fixedColumns',
      rightFixedColumns: 'rightFixedColumns'
    })
  },

  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    currentRowKey: {
      immediate: true,
      handler(value) {
        if (!this.rowKey) return;
        this.store.setCurrentRowKey(value);
      }
    },

    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
      }
    },

    expandRowKeys: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeysAdapter(newVal);
        }
      }
    }
  },

  created() {
    this.tableId = 'el-table_' + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    // init filters
    this.store.states.columns.forEach(column => {
      if (column.filteredValue?.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;
  },

  methods: {
    getMigratingConfig() {
      return {
        events: {
          expand: 'expand is renamed to expand-change'
        }
      };
    },

    setCurrentRow(row) {
      this.store.commit('setCurrentRow', row);
    },

    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected, false);
      this.store.updateAllSelected();
    },

    toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansionAdapter(row, expanded);
    },

    clearSelection() {
      this.store.clearSelection();
    },

    clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys);
    },

    clearSort() {
      this.store.clearSort();
    },

    handleMouseLeave() {
      this.store.commit('setHoverRow', null);
      if (this.hoverState) this.hoverState = null;
    },

    updateScrollY() {
      const changed = this.layout.updateScrollY();
      if (changed) {
        this.layout.notifyObservers('scrollable');
        this.layout.updateColumnsWidth();
      }
    },

    handleFixedMousewheel(event, data) {
      const bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },

    handleHeaderFooterMousewheel(event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },

    // TODO 使用 CSS transform
    syncPostion: throttle(20, function() {
      const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = this.bodyWrapper;
      const { headerWrapper, footerWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this.$refs;
      if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
      if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
      if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
      if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
      const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
      if (scrollLeft >= maxScrollLeftPosition) {
        this.scrollPosition = 'right';
      } else if (scrollLeft === 0) {
        this.scrollPosition = 'left';
      } else {
        this.scrollPosition = 'middle';
      }
    }),

    bindEvents() {
      this.bodyWrapper.addEventListener('scroll', this.syncPostion, { passive: true });
      if (this.fit) {
        addResizeListener(this.$el, this.resizeListener);
      }
    },

    unbindEvents() {
      this.bodyWrapper.removeEventListener('scroll', this.syncPostion, { passive: true });
      if (this.fit) {
        removeResizeListener(this.$el, this.resizeListener);
      }
    },

    resizeListener() {
      if (!this.$ready) return;

      let shouldUpdateLayout = false;
      const {
        $el: { offsetWidth: width, offsetHeight: height },
        resizeState: { width: oldWidth, height: oldHeight }
      } = this;

      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },

    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },

    sort(prop, order) {
      this.store.commit('sort', { prop, order });
    },

    toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    }
  },

  destroyed() {
    this.unbindEvents();
  }
};
</script>

<style lang="scss" scoped>
.headertips-wrapper {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
