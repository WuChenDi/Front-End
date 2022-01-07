<template>
  <div class='ui'>
    <h1 class='title'>组件演示</h1>
    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBase - 基础表格组件</span>
        </div>
        <TableBase :data='tableData' style='width: 100%' height='250' row-key='id'>
          <TableBaseColumn type='selection' width='55' fixed></TableBaseColumn>
          <TableBaseColumn prop='name' label='Name'></TableBaseColumn>
          <TableBaseColumn prop='amount1' label='Amount 1'></TableBaseColumn>
          <TableBaseColumn prop='amount2' label='Amount 2'></TableBaseColumn>
          <TableBaseColumn prop='amount3' label='Amount 3'></TableBaseColumn>
          <TableBaseColumn prop='name' label='Name'></TableBaseColumn>
          <TableBaseColumn prop='amount1' label='Amount 1'></TableBaseColumn>
          <TableBaseColumn prop='amount2' label='Amount 2'></TableBaseColumn>
          <TableBaseColumn prop='amount3' label='Amount 3'></TableBaseColumn>
          <TableBaseColumn prop='name' label='Name'></TableBaseColumn>
          <TableBaseColumn prop='amount1' label='Amount 1'></TableBaseColumn>
          <TableBaseColumn prop='amount2' label='Amount 2'></TableBaseColumn>
          <TableBaseColumn prop='amount3' label='Amount 3' fixed='right'></TableBaseColumn>
        </TableBase>
      </el-card>
    </section>

    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBasePage - 基础表格配置</span>
        </div>
        <TableBasePage :columns='columns' :data='data' :pagination='false' />
      </el-card>
    </section>

    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBasePage - 分页表格配置</span>
        </div>
        <TableBasePage
          v-loading='loading'
          :columns='columns'
          :data='data1'
          :current-page.sync='currentPage'
          :page-size.sync='pageSize'
          :total='total'
          @page-change='handlePageChange'
        />
      </el-card>
    </section>

    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBasePage - 添加顶部按钮配置</span>
        </div>
        <TableBasePage :columns='columns' :data='data' :buttons='buttons' :pagination='false' />
      </el-card>
    </section>

    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBasePage - 行操作按钮</span>
        </div>
        <TableBasePage :columns='columns1' :data='data' :pagination='false' />
      </el-card>
    </section>

    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBasePage - 开启表格默认复选框</span>
        </div>
        <TableBasePage :columns='columns' :data='data' :pagination='false' defaultSelectable @select='handleSelect' />
      </el-card>
    </section>

    <section>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
          <span>TableBasePage - 开启自定义复选框</span>
        </div>
        <TableBasePage :columns='columns' :data='data' :pagination='false' customselectable @select='handleSelect' />
      </el-card>
    </section>
  </div>
</template>

<script lang='ts'>
import type { CreateElement } from 'vue';
import Vue from 'vue';
import TableBasePage from '@/components/TableBasePage';
import TableBase from '@/components/TableBase/src/table.vue';
import TableBaseColumn from '@/components/TableBase/src/table-column.js';

interface ITableData {
  id: number;
  name: string;
  sex: number;
  age: number;
  amount1: string | number;
  amount2: string | number;
  amount3: number;
  amount4: number;
  amount5: number;
  amount6: number;
}

export default Vue.extend({
  name: 'demo',
  components: {
    TableBasePage,
    TableBase,
    TableBaseColumn
  },
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: 'Tom',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987123',
          name: 'Tom',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: 'Tom',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: 'Tom',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987126',
          name: 'Tom',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987127',
          name: 'Tom',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987128',
          name: 'Tom',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987129',
          name: 'Tom',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '129871210',
          name: 'Tom',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '129871211',
          name: 'Tom',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }
      ],
      // 表格的列信息, 数组每一项代表一个字段，可以使用 element 列属性的所有属性，以下仅为示例
      columns: Object.freeze([
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          renderHeader: (createElement: CreateElement, _params: any) => {
            return createElement(
              'span',
              {
                style: { color: 'red' }
              },
              '自定义头部'
            );
          },
          render: (createElement: CreateElement, { row }) => {
            return createElement(
              'span',
              {
                style: { color: 'red' }
              },
              row.sex === 1 ? '男' : '女'
            );
          }
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: 'Amount 1',
          prop: 'amount1'
        },
        {
          label: 'Amount 2',
          prop: 'amount2'
        },
        {
          label: 'Amount 3',
          prop: 'amount3'
        },
        {
          label: 'Amount 1',
          prop: 'amount1'
        },
        {
          label: 'Amount 2',
          prop: 'amount2'
        },
        {
          label: 'Amount 3',
          prop: 'amount3'
        },
        {
          label: 'Amount 4',
          prop: 'amount4',
          width: 400,
          render: (createElement: CreateElement, context: any) => {
            return createElement(
              'span',
              {
                style: { color: 'red' }
              },
              '自定义render'
            );
          }
        },
        {
          label: 'Amount 5',
          prop: 'amount5'
        },
        {
          label: 'Amount 6',
          prop: 'amount6',
          fixed: 'right'
        }
      ]),
      columns1: Object.freeze([
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          render: (createElement: CreateElement, { row }) => {
            return createElement(
              'span',
              {
                style: { color: 'red' }
              },
              row.sex === 1 ? '男' : '女'
            );
          }
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: 'Amount 1',
          prop: 'amount1'
        },
        {
          label: 'Amount 2',
          prop: 'amount2'
        },
        {
          label: 'Amount 3',
          prop: 'amount3'
        },
        {
          label: 'Amount 1',
          prop: 'amount1'
        },
        {
          label: 'Amount 2',
          prop: 'amount2'
        },
        {
          label: 'Amount 3',
          prop: 'amount3'
        },
        {
          label: 'Amount 4',
          prop: 'amount4',
          width: 400,
          render: (createElement: CreateElement, context: any) => {
            return createElement(
              'span',
              {
                style: { color: 'red' }
              },
              '自定义render'
            );
          }
        },
        {
          label: 'Amount 5',
          prop: 'amount5'
        },
        {
          label: '操作',
          prop: 'amount6',
          fixed: 'right'
        }
      ]),
      data: [
        {
          id: 1,
          name: '王小虎1',
          sex: 1,
          age: 19,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 2,
          name: '王小虎2',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 3,
          name: '王小虎3',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 4,
          name: '王小虎4',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 5,
          name: '王小虎5',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 6,
          name: '王小虎6',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 7,
          name: '王小虎7',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        },
        {
          id: 8,
          name: '王小虎8',
          sex: 1,
          age: 18,
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: 9,
          amount5: 9,
          amount6: 9
        }
      ],
      data1: [] as ITableData[],
      buttons: [
        {
          // id 必须有而且是在当前按钮数组里面是唯一的
          id: 'add',
          text: '测试1',
          type: 'primary',
          icon: 'el-icon-circle-plus',
          click: (this as any).open1
        },
        {
          id: 'delete',
          text: '测试2',
          click: (this as any).open2,
          disabled: (/** rows */) => {
            return true;
          }
        },
        {
          id: 'auth',
          text: '测试3',
          click: (this as any).open3,
          // 可以通过返回 true/false来控制按钮是否显示
          before: (/** rows */) => {
            return false;
          }
        },
        // 可以配置下拉按钮
        {
          id: 'dropdown',
          text: '测试4',
          children: [
            {
              id: 'moveUp',
              text: '上移',
              icon: 'el-icon-arrow-up',
              click: () => {
                this.$alert('上移');
              }
            },
            {
              id: 'moveDown',
              text: '下移',
              icon: 'el-icon-arrow-down',
              click: () => {
                this.$alert('下移');
              }
            }
          ]
        }
      ],
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 是否显示loading
      loading: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载表格数据
    loadData(): void {
      this.loading = true;
      setTimeout(() => {
        // 假设总条数是40条
        this.total = 40;
        const {
          currentPage,
          pageSize
        } = this;
        // 模拟数据请求获取数据
        this.data1 = new Array(pageSize).fill({}).map((item, index) => {
          return {
            id: Math.random(),
            name: `ws-FE ${currentPage + (index + 1) * 10}`,
            sex: Math.random() > 0.5 ? 1 : 0,
            age: Math.floor(Math.random() * 100),
            amount1: Math.floor(Math.random() * 100),
            amount2: Math.floor(Math.random() * 100),
            amount3: Math.floor(Math.random() * 100),
            amount4: Math.floor(Math.random() * 100),
            amount5: Math.floor(Math.random() * 100),
            amount6: Math.floor(Math.random() * 100)
          };
        });
        this.loading = false;
      }, 1000);
    },
    handlePageChange() {
      // 因为上面设置属性指定了.sync,所以这两个属性会自动变化
      console.log(this.pageSize, this.currentPage);
      // 分页发生变化，重新请求数据
      this.loadData();
    },
    handleSelect(selection: any, row: any) {
      console.log(selection, row);
    }
  }
});
</script>

<style lang="less" scoped>
.ui {
  height: 100%;
  overflow-y: auto;

  section {
    margin: 50px 20px;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
    background-color: #fff;
    margin: 0;
    color: #323233;
  }
}
</style>
