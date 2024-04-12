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
            <div className="titles">

			<div className="page_subtitle">
				a fantastic collection of 1960's Marvel Comics . . .
			</div>
			</div>

			<div className="fp_buttons">
				<form>
					<input type="radio" id='small' name="card-size" className='picSize' onChange={() => setPicSize('small')} />
					<label htmlFor='small'>small</label>
					<input type="radio" id='medium' name="card-size" className='picSize' onChange={() => setPicSize('medium')} defaultChecked="true" />
					<label htmlFor='medium'>medium</label>
					<input type="radio" id='large' name="card-size" className='picSize' onChange={() => setPicSize('large')} />
					<label htmlFor='large'>large</label>
				</form>
			</div>

			<SearchFilter
				title='Search'
				originalArray={originalArray}
				aggregateMasks={(data) => aggregateMasks(idx, data)}
				query={query}
				searchFields={searchFields}
			/>

            <div>
			{filters}
			</div>

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
					<dd>nodejs package to manage panels like this</dd>

					<dt>
						<a href="https://github.com/johndimm/silverage" target="_blank">github</a>
					</dt>
					<dd>react/nextjs code for this webapp</dd>

					<dt><a href="https://imgur.com/" target="_blank">imgur</a></dt>
					<dd>
						photo hosting
					</dd>

					<dt>
						Marvel's back-issue service
					</dt>

					<dd>
						Most of the 1963-64 issues were bought by mail directly from Marvel itself at cover price.
					</dd>

					<dt>
						Tyee Bookstore in Seattle
					</dt>
					<dd>
						A trove of 1961-63 Marvels in top condition at $0.05.
					</dd>


					<dt>author</dt><dd>John Dimm, <a href="mailto:john.silveragemarvels@gmail.com?subject=Your Silver-Age Marvels">john.silveragemarvels@gmail.com</a></dd>
				</dl>
			</div>

		</div>

	)
}

export default FilterPanel
