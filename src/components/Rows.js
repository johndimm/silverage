import styles from './Rows.module.css'

const MAX_COLUMNS = 50

const Row = ({ val2, idx2, counts }) => {
	const columns = Object.keys(val2)
		.sort((a, b) => counts[b] - counts[a])
		.filter((val, idx) => idx < 12)
		.map((fieldName, idx3) => {
			const v = val2[fieldName]
			let rowValue = v
			if (v.match(/^https?:\/\//)) {
				if (v.indexOf('image') != -1) {
					rowValue = <img src={v} />
				} else {
					rowValue = <a href={v}>link</a>
				}
			}
			return (
				<td key={idx3}>
					{rowValue}
				</td>
			)
		})

	return <tr key={idx2}>{columns}</tr>
}

const Rows = ({ filteredData, counts, start, end }) => {
	const body = filteredData
		.filter((_, idx) => idx < end) // idx > 0 && idx >= start && idx <= end)
		.map((val2, idx2) => {
			return <Row key={idx2} val2={val2} idx2={idx2} counts={counts} />
		})

	const header =
		filteredData.length === 0
			? []
			: Object.keys(filteredData[0])
					.sort((a, b) => counts[b] - counts[a])
					.filter((val, idx) => idx < MAX_COLUMNS)
					.map((fieldName, idx) => <th key={idx}>{fieldName}</th>)

	return (
		<table className={styles.rows}>
			<thead>
				<tr>{header}</tr>
			</thead>
			<tbody>{body}</tbody>
		</table>
	)
}

export default Rows
