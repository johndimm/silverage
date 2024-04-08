import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

const DEFAULT_NUM_USERS = 13
const MAXCHAR_CATEGORY = 25
const MAX_CHECKBOXES = 150

// Shorten a string to less than maxLen characters without truncating words.
function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str
	return str.substr(0, str.lastIndexOf(separator, maxLen)) + ' . . .'
}

const FeatureFilter = forwardRef(
	({ title, originalArray, field, aggregateMasks, inputMasks, order, isList }, ref) => {
		const [checkedBoxes, setCheckedBoxes] = useState({})
		const [showAll, setShowAll] = useState(false)

		useImperativeHandle(ref, () => ({
			clear() {
				setCheckedBoxes({})
				setShowAll(false)
			}
		}))

		const truncateAt = (s, c) => {
			let v = s
			const loc = v.indexOf(c)
			if (loc != -1) {
				v = v.substr(0, loc)
			}
			return v
		}

		const updateCounts = () => {
			let c = {}

			const addOne = (v) => {
				if (v in c) c[v]++
				else c[v] = 1
			}
			// Any checked categories must be displayed to allow the user to uncheck,
			// even if there are 0 users.
			Object.keys(checkedBoxes).forEach((item, idx) => {
				if (checkedBoxes[item]) c[item] = 0
			})

			// Count the number of items in each category of this feature 
			// that pass all the other filters.
			originalArray
				.filter((e, idx) => !inputMasks || inputMasks.length === 0 || inputMasks[idx])
				.forEach((item, idx) => {
					if (field in item && [null, 'N/A', '', 'null'].indexOf(item[field]) == -1) {
						let v = item[field]
						if (typeof v !== 'object' && isList) {
							const parts = v.split(', ')
							parts.forEach((val) => {
								addOne(truncateAt(val, ' ('))
							})
						} else {
							addOne(v)
						}
					}
				})

			return c
		}

		const showMore = (more) => {
			setShowAll(more)
		}

		const checkboxClicked = (e) => {
			setCheckedBoxes({
				...checkedBoxes,
				[e.currentTarget.name]: e.currentTarget.checked
			})
		}

		const selectOnly = (val) => {
			const cb = {}
			cb[val] = true
			setCheckedBoxes(cb)
		}

		const sortCategories = (order, a, b, countsa, countsb) => {
			if (order === 'frequency') {
				// Major sort by counts, minor by alpha.
				if (countsb != countsa) return countsb - countsa
			}

			var nameA = parseInt(a.toLowerCase()),
				nameB = parseInt(b.toLowerCase())
			if (nameA > nameB)
				//sort string descending
				return 1
			if (nameA < nameB) return -1
			return 0
		}

		const makeCheckbox = (val, idx, counts) => {
			let short = shorten(val, MAXCHAR_CATEGORY)

			if (short.length == 0) short = 'None'

			let count
			if (counts[val] > 1) {
				count = <span className='fp_feature_count'>({counts[val]})</span>
			}

			if (counts[val] !== 0) numPopulated++

			const color = counts[val] === 0 ? '#AAAAAA' : 'black'

			if (!showAll && idx >= DEFAULT_NUM_USERS) return null

			if (field == 'month') {
				const months = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
				short = months[parseInt(val) - 1]
			}

			return (
				<div key={field + idx} style={{"whiteSpace":"nowrap"}}>
					<input
	
						type='checkbox'
						onChange={checkboxClicked}
						name={val}
						checked={val in checkedBoxes && checkedBoxes[val]}
					/>
					<span
						className='fp_pointer'
						title={val}
						style={{ color: color }}
						onClick={(e) => selectOnly(val)}
					>
						{short} {count}
					</span>
				</div>
			)
		}

		useEffect(() => {
			// Create an array with just the selected categories.
			let checkedCategories = []
			Object.keys(checkedBoxes).forEach((val) => {
				if (checkedBoxes[val]) checkedCategories.push(val)
			})

			// Break apart cells with comma separated values.
			const checkList = (val) => {
				const parts = val.split(', ')
				let guess = false
				parts.forEach((val) => {
					const v = truncateAt(val, ' (')
					if (checkedCategories.includes(v)) guess = true
				})
				return guess
			}

			// Generate the output mask.
			const outputMask = originalArray.map((record, idx) => {
				// If nothing is checked, it's as if everything were checked.
				if (checkedCategories.length === 0) return true

				if (isList) {
					return checkList(record[field])
				} else {
					return checkedCategories.includes(record[field])
				}
			})

			// Send to parent.
			aggregateMasks(outputMask)
		}, [checkedBoxes])

		let numPopulated = 0
		const counts = updateCounts()

		let UI = Object.keys(counts)
			.sort((a, b) => {
				return sortCategories(order, a, b, counts[a], counts[b])
			})
			.map((val, idx) => {
				return makeCheckbox(val, idx, counts)
			})

		// This dimension has too many values, user needs to drill down to see it.
		const tooMany = Object.keys(counts).length > MAX_CHECKBOXES
		if (tooMany) {
			UI = Object.keys(checkedBoxes)
				.filter((el) => checkedBoxes[el])
				.map((val, idx) => {
					return makeCheckbox(val, idx, counts)
				})
		}

		if (UI.length === 0) return null

		let moreLink = null
		const leftOver = numPopulated - DEFAULT_NUM_USERS
		if (leftOver > 0 && !tooMany)
			moreLink = showAll ? (
				<div className='fp_more_link' onClick={(e) => showMore(false)}>
					... less ...
				</div>
			) : (
				<div className='fp_more_link' onClick={(e) => showMore(true)}>
					...{leftOver} more...
				</div>
			)

		return (
			<div className='fp_feature_filter'>
				<h3>{title}</h3>
				{UI}
				{moreLink}
			</div>
		)
	}
)

export default FeatureFilter
