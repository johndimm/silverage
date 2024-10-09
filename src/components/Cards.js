import { useState, useEffect, useRef } from 'react'
import styles from './Cards.module.css'
import { allKeys } from './Analyze'

const picSizes = {
	"small": { "name": "portrait_medium", "width": 100, "height": 150 },
	"medium": { "name": "portrait_fantastic", "width": 168, "height": 252 },
	"large": { "name": "portrait_uncanny", "width": 300, "height": 450 }
}

const getMainImage = (id, poster, photos) => {

	if (poster.indexOf("image_not_available") != -1) {
		if (id in photos) {
			return photos[id][0]
		} else {
			return null
		}
	} else {
		return poster
	}

	/*

	let mainImage = null

	if (id in photos) {
		mainImage = photos[id][0]
	} else {
		if (poster.indexOf("image_not_available") != -1) {
			mainImage = null
		} else {
			mainImage = poster
		}
	}
	*/


}

export const OneItem = ({ item, setOneItem, setQuery, fieldStats, goPrev, goNext, photos }) => {
	const posterField = fieldStats.cardFields.poster
	const [poster, setPoster] = useState('')

	const detail = allKeys(item, fieldStats, setQuery)

	let community = null
	if (item['community_url']) {
		community = <div>
			<b>CGC Forum:</b> <a className={styles.detail_link} target="_cgc_forum" href={item['community_url']}><i>Please Grade Me</i></a> 
			  {item['community_low']} / {item['community_high']} {item['qualified']}
		</div>
		
	}

	const onError = (e, item) => {
		// Turn display off, because this may be a bad image link.
		// But it could also something innocuous that actually
		// doesn't prevent the image from displaying.
		e.currentTarget.style.display = 'none'

		// fetchOMDBPoster(e, item)

		e.preventDefault()
		e.target.onerror = null
	}

	useEffect(() => {
		setPoster(item[posterField].replace("portrait_uncanny", "detail"))
	}, [item])

	const title = encodeURIComponent(item['title'])
	const ebayLink = `https://www.ebay.com/sch/i.html?_nkw=${title}+CGC&LH_Sold=1&_ipg=240`

	const id = item['id']
	const mainImage = getMainImage(id, poster, photos)

	let bigs = [<div>
		<a href={mainImage} target="_COMIC_IMAGE" title="click to open full-size image">
			<img src={mainImage} />
		</a>
	</div>]

	if (id in photos) {
		console.log(`photos[id][0]: ${photos[id][0]} , item[posterField]: ${item[posterField]}`)
		const comic_photos = photos[id][0] == item[posterField]
			? photos[id]
			: [].concat(item[posterField], photos[id])

		bigs = comic_photos.map((photo, idx) => {
			if (photo.indexOf('/image_not_available') != -1) {
				return <></>
			}
			return <div>
				<a href={photo} target="_COMIC_IMAGE" title="click to open full-size image">
					<img key={idx} src={photo} />
				</a>
			</div>
		})
	}

	const ContactForm = ({ item, hasPhotos }) => {
		const price = item['for sale']
		if (price == '')
			return null

		const title = item['title']

		const subject = `I might be interested in ${title}`

		let body = ''
		//if (!hasPhotos) body += "Please upload some photos of the actual comic."
		//body += ' Or post it for sale, either on ebay or facebook marketplace, either raw or CGC-graded, and send me the link. '

		const email = 'john.silveragemarvels@gmail.com'
		const href = `mailto:${email}?subject=${subject}&body=${body}`
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

	const cgc = item['CGC']
	let cgcButton = ''
	if (cgc) {
		const cgcLink = cgc ? `https://www.cgccomics.com/certlookup/${cgc}/` : ''
		cgcButton = <button onClick={() => { window.open(cgcLink, '_cgc') }}>cgc certificate</button>
	}

	const hasPhotos = id in photos && photos[id].length > 0

	return (
		<div className={styles.popup_background} >

			<table className={styles.one_item}>
				<tbody>
					<tr valign="top">
						<td>
							<div className={styles.one_item_left}>
								{bigs}

							</div>
						</td>

						<td>
							<div className={styles.one_item_right} >
								<div className={styles.navigation}>
									<button onClick={goPrev}>prev</button>
									<button onClick={goNext}>next</button>
									<button onClick={() => { window.open(ebayLink, '_ebay') }}>ebay lookup</button>
									{cgcButton}
									<button className={styles.close_button} onClick={(e) => setOneItem(null)}>X</button>
								</div>

								<div className={styles.item_details_text}>
									{detail}
									{community}
								</div>
								<ContactForm item={item} hasPhotos={hasPhotos} />


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


const Card = ({ item, onClick, cardFields, fieldStats, setQuery, picSize, photos }) => {
	const [badImage, setBadImage] = useState(false)
	const title = item[cardFields['title']]
	const plot = item[cardFields['plot']]
	const grade = item['grade']
	const id = item['id']
	let poster = item[cardFields['poster']]
	const description = item['description']
	const penciler = item['penciler']

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

	const mainImage = getMainImage(id, poster, photos)

	let cardContents = null
	if (mainImage) {
		cardContents = <img style={style} src={mainImage} onError={(e) => onError(e, item)} onLoad={onLoad} />
	} else {
		cardContents = <div className={styles.missing_photo} style={style}>
			{title}
			<br />
			{penciler}
			<br />
			grade: {grade}
		</div>
	}

	/*
	
		let cardContents = null
		if (poster.indexOf("image_not_available") != -1) {
			if (id in photos) {
				cardContents = <img style={style} src={photos[id][0]} onError={(e) => onError(e, item)} onLoad={onLoad} />
			} else {
	
				cardContents = <div className={styles.missing_photo} style={style}>
					{title}
					<br />
					{penciler}
					<br />
					grade: {grade}
				</div>
			}
	
		} else {
			cardContents = <img style={style} src={poster} onError={(e) => onError(e, item)} onLoad={onLoad} />
		}
	
	*/

	return (
		<div className={styles.item_card} onClick={onClick} title={title}>
			<div>
				{cardContents}
				{minimalText}
			</div>
		</div>
	)
}


export const Cards = ({ filteredData, start, end, cardFields, fieldStats, setQuery, picSize, photos, forSaleOnly, selectedId }) => {
	const [oneItem, setOneItem] = useState(null)

	useEffect(() => {
		filteredData.forEach ((val, idx) => {
			if (val.id == selectedId) {
				setOneItem(idx)
			}
		})

	}, [selectedId])

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
					photos={photos}
				/>
			)
		})


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

	return (
		<div>
			{items}
			{selectedItem}
		</div>
	)
}

export default { Cards, OneItem }
