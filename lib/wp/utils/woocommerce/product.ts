import { TProductTypes, TFilterProps } from '@/wp/types'
import { CrudFilters } from '@refinedev/core'

// 無庫存下單
export const BACKORDERS = [
  { label: '不允許', value: 'no' as const },
  { label: '允許', value: 'yes' as const },
  { label: '只有缺貨時允許', value: 'notify' as const },
]

export const PRODUCT_STOCK_STATUS = [
  {
    label: '有庫存',
    value: 'instock' as const,
    color: 'blue',
  },
  {
    label: '缺貨',
    value: 'outofstock' as const,
    color: 'magenta',
  },
  {
    label: '預定',
    value: 'onbackorder' as const,
    color: 'cyan',
  },
]

export const PRODUCT_DATE_FIELDS = [
  {
    label: '商品發佈日期',
    value: 'date_created',
  },
  {
    label: '商品修改日期',
    value: 'date_modified',
  },
  {
    label: '特價開始日期',
    value: 'date_on_sale_from',
  },
  {
    label: '特價結束日期',
    value: 'date_on_sale_to',
  },
]

// 商品類型
export const PRODUCT_TYPES = [
  {
    value: 'simple' as const,
    label: '簡單商品',
    color: 'processing', // 藍色
  },
  {
    value: 'grouped' as const,
    label: '組合商品',
    color: 'orange', // 綠色
  },
  {
    value: 'external' as const,
    label: '外部商品',
    color: 'lime', // 橘色
  },
  {
    value: 'variable' as const,
    label: '可變商品',
    color: 'magenta', // 紅色
  },
  {
    value: 'variation' as const,
    label: '商品變體',
    color: 'magenta', // 紅色
  },
  {
    value: 'subscription' as const,
    label: '簡易訂閱',
    color: 'cyan', // 紫色
  },
  {
    value: 'variable-subscription' as const,
    label: '可變訂閱',
    color: 'purple', // 青色
  },
  {
    value: 'subscription_variation' as const,
    label: '訂閱變體',
    color: 'purple',
  },
]

/**
 * 判斷是否為商品變體
 */
export const getIsVariation = (productType: TProductTypes) => {
  return ['variation', 'subscription_variation'].includes(productType)
}

export const getFilterLabels = <T>(
	label = '商品',
): {
	[key in keyof T]: string
} => ({
	//@ts-ignore
	s: '關鍵字',
	sku: '貨號(sku)',
	product_category_id: `${label}分類`,
	product_tag_id: `${label}標籤`,
	product_brand_id: '品牌',
	status: `${label}狀態`,
	featured: '精選商品',
	downloadable: '可下載',
	virtual: '虛擬商品',
	sold_individually: '單獨販售',
	backorders: '允許延期交貨',
	stock_status: '庫存狀態',
	date_created: `${label}發佈日期`,
	is_course: '是否為課程商品',
	price_range: '價格範圍',
})


export const onSearch = (
	values: TFilterProps,
): CrudFilters | Promise<CrudFilters> => {
	return [
		{
			field: 's',
			operator: 'eq',
			value: values.s,
		},
		{
			field: 'sku',
			operator: 'eq',
			value: values.sku,
		},
		{
			field: 'product_category_id',
			operator: 'in',
			value: values.product_category_id,
		},
		{
			field: 'product_tag_id',
			operator: 'in',
			value: values.product_tag_id,
		},
		{
			field: 'product_brand_id',
			operator: 'in',
			value: values.product_brand_id,
		},
		{
			field: 'status',
			operator: 'in',
			value: values.status,
		},
		{
			field: 'featured',
			operator: 'eq',
			value: values.featured,
		},
		{
			field: 'is_course',
			operator: 'eq',
			value: values.is_course,
		},
		{
			field: 'downloadable',
			operator: 'eq',
			value: values.downloadable,
		},
		{
			field: 'virtual',
			operator: 'eq',
			value: values.virtual,
		},
		{
			field: 'sold_individually',
			operator: 'eq',
			value: values.sold_individually,
		},
		{
			field: 'backorders',
			operator: 'eq',
			value: values.backorders,
		},
		{
			field: 'stock_status',
			operator: 'eq',
			value: values.stock_status,
		},
		{
			field: 'date_created',
			operator: 'between',
			value: values?.date_created,
		},
		{
			field: 'price_range',
			operator: 'eq',
			value: values?.price_range,
		},
	]
}

/** Label 對應 */
export const getProductFilterLabels = (
	label = '商品',
): {
	[key in keyof TFilterProps]: string
} => ({
	s: '關鍵字',
	sku: '貨號(sku)',
	product_category_id: `${label}分類`,
	product_tag_id: `${label}標籤`,
	product_brand_id: '品牌',
	status: `${label}狀態`,
	featured: '精選商品',
	downloadable: '可下載',
	virtual: '虛擬商品',
	sold_individually: '單獨販售',
	backorders: '允許延期交貨',
	stock_status: '庫存狀態',
	date_created: `${label}發佈日期`,
	is_course: '是否為課程商品',
	price_range: '價格範圍',
})

export const productKeyLabelMapper = (key: keyof TFilterProps, label = '商品') => {
	return getProductFilterLabels(label)?.[key] || key
}