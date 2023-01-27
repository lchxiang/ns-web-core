import type { nsProviderProps } from './NsProvider'
import type { ExtractPropTypes, ToRefs } from 'vue'
export type GlobalConfig = ExtractPropTypes<typeof nsProviderProps>
export type GlobalConfigRef = ToRefs<GlobalConfig>
export const globalConfig: GlobalConfig = {
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  dateValueFormat: 'YYYY-MM-DD HH:mm:ss',
  timeFormat: 'HH:mm:ss',
  timeValueFormat: 'HH:mm:ss',
  valueKey: 'id',
  labelKey: 'name',
  operationConfig: {
    moreText: '更多',
    show: true,
    width: 200,
    dropdownDefaultShowNum: 2,
    dropdownMaxNum: 4
  },
  gridConfig: {
    border: 'full',
    stripe: true,
    highlightHoverRow: true,
    showOverflow: 'tooltip',
    showHeaderOverflow: false,
    autoResize: true,
    resizable: false,
    pagerConfig: {
      enabled: true,
      pageSize: 10,
      border: true,
      layouts: ['PrevPage', 'JumpNumber', 'NextPage', 'Sizes', 'Total'],
      pageSizes: [10, 20, 50, 100, 500]
    },
    proxyConfig: {
      autoLoad: true,
      filter: true,
      props: {
        result: 'data.results',
        total: 'data.total'
      }
    },
    toolbarConfig: {
      slots: {
        buttons: 'toolbar_buttons',
        tools: 'toolbar_tools'
      },
      tools: [{ code: 'search', name: '', icon: 'vxe-icon-search', circle: true }],
      refresh: false,
      zoom: false,
      custom: false
    },
    rowConfig: {
      useKey: false,
      isCurrent: true
    },
    filterConfig: {
      remote: true
    },
    columnConfig: {
      minWidth: '100px',
      resizable: true,
      isHover: false,
      isCurrent: false
    }
  }
}
