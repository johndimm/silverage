import React, { useState, useEffect, createRef } from 'react'
import FeatureFilter from './FeatureFilter'
import SearchFilter from './SearchFilter'
import GlobalStyles from './GlobalStyles'


const FilterPanel = ({ originalArray, setFilteredData, query, filterFields, searchFields, setPicSize, debug }) => {
	const [refs, setRefs] = useState([])
	const [outputMasks, setoutputMasks] = useState([])
	const [inputMasks, setinputMasks] = useState([])

	useEffect(() => {
		// Load the arrays with "true", so everything is by default on.
		const allIn = originalArray.map((val, idx) => {
			return true
		})

		let masks = []
		for (let i = 0; i < filterFields.length + 1; i++) masks.push(allIn)

		setoutputMasks(masks)
		setinputMasks(masks)

		setRefs(
			Array(filterFields.length)
				.fill()
				.map((_, i) => refs[i] || createRef())
		)
	}, [originalArray, filterFields])

	const aggregateMasks = (sourceIdx, outputMask) => {
		outputMasks[sourceIdx] = outputMask
		setoutputMasks(outputMasks)

		// Make a mask for each filter that merges all the other filter masks.
		const inputMasks = outputMasks.map((outputMask, filterIdx) => {
			return outputMask.map((val, idx) => {
				let allTrue = true
				for (var i = 0; i < outputMasks.length; i++) {
					if (i != filterIdx && !outputMasks[i][idx]) {
						allTrue = false
						break
					}
				}
				return allTrue
			})
		})

		setinputMasks(inputMasks)

		// Send results to parent.
		// First, make a mask over all feature filters.
		let globalMask = []
		outputMask.forEach((val, idx) => {
			let allTrue = val
			for (var i = 0; i < outputMasks.length; i++) {
				if (!outputMasks[i][idx]) {
					allTrue = false
					break
				}
			}
			globalMask.push(allTrue)
		})

		// Second, gather the original records using the global mask.
		let filteredData = []
		globalMask.forEach((val, idx) => {
			if (val) filteredData.push(originalArray[idx])
		})

		setFilteredData(filteredData)
	}

	const clearInterface = (e) => {
		e.preventDefault()
		setoutputMasks([])
		setinputMasks([])
		refs.forEach((ref) => {
			ref.current.clear()
		})
	}

	const filters = filterFields.map((val, idx) => {
		const sortOrder = 'order' in val ? val.order : 'frequency'

		const debugMasks =
			idx in inputMasks && idx in outputMasks && debug ? (
				<div className='fp_debug'>
					in: {JSON.stringify(inputMasks[idx]).replace(/true/g, '1').replace(/false/g, '0')}
					<br />
					out: {JSON.stringify(outputMasks[idx]).replace(/true/g, '1').replace(/false/g, '0')}
				</div>
			) : null

		return (
			<div key={idx}>
				<FeatureFilter
					title={val.title}
					ref={refs[idx]}
					originalArray={originalArray}
					field={val.field}
					order={sortOrder}
					aggregateMasks={(data) => aggregateMasks(idx, data)}
					inputMasks={inputMasks[idx]}
					isList={val.isList}
				/>
				{debugMasks}
			</div>
		)
	})

	const idx = filterFields.length

	return (
		<div className='fp_filter_panel'>
			<GlobalStyles />
			<div className='fp_buttons'>
				<div className='fp_home_button' onClick={() => (window.location.href = '/')}>
					home
				</div>
				<div className='fp_clear_button' onClick={clearInterface}>
					clear
				</div>
			</div>


			<div className="page_title">
				Silver Age
			</div>
			<div className="page_subtitle">
				Marvel Comics from the mid-60's
			</div>


			<div className="fp_buttons">
				<span className='picSize' onClick={() => setPicSize('small')}>small</span>
				<span className='picSize' onClick={() => setPicSize('medium')}>medium</span>
				<span className='picSize' onClick={() => setPicSize('large')}>large</span>
			</div>

			<SearchFilter
				title='Search'
				originalArray={originalArray}
				aggregateMasks={(data) => aggregateMasks(idx, data)}
				query={query}
				searchFields={searchFields}
			/>
			{filters}

			<div className='fp_credits'>

				<h3>credits</h3>

				<dl>
					<dt>
						<a href="https://developer.marvel.com/documentation/getting_started" target="_blank">Marvel Comics API</a>
					</dt>
					<dd>cover images, descriptions, and creator credits</dd>

					<dt>
						<a href="https://filterpanel-csv.vercel.app/" target="_blank">featurepanel</a>
					</dt>
					<dd>my react/nextjs package to manage this panel</dd>

					<dt><a href="https://imgur.com/" target="_blank">imgur</a></dt>
					<dd>
						provides hosting for photos
					</dd>

					<dt>used bookstores in LA in 1965</dt><dd>I was the kid on the floor pouring through boxes of old magazines</dd>

					<dt>author</dt><dd>John Dimm, <a href="mailto:john.silveragemarvels@gmail.com?subject=Your Silver-Age Marvels">john.silveragemarvels@gmail.com</a></dd>
				</dl>
			</div>

		</div>

	)
}

export default FilterPanel
