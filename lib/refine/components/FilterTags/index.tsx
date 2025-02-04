import { memo } from 'react'
import { Tag, FormInstance } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { CloseCircleOutlined } from '@ant-design/icons'
import { BaseRecord } from '@refinedev/core'

export function FilterTagsComponent<T = BaseRecord>({
	form,
	keyLabelMapper = (s) => s?.toString(),
	valueLabelMapper = (s) => s?.toString(),
	booleanKeys = [],
}: {
	form: FormInstance<T>
	keyLabelMapper?: (key: keyof T) => string
	valueLabelMapper?: (key: string) => string
	booleanKeys?: (keyof T)[]
}): JSX.Element {
	const searchValues = form?.getFieldsValue()
	const handleClearSearchProps = (key: string) => () => {
		form?.setFieldValue([key], undefined)
		form?.submit()
	}

	const handleArrayProps =
		(key: string, value: string | number, searchValue: (string | number)[]) =>
		() => {
			const newValue = searchValue.filter((item) => item !== value)
			form?.setFieldValue([key], newValue)
			form?.submit()
		}

	const searchKeys = Object.keys(searchValues || {}) as (keyof T)[]

	return (
		<>
			{searchValues &&
				searchKeys.map((key) => {
					const searchValue = searchValues?.[key]

					/**
					 * If the value is undefined, null or empty string, we will not display the tag
					 *
					 * @returns null
					 */

					if (
						searchValue === undefined ||
						searchValue === null ||
						searchValue === ''
					)
						return null

					/**
					 * If the value is an array of dayjs objects, we will format the date range
					 * often used in date range picker from antd
					 *
					 * @returns Tag with 'YYYY/MM/DD ~ YYYY/MM/DD'
					 */

					if (
						Array.isArray(searchValue) &&
						(searchValue as unknown[])?.every(
							(item: unknown) => item instanceof dayjs,
						)
					) {
						return (
							<Tag
								key={key as string}
								bordered={false}
								color="cyan"
								className="px-2.5 py-0.5"
								closeIcon={<CloseCircleOutlined />}
								onClose={handleClearSearchProps(key as string)}
							>
								{keyLabelMapper(key)}:{' '}
								{(searchValues[key] as Dayjs[])
									.map((date) => (date ? date.format('YYYY/MM/DD') : ''))
									.join(' ~ ')}
							</Tag>
						)
					}

					/**
					 * If the value is an string|number array
					 *
					 * @returns Multiple Tags
					 */

					if (Array.isArray(searchValue)) {
						// ensue every item in the array is a string or number

						const isStringOrNumber = (searchValue as unknown[]).every(
							(item) => typeof item === 'string' || typeof item === 'number',
						)
						if (isStringOrNumber) {
							return (searchValue as (string | number)[]).map((value) => (
								<Tag
									key={`${key as string}[${value?.toString()}]`}
									bordered={false}
									color="cyan"
									className="px-2.5 py-0.5"
									closeIcon={<CloseCircleOutlined />}
									onClose={handleArrayProps(
										key as string,
										value,
										searchValue as (string | number)[],
									)}
								>
									{keyLabelMapper(key)}: {valueLabelMapper(value?.toString())}
								</Tag>
							))
						} else {
							return null
						}
					}

					/**
					 * If the value is an boolean, we will display the boolean value in string
					 *
					 * @returns Tag with 'true' or 'false'
					 */

					if (typeof searchValue === 'boolean') {
						return (
							<Tag
								key={key as string}
								bordered={false}
								color="cyan"
								className="px-2.5 py-0.5"
								closeIcon={<CloseCircleOutlined />}
								onClose={handleClearSearchProps(key as string)}
							>
								{keyLabelMapper(key)}: {keyLabelMapper(key)}:{' '}
								{valueLabelMapper(searchValue?.toString())}
							</Tag>
						)
					}

					/**
					 * If the value is not in the above conditions, we will display the value as it is
					 * Because BooleanRadioButton will pass the value as string, "", "0" or "1"
					 *
					 *
					 * @returns Tag
					 */

					const isBoolean = !!booleanKeys?.includes(key)
					return (
						<Tag
							key={key as string}
							bordered={false}
							color="cyan"
							className="px-2.5 py-0.5"
							closeIcon={<CloseCircleOutlined />}
							onClose={handleClearSearchProps(key as string)}
						>
							{keyLabelMapper(key)}:{' '}
							{isBoolean &&
								valueLabelMapper(
									searchValue?.toString() === '1' ? 'true' : 'false',
								)}
							{!isBoolean && valueLabelMapper(searchValue?.toString())}
						</Tag>
					)
				})}
		</>
	)
}

export const FilterTags = memo(
	FilterTagsComponent,
) as typeof FilterTagsComponent
