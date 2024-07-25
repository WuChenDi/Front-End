import TableBase from '@/components/TableBase/src/table.vue';
import TableBaseColumn from '@/components/TableBase/src/table-column.js';
import { debounce, throttle } from 'lodash';
// render 自定义列表
import RenderCustomColumns from './fields/RendeColumns';
import { toggleRowStatus, isSelected } from './util';
import './index.scss';

export default {
  name: 'TableBasePage',
  inheritAttrs: false,
  props: {
    ...TableBase.props,
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 字段列信息
     *  {
     *    label: '名称',
     *    prop: '字段属性',
     *    // 用来格式化内容(暂不支持，需要格式化请使用render)
     *    formatter: Function(row, column, cellValue, index),
     *    // 自定义 render 函数
     *    render: Function(h),
     *    ... Table-column Attributes
     *  }
     */
    columns: {
      type: Array,
      default: () => []
    },
    // 工具条按钮
    buttons: {
      type: Array,
      default: () => []
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    },
    // 禁止选中数量
    disabledTotal: {
      type: Number,
      default: 0
    },
    // 是否显示复选框(表格默认)
    defaultSelectable: {
      type: Boolean,
      default: false
    },
    // 自定义表格内复选框，在表格首列展示(自定义全选需求使用)
    customselectable: {
      type: Boolean,
      default: false
    },
    // 是否显示序号列
    sequence: {
      type: Boolean,
      default: false
    },
    // 行唯一值，必须且对应数据唯一值
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      // 复选框选中的行
      selectRows: [],
      // 复选框选中的行(全页全选-记录反选值)
      selectRowsInverse: [],
      // 点击行选中的当前行
      currentRow: undefined,
      // 控制 "全选条" 显示隐藏
      showHeadertips: false,
      // 是否全选(本页全选)
      isAllPageSelected: false,
      // 是否全选(全页全选)
      isAllSelected: false,
      // 仅对自定义表格内复选框的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
      selectable: null
    };
  },
  computed: {
    // 获取总条数
    getTotal() {
      const { data = [], total = 0 } = this;
      // 如果没有传入 total，则取数据长度作为总条数
      return total || data.length;
    },
    // 获取全部数据条数（排除禁止选中的）
    getAllDataNum() {
      const { getTotal, disabledTotal = 0 } = this;
      // 处理下边距情况，防止得到是小于 0
      return getTotal - disabledTotal || 0;
    }
  },
  watch: {
    data: {
      handler(newVal) {
        const { rowKey, selectRowsInverse = [], isAllSelected } = this;
        // 处理逻辑：如果当前状态为全页全选中，手动赋值复选框选中的行来进行选中状态
        if (isAllSelected) {
          let arrayArr = [];
          newVal.forEach(row => {
            if (!isSelected(selectRowsInverse, row, rowKey)) {
              arrayArr.push(row);
            }
          });
          // 如果是全页全选状态，selectRows 值只是作为 checkbox 选中的效果，没有其他作用
          this.selectRows = [].concat(arrayArr);
          // this.selectRows = this.selectRows.concat(newVal);
        }
        // 数据改变更新全选状态值（分页或者修改每页条数时）
        this.$_updateAllSelectedUtils();
      }
    },
    'selectRows.length': {
      handler() {
        this.$nextTick(this.$_handleHeadertipsChange);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {});
  },
  // 当表格所在页面存在 keepalive 时，需要在页面显示时重新布局表格
  activated() {
    this.doLayout();
  },
  methods: {
    // 渲染表格
    $_renderTable(h) {
      const { data, rowKey, $listeners, $attrs, $props } = this;

      return (
        <div class='TableBasePage__container'>
          <TableBase
            data={data}
            rowKey={rowKey}
            {...{
              on: {
                ...$listeners,
                // 当选择项发生变化时会触发该事件
                'selection-change': this.$_handleTableSelectionChange,
                // 当表格的当前行发生变化的时候会触发该事件
                'current-change': this.$_handleTableCurrentChange,
                // 当表格的排序条件发生变化的时候会触发该事件
                'sort-change': this.$_handleSortChange,
                // 当某一行被点击时会触发该事件
                'row-click': this.$_handleRowClick,
                // 当用户手动勾选数据行的 Checkbox 时触发的事件
                select: this.$_handleSelect,
                // 当用户手动勾选全选 Checkbox 时触发的事件
                'select-all': this.$_handleTableSelectAll
              },
              props: {
                ...$attrs,
                ...$props
              }
            }}
            class={[
              'TableBasePage__body',
              {
                cursorPointer: !!$listeners['row-click']
              }
            ]}
            ref='table'
          >
            {this.$_renderCheckboxTips(h)}
            {this.$_renderAllColumns(h)}
          </TableBase>
        </div>
      );
    },
    // 渲染 headertips 插槽节点内容
    $_renderCheckboxTips() {
      const {
        customselectable,
        selectRows = [],
        selectRowsInverse = [],
        isAllPageSelected,
        isAllSelected,
        getAllDataNum
      } = this;
      // 判断是否配置自定义表格内复选框
      if (!customselectable) return null;

      const _isAll = isAllSelected && selectRowsInverse.length === 0;

      const selectedText = _isAll ? '全部' : isAllPageSelected ? '本页' : '';
      const selectedLength =
        isAllSelected || selectRowsInverse.length !== 0 ? getAllDataNum - selectRowsInverse.length : selectRows.length;
      const selectCancelText = _isAll ? '取消全选' : `选择全部 ${getAllDataNum} 个客户`;

      return (
        <template slot='headertips'>
          {/* <div class='TableBasePage__tips'> */}
          <div class='TableBasePage__tips' v-show={this.showHeadertips}>
            已选{selectedText} {selectedLength} 名客户，
            <span class='select-cancel' onClick={() => this.$_toggleAllSelectionUtils(!_isAll)}>
              {selectCancelText}
            </span>
          </div>
        </template>
      );
    },
    // 获取 checkbox 列
    $_getSelectionColumn(h) {
      const { defaultSelectable } = this;
      if (!defaultSelectable) return [];

      return [<TableBaseColumn type='selection' width='50' fixed='left' />];
    },
    // 获取序号列
    $_getSequenceColumn(h) {
      const { sequence } = this;
      if (!sequence) return [];

      return [
        <TableBaseColumn
          resizable={false}
          label='序号'
          width='50'
          type='index'
          fixed='left'
          align='center'
          index={index => index + 1}
        />
      ];
    },
    // 渲染所有的表格列，包括序号列和复选框列
    $_renderAllColumns(h) {
      const { columns } = this;

      const colNodes = [...this.$_getSelectionColumn(h), ...this.$_getSequenceColumn(h)];

      colNodes.push(...this.$_renderColumns(h, columns));

      return colNodes;
    },
    // 渲染表格列
    $_renderColumns(h, columns) {
      return columns
        .filter(column => {
          const { hidden } = column;
          if (hidden !== undefined) {
            if (typeof hidden === 'function') {
              return !hidden({
                columns,
                column
              });
            }
            return !hidden;
          }
          return true;
        })
        .map((column, index) => {
          const {
            useSlot = false,
            // 自定义渲染 renderHeader
            renderHeader,
            // 自定义渲染 render 函数
            render
          } = column;
          column = {
            ...column
          };
          if (renderHeader) {
            // 自定义 render 渲染头部
            return this.$_renderCustomHeader(h, column);
          } else if (render) {
            // 自定义 render 渲染列
            return this.$_renderCustomColumns(h, column, index);
          } else if (useSlot) {
            // 使用插槽列
            return this.$_renderSlotColumn(h, column);
          } else {
            // 使用默认列
            return this.$_renderDefaultColumn(h, column, index);
          }
        });
    },
    // 自定义 render 渲染头部
    $_renderCustomHeader(h, column, index) {
      const { label, render, events = {}, prop, ...rest } = column;
      return (
        <TableBaseColumn
          label={label}
          {...{
            props: {
              ...rest,
              prop
            },
            on: {
              ...events
            },
            scopedSlots: {
              header: ({ row }) => {
                return <RenderCustomColumns row={row} render={render} index={index} />;
              }
            }
          }}
        />
      );
    },
    // 自定义 render 渲染列
    $_renderCustomColumns(h, column, index) {
      const { label, render, events = {}, prop, ...rest } = column;
      return (
        <TableBaseColumn
          label={label}
          {...{
            props: {
              ...rest,
              prop
            },
            on: {
              ...events
            },
            scopedSlots: {
              default: ({ row }) => {
                return <RenderCustomColumns row={row} render={render} index={index} />;
              }
            }
          }}
        />
      );
    },
    // 渲染插槽列
    $_renderSlotColumn(h, column) {
      const { prop, label, minWidth = '120', events = {}, align = 'left', useSlot, ...rest } = column;
      const columnScope = this.$scopedSlots.column;
      const headerScope = this.$scopedSlots.header;
      return (
        <TableBaseColumn
          prop={prop}
          label={label}
          minWidth={minWidth}
          align={align}
          showOverflowTooltip
          {...{
            scopedSlots: {
              default: scope => {
                if (columnScope) {
                  return columnScope({
                    ...scope,
                    prop,
                    cellValue: scope.row[prop]
                  });
                }

                return scope.row[prop];
              },
              header: scope => {
                if (headerScope) {
                  return headerScope({
                    ...scope,
                    label,
                    prop
                  });
                }
                return scope.column.label;
              }
            },
            props: rest,
            on: {
              ...events
            }
          }}
        />
      );
    },
    // 渲染默认列
    $_renderDefaultColumn(h, column, index) {
      const { defaultSelectable, customselectable } = this;
      const { events = {}, minWidth = '100', prop, ...rest } = column;

      // 判断复选框配置，不可两个配置项同时出现（事情有共用）
      if (defaultSelectable && customselectable) {
        throw new Error('不可同时设置默认复选框与自定义复选框');
      }

      // 这里跟 ele 有点不同，只要有配置复选框配置（默认或自定义），默认取第一项的 selectable
      if ((defaultSelectable || customselectable) && index === 0) {
        this.selectable = column.selectable;
      }

      return (
        <TableBaseColumn
          minWidth={minWidth}
          showOverflowTooltip
          {...{
            scopedSlots: {
              default: ({ row, column, $index }) => {
                // 判断首行 + 是否配置自定义表格内复选框
                if (index === 0 && customselectable) {
                  return (
                    <div class='TableBasePage__customselectable'>
                      <el-checkbox
                        value={this.$_isSelectedUtils(row)}
                        disabled={column.selectable ? !column.selectable.call(null, row, $index) : false}
                        nativeOnClick={event => {
                          event.stopPropagation();
                          this.$_columnCustomselectableUtils(row);
                        }}
                        // 当选择项发生变化时会触发该事件-自定义复选框
                        onInput={() => this.$_customRowSelectedChange(row)}
                      />
                      <span>{row[prop]}</span>
                    </div>
                  );
                }
                return row[prop];
              },
              header: ({ store }) => {
                // 判断首行 + 是否配置自定义表格内复选框
                if (index === 0 && customselectable) {
                  return (
                    <div class='TableBasePage__header__culumnsSelect'>
                      <el-checkbox
                        value={this.isAllPageSelected}
                        disabled={store.states.data?.length === 0}
                        nativeOnClick={debounce(this.$_columnHeanderCustomselectableUtils, 10)}
                      />
                      {column.label}
                    </div>
                  );
                }
                return column.label;
              }
            },
            props: rest,
            on: {
              ...events
            }
          }}
        />
      );
    },
    // 渲染工具条按钮区域
    $_renderToolbarButtons(h) {
      const { buttons, defaultSelectable } = this;
      // 工具条按钮
      let toolbarBtns = null;
      if (buttons.length > 0) {
        // console.log(buttons);
        const buttonScope = this.$scopedSlots.button;
        return this.$_renderButtons(
          h,
          buttons,
          { size: 'small' },
          buttonScope,
          [defaultSelectable ? this.selectRows : this.currentRow],
          {
            rows: defaultSelectable ? this.selectRows : this.currentRow
          }
        );
      }
      return toolbarBtns;
    },
    // 预处理操作按钮
    _preActionButtons(actions, ...args) {
      /**
       * 分析函数属性
       * @param {Function, String ,Boolean} prop 要分析的属性
       */
      const analyseFunProp = prop => {
        return typeof prop === 'function' ? prop(...args) : prop;
      };
      return actions
        .filter(({ before = true }) => {
          return analyseFunProp(before);
        })
        .map(({ click, disabled = false, children = [], ...rest }) => {
          // 特殊处理点击事件
          const onClick =
            click &&
            throttle(() => click(...args), 100, {
              trailing: false
            });
          return {
            click: onClick || (() => ({})),
            disabled: analyseFunProp(disabled),
            children: this._preActionButtons(children, ...args),
            ...rest
          };
        });
    },
    /**
     * 渲染按钮统一处理方法
     * @param {*} h
     * @param {*} buttons
     * @param {*} props
     * @param {*} slot
     * @param {*} args
     * @param {*} slotArgs
     * @returns
     */
    $_renderButtons(h, buttons, props, slot, args, slotArgs) {
      const newActions = this._preActionButtons(buttons, ...args);

      return newActions.map(btn => {
        const { click, text, children, useSlot, directives = [], ...rest } = btn;
        const hasChildren = children && children.length;
        if (useSlot) {
          if (!slot) {
            throw new Error('请添加插槽');
          }
          return slot({
            ...btn,
            ...slotArgs
          });
        }
        const button = (
          <el-button
            {...{
              props: { ...rest, ...props },
              directives
            }}
            onClick={click}
          >
            {text}
            {hasChildren ? <i class='el-icon-arrow-down el-icon--right'></i> : undefined}
          </el-button>
        );
        if (hasChildren) {
          const events = {};
          // 处理下拉事件
          const dropdownClick = command => {
            const click = events[command];
            click(...args);
          };
          return (
            <el-dropdown onCommand={dropdownClick}>
              {button}
              <el-dropdown-menu slot='dropdown'>
                {children.map(({ id, text, click, ...rest }) => {
                  if (id === undefined) {
                    throw new Error('请为按钮添加id');
                  }
                  events[id] = click;
                  return (
                    <el-dropdown-item command={id} key={id} {...{ props: rest }}>
                      {text}
                    </el-dropdown-item>
                  );
                })}
              </el-dropdown-menu>
            </el-dropdown>
          );
        } else {
          return button;
        }
      });
    },
    // 渲染工具栏
    $_renderToolbar(h) {
      const buttons = this.$_renderToolbarButtons(h);
      const toolbarSlot = this.$slots.toolbar;
      if (buttons || toolbarSlot) {
        return (
          <div class='TableBasePage__toolbar'>
            <div class='TableBasePage__buttons'>
              {buttons}
              {/** 可以将自定义内容插入工具条 */}
              {toolbarSlot}
            </div>
          </div>
        );
      }
      return null;
    },
    // 渲染分页
    $_renderPage(h) {
      const { pagination, pageSize, total, currentPage } = this;
      return pagination && total > 10 ? (
        <div class='TableBasePage__page'>
          <el-pagination
            background
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            layout='total,sizes,prev,pager,next,jumper'
            {...{
              on: {
                'size-change': this.$_handlePageSizeChange,
                'current-change': this.$_handlePageCurrentChange
              }
            }}
          />
        </div>
      ) : null;
    },
    // 表格每页条数发生变化触发
    $_handlePageSizeChange(pageSize) {
      const { total, currentPage } = this;
      this.$emit('update:pageSize', pageSize);
      // 如果总页码小于当前页码，则当前页码会变化，触发 handleCurrentChange
      if (Math.ceil(total / pageSize) >= currentPage) {
        this.$emit('page-change', { pageSize });
      }
    },
    // 表格页码发生变化触发
    $_handlePageCurrentChange(currentPage) {
      this.$emit('update:currentPage', currentPage);
      this.$emit('page-change', { currentPage });
    },
    // 当选择项发生变化时会触发该事件
    $_handleTableSelectionChange(selection) {
      this.selectRows = selection;
      this.$emit('selection-change', selection);
    },
    // 当选择项发生变化时会触发该事件-自定义复选框
    $_customRowSelectedChange(row, selected) {
      const { rowKey, selectRows = [], selectRowsInverse = [], isAllSelected, getAllDataNum } = this;
      // 判断当前是否全部全选状态来传对应处理值
      const arrayArr = isAllSelected ? selectRowsInverse : selectRows;
      const changed = toggleRowStatus(arrayArr, row, selected, rowKey);

      if (changed) {
        const newSelection = ((isAllSelected ? selectRowsInverse : selectRows) || []).slice();
        this.$emit('selection-change', newSelection);

        // 手动更新 checkbox 选中的效果
        isAllSelected && toggleRowStatus(selectRows, row, selected, rowKey);
      }

      // const changed = toggleRowStatus(selectRows, row, selected, rowKey);
      // if (changed) {
      //   const newSelection = (selectRows || []).slice();
      //   this.$emit('selection-change', newSelection);
      // }

      // 更新全选状态值
      this.$_updateAllSelectedUtils(!this.isAllSelected);
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    $_handleSelect(selection, row) {
      this.setCurrentRow(row);
      this.$emit('select', selection, row);
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    $_handleTableSelectAll(selection) {
      this.$emit('select-all', selection);
    },
    // 当某一行被点击时会触发该事件
    $_handleRowClick(row, column, event) {
      // 用于多选表格，清空用户的选择
      // this.$refs.table.clearSelection();
      // 行点击时 只能选中一行
      // this.toggleRowSelection(row, true);
      this.$emit('row-click', row, column, event);
    },
    // 表格的当前行发生变化的时候会触发该事件
    $_handleTableCurrentChange(newRow, oldRow) {
      this.currentRow = newRow;

      this.$emit('current-change', newRow, oldRow);
    },
    // 排序
    $_handleSortChange({ prop, order }) {
      if (order) {
        this.$emit('sort-change', {
          propName: prop,
          asc: order === 'ascending'
        });
      } else {
        this.$emit('sort-change', {});
      }
    },
    // 获取复选框选中的行
    getSelectionRows() {
      const { selectRows = [], selectRowsInverse = [], isAllSelected, getAllDataNum } = this;
      const selectedLength =
        isAllSelected || selectRowsInverse.length !== 0 ? getAllDataNum - selectRowsInverse.length : selectRows.length;

      return {
        // 是否全页全选状态
        isSelectAll: isAllSelected,
        // 选中数据，如果是全页全选状态，这里值应该是反选list数据，反之亦然
        list: isAllSelected ? selectRowsInverse : selectRows,
        // 选中数量
        selectNum: isAllSelected ? selectedLength : selectRows.length
      };
    },
    // 获取单选选中的行
    getCurrentRow() {
      return this.currentRow;
    },
    // 设置当前选中的行
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },
    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    toggleRowSelection(row, select) {
      this.$refs.table.toggleRowSelection(row, select);
    },
    // 重新布局表格
    doLayout() {
      this.$refs.table.doLayout();
    },
    // 更新 headertips 插槽内状态
    $_handleHeadertipsChange() {
      const { customselectable, selectRows = [], selectRowsInverse = [], isAllSelected, getAllDataNum } = this;
      // 判断是否配置自定义表格内复选框
      if (!customselectable) return null;

      const selectedLength =
        isAllSelected || selectRowsInverse.length !== 0 ? getAllDataNum - selectRowsInverse.length : selectRows.length;

      this.showHeadertips = selectedLength >= 2;
      // 重新绘制表格，确保节点插入绘制成功样式正确
      this.$nextTick(this.doLayout);
    },

    // 用来判断是否选中-自定义复选框
    $_isSelectedUtils(row) {
      const { rowKey, selectRows = [] } = this;

      return isSelected(selectRows, row, rowKey);
      // return selectRows.indexOf(row) > -1;
    },
    // 首行 + 配置自定义表格内复选框 提供 事件触发通知
    $_columnCustomselectableUtils: debounce(function(row) {
      this.$emit('checkbox-click', row);
    }, 10),
    // 自定义渲染 header 点击事件，主要是为了区分事件类型
    $_columnHeanderCustomselectableUtils() {
      const { data = [], selectRowsInverse = [], isAllSelected, getAllDataNum } = this;
      const isAllNumState = isAllSelected && selectRowsInverse.length === 0;
      // 判断当前页是否等于选择项，区分全部全选事件与当前页全选事件调用
      const isAllClickState = data.length !== getAllDataNum;

      isAllClickState ? this.$_toggleAllPageSelectionUtils('allpage') : this.$_toggleAllSelectionUtils(!isAllNumState);
    },

    /**
     * 点击全选事件-自定义复选框(当前页全选)
     *
     * @param {string} type all:表示全部页全选触发事件，需要全部勾选; allpage:标识当前页勾选
     */
    $_toggleAllPageSelectionUtils: debounce(function(type) {
      const {
        data = [],
        rowKey,
        selectRows = [],
        selectRowsInverse = [],
        isAllPageSelected,
        isAllSelected,
        selectable,
        getAllDataNum
      } = this;

      // 当只有部分行被选中(而不是全部)时，应选中所有行
      const value = type === 'all' ? true : !!(!isAllPageSelected || !selectRows.length);
      // 当只有部分行被选中(而不是全部)时，选择或取消所有行
      // const value = !(isAllPageSelected || selectRows.length);
      this.isAllPageSelected = value;

      let selectionChanged = false;
      data.forEach((row, index) => {
        if (selectable) {
          // eslint-disable-next-line no-useless-call
          if (selectable.call(null, row, index) && toggleRowStatus(selectRows, row, value, rowKey)) {
            selectionChanged = true;
          }
        } else {
          if (toggleRowStatus(selectRows, row, value, rowKey)) {
            selectionChanged = true;
          }
        }
        // 判断当前是否全部全选状态来传对应处理值
        // 全部全选，需要维护 "selectRowsInverse" 数据
        isAllSelected && toggleRowStatus(selectRowsInverse, row, !value, rowKey);
      });

      // if (type === 'allpage' && selectRowsInverse.length) {
      //   // 如果选中条数等于数据条数，也就是全页全等，但需要排除 0 的情况
      //   this.isAllSelected = selectRows.length !== 0 ? selectRows.length === getAllDataNum : false;
      // }
      // 如果是全部页全选触发，需要清空反选数组数据
      // 如果状态不是全部页全选，也需要清空反选数组数据，避免得到数据不是最新值
      if (type === 'all' || !this.isAllSelected) {
        this.selectRowsInverse = [];
      }

      if (selectionChanged) {
        // 当选择项发生变化时会触发该事件
        this.$emit('selectRows-change', selectRows ? selectRows.slice() : []);
      }
      // 当用户手动勾选全选 Checkbox 时触发的事件
      this.$emit('select-all', selectRows);
    }, 10),

    // 点击全选事件-自定义复选框(全部页全选)
    $_toggleAllSelectionUtils(state) {
      // 更改当前页状态
      if (state) {
        this.$_toggleAllPageSelectionUtils('all');
      } else {
        this.restoreData();
        // 如果点击取消全选，清空存储数据值
        this.selectRows = [];
        this.selectRowsInverse = [];
        this.isAllPageSelected = false;
      }
      this.$nextTick(() => {
        this.isAllSelected = state;
      });
    },
    /**
     * 更新全选状态值-自定义复选框
     *
     * @param {boolean} state
     * @returns
     */
    $_updateAllSelectedUtils(state = false) {
      const { data = [], rowKey, selectRows = [], selectable, getAllDataNum } = this;
      const { length } = data;
      if (length === 0) {
        this.isAllPageSelected = false;
        return;
      }

      let isAllPageSelected = true;
      let selectedCount = 0;
      for (let i = 0; i < length; i++) {
        const item = data[i];
        // eslint-disable-next-line no-useless-call
        const isRowSelectable = selectable?.call(null, item, i);
        if (!isSelected(selectRows, item, rowKey)) {
          if (!selectable || isRowSelectable) {
            isAllPageSelected = false;
            break;
          }
        } else {
          selectedCount++;
        }
      }

      if (selectedCount === 0) isAllPageSelected = false;
      this.isAllPageSelected = isAllPageSelected;

      // 性能提升: 根据标识处理：如果为 false 不需要手动更新状态
      if (state) {
        // 如果选中条数等于数据条数，也就是全页全等，但需要排除 0 的情况
        this.isAllSelected = selectRows.length !== 0 ? selectRows.length === getAllDataNum : false;
      }

      // this.isAllSelected = selectRows.length === getAllDataNum;
      if (!this.isAllSelected) {
        this.selectRowsInverse = [];
      }
    },
    // 还原初始数据 - 置空操作处理
    restoreData() {
      // 复选框选中的行
      this.selectRows = [];
      // 复选框选中的行(全页全选-记录反选值)
      this.selectRowsInverse = [];
      // 点击行选中的当前行
      this.currentRow = undefined;
      // 控制 "全选条" 显示隐藏
      this.showHeadertips = false;
      // 是否全选(本页全选)
      this.isAllPageSelected = false;
      // 是否全选(全页全选)
      this.isAllSelected = false;
    }
  },

  render(h) {
    const toolbar = this.$_renderToolbar(h);
    const table = this.$_renderTable(h);
    const page = this.$_renderPage(h);

    return (
      <div class='TableBasePage'>
        {toolbar}
        {table}
        {page}
      </div>
    );
  }
};
