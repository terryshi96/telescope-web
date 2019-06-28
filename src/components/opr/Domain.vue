<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Monitoring</a-breadcrumb-item>
          <a-breadcrumb-item>SSL Expiration</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="content">
              <a-table :columns="columns"
                :rowKey="record => record.id"
                :dataSource="items"
                :pagination="pagination"
                :loading="loading"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                @change="handleTableChange"
              >
              </a-table>
              <!-- <a-button @click="newDomain" type="primary" icon="plus">New Domain</a-button>&nbsp;
              <a-button @click="deleteSelected" type="primary" icon="minus" :disabled="!hasSelected" >Delete Selected</a-button>&nbsp;
              <a-button @click="refreshAll" type="primary" icon="sync">Refresh All</a-button>&nbsp; -->

        </div>
      </a-layout-content>
</template>

<script>
import { Layout, Breadcrumb, Table, Button } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'

const columns = [
  {
    title: 'Domain Name',
    dataIndex: 'url'
  },
  {
    title: 'Remaining Days',
    dataIndex: 'remained_days'
  },
  {
    title: 'Expiration Date',
    dataIndex: 'expire_date'
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated_at'
  },
  {
    title: 'Notification',
    dataIndex: 'receiver_group_id'
  }

]

export default {
  components: {
    'a-layout-content': Layout.Content,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-table': Table,
    'a-button': Button
  },

  data () {
    return {
      columns,
      selectedRowKeys: []
    }
  },

  computed: {
    ...mapState('global', [
      'loading'
    ]),
    ...mapState('domain', [
      'items',
      'pagination'
    ]),
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },

  methods: {
    ...mapActions('domain', [
      'getDomains',
      'handleTableChange'
    ]),
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  },

  mounted () {
    this.getDomains()
  }
}
</script>
