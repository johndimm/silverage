const scanCSVData = (jsonArray) => {
	if (!jsonArray || jsonArray.length == 0)
	  return

	const fields = Object.keys(jsonArray[0])
	let fieldStats = {}
	let posterField = ''

	fields.forEach((fieldName) => {
		fieldStats[fieldName] = {}
		let distinctVals = {}
		let countVals = 0

		let longest = ''
		let shortest = ' '.repeat(100)
		let spaces = 0
		let commas = 0
		let isUrl = false
		let isImage = false
		let hasWordChar = false
		let isObject = false
		jsonArray.forEach((jsonRow) => {
			const type = typeof jsonRow[fieldName]
			// console.log('type', fieldName, type)
			if (type === 'object') return

			const cell = jsonRow[fieldName]

			commas += cell.split(',').length - 1
			spaces += cell.split(' ').length - 1

			let vals = [cell]
			if (spaces - commas < 10) vals = cell.split(', ')

			vals.forEach((v, idx) => {
				const val = v.replace(/^["']+/g, '').replace(/["']+$/, '')
				if (val in distinctVals) distinctVals[val] += 1
				else distinctVals[val] = 1

				countVals += 1

				if (val.length > longest.length) longest = val
				if (val.length > 0 && val.length < shortest.length) shortest = val

				const s = val.split(' ').length - 1

				if (!isUrl && s === 0) {
					if (val.indexOf('http') != -1) isUrl = true
				}

				if (!isImage && isUrl && s === 0) {
					const re = /\.(jpg|jpeg|JPG|JPEG|png|PNG)["']?$/
					isImage = val.match(re) != null
				}

				if (!hasWordChar && val !== 'N/A') hasWordChar = val.match(/[a-zA-Z]/) != null

				if (!isObject) isObject = typeof val === 'object'
			})
		})

		if (posterField === '' && isImage) posterField = fieldName

		fieldStats[fieldName] = {
			longest: longest,
			shortest: shortest,
			countDistinct: Object.keys(distinctVals).length,
			countVals: countVals,
			// distinctVals: distinctVals,
			avgSpaces: spaces / jsonArray.length,
			isUrl: isUrl,
			isImage: isImage,
			avgCommas: commas / jsonArray.length,
			hasWordChar: hasWordChar,
			isObject: isObject
		}
	})

	const titleField = Object.keys(fieldStats)
		.filter(
			(fieldName) =>
				fieldStats[fieldName].hasWordChar &&
				fieldStats[fieldName].avgSpaces > 0 &&
				fieldStats[fieldName].longest.length < 100
		)
		.sort(
			(a, b) =>
				1000 * (fieldStats[b].countDistinct - fieldStats[a].countDistinct) +
				(fieldStats[a].longest.length - fieldStats[b].longest.length)
		)
		.find((a) => a)

	const plotField = Object.keys(fieldStats)
		.filter((fieldName) => fieldStats[fieldName].hasWordChar && fieldStats[fieldName].avgSpaces > 0)
		.sort(
			(a, b) =>
				1000 * (fieldStats[b].countDistinct - fieldStats[a].countDistinct) +
				(fieldStats[b].longest.length - fieldStats[a].longest.length)
		)
		.find((a) => a)

	// console.log('plotField:', plotField)

	// Pick these using stats, hardcoded to items.
	fieldStats['cardFields'] = {
		poster: posterField,
		title: titleField,
		plot: plotField
	}

	// console.log('scan', fieldStats)
	return fieldStats
}

const pickFields = (jsonArray, fieldStats) => {
	if (!jsonArray || jsonArray.length == 0)
	return

	// Choose the filter fields in order.
	let ff = []
	let sf = []

	Object.keys(fieldStats)
	
	/*
		.sort((a, b) => {
			const wa = fieldStats[a].hasWordChar ? -1000 : 1000
			const wb = fieldStats[b].hasWordChar ? -1000 : 1000
			const d = wa - wb + fieldStats[b].countDistinct - fieldStats[a].countDistinct
			return d
		})
	*/

		.filter ( (a) => 
		  fieldStats[a].countDistinct < fieldStats[a].countVals)
		
		.filter(
			(a) =>
				fieldStats[a].countDistinct / jsonArray.length < 0.9 &&
				fieldStats[a].countDistinct > 1 
				&& !fieldStats[a].isObject
				// && fieldStats[a].longest.length != fieldStats[a].shortest.length 
				&& fieldStats[a].longest.length < 400
		)
		.forEach((val) => {
			if (fieldStats[val].countDistinct > 1) {
				if (!fieldStats[val].isUrl) {
					const c = fieldStats[val].avgCommas
					const s = fieldStats[val].avgSpaces
					const len = fieldStats[val].longest.length
					const isList = c > 0 && s - c < 10 && len < 2000

					ff.push({
						title: val,
						field: val,
						isList: isList,
						order: !fieldStats[val].hasWordChar ? 'alpha' : 'frequency'
					})

					if (fieldStats[val].hasWordChar) sf.push(val)
				}
			}
		})

	// Fields for the card
	let cardFields = {
		poster: fieldStats.cardFields['poster'],
		title: fieldStats.cardFields['title'],
		plot: fieldStats.cardFields['plot']
	}

	// console.log('ff', ff)
	// console.log('sf', sf)

	return { ff: ff, sf: sf, cardFields: cardFields }
}


const allKeys = (item, fieldStats, setQuery) => {
	const keyValPairs = Object.keys(item).map((s, idx) => {
		const stats = fieldStats[s]
		if (!stats)
			return null
		
		if (stats.isUrl) return null

		const name = s.charAt(0).toUpperCase() + s.slice(1)

		// console.log('OneItem, name:', name)
		const list = item[s]
		// console.log('list:', list)
		const parts = typeof list === 'string' ? list.split(',') : []

		const hotDetail = parts.map((val, idx2) => {
			const comma = idx2 > 0 ? ', ' : ''
			let v = val
			const parens = val.indexOf('(')
			if (parens != -1) v = val.substring(0, parens)

			return (
				<span key={idx * 100 + idx2} onClick={(e) => setQuery(v)}>
					{comma}{val}
				</span>
			)
		})

		return (
			<div key={idx}>
				<b>{name}:</b> {hotDetail}
			</div>
		)
	})
	return keyValPairs
}

export {scanCSVData, pickFields, allKeys}