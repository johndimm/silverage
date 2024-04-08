import { useRouter } from 'next/router';
import Main from '../components/Main'

function FetchCSV() {
    const router = useRouter();
	const { url } = router.query;
	//let url = 'https://data.world/studentoflife/imdb-top-250-lists-and-5000-or-so-data-records'
	console.log('router.query:', router.query, ' as path', router.asPath);
	if (!url) return null;
		return (
			<div>
				<Main url={url}/>
			</div>
		)

}


export default FetchCSV