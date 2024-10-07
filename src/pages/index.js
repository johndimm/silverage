import Main from '../components/Main'
import Head from 'next/head'
import { useRouter } from 'next/router';

const MainPage = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>
		<Head>
			<title>
			a fantastic collecton of Marvel Comics from the 60's
			</title>
		</Head>
	    <Main selectedId={id}/>
		</div>

	// return {c} // <Main />

	
}

export default MainPage
