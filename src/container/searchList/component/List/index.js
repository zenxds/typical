import React, { Component } from 'react'
import {
  message,
  Modal,
  Table,
  Icon
} from 'antd'

import styles from './less/styles.less'
import Form from './Form'
import Search from './Search'

class List extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      showModal: false,
      loading: false,

      items: [],
      pageNo: 1,
      pageSize: 10,
      itemCount: 0,

      // 当前编辑的记录的主键
      pk: null
    }
  }

  componentDidMount() {
    this.getList()
  }

  getModal() {
    const { pk } = this.state
    return (
      <Modal
        title={ pk ? '编辑' : '添加'}
        visible={true}
        footer={null}
        onCancel={() => {
          this.setState({
            showModal: false
          })
        }}
      >
        <Form {...this.props} pk={pk} onSuccess={() => {
          this.setState({
            showModal: false
          })
          this.getList()
        }} />
      </Modal>
    )
  }

  onEdit(pk) {
    this.setState({
      showModal: true,
      pk
    })
  }

  onDelete(pk) {
    const { actions } = this.props

    Modal.confirm({
      title: '确定要删除吗',
      content: '',
      onOk: () => {
        actions.deleteItem({
          id: pk
        }).then(() => {
          message.success('删除成功')
          this.getList(this.searchComponent.getValues())
        }).catch(e => {
          message.error(e + '')
        })
      },
      onCancel() {
      }
    })
  }

  getList(params={}) {
    const {
      pageNo,
      pageSize
    } = this.state

    this.setState({
      loading: true
    })

    this.props.actions.getList(Object.assign({
      pageNo,
      pageSize
    }, params)).then(data => {
      this.setState(Object.assign({
        loading: false
      }, data))
    }).catch(e => {
      message.error(e + '')
      this.setState({
        loading: false
      })
    })
  }

  getColumns() {
    return [
       {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'action',
        render: (v, record) => {
          const pk = record.id

          return (
            <div styleName="actions">
              <a onClick={this.onEdit.bind(this, pk)} title="编辑">编辑</a>
              <a onClick={this.onDelete.bind(this, pk)} title="删除">删除</a>
            </div>
          )
        }
      }
    ]
  }

  getPagination() {
    const {
      pageNo,
      pageSize,
      itemCount
    } = this.state

    const pagination = {
      current: pageNo,
      pageSize: pageSize,
      total: itemCount,
      onChange: (v) => {
        this.setState({
          pageNo: v
        }, () => {
          this.getList()
        })
      },
      showQuickJumper: true
    }
    return pagination
  }

  render() {
    return (
      <div>
        <div styleName="toolbar">
          <Search loading={this.state.loading} onSearch={params => {
            this.getList(params)
          }} wrappedComponentRef={component => {
            this.searchComponent = component
          }} />
        </div>
        {
          this.state.items.length ?
          <Table
            columns={this.getColumns()}
            dataSource={this.state.items}
            rowKey={r => r.id}
            bordered={true}
            pagination={this.getPagination()}
          /> : null
        }
        {
          this.state.showModal ? this.getModal() : null
        }
      </div>
    )
  }
}

export default List
