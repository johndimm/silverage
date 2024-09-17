import { useState, useEffect, useRef } from 'react'
import styles from './Cards.module.css'
import { allKeys } from './Analyze'

const picSizes = {
	"small": { "name": "portrait_medium", "width": 100, "height": 150 },
	"medium": { "name": "portrait_fantastic", "width": 168, "height": 252 },
	"large": { "name": "portrait_uncanny", "width": 300, "height": 450 }
}

export const OneItem = ({ item, setOneItem, setQuery, fieldStats, goPrev, goNext, photos }) => {
	const [poster, setPoster] = useState('')

	const detail = allKeys(item, fieldStats, setQuery)

	const posterField = fieldStats.cardFields.poster

	useEffect(() => {
		setPoster(item[posterField].replace("portrait_uncanny", "detail"))
	}, [item])

	const title = encodeURIComponent(item['title'])
	const ebayLink = `https://www.ebay.com/sch/i.html?_nkw=${title}`

	let scans = []
	const id = item['id']
	if (id in photos) {
		console.log(`photos[id][0]: ${photos[id][0]} , item[posterField]: ${item[posterField]}`)
		const comic_photos = photos[id][0] == item[posterField]
			? photos[id]
			: [].concat(item[posterField], photos[id])

		scans = comic_photos.map((photo, idx) => {
			return <div>
			<img key={idx} src={photo} width="50" onClick={() => setPoster(photo)} />			
			</div>
		})
	}

	const ContactForm = ({ item }) => {
		const price = item['for sale']
		if (price == '')
		   return null

		const title = item['title']
		
		const subject  = `I might be interested in ${title}.  How much?`
		const email = 'john.silveragemarvels@gmail.com'
		const href = `mailto:${email}?subject=${subject}`
		return (
			<div className={styles.request_info}>
				<b>Request information by email:</b>
			<a href={href}>
			<div className={styles.purchase_email}>
                 "{subject}"
			</div>
			</a>
			</div>
		)
	}

	return (
		<div className={styles.popup_background} >

			<table className={styles.one_item}>
				<tbody>
					<tr valign="top">
						<td>
							<div className={styles.one_item_left}>
								<img src={poster} onError={(e) => onError(e, item)} onClick={(e) => setOneItem(null)} />
							</div>
						</td>
						<td>
							<div className={styles.scans}>
								{scans}
							</div>
						</td>
						<td>
							<div className={styles.one_item_right} >
								<div className={styles.navigation}>
									<button onClick={goPrev}>prev</button>
									<button onClick={goNext}>next</button>
									<button onClick={() => { window.open(ebayLink, '_ebay') }}>ebay lookup</button>
									<button className={styles.close_button} onClick={(e) => setOneItem(null)}>X</button>
								</div>

								<div className={styles.item_details_text}>{detail}</div>
								<ContactForm item={item}/>
				
							</div>
						</td>
					</tr>
				</tbody>
			</table>

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

/*
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
*/


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
