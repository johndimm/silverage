import React, { useEffect, useState, useRef } from 'react'
import FilterPanel from './FilterPanel'
// import FilterPanel from 'filterpanel'
import styles from './Main.module.css'
import Head from 'next/head'
import * as csv from 'csv-string'
import { scanCSVData, pickFields, allKeys } from './Analyze'
import { Cards } from './Cards'
import Rows from './Rows'

const ITEMS_PER_PAGE = 30


const Main = ({ url, csvBuffer }) => {
	const [data, setData] = useState([])
	const [filteredData, setFilteredData] = useState([])
	// const [oneItem, setOneItem] = useState(null)
	const [page, setPage] = useState(0)
	const [query, setQuery] = useState('')
	const [spinnerDisplay, setSpinnerDisplay] = useState('block')
	const [filterFields, setFilterFields] = useState([])
	const [counts, setCounts] = useState([])
	const [searchFields, setSearchFields] = useState([])
	const [fieldStats, setFieldStats] = useState({})
	const [cardFields, setCardFields] = useState({})
	const [picSize, setPicSize] = useState('medium')
	const [photos, setPhotos] = useState({})
	const itemArray = useRef([])


	const acceptCSVContent = async (content) => {
		itemArray.current = await csv.parse(content)
		parseCSVContent(itemArray.current)
	}

	const parseCSVContent = async (itemArray) => {

		// Convert array of arrays to array of json
		// http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_fantastic.jpg
		const header = itemArray[0]
		const jsonArray = []
		await itemArray
			.filter((_, idx) => idx > 0)
			.forEach((record, idx) => {
				let jsonLine = {}

				record.forEach((val, idx) => {
					jsonLine[header[idx]] = val
				})

				jsonArray.push(jsonLine)
			})

		const fieldStats = scanCSVData(jsonArray)
		const fields = pickFields(jsonArray, fieldStats)

		setCardFields(fields.cardFields)
		setFieldStats(fieldStats)
		setFilterFields(fields.ff)
		setSearchFields(fields.sf)

		setFilteredData(jsonArray)
		setData(jsonArray)

		// setCounts(counts)

		setSpinnerDisplay('none')
	}

	const acceptCSVPhotos = async (photo_text) => {
		const photoArray = await csv.parse(photo_text)

		// Convert array of arrays to array of json
		// http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_fantastic.jpg
		const photos = {}
		const header = photoArray[0]
		photoArray.forEach((record, idx) => {
			let jsonLine = {}
			record.forEach((val, idx) => {
				jsonLine[header[idx]] = val
			})
			const id = jsonLine['comic_id']
			const photo = jsonLine['photo']
			if (!photos[id]) {
				photos[id] = []
			}
			photos[id].push(photo)
		})

		setPhotos(photos)
	}

	const isBottom = (el) => {
		// console.log(`scrollTop:${el.scrollTop}, clientHeight:${el.clientHeight}, scrollHeight:${el.scrollHeight}`)
		return el.scrollTop + el.clientHeight + 1 > el.scrollHeight
	}

	const onScroll = (e) => {
		const el = e.nativeEvent.srcElement
		if (isBottom(el)) {
			nextPage()
		}
	}

	useEffect(() => {
		if (url) {
			fetchData(url)
		}
		else if (csvBuffer && csvBuffer.length > 0) {
			acceptCSVContent(csvBuffer)
		}

		fetchPhotos()
	}, [url])

	const nextPage = (e) => {
		setPage(page + 1)
	}

	const fetchData = async (url) => {
		if (url) {
			const options =
			{
				method: 'GET'
			}
			const res = await fetch(url, options)
			const restext = await res.text()
			acceptCSVContent(restext)
		}
	}

	const fetchPhotos = async () => {
		// const url = 'http://localhost/projects/marvel/data/comics-photos.csv'
		const url = 'http://localhost:3001/comics-photos.csv'
		const res = await fetch(url)
		const restext = await res.text()
		acceptCSVPhotos(restext)
	}

	const selectedItem = null
	/*
	oneItem ? (
		<OneItem
			item={oneItem}
			setOneItem={setOneItem}
			setQuery={setQuery}
			fieldStats={fieldStats}
		/>
	) : null
	*/

	const start = page * ITEMS_PER_PAGE
	const end = start + ITEMS_PER_PAGE

	// Rows need their own setOneItem

	const items = cardFields['poster'] ? (
		<Cards
			filteredData={filteredData}
			// counts={counts}
			start={start}
			end={end}
			cardFields={cardFields}
			fieldStats={fieldStats}
			setQuery={setQuery}
			picSize={picSize}
			photos={photos}
		/>
	) : (
		<Rows
			filteredData={filteredData}
			counts={counts}
			start={start}
			end={end}
			cardFields={cardFields}
			fieldStats={fieldStats}
			setQuery={setQuery}
		/>
	)

	if (data.length === 0)
		return (
			<div className={styles.popup_background} style={{ display: spinnerDisplay }}>
				<div className={styles.spinner}></div>
			</div>
		)

	return (
		<div>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=.5, maximum-scale=10.0, minimum-scale=.25, user-scalable=yes'
				/>
			</Head>

			<div className={styles.app} >
				<div className={styles.filterPanelContainer} >
					<FilterPanel
						originalArray={data}
						setFilteredData={setFilteredData}
						query={query}
						filterFields={filterFields}
						searchFields={searchFields}
						setPicSize={setPicSize}
					/>
				</div>
				<div className={styles.filterPanelItems} onScroll={onScroll} >
					{items}
				</div>
			</div>
		</div>
	)
}

export default Main
