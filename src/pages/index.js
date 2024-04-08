import Main from '../components/Main'
import { useState } from 'react'
import styles from './index.module.css'

const SampleMovie = () => {
	return <pre>{`
title          | The Shawshank Redemption
year           | 1994
decade         | 1990
rated          | R
released       | 14 Oct 1994
runtime        | 142 min
genre          | Crime, Drama
director       | Frank Darabont
writer         | Stephen King (short story ""Rita Hayworth and Shawshank Redemption""), 
                 Frank Darabont (screenplay)
actors         | Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler
plot           | Two imprisoned men bond over a number of years, finding solace and eventual 
                 redemption through acts of common decency.
language       | English
country        | USA
awards         | Nominated for 7 Oscars. Another 19 wins & 30 nominations.
poster         | https://images-na.ssl-images-amazon.com/images/I/71TO64qm%2BbL._AC_SY741_.jpg
ratings_source | Internet Movie Database
ratings_value  | 9.3/10
metascore      | 80
imdbrating     | 9.3
imdbvotes      | 1,825,626
imdbid         | tt0111161
dvd            | 27 Jan 1998
boxoffice      | N/A
production     | Columbia Pictures
website        | N/A
response       | True
tomatourl      | http://www.rottentomatoes.com/m/shawshank_redemption/`}
	</pre>
}

const SampleOlympic = () => {
	return <div style={{ fontSize: '7.4pt' }}><pre>
		{`
+--------+------+--------+----------+------------+-----------------+--------------+--------+----------------+-------+---------------+
| Season | Year | City   | Sport    | Discipline | Athlete         | Country_code | Gender | Event          | Medal | Country       |
+--------+------+--------+----------+------------+-----------------+--------------+--------+----------------+-------+---------------+
| summer | 2012 | London | Aquatics | Swimming   | PHELPS, Michael | USA          | Men    | 100M Butterfly | Gold  | United States |
+--------+------+--------+----------+------------+-----------------+--------------+--------+----------------+-------+---------------+	
`}
	</pre>
	</div>
}

const Movies = () => {
	return (
		<div>
			<h3>Movies</h3>
			<a href='/FetchCSV?url=https%3A%2F%2Fquery.data.world%2Fs%2Flt76nsufm5v76w2au4mmkksoh6wu6a'>
				<img src='movies_thumbnail.png' />
			</a>

			<div>
				<ul>
					<li>CSV file from <a href='https://data.world/studentoflife/imdb-top-250-lists-and-5000-or-so-data-records'>data.world</a>
					</li>

					<li>
						Uses extracts from IMDB and OMDB, curated by TheMitchWorksPro.
					</li>
				</ul>
			</div>
		</div>)

}

const Shapes = () => {
	return (
		<div>
			<h3>Shapes</h3>
			<a href='https://filterpanel-example.vercel.app/'><img src='shapes.png' /></a>
			<ul>
				<li>
					Trivial example using a JSON literal as input.
				</li>
				<li>
					Click a few checkboxes and watch how the "in" and "out" masks change.
				</li>
			</ul>
		</div>
	)
}

const OlympicMedals = () => {
	return (
		<div>
			<h3>Olympic Medals</h3>
			<a href='/FetchCSV?url=https%3A%2F%2Fquery.data.world%2Fs%2F45jwacgkggx55n2p3yox4qyiug7n6l'>
				<img src='olympics_thumbnail.png' />
			</a>
			<ul>
				<li>CSV file from <a href='https://data.world/johndimm/olympic-medals-1896-to-2014-in-detail'>data.world</a></li>
				<li>uses data released by <a href='https://www.theguardian.com/sport/datablog/2012/jun/25/olympic-medal-winner-list-data#data'>The Guardian</a></li>

				<li>hosted on <a href='https://www.kaggle.com/the-guardian/olympic-games'>Kaggle</a> and many other sites</li>
				<li>
					covers Olympic medals up to 2014
				</li>
			</ul>
		</div>
	)
}

const PublicPrivate = () => {
	return (
		<div>
			<h2>Public vs Private</h2>
			<p>
				When you open a file on your computer, the data will be read into Filterpanel running on
				your browser but will not be transmitted over the internet.
			</p>
			<p>
				There is no Filterpanel server. There are no accounts. There is no database. Nothing is
				stored. It's just a script.  The entire CSV file is read on startup every time, either from local storage or the internet.  The second time is faster, because caching.
			</p>

		</div>
	)
}

const GetLocalFile = () => {
	return (
		<div className={styles.public_data}>
			<h2>Public Data</h2>
			<div className={styles.instructions}>Enter the url of a CSV file.</div>
			<form action='/FetchCSV'>
				<span>url:</span>
				<input type='text' name='url'></input>
				<button type='submit'>fetch</button>
			</form>
		</div>
	)
}



const GitHub = () => {
	return (
		<div>
			<h2 >Github</h2>
			<h3>filterpanel</h3>
			<a href='https://github.com/johndimm/filterpanel'>https://github.com/johndimm/filterpanel</a>
			<div style={{ marginTop: "10px" }}>
				The npm package exposes the Filterpanel component.  It takes a JSON array as input.
			</div>
			<br />
			<h3>filterpanel-example</h3>
			<a href='https://github.com/johndimm/filterpanel-example'>https://github.com/johndimm/filterpanel-example</a>
			<div style={{ marginTop: "10px" }}>
				A toy example showing how it works.  Data is a JSON literal.
			</div>
			<h3>filterpanel-csv</h3>
			<a href='https://github.com/johndimm/filterpanel-csv'>https://github.com/johndimm/filterpanel-csv</a>
			<div style={{ marginTop: "10px" }}>
				This app takes input from CSV files, either from the local system or the internet.  It scans and analyzes the CSV and applies rules to lay out the filterpanel.
			</div>
		</div>
	)
}

const Ecommerce = () => {
	return (
		<div className={styles.ecommerce} >
			<h2 >What is a filter panel?</h2>
			<p>
				Filterpanels are used in ecommerce to deal with the problem of vague queries that produce too much data.  The user needs a way to wade through the thousands of items that match the query "tv".  The filter panel appears on the left side of the page after a query.  Check the boxes to reduce the list.
			</p>
			<img src='Amazon.png'></img>
			<img src='Walmart.png'></img>
			<img src='Target.png'></img>
			<img src='Costco.png'></img>
			<h2>How do you use it?</h2>
			The panels is a series of <i>feature filters</i>.  You check the values you want to include in the list of items on the right.  If a filter has nothing checked, it's as if everything is checked and all values are allowed.  You check multiple boxes in various filters until the list shows items with the features you care about.

			<h2>How does it work?</h2>
			<p>The standard implementation reacts to a click by generating a new page of data in the database running on the server, then download and render it on the client.  This implemention downloads the data to the client at the outset, so it responds to clicks locally and immediately.</p>

			<p>The algorithm uses document masks to represent the actions of filters. The filters have no knowledge of each other, and the container app blindly aggregates and disseminates the results of the filters.  The technique makes high demands on the network, the local machine, and the browser, compared to the standard solution.  But compared to games or video, not so much.</p>

			<h2>What kinds of data work well?</h2>
			See the examples, Movies in particular.
			<ul>
				<li>Each row has value on its own.  Rows do not need aggregation to become interesting.</li>
				<li>Many columns are <i>categorical</i>:  they have a small number of repeating values.  It's even better if the values are text. </li>
				<li>The categorical fields are shown in increasing cardinality.  So rated and genre on Movies show up before country and language.</li>
				<li>The technique works well on rows up to the 5,000 to 10,000 range.  For larger datasets, it is best to feed the filterpanel with the results of a query.</li>
			</ul>

			<h2>Analysts, Product Designers, Casual Readers</h2>
			<p>
				The best case for this UI may be product catalogs, but lists of anything with known categorical attributes can benefit.
			</p>

			<p>First, try it out on a local CSV file.  If the results are promising, you may want to edit your spreadsheet to remove boring columns or make other changes to improve the filterpanel display.
			</p>

			<h3>Hosting your data on data.world</h3>
			<p>
				If it looks good and you want to share a local CSV file as rendered by Filterpanel, you need to make it available on the
				internet or intranet using a url. One option for public data is to upload it to <a href='https://data.world/'>data.world</a>.    See the Movies and Olympics examples above for details.
			</p>

			<h3>Hosting your data on Google Sheets</h3>
			
				Here is a google sheet that is publicly available:

				<blockquote>

					<a href="https://docs.google.com/spreadsheets/d/1obx8JHesu-FGVUKsm6cX-Use9V8PZx-yqJmJHu095DE/edit#gid=0">https://docs.google.com/spreadsheets/d/1obx8JHesu-FGVUKsm6cX-Use9V8PZx-yqJmJHu095DE/edit#gid=0</a>
				</blockquote>

				To make it available as CSV, you need to edit the url like this:

				<blockquote>
					<a href="https://docs.google.com/spreadsheets/d/1obx8JHesu-FGVUKsm6cX-Use9V8PZx-yqJmJHu095DE/export?format=csv">

						https://docs.google.com/spreadsheets/d/1obx8JHesu-FGVUKsm6cX-Use9V8PZx-yqJmJHu095DE/export?format=csv
					</a>

				</blockquote>

				That's the url you load into filterpanel, resulting in this final url.  It shows the Google Sheets data as it is rendered by the filterpanel UI.

				<blockquote>
					<a href="https://filterpanel-csv.vercel.app/FetchCSV?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1obx8JHesu-FGVUKsm6cX-Use9V8PZx-yqJmJHu095DE%2Fexport%3Fformat%3Dcsv">
						https://filterpanel-csv.vercel.app/FetchCSV?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1obx8JHesu-FGVUKsm6cX-Use9V8PZx-yqJmJHu095DE%2Fexport%3Fformat%3Dcsv
					</a>

				</blockquote>
			


			<h3>Using data from OpenML</h3>

			OpenML has data:

			<blockquote>
				<a href="https://www.openml.org/s/88/data">
					https://www.openml.org/s/88/data
				</a>
			</blockquote>

			Let's try cars.  Right-click on the CSV link at the top right and select Copy link.

			<blockquote>
				https://www.openml.org/data/get_csv/4965299/cars1.arff
			</blockquote>

			Paste that into filterpanel.

			<blockquote>
				<a href="https://filterpanel-csv.vercel.app/FetchCSV?url=https%3A%2F%2Fwww.openml.org%2Fdata%2Fget_csv%2F4965299%2Fcars1.arff+">https://filterpanel-csv.vercel.app/FetchCSV?url=https%3A%2F%2Fwww.openml.org%2Fdata%2Fget_csv%2F4965299%2Fcars1.arff+</a>
			</blockquote>

			Unfortunately, filterpanel hangs, and the javascript console says:

			<blockquote>
				Access to fetch at 'https://www.openml.org/data/get_csv/4965299/cars1.arff' from origin 'https://filterpanel-csv.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
			</blockquote>

			The solution is a small app that <a href="https://powerful-reef-24520.herokuapp.com/">
				bypasses cors: https://powerful-reef-24520.herokuapp.com/
			</a>
			<p>
				Using the proxy, the final url for filterpanel is this:
			</p>

			<blockquote>


				<a href="http://localhost:3001/FetchCSV?url=https%3A%2F%2Fpowerful-reef-24520.herokuapp.com%2Fhttps%3A%2F%2Fwww.openml.org%2Fdata%2Fget_csv%2F4965299%2Fcars1.arff">
					http://localhost:3001/FetchCSV?url=https%3A%2F%2Fpowerful-reef-24520.herokuapp.com%2Fhttps%3A%2F%2Fwww.openml.org%2Fdata%2Fget_csv%2F4965299%2Fcars1.arff</a>

			</blockquote>


			<h2>Bring Your Own Data</h2>
			The goal was to do two things:
			<ul>
				<li>provide a data visualization tool you can use on your own local data</li>
				<li>allow you to post a url that shows your data in the same visualization tool</li>
			</ul>

			<p>
				These requirement seem to call for user accounts and online data storage, with the associated security issues.
			</p>

			<p>
				We avoid it all by using either a local file as source, in which case the file is read locally and processed locally in javascript, or an online source in the form of a url that downloads a CSV file.
			</p>


			That's why you don't have to authenticate yourself to use filterpanel.  There is no website.  This is purely a free script that runs on your computer.  The catch is that you have to Bring Your Own Data.

			<h2>Developers</h2>
			<p>
				The npm package uses React, so if you have some boring grids and are using React, you are in luck my friend!  See the filterpanel-example app for a simple integration using JSON arrays, in React/Nextjs.
			</p>

			<p style={{ 'textAlign': 'center' }}>
				Copyright (c) <a href="http://www.johndimm.com">John Dimm</a> 2021
			</p>
		</div>
	)
}

function MainPage() {
	const [csvBuffer, setCsvBuffer] = useState([])

	const GetNetworkFile = () => {

		const handleFileRead = (event) => {
			setCsvBuffer(event.target.result)
		}

		const uploadFile = (file) => {
			const reader = new FileReader()
			reader.onload = handleFileRead
			reader.readAsText(file)
		}

		return (
			<div className={styles.private_data}>
				<h2>Private Data</h2>
				<div className={styles.instructions}>Open a CSV file on your computer.</div>
				<form id='fileForm' encType='multipart/form-data' method='post'>
					<input
						id='files'
						type='file'
						onChange={(e) => {
							const f = document.getElementById('fileForm')
							uploadFile(f.elements['files'].files[0])
						}}
					/>
				</form>
			</div>
		)
	}


	if (csvBuffer.length > 0) {
		return <Main csvBuffer={csvBuffer} />
	}

	return (
		<div className={styles.top}>
			<a href='http://localhost:3001/FetchCSV?url=https%3A%2F%2Fquery.data.world%2Fs%2Flt76nsufm5v76w2au4mmkksoh6wu6a'>
				<img src='movies.png' width='100%' />
			</a>
			<h1>Filterpanel</h1>

			<div className={styles.subtitle}>
				automatically generates a filter panel using only a CSV file
			</div>

			<div style={{ clear: 'both' }}>
				<GetLocalFile />
				<GetNetworkFile />
			</div>

			<div className={styles.article_text}>

				<h2>Examples</h2>
				<Movies />
				<OlympicMedals />
				<Shapes />

				<h2>Sample records</h2>
				<h3>Movie</h3>
				<SampleMovie />
				<h3>Olympic Medal</h3>
				<SampleOlympic />

				<PublicPrivate />
				<GitHub />

				<Ecommerce />


			</div>
		</div>
	)
}

export default MainPage
