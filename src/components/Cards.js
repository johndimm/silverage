import { useState, useEffect, useRef } from 'react'
import styles from './Cards.module.css'
import { allKeys } from './Analyze'

const picSizes = {
	"small": { "name": "portrait_medium", "width": 100, "height": 150 },
	"medium": { "name": "portrait_fantastic", "width": 168, "height": 252 },
	"large": { "name": "portrait_uncanny", "width": 300, "height": 450 }
}

export const OneItem = ({ item, setOneItem, setQuery, fieldStats, goPrev, goNext, photos }) => {
	const detail = allKeys(item, fieldStats, setQuery)

	const posterField = fieldStats.cardFields.poster
	let poster = item[posterField]
	poster = poster.replace("portrait_uncanny", "detail")

	const title = encodeURIComponent(item['title'])
	const ebayLink = `https://www.ebay.com/sch/i.html?_nkw=${title}`

	let scans = []
	const id = item['id']
	if (id in photos) {
		const comic_photos = photos[id]

		const front = comic_photos.length > 0 ? comic_photos[0] : ''
		const back = comic_photos.length > 1 ? comic_photos[1] : ''


		if (front && front != '') {
			scans.push(<img src={front} width="100" onClick={() => window.open(front, '_scan')} />)
		}

		if (back && back != '') {
			scans.push(<img src={back} width="100" onClick={() => window.open(back, '_scan')} />)
		}
	}


	const ContactForm = ({ item }) => {
		const price = item['price']
		if (price == '')
		   return null

		const title = item['title']
		
		const subject  = `Please contact me about ${title}, for sale at ${price}`
		const email = 'john.silveragemarvels@gmail.com'
		const href = `mailto:${email}?subject=${subject}`
		return (
			<div>
			<b>Send email to purchase</b>:
			<a href={href}>
			<div className={styles.purchase_email}>
  {subject}
			</div>
			</a>
			</div>
		)
	}


	return (
		<div className={styles.popup_background} >

			<div className={styles.one_item}>

				<div className={styles.one_item_left}>
					<img src={poster} onError={(e) => onError(e, item)} onClick={(e) => setOneItem(null)} />
				</div>

				<div className={styles.one_item_right} >
					<div className={styles.navigation}>
						<button onClick={goPrev}>prev</button>
						<button onClick={goNext}>next</button>
						<button onClick={() => { window.open(ebayLink, '_ebay') }}>ebay lookup</button>
						<button onClick={(e) => setOneItem(null)}>close</button>
					</div>
					<div>
						{scans}
					</div>
					<div className={styles.item_details_text}>{detail}</div>
					<ContactForm item={item} />
				</div>

			</div>
		</div>
	)
}

// 				

const onLoad = (e) => {
	// Turn the display back on, in case it was previously
	// and erroneously turned off by onError.
	e.currentTarget.style.display = 'inline-block'
	e.preventDefault()
}

const updatePoster = async (item, posterURL) => {
	if (item.imdbid == null || posterURL == null) return

	const url = `/api/items/poster/update/${item.imdbid}/${encodeURIComponent(posterURL)}`
	const response = await fetch(url)
	const data = await response.json()
}

const fetchOMDBPoster = async (e, item) => {
	const url = `http://www.omdbapi.com/?i=${item.imdbid}&apikey=985c8d27`
	const response = await fetch(url)
	const data = await response.json()
	// updatePoster(item, data.Poster)

	// Set the source of the current item poster that generated the request.
	e.target.src = data.Poster
}


const Card = ({ item, onClick, cardFields, fieldStats, setQuery, picSize }) => {
	const [badImage, setBadImage] = useState(false)
	const title = item[cardFields['title']]
	const plot = item[cardFields['plot']]
	let poster = item[cardFields['poster']]

	const size = picSizes[picSize]
	poster = poster.replace("portrait_uncanny", size["name"])

	const detail = allKeys(item, fieldStats, setQuery)

	const onError = (e, item) => {
		// Turn display off, because this may be a bad image link.
		// But it could also something innocuous that actually
		// doesn't prevent the image from displaying.
		e.currentTarget.style.display = 'none'

		// fetchOMDBPoster(e, item)

		e.preventDefault()
		e.target.onerror = null
		setBadImage(true)
	}

	const minimalText = badImage ? (
		<div className={styles.text_card}>
			<div className={styles.item_title}>{title}</div>
			<div className={styles.item_plot}>{plot}</div>
		</div>
	) : null

	const style = { "width": size["width"] + "px", "height": size["height"] + "px" }

	return (
		<div className={styles.item_card} onClick={onClick} title={title}>
			<div>
				<img style={style} src={poster} onError={(e) => onError(e, item)} onLoad={onLoad} />
				{minimalText}
			</div>
		</div>
	)
}


export const Cards = ({ filteredData, start, end, cardFields, fieldStats, setQuery, picSize, photos, forSaleOnly }) => {
	const [oneItem, setOneItem] = useState(null)

	// console.log('Cards, oneItem:', oneItem)

	const goNext = () => {
		// console.log('goNext:', oneItem)
		if (oneItem != null && oneItem < filteredData.length - 1)
			setOneItem(oneItem + 1)
	}

	const goPrev = () => {
		console.log('goPrev:', oneItem)
		if (oneItem != null && oneItem > 0)
			setOneItem(oneItem - 1)
	}


	let selectedItem = null
	if (oneItem != null) {
		const oneItemVal = filteredData[oneItem]
		selectedItem = (
			<OneItem
				item={oneItemVal}
				setOneItem={setOneItem}
				setQuery={setQuery}
				fieldStats={fieldStats}
				goPrev={goPrev}
				goNext={goNext}
				photos={photos}
			/>
		)
	}


	const items = filteredData
		.sort((a, b) => b.imdbRating - a.imdbRating)
		.filter((val, idx) => idx < end)
		.map((val, idx) => {
			return (
				<Card
					item={val}
					key={idx}
					onClick={(e) => setOneItem(idx)}

					cardFields={cardFields}
					fieldStats={fieldStats}
					setQuery={setQuery}
					picSize={picSize}
				/>
			)
		})

	return (
		<div>
			{items}
			{selectedItem}
		</div>
	)
}

export default { Cards, OneItem }
